/**
 * Service-role Supabase client — bypasses RLS entirely.
 * SERVER ONLY — never import this in client components.
 * Use for: inserting audits, reading leads, admin tasks.
 */
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);
