/**
 * Browser-side Supabase client (uses anon key, no server cookies).
 * Use in Client Components only ("use client").
 */
import { createBrowserClient } from "@supabase/ssr";

let _client: ReturnType<typeof createBrowserClient> | null = null;

export const supabaseBrowser = new Proxy({} as ReturnType<typeof createBrowserClient>, {
  get(_target, prop) {
    if (!_client) {
      _client = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
    }
    return (_client as Record<string | symbol, unknown>)[prop];
  },
});
