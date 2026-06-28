"use client";

import { motion } from "framer-motion";

/* Figma Group 39475 — Why Choose Us: 3 cards (424x533, corner 30, padding 50/30) */

const CARDS = [
  {
    number: "01",
    title: "Expert Team",
    subtitle: "Senior Engineers & Designers",
    desc: "Our multidisciplinary team of senior engineers, UI/UX designers, and business strategists brings 5+ years of collective experience to every project. We don't just build — we think, plan, and engineer for long-term success.",
    highlights: [
      "Senior-level expertise across all disciplines",
      "Transparent communication throughout",
      "Agile development with weekly deliverables",
    ],
  },
  {
    number: "02",
    title: "Tailored Solutions",
    subtitle: "Custom-Built for Your Business",
    desc: "No templates. No shortcuts. Every solution we build is custom-designed to fit your specific business requirements, workflows, and goals. We invest time upfront to understand your business before writing a single line of code.",
    highlights: [
      "Deep discovery process for every client",
      "Architecture designed around your workflows",
      "Scalable systems that grow with you",
    ],
  },
  {
    number: "03",
    title: "Proven Results",
    subtitle: "97% Client Satisfaction Rate",
    desc: "Our track record speaks for itself. With 500+ projects delivered across industries, we've consistently achieved measurable outcomes — increased revenue, reduced operational costs, and accelerated growth for our clients.",
    highlights: [
      "500+ successful projects delivered",
      "97.3% client retention rate",
      "Measurable ROI on every engagement",
    ],
  },
];

export default function WhyUsSection() {
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
            Why Choose Us
          </span>
          <h2
            className="text-[clamp(2rem,4vw,3.4rem)] font-semibold text-white leading-[1.1]"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            <span className="font-extralight">Empowering</span> Your{" "}
            <span className="font-extralight">Business</span>
            <br />
            with Confidence
          </h2>
          <p
            className="text-white/50 text-[15px] leading-[1.8]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Thousands of companies trust Enif IT to deliver technology solutions
            that actually move the needle. Here's why.
          </p>
        </motion.div>

        {/* 3 Cards grid — Figma: 424x533, corner 30, padding 50/30 */}
        <div className="grid md:grid-cols-3 gap-5">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[30px] flex flex-col gap-6 overflow-hidden"
              style={{
                padding: "50px 30px",
                background:
                  i === 1
                    ? "linear-gradient(160deg, rgba(42,37,148,0.35) 0%, rgba(4,5,27,0.95) 100%)"
                    : "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Top glow for middle card */}
              {i === 1 && (
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(42,37,148,0.8), transparent)",
                  }}
                />
              )}

              {/* Number */}
              <span
                className="text-[3rem] font-extralight text-white/10 leading-none"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                {card.number}
              </span>

              {/* Text content */}
              <div className="flex flex-col gap-3">
                <p
                  className="text-[12px] text-[#2A2594] font-medium uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {card.subtitle}
                </p>
                <h3
                  className="text-[1.5rem] font-semibold text-white leading-[1.2]"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-white/50 text-[14px] leading-[1.8]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {card.desc}
                </p>
              </div>

              {/* Highlights list */}
              <ul className="flex flex-col gap-3 mt-auto">
                {card.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-[13px] text-white/60"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1560FF] shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
