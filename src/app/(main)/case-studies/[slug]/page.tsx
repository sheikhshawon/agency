import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, TrendingUp } from "lucide-react";
import {
  getCaseStudyBySlug,
  getRelatedCaseStudies,
} from "@/app/admin/case-studies/actions";
import { renderMarkdown } from "@/lib/markdown";
import CTASection from "@/components/sections/CTASection";
import ShareButtons from "@/components/common/ShareButtons";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) return { title: "Case Study Not Found" };
  return {
    title: cs.title,
    description: cs.challenge ?? `${cs.client} case study`,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const related = await getRelatedCaseStudies(cs.industry, cs.id);

  return (
    <>
      {/* Back */}
      <div className="pt-28 pb-8 max-w-4xl mx-auto px-6 lg:px-8">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-sm text-[#606060] hover:text-white transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Case Studies
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 pb-12">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          {cs.industry && (
            <span className="inline-flex px-3 py-1.5 rounded-full bg-[#1B6BFF]/15 border border-[#1B6BFF]/25 text-[#1B6BFF] text-xs font-semibold">
              {cs.industry}
            </span>
          )}
          <span className="text-xs text-[#606060] font-medium">{cs.client}</span>
        </div>

        <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
          {cs.title}
        </h1>

        {cs.metric && (
          <div className="mt-8 inline-flex items-baseline gap-3 rounded-2xl bg-[#0F0F0F] border border-[#1E1E1E] px-6 py-4">
            <span className="text-4xl font-bold text-[#1B6BFF] tabular-nums">{cs.metric}</span>
            {cs.metric_label && <span className="text-sm text-[#808080]">{cs.metric_label}</span>}
          </div>
        )}
      </section>

      {/* Cover */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 pb-12">
        <div className="rounded-3xl overflow-hidden border border-[#1E1E1E] bg-[#0A0A0A] aspect-[16/7] relative">
          {cs.cover_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cs.cover_url} alt={cs.title} className="w-full h-full object-cover" />
          ) : (
            <>
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <TrendingUp size={56} className="text-[#1B6BFF]/20" />
              </div>
            </>
          )}
        </div>
      </section>

      {/* Challenge / Solution / Outcome */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 pb-4">
        <div className="grid md:grid-cols-3 gap-5">
          {([
            ["Challenge", cs.challenge],
            ["Solution", cs.solution],
            ["Outcome", cs.outcome],
          ] as const).map(([label, value]) =>
            value ? (
              <div key={label} className="rounded-2xl bg-[#0F0F0F] border border-[#1E1E1E] p-6">
                <p className="text-xs font-semibold text-[#1B6BFF] uppercase tracking-wider mb-3">{label}</p>
                <p className="text-sm text-[#A0A0A0] leading-relaxed">{value}</p>
              </div>
            ) : null
          )}
        </div>
      </section>

      {/* Full story */}
      {cs.body && (
        <article className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
          <div className="prose-enif">{renderMarkdown(cs.body)}</div>
        </article>
      )}

      {/* Share */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
        <div className="pt-8 border-t border-[#1A1A1A]">
          <ShareButtons title={cs.title} label="Share this case study" />
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-[#111111] py-20 bg-[#070707]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-xl font-bold text-white mb-8">More in {cs.industry}</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/case-studies/${r.slug}`}
                  className="group flex flex-col bg-[#0F0F0F] border border-[#1E1E1E] rounded-2xl overflow-hidden hover:border-[#1B6BFF]/30 transition-all"
                >
                  <div className="aspect-[16/9] bg-[#111111] relative overflow-hidden">
                    {r.cover_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.cover_url} alt={r.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 grid-bg opacity-60" />
                    )}
                  </div>
                  <div className="p-5 flex flex-col gap-2">
                    <p className="text-xs text-[#606060]">{r.client}</p>
                    <h3 className="text-sm font-semibold text-white group-hover:text-[#1B6BFF] transition-colors line-clamp-2">
                      {r.title}
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
