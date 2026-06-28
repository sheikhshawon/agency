"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2, Sparkles, TrendingUp, Palette } from "lucide-react";

const TECH_CARDS = [
  {
    icon: Code2,
    label: "Web & App Dev",
    bg: "from-[#1560FF]/12 to-[#1560FF]/4",
  },
  {
    icon: Sparkles,
    label: "AI Solutions",
    bg: "from-[#7C3AED]/12 to-[#7C3AED]/4",
  },
  {
    icon: TrendingUp,
    label: "Growth & Marketing",
    bg: "from-[#059669]/12 to-[#059669]/4",
  },
  {
    icon: Palette,
    label: "Brand Design",
    bg: "from-[#DB2777]/12 to-[#DB2777]/4",
  },
];

export default function TechSolutionsSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* Left — heading + description */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-3xl lg:text-[2.4rem] xl:text-[2.75rem] font-bold text-white leading-[1.1] tracking-[-0.02em]">
              Tech Solutions for{" "}
              <span className="text-[#1560FF]">Modern Businesses</span>
            </h2>

            <p className="text-[#888] text-[15px] leading-[1.75]">
              Our Business Technology solutions are designed to help companies
              enhance productivity, optimize workflows, and stay competitive in
              today's tech-driven world.
            </p>

            {/* Sub-callout cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-[#0D0D0D] border border-[#1A1A1A] flex flex-col gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#1560FF]/12 border border-[#1560FF]/18 flex items-center justify-center">
                  <Sparkles size={14} className="text-[#1560FF]" />
                </div>
                <p className="text-[12px] font-semibold text-white leading-tight">Future Proof Your Business</p>
                <p className="text-[10px] text-[#555] leading-relaxed">Cutting Edge AI</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#0D0D0D] border border-[#1A1A1A] flex flex-col gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#1560FF]/12 border border-[#1560FF]/18 flex items-center justify-center">
                  <TrendingUp size={14} className="text-[#1560FF]" />
                </div>
                <p className="text-[12px] font-semibold text-white leading-tight">Actionable Insights and AI</p>
                <p className="text-[10px] text-[#555] leading-relaxed">Data-driven growth</p>
              </div>
            </div>

            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#1560FF] hover:gap-3 transition-all"
            >
              Explore All Services
              <ArrowRight size={13} />
            </Link>
          </motion.div>

          {/* Right — 2×2 tech card grid */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {TECH_CARDS.map(({ icon: Icon, label, bg }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${bg} border border-[#1A1A1A] flex flex-col items-center justify-center gap-3 relative overflow-hidden group cursor-pointer hover:border-[#1560FF]/25 transition-all duration-300`}
              >
                {/* Grid texture */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="relative z-10 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon size={18} className="text-white/70" />
                </div>
                <p className="relative z-10 text-[12px] font-semibold text-white/80 text-center px-3 leading-tight">
                  {label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
