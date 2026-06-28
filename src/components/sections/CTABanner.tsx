"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/* Figma Group 39474 — CTA Banner: full-width ellipse gradient, 64px heading */

function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 1l2.39 6.26L19 9l-6.61 1.74L10 17l-2.39-6.26L1 9l6.61-1.74L10 1z" />
    </svg>
  );
}

export default function CTABanner() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[#04051B]">

      {/* Full-width radial ellipse gradient — Figma's centerpiece glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(42,37,148,0.55) 0%, rgba(42,37,148,0.15) 45%, transparent 70%)",
        }}
      />

      {/* Horizontal stripe gradient (navy→indigo→navy) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #04051B 0%, rgba(42,37,148,0.25) 50%, #04051B 100%)",
        }}
      />

      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      {/* Decorative stars */}
      <Star className="absolute top-[18%] left-[8%] w-4 h-4 text-white/15 pointer-events-none" />
      <Star className="absolute top-[22%] right-[10%] w-3 h-3 text-white/12 pointer-events-none" />
      <Star className="absolute bottom-[20%] left-[14%] w-2.5 h-2.5 text-white/10 pointer-events-none" />
      <Star className="absolute bottom-[25%] right-[8%] w-4 h-4 text-white/08 pointer-events-none" />
      <Star className="absolute top-[50%] left-[4%] w-2 h-2 text-white/12 pointer-events-none" />
      <Star className="absolute top-[45%] right-[5%] w-2 h-2 text-white/10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-[1312px] mx-auto px-6 xl:px-0 flex flex-col items-center text-center gap-8">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="badge" style={{ fontFamily: "var(--font-poppins)" }}>
            <Star className="w-3 h-3 text-[#1560FF]" />
            Ready to Transform?
          </span>
        </motion.div>

        {/* Heading — Figma: 64px, weight mix 600/200 */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl text-[clamp(2rem,5vw,4rem)] leading-[1.08] text-white"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          <span className="font-semibold">AI-Powered Tools</span>{" "}
          <span className="font-extralight">For</span>
          <br />
          <span className="font-extralight">Next-Level</span>{" "}
          <span className="font-semibold">Efficiency</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg text-white/50 text-[15px] leading-[1.8]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Partner with Enif IT to harness the full power of modern technology.
          Let's build something remarkable together and take your business to
          the next level.
        </motion.p>

        {/* CTA button — Poppins, border-radius 40px */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/contact"
            className="px-10 py-4 text-[16px] font-medium bg-[#1560FF] text-white rounded-full hover:bg-[#2A2594] transition-all duration-300 shadow-[0_0_40px_rgba(21,96,255,0.5)] hover:shadow-[0_0_60px_rgba(42,37,148,0.6)]"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Get Started Today
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
