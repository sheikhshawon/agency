"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const TAGS = [
  "+ The Future",
  "+ Smart Solutions",
  "+ Scalable Systems",
  "+ AI-Powered",
  "+ Future-Ready Tech",
  "+ Precision Built",
];

function Planet() {
  return (
    <div style={{
      position: "relative", width: "100%", aspectRatio: "16/10",
      borderRadius: "12px", overflow: "hidden",
      background: "linear-gradient(180deg, #080840 0%, #05052c 100%)",
    }}>
      {[[12,18],[22,55],[55,14],[68,62],[83,28],[40,72],[88,82],[8,78],[48,38]].map(([x,y],i)=>(
        <div key={i} style={{
          position:"absolute", left:`${x}%`, top:`${y}%`,
          width: i%3===0 ? 2 : 1, height: i%3===0 ? 2 : 1,
          borderRadius:"50%", background:"white", opacity: 0.35+i*0.04,
        }}/>
      ))}
      <div style={{
        position:"absolute", width:"clamp(100px,30%,150px)", height:"clamp(100px,30%,150px)",
        top:"50%", left:"50%", transform:"translate(-50%,-55%)", borderRadius:"50%",
        background:"radial-gradient(circle at 36% 34%, #7090ff 0%, #2a4ae0 30%, #1030b8 60%, #081080 85%, #040c60 100%)",
        boxShadow:"0 0 60px rgba(50,80,220,0.65), inset 0 0 24px rgba(120,160,255,0.25)",
      }}>
        <div style={{ position:"absolute", inset:0, borderRadius:"50%",
          background:"radial-gradient(circle at 72% 50%, transparent 42%, rgba(4,5,27,0.65) 54%)" }}/>
        {[[28,38,20],[52,62,14],[62,28,10]].map(([x,y,r],i)=>(
          <div key={i} style={{ position:"absolute", left:`${x}%`, top:`${y}%`,
            width:r, height:r, transform:"translate(-50%,-50%)", borderRadius:"50%", background:"rgba(0,0,0,0.20)" }}/>
        ))}
      </div>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse 55% 38% at 50% 45%, rgba(40,60,200,0.22) 0%, transparent 70%)" }}/>
    </div>
  );
}

const TAG_STYLE: React.CSSProperties = {
  padding:"10px 0", borderRadius:10, textAlign:"center",
  fontSize:13, fontFamily:"var(--font-dm-sans)", color:"rgba(255,255,255,0.60)",
  background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
};

export default function AboutSection() {
  return (
    <section style={{ padding: "80px 0", background: "transparent" }}>
      <div style={{ maxWidth: 1312, margin: "0 auto", padding: "0 24px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "clamp(32px,5vw,60px)", alignItems: "center",
        }}>

          {/* LEFT — dark card with planet + 6 tags */}
          <motion.div
            initial={{ opacity:0, x:-32 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:"-60px" }}
            transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}
            style={{
              borderRadius: 20, padding: 16, display: "flex", flexDirection: "column", gap: 12,
              background: "rgba(8,8,48,0.72)", border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Planet />
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {TAGS.slice(0,2).map((t,i)=> <div key={i} style={TAG_STYLE}>{t}</div>)}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {TAGS.slice(2,4).map((t,i)=> <div key={i} style={TAG_STYLE}>{t}</div>)}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {TAGS.slice(4,6).map((t,i)=> <div key={i} style={TAG_STYLE}>{t}</div>)}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — text */}
          <motion.div
            initial={{ opacity:0, x:32 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:"-60px" }}
            transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}
            style={{ display:"flex", flexDirection:"column", gap:20 }}
          >
            <span style={{
              display:"inline-flex", width:"fit-content", padding:"5px 16px", borderRadius:9999,
              border:"1px solid rgba(255,255,255,0.14)", background:"rgba(255,255,255,0.04)",
              fontSize:12, fontFamily:"var(--font-poppins)", color:"rgba(255,255,255,0.55)",
            }}>
              About Us
            </span>

            <h2 style={{
              fontFamily:"var(--font-plus-jakarta)", fontSize:"clamp(1.8rem,3.2vw,3rem)",
              fontWeight:700, lineHeight:1.15, color:"#fff", margin:0,
            }}>
              Empowering Innovation.<br />
              Our Technology. <span style={{
                fontFamily:"Georgia,'Times New Roman',serif", fontStyle:"italic", fontWeight:300,
              }}>Your Growth.</span>
            </h2>

            <p style={{ fontFamily:"var(--font-dm-sans)", color:"rgba(255,255,255,0.48)", margin:0 }}>
              Enif IT Services was founded on a single conviction, that the right
              technology, applied with precision, transforms how businesses operate
              and grow. We named ourselves after Enif, the brightest star in the
              constellation Pegasus. Like that star, we exist to guide: bringing
              clarity, intelligence, and forward momentum to every business we work with.
            </p>
            <p style={{ fontFamily:"var(--font-dm-sans)", color:"rgba(255,255,255,0.48)", margin:0 }}>
              We are not a generalist agency. Every solution we deliver, across web
              and app development, AI automation, business management, marketing, and
              brand identity, is engineered to produce measurable outcomes.
            </p>

            <Link
              href="/about"
              style={{
                display:"inline-flex", alignItems:"center", gap:8, width:"fit-content",
                padding:"12px 28px", borderRadius:9999,
                border:"1px solid rgba(255,255,255,0.22)", background:"rgba(48,44,130,0.45)",
                color:"#fff", fontSize:14, fontWeight:500, fontFamily:"var(--font-poppins)",
                textDecoration:"none",
              }}
            >
              Learn More About Enif
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
