import { createHmac, timingSafeEqual } from "crypto";

// Secret used to sign the admin session cookie.
//
// SECURITY: this must be a private, high-entropy value. It is NEVER allowed to
// fall back to a NEXT_PUBLIC_* value — those ship to the browser, so signing
// sessions with one would let anyone forge a valid admin cookie and bypass
// login. Set ADMIN_SESSION_SECRET (min 32 chars) in production; a fixed dev
// secret is used only when NODE_ENV !== "production".
const DEV_FALLBACK_SECRET = "enif-admin-dev-only-secret-not-for-production";

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (secret && secret.length >= 32) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "ADMIN_SESSION_SECRET must be set to a private random value of at least 32 characters in production."
    );
  }
  return DEV_FALLBACK_SECRET;
}

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days (seconds)

export type SessionPayload = {
  sub: string;   // admin user id
  email: string;
  name: string;
  exp: number;   // unix seconds
};

function sign(body: string): string {
  return createHmac("sha256", getSecret()).update(body).digest("base64url");
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
