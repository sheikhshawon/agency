import type { Metadata } from "next";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/common/SectionHeading";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tech insights, business growth tips, and industry thought leadership from Enif IT.",
};

const BLOG_POSTS = [
  {
    id: "1",
    title: "Why AI Automation Is the Biggest ROI Lever for SMEs in 2025",
    excerpt: "Small and medium businesses are discovering that targeted AI automation — not enterprise-scale AI — is the fastest path to measurable ROI.",
    category: "AI & Automation",
    author: "Enif IT Team",
    date: "June 15, 2025",
    readTime: "5 min read",
    href: "/blog/ai-automation-roi-smes",
  },
  {
    id: "2",
    title: "The Hidden Cost of Bad UI: How Poor UX Kills Conversion Rates",
    excerpt: "Studies show 88% of users won't return after a bad experience. Here's how to audit and fix the UX issues costing you customers.",
    category: "Design",
    author: "Enif IT Team",
    date: "June 8, 2025",
    readTime: "7 min read",
    href: "/blog/bad-ui-kills-conversion",
  },
  {
    id: "3",
    title: "Next.js vs. Remix in 2025: Which Framework Wins for Your Project?",
    excerpt: "An honest technical comparison of the two dominant React meta-frameworks, focusing on real-world performance and DX.",
    category: "Development",
    author: "Enif IT Team",
    date: "May 28, 2025",
    readTime: "9 min read",
    href: "/blog/nextjs-vs-remix-2025",
  },
  {
    id: "4",
    title: "Building a Scalable SaaS Product: Architecture Decisions That Matter",
    excerpt: "The structural choices you make at the start will define your scalability ceiling. Here are the decisions we've learned matter most.",
    category: "Development",
    author: "Enif IT Team",
    date: "May 15, 2025",
    readTime: "11 min read",
    href: "/blog/scalable-saas-architecture",
  },
  {
    id: "5",
    title: "Brand Identity in 2025: Why Your Logo Is the Least Important Thing",
    excerpt: "Modern brand identity goes far beyond a mark. The companies winning customer loyalty are building brand systems, not just logos.",
    category: "Design",
    author: "Enif IT Team",
    date: "May 2, 2025",
    readTime: "6 min read",
    href: "/blog/brand-identity-2025",
  },
  {
    id: "6",
    title: "How to Choose the Right ERP for a Growing Business",
    excerpt: "With hundreds of options and steep implementation costs, choosing an ERP is one of the highest-stakes decisions a growing company makes.",
    category: "Business Solutions",
    author: "Enif IT Team",
    date: "April 20, 2025",
    readTime: "8 min read",
    href: "/blog/choose-right-erp",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "AI & Automation": "text-[#1B6BFF] bg-[#1B6BFF]/10 border-[#1B6BFF]/20",
  "Design": "text-purple-400 bg-purple-400/10 border-purple-400/20",
  "Development": "text-green-400 bg-green-400/10 border-green-400/20",
  "Business Solutions": "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

export default function BlogPage() {
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(27,107,255,0.08) 0%, transparent 70%)" }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            badge="Insights"
            title="Tech Insights & Thought"
            highlight="Insights"
            description="Deep-dives, practical guides, and forward-looking perspectives on technology, design, and business growth."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.id}
              href={post.href}
              className="group flex flex-col bg-[#0F0F0F] border border-[#1E1E1E] rounded-2xl overflow-hidden hover:border-[#1B6BFF]/30 transition-all duration-300"
            >
              {/* Image placeholder */}
              <div className="aspect-[16/9] bg-[#111111] relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-60" />
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded-full border text-[10px] font-semibold ${CATEGORY_COLORS[post.category] ?? "text-[#808080] bg-[#1A1A1A] border-[#252525]"}`}>
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3 p-5 flex-1">
                <div className="flex items-center gap-3 text-[10px] text-[#606060]">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-[#404040]" />
                  <Clock size={10} />
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-semibold text-white group-hover:text-[#1B6BFF] transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-[#606060] leading-relaxed line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-1 text-xs font-semibold text-[#1B6BFF] group-hover:gap-2 transition-all mt-auto pt-3 border-t border-[#1A1A1A]">
                  Read More <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
