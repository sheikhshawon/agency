"use client";

import { motion } from "framer-motion";
import Link from "next/link";

function Sparkle({ style }: { style?: React.CSSProperties }) {
  return (
    <svg style={{ position:"absolute", pointerEvents:"none", ...style }} viewBox="0 0 20 20" fill="white">
      <path d="M10 1l1.4 6.6L18 10l-6.6 1.4L10 18l-1.4-6.6L2 10l6.6-1.4z"/>
    </svg>
  );
}

export default function CTABanner() {
  return (
    <section style={{ position:"relative", padding:"100px 0 110px", background:"transparent", overflow:"hidden" }}>

      {/* Purple radial glow */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse 85% 100% at 50% 50%, rgba(38,32,160,0.52) 0%, rgba(18,14,80,0.28) 45%, transparent 70%)",
      }}/>
      {/* Horizontal fade */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        background:"linear-gradient(90deg, rgba(4,5,27,0.90) 0%, transparent 25%, transparent 75%, rgba(4,5,27,0.90) 100%)",
      }}/>

      {/* Sparkle decorations */}
      <Sparkle style={{ top:"18%", left:"7%",  width:16, height:16, opacity:0.18 }}/>
      <Sparkle style={{ top:"22%", right:"9%", width:13, height:13, opacity:0.14 }}/>
      <Sparkle style={{ bottom:"22%", left:"13%",  width:11, height:11, opacity:0.12 }}/>
      <Sparkle style={{ bottom:"20%", right:"8%",  width:15, height:15, opacity:0.13 }}/>
      <Sparkle style={{ top:"50%", left:"3%",  width:9,  height:9,  opacity:0.12 }}/>
      <Sparkle style={{ top:"46%", right:"4%", width:9,  height:9,  opacity:0.10 }}/>

      {/* Content */}
      <div style={{
        position:"relative", zIndex:1,
        maxWidth:1312, margin:"0 auto", padding:"0 24px",
        display:"flex", flexDirection:"column", alignItems:"center",
        textAlign:"center", gap:24,
      }}>

        {/* Headline */}
        <motion.h2
          initial={{ opacity:0, y:28 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-60px" }}
          transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}
          style={{
            maxWidth:760,
            fontFamily:"var(--font-plus-jakarta)",
            fontSize:"clamp(2.2rem,5vw,4.4rem)",
            lineHeight:1.1, margin:0,
            color:"#fff",
          }}
        >
          <span style={{ fontWeight:800 }}>Intelligent Tools For</span>
          <br />
          <em style={{
            fontFamily:"Georgia,'Times New Roman',serif",
            fontStyle:"italic", fontWeight:300,
          }}>Next-Level</em>
          <span style={{ fontWeight:800 }}> Business Growth</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-60px" }}
          transition={{ duration:0.6, delay:0.14, ease:[0.16,1,0.3,1] }}
          style={{
            maxWidth:460,
            fontFamily:"var(--font-dm-sans)",
            color:"rgba(255,255,255,0.42)",
            margin:0,
          }}
        >
          From your first digital product to your next stage of scale, Enif is
          built for that conversation. Let us map what your transformation looks like.
        </motion.p>

        {/* CTA — same pill style as hero */}
        <motion.div
          initial={{ opacity:0, y:18 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-60px" }}
          transition={{ duration:0.6, delay:0.24, ease:[0.16,1,0.3,1] }}
        >
          <Link
            href="/contact"
            style={{
              display:"inline-block",
              padding:"13px 40px",
              borderRadius:9999,
              border:"1px solid rgba(255,255,255,0.28)",
              background:"rgba(48,44,130,0.50)",
              backdropFilter:"blur(6px)",
              color:"#fff",
              fontSize:15,
              fontWeight:500,
              fontFamily:"var(--font-poppins)",
              letterSpacing:"0.01em",
              textDecoration:"none",
            }}
          >
            Join With Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
