import Link from "next/link";
import {
  FolderKanban,
  Star,
  Plus,
  ArrowUpRight,
  ExternalLink,
  Globe,
  Inbox,
  Mail,
  FileText,
  BarChart3,
  Activity,
  Users,
  Eye,
  MousePointerClick,
} from "lucide-react";
import { getProjects } from "@/app/admin/projects/actions";
import { getMessages } from "@/app/admin/messages/actions";
import { getSubscribers } from "@/app/admin/subscribers/actions";
import { getBlogs } from "@/app/admin/blog/actions";
import { getCaseStudies } from "@/app/admin/case-studies/actions";
import { getAnalyticsOverview, type AnalyticsOverview } from "@/lib/analytics";

export const dynamic = "force-dynamic";

const CATEGORY_COLORS: Record<string, { bar: string; badge: string }> = {
  "Web Development":    { bar: "bg-blue-500",   badge: "bg-blue-50 text-blue-600 border-blue-100" },
  "Business Solutions": { bar: "bg-purple-500", badge: "bg-purple-50 text-purple-600 border-purple-100" },
  "Marketing & Growth": { bar: "bg-green-500",  badge: "bg-green-50 text-green-600 border-green-100" },
  "AI & Automation":    { bar: "bg-orange-500", badge: "bg-orange-50 text-orange-600 border-orange-100" },
  "Brand & Design":     { bar: "bg-pink-500",   badge: "bg-pink-50 text-pink-600 border-pink-100" },
};

