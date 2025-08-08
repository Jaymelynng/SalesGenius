import type { Lead, ConversionFunnel, TrialConversionStep } from '../types';

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export const api = {
  async getLeads(): Promise<Lead[]> {
    const res = await fetch('/api/leads');
    return json<Lead[]>(res);
  },
  async createLead(payload: Partial<Lead>): Promise<Lead> {
    const res = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    return json<Lead>(res);
  },
  async updateLead(id: string, payload: Partial<Lead>): Promise<Lead> {
    const res = await fetch(`/api/leads/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    return json<Lead>(res);
  },
  async deleteLead(id: string): Promise<{ deleted: boolean }> {
    const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    return json<{ deleted: boolean }>(res);
  },
  async getConversionSteps(): Promise<TrialConversionStep[]> {
    const res = await fetch('/api/conversion-steps');
    return json<TrialConversionStep[]>(res);
  },
  async getFunnel(): Promise<ConversionFunnel[]> {
    const res = await fetch('/api/funnel');
    return json<ConversionFunnel[]>(res);
  },
  async getStats(): Promise<{ freeTrialsToday: number; pendingFollowUps: number; successfulVoicemails: number; totalInactiveAccounts: number; }> {
    const res = await fetch('/api/stats');
    return json(res);
  }
};