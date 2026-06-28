"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, FileText, Settings, ArrowUpRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-[#F4F6FB] text-[#111827]">

      {/* Sidebar */}
      <aside className="w-60 shrink-0 flex flex-col bg-white border-r border-[#E8ECF4] shadow-sm">

        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-[#E8ECF4]">
          <div className="w-8 h-8 rounded-lg bg-[#1B6BFF] flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">E</span>
          </div>
          <div>
            <p className="text-sm font-bold text-[#111827] leading-tight">Enif IT</p>
            <p className="text-[10px] text-[#9CA3AF]">Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-5 px-3 flex flex-col gap-0.5">
          <p className="px-3 mb-2 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-widest">
            Main Menu
          </p>
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  active
                    ? "bg-[#EEF3FF] text-[#1B6BFF]"
                    : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F4F6FB]"
                )}
              >
                <Icon size={16} />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight size={13} className="text-[#1B6BFF]/50" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-[#E8ECF4]">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-[#6B7280] hover:text-[#111827] hover:bg-[#F4F6FB] transition-all group"
          >
            <ArrowUpRight size={15} className="group-hover:text-[#1B6BFF] transition-colors" />
            View Website
          </Link>
        </div>
      </aside>

      {/* Right side */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="h-16 bg-white border-b border-[#E8ECF4] flex items-center justify-between px-8 shrink-0 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
            <span className="text-[#9CA3AF]">Admin</span>
            <ChevronRight size={13} />
            <span className="text-[#111827] font-medium capitalize">
              {pathname.split("/").filter(Boolean).slice(1).join(" / ") || "Dashboard"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1B6BFF] flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  );
}
