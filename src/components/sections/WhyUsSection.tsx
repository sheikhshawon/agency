"use client";

import { motion } from "framer-motion";

/* Arrow icon — small diagonal ↗ */
function IconArrow() {
  return (
    <div style={{
      width:48, height:48, borderRadius:"50%",
      display:"flex", alignItems:"center", justifyContent:"center",
      background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.10)",
    }}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M4.5 13.5l9-9M13.5 4.5H6M13.5 4.5v7.5"
          stroke="rgba(255,255,255,0.80)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

/* Refresh-circle icon */
function IconRefresh() {
  return (
    <div style={{
      width:48, height:48, borderRadius:"50%",
      display:"flex", alignItems:"center", justifyContent:"center",
      background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.10)",
    }}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M6 11a5 5 0 1 0 1.2-3.2" stroke="rgba(255,255,255,0.80)" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
        <path d="M4 5l3.2 2.8L4 11" stroke="rgba(255,255,255,0.80)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M14 6l1 2.5 2.5 1-2.5 1L14 13l-1-2.5-2.5-1 2.5-1z" fill="rgba(255,255,255,0.65)"/>
      </svg>
    </div>
  );
}

/* Large sparkle — fills top portion of Tailored Solutions card */
function IconSparkle() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <circle cx="36" cy="36" r="35" stroke="rgba(255,255,255,0.10)" strokeWidth="1"/>
      <path d="M36 18l2.8 13.2L52 36l-13.2 2.8L36 52l-2.8-13.2L20 36l13.2-2.8z"
        fill="none" stroke="rgba(255,255,255,0.80)" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M54 20l1.2 3.8 3.8 1.2-3.8 1.2-1.2 3.8-1.2-3.8-3.8-1.2 3.8-1.2z"
        fill="rgba(255,255,255,0.65)"/>
      <path d="M17 48l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z"
        fill="rgba(255,255,255,0.50)"/>
      <circle cx="56" cy="44" r="1.5" fill="rgba(255,255,255,0.45)"/>
      <circle cx="16" cy="22" r="1.2" fill="rgba(255,255,255,0.40)"/>
    </svg>
  );
}

const CARDS = [
  {
    title: "Proven Results",
    desc: "We measure our work by business outcomes, not deliverable checklists. Every project begins with a clear definition of what winning looks like for you, then we engineer backward from that goal. Our client retention rate above 98% reflects the quality of what we deliver.",
    Icon: IconArrow,
    mt: "lg:mt-[clamp(40px,8vw,96px)]",
  },
  {
    title: "Expert Teams",
    desc: "Our team does not generalize across everything. We have dedicated specialists in development, AI, design, and growth, each operating at the top of their discipline. You receive senior-level execution on every layer of your project.",
    Icon: IconRefresh,
    mt: "lg:mt-[clamp(20px,4vw,48px)]",
  },
  {
    title: "Tailored Solutions",
    desc: "Off-the-shelf never fits precisely. We build solutions architected for where your business is going, not just where it is today. Whether you are serving 10 users or 10,000, the foundations we lay are built to scale without rebuilding.",
    Icon: IconSparkle,
    mt: "lg:mt-0",
  },
];

export default function WhyUsSection() {
  return (
    <section id="why-us" style={{ padding: "80px 0 100px", background: "transparent" }}>
      <div style={{ maxWidth:1312, margin:"0 auto", padding:"0 24px" }}>

        <div className="flex flex-col lg:flex-row" style={{ gap:"clamp(32px,6vw,80px)" }}>

          {/* LEFT: header */}
          <motion.div
            initial={{ opacity:0, y:24 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, margin:"-60px" }}
            transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}
            className="w-full lg:w-[clamp(200px,22vw,280px)] lg:shrink-0"
            style={{ display:"flex", flexDirection:"column", gap:16 }}
          >
            <span style={{
              display:"inline-flex", width:"fit-content",
              padding:"5px 16px", borderRadius:9999,
              border:"1px solid rgba(255,255,255,0.14)",
              background:"rgba(255,255,255,0.04)",
              fontSize:12, fontFamily:"var(--font-poppins)",
              color:"rgba(255,255,255,0.55)",
            }}>
              Why Choose us?
            </span>
            <h2 style={{
              fontFamily:"var(--font-plus-jakarta)",
              fontSize:"clamp(1.8rem,3vw,2.8rem)",
              fontWeight:700, lineHeight:1.15,
              color:"#fff", margin:0,
            }}>
              Empowering Your<br />Business Journey
            </h2>
          </motion.div>

          {/* RIGHT: 3 staggered cards */}
          <div style={{ flex:1, minWidth:0, display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,220px),1fr))", gap:16, alignItems:"start" }}>
            {CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity:0, y:32 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:"-40px" }}
                transition={{ duration:0.6, delay:i*0.1, ease:[0.16,1,0.3,1] }}
                className={card.mt}
                style={{
                  borderRadius:20,
                  padding:24,
                  display:"flex", flexDirection:"column", gap:20,
                  background:"rgba(8,8,48,0.55)",
                  border:"1px solid rgba(255,255,255,0.08)",
                  backdropFilter:"blur(4px)",
                }}
              >
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent: i===2 ? "flex-end" : "flex-start" }}>
                  <card.Icon />
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:10, marginTop:"auto" }}>
                  <h3 style={{
                    fontFamily:"var(--font-plus-jakarta)",
                    fontSize:17, fontWeight:700,
                    color:"#fff", margin:0, lineHeight:1.25,
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    fontFamily:"var(--font-dm-sans)",
                    color:"rgba(255,255,255,0.45)", margin:0,
                  }}>
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
