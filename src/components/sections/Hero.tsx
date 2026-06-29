"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/* ── 80 hardcoded stars — full-viewport coverage ── */
const STARS = [
  /* top strip */
  {x:1.5,y:2,  s:1.5,o:0.70},{x:6,  y:5,  s:1,  o:0.50},{x:11, y:2.5,s:2,  o:0.65},
  {x:17, y:7,  s:1,  o:0.45},{x:23, y:3,  s:1.5,o:0.60},{x:30, y:6,  s:1,  o:0.40},
  {x:37, y:2,  s:2,  o:0.60},{x:44, y:6,  s:1,  o:0.45},{x:51, y:2.5,s:1.5,o:0.55},
  {x:58, y:7,  s:1,  o:0.40},{x:65, y:3,  s:2,  o:0.60},{x:72, y:6,  s:1,  o:0.45},
  {x:79, y:2,  s:1.5,o:0.65},{x:86, y:5,  s:1,  o:0.50},{x:92, y:2.5,s:2,  o:0.65},
  {x:97, y:7,  s:1,  o:0.45},
  /* upper-mid */
  {x:4,  y:16, s:1.5,o:0.45},{x:9,  y:21, s:1,  o:0.35},{x:16, y:14, s:2,  o:0.50},
  {x:21, y:23, s:1,  o:0.30},{x:28, y:17, s:1.5,o:0.40},{x:35, y:25, s:1,  o:0.28},
  {x:42, y:13, s:2,  o:0.45},{x:50, y:19, s:1,  o:0.30},{x:57, y:15, s:1.5,o:0.38},
  {x:64, y:24, s:1,  o:0.30},{x:71, y:17, s:2,  o:0.45},{x:78, y:22, s:1,  o:0.35},
  {x:85, y:14, s:1.5,o:0.45},{x:91, y:21, s:1,  o:0.38},{x:96, y:16, s:2,  o:0.45},
  /* left edge */
  {x:1,  y:33, s:1,  o:0.35},{x:3,  y:46, s:1.5,o:0.40},{x:1,  y:59, s:1,  o:0.30},
  {x:2,  y:71, s:2,  o:0.45},{x:4,  y:83, s:1.5,o:0.40},{x:1,  y:92, s:1,  o:0.35},
  /* right edge */
  {x:96, y:30, s:1.5,o:0.40},{x:98, y:43, s:1,  o:0.35},{x:97, y:56, s:2,  o:0.42},
  {x:99, y:68, s:1.5,o:0.38},{x:95, y:79, s:1,  o:0.35},{x:98, y:89, s:2,  o:0.40},
  /* mid-left */
  {x:8,  y:37, s:1,  o:0.22},{x:13, y:52, s:1.5,o:0.28},{x:7,  y:65, s:1,  o:0.22},
  {x:11, y:76, s:2,  o:0.30},{x:15, y:88, s:1,  o:0.25},
  /* mid-right */
  {x:84, y:35, s:1,  o:0.22},{x:89, y:50, s:1.5,o:0.28},{x:83, y:63, s:1,  o:0.22},
  {x:88, y:75, s:2,  o:0.30},{x:85, y:87, s:1,  o:0.25},
  /* sparse center-sides */
  {x:18, y:40, s:1,  o:0.18},{x:24, y:55, s:1.5,o:0.20},{x:20, y:70, s:1,  o:0.18},
  {x:76, y:42, s:1,  o:0.18},{x:80, y:57, s:1.5,o:0.20},{x:75, y:72, s:1,  o:0.18},
  /* bottom strip */
  {x:5,  y:95, s:1.5,o:0.35},{x:14, y:93, s:1,  o:0.28},{x:25, y:96, s:2,  o:0.38},
  {x:36, y:94, s:1,  o:0.28},{x:47, y:97, s:1.5,o:0.35},{x:58, y:93, s:1,  o:0.28},
  {x:68, y:96, s:2,  o:0.35},{x:78, y:94, s:1.5,o:0.32},{x:88, y:97, s:1,  o:0.28},
  {x:94, y:95, s:2,  o:0.35},
];

function CometHead({ cx, cy }: { cx: string; cy: string }) {
  return (
    <circle cx={cx} cy={cy} r="2.5" fill="white" opacity="0.95">
      <animate attributeName="opacity" values="0.95;0.6;0.95" dur="3s" repeatCount="indefinite" />
    </circle>
  );
}

