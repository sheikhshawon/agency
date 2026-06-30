"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Home, LifeBuoy } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

/* ── Star field — compact, edge-weighted to keep the 404 centerpiece clear ── */
const STARS = [
  /* top strip */
  { x: 6, y: 6, s: 1.5, o: 0.6 }, { x: 16, y: 4, s: 1, o: 0.45 }, { x: 27, y: 8, s: 2, o: 0.55 },
  { x: 39, y: 3, s: 1, o: 0.4 }, { x: 52, y: 7, s: 1.5, o: 0.5 }, { x: 64, y: 4, s: 1, o: 0.4 },
  { x: 75, y: 8, s: 2, o: 0.55 }, { x: 86, y: 4, s: 1, o: 0.45 }, { x: 94, y: 7, s: 1.5, o: 0.55 },
  /* left edge */
  { x: 2, y: 22, s: 1.5, o: 0.45 }, { x: 4, y: 38, s: 1, o: 0.32 }, { x: 2, y: 54, s: 2, o: 0.4 },
  { x: 5, y: 70, s: 1.5, o: 0.36 }, { x: 3, y: 86, s: 1, o: 0.3 },
  /* right edge */
  { x: 98, y: 20, s: 1.5, o: 0.45 }, { x: 96, y: 36, s: 1, o: 0.32 }, { x: 98, y: 52, s: 2, o: 0.4 },
  { x: 95, y: 68, s: 1.5, o: 0.36 }, { x: 97, y: 84, s: 1, o: 0.3 },
  /* mid-left scatter */
  { x: 11, y: 30, s: 1, o: 0.22 }, { x: 15, y: 48, s: 1.5, o: 0.26 }, { x: 9, y: 64, s: 1, o: 0.2 },
  { x: 14, y: 80, s: 2, o: 0.26 },
  /* mid-right scatter */
  { x: 89, y: 30, s: 1, o: 0.22 }, { x: 85, y: 48, s: 1.5, o: 0.26 }, { x: 91, y: 64, s: 1, o: 0.2 },
  { x: 86, y: 80, s: 2, o: 0.26 },
  /* bottom strip */
  { x: 10, y: 94, s: 1.5, o: 0.34 }, { x: 24, y: 97, s: 1, o: 0.26 }, { x: 38, y: 94, s: 2, o: 0.34 },
  { x: 52, y: 97, s: 1, o: 0.26 }, { x: 66, y: 94, s: 1.5, o: 0.32 }, { x: 80, y: 97, s: 1, o: 0.26 },
  { x: 92, y: 94, s: 2, o: 0.32 },
];

const QUICK_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

/* The middle "0" — reuses the orbiting-sphere motif from CTASection */
function OrbitZero() {
  return (
    <span
      aria-hidden
      className="relative inline-flex items-center justify-center align-middle"
      style={{ width: "0.86em", height: "0.86em" }}
    >
      {/* Outer ring + orbiting dot */}
      <span className="absolute inset-0 rounded-full border border-[#1560FF]/20" />
      <span className="absolute inset-0 animate-[spin_18s_linear_infinite]">
        <span
          className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full bg-[#1560FF]"
          style={{ width: "0.05em", height: "0.05em", boxShadow: "0 0 0.12em rgba(21,96,255,0.9)" }}
        />
      </span>

      {/* Middle ring + orbiting dot (reverse) */}
      <span className="absolute rounded-full border border-[#1560FF]/28" style={{ width: "70%", height: "70%" }} />
      <span className="absolute animate-[spin_12s_linear_infinite_reverse]" style={{ width: "70%", height: "70%" }}>
        <span
          className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-white"
          style={{ width: "0.04em", height: "0.04em", boxShadow: "0 0 0.1em rgba(255,255,255,0.9)" }}
        />
      </span>

      {/* Inner ring */}
      <span className="absolute rounded-full border border-[#1560FF]/35" style={{ width: "44%", height: "44%" }} />

      {/* Glowing core */}
      <span
        className="absolute rounded-full"
        style={{
          width: "30%",
          height: "30%",
          background:
            "radial-gradient(circle, rgba(21,96,255,0.55) 0%, rgba(21,96,255,0.1) 65%, transparent 100%)",
          boxShadow: "0 0 1.4em rgba(21,96,255,0.55)",
          animation: "pulse 2.6s ease-in-out infinite",
        }}
      />
    </span>
  );
}

export default function NotFound() {
  return (
    <>
      <Navbar />

      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-[84px] pb-16 text-center">
        {/* ── Background: indigo-blue glow up top fading to brand navy ── */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 110% 60% at 50% 0%, #3838e8 0%, #2626c0 14%, #1616a0 26%, #0e0e80 40%, #07074e 58%, #04051B 78%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 42% at 50% 34%, rgba(55,50,200,0.28) 0%, transparent 70%)",
          }}
        />

        {/* ── Star field ── */}
        {STARS.map((s, i) => (
          <div
            key={i}
            aria-hidden
            className="absolute rounded-full bg-white pointer-events-none"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, opacity: s.o }}
          />
        ))}

        {/* ── Sparkles ── */}
        {([
          ["15%", "24%", "w-3.5 h-3.5", "0.28"],
          ["83%", "20%", "w-3 h-3", "0.22"],
          ["22%", "78%", "w-2.5 h-2.5", "0.16"],
          ["79%", "82%", "w-3 h-3", "0.18"],
        ] as [string, string, string, string][]).map(([l, t, sz, op], i) => (
          <svg
            key={i}
            aria-hidden
            className={`absolute pointer-events-none ${sz}`}
            style={{ left: l, top: t, opacity: op }}
            viewBox="0 0 20 20"
            fill="white"
          >
            <path d="M10 1l1.4 6.6L18 10l-6.6 1.4L10 18l-1.4-6.6L2 10l6.6-1.4z" />
          </svg>
        ))}

        {/* ── Content ── */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="badge"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1560FF]" />
            Error 404
          </motion.span>

          {/* 404 with orbiting "0" */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 flex items-center justify-center text-white select-none"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "clamp(5rem, 22vw, 13rem)",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              textShadow: "0 0 60px rgba(21,96,255,0.35)",
            }}
          >
            4<OrbitZero />4
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-white"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "clamp(1.6rem, 4.5vw, 2.6rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Lost in the digital{" "}
            <span
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontStyle: "italic",
                fontWeight: 300,
                letterSpacing: "-0.01em",
              }}
            >
              cosmos
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              marginTop: "18px",
              fontFamily: "var(--font-dm-sans)",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "min(92vw, 520px)",
            }}
          >
            The page you&apos;re looking for has drifted beyond our orbit. It may have
            been moved, renamed, or never existed.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col sm:flex-row items-center gap-3"
          >
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#1560FF] hover:bg-[#3a7bff] text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-[0_0_28px_rgba(21,96,255,0.35)] hover:shadow-[0_0_48px_rgba(21,96,255,0.55)]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              <Home size={15} />
              Back to Home
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold text-white border border-white/15 rounded-xl hover:border-white/30 hover:bg-white/5 transition-all"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              <LifeBuoy size={15} />
              Contact Support
            </Link>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            <span
              className="text-[13px] text-white/35"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Popular pages:
            </span>
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] text-white/55 hover:text-white transition-colors duration-200"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
