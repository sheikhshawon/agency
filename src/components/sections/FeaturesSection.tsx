"use client";

import { useState, type ReactElement } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const MotionLink = motion(Link);

/* ── Icons (52×52, circular bordered) ── */
function ring(children: React.ReactNode) {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="25" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      {children}
    </svg>
  );
}

const IconWeb = () => ring(<>
  <path d="M20 20l-6 6 6 6M32 20l6 6-6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  <path d="M29 17l-6 18" stroke="rgba(255,255,255,0.65)" strokeWidth="1.6" strokeLinecap="round" />
</>);

const IconGrowth = () => ring(<>
  <path d="M15 35V28M23 35V22M31 35V25M39 35V18" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
  <path d="M14 22l7-5 5 3 9-7" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  <path d="M33 13h6v6" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
</>);

const IconGear = () => ring(<>
  <circle cx="26" cy="26" r="4.5" stroke="white" strokeWidth="1.8" fill="none" />
  <path d="M26 14v4M26 34v4M14 26h4M34 26h4M17.5 17.5l2.8 2.8M31.7 31.7l2.8 2.8M34.5 17.5l-2.8 2.8M20.3 31.7l-2.8 2.8"
    stroke="white" strokeWidth="1.7" strokeLinecap="round" />
</>);

const IconBrand = () => ring(<>
  <path d="M26 15l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="none" stroke="white" strokeWidth="1.7" strokeLinejoin="round" />
  <path d="M38 16l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9z" fill="rgba(255,255,255,0.6)" />
</>);

const IconAI = () => ring(<>
  <rect x="19" y="19" width="14" height="14" rx="3" stroke="white" strokeWidth="1.7" fill="none" />
  <circle cx="23" cy="23" r="1.4" fill="white" /><circle cx="29" cy="29" r="1.4" fill="white" />
  <path d="M26 13v4M26 35v4M13 26h4M35 26h4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" strokeLinecap="round" />
</>);

