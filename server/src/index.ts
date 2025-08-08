import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import { customAlphabet } from 'nanoid';
import { addLead, deleteLead, findLeadById, getLeads, updateLead } from './db';
import type { Lead, ConversionFunnelStage } from './types';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 12);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Validation schema for incoming lead payloads
const leadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(5),
  studentName: z.string().min(1),
  studentAge: z.number().int().min(0),
  source: z.enum(['website','referral','drop-report','social-media','walk-in']),
  status: z.enum(['new','contacted','trial-scheduled','trial-completed','enrolled','lost']).default('new'),
  stage: z.enum(['initial-contact','trial-booking','trial-attendance','follow-up','conversion','closed-lost']).default('initial-contact'),
  trialDate: z.string().optional(),
  enrollmentDate: z.string().optional(),
  lastContactDate: z.string().optional(),
  nextFollowUpDate: z.string().optional(),
  notes: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  assignedTo: z.string().optional(),
  conversionProbability: z.number().min(0).max(100).default(0),
  revenue: z.number().min(0).default(0)
});

app.get('/api/leads', async (_req, res) => {
  const leads = await getLeads();
  res.json(leads);
});

app.post('/api/leads', async (req, res) => {
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const now = new Date().toISOString();
  const lead: Lead = {
    id: nanoid(),
    ...parsed.data,
    createdAt: now,
    updatedAt: now
  };
  await addLead(lead);
  res.status(201).json(lead);
});

app.put('/api/leads/:id', async (req, res) => {
  const { id } = req.params;
  const existing = await findLeadById(id);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  const parsed = leadSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const updated = await updateLead(id, { ...parsed.data, updatedAt: new Date().toISOString() });
  res.json(updated);
});

app.delete('/api/leads/:id', async (req, res) => {
  const ok = await deleteLead(req.params.id);
  res.json({ deleted: ok });
});

// Steps: static for now
app.get('/api/conversion-steps', (_req, res) => {
  const steps = [
    { id: '1', name: 'Initial Contact', description: 'First touchpoint with potential customer', order: 1, automatedActions: [{ id: '1a', type: 'email', trigger: 'immediate', template: 'welcome-email', subject: "Welcome to [Gym Name] - Let's Get Started!", content: 'Thank you for your interest in our programs...' }], requiredFields: ['name','email','phone','studentName','studentAge'], timeframe: 24, successCriteria: ['Contact information verified','Initial interest confirmed'] },
    { id: '2', name: 'Trial Booking', description: 'Schedule and confirm trial class', order: 2, automatedActions: [{ id: '2a', type: 'email', trigger: 'delay', delay: 2, template: 'trial-booking-reminder', subject: 'Ready to Schedule Your Free Trial?', content: "We'd love to have [Student Name] try a class..." }], requiredFields: ['trialDate','programType'], timeframe: 72, successCriteria: ['Trial date scheduled','Confirmation sent'] },
    { id: '3', name: 'Trial Attendance', description: 'Student attends trial class', order: 3, automatedActions: [{ id: '3a', type: 'call-reminder', trigger: 'delay', delay: 24, template: 'trial-reminder-call', content: 'Reminder call script for trial attendance' }], requiredFields: ['attendanceConfirmed'], timeframe: 24, successCriteria: ['Student attended trial','Feedback collected'] },
    { id: '4', name: 'Post-Trial Follow-up', description: 'Follow up after trial class', order: 4, automatedActions: [{ id: '4a', type: 'email', trigger: 'delay', delay: 2, template: 'post-trial-followup', subject: 'How did [Student Name] enjoy the trial?', content: 'We hope [Student Name] had a great time...' }], requiredFields: ['trialFeedback'], timeframe: 48, successCriteria: ['Feedback received','Interest level assessed'] },
    { id: '5', name: 'Enrollment Conversion', description: 'Convert trial to paid enrollment', order: 5, automatedActions: [{ id: '5a', type: 'call-reminder', trigger: 'delay', delay: 24, template: 'conversion-call', content: 'Enrollment conversation script' }], requiredFields: ['enrollmentDecision'], timeframe: 120, successCriteria: ['Enrollment completed','Payment processed'] },
  ];
  res.json(steps);
});

// Funnel derived from leads
app.get('/api/funnel', async (_req, res) => {
  const leads = await getLeads();
  const stages = ['Initial Contact','Trial Booking','Trial Attendance','Post-Trial Follow-up','Enrollment Conversion'];
  const stageKeyMap: Record<string, string> = {
    'Initial Contact': 'initial-contact',
    'Trial Booking': 'trial-booking',
    'Trial Attendance': 'trial-attendance',
    'Post-Trial Follow-up': 'follow-up',
    'Enrollment Conversion': 'conversion',
  };
  const totals = stages.map(stage => {
    const key = stageKeyMap[stage];
    const count = leads.filter(l => l.stage === key).length;
    return { stage, count };
  });
  const totalLeads = leads.length || 1;
  const funnel: ConversionFunnelStage[] = totals.map((s, idx) => {
    const prev = idx === 0 ? totalLeads : totals[idx-1].count || 1;
    const conversionRate = prev ? (s.count / prev) * 100 : 0;
    const percentage = (s.count / totalLeads) * 100;
    return { stage: s.stage, count: s.count, percentage, conversionRate, averageTime: 0, dropOffRate: 100 - conversionRate };
  });
  res.json(funnel);
});

// Dashboard stats
app.get('/api/stats', async (_req, res) => {
  const leads = await getLeads();
  const stats = {
    freeTrialsToday: leads.filter(l => l.trialDate && new Date(l.trialDate).toDateString() === new Date().toDateString()).length,
    pendingFollowUps: leads.filter(l => l.nextFollowUpDate && new Date(l.nextFollowUpDate) > new Date()).length,
    successfulVoicemails: 0,
    totalInactiveAccounts: leads.filter(l => l.status === 'lost').length,
  };
  res.json(stats);
});

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on http://localhost:${port}`);
});