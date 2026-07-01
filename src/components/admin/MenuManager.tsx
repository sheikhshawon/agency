"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, GripVertical, Link2 } from "lucide-react";
import {
  createMenuItem, deleteMenuItem, moveMenuItem, getMenuItems,
  type MenuItemRow, type MenuLocation,
} from "@/app/admin/menu/actions";

// Quick-add list of the site's known pages.
const SITE_PAGES: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function MenuManager({
  initialHeader,
  initialFooter,
}: {
  initialHeader: MenuItemRow[];
  initialFooter: MenuItemRow[];
}) {
  const [header, setHeader] = useState(initialHeader);
  const [footer, setFooter] = useState(initialFooter);
  const setFor = (loc: MenuLocation) => (loc === "header" ? setHeader : setFooter);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Menu</h1>
        <p className="text-sm text-[#6B7280] mt-0.5">
          Manage the links shown in your site header and footer — add pages, reorder, or remove.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <MenuPanel
          title="Header Menu"
          subtitle="Main navigation bar"
          location="header"
          items={header}
          onChange={setFor("header")}
        />
        <MenuPanel
          title="Footer Menu"
          subtitle="Links in the site footer"
          location="footer"
          items={footer}
          onChange={setFor("footer")}
        />
      </div>
    </div>
  );
}

function MenuPanel({
  title, subtitle, location, items, onChange,
}: {
  title: string;
  subtitle: string;
  location: MenuLocation;
  items: MenuItemRow[];
  onChange: (rows: MenuItemRow[]) => void;
}) {
  const [label, setLabel] = useState("");
  const [href, setHref] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const refresh = async () => onChange(await getMenuItems(location));

  function pickPage(value: string) {
    const page = SITE_PAGES.find((p) => p.href === value);
    if (page) {
      setLabel(page.label);
      setHref(page.href);
    }
  }

  function add() {
    setNotice(null);
    if (!label.trim() || !href.trim()) {
      setNotice("Enter a label and a link.");
      return;
    }
    const form = new FormData();
    form.set("location", location);
    form.set("label", label);
    form.set("href", href);
    start(async () => {
      const res = await createMenuItem(form);
      if (res.success) {
        setLabel(""); setHref("");
        await refresh();
      } else setNotice(res.message);
    });
  }

  function remove(id: string) {
    const form = new FormData();
    form.set("id", id);
    start(async () => {
      const res = await deleteMenuItem(form);
      if (res.success) onChange(items.filter((i) => i.id !== id));
    });
  }

  function move(id: string, dir: "up" | "down") {
    const form = new FormData();
    form.set("id", id);
    form.set("dir", dir);
    form.set("location", location);
    start(async () => {
      await moveMenuItem(form);
      await refresh();
    });
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-[#F1F3F8]">
        <p className="text-sm font-bold text-[#111827]">{title}</p>
        <p className="text-xs text-[#9CA3AF] mt-0.5">{subtitle} · {items.length} item{items.length === 1 ? "" : "s"}</p>
      </div>

      {/* Items */}
      <div className="divide-y divide-[#F1F3F8]">
        {items.length === 0 ? (
          <p className="text-xs text-[#9CA3AF] text-center py-8">No items yet — add one below.</p>
        ) : (
          items.map((item, i) => (
            <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover:bg-[#FAFBFF] transition-colors group">
              <GripVertical size={14} className="text-[#D1D5DB] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#111827] truncate">{item.label}</p>
                <p className="text-[11px] text-[#9CA3AF] truncate flex items-center gap-1">
                  <Link2 size={10} /> {item.href}
                </p>
              </div>
              <div className="flex items-center gap-0.5 shrink-0">
                <button
                  onClick={() => move(item.id, "up")}
                  disabled={pending || i === 0}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:text-[#374151] hover:bg-[#F4F6FB] transition-colors disabled:opacity-30"
                  aria-label="Move up"
                >
                  <ChevronUp size={15} />
                </button>
                <button
                  onClick={() => move(item.id, "down")}
                  disabled={pending || i === items.length - 1}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:text-[#374151] hover:bg-[#F4F6FB] transition-colors disabled:opacity-30"
                  aria-label="Move down"
                >
                  <ChevronDown size={15} />
                </button>
                <button
                  onClick={() => remove(item.id)}
                  disabled={pending}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                  aria-label="Remove"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add */}
      <div className="border-t border-[#F1F3F8] p-4 flex flex-col gap-2.5 bg-[#FAFBFF]">
        <select
          onChange={(e) => pickPage(e.target.value)}
          value=""
          className="w-full rounded-lg border border-[#E8ECF4] bg-white px-3 py-2 text-sm text-[#374151]"
        >
          <option value="">Quick-add a page…</option>
          {SITE_PAGES.map((p) => (
            <option key={p.href} value={p.href}>{p.label} ({p.href})</option>
          ))}
        </select>
        <div className="flex gap-2">
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Label"
            className="w-1/2 rounded-lg border border-[#E8ECF4] bg-white px-3 py-2 text-sm"
          />
          <input
            value={href}
            onChange={(e) => setHref(e.target.value)}
            placeholder="/path or https://…"
            className="w-1/2 rounded-lg border border-[#E8ECF4] bg-white px-3 py-2 text-sm"
          />
        </div>
        {notice && <p className="text-xs text-red-600">{notice}</p>}
        <button
          onClick={add}
          disabled={pending}
          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#1B6BFF] hover:bg-[#1557CC] text-white text-sm font-semibold transition-colors disabled:opacity-60"
        >
          <Plus size={15} /> Add to {location} menu
        </button>
      </div>
    </div>
  );
}