const AVATARS = [
  "https://i.pravatar.cc/48?img=11",
  "https://i.pravatar.cc/48?img=12",
  "https://i.pravatar.cc/48?img=13",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Background: vivid indigo-blue at top, dark navy at bottom ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 110% 65% at 50% 0%, #3838e8 0%, #2626c0 15%, #1616a0 28%, #0e0e80 42%, #07074e 60%, #04051B 80%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 55% 45% at 50% 32%, rgba(55,50,200,0.32) 0%, transparent 70%)",
      }} />

      {/* ── Star field ── */}
      {STARS.map((s, i) => (
        <div key={i} className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, opacity: s.o }} />
      ))}

      {/* ── Comet trails ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 900">
        <defs>
          <linearGradient id="cL" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="85%" stopColor="white" stopOpacity="0.55" />
            <stop offset="100%" stopColor="white" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="cR" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="80%" stopColor="white" stopOpacity="0.45" />
            <stop offset="100%" stopColor="white" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <line x1="60" y1="185" x2="330" y2="390" stroke="url(#cL)" strokeWidth="1.3" />
        <CometHead cx="330" cy="390" />
        <line x1="1390" y1="185" x2="1050" y2="430" stroke="url(#cR)" strokeWidth="1.1" />
        <CometHead cx="1050" cy="430" />
      </svg>

      {/* ── Sparkles ── */}
      {([
        ["14%","21%","w-3.5 h-3.5","0.30"],["7%","40%","w-3 h-3","0.18"],
        ["86%","18%","w-3 h-3","0.22"],["93%","38%","w-3.5 h-3.5","0.18"],
        ["20%","80%","w-2.5 h-2.5","0.15"],["78%","85%","w-2.5 h-2.5","0.15"],
      ] as [string,string,string,string][]).map(([l,t,sz,op],i) => (
        <svg key={i} className={`absolute pointer-events-none ${sz}`} style={{ left:l, top:t, opacity:op }}
          viewBox="0 0 20 20" fill="white">
          <path d="M10 1l1.4 6.6L18 10l-6.6 1.4L10 18l-1.4-6.6L2 10l6.6-1.4z" />
        </svg>
      ))}

      {/* ── Hero content ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-[84px]"
        style={{ paddingBottom: "0px" }}>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-white text-center select-none"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "clamp(2.1rem, 9vw, 4.2rem)",
              lineHeight: 1.14,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              maxWidth: "min(92vw, 1100px)",
            }}>
            {/* LINE 1 */}
            <span className="block">Accelerating Business</span>
            {/* LINE 2 */}
            <span className="block" style={{ marginTop: "0.06em" }}>
              <span className="relative inline-block">
                <span style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  letterSpacing: "-0.01em",
                }}>Growth</span>
                <span className="absolute left-0 right-0 pointer-events-none" style={{
                  bottom: "-4px", height: "2px",
                  background: "rgba(255,255,255,0.75)", borderRadius: "2px", display: "block",
                }} />
              </span>
              {" "}with Intelligent Technology
            </span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: "clamp(20px,3vw,30px)",
            fontFamily: "var(--font-dm-sans)",
            color: "rgba(255,255,255,0.60)",
            maxWidth: "min(92vw, 560px)",
          }}
        >
          We build the digital systems, automation, and brand presence that move
          ambitious businesses forward, faster, smarter, and at scale.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: "clamp(24px,3.5vw,38px)" }}
        >
          <Link
            href="/contact"
            style={{
              display: "inline-block", padding: "13px 40px", borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.30)",
              background: "rgba(48,44,130,0.55)", backdropFilter: "blur(6px)",
              color: "#fff", fontSize: "15px", fontWeight: 500,
              fontFamily: "var(--font-poppins)", letterSpacing: "0.01em", textDecoration: "none",
              transition: "background 0.25s, border-color 0.25s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(58,54,150,0.7)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(48,44,130,0.55)"; }}
          >
            Join With Us
          </Link>
        </motion.div>
      </div>

      {/* ── Bottom stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[1312px] mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-6"
        style={{ padding: "0 clamp(24px,4vw,48px) clamp(28px,4vw,44px)" }}
      >
        {/* Left: stats */}
        <div className="flex flex-wrap items-center gap-5">
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(255,255,255,0.55)", flexShrink: 0 }} />
          <div className="flex items-center gap-2.5">
            <span style={{ fontFamily: "var(--font-plus-jakarta)", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 700, color: "#fff", lineHeight: 1 }}>150+</span>
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.4 }}>Projects<br />Delivered</span>
          </div>
          <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.18)" }} />
          <div className="flex items-center gap-2.5">
            <span style={{ fontFamily: "var(--font-plus-jakarta)", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 700, color: "#fff", lineHeight: 1 }}>8+</span>
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.4 }}>Years Of<br />Excellence</span>
          </div>
        </div>

        {/* Right: avatar pill */}
        <div className="flex items-center gap-3" style={{
          padding: "10px 18px 10px 12px", borderRadius: "9999px",
          border: "1px solid rgba(255,255,255,0.15)", background: "rgba(30,28,80,0.70)", backdropFilter: "blur(12px)",
        }}>
          <div className="flex" style={{ gap: 0 }}>
            {AVATARS.map((src, i) => (
              <div key={i} style={{
                width: 40, height: 40, borderRadius: "50%", border: "2px solid rgba(20,18,72,0.9)",
                overflow: "hidden", marginLeft: i === 0 ? 0 : -10, position: "relative", zIndex: AVATARS.length - i, flexShrink: 0,
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-plus-jakarta)", fontSize: "16px", fontWeight: 700, color: "#fff", lineHeight: 1.2, margin: 0 }}>40+</p>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.3 }}>Brands Empowered</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
