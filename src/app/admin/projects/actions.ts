"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export type ProjectRow = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  thumbnail_url: string | null;
  tags: string[];
  live_url: string | null;
  github_url: string | null;
  year: string | null;
  featured: boolean;
  order_index: number;
  created_at: string;
};

export async function getProjectById(id: string): Promise<ProjectRow | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function getRelatedProjects(category: string | null, excludeId: string): Promise<ProjectRow[]> {
  const supabase = getSupabase();
  if (!category) return [];
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("category", category)
    .neq("id", excludeId)
    .order("order_index", { ascending: true })
    .limit(3);
  return data ?? [];
}

export async function getProjects(): Promise<ProjectRow[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createProject(formData: FormData) {
  "use server";
  const supabase = getSupabase();

  const tagsRaw = (formData.get("tags") as string) ?? "";
  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const { error } = await supabase.from("projects").insert({
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || null,
    category: (formData.get("category") as string) || null,
    thumbnail_url: (formData.get("thumbnail_url") as string) || null,
    tags,
    live_url: (formData.get("live_url") as string) || null,
    github_url: (formData.get("github_url") as string) || null,
    year: (formData.get("year") as string) || String(new Date().getFullYear()),
    featured: formData.get("featured") === "true",
    order_index: Number(formData.get("order_index") || 0),
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}

export async function updateProject(formData: FormData) {
  "use server";
  const supabase = getSupabase();
  const id = formData.get("id") as string;

  const tagsRaw = (formData.get("tags") as string) ?? "";
  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const { error } = await supabase
    .from("projects")
    .update({
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || null,
      category: (formData.get("category") as string) || null,
      thumbnail_url: (formData.get("thumbnail_url") as string) || null,
      tags,
      live_url: (formData.get("live_url") as string) || null,
      github_url: (formData.get("github_url") as string) || null,
      year: (formData.get("year") as string) || String(new Date().getFullYear()),
      featured: formData.get("featured") === "true",
      order_index: Number(formData.get("order_index") || 0),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}

export async function deleteProject(formData: FormData) {
  "use server";
  const supabase = getSupabase();
  const id = formData.get("id") as string;

  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}
