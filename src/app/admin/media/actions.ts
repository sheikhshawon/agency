"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { getCurrentAdmin } from "@/lib/auth";

// All media lives in a public Supabase Storage bucket (NOT the database).
const BUCKET = "media";
const MAX_BYTES = 20 * 1024 * 1024; // 20 MB

export type MediaFile = {
  name: string;
  url: string;
  size: number;
  mimeType: string;
  createdAt: string;
};

export type MediaResult = { success: boolean; message: string };

// ── List every file in the bucket, newest first ─────────────────
export async function listMedia(): Promise<MediaFile[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.storage.from(BUCKET).list("", {
    limit: 1000,
    sortBy: { column: "created_at", order: "desc" },
  });
  if (error || !data) return [];

  return data
    .filter((f) => f.id !== null) // skip nested folders
    .map((f) => ({
      name: f.name,
      url: supabase.storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl,
      size: (f.metadata?.size as number) ?? 0,
      mimeType: (f.metadata?.mimetype as string) ?? "",
      createdAt: f.created_at ?? f.updated_at ?? "",
    }));
}

// ── Upload one or more files ─────────────────────────────────────
export async function uploadMedia(formData: FormData): Promise<MediaResult> {
  // Only a signed-in admin may write to storage.
  if (!(await getCurrentAdmin())) {
    return { success: false, message: "Unauthorized. Please sign in as an admin." };
  }

  const files = formData
    .getAll("file")
    .filter((f): f is File => f instanceof File && f.size > 0);

  if (files.length === 0) return { success: false, message: "No file selected." };

  const supabase = getSupabaseAdmin();
  let uploaded = 0;

  for (const file of files) {
    if (file.size > MAX_BYTES) {
      return { success: false, message: `"${file.name}" is larger than 20 MB.` };
    }

    // Safe, unique object name: sanitized base + timestamp + extension.
    const dot = file.name.lastIndexOf(".");
    const ext = dot >= 0 ? file.name.slice(dot + 1).toLowerCase() : "";
    const base = (dot >= 0 ? file.name.slice(0, dot) : file.name)
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 60) || "file";
    const path = `${base}-${Date.now()}${ext ? `.${ext}` : ""}`;

    const bytes = Buffer.from(await file.arrayBuffer());
    const { error } = await supabase.storage.from(BUCKET).upload(path, bytes, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });
    if (error) return { success: false, message: error.message };
    uploaded++;
  }

  revalidatePath("/admin/media");
  return { success: true, message: `Uploaded ${uploaded} file${uploaded === 1 ? "" : "s"}.` };
}

// ── Delete a file ────────────────────────────────────────────────
export async function deleteMedia(formData: FormData): Promise<MediaResult> {
  // Only a signed-in admin may delete from storage.
  if (!(await getCurrentAdmin())) {
    return { success: false, message: "Unauthorized. Please sign in as an admin." };
  }

  const name = (formData.get("name") as string) ?? "";
  if (!name) return { success: false, message: "Missing file name." };

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.storage.from(BUCKET).remove([name]);
  if (error) return { success: false, message: error.message };

  revalidatePath("/admin/media");
  return { success: true, message: "File deleted." };
}
