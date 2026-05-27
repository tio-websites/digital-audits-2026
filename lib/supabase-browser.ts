/**
 * Browser-side Supabase client (uses anon key, no server cookies).
 * Use in Client Components only ("use client").
 * Lazily instantiated to avoid build-time errors when env vars are runtime secrets.
 */
import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _client: SupabaseClient<any> | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function browser(): SupabaseClient<any> {
  if (!_client) {
    _client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return _client;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabaseBrowser: SupabaseClient<any> = new Proxy({} as SupabaseClient<any>, {
  get(_t, prop) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (browser() as any)[prop];
  },
});
