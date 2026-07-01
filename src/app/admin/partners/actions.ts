"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { getCurrentAdmin } from "@/lib/auth";

const BUCKET = "media";
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB is plenty for a logo

export type PartnerRow = {
  id: string;
  name: string;
  logo_url: string;
  link_url: string | null;
  order_index: number;
  created_at: string;
};
export type PartnerResult = { success: boolean; message: string };

function anon() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// ── Public: partners for the marquee ─────────────────────────────
export async function getPartners(): Promise<PartnerRow[]> {
  try {
    const { data, error } = await anon()
      .from("partners")
      .select("*")
      .order("order_index", { ascending: true });
    if (error || !data) return [];
    return data as PartnerRow[];
  } catch {
    return [];
  }
}

// ── Admin: add a partner (uploads the logo to the media bucket) ──
export async function createPartner(formData: FormData): Promise<PartnerResult> {
  if (!(await getCurrentAdmin())) return { success: false, message: "Unauthorized." };

  const name = ((formData.get("name") as string) ?? "").trim();
  const link_url = ((formData.get("link_url") as string) ?? "").trim();
  let logo_url = ((formData.get("logo_url") as string) ?? "").trim();
  const file = formData.get("logo");

  if (!name) return { success: false, message: "Enter the partner's name." };

  const supabase = getSupabaseAdmin();

  // If a logo file was uploaded, store it and use its public URL.
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_BYTES) return { success: false, message: "Logo must be under 5 MB." };
    const dot = file.name.lastIndexOf(".");
    const ext = dot >= 0 ? file.name.slice(dot + 1).toLowerCase() : "png";
    const base = name.replace(/[^a-zA-Z0-9-_]/g, "-").replace(/-+/g, "-").slice(0, 40) || "partner";
    const path = `partners/${base}-${Date.now()}.${ext}`;
    const bytes = Buffer.from(await file.arrayBuffer());
    const { error: upErr } = await supabase.storage
      .from(BUCKET)
      .upload(path, bytes, { contentType: file.type || "image/png", upsert: false });
    if (upErr) return { success: false, message: upErr.message };
    logo_url = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
  }

  if (!logo_url) return { success: false, message: "Upload a logo or paste an image URL." };

  const { data: last } = await supabase
    .from("partners")
    .select("order_index")
    .order("order_index", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextIndex = (last?.order_index ?? -1) + 1;

  const { error } = await supabase
    .from("partners")
    .insert({ name, logo_url, link_url: link_url || null, order_index: nextIndex });
  if (error) return { success: false, message: error.message };

  revalidatePath("/admin/partners");
  revalidatePath("/", "layout");
  return { success: true, message: "Partner added." };
}

// ── Admin: remove a partner ──────────────────────────────────────
export async function deletePartner(formData: FormData): Promise<PartnerResult> {
  if (!(await getCurrentAdmin())) return { success: false, message: "Unauthorized." };

  const id = (formData.get("id") as string) ?? "";
  if (!id) return { success: false, message: "Missing id." };

  const { error } = await getSupabaseAdmin().from("partners").delete().eq("id", id);
  if (error) return { success: false, message: error.message };

  revalidatePath("/admin/partners");
  revalidatePath("/", "layout");
  return { success: true, message: "Partner removed." };
}

// ── Admin: reorder (swap with neighbour) ─────────────────────────
export async function movePartner(formData: FormData): Promise<PartnerResult> {
  if (!(await getCurrentAdmin())) return { success: false, message: "Unauthorized." };

  const id = (formData.get("id") as string) ?? "";
  const dir = (formData.get("dir") as string) === "up" ? "up" : "down";

  const supabase = getSupabaseAdmin();
  const { data: items } = await supabase
    .from("partners")
    .select("id, order_index")
    .order("order_index", { ascending: true });
  if (!items) return { success: false, message: "Could not load partners." };

  const idx = items.findIndex((i) => i.id === id);
  const swapWith = dir === "up" ? idx - 1 : idx + 1;
  if (idx < 0 || swapWith < 0 || swapWith >= items.length) {
    return { success: true, message: "" };
  }

  const a = items[idx];
  const b = items[swapWith];
  await supabase.from("partners").update({ order_index: b.order_index }).eq("id", a.id);
  await supabase.from("partners").update({ order_index: a.order_index }).eq("id", b.id);

  revalidatePath("/admin/partners");
  revalidatePath("/", "layout");
  return { success: true, message: "Reordered." };
}
