"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const BULLETS = [
  "Operations with AI-Intelligence",
  "Smarter Business Decisions",
  "Decisions Powered by AI",
];

function AbstractVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-3xl bg-[#0D0D0D] border border-[#1A1A1A]">
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Central glow blob */}
      <div
        className="absolute w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(21,96,255,0.2) 0%, rgba(21,96,255,0.04) 60%, transparent 100%)",
          boxShadow: "0 0 100px rgba(21,96,255,0.25)",
        }}
      />
      {/* Floating inner card */}
      <div className="relative z-10 bg-[#111]/90 backdrop-blur-sm border border-[#1E1E1E] rounded-2xl px-6 py-5 max-w-[240px] shadow-2xl">
        <p className="text-[10px] text-[#555] font-medium mb-3 uppercase tracking-wider">Innovating Business</p>
        {BULLETS.map((b) => (
          <div key={b} className="flex items-center gap-2 mb-2 last:mb-0">
            <CheckCircle2 size={12} className="text-[#1560FF] shrink-0" />
            <span className="text-[11px] text-[#AAA]">{b}</span>
          </div>
        ))}
      </div>

      {/* Bottom-right image accent */}
      <div
        className="absolute bottom-0 right-0 w-28 h-28 rounded-tl-3xl overflow-hidden border-t border-l border-[#1E1E1E]"
        style={{
          background: "linear-gradient(135deg, rgba(21,96,255,0.15) 0%, rgba(21,96,255,0.03) 100%)",
        }}
      />
    </div>
  );
}

export default function TransformingSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* Left — visual */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[400px] lg:h-[480px] order-2 lg:order-1"
          >
            <AbstractVisual />
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 order-1 lg:order-2"
          >
            <h2 className="text-3xl lg:text-[2.4rem] xl:text-[2.75rem] font-bold text-white leading-[1.1] tracking-[-0.02em]">
              Transforming Companies with{" "}
              <span className="text-[#1560FF]">Smart Digital Tools</span>
            </h2>

            <p className="text-[#888] text-[15px] leading-[1.75]">
              Our Business Technology solutions are designed to help companies
              enhance productivity, optimize workflows, and stay competitive in
              today's tech-driven world.
            </p>

            {/* Innovating Business callout */}
            <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-[#1A1A1A]">
              <p className="text-[11px] font-semibold text-[#1560FF] uppercase tracking-widest mb-3">
                Innovating Business
              </p>
              <ul className="flex flex-col gap-2.5">
                {BULLETS.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-[13px] text-[#AAA]">
                    <CheckCircle2 size={13} className="text-[#1560FF] shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right-side image accent (Figma shows a pink/abstract rounded image) */}
            <div
              className="w-full h-24 rounded-2xl border border-[#1A1A1A] overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(21,96,255,0.08) 0%, rgba(21,96,255,0.02) 100%)",
              }}
            >
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
