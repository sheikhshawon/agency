"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-[#04051B] text-white">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 flex flex-col border-r border-[#1A1A1A] bg-[#070707]">
        <div className="h-16 flex items-center px-5 border-b border-[#1A1A1A]">
          <span className="text-sm font-bold text-white tracking-wide">Enif Admin</span>
        </div>
        <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-[#1B6BFF]/15 text-[#1B6BFF]"
                    : "text-[#808080] hover:text-white hover:bg-[#111111]"
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-[#1A1A1A]">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#606060] hover:text-white transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