/* ── Arrow button ── */
function ArrowBtn() {
  return (
    <div style={{ width:46, height:46, borderRadius:"50%", background:"white",
      display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M4.5 13.5l9-9M13.5 4.5H6M13.5 4.5v7.5" stroke="#0a0a3e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ── Comet inside large card 1 ── */
function CometLine() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 620 340">
      <defs>
        <linearGradient id="fc1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="75%" stopColor="white" stopOpacity="0.45" />
          <stop offset="100%" stopColor="white" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <line x1="30" y1="60" x2="380" y2="280" stroke="url(#fc1)" strokeWidth="1.2" />
      <circle cx="380" cy="280" r="2.8" fill="white" opacity="0.95" />
      <circle cx="380" cy="280" r="6" fill="white" opacity="0.15" />
    </svg>
  );
}

const CARD_STARS_L = [
  {x:"25%",y:"55%",s:1.5},{x:"55%",y:"35%",s:1},{x:"70%",y:"60%",s:2},
  {x:"35%",y:"75%",s:1},{x:"80%",y:"42%",s:1.5},{x:"45%",y:"85%",s:1},
  {x:"60%",y:"78%",s:1.5},{x:"15%",y:"68%",s:1},{x:"88%",y:"70%",s:1.5},
];
const CARD_STARS_S = [
  {x:"25%",y:"45%",s:1.5},{x:"55%",y:"60%",s:1},{x:"70%",y:"35%",s:1.5},
  {x:"40%",y:"72%",s:1},{x:"80%",y:"55%",s:1.5},{x:"15%",y:"65%",s:1},
];

interface FeatureDef { title:string; desc:string; Icon:()=>ReactElement; href:string; }

const LARGE: FeatureDef[] = [
  {
    title: "Web & App Development",
    desc: "We architect and build high-performance websites and web applications using modern stacks built for speed, scalability, and exceptional user experience. Your digital presence should be as ambitious as your business.",
    Icon: IconWeb,
    href: "/services/web-app-development",
  },
  {
    title: "Marketing & Business Growth",
    desc: "Traffic without strategy is noise. We combine data-led SEO, performance campaigns, and conversion optimization to build growth pipelines that compound. We do not just run ads, we engineer growth systems.",
    Icon: IconGrowth,
    href: "/services/marketing-business-growth",
  },
];

const SMALL: FeatureDef[] = [
  {
    title: "Business Management Solutions",
    desc: "We design and implement integrated CRM, ERP, operations dashboards, and process automation that give you full visibility and control over every part of your business.",
    Icon: IconGear,
    href: "/services/business-management-solutions",
  },
  {
    title: "Brand Identity & Design",
    desc: "We build brand identities that communicate authority and attract the right audience, from logo systems and visual language to complete brand guidelines and campaign assets.",
    Icon: IconBrand,
    href: "/services/brand-identity-creative-design",
  },
  {
    title: "AI Solutions & Automation",
    desc: "We deploy intelligent workflows, predictive tools, and AI-integrated systems that eliminate repetitive decisions and free your team to focus on what actually moves the needle.",
    Icon: IconAI,
    href: "/services/ai-solutions-automation",
  },
];

function Card({ f, index, large }: { f:FeatureDef; index:number; large:boolean }) {
  const [hovered, setHovered] = useState(false);
  const active = hovered || (large && index === 0);
  const stars = large ? CARD_STARS_L : CARD_STARS_S;

  return (
    <MotionLink
      href={f.href}
      initial={{ opacity:0, y:28 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-40px" }}
      transition={{ duration:0.55, delay:index*0.1, ease:[0.16,1,0.3,1] }}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      className="relative rounded-[20px] overflow-hidden flex flex-col justify-between cursor-pointer no-underline"
      style={{
        minHeight: large ? 340 : 300, padding: 28,
        background: active ? "linear-gradient(145deg, #14138a 0%, #1e1dc0 45%, #2525d4 100%)" : "rgba(8,8,45,0.65)",
        border: active ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.08)",
        transition: "background 0.4s ease, border-color 0.3s ease",
      }}
    >
      {stars.map((s,i)=>(
        <div key={i} className="absolute rounded-full bg-white pointer-events-none"
          style={{ left:s.x, top:s.y, width:s.s, height:s.s, opacity: active ? 0.35 : 0.16, transition:"opacity 0.4s ease" }}/>
      ))}
      {large && index === 0 && <CometLine />}

      <div className="relative z-10"><f.Icon /></div>

      <div className="relative z-10 flex items-end justify-between gap-4">
        <div>
          <h3 style={{ fontFamily:"var(--font-plus-jakarta)", fontSize: large?22:20, fontWeight:700, color:"#fff", lineHeight:1.2, marginBottom:10 }}>
            {f.title}
          </h3>
          <p style={{ fontFamily:"var(--font-dm-sans)", color:"rgba(255,255,255,0.55)", maxWidth: large?420:undefined }}>
            {f.desc}
          </p>
        </div>
        <div className="shrink-0"><ArrowBtn /></div>
      </div>
    </MotionLink>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" style={{ background:"transparent", padding:"80px 0 100px" }}>
      <div style={{ maxWidth:1312, margin:"0 auto", padding:"0 24px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-60px" }}
          transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}
          style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16, marginBottom:52, textAlign:"center" }}
        >
          <span style={{
            display:"inline-flex", alignItems:"center", padding:"6px 20px", borderRadius:9999,
            border:"1px solid rgba(255,255,255,0.18)", background:"rgba(255,255,255,0.04)",
            fontFamily:"var(--font-dm-sans)", fontSize:14, color:"rgba(255,255,255,0.70)",
          }}>
            Features
          </span>
          <h2 style={{
            fontFamily:"var(--font-plus-jakarta)", fontSize:"clamp(2rem,4vw,3.4rem)",
            fontWeight:700, color:"#fff", lineHeight:1.12, margin:0,
          }}>
            Next-Gen Capabilities.<br />Built for Real Business.
          </h2>
        </motion.div>

        {/* Row 1 — 2 large */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16, marginBottom:16 }}>
          {LARGE.map((f,i)=> <Card key={f.title} f={f} index={i} large />)}
        </div>
        {/* Row 2 — 3 small */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:16 }}>
          {SMALL.map((f,i)=> <Card key={f.title} f={f} index={i+2} large={false} />)}
        </div>
      </div>
    </section>
  );
}
