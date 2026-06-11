-- Add downtime tracking to domains table
-- Required for WhatsApp offline alerts on domains

ALTER TABLE domains
  ADD COLUMN IF NOT EXISTS down_since TIMESTAMPTZ DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'online' CHECK (status IN ('online', 'offline')),
  ADD COLUMN IF NOT EXISTS last_ping TIMESTAMPTZ DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS response_time INTEGER DEFAULT NULL;
