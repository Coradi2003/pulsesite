ALTER TABLE domains ADD COLUMN IF NOT EXISTS status text DEFAULT 'online' CHECK (status IN ('online', 'offline'));
ALTER TABLE domains ADD COLUMN IF NOT EXISTS last_ping timestamptz;
