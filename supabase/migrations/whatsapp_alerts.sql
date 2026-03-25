-- =============================================
-- WhatsApp Alert System: Schema Migration
-- Run this in the Supabase SQL Editor ONCE
-- =============================================

-- Step 1: Add downtime tracking columns to projects table
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS down_since TIMESTAMPTZ DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS last_alert_sent TIMESTAMPTZ DEFAULT NULL;

-- Step 2: Enable pg_cron extension (if not already enabled via Supabase Dashboard)
-- Go to: Dashboard > Database > Extensions > Enable "pg_cron" and "pg_net"
-- Then run the cron jobs below:

-- Step 3: Schedule site monitor every minute
-- (Replace <project-ref> and <anon-key> with your values)
SELECT cron.schedule(
  'pulse-site-monitor',
  '* * * * *',
  $$
  SELECT net.http_post(
    url := 'https://irbumpbqfvkzlvwdxxpn.supabase.co/functions/v1/site-monitor',
    headers := '{"Authorization": "Bearer ' || current_setting('app.supabase_anon_key', true) || '", "Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  )
  $$
);

-- Step 4: Schedule payment reminder daily at 9am (Brasilia time = UTC-3, so 12:00 UTC)
SELECT cron.schedule(
  'pulse-payment-reminder',
  '0 12 * * *',
  $$
  SELECT net.http_post(
    url := 'https://irbumpbqfvkzlvwdxxpn.supabase.co/functions/v1/payment-reminder',
    headers := '{"Authorization": "Bearer ' || current_setting('app.supabase_anon_key', true) || '", "Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  )
  $$
);
