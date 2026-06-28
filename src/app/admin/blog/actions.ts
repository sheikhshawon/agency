"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export type BlogRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_url: string | null;
  category: string | null;
  tags: string[];
  author: string;
  status: "draft" | "published";
  featured: boolean;
  read_time: string | null;
  published_at: string | null;
  created_at: string;
};

export async function getBlogs(): Promise<BlogRow[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getBlogBySlug(slug: string): Promise<BlogRow | null> {
  const supabase = getSupabase();
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return data ?? null;
}

export async function getPublishedBlogs(): Promise<BlogRow[]> {
  const supabase = getSupabase();
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  return data ?? [];
}

export async function createBlog(formData: FormData) {
  "use server";
  const supabase = getSupabase();

  const tags = ((formData.get("tags") as string) ?? "")
    .split(",").map((t) => t.trim()).filter(Boolean);

  const status = formData.get("status") as string;

  const { error } = await supabase.from("blogs").insert({
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    excerpt: (formData.get("excerpt") as string) || null,
    content: (formData.get("content") as string) || null,
    cover_url: (formData.get("cover_url") as string) || null,
    category: (formData.get("category") as string) || null,
    tags,
    author: (formData.get("author") as string) || "Enif IT Team",
    status,
    featured: formData.get("featured") === "true",
    read_time: (formData.get("read_time") as string) || null,
    published_at: status === "published" ? new Date().toISOString() : null,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function updateBlog(formData: FormData) {
  "use server";
  const supabase = getSupabase();
  const id = formData.get("id") as string;

  const tags = ((formData.get("tags") as string) ?? "")
    .split(",").map((t) => t.trim()).filter(Boolean);

  const status = formData.get("status") as string;

  const { data: existing } = await supabase.from("blogs").select("status, published_at").eq("id", id).single();
  const wasPublished = existing?.status === "published";
  const isNowPublished = status === "published";

  const { error } = await supabase.from("blogs").update({
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    excerpt: (formData.get("excerpt") as string) || null,
    content: (formData.get("content") as string) || null,
    cover_url: (formData.get("cover_url") as string) || null,
    category: (formData.get("category") as string) || null,
    tags,
    author: (formData.get("author") as string) || "Enif IT Team",
    status,
    featured: formData.get("featured") === "true",
    read_time: (formData.get("read_time") as string) || null,
    published_at: isNowPublished && !wasPublished ? new Date().toISOString() : existing?.published_at ?? null,
  }).eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function deleteBlog(formData: FormData) {
  "use server";
  const supabase = getSupabase();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("blogs").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
