import type { Metadata } from "next";
import { TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/common/SectionHeading";
import { CASE_STUDIES } from "@/constants/content";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Deep-dive into how Enif IT has transformed businesses with measurable results.",
};

export default function CaseStudiesPage() {
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
            badge="Results"
            title="Real Impact, Real Numbers"
            highlight="Numbers"
            description="Our case studies document actual client results — challenges, solutions, and measurable outcomes."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-6">
          {CASE_STUDIES.map((cs) => (
            <Link
              key={cs.id}
              href={cs.href}
              className="group flex flex-col bg-[#0F0F0F] border border-[#1E1E1E] rounded-3xl overflow-hidden hover:border-[#1B6BFF]/30 hover:shadow-[0_0_50px_rgba(27,107,255,0.08)] transition-all duration-300"
            >
              <div className="aspect-[16/7] bg-[#111111] relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <TrendingUp size={48} className="text-[#1B6BFF]/20" />
                </div>
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#1B6BFF]/15 border border-[#1B6BFF]/25 text-[#1B6BFF] text-xs font-semibold">
                  {cs.industry}
                </div>
                <div className="absolute top-4 right-4 bg-[#111111]/90 backdrop-blur-sm border border-[#1E1E1E] rounded-2xl px-4 py-3 text-center">
                  <p className="text-2xl font-bold text-white">{cs.metric}</p>
                  <p className="text-[10px] text-[#606060]">{cs.metricLabel}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 p-7">
                <p className="text-xs text-[#606060] font-medium">{cs.client}</p>
                <h3 className="text-lg font-bold text-white group-hover:text-[#1B6BFF] transition-colors">{cs.title}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-[#808080] uppercase tracking-wider mb-1.5">Challenge</p>
                    <p className="text-sm text-[#606060] leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#808080] uppercase tracking-wider mb-1.5">Solution</p>
                    <p className="text-sm text-[#606060] leading-relaxed">{cs.result}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#1B6BFF] group-hover:gap-3 transition-all">
                  Read Full Case Study <ArrowRight size={14} />
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
