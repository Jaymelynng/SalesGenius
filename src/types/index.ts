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

export interface EmailCampaign {
  id: string;
  name: string;
  type: 'one-time' | 'automated' | 'drip-sequence';
  sentDate: Date;
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

export interface EmailEngagement {
  id: string;
  leadId: string;
  campaignId: string;
  email: string;
  fullName: string;
  deliverabilityStatus: 'delivered' | 'bounced' | 'spam' | 'unsubscribed';
  lastOpened: Date | null;
  totalOpens: number;
  totalClicks: number;
  clickedLinks: ClickedLink[];
  region?: string;
  city?: string;
  emailClient?: string;
  isEnrolled: boolean;
  enrollmentDate?: Date;
  enrollmentValue?: number;
  leadSource: string;
  conversionStage: string;
  lastActivity: Date;
  tags: string[];
}

export interface ClickedLink {
  url: string;
  linkText: string;
  clickCount: number;
  firstClicked: Date;
  lastClicked: Date;
  linkType: 'cta' | 'navigation' | 'social' | 'unsubscribe' | 'other';
}

export interface CampaignPerformance {
  campaignId: string;
  campaignName: string;
  totalEngaged: number;
  highEngagement: number; // 5+ clicks
  mediumEngagement: number; // 2-4 clicks
  lowEngagement: number; // 1 click
  enrollmentRate: number;
  totalEnrollments: number;
  revenueGenerated: number;
  averageClicksPerLead: number;
  topClickedLinks: Array<{
    url: string;
    linkText: string;
    totalClicks: number;
    uniqueClickers: number;
  }>;
}