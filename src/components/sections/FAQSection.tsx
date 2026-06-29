"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "How do I know if my business is ready for AI automation?",
    a: "If your team spends meaningful time on repetitive tasks like data entry, lead qualification, reporting, or customer follow-up, you are already absorbing the cost of not automating. We begin every AI engagement with a workflow audit to identify the highest-value opportunities first, so you see results quickly without disrupting current operations.",
  },
  {
    q: "How does Enif approach a new project?",
    a: "Every engagement begins with a scoping session where we map your goals, constraints, and growth targets. We then propose a structured plan with clear milestones and deliverables. You have a dedicated contact throughout, and we use collaborative tools to keep you fully informed at every stage, with no unnecessary meetings and no guesswork.",
  },
  {
    q: "Can you integrate with the platforms and tools we already use?",
    a: "In almost every case, yes. We build integrations with existing CRMs, ERPs, e-commerce platforms, marketing stacks, and cloud environments. We design solutions that extend and enhance what you already have, and only recommend replacing systems when it genuinely serves your business interests.",
  },
  {
    q: "What if our project scope changes as we grow?",
    a: "We expect it to. We architect every system with modular, extensible foundations, meaning new features, increased capacity, or additional integrations can be layered in without restructuring what already works. Scope evolution is not a complication; it is something we design for from the start.",
  },
  {
    q: "Can Enif adapt its services to different industries?",
    a: "Yes. We have delivered for clients across e-commerce, SaaS, healthcare, logistics, retail, education, and professional services. Our process is industry-agnostic by design: we learn your specific business model first, then build technology and strategy that fits your market, not a generic template.",
  },
];

function PlusMinus({ open }: { open: boolean }) {
  return (
    <div style={{
      width:28, height:28, borderRadius:"50%", flexShrink:0,
      display:"flex", alignItems:"center", justifyContent:"center",
      background: open ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)",
      border:"1px solid rgba(255,255,255,0.10)",
      transition:"background 0.2s",
    }}>
      <svg viewBox="0 0 12 12" fill="none" style={{ width:11,height:11, transition:"transform 0.3s",
        transform: open ? "rotate(45deg)" : "none" }}>
        <path d="M6 1v10M1 6h10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

function Moon() {
  return (
    <div style={{
      width:"100%", minHeight:360,
      borderRadius:24,
      background:"linear-gradient(160deg, rgba(16,14,80,0.8) 0%, rgba(4,5,27,0.9) 100%)",
      border:"1px solid rgba(255,255,255,0.07)",
      display:"flex", alignItems:"center", justifyContent:"center",
      position:"relative", overflow:"hidden",
    }}>
      {/* Ambient glow */}
      <div style={{
        position:"absolute", inset:0,
        background:"radial-gradient(ellipse 70% 60% at 50% 50%, rgba(30,24,120,0.45) 0%, transparent 70%)",
      }}/>
      {/* Stars inside panel */}
      {[[10,12],[80,18],[15,70],[82,65],[50,8],[5,45],[90,42],[35,88],[65,85]].map(([x,y],i)=>(
        <div key={i} style={{
          position:"absolute", left:`${x}%`, top:`${y}%`,
          width: i%3===0 ? 2 : 1, height: i%3===0 ? 2 : 1,
          borderRadius:"50%", background:"white", opacity: 0.25+i*0.04,
        }}/>
      ))}
      {/* Moon sphere */}
      <div style={{ position:"relative", width:200, height:200, borderRadius:"50%",
        background:"radial-gradient(circle at 38% 34%, #9090ff 0%, #4855cc 22%, #1e2aa0 52%, #0c1260 78%, #070c44 100%)",
        boxShadow:"0 0 90px rgba(50,60,200,0.48), 0 0 32px rgba(90,110,255,0.28)",
        flexShrink:0,
      }}>
        {/* Crescent shadow */}
        <div style={{ position:"absolute", inset:0, borderRadius:"50%",
          background:"radial-gradient(circle at 74% 48%, transparent 38%, rgba(4,5,27,0.72) 50%)",
        }}/>
        {/* Craters */}
        {[[28,36,22],[54,60,14],[65,26,12],[20,65,10]].map(([x,y,r],i)=>(
          <div key={i} style={{
            position:"absolute", left:`${x}%`, top:`${y}%`,
            width:r, height:r, transform:"translate(-50%,-50%)",
            borderRadius:"50%", background:"rgba(0,0,0,0.18)",
          }}/>
        ))}
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [open, setOpen] = useState<number|null>(1);

  return (
    <section style={{ padding:"80px 0 100px", background:"transparent" }}>
      <div style={{ maxWidth:1312, margin:"0 auto", padding:"0 24px", display:"flex", flexDirection:"column", gap:48 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-60px" }}
          transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}
          style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14, textAlign:"center" }}
        >
          <span style={{
            display:"inline-flex", padding:"5px 18px", borderRadius:9999,
            border:"1px solid rgba(255,255,255,0.14)",
            background:"rgba(255,255,255,0.04)",
            fontSize:12, fontFamily:"var(--font-poppins)",
            color:"rgba(255,255,255,0.55)",
          }}>
            FAQ
          </span>
          <h2 style={{
            fontFamily:"var(--font-plus-jakarta)",
            fontSize:"clamp(1.9rem,3.8vw,3.2rem)",
            fontWeight:700, lineHeight:1.18,
            color:"#fff", margin:0,
          }}>
            Got Questions? We Have<br/>Got Answers.
          </h2>
        </motion.div>

        {/* Two-col */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 items-start">

          {/* Left: moon */}
          <motion.div
            initial={{ opacity:0, x:-24 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:"-40px" }}
            transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}
          >
            <Moon />
          </motion.div>

          {/* Right: accordion */}
          <motion.div
            initial={{ opacity:0, x:24 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:"-40px" }}
            transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}
            style={{ display:"flex", flexDirection:"column", gap:10 }}
          >
            {FAQS.map((faq, i) => (
              <div key={i} style={{
                borderRadius:16, overflow:"hidden",
                background: open===i ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.025)",
                border:"1px solid rgba(255,255,255,0.08)",
                transition:"background 0.25s",
              }}>
                <button
                  style={{
                    width:"100%", display:"flex", alignItems:"center",
                    justifyContent:"space-between", gap:16,
                    padding:"16px 20px", textAlign:"left",
                    background:"none", border:"none", cursor:"pointer",
                  }}
                  onClick={()=>setOpen(open===i ? null : i)}
                >
                  <span style={{
                    fontFamily:"var(--font-dm-sans)",
                    fontSize:14, fontWeight:500,
                    color:"rgba(255,255,255,0.80)",
                  }}>
                    {faq.q}
                  </span>
                  <PlusMinus open={open===i} />
                </button>

                <AnimatePresence initial={false}>
                  {open===i && faq.a && (
                    <motion.div
                      key="body"
                      initial={{ height:0, opacity:0 }}
                      animate={{ height:"auto", opacity:1 }}
                      exit={{ height:0, opacity:0 }}
                      transition={{ duration:0.28, ease:[0.16,1,0.3,1] }}
                      style={{ overflow:"hidden" }}
                    >
                      <p style={{
                        fontFamily:"var(--font-dm-sans)",
                        color:"rgba(255,255,255,0.45)",
                        padding:"0 20px 18px",
                        margin:0,
                      }}>
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
