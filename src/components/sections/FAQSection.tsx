"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Figma Frame 1019 — FAQ: badge + heading + left visual + right accordion */

const FAQS = [
  {
    q: "What services does Enif IT offer?",
    a: "Enif IT offers a comprehensive suite of technology services including web & app development, AI solutions & automation, business management systems (ERP/CRM), digital marketing & growth, and brand identity & creative design.",
  },
  {
    q: "How long does a typical project take?",
    a: "Project timelines vary based on scope and complexity. A simple website takes 2–4 weeks, while a full enterprise platform or AI solution may take 3–6 months. We provide detailed timelines during our discovery phase before any work begins.",
  },
  {
    q: "Do you work with startups as well as large companies?",
    a: "Absolutely. We work with founders building their first product all the way to established enterprises undergoing digital transformation. Our solutions are built to scale, so startups grow into them rather than outgrowing them.",
  },
  {
    q: "What does the development process look like?",
    a: "We follow an agile process: Discovery → Architecture & Design → Development (2-week sprints) → QA & Testing → Deployment → Ongoing support. You receive weekly updates and have direct access to your dedicated project team throughout.",
  },
  {
    q: "How do you ensure the quality of your deliverables?",
    a: "Quality is built in at every stage — code reviews, automated testing, manual QA, performance audits, and security checks. We deliver 97%+ client satisfaction because we don't ship until it meets our own high standards.",
  },
];

function PlusIcon({ open }: { open: boolean }) {
  return (
    <div
      className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center shrink-0 transition-all duration-300"
      style={{
        background: open ? "rgba(42,37,148,0.4)" : "rgba(255,255,255,0.04)",
        borderColor: open ? "rgba(42,37,148,0.5)" : "rgba(255,255,255,0.1)",
      }}
    >
      <svg
        viewBox="0 0 12 12"
        fill="none"
        className="w-3 h-3 transition-transform duration-300"
        style={{ transform: open ? "rotate(45deg)" : "none" }}
      >
        <path d="M6 1v10M1 6h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function FAQVisual() {
  return (
    <div className="relative w-full aspect-[4/5] max-w-[380px] mx-auto">
      {/* Background card */}
      <div
        className="absolute inset-0 rounded-[30px]"
        style={{
          background: "linear-gradient(160deg, rgba(42,37,148,0.35) 0%, rgba(4,5,27,0.9) 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      />

      {/* Center glow */}
      <div
        className="absolute inset-[20%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(42,37,148,0.6) 0%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      {/* Moon/crescent decoration */}
      <div className="absolute top-8 right-8">
        <svg viewBox="0 0 60 60" className="w-14 h-14 opacity-30">
          <path
            d="M30 5 A25 25 0 1 0 30 55 A15 15 0 1 1 30 5 Z"
            fill="rgba(42,37,148,0.8)"
          />
        </svg>
      </div>

      {/* Question cards overlaid */}
      <div className="absolute bottom-8 left-6 right-6 flex flex-col gap-3">
        {["Do you offer AI integration?", "What's your tech stack?"].map((q, i) => (
          <div
            key={i}
            className="px-4 py-3 rounded-xl text-[12px] text-white/60"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            {q}
          </div>
        ))}
      </div>

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p
          className="text-white/25 text-[13px] text-center px-6"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Got questions?
          <br />
          We've got answers.
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28 bg-[#04051B]">
      <div className="max-w-[1312px] mx-auto px-6 xl:px-0 flex flex-col gap-14">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center gap-5 max-w-2xl mx-auto"
        >
          <span className="badge" style={{ fontFamily: "var(--font-poppins)" }}>
            FAQ
          </span>
          <h2
            className="text-[clamp(2rem,4vw,3.4rem)] font-semibold text-white leading-[1.1]"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            <span className="font-extralight">Got Questions?</span>
            <br />
            We've Got Answers!
          </h2>
        </motion.div>

        {/* Two-column: left visual + right accordion */}
        <div className="grid lg:grid-cols-[2fr_3fr] gap-12 items-start">

          {/* Left — visual */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <FAQVisual />
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background:
                    open === i
                      ? "linear-gradient(135deg, rgba(42,37,148,0.22) 0%, rgba(4,5,27,0.9) 100%)"
                      : "rgba(255,255,255,0.025)",
                  border:
                    open === i
                      ? "1px solid rgba(42,37,148,0.35)"
                      : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span
                    className="text-[15px] font-medium text-white/90"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    {faq.q}
                  </span>
                  <PlusIcon open={open === i} />
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p
                        className="px-6 pb-6 text-[14px] text-white/50 leading-[1.8]"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
