/**
 * Browser-side Supabase client (uses anon key, no server cookies).
 * Use in Client Components only ("use client").
 */
import { createBrowserClient } from "@supabase/ssr";

export const supabaseBrowser = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
