"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/* Figma Frame 247 — About section: left dark card + right text, scrolling ticker */

const TICKER_ITEMS = [
  "The Future", "Smart Solutions", "AI Automation",
  "Web Excellence", "Brand Identity", "Business Growth",
  "The Future", "Smart Solutions", "AI Automation",
  "Web Excellence", "Brand Identity", "Business Growth",
];

function TickerBar() {
  return (
    <div className="overflow-hidden border-y border-white/[0.06] py-3">
      <div
        className="flex gap-10 items-center whitespace-nowrap"
        style={{ animation: "marquee 20s linear infinite" }}
      >
        {TICKER_ITEMS.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-4 text-[13px] text-white/30"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2A2594] shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#04051B]">
      <div className="max-w-[1312px] mx-auto px-6 xl:px-0 flex flex-col gap-16">

        {/* Ticker bar */}
        <TickerBar />

        {/* Two-column layout — Figma Frame 247: left card + right text */}
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">

          {/* Left — dark card (Figma: bg #04051B, corner-radius 30, padding 45) */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[30px] p-10 xl:p-[45px] overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(42,37,148,0.25) 0%, rgba(4,5,27,0.9) 60%)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* BG glow */}
            <div
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(42,37,148,0.4) 0%, transparent 70%)",
              }}
            />

            {/* Badge */}
            <span className="badge mb-6 inline-flex" style={{ fontFamily: "var(--font-poppins)" }}>
              About Us
            </span>

            <h2
              className="text-[clamp(1.8rem,3.5vw,3.4rem)] font-semibold text-white leading-[1.12] mb-5"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Empowering{" "}
              <span className="font-extralight">Innovation</span>
              <br />
              Our IT{" "}
              <span className="font-extralight">Journey</span>
            </h2>

            <p
              className="text-white/50 text-[14px] leading-[1.8] mb-8"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Founded with a vision to transform businesses through smart
              technology, Enif IT Services Ltd. has grown into a premium
              agency delivering web development, AI automation, and brand
              design solutions.
            </p>

            {/* Stats row inside card */}
            <div className="grid grid-cols-2 gap-5 pt-7 border-t border-white/[0.07]">
              {[
                { v: "5+", l: "Years Experience" },
                { v: "500+", l: "Projects Done" },
                { v: "50+", l: "Team Members" },
                { v: "97%", l: "Client Retention" },
              ].map((s) => (
                <div key={s.l} className="flex flex-col gap-1">
                  <span
                    className="text-2xl font-semibold text-white"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    {s.v}
                  </span>
                  <span
                    className="text-[12px] text-white/40"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {s.l}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — text content */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-7"
          >
            <span className="badge w-fit" style={{ fontFamily: "var(--font-poppins)" }}>
              Who We Are
            </span>

            <h2
              className="text-[clamp(1.8rem,3.2vw,3.4rem)] font-semibold text-white leading-[1.12]"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              <span className="font-extralight">Your</span> Trusted{" "}
              <span className="font-extralight">Technology</span>
              <br />
              Partner
            </h2>

            <p
              className="text-white/50 text-[14px] leading-[1.85]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Enif IT Services Ltd. is a full-service technology agency based in
              Bangladesh, specializing in web & app development, AI automation,
              business management solutions, marketing & growth, and brand
              identity. We partner with ambitious businesses to create digital
              experiences that drive real results.
            </p>

            <p
              className="text-white/50 text-[14px] leading-[1.85]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Our multidisciplinary team of engineers, designers, and strategists
              works closely with each client to understand their unique challenges
              and deliver solutions that are not just technically excellent but
              strategically sound.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1560FF] text-white text-[15px] font-medium rounded-full hover:bg-[#2A2594] transition-all duration-300 w-fit shadow-[0_0_24px_rgba(21,96,255,0.4)]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
