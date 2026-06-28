import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight, FileText } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import CTASection from "@/components/sections/CTASection";
import { getPublishedBlogs } from "@/app/admin/blog/actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tech insights, business growth tips, and industry thought leadership from Enif IT.",
};

const CATEGORY_COLORS: Record<string, string> = {
  "AI & Automation":    "text-[#1B6BFF] bg-[#1B6BFF]/10 border-[#1B6BFF]/20",
  "Design":             "text-purple-400 bg-purple-400/10 border-purple-400/20",
  "Development":        "text-green-400 bg-green-400/10 border-green-400/20",
  "Business Solutions": "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "Marketing":          "text-pink-400 bg-pink-400/10 border-pink-400/20",
  "Career":             "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function BlogPage() {
  const posts = await getPublishedBlogs();

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
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <div className="w-16 h-16 rounded-3xl bg-[#0F0F0F] border border-[#1E1E1E] flex items-center justify-center">
                <FileText size={28} className="text-[#303030]" />
              </div>
              <p className="text-[#606060]">No articles published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-[#0F0F0F] border border-[#1E1E1E] rounded-2xl overflow-hidden hover:border-[#1B6BFF]/30 transition-all duration-300"
                >
                  {/* Cover */}
                  <div className="aspect-[16/9] bg-[#111111] relative overflow-hidden">
                    {post.cover_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.cover_url} alt={post.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 grid-bg opacity-60" />
                    )}
                    {post.category && (
                      <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 rounded-full border text-[10px] font-semibold ${CATEGORY_COLORS[post.category] ?? "text-[#808080] bg-[#1A1A1A] border-[#252525]"}`}>
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex flex-col gap-3 p-5 flex-1">
                    <div className="flex items-center gap-3 text-[10px] text-[#606060]">
                      <span>{formatDate(post.published_at ?? post.created_at)}</span>
                      {post.read_time && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-[#404040]" />
                          <Clock size={10} />
                          <span>{post.read_time}</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-semibold text-white group-hover:text-[#1B6BFF] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-[#606060] leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-1 text-xs font-semibold text-[#1B6BFF] group-hover:gap-2 transition-all mt-auto pt-3 border-t border-[#1A1A1A]">
                      Read More <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
