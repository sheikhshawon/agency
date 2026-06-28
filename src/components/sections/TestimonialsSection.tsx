"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/constants/content";
import SectionHeading from "@/components/common/SectionHeading";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-[#070707]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          badge="Client Love"
          title="What Our Clients Say"
          highlight="Clients"
          description="Don't take our word for it — hear directly from the businesses we've transformed."
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-5 p-6 rounded-2xl bg-[#0F0F0F] border border-[#1E1E1E] hover:border-[#252525] transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={13} className="text-[#1B6BFF] fill-[#1B6BFF]" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="flex-1 text-sm text-[#A0A0A0] leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#1A1A1A]">
                <div className="w-9 h-9 rounded-full bg-[#1B6BFF]/15 border border-[#1B6BFF]/20 flex items-center justify-center text-sm font-bold text-[#1B6BFF]">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-[#606060]">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
