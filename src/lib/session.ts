import { createHmac, timingSafeEqual } from "crypto";

// Secret used to sign the admin session cookie. Set ADMIN_SESSION_SECRET in
// your environment for production; it falls back to the Supabase anon key
// (already present in this project) so auth works out of the box in dev.
const SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "enif-admin-dev-secret-change-me";

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days (seconds)

export type SessionPayload = {
  sub: string;   // admin user id
  email: string;
  name: string;
  exp: number;   // unix seconds
};

function sign(body: string): string {
  return createHmac("sha256", SECRET).update(body).digest("base64url");
}

/** Create a tamper-proof session token: base64url(payload).hmacSignature */
export function signSession(payload: SessionPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

/** Verify a session token and return its payload, or null if invalid/expired. */
export function verifySession(token?: string | null): SessionPayload | null {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;

  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = sign(body);

  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as SessionPayload;
    if (!payload.exp || payload.exp * 1000 < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
