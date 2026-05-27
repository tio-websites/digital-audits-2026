/**
 * Service-role Supabase client — bypasses RLS entirely.
 * SERVER ONLY — never import this in client components.
 * Lazily instantiated to avoid build-time errors when env vars are runtime secrets.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _admin: SupabaseClient<any> | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function admin(): SupabaseClient<any> {
  if (!_admin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error("Supabase env vars are not configured.");
    _admin = createClient(url, key, { auth: { persistSession: false } });
  }
  return _admin;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabaseAdmin: SupabaseClient<any> = new Proxy({} as SupabaseClient<any>, {
  get(_t, prop) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (admin() as any)[prop];
  },
});
