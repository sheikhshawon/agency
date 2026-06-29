import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, Tag } from "lucide-react";
import { getBlogBySlug, getPublishedBlogs } from "@/app/admin/blog/actions";
import { renderMarkdown } from "@/lib/markdown";
import CTASection from "@/components/sections/CTASection";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getBlogBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

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

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const [post, allPosts] = await Promise.all([
    getBlogBySlug(slug),
    getPublishedBlogs(),
  ]);

  if (!post) notFound();

  const related = allPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const categoryStyle = CATEGORY_COLORS[post.category ?? ""] ?? "text-[#808080] bg-[#1A1A1A] border-[#252525]";

  return (
    <>
      {/* Back */}
      <div className="pt-28 pb-8 max-w-3xl mx-auto px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#606060] hover:text-white transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Blog
        </Link>
      </div>

      <article className="max-w-3xl mx-auto px-6 lg:px-8 pb-24">

        {/* Category */}
        {post.category && (
          <span className={`inline-flex px-3 py-1.5 rounded-full border text-xs font-semibold mb-5 ${categoryStyle}`}>
            {post.category}
          </span>
        )}

        {/* Title */}
        <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
          {post.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#606060] mb-8 pb-8 border-b border-[#1A1A1A]">
          <span className="flex items-center gap-1.5">
            <User size={13} />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={13} />
            {formatDate(post.published_at ?? post.created_at)}
          </span>
          {post.read_time && (
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {post.read_time}
            </span>
          )}
        </div>

        {/* Cover image */}
        {post.cover_url && (
          <div className="rounded-2xl overflow-hidden border border-[#1E1E1E] mb-10 aspect-[16/7]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover_url} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg text-[#A0A0A0] leading-relaxed mb-8 font-medium border-l-2 border-[#1B6BFF] pl-5">
            {post.excerpt}
          </p>
        )}

        {/* Content */}
        {post.content ? (
          <div className="prose-enif">{renderMarkdown(post.content)}</div>
        ) : (
          <p className="text-[#606060] italic">No content available.</p>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[#1A1A1A]">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag size={13} className="text-[#606060]" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-xl bg-[#0F0F0F] border border-[#1E1E1E] text-sm text-[#A0A0A0]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="border-t border-[#111111] py-20 bg-[#070707]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-xl font-bold text-white mb-8">More in {post.category}</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col bg-[#0F0F0F] border border-[#1E1E1E] rounded-2xl overflow-hidden hover:border-[#1B6BFF]/30 transition-all"
                >
                  <div className="aspect-[16/9] bg-[#111111] relative overflow-hidden">
                    {p.cover_url
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img src={p.cover_url} alt={p.title} className="w-full h-full object-cover" />
                      : <div className="absolute inset-0 grid-bg opacity-60" />
                    }
                  </div>
                  <div className="p-5 flex flex-col gap-2">
                    <p className="text-xs text-[#606060]">{formatDate(p.published_at ?? p.created_at)}</p>
                    <h3 className="text-sm font-semibold text-white group-hover:text-[#1B6BFF] transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
