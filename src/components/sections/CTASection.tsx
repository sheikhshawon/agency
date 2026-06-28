"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

function SphereRight() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-64 h-64 rounded-full border border-[#1560FF]/10 animate-[spin_30s_linear_infinite]" />
      <div className="absolute w-48 h-48 rounded-full border border-[#1560FF]/16 animate-[spin_20s_linear_infinite_reverse]" />
      <div className="absolute w-32 h-32 rounded-full border border-[#1560FF]/22 animate-[spin_14s_linear_infinite]" />
      <div
        className="absolute w-24 h-24 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(21,96,255,0.35) 0%, rgba(21,96,255,0.05) 70%, transparent 100%)",
          boxShadow: "0 0 70px rgba(21,96,255,0.5)",
        }}
      />
      {[
        { top: "15%", left: "50%", s: 5 },
        { top: "50%", left: "92%", s: 4 },
        { top: "86%", left: "62%", s: 6 },
        { top: "78%", left: "18%", s: 5 },
        { top: "42%", left: "7%", s: 4 },
        { top: "18%", left: "26%", s: 5 },
      ].map((n, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#1560FF]"
          style={{
            top: n.top, left: n.left,
            width: n.s, height: n.s,
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 ${n.s * 4}px rgba(21,96,255,0.9)`,
            animation: `pulse 2.2s ease-in-out ${i * 0.35}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden"
          style={{ background: "#0D0D0D", border: "1px solid #1A1A1A" }}
        >
          {/* Top border glow */}
          <div
            aria-hidden
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent 10%, rgba(21,96,255,0.45) 50%, transparent 90%)" }}
          />

          {/* Background radial glow */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 80% at 30% 50%, rgba(21,96,255,0.07) 0%, transparent 100%)" }}
          />

          {/* Grid */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative z-10 grid lg:grid-cols-[1fr_380px] items-center">
            {/* Left content */}
            <div className="px-10 py-14 lg:px-16 lg:py-20 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#1560FF]/12 border border-[#1560FF]/22 flex items-center justify-center">
                  <Sparkles size={16} className="text-[#1560FF]" />
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white leading-[1.1] tracking-[-0.02em]">
                Building Smarter Businesses{" "}
                <span className="text-[#1560FF]">with Technology</span>
              </h2>

              <p className="text-[#888] text-[15px] leading-[1.75] max-w-md">
                Our Business Technology solutions are designed to help companies
                enhance productivity, optimize workflows, and stay competitive in
                today's tech-driven world.
              </p>

              {/* Stat + labels */}
              <div className="flex items-center gap-5">
                <span className="text-4xl font-bold text-white tabular-nums">
                  97.3<span className="text-[#1560FF]">%</span>
                </span>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[12px] text-[#888]">
                    <span className="w-2 h-2 rounded-full bg-[#1560FF]" />
                    Advanced Business
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-[#888]">
                    <span className="w-2 h-2 rounded-full bg-[#1560FF]/45" />
                    Business Innovation
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#1560FF] hover:bg-[#3a7bff] text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-[0_0_28px_rgba(21,96,255,0.35)] hover:shadow-[0_0_48px_rgba(21,96,255,0.55)]"
                >
                  Get Started
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold text-white border border-[#2A2A2A] rounded-xl hover:border-[#3A3A3A] hover:bg-[#141414] transition-all"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right — sphere */}
            <div className="hidden lg:block relative h-[380px] border-l border-[#1A1A1A]">
              <SphereRight />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
