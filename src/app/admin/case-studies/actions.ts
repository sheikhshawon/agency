"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export type CaseStudyRow = {
  id: string;
  slug: string;
  client: string;
  title: string;
  industry: string | null;
  challenge: string | null;
  solution: string | null;
  outcome: string | null;
  metric: string | null;
  metric_label: string | null;
  cover_url: string | null;
  body: string | null;
  featured: boolean;
  order_index: number;
  created_at: string;
};

export async function getCaseStudies(): Promise<CaseStudyRow[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getCaseStudyById(id: string): Promise<CaseStudyRow | null> {
  const supabase = getSupabase();
  const { data } = await supabase
    .from("case_studies")
    .select("*")
    .eq("id", id)
    .single();
  return data ?? null;
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyRow | null> {
  const supabase = getSupabase();
  const { data } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", slug)
    .single();
  return data ?? null;
}

export async function getRelatedCaseStudies(industry: string | null, excludeId: string): Promise<CaseStudyRow[]> {
  const supabase = getSupabase();
  if (!industry) return [];
  const { data } = await supabase
    .from("case_studies")
    .select("*")
    .eq("industry", industry)
    .neq("id", excludeId)
    .order("order_index", { ascending: true })
    .limit(3);
  return data ?? [];
}

function parseForm(formData: FormData) {
  return {
    slug: formData.get("slug") as string,
    client: formData.get("client") as string,
    title: formData.get("title") as string,
    industry: (formData.get("industry") as string) || null,
    challenge: (formData.get("challenge") as string) || null,
    solution: (formData.get("solution") as string) || null,
    outcome: (formData.get("outcome") as string) || null,
    metric: (formData.get("metric") as string) || null,
    metric_label: (formData.get("metric_label") as string) || null,
    cover_url: (formData.get("cover_url") as string) || null,
    body: (formData.get("body") as string) || null,
    featured: formData.get("featured") === "true",
    order_index: Number(formData.get("order_index") || 0),
  };
}

export async function createCaseStudy(formData: FormData) {
  "use server";
  const supabase = getSupabase();
  const { error } = await supabase.from("case_studies").insert(parseForm(formData));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies");
}

export async function updateCaseStudy(formData: FormData) {
  "use server";
  const supabase = getSupabase();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("case_studies").update(parseForm(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies");
  revalidatePath(`/case-studies/${formData.get("slug")}`);
}

export async function deleteCaseStudy(formData: FormData) {
  "use server";
  const supabase = getSupabase();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("case_studies").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies");
}
