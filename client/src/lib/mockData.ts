export type ClientStatus = "active" | "paused" | "canceled";
export type ProjectStatus = "online" | "offline";
export type FinanceType = "monthly" | "one-time";
export type FinanceStatus = "paid" | "pending" | "overdue";

export interface Client {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  status: ClientStatus;
  notes: string;
  created_at: string;
}

export interface Project {
  id: string;
  client_id: string;
  project_name: string;
  vercel_project_name: string;
  vercel_url: string;
  custom_domain: string;
  status: ProjectStatus;
  last_ping: string | null;
  last_deploy_date: string | null;
}

export interface Finance {
  id: string;
  client_id: string;
  description: string;
  amount: number;
  type: FinanceType;
  due_date: string;
  status: FinanceStatus;
}

export interface Domain {
  id: string;
  client_id: string;
  domain: string;
  registrar: string;
  expiration_date: string;
  auto_renew: boolean;
}

// ALL MOCK DATA CLEARED TO DEBUG PERSISTENCE
export const mockClients: Client[] = [];
export const mockProjects: Project[] = [];
export const mockFinance: Finance[] = [];
export const mockDomains: Domain[] = [];
