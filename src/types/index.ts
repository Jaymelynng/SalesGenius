export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  studentName: string;
  studentAge: number;
  source: 'website' | 'referral' | 'drop-report' | 'social-media' | 'walk-in';
  status: 'new' | 'contacted' | 'trial-scheduled' | 'trial-completed' | 'enrolled' | 'lost';
  stage: 'initial-contact' | 'trial-booking' | 'trial-attendance' | 'follow-up' | 'conversion' | 'closed-lost';
  createdAt: Date;
  updatedAt: Date;
  trialDate?: Date;
  enrollmentDate?: Date;
  lastContactDate?: Date;
  nextFollowUpDate?: Date;
  notes: string[];
  tags: string[];
  assignedTo?: string;
  conversionProbability: number;
  revenue: number;
}

export interface TrialConversionStep {
  id: string;
  name: string;
  description: string;
  order: number;
  automatedActions: AutomatedAction[];
  requiredFields: string[];
  timeframe: number; // hours
  successCriteria: string[];
}

export interface AutomatedAction {
  id: string;
  type: 'email' | 'sms' | 'call-reminder' | 'task' | 'follow-up';
  trigger: 'immediate' | 'delay' | 'date-based' | 'condition-based';
  delay?: number; // hours
  condition?: string;
  template: string;
  subject?: string;
  content: string;
  assignedTo?: string;
}

export interface ConversionFunnel {
  stage: string;
  count: number;
  percentage: number;
  conversionRate: number;
  averageTime: number; // hours
  dropOffRate: number;
}

export interface Script {
  id: string;
  title: string;
  category: 'initial-contact' | 'trial-booking' | 'trial-follow-up' | 'objection-handling' | 'conversion';
  stage: string;
  content: string;
  variables: string[];
  successRate: number;
  lastUpdated: Date;
  tags: string[];
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  stage: string;
  variables: string[];
  openRate: number;
  clickRate: number;
  conversionRate: number;
  lastUsed: Date;
}

export interface Analytics {
  totalLeads: number;
  trialsScheduled: number;
  trialsCompleted: number;
  conversions: number;
  overallConversionRate: number;
  averageTimeToConversion: number; // days
  revenueGenerated: number;
  averageRevenuePerLead: number;
  stageMetrics: ConversionFunnel[];
  topPerformingScripts: Script[];
  topPerformingEmails: EmailTemplate[];
}