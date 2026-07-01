import "server-only";
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE, type SessionPayload } from "@/lib/session";

/**
 * Server-side admin auth guards for use inside server actions.
 *
 * The proxy/middleware already gates the /admin *pages*, but server actions are
 * independently-callable endpoints — so privileged actions (uploads, deletes,
 * writes) should verify the admin session themselves. Defense in depth.
 */

export async function getCurrentAdmin(): Promise<SessionPayload | null> {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
}

/** Throws if there is no valid admin session. Use when a thrown error is fine. */
export async function requireAdmin(): Promise<SessionPayload> {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("Unauthorized: an admin session is required.");
  return admin;
}
