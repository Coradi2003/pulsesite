-- =============================================
-- Pulse Futuro Admin -- Supabase SQL Schema
-- Run this in the Supabase SQL Editor
-- =============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =====================
-- Table: clients
-- =====================
create table if not exists clients (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  company     text not null default '',
  phone       text not null default '',
  email       text not null default '',
  status      text not null default 'active' check (status in ('active','paused','canceled')),
  notes       text not null default '',
  created_at  timestamptz not null default now()
);

-- =====================
-- Table: projects
-- =====================
create table if not exists projects (
  id                    uuid primary key default uuid_generate_v4(),
  client_id             uuid not null references clients(id) on delete cascade,
  project_name          text not null,
  vercel_project_name   text not null default '',
  vercel_url            text not null default '',
  custom_domain         text not null default '',
  status                text not null default 'online' check (status in ('online','offline')),
  last_ping             timestamptz,
  last_deploy_date      timestamptz
);

-- =====================
-- Table: finance
-- =====================
create table if not exists finance (
  id          uuid primary key default uuid_generate_v4(),
  client_id   uuid not null references clients(id) on delete cascade,
  description text not null,
  amount      numeric(10,2) not null default 0,
  type        text not null default 'monthly' check (type in ('monthly','one-time')),
  due_date    date not null,
  status      text not null default 'pending' check (status in ('paid','pending','overdue'))
);

-- =====================
-- Table: domains
-- =====================
create table if not exists domains (
  id               uuid primary key default uuid_generate_v4(),
  client_id        uuid not null references clients(id) on delete cascade,
  domain           text not null,
  registrar        text not null default '',
  expiration_date  date not null,
  auto_renew       boolean not null default false
);

-- =====================
-- Row Level Security
-- =====================
alter table clients  enable row level security;
alter table projects enable row level security;
alter table finance  enable row level security;
alter table domains  enable row level security;

-- Allow authenticated users full access (admin panel)
create policy "Authenticated users can manage clients"
  on clients for all to authenticated using (true) with check (true);

create policy "Authenticated users can manage projects"
  on projects for all to authenticated using (true) with check (true);

create policy "Authenticated users can manage finance"
  on finance for all to authenticated using (true) with check (true);

create policy "Authenticated users can manage domains"
  on domains for all to authenticated using (true) with check (true);
