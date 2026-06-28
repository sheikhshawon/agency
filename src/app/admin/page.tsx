import Link from "next/link";
import {
  FolderKanban,
  Star,
  Tag,
  TrendingUp,
  Plus,
  ArrowUpRight,
  ExternalLink,
  Globe,
} from "lucide-react";
import { getProjects } from "@/app/admin/projects/actions";

export const dynamic = "force-dynamic";

const CATEGORY_COLORS: Record<string, { bar: string; badge: string }> = {
  "Web Development":    { bar: "bg-blue-500",   badge: "bg-blue-50 text-blue-600 border-blue-100" },
  "Business Solutions": { bar: "bg-purple-500", badge: "bg-purple-50 text-purple-600 border-purple-100" },
  "Marketing & Growth": { bar: "bg-green-500",  badge: "bg-green-50 text-green-600 border-green-100" },
  "AI & Automation":    { bar: "bg-orange-500", badge: "bg-orange-50 text-orange-600 border-orange-100" },
  "Brand & Design":     { bar: "bg-pink-500",   badge: "bg-pink-50 text-pink-600 border-pink-100" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default async function AdminDashboardPage() {
  const projects = await getProjects();

  const total      = projects.length;
  const featured   = projects.filter((p) => p.featured).length;
  const allTags    = new Set(projects.flatMap((p) => p.tags));
  const recent     = [...projects].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

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
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">{greeting()}, Admin</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/projects"
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

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Projects"
          value={total}
          sub="in portfolio"
          icon={<FolderKanban size={20} className="text-[#1B6BFF]" />}
          iconBg="bg-blue-50"
          trend={total > 0 ? "Active" : "Empty"}
          trendUp
        />
        <StatCard
          label="Featured"
          value={featured}
          sub={`of ${total} total`}
          icon={<Star size={20} className="text-amber-500 fill-amber-400" />}
          iconBg="bg-amber-50"
          trend={featured > 0 ? "On homepage" : "None set"}
          trendUp={featured > 0}
        />
        <StatCard
          label="Categories"
          value={categories.length}
          sub="unique types"
          icon={<TrendingUp size={20} className="text-purple-500" />}
          iconBg="bg-purple-50"
          trend="Organized"
          trendUp
        />
        <StatCard
          label="Tech Tags"
          value={allTags.size}
          sub="unique technologies"
          icon={<Tag size={20} className="text-green-500" />}
          iconBg="bg-green-50"
          trend="Stack coverage"
          trendUp
        />
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-5">

        {/* Recent projects */}
        <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F3F8]">
            <div>
              <p className="text-sm font-bold text-[#111827]">Recent Projects</p>
              <p className="text-xs text-[#9CA3AF] mt-0.5">Latest additions to your portfolio</p>
            </div>
            <Link
              href="/admin/projects"
              className="flex items-center gap-1 text-xs font-medium text-[#1B6BFF] hover:underline"
            >
              View all <ArrowUpRight size={12} />
            </Link>
          </div>

          {recent.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 px-6">
              <div className="w-12 h-12 rounded-2xl bg-[#F4F6FB] flex items-center justify-center">
                <FolderKanban size={22} className="text-[#9CA3AF]" />
              </div>
              <p className="text-sm font-medium text-[#374151]">No projects yet</p>
              <Link
                href="/admin/projects"
                className="text-xs text-[#1B6BFF] hover:underline font-medium"
              >
                Create your first project
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[#F1F3F8]">
              {recent.map((p) => {
                const badge = CATEGORY_COLORS[p.category ?? ""] ?? { badge: "bg-gray-50 text-gray-500 border-gray-100" };
                return (
                  <div key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[#FAFBFF] transition-colors group">
                    {/* Thumbnail */}
                    {p.thumbnail_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.thumbnail_url}
                        alt={p.title}
                        className="w-11 h-11 rounded-xl object-cover border border-[#E8ECF4] shrink-0"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-[#EEF3FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                        <FolderKanban size={16} className="text-[#1B6BFF]" />
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-[#111827] truncate">{p.title}</p>
                        {p.featured && <Star size={11} className="text-amber-400 fill-amber-400 shrink-0" />}
                      </div>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">{formatDate(p.created_at)}</p>
                    </div>

                    {/* Category */}
                    {p.category && (
                      <span className={`hidden sm:inline-flex px-2.5 py-1 rounded-lg border text-[10px] font-medium shrink-0 ${badge.badge}`}>
                        {p.category}
                      </span>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <Link
                        href={`/projects/${p.id}`}
                        target="_blank"
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:text-[#1B6BFF] hover:bg-[#EEF3FF] transition-colors"
                      >
                        <ExternalLink size={13} />
                      </Link>
                      <Link
                        href="/admin/projects"
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:text-[#374151] hover:bg-[#F4F6FB] transition-colors"
                      >
                        <ArrowUpRight size={13} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
                        <div
                          className={`h-full rounded-full ${colors.bar}`}
                          style={{ width: `${pct}%` }}
                        />
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
              <QuickAction href="/projects" target="_blank" icon={<Globe size={15} className="text-purple-500" />} label="View Portfolio" sub="Public projects page" />
              <QuickAction href="/" target="_blank" icon={<ExternalLink size={15} className="text-green-500" />} label="Open Website" sub="Home page" />
            </div>
          </div>

          {/* Featured highlight */}
          {featured > 0 && (
            <div className="rounded-2xl bg-gradient-to-br from-[#1B6BFF] to-[#0A4FCC] p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Star size={16} className="fill-white/80 text-white/80" />
                <span className="text-sm font-bold">Featured Projects</span>
              </div>
              <p className="text-3xl font-bold">{featured}</p>
              <p className="text-sm text-white/70 mt-1">
                {featured === 1 ? "project is" : "projects are"} shown on your homepage
              </p>
              <Link
                href="/admin/projects"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white underline underline-offset-2"
              >
                Manage featured <ArrowUpRight size={12} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label, value, sub, icon, iconBg, trend, trendUp,
}: {
  label: string;
  value: number;
  sub: string;
  icon: React.ReactNode;
  iconBg: string;
  trend: string;
  trendUp: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        <span className={`text-[10px] font-semibold px-2 py-1 rounded-lg ${trendUp ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-500"}`}>
          {trend}
        </span>
      </div>
      <div>
        <p className="text-2xl font-bold text-[#111827]">{value}</p>
        <p className="text-xs text-[#9CA3AF] mt-0.5">{label}</p>
      </div>
      <p className="text-[11px] text-[#D1D5DB] border-t border-[#F1F3F8] pt-3">{sub}</p>
    </div>
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
