export type LeadSource = 'website' | 'referral' | 'drop-report' | 'social-media' | 'walk-in';
export type LeadStatus = 'new' | 'contacted' | 'trial-scheduled' | 'trial-completed' | 'enrolled' | 'lost';
export type LeadStage = 'initial-contact' | 'trial-booking' | 'trial-attendance' | 'follow-up' | 'conversion' | 'closed-lost';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  studentName: string;
  studentAge: number;
  source: LeadSource;
  status: LeadStatus;
  stage: LeadStage;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  trialDate?: string; // ISO
  enrollmentDate?: string; // ISO
  lastContactDate?: string; // ISO
  nextFollowUpDate?: string; // ISO
  notes: string[];
  tags: string[];
  assignedTo?: string;
  conversionProbability: number;
  revenue: number;
}

export interface ConversionFunnelStage {
  stage: string;
  count: number;
  percentage: number;
  conversionRate: number;
  averageTime: number; // hours
  dropOffRate: number;
}

export interface EmailCampaign {
  id: string;
  name: string;
  type: 'one-time' | 'automated' | 'drip-sequence';
  sentDate: string; // ISO
  totalSent: number;
  openRate: number;
  totalOpens: number;
  clickRate: number;
  totalClicks: number;
  conversionRate: number;
  totalConversions: number;
  bounceRate: number;
  unsubscribeRate: number;
  status: 'draft' | 'sent' | 'scheduled' | 'paused';
  subject: string;
  previewText?: string;
  tags: string[];
}

export interface DatabaseSchema {
  leads: Lead[];
  campaigns: EmailCampaign[];
}