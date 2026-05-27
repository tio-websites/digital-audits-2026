-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── audits ────────────────────────────────────────────────────────────────────
CREATE TABLE public.audits (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ NOT NULL    DEFAULT now(),
  url           TEXT        NOT NULL,
  practice_name TEXT        NOT NULL    DEFAULT '',
  overall_score INTEGER     NOT NULL    DEFAULT 0,
  result        JSONB       NOT NULL,
  user_id       UUID        REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX audits_user_id_idx    ON public.audits (user_id);
CREATE INDEX audits_created_at_idx ON public.audits (created_at DESC);

ALTER TABLE public.audits ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read their own audits
CREATE POLICY "users_read_own_audits" ON public.audits
  FOR SELECT USING (auth.uid() = user_id);

-- Unauthenticated read by ID (shareable links — UUID is unguessable)
CREATE POLICY "public_read_by_id" ON public.audits
  FOR SELECT USING (true);

-- ── leads ─────────────────────────────────────────────────────────────────────
CREATE TABLE public.leads (
  id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at           TIMESTAMPTZ NOT NULL    DEFAULT now(),
  email                TEXT        NOT NULL,
  audit_id             UUID        REFERENCES public.audits(id) ON DELETE SET NULL,
  overall_score        INTEGER,
  hubspot_contact_id   TEXT,
  hubspot_deal_id      TEXT
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
-- No user-facing RLS — only service role key accesses this table
