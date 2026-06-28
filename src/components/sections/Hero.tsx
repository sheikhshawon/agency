"use client";

import { motion } from "framer-motion";
import Link from "next/link";

function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 1l2.39 6.26L19 9l-6.61 1.74L10 17l-2.39-6.26L1 9l6.61-1.74L10 1z" />
    </svg>
  );
}

/* Floating AI/tech decoration — right side visual */
function HeroVisual() {
  return (
    <div className="relative w-full max-w-[520px] aspect-square mx-auto">
      {/* Outer rings */}
      <div
        className="absolute inset-0 rounded-full border border-white/[0.06]"
        style={{ animation: "spin 60s linear infinite" }}
      />
      <div
        className="absolute inset-[10%] rounded-full border border-[#2A2594]/30"
        style={{ animation: "spin 40s linear infinite reverse" }}
      />
      <div
        className="absolute inset-[20%] rounded-full border border-[#2A2594]/45"
        style={{ animation: "spin 28s linear infinite" }}
      />

      {/* Central glow */}
      <div
        className="absolute inset-[28%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(42,37,148,0.8) 0%, rgba(42,37,148,0.3) 50%, transparent 100%)",
          boxShadow: "0 0 80px rgba(42,37,148,0.6), 0 0 160px rgba(42,37,148,0.25)",
        }}
      />

      {/* SVG network */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connection lines */}
        <line x1="100" y1="20" x2="170" y2="70" stroke="rgba(42,37,148,0.4)" strokeWidth="0.8" />
        <line x1="170" y1="70" x2="180" y2="140" stroke="rgba(42,37,148,0.4)" strokeWidth="0.8" />
        <line x1="180" y1="140" x2="130" y2="185" stroke="rgba(42,37,148,0.4)" strokeWidth="0.8" />
        <line x1="130" y1="185" x2="70" y2="185" stroke="rgba(42,37,148,0.4)" strokeWidth="0.8" />
        <line x1="70" y1="185" x2="20" y2="140" stroke="rgba(42,37,148,0.4)" strokeWidth="0.8" />
        <line x1="20" y1="140" x2="20" y2="70" stroke="rgba(42,37,148,0.4)" strokeWidth="0.8" />
        <line x1="20" y1="70" x2="70" y2="20" stroke="rgba(42,37,148,0.4)" strokeWidth="0.8" />
        <line x1="70" y1="20" x2="100" y2="20" stroke="rgba(42,37,148,0.4)" strokeWidth="0.8" />
        <line x1="100" y1="20" x2="180" y2="140" stroke="rgba(42,37,148,0.2)" strokeWidth="0.5" />
        <line x1="170" y1="70" x2="70" y2="185" stroke="rgba(42,37,148,0.2)" strokeWidth="0.5" />
        <line x1="20" y1="70" x2="130" y2="185" stroke="rgba(42,37,148,0.2)" strokeWidth="0.5" />
        {/* Nodes */}
        {[
          [100, 20], [170, 70], [180, 140], [130, 185],
          [70, 185], [20, 140], [20, 70], [70, 20],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="4"
            fill="#2A2594"
            style={{
              filter: "drop-shadow(0 0 6px rgba(42,37,148,1))",
            }}
          />
        ))}
      </svg>

      {/* Floating stats card */}
      <div
        className="absolute top-[12%] right-[-8%] bg-[#070820]/90 backdrop-blur-md border border-white/[0.08] rounded-2xl px-4 py-3 flex flex-col gap-1"
        style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
      >
        <span className="text-white text-lg font-semibold" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          97.3%
        </span>
        <span className="text-white/40 text-[11px]" style={{ fontFamily: "var(--font-dm-sans)" }}>
          Success Rate
        </span>
      </div>

      {/* Floating projects card */}
      <div
        className="absolute bottom-[14%] left-[-6%] bg-[#070820]/90 backdrop-blur-md border border-white/[0.08] rounded-2xl px-4 py-3 flex items-center gap-3"
        style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
      >
        <div className="w-8 h-8 rounded-xl bg-[#2A2594]/40 flex items-center justify-center">
          <Star className="w-4 h-4 text-[#1560FF]" />
        </div>
        <div>
          <p className="text-white text-[13px] font-semibold" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            500+
          </p>
          <p className="text-white/40 text-[10px]" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Projects Done
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#04051B]">

      {/* Figma gradient: navy → indigo → navy, horizontal */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #04051B 0%, rgba(42,37,148,0.55) 50%, #04051B 100%)",
        }}
      />

      {/* Radial center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 65% at 50% 45%, rgba(42,37,148,0.35) 0%, transparent 70%)",
        }}
      />

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-25 pointer-events-none" />

      {/* Decorative stars */}
      <Star className="absolute top-[20%] left-[10%] w-3 h-3 text-white/20 pointer-events-none" />
      <Star className="absolute top-[32%] right-[12%] w-2 h-2 text-white/15 pointer-events-none" />
      <Star className="absolute bottom-[28%] left-[6%] w-2.5 h-2.5 text-white/10 pointer-events-none" />
      <Star className="absolute top-[60%] right-[7%] w-4 h-4 text-white/08 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1312px] mx-auto px-6 xl:px-0 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center min-h-[calc(100vh-7rem)]">

          {/* Left — text content */}
          <div className="flex flex-col gap-7">

            {/* Badge — Poppins 14px */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="badge">
                <Star className="w-3 h-3 text-[#1560FF]" />
                <span style={{ fontFamily: "var(--font-poppins)" }}>
                  Smart Tech Solutions
                </span>
              </span>
            </motion.div>

            {/* Heading — Plus Jakarta Sans, 72px equivalent, weight mix 600/200 */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.08] tracking-[-0.01em] text-white"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              <span className="font-semibold">Empowering</span>{" "}
              <span className="font-extralight">Your</span>
              <br />
              <span className="font-extralight">Business</span>{" "}
              <span className="font-semibold">with</span>
              <br />
              <span className="font-semibold">Smart</span>{" "}
              <span className="font-extralight">Technology</span>
            </motion.h1>

            {/* Description — DM Sans 14-15px */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/55 text-[15px] leading-[1.8] max-w-[440px]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Enif IT Services delivers premium web development, AI automation,
              business management, and brand design — helping companies grow
              smarter and faster.
            </motion.p>

            {/* CTA buttons — Poppins, border-radius 40px */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 flex-wrap"
            >
              <Link
                href="/contact"
                className="px-8 py-3.5 text-[15px] font-medium bg-[#1560FF] text-white rounded-full hover:bg-[#2A2594] transition-all duration-300 shadow-[0_0_28px_rgba(21,96,255,0.5)]"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Get Started
              </Link>
              <Link
                href="/services"
                className="px-8 py-3.5 text-[15px] font-medium text-white/60 border border-white/15 rounded-full hover:border-white/30 hover:text-white transition-all duration-300"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Our Services
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-8 pt-6 border-t border-white/[0.07]"
            >
              {[
                { value: "500+", label: "Projects Delivered" },
                { value: "97%", label: "Success Rate" },
                { value: "50+", label: "Expert Engineers" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span
                    className="text-[1.4rem] font-semibold text-white"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="text-[12px] text-white/40"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — decorative visual */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex items-center justify-end"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
