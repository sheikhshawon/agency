"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

// Public anon client — used ONLY for the public newsletter subscribe insert.
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export type SubscriberRow = {
  id: string;
  email: string;
  created_at: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SubscribeResult = { success: boolean; message: string };

export async function subscribe(formData: FormData): Promise<SubscribeResult> {
  const email = ((formData.get("email") as string) ?? "").trim().toLowerCase();

  if (!email || !EMAIL_RE.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  const supabase = getSupabase();
  const { error } = await supabase.from("subscribers").insert({ email });

  if (error) {
    // 23505 = unique_violation
    if (error.code === "23505") {
      return { success: true, message: "You're already subscribed. Thank you!" };
    }
    return { success: false, message: "Something went wrong. Please try again." };
  }

  revalidatePath("/admin/subscribers");
  return { success: true, message: "Thanks for subscribing!" };
}

export async function getSubscribers(): Promise<SubscriberRow[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function deleteSubscriber(formData: FormData) {
  "use server";
  const supabase = getSupabaseAdmin();
  const id = formData.get("id") as string;

  const { error } = await supabase.from("subscribers").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/subscribers");
}
