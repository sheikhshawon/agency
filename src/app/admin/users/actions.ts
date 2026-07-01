"use server";

import { scryptSync, randomBytes, timingSafeEqual } from "crypto";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

// admin_users holds password hashes — always use the privileged (service-role)
// client so the public anon key can be locked out of this table entirely.
const getSupabase = getSupabaseAdmin;

// password_hash is intentionally excluded — it must never reach the client.
export type AdminUserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
};

export type ActionResult = { success: boolean; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Password hashing (Node crypto, no extra dependency) ──────────
function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, key] = stored.split(":");
  if (!salt || !key) return false;
  const derived = scryptSync(password, salt, 64);
  const keyBuf = Buffer.from(key, "hex");
  return keyBuf.length === derived.length && timingSafeEqual(keyBuf, derived);
}

// ── Read ─────────────────────────────────────────────────────────
export async function getAdminUsers(): Promise<AdminUserRow[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("admin_users")
    .select("id, name, email, role, created_at")
    .order("created_at", { ascending: false });

  if (error) return [];
  return data ?? [];
}

// ── Create ───────────────────────────────────────────────────────
export async function createAdminUser(formData: FormData): Promise<ActionResult> {
  const name = ((formData.get("name") as string) ?? "").trim();
  const email = ((formData.get("email") as string) ?? "").trim().toLowerCase();
  const password = ((formData.get("password") as string) ?? "").trim();

  if (!name) return { success: false, message: "Please enter a name." };
  if (!email || !EMAIL_RE.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }
  if (password.length < 6) {
    return { success: false, message: "Password must be at least 6 characters." };
  }

  const supabase = getSupabase();
  const { error } = await supabase.from("admin_users").insert({
    name,
    email,
    password_hash: hashPassword(password),
    role: "admin",
  });

  if (error) {
    if (error.code === "23505") {
      return { success: false, message: "An admin with this email already exists." };
    }
    return { success: false, message: "Could not create admin. Please try again." };
  }

  revalidatePath("/admin/users");
  return { success: true, message: "Admin created successfully." };
}

// ── Delete ───────────────────────────────────────────────────────
export async function deleteAdminUser(formData: FormData): Promise<ActionResult> {
  const id = formData.get("id") as string;
  const supabase = getSupabase();

  // Guard: never remove the last remaining admin (avoids lock-out).
  const { count } = await supabase
    .from("admin_users")
    .select("*", { count: "exact", head: true });

  if ((count ?? 0) <= 1) {
    return { success: false, message: "You can't remove the last admin." };
  }

  const { error } = await supabase.from("admin_users").delete().eq("id", id);
  if (error) return { success: false, message: "Could not remove admin. Please try again." };

  revalidatePath("/admin/users");
  return { success: true, message: "Admin removed." };
}

// ── Authenticate (used by the login screen) ──────────────────────
export async function authenticateAdmin(
  email: string,
  password: string
): Promise<{ id: string; name: string; email: string } | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("admin_users")
    .select("id, name, email, password_hash")
    .eq("email", email.trim().toLowerCase())
    .maybeSingle();

  if (error || !data) return null;
  if (!verifyPassword(password, data.password_hash)) return null;
  return { id: data.id, name: data.name, email: data.email };
}
