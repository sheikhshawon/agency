"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/* Figma Frame 1020 — Features: badge + "Next-Gen AI Capabilities" + 5-card grid */

const FEATURES = [
  {
    id: 1,
    title: "Web & App Development",
    desc: "Custom websites and mobile applications built with modern frameworks — React, Next.js, and native mobile — optimized for performance and user experience.",
    tags: ["React", "Next.js", "React Native", "TypeScript"],
    gradient: true, // Figma card 1: gradient bg navy→indigo
    large: true,    // 646x378
  },
  {
    id: 2,
    title: "AI Solutions & Automation",
    desc: "Harness the power of artificial intelligence to automate workflows, generate insights, and build intelligent systems that scale with your business.",
    tags: ["ChatGPT API", "Machine Learning", "LangChain", "Automation"],
    gradient: false,
    large: true,    // 646x378
  },
  {
    id: 3,
    title: "Business Management Solutions",
    desc: "ERP systems, CRM platforms, and custom dashboards that give you full visibility and control over your business operations.",
    tags: ["ERP", "CRM", "Analytics"],
    gradient: false,
    large: false,   // 424x352
  },
  {
    id: 4,
    title: "Marketing & Business Growth",
    desc: "Data-driven digital marketing strategies — SEO, performance ads, content marketing, and growth hacking to expand your reach and revenue.",
    tags: ["SEO", "Ads", "Content"],
    gradient: false,
    large: false,
  },
  {
    id: 5,
    title: "Brand Identity & Design",
    desc: "Compelling brand identities, UI/UX design, and creative direction that communicates your vision and resonates with your audience.",
    tags: ["Logo", "UI/UX", "Figma"],
    gradient: false,
    large: false,
  },
];

function FeatureCard({ f, index }: { f: typeof FEATURES[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-[30px] p-8 xl:p-10 overflow-hidden flex flex-col gap-5"
      style={{
        background: f.gradient
          ? "linear-gradient(135deg, #04051B 0%, #2A2594 100%)"
          : "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        minHeight: f.large ? "280px" : "240px",
      }}
    >
      {/* BG glow for gradient card */}
      {f.gradient && (
        <div
          className="absolute top-0 right-0 w-56 h-56 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, rgba(42,37,148,0.6) 0%, transparent 60%)",
          }}
        />
      )}

      {/* Top decorative dot */}
      <div className="w-2 h-2 rounded-full bg-[#2A2594] shadow-[0_0_8px_rgba(42,37,148,0.8)]" />

      <div className="relative z-10 flex flex-col gap-3 flex-1">
        <h3
          className="text-[clamp(1.1rem,2vw,1.4rem)] font-semibold text-white leading-[1.2]"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          {f.title}
        </h3>
        <p
          className="text-white/50 text-[14px] leading-[1.75] flex-1"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {f.desc}
        </p>
        <div className="flex flex-wrap gap-2 mt-1">
          {f.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[11px] rounded-full border border-white/[0.1] text-white/50"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-[#04051B]">
      <div className="max-w-[1312px] mx-auto px-6 xl:px-0 flex flex-col gap-14">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center gap-5 max-w-2xl mx-auto"
        >
          <span className="badge" style={{ fontFamily: "var(--font-poppins)" }}>
            Our Services
          </span>
          <h2
            className="text-[clamp(2rem,4vw,3.4rem)] font-semibold text-white leading-[1.1]"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            <span className="font-extralight">Next-Gen</span> IT{" "}
            <span className="font-extralight">Solutions</span>
            <br />
            for Your Business
          </h2>
          <p
            className="text-white/50 text-[15px] leading-[1.8]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            From cutting-edge web development to AI automation — we provide the
            full spectrum of technology services your business needs to lead in
            the digital era.
          </p>
        </motion.div>

        {/* Card grid — Figma: 2 large (646x378) + 3 medium (424x352) */}
        <div className="flex flex-col gap-5">
          {/* Row 1: 2 large cards */}
          <div className="grid md:grid-cols-2 gap-5">
            {FEATURES.filter((f) => f.large).map((f, i) => (
              <FeatureCard key={f.id} f={f} index={i} />
            ))}
          </div>
          {/* Row 2: 3 medium cards */}
          <div className="grid md:grid-cols-3 gap-5">
            {FEATURES.filter((f) => !f.large).map((f, i) => (
              <FeatureCard key={f.id} f={f} index={i + 2} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <Link
            href="/services"
            className="px-8 py-3.5 text-[15px] font-medium bg-[#1560FF] text-white rounded-full hover:bg-[#2A2594] transition-all duration-300 shadow-[0_0_24px_rgba(21,96,255,0.35)]"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
