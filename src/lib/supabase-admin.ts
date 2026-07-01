import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client for PRIVILEGED operations (admin reads/writes of
 * sensitive tables, content mutations). It uses the service-role key, which
 * bypasses Row Level Security — so it must NEVER be imported into a client
 * component. The `server-only` import above makes a client bundle fail the
 * build if that ever happens.
 *
 * SECURITY MODEL
 *   - Public reads of published content and public inserts (contact form,
 *     newsletter, blog comments) keep using the anon key + RLS.
 *   - Everything privileged goes through this client. Once the hardened RLS
 *     (supabase/hardening.sql) is applied, the anon key can no longer read
 *     private tables (contact_messages, subscribers, admin_users) at all.
 *
 * Set SUPABASE_SERVICE_ROLE_KEY in the environment (Supabase → Settings → API →
 * service_role secret). Until it is set, this falls back to the anon key so the
 * app keeps working during migration — but that fallback is NOT secure once
 * RLS is hardened, so set the key before applying hardening.sql.
 */

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set.");

  const key = serviceKey || anonKey;
  if (!key) throw new Error("No Supabase key available (set SUPABASE_SERVICE_ROLE_KEY).");

  if (!serviceKey && process.env.NODE_ENV === "production") {
    // Loud warning: privileged calls are running with the public anon key.
    console.warn(
      "[supabase-admin] SUPABASE_SERVICE_ROLE_KEY is not set — privileged operations are using the anon key. Set it for production security."
    );
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
