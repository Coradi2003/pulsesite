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

export const mockClients: Client[] = [
  {
    id: "c1",
    name: "Rafael Moura",
    company: "TechStart Ltda",
    phone: "+55 11 98765-4321",
    email: "rafael@techstart.com.br",
    status: "active",
    notes: "Cliente VIP, sempre paga em dia.",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "c2",
    name: "Juliana Santos",
    company: "Santos Modas",
    phone: "+55 21 91234-5678",
    email: "juliana@santosmodas.com.br",
    status: "active",
    notes: "Expansão de loja em andamento.",
    created_at: "2024-02-10T10:00:00Z",
  },
  {
    id: "c3",
    name: "Marcos Lima",
    company: "Lima Construtora",
    phone: "+55 31 99876-5432",
    email: "marcos@limaconstrutora.com.br",
    status: "paused",
    notes: "Projeto pausado até março.",
    created_at: "2024-03-05T10:00:00Z",
  },
  {
    id: "c4",
    name: "Ana Carvalho",
    company: "AnaFit Studio",
    phone: "+55 41 98123-4567",
    email: "ana@anafitstudio.com.br",
    status: "active",
    notes: "Landing page + app mobile planejados.",
    created_at: "2024-04-20T10:00:00Z",
  },
  {
    id: "c5",
    name: "Pedro Ribeiro",
    company: "Ribeiro Advocacia",
    phone: "+55 61 97654-3210",
    email: "pedro@ribeiroadvocacia.com.br",
    status: "canceled",
    notes: "Cancelou por redução de orçamento.",
    created_at: "2024-05-01T10:00:00Z",
  },
];

export const mockProjects: Project[] = [
  {
    id: "p1",
    client_id: "c1",
    project_name: "TechStart Site",
    vercel_project_name: "techstart-site",
    vercel_url: "https://techstart-site.vercel.app",
    custom_domain: "techstart.com.br",
    status: "online",
    last_ping: new Date(Date.now() - 45000).toISOString(),
    last_deploy_date: "2024-11-20T15:00:00Z",
  },
  {
    id: "p2",
    client_id: "c2",
    project_name: "Santos Modas E-commerce",
    vercel_project_name: "santos-modas",
    vercel_url: "https://santos-modas.vercel.app",
    custom_domain: "santosmodas.com.br",
    status: "online",
    last_ping: new Date(Date.now() - 30000).toISOString(),
    last_deploy_date: "2024-12-01T09:00:00Z",
  },
  {
    id: "p3",
    client_id: "c3",
    project_name: "Lima Construtora Portal",
    vercel_project_name: "lima-construtora",
    vercel_url: "https://lima-construtora.vercel.app",
    custom_domain: "limaconstrutora.com.br",
    status: "offline",
    last_ping: new Date(Date.now() - 3600000).toISOString(),
    last_deploy_date: "2024-10-15T11:00:00Z",
  },
  {
    id: "p4",
    client_id: "c4",
    project_name: "AnaFit Landing Page",
    vercel_project_name: "anafit-landing",
    vercel_url: "https://anafit-landing.vercel.app",
    custom_domain: "anafitstudio.com.br",
    status: "online",
    last_ping: new Date(Date.now() - 60000).toISOString(),
    last_deploy_date: "2024-12-10T14:00:00Z",
  },
  {
    id: "p5",
    client_id: "c1",
    project_name: "TechStart Blog",
    vercel_project_name: "techstart-blog",
    vercel_url: "https://techstart-blog.vercel.app",
    custom_domain: "blog.techstart.com.br",
    status: "online",
    last_ping: new Date(Date.now() - 20000).toISOString(),
    last_deploy_date: "2024-11-30T10:00:00Z",
  },
  {
    id: "p6",
    client_id: "c5",
    project_name: "Ribeiro Advocacia Site",
    vercel_project_name: "ribeiro-advocacia",
    vercel_url: "https://ribeiro-advocacia.vercel.app",
    custom_domain: "ribeiroadvocacia.com.br",
    status: "offline",
    last_ping: new Date(Date.now() - 7200000).toISOString(),
    last_deploy_date: "2024-09-01T08:00:00Z",
  },
];

export const mockFinance: Finance[] = [
  {
    id: "f1",
    client_id: "c1",
    description: "Manutenção Mensal - TechStart Site",
    amount: 490.0,
    type: "monthly",
    due_date: "2026-03-05",
    status: "paid",
  },
  {
    id: "f2",
    client_id: "c2",
    description: "Manutenção Mensal - Santos Modas",
    amount: 690.0,
    type: "monthly",
    due_date: "2026-03-10",
    status: "pending",
  },
  {
    id: "f3",
    client_id: "c3",
    description: "Desenvolvimento - Lima Portal",
    amount: 4500.0,
    type: "one-time",
    due_date: "2026-02-15",
    status: "overdue",
  },
  {
    id: "f4",
    client_id: "c4",
    description: "Manutenção Mensal - AnaFit",
    amount: 350.0,
    type: "monthly",
    due_date: "2026-03-20",
    status: "paid",
  },
  {
    id: "f5",
    client_id: "c1",
    description: "Manutenção Mensal - TechStart Blog",
    amount: 290.0,
    type: "monthly",
    due_date: "2026-03-05",
    status: "paid",
  },
  {
    id: "f6",
    client_id: "c2",
    description: "Novo Módulo E-commerce",
    amount: 2800.0,
    type: "one-time",
    due_date: "2026-02-28",
    status: "overdue",
  },
  {
    id: "f7",
    client_id: "c4",
    description: "Manutenção Mensal - AnaFit (Abril)",
    amount: 350.0,
    type: "monthly",
    due_date: "2026-04-20",
    status: "pending",
  },
];

export const mockDomains: Domain[] = [
  {
    id: "d1",
    client_id: "c1",
    domain: "techstart.com.br",
    registrar: "Registro.br",
    expiration_date: "2026-12-15",
    auto_renew: true,
  },
  {
    id: "d2",
    client_id: "c1",
    domain: "blog.techstart.com.br",
    registrar: "Registro.br",
    expiration_date: "2026-12-15",
    auto_renew: true,
  },
  {
    id: "d3",
    client_id: "c2",
    domain: "santosmodas.com.br",
    registrar: "GoDaddy",
    expiration_date: "2026-04-10",
    auto_renew: false,
  },
  {
    id: "d4",
    client_id: "c3",
    domain: "limaconstrutora.com.br",
    registrar: "Registro.br",
    expiration_date: "2026-04-01",
    auto_renew: false,
  },
  {
    id: "d5",
    client_id: "c4",
    domain: "anafitstudio.com.br",
    registrar: "Hostinger",
    expiration_date: "2027-06-20",
    auto_renew: true,
  },
  {
    id: "d6",
    client_id: "c5",
    domain: "ribeiroadvocacia.com.br",
    registrar: "Registro.br",
    expiration_date: "2026-03-30",
    auto_renew: false,
  },
];
