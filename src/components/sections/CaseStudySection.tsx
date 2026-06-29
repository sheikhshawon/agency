"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import type { CaseStudyRow } from "@/app/admin/case-studies/actions";
import SectionHeading from "@/components/common/SectionHeading";

export default function CaseStudySection({ caseStudies }: { caseStudies: CaseStudyRow[] }) {
  if (caseStudies.length === 0) return null;
  return (
    <section id="case-studies" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          badge="Case Studies"
          title="Results That Speak"
          highlight="Results"
          description="Deep-dives into how we solve complex business challenges and deliver measurable outcomes."
          className="mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-6">
          {caseStudies.map((cs, i) => (
            <motion.article
              key={cs.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/case-studies/${cs.slug}`}
                className="group flex flex-col h-full bg-[#0F0F0F] border border-[#1E1E1E] rounded-3xl overflow-hidden hover:border-[#1B6BFF]/30 hover:shadow-[0_0_50px_rgba(27,107,255,0.08)] transition-all duration-300"
              >
                {/* Image Area */}
                <div className="aspect-[16/7] bg-[#111111] relative overflow-hidden">
                  <div
                    className="absolute inset-0 grid-bg"
                    style={{
                      background: `linear-gradient(135deg, rgba(27,107,255,0.${(i + 1) * 4}) 0%, transparent 100%)`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <TrendingUp size={48} className="text-[#1B6BFF]/20" />
                  </div>
                  {/* Industry Tag */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#1B6BFF]/15 border border-[#1B6BFF]/25 text-[#1B6BFF] text-xs font-semibold">
                    {cs.industry}
                  </div>
                  {/* Metric Badge */}
                  {cs.metric && (
                    <div className="absolute top-4 right-4 bg-[#111111]/90 backdrop-blur-sm border border-[#1E1E1E] rounded-2xl px-4 py-3 text-center">
                      <p className="text-2xl font-bold text-white">{cs.metric}</p>
                      <p className="text-[10px] text-[#606060]">{cs.metric_label}</p>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-4 p-7 flex-1">
                  <div>
                    <p className="text-xs text-[#606060] font-medium mb-1.5">{cs.client}</p>
                    <h3 className="text-lg font-bold text-white leading-snug group-hover:text-[#1B6BFF] transition-colors">
                      {cs.title}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <div>
                      <p className="text-xs font-semibold text-[#808080] uppercase tracking-wider mb-1">
                        Challenge
                      </p>
                      <p className="text-sm text-[#606060] leading-relaxed">{cs.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#808080] uppercase tracking-wider mb-1">
                        Solution
                      </p>
                      <p className="text-sm text-[#606060] leading-relaxed">{cs.solution}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#1B6BFF] group-hover:gap-3 transition-all">
                    Read Case Study
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white border border-[#252525] rounded-xl hover:border-[#1B6BFF]/40 hover:bg-[#1B6BFF]/5 transition-all"
          >
            View All Case Studies
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
