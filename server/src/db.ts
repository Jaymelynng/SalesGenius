import { JSONFilePreset } from 'lowdb/node';
import { join } from 'node:path';
import { mkdirSync } from 'node:fs';
import type { DatabaseSchema, Lead } from './types';

const dataDir = join(process.cwd(), 'server', 'data');
mkdirSync(dataDir, { recursive: true });

const defaultData: DatabaseSchema = {
  leads: [],
  campaigns: []
};

export const dbPromise = JSONFilePreset<DatabaseSchema>(
  join(dataDir, 'db.json'),
  defaultData
);

export async function getLeads() {
  const db = await dbPromise;
  return db.data.leads;
}

export async function findLeadById(id: string) {
  const db = await dbPromise;
  return db.data.leads.find(l => l.id === id) || null;
}

export async function addLead(newLead: Lead) {
  const db = await dbPromise;
  db.data.leads.push(newLead);
  await db.write();
  return newLead;
}

export async function updateLead(id: string, updates: Partial<Lead>) {
  const db = await dbPromise;
  const idx = db.data.leads.findIndex(l => l.id === id);
  if (idx === -1) return null;
  db.data.leads[idx] = { ...db.data.leads[idx], ...updates };
  await db.write();
  return db.data.leads[idx];
}

export async function deleteLead(id: string) {
  const db = await dbPromise;
  const before = db.data.leads.length;
  db.data.leads = db.data.leads.filter(l => l.id !== id);
  const changed = db.data.leads.length !== before;
  if (changed) await db.write();
  return changed;
}