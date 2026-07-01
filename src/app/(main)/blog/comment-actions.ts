"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export type CommentRow = {
  id: string;
  blog_id: string;
  author_name: string;
  body: string;
  created_at: string;
};

export type CommentResult = { success: boolean; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Read a post's approved comments (newest first) ───────────────
export async function getComments(blogId: string): Promise<CommentRow[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("blog_comments")
    .select("id, blog_id, author_name, body, created_at")
    .eq("blog_id", blogId)
    .order("created_at", { ascending: false });

  if (error) return [];
  return data ?? [];
}

// ── Post a new comment from the public blog page ─────────────────
export async function addComment(formData: FormData): Promise<CommentResult> {
  const blog_id = ((formData.get("blog_id") as string) ?? "").trim();
  const slug = ((formData.get("slug") as string) ?? "").trim();
  const author_name = ((formData.get("author_name") as string) ?? "").trim();
  const email = ((formData.get("email") as string) ?? "").trim().toLowerCase();
  const body = ((formData.get("body") as string) ?? "").trim();

  if (!blog_id) return { success: false, message: "Missing post reference." };
  if (!author_name) return { success: false, message: "Please enter your name." };
  if (email && !EMAIL_RE.test(email)) {
    return { success: false, message: "Enter a valid email or leave it blank." };
  }
  if (body.length < 2) return { success: false, message: "Please write a comment." };
  if (body.length > 2000) {
    return { success: false, message: "Comment is too long (max 2000 characters)." };
  }

  const supabase = getSupabase();
  const { error } = await supabase
    .from("blog_comments")
    .insert({ blog_id, author_name, email: email || null, body });

  if (error) {
    return { success: false, message: "Could not post your comment. Please try again." };
  }

  if (slug) revalidatePath(`/blog/${slug}`);
  return { success: true, message: "Comment posted. Thanks for joining the discussion!" };
}
