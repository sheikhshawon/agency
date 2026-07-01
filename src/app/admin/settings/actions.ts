"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

// Public anon client — used ONLY for the public read of site settings.
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export type SiteSettings = {
  site_name: string;
  tagline: string;
  description: string;
  contact_email: string;
  phone: string;
  address: string;
  twitter_url: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  updated_at?: string;
};

const DEFAULT_SETTINGS: SiteSettings = {
  site_name: "Enif IT Services Ltd.",
  tagline: "",
  description: "",
  contact_email: "",
  phone: "",
  address: "",
  twitter_url: "",
  facebook_url: "",
  instagram_url: "",
  linkedin_url: "",
};

// The editable text fields (everything except updated_at).
const FIELDS = [
  "site_name",
  "tagline",
  "description",
  "contact_email",
  "phone",
  "address",
  "twitter_url",
  "facebook_url",
  "instagram_url",
  "linkedin_url",
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SaveResult = { success: boolean; message: string };

export async function getSettings(): Promise<SiteSettings> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  // Be graceful: if the table/row doesn't exist yet, render defaults so the
  // page still loads (saving will surface a clear error until the SQL is run).
  if (error || !data) return DEFAULT_SETTINGS;
  return { ...DEFAULT_SETTINGS, ...data };
}

export async function updateSettings(formData: FormData): Promise<SaveResult> {
  const payload: Record<string, string> = {};
  for (const key of FIELDS) {
    payload[key] = ((formData.get(key) as string) ?? "").trim();
  }

  if (!payload.site_name) {
    return { success: false, message: "Site name is required." };
  }
  if (payload.contact_email && !EMAIL_RE.test(payload.contact_email)) {
    return { success: false, message: "Please enter a valid contact email address." };
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ id: 1, ...payload, updated_at: new Date().toISOString() });

  if (error) {
    return { success: false, message: error.message || "Failed to save settings." };
  }

  // Refresh the admin page, and the public layout in case it reads settings.
  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
  return { success: true, message: "Settings saved successfully." };
}
