"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { getCurrentAdmin } from "@/lib/auth";

export type MenuLocation = "header" | "footer";
export type MenuLink = { label: string; href: string };
export type MenuItemRow = {
  id: string;
  location: MenuLocation;
  label: string;
  href: string;
  order_index: number;
};
export type MenuResult = { success: boolean; message: string };

// Public anon client — read-only, used to render the public menus.
function anon() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Fallbacks so the site keeps working before the SQL is run / if the menu is empty.
const DEFAULTS: Record<MenuLocation, MenuLink[]> = {
  header: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],
  footer: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

// ── Public: menu links for the navbar/footer ─────────────────────
export async function getMenu(location: MenuLocation): Promise<MenuLink[]> {
  try {
    const { data, error } = await anon()
      .from("menu_items")
      .select("label, href, order_index")
      .eq("location", location)
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) return DEFAULTS[location];
    return data.map((d) => ({ label: d.label, href: d.href }));
  } catch {
    return DEFAULTS[location];
  }
}

// ── Admin: full rows for the manager ─────────────────────────────
export async function getMenuItems(location: MenuLocation): Promise<MenuItemRow[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("menu_items")
    .select("*")
    .eq("location", location)
    .order("order_index", { ascending: true });
  if (error || !data) return [];
  return data as MenuItemRow[];
}

// ── Admin: add an item (appended to the end) ─────────────────────
export async function createMenuItem(formData: FormData): Promise<MenuResult> {
  if (!(await getCurrentAdmin())) return { success: false, message: "Unauthorized." };

  const location = formData.get("location") as MenuLocation;
  const label = ((formData.get("label") as string) ?? "").trim();
  const href = ((formData.get("href") as string) ?? "").trim();

  if (location !== "header" && location !== "footer") {
    return { success: false, message: "Invalid menu." };
  }
  if (!label) return { success: false, message: "Enter a label." };
  if (!href) return { success: false, message: "Enter a link (URL or path)." };

  const supabase = getSupabaseAdmin();

  // Next order_index = current max + 1.
  const { data: last } = await supabase
    .from("menu_items")
    .select("order_index")
    .eq("location", location)
    .order("order_index", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextIndex = (last?.order_index ?? -1) + 1;

  const { error } = await supabase
    .from("menu_items")
    .insert({ location, label, href, order_index: nextIndex });
  if (error) return { success: false, message: error.message };

  revalidatePath("/admin/menu");
  revalidatePath("/", "layout");
  return { success: true, message: "Item added." };
}

// ── Admin: remove an item ────────────────────────────────────────
export async function deleteMenuItem(formData: FormData): Promise<MenuResult> {
  if (!(await getCurrentAdmin())) return { success: false, message: "Unauthorized." };

  const id = (formData.get("id") as string) ?? "";
  if (!id) return { success: false, message: "Missing id." };

  const { error } = await getSupabaseAdmin().from("menu_items").delete().eq("id", id);
  if (error) return { success: false, message: error.message };

  revalidatePath("/admin/menu");
  revalidatePath("/", "layout");
  return { success: true, message: "Item removed." };
}

// ── Admin: reorder (swap with the neighbour above/below) ─────────
export async function moveMenuItem(formData: FormData): Promise<MenuResult> {
  if (!(await getCurrentAdmin())) return { success: false, message: "Unauthorized." };

  const id = (formData.get("id") as string) ?? "";
  const dir = (formData.get("dir") as string) === "up" ? "up" : "down";
  const location = formData.get("location") as MenuLocation;

  const supabase = getSupabaseAdmin();
  const { data: items } = await supabase
    .from("menu_items")
    .select("id, order_index")
    .eq("location", location)
    .order("order_index", { ascending: true });
  if (!items) return { success: false, message: "Could not load menu." };

  const idx = items.findIndex((i) => i.id === id);
  const swapWith = dir === "up" ? idx - 1 : idx + 1;
  if (idx < 0 || swapWith < 0 || swapWith >= items.length) {
    return { success: true, message: "" }; // already at the edge — no-op
  }

  const a = items[idx];
  const b = items[swapWith];
  await supabase.from("menu_items").update({ order_index: b.order_index }).eq("id", a.id);
  await supabase.from("menu_items").update({ order_index: a.order_index }).eq("id", b.id);

  revalidatePath("/admin/menu");
  revalidatePath("/", "layout");
  return { success: true, message: "Reordered." };
}