const fmt = (n: number) => n.toLocaleString("en-US");

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/** Compact "2h ago" / "3d ago" relative time for the messages feed. */
function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;
  return formatDate(iso);
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default async function AdminDashboardPage() {
  const [projects, messages, subscribers, blogs, caseStudies, analytics] = await Promise.all([
    getProjects(),
    getMessages(),
    getSubscribers(),
    getBlogs(),
    getCaseStudies(),
    getAnalyticsOverview(),
  ]);

  const total    = projects.length;
  const featured = projects.filter((p) => p.featured).length;
  const unread   = messages.filter((m) => !m.is_read).length;

  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);
  const recentMessages = messages.slice(0, 5); // getMessages() is already newest-first

  // Category breakdown
  const catMap: Record<string, number> = {};
  for (const p of projects) {
    const c = p.category ?? "Uncategorized";
    catMap[c] = (catMap[c] ?? 0) + 1;
  }
  const categories = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
  const maxCatCount = categories[0]?.[1] ?? 1;

  return (
    <div className="flex flex-col gap-6">

      {/* Welcome */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">{greeting()}, Admin</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8ECF4] text-[#374151] text-sm font-medium rounded-xl hover:bg-[#F4F6FB] transition-colors shadow-sm"
          >
            <Globe size={15} />
            View Site
          </Link>
          <Link
            href="/admin/projects"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1B6BFF] hover:bg-[#1557CC] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200"
          >
            <Plus size={15} />
            New Project
          </Link>
        </div>
      </div>

      {/* Analytics summary */}
      {analytics.status === "ok" && <AnalyticsBand data={analytics.data} />}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          label="Projects"
          value={total}
          sub="in portfolio"
          icon={<FolderKanban size={18} className="text-[#1B6BFF]" />}
          iconBg="bg-blue-50"
          href="/admin/projects"
        />
        <StatCard
          label="Featured"
          value={featured}
          sub={`of ${total} shown`}
          icon={<Star size={18} className="text-amber-500 fill-amber-400" />}
          iconBg="bg-amber-50"
          href="/admin/projects"
        />
        <StatCard
          label="Blog Posts"
          value={blogs.length}
          sub="articles"
          icon={<FileText size={18} className="text-purple-500" />}
          iconBg="bg-purple-50"
          href="/admin/blog"
        />
        <StatCard
          label="Case Studies"
          value={caseStudies.length}
          sub="published"
          icon={<BarChart3 size={18} className="text-green-500" />}
          iconBg="bg-green-50"
          href="/admin/case-studies"
        />
        <StatCard
          label="Subscribers"
          value={subscribers.length}
          sub="newsletter"
          icon={<Mail size={18} className="text-cyan-500" />}
          iconBg="bg-cyan-50"
          href="/admin/subscribers"
        />
        <StatCard
          label="Messages"
          value={messages.length}
          sub={unread > 0 ? `${unread} unread` : "all read"}
          icon={<Inbox size={18} className="text-rose-500" />}
          iconBg="bg-rose-50"
          badge={unread > 0 ? unread : undefined}
          href="/admin/messages"
        />
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-[1fr_340px] gap-5 items-start">

        {/* Left column */}
        <div className="flex flex-col gap-5 min-w-0">

          {/* Recent messages */}
          <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F3F8]">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-[#111827]">Recent Messages</p>
                {unread > 0 && (
                  <span className="min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">
                    {unread > 99 ? "99+" : unread}
                  </span>
                )}
              </div>
              <Link href="/admin/messages" className="flex items-center gap-1 text-xs font-medium text-[#1B6BFF] hover:underline">
                View all <ArrowUpRight size={12} />
              </Link>
            </div>

            {recentMessages.length === 0 ? (
              <EmptyState icon={<Inbox size={22} className="text-[#9CA3AF]" />} title="No messages yet" hint="Contact-form submissions will appear here." />
            ) : (
              <div className="divide-y divide-[#F1F3F8]">
                {recentMessages.map((m) => (
                  <Link
                    key={m.id}
                    href="/admin/messages"
                    className="flex items-start gap-3 px-6 py-3.5 hover:bg-[#FAFBFF] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#EEF3FF] border border-[#DBEAFE] flex items-center justify-center shrink-0 text-[#1B6BFF] text-xs font-bold uppercase">
                      {m.full_name.trim().charAt(0) || "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {!m.is_read && <span className="w-1.5 h-1.5 rounded-full bg-[#1B6BFF] shrink-0" />}
                        <p className={`text-sm truncate ${m.is_read ? "font-medium text-[#374151]" : "font-bold text-[#111827]"}`}>
                          {m.full_name}
                        </p>
                        <span className="text-[10px] text-[#9CA3AF] ml-auto shrink-0">{timeAgo(m.created_at)}</span>
                      </div>
                      <p className="text-xs text-[#9CA3AF] mt-0.5 truncate">
                        {m.service ? <span className="text-[#6B7280] font-medium">{m.service} · </span> : null}
                        {m.message}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Recent projects */}
          <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F3F8]">
              <div>
                <p className="text-sm font-bold text-[#111827]">Recent Projects</p>
                <p className="text-xs text-[#9CA3AF] mt-0.5">Latest additions to your portfolio</p>
              </div>
              <Link href="/admin/projects" className="flex items-center gap-1 text-xs font-medium text-[#1B6BFF] hover:underline">
                View all <ArrowUpRight size={12} />
              </Link>
            </div>

            {recentProjects.length === 0 ? (
              <EmptyState
                icon={<FolderKanban size={22} className="text-[#9CA3AF]" />}
                title="No projects yet"
                hint="Create your first project"
                href="/admin/projects"
              />
            ) : (
              <div className="divide-y divide-[#F1F3F8]">
                {recentProjects.map((p) => {
                  const badge = CATEGORY_COLORS[p.category ?? ""] ?? { badge: "bg-gray-50 text-gray-500 border-gray-100" };
                  return (
                    <div key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[#FAFBFF] transition-colors group">
                      {p.thumbnail_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.thumbnail_url} alt={p.title} className="w-11 h-11 rounded-xl object-cover border border-[#E8ECF4] shrink-0" />
                      ) : (
                        <div className="w-11 h-11 rounded-xl bg-[#EEF3FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                          <FolderKanban size={16} className="text-[#1B6BFF]" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-[#111827] truncate">{p.title}</p>
                          {p.featured && <Star size={11} className="text-amber-400 fill-amber-400 shrink-0" />}
                        </div>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">{formatDate(p.created_at)}</p>
                      </div>
                      {p.category && (
                        <span className={`hidden sm:inline-flex px-2.5 py-1 rounded-lg border text-[10px] font-medium shrink-0 ${badge.badge}`}>
                          {p.category}
                        </span>
                      )}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        <Link href={`/projects/${p.id}`} target="_blank" className="w-7 h-7 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:text-[#1B6BFF] hover:bg-[#EEF3FF] transition-colors">
                          <ExternalLink size={13} />
                        </Link>
                        <Link href="/admin/projects" className="w-7 h-7 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:text-[#374151] hover:bg-[#F4F6FB] transition-colors">
                          <ArrowUpRight size={13} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">

          {/* Category breakdown */}
          <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-[#F1F3F8]">
              <p className="text-sm font-bold text-[#111827]">By Category</p>
              <p className="text-xs text-[#9CA3AF] mt-0.5">Project distribution</p>
            </div>
            <div className="px-5 py-4 flex flex-col gap-4">
              {categories.length === 0 ? (
                <p className="text-xs text-[#9CA3AF] text-center py-4">No data yet</p>
              ) : (
                categories.map(([cat, count]) => {
                  const colors = CATEGORY_COLORS[cat] ?? { bar: "bg-gray-400", badge: "" };
                  const pct = Math.round((count / maxCatCount) * 100);
                  return (
                    <div key={cat}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-[#374151] truncate max-w-[160px]">{cat}</span>
                        <span className="text-xs font-bold text-[#111827] ml-2">{count}</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#F1F3F8] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${colors.bar}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-[#F1F3F8]">
              <p className="text-sm font-bold text-[#111827]">Quick Actions</p>
            </div>
            <div className="p-3 flex flex-col gap-1">
              <QuickAction href="/admin/projects" icon={<FolderKanban size={15} className="text-[#1B6BFF]" />} label="Manage Projects" sub="Add, edit or delete" />
              <QuickAction href="/admin/messages" icon={<Inbox size={15} className="text-rose-500" />} label="Messages" sub={unread > 0 ? `${unread} unread` : "Inbox"} />
              <QuickAction href="/admin/analytics" icon={<Activity size={15} className="text-green-500" />} label="Analytics" sub="Live traffic" />
              <QuickAction href="/admin/settings" icon={<Globe size={15} className="text-purple-500" />} label="Site Settings" sub="Contact & socials" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Analytics band ───────────────────────────────────────────────────────────

function AnalyticsBand({ data }: { data: AnalyticsOverview }) {
  const { kpis, rangeDays } = data;
  const items = [
    { label: "Active now", value: fmt(kpis.activeNow), icon: <Activity size={15} className="text-green-600" />, live: true },
    { label: `Users · ${rangeDays}d`, value: fmt(kpis.users), icon: <Users size={15} className="text-[#1B6BFF]" /> },
    { label: `Page views · ${rangeDays}d`, value: fmt(kpis.pageViews), icon: <Eye size={15} className="text-purple-500" /> },
    { label: `Sessions · ${rangeDays}d`, value: fmt(kpis.sessions), icon: <MousePointerClick size={15} className="text-amber-500" /> },
  ];
  return (
    <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#F1F3F8]">
        <p className="text-sm font-bold text-[#111827]">Live Traffic</p>
        <Link href="/admin/analytics" className="flex items-center gap-1 text-xs font-medium text-[#1B6BFF] hover:underline">
          Full report <ArrowUpRight size={12} />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[#F1F3F8]">
        {items.map((it) => (
          <div key={it.label} className="px-6 py-4 flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              {it.icon}
              <span className="text-[11px] text-[#9CA3AF] font-medium">{it.label}</span>
              {it.live && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
            </div>
            <p className="text-xl font-bold text-[#111827]">{it.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Shared bits ──────────────────────────────────────────────────────────────

function EmptyState({ icon, title, hint, href }: { icon: React.ReactNode; title: string; hint: string; href?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-14 px-6 text-center">
      <div className="w-12 h-12 rounded-2xl bg-[#F4F6FB] flex items-center justify-center">{icon}</div>
      <p className="text-sm font-medium text-[#374151]">{title}</p>
      {href ? (
        <Link href={href} className="text-xs text-[#1B6BFF] hover:underline font-medium">{hint}</Link>
      ) : (
        <p className="text-xs text-[#9CA3AF] max-w-xs">{hint}</p>
      )}
    </div>
  );
}

function StatCard({
  label, value, sub, icon, iconBg, href, badge,
}: {
  label: string;
  value: number;
  sub: string;
  icon: React.ReactNode;
  iconBg: string;
  href: string;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm p-5 flex flex-col gap-3 hover:border-[#1B6BFF]/30 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>{icon}</div>
        {badge !== undefined && (
          <span className="min-w-[20px] h-5 px-1.5 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">
            {badge > 99 ? "99+" : badge}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-[#111827]">{value}</p>
        <p className="text-xs text-[#9CA3AF] mt-0.5">{label}</p>
      </div>
      <p className="text-[11px] text-[#D1D5DB] border-t border-[#F1F3F8] pt-3">{sub}</p>
    </Link>
  );
}

function QuickAction({
  href, icon, label, sub, target,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
  target?: string;
}) {
  return (
    <Link
      href={href}
      target={target}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F4F6FB] transition-colors group"
    >
      <div className="w-8 h-8 rounded-lg bg-[#F4F6FB] flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#111827]">{label}</p>
        <p className="text-[10px] text-[#9CA3AF]">{sub}</p>
      </div>
      <ArrowUpRight size={13} className="text-[#D1D5DB] group-hover:text-[#1B6BFF] transition-colors shrink-0" />
    </Link>
  );
}
