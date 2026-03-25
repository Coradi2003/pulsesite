-- Enable Supabase Realtime for the finance table
-- This allows the dashboard and finance pages to sync in real-time
-- Run this in the Supabase SQL Editor

-- Add the finance table to the realtime publication (if not already added)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'finance'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE finance;
  END IF;
END $$;
