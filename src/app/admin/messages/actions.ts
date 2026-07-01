"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

// Public anon client — used ONLY for the public contact-form insert.
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export type ContactMessageRow = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

export type SubmitResult = { success: boolean; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Public: submit the contact form ──────────────────────────────
export async function submitMessage(formData: FormData): Promise<SubmitResult> {
  const full_name = ((formData.get("full_name") as string) ?? "").trim();
  const email = ((formData.get("email") as string) ?? "").trim().toLowerCase();
  const phone = ((formData.get("phone") as string) ?? "").trim();
  const company = ((formData.get("company") as string) ?? "").trim();
  const service = ((formData.get("service") as string) ?? "").trim();
  const message = ((formData.get("message") as string) ?? "").trim();

  if (!full_name) return { success: false, message: "Please enter your full name." };
  if (!email || !EMAIL_RE.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }
  if (!message) return { success: false, message: "Please enter a message." };

  const supabase = getSupabase();
  const { error } = await supabase.from("contact_messages").insert({
    full_name,
    email,
    phone: phone || null,
    company: company || null,
    service: service || null,
    message,
  });

  if (error) {
    return { success: false, message: "Something went wrong. Please try again." };
  }

  revalidatePath("/admin/messages");
  revalidatePath("/admin", "layout");
  return { success: true, message: "Thanks! We'll get back to you within 24 hours." };
}

// ── Admin: read & manage ─────────────────────────────────────────
export async function getMessages(): Promise<ContactMessageRow[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return [];
  return data ?? [];
}

export async function getUnreadCount(): Promise<number> {
  const supabase = getSupabaseAdmin();
  const { count, error } = await supabase
    .from("contact_messages")
    .select("*", { count: "exact", head: true })
    .eq("is_read", false);

  if (error) return 0;
  return count ?? 0;
}

export async function setMessageRead(formData: FormData) {
  const id = formData.get("id") as string;
  const isRead = formData.get("is_read") === "true";

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("contact_messages")
    .update({ is_read: isRead })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/messages");
  revalidatePath("/admin", "layout");
}

export async function markAllRead() {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("contact_messages")
    .update({ is_read: true })
    .eq("is_read", false);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/messages");
  revalidatePath("/admin", "layout");
}

export async function deleteMessage(formData: FormData) {
  const id = formData.get("id") as string;
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("contact_messages").delete().eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/messages");
  revalidatePath("/admin", "layout");
}
