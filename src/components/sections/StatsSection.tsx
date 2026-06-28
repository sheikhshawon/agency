"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import { IMPACT_STATS } from "@/constants/content";

const FEATURE_BULLETS = [
  "Operations with AI-Intelligence",
  "Smarter Business Decisions",
  "Decisions Powered by AI",
];

/* ─── Sphere visual (right column of "Technology Drives" section) ─── */
function SphereMini() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Rings */}
      <div className="absolute w-[360px] h-[360px] rounded-full border border-[#1560FF]/10 animate-[spin_35s_linear_infinite]" />
      <div className="absolute w-[270px] h-[270px] rounded-full border border-[#1560FF]/15 animate-[spin_24s_linear_infinite_reverse]" />
      <div className="absolute w-[180px] h-[180px] rounded-full border border-[#1560FF]/22 animate-[spin_16s_linear_infinite]" />
      {/* Glow */}
      <div
        className="absolute w-[140px] h-[140px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(21,96,255,0.25) 0%, rgba(21,96,255,0.05) 60%, transparent 100%)",
          boxShadow: "0 0 70px rgba(21,96,255,0.3)",
        }}
      />
      {/* Small nodes */}
      {[
        { top: "14%", left: "50%", size: 7 },
        { top: "50%", left: "88%", size: 6 },
        { top: "86%", left: "60%", size: 5 },
        { top: "76%", left: "22%", size: 7 },
        { top: "40%", left: "8%",  size: 6 },
        { top: "20%", left: "24%", size: 5 },
      ].map((n, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#1560FF]"
          style={{
            top: n.top, left: n.left,
            width: n.size, height: n.size,
            boxShadow: `0 0 ${n.size * 3}px rgba(21,96,255,0.9)`,
            transform: "translate(-50%, -50%)",
            animation: `pulse 2s ease-in-out ${i * 0.4}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function StatsSection() {
  return (
    <>
      {/* ── Section 1: Technology That Drives Business Success ── */}
      <section className="py-20 lg:py-28 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
            >
              {/* Badge */}
              <span className="inline-flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full bg-[#1560FF]/10 border border-[#1560FF]/20 text-[#1560FF] text-[11px] font-semibold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1560FF] animate-pulse" />
                Innovating Business
              </span>

              <h2 className="text-3xl lg:text-[2.4rem] xl:text-[2.75rem] font-bold text-white leading-[1.1] tracking-[-0.02em]">
                Technology That Drives{" "}
                <span className="text-[#1560FF]">Business Success</span>
              </h2>

              <p className="text-[#888] text-[15px] leading-[1.75]">
                Our Business Technology solutions are designed to help companies
                enhance productivity, optimize workflows, and stay competitive
                in today's tech-driven world.
              </p>

              {/* Bullet list */}
              <ul className="flex flex-col gap-3">
                {FEATURE_BULLETS.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-[14px] text-[#AAA]">
                    <CheckCircle2 size={15} className="text-[#1560FF] shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex gap-3 pt-2">
                <a
                  href="/contact"
                  className="px-6 py-2.5 text-sm font-semibold bg-[#1560FF] text-white rounded-xl hover:bg-[#3a7bff] transition-colors shadow-[0_0_24px_rgba(21,96,255,0.3)]"
                >
                  Get Started
                </a>
                <a
                  href="/about"
                  className="px-6 py-2.5 text-sm font-semibold text-white border border-[#2A2A2A] rounded-xl hover:border-[#3A3A3A] hover:bg-[#141414] transition-colors"
                >
                  Learn More
                </a>
              </div>

              {/* Inline stats */}
              <div className="flex items-center gap-10 pt-4 border-t border-white/[0.05]">
                <div>
                  <p className="text-xl font-bold text-white">1000<span className="text-[#1560FF]">+</span></p>
                  <p className="text-[11px] text-[#555] mt-0.5">Smart Tech Solutions</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">283<span className="text-[#1560FF]">K+</span></p>
                  <p className="text-[11px] text-[#555] mt-0.5">Business Technology</p>
                </div>
              </div>
            </motion.div>

            {/* Right — sphere */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[400px] lg:h-[460px]"
            >
              <div className="absolute inset-0 rounded-3xl bg-[#0D0D0D] border border-[#1A1A1A] overflow-hidden">
                {/* Grid bg */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                <SphereMini />
              </div>

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-5 -left-5 bg-[#0F0F0F] border border-[#1E1E1E] rounded-2xl px-5 py-4 shadow-2xl"
              >
                <p className="text-[10px] text-[#555] mb-1">Future-Ready Solutions</p>
                <p className="text-2xl font-bold text-white">
                  97.3<span className="text-[#1560FF]">%</span>
                </p>
                <p className="text-[10px] text-[#555] mt-0.5">Smart Tech Solutions</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Impact Stats Bar ── */}
      <section className="py-14 border-y border-[#141414] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {IMPACT_STATS.map((stat, i) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={i * 140}
            />
          ))}
        </div>
      </section>
    </>
  );
}
