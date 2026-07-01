import Link from "next/link";
import {
  Home, Info, LayoutGrid, FolderKanban, BarChart3, FileText,
  Package, Mail, ShieldCheck, ExternalLink, ArrowUpRight, Settings2,
} from "lucide-react";
import { getBlogs, getPublishedBlogs } from "@/app/admin/blog/actions";
import { getCaseStudies } from "@/app/admin/case-studies/actions";
import { getProjects } from "@/app/admin/projects/actions";

export const dynamic = "force-dynamic";

// The fixed, hand-built pages of the public site.
const CORE_PAGES = [
  { name: "Home", path: "/", desc: "Landing page", icon: Home },
  { name: "About", path: "/about", desc: "Company & team", icon: Info },
  { name: "Services", path: "/services", desc: "What we offer", icon: LayoutGrid },
  { name: "Projects", path: "/projects", desc: "Portfolio", icon: FolderKanban },
  { name: "Case Studies", path: "/case-studies", desc: "Client results", icon: BarChart3 },
  { name: "Blog", path: "/blog", desc: "Articles & news", icon: FileText },
  { name: "Products", path: "/products", desc: "Product offerings", icon: Package },
  { name: "Contact", path: "/contact", desc: "Get in touch", icon: Mail },
  { name: "Privacy Policy", path: "/privacy", desc: "Legal", icon: ShieldCheck },
] as const;

export default async function AdminPagesPage() {
  const [blogs, publishedBlogs, caseStudies, projects] = await Promise.all([
    getBlogs().catch(() => []),
    getPublishedBlogs().catch(() => []),
    getCaseStudies().catch(() => []),
    getProjects().catch(() => []),
  ]);

  const dynamicGroups = [
    {
      name: "Blog Posts",
      total: blogs.length,
      live: publishedBlogs.length,
      liveLabel: "published",
      basePath: "/blog",
      manage: "/admin/blog",
      icon: FileText,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      name: "Case Studies",
      total: caseStudies.length,
      live: caseStudies.length,
      liveLabel: "live",
      basePath: "/case-studies",
      manage: "/admin/case-studies",
      icon: BarChart3,
      iconBg: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      name: "Projects",
      total: projects.length,
      live: projects.length,
      liveLabel: "live",
      basePath: "/projects",
      manage: "/admin/projects",
      icon: FolderKanban,
      iconBg: "bg-blue-50",
      iconColor: "text-[#1B6BFF]",
    },
  ];

  const totalPages = CORE_PAGES.length + publishedBlogs.length + caseStudies.length + projects.length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Pages</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">
            Every page on your website — {totalPages} total
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8ECF4] text-[#374151] text-sm font-medium rounded-xl hover:bg-[#F4F6FB] transition-colors shadow-sm"
        >
          <ExternalLink size={15} />
          View Site
        </Link>
      </div>

      {/* Core pages */}
      <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#F1F3F8]">
          <p className="text-sm font-bold text-[#111827]">Core Pages</p>
          <p className="text-xs text-[#9CA3AF] mt-0.5">Fixed pages that make up your site</p>
        </div>
        <div className="divide-y divide-[#F1F3F8]">
          {CORE_PAGES.map(({ name, path, desc, icon: Icon }) => (
            <div key={path} className="flex items-center gap-4 px-6 py-3.5 hover:bg-[#FAFBFF] transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-[#EEF3FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                <Icon size={16} className="text-[#1B6BFF]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#111827] truncate">{name}</p>
                <p className="text-xs text-[#9CA3AF] truncate">{desc}</p>
              </div>
              <code className="hidden sm:block text-xs text-[#6B7280] bg-[#F4F6FB] border border-[#E8ECF4] rounded-lg px-2.5 py-1 shrink-0">
                {path}
              </code>
              <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-medium text-green-600 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Live
              </span>
              <Link
                href={path}
                target="_blank"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:text-[#1B6BFF] hover:bg-[#EEF3FF] transition-colors shrink-0"
                aria-label={`View ${name}`}
              >
                <ExternalLink size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic content pages */}
      <div>
        <p className="text-sm font-bold text-[#111827] mb-1">Dynamic Pages</p>
        <p className="text-xs text-[#9CA3AF] mb-4">
          Generated automatically from your content — manage them in their sections
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dynamicGroups.map((g) => (
            <div key={g.name} className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-xl ${g.iconBg} flex items-center justify-center`}>
                  <g.icon size={18} className={g.iconColor} />
                </div>
                <span className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-[#F4F6FB] text-[#6B7280]">
                  {g.total} page{g.total === 1 ? "" : "s"}
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-[#111827]">{g.name}</p>
                <p className="text-xs text-[#9CA3AF] mt-0.5">
                  <code className="text-[#6B7280]">{g.basePath}/…</code> · {g.live} {g.liveLabel}
                </p>
              </div>
              <div className="flex items-center gap-2 border-t border-[#F1F3F8] pt-3">
                <Link
                  href={g.manage}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#EEF3FF] text-[#1B6BFF] text-xs font-semibold hover:bg-[#E0EBFF] transition-colors"
                >
                  <Settings2 size={13} /> Manage
                </Link>
                <Link
                  href={g.basePath}
                  target="_blank"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#F4F6FB] text-[#374151] text-xs font-medium hover:bg-[#EAEEF6] transition-colors"
                >
                  View <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
