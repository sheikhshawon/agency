"use client";

const LOGOS = [
  { text:"logoipsum", icon:null,     weight:400, spacing:"normal"   },
  { text:"Logoipsum", icon:"star",   weight:500, spacing:"normal"   },
  { text:"LOGOIPSUM", icon:"mic",    weight:700, spacing:"0.16em"   },
  { text:"logoipsum", icon:"circle", weight:400, spacing:"normal"   },
  { text:"logoipsum", icon:null,     weight:400, spacing:"normal"   },
  { text:"Logoipsum", icon:"star",   weight:500, spacing:"normal"   },
  { text:"LOGOIPSUM", icon:"mic",    weight:700, spacing:"0.16em"   },
  { text:"logoipsum", icon:"circle", weight:400, spacing:"normal"   },
  { text:"logoipsum", icon:null,     weight:400, spacing:"normal"   },
  { text:"Logoipsum", icon:"star",   weight:500, spacing:"normal"   },
  { text:"LOGOIPSUM", icon:"mic",    weight:700, spacing:"0.16em"   },
  { text:"logoipsum", icon:"circle", weight:400, spacing:"normal"   },
];

function LogoIcon({ type }: { type: string|null }) {
  if (!type) return null;
  if (type === "star") return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity:0.55 }}>
      <path d="M7 1l1.2 4.8L13 7l-4.8 1.2L7 13l-1.2-4.8L1 7l4.8-1.2z"
        fill="white" />
    </svg>
  );
  if (type === "mic") return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" style={{ opacity:0.55 }}>
      <rect x="3.5" y="1" width="5" height="8" rx="2.5" stroke="white" strokeWidth="1.3"/>
      <path d="M1 7.5A5 5 0 0 0 11 7.5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="6" y1="12.5" x2="6" y2="14" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
  if (type === "circle") return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity:0.55 }}>
      <circle cx="7" cy="7" r="6" stroke="white" strokeWidth="1.3"/>
      <path d="M4.5 7h5M7 4.5v5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
  return null;
}

export default function MarqueeSection() {
  return (
    <section style={{
      position:"relative", padding:"40px 0", overflow:"hidden",
      background:"transparent",
      borderTop:"1px solid rgba(255,255,255,0.06)",
      borderBottom:"1px solid rgba(255,255,255,0.06)",
    }}>
      {/* Trust line */}
      <p style={{
        textAlign:"center", marginBottom:28,
        fontFamily:"var(--font-dm-sans)", fontSize:14,
        color:"rgba(255,255,255,0.40)",
        padding:"0 24px",
      }}>
        Trusted by forward-thinking businesses building for what&apos;s next.
      </p>

      {/* Left fade */}
      <div style={{
        position:"absolute", left:0, top:0, bottom:0, width:120, zIndex:1, pointerEvents:"none",
        background:"linear-gradient(90deg, #04051B 0%, transparent 100%)",
      }}/>
      {/* Right fade */}
      <div style={{
        position:"absolute", right:0, top:0, bottom:0, width:120, zIndex:1, pointerEvents:"none",
        background:"linear-gradient(-90deg, #04051B 0%, transparent 100%)",
      }}/>

      <div style={{ display:"flex", overflow:"hidden" }}>
        {[0,1].map(copy => (
          <div key={copy}
            style={{
              display:"flex", alignItems:"center", gap:64, flexShrink:0, whiteSpace:"nowrap",
              animation:"marquee 32s linear infinite",
            }}
          >
            {LOGOS.map((logo, i) => (
              <span key={i} style={{
                display:"inline-flex", alignItems:"center", gap:7,
                fontFamily: logo.weight >= 700 ? "var(--font-poppins)" : "var(--font-dm-sans)",
                fontSize:15,
                fontWeight:logo.weight,
                letterSpacing:logo.spacing,
                color:"rgba(255,255,255,0.25)",
                userSelect:"none",
              }}>
                <LogoIcon type={logo.icon} />
                {logo.text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
