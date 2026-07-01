"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Activity, Files, FolderKanban, FileText, BarChart3, Mail, Inbox, Bell, Users, Settings, ArrowUpRight, ChevronRight, LogOut, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { getUnreadCount } from "@/app/admin/messages/actions";
import { logout } from "@/app/admin/login/actions";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href: string; icon: typeof LayoutDashboard; children?: NavChild[] };

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Analytics", href: "/admin/analytics", icon: Activity },
  { label: "Pages", href: "/admin/pages", icon: Files },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban, children: [{ label: "New", href: "/admin/projects/new" }] },
  { label: "Case Studies", href: "/admin/case-studies", icon: BarChart3, children: [{ label: "New", href: "/admin/case-studies/new" }] },
  { label: "Blog", href: "/admin/blog", icon: FileText, children: [{ label: "New", href: "/admin/blog/new" }] },
  { label: "Messages", href: "/admin/messages", icon: Inbox },
  { label: "Subscribers", href: "/admin/subscribers", icon: Mail },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [unread, setUnread] = useState(0);

  const isLoginPage = pathname === "/admin/login";

  // Live unread-message count for the nav badge + notification bell.
  useEffect(() => {
    if (isLoginPage) return;
    let active = true;
    const load = () => getUnreadCount().then((n) => { if (active) setUnread(n); }).catch(() => {});
    load();
    const interval = setInterval(load, 20000);
    return () => { active = false; clearInterval(interval); };
  }, [pathname, isLoginPage]);

  // The login page renders without the dashboard chrome.
  if (isLoginPage) return <>{children}</>;

  return (
    <div className="min-h-screen flex bg-[#F4F6FB] text-[#111827]">

      {/* Sidebar */}
      <aside className="w-60 shrink-0 flex flex-col bg-white border-r border-[#E8ECF4] shadow-sm">

        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-[#E8ECF4]">
          <Image
            src="/images/logo/enif-favicon-dark.png"
            alt="Enif IT"
            width={32}
            height={32}
            className="object-contain shrink-0"
            priority
          />
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
          {NAV.map(({ label, href, icon: Icon, children }) => {
            const inSection = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            // The parent is "active" for its own list page, not when a child route is open.
            const active = inSection && !children?.some((c) => pathname === c.href);
            return (
              <div key={href}>
                <Link
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
                  {href === "/admin/messages" && unread > 0 && (
                    <span className="min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">
                      {unread > 99 ? "99+" : unread}
                    </span>
                  )}
                  {active && <ChevronRight size={13} className="text-[#1B6BFF]/50" />}
                </Link>

                {/* Sub-menu: shown while its section is open */}
                {children && inSection && (
                  <div className="mt-0.5 mb-1 ml-[26px] pl-3 border-l border-[#E8ECF4] flex flex-col gap-0.5">
                    {children.map((child) => {
                      const childActive = pathname === child.href;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium transition-all",
                            childActive
                              ? "bg-[#EEF3FF] text-[#1B6BFF]"
                              : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F4F6FB]"
                          )}
                        >
                          <Plus size={13} className="shrink-0" />
                          <span className="flex-1">{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-[#E8ECF4] flex flex-col gap-0.5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-[#6B7280] hover:text-[#111827] hover:bg-[#F4F6FB] transition-all group"
          >
            <ArrowUpRight size={15} className="group-hover:text-[#1B6BFF] transition-colors" />
            View Website
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-[#6B7280] hover:text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut size={15} />
              Log Out
            </button>
          </form>
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
            {/* Notification bell */}
            <Link
              href="/admin/messages"
              aria-label={`Messages${unread > 0 ? ` (${unread} unread)` : ""}`}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl text-[#6B7280] hover:text-[#111827] hover:bg-[#F4F6FB] transition-colors"
            >
              <Bell size={18} />
              {unread > 0 && (
                <span className="absolute top-1 right-1 min-w-[16px] h-[16px] px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[9px] font-bold ring-2 ring-white">
                  {unread > 99 ? "99+" : unread}
                </span>
              )}
            </Link>
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
