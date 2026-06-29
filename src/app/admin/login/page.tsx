"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail, Eye, EyeOff, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import Logo from "@/components/common/Logo";
import { login } from "./actions";

/* Deterministic star field. Values are rounded to fixed precision so the
   server and client serialize identical strings (avoids hydration mismatch
   from tiny Math.sin differences across runtimes). */
const STARS = Array.from({ length: 170 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin((i + 1) * n) * 43758.5453;
    return x - Math.floor(x);
  };
  return {
    x: (r(12.9898) * 100).toFixed(2),     // %
    y: (r(78.233) * 100).toFixed(2),      // %
    s: +(r(3.137) * 1.8 + 0.4).toFixed(2), // size 0.4–2.2px
    o: +(r(7.21) * 0.5 + 0.18).toFixed(3), // opacity 0.18–0.68
    d: +(r(2.61) * 3 + 2.4).toFixed(2),    // twinkle duration 2.4–5.4s
    delay: +(r(9.91) * 4).toFixed(2),      // delay 0–4s
  };
});

const SPARKLES = [
  { l: "15%", t: "24%", s: 16, o: 0.28 },
  { l: "83%", t: "18%", s: 12, o: 0.22 },
  { l: "24%", t: "74%", s: 11, o: 0.18 },
  { l: "79%", t: "72%", s: 13, o: 0.2 },
];

function starStyle(st: (typeof STARS)[number]): React.CSSProperties {
  const s: Record<string, string | number> = {
    left: `${st.x}%`,
    top: `${st.y}%`,
    width: st.s,
    height: st.s,
    opacity: st.o,
    "--o": String(st.o),
    animation: `twinkle ${st.d}s ease-in-out ${st.delay}s infinite`,
  };
  return s as React.CSSProperties;
}

const INPUT =
  "w-full h-11 rounded-xl bg-white/[0.04] border border-white/10 pl-10 pr-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#1560FF] focus:bg-white/[0.06]";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const fd = new FormData();
    fd.set("email", email);
    fd.set("password", password);
    startTransition(async () => {
      const res = await login(fd);
      if (res.success) {
        const from = new URLSearchParams(window.location.search).get("from");
        router.push(from && from.startsWith("/admin") ? from : "/admin");
        router.refresh();
      } else {
        setError(res.message);
      }
    });
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden p-4"
      style={{ background: "#04051B" }}
    >
      {/* Indigo glow from the top, like the homepage hero */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 50% -12%, rgba(40,40,170,0.38) 0%, rgba(12,12,80,0.12) 38%, transparent 66%)",
        }}
      />
      {/* Soft glow behind the card */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle 460px at 50% 46%, rgba(42,37,148,0.4) 0%, transparent 70%)",
        }}
      />

      {/* Star field */}
      {STARS.map((st, i) => (
        <span key={i} aria-hidden className="absolute rounded-full bg-white pointer-events-none" style={starStyle(st)} />
      ))}

      {/* Sparkles */}
      {SPARKLES.map((sp, i) => (
        <svg
          key={i}
          aria-hidden
          className="absolute pointer-events-none"
          width={sp.s}
          height={sp.s}
          viewBox="0 0 20 20"
          fill="white"
          style={{ left: sp.l, top: sp.t, opacity: sp.o }}
        >
          <path d="M10 1l1.4 6.6L18 10l-6.6 1.4L10 18l-1.4-6.6L2 10l6.6-1.4z" />
        </svg>
      ))}

      {/* Content */}
      <div className="relative z-10 w-full max-w-sm">
        {/* Brand */}
        <div className="flex flex-col items-center gap-5 mb-6">
          <Logo variant="light" height={40} />
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">Admin Login</h1>
            <p className="text-sm text-white/50 mt-1">Sign in to manage your dashboard</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 flex flex-col gap-4"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.10)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 24px 70px -24px rgba(0,0,0,0.85)",
          }}
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-white/60">Email</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null); }}
                className={INPUT}
                placeholder="you@enifit.com"
                autoFocus
                autoComplete="email"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-white/60">Password</label>
            <div className="relative">
              <LockKeyhole size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35" />
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(null); }}
                className={`${INPUT} pr-10`}
                placeholder="Your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/70 transition-colors"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm font-medium text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5">
              <AlertCircle size={15} className="shrink-0" /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-1 h-11 flex items-center justify-center gap-2 rounded-xl bg-[#1560FF] hover:bg-[#3a7bff] disabled:opacity-60 text-white text-sm font-semibold transition-colors"
            style={{ boxShadow: "0 0 30px rgba(21,96,255,0.4)" }}
          >
            {isPending ? <Loader2 size={15} className="animate-spin" /> : <ArrowRight size={15} />}
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-white/30 mt-5">
          Enif IT Services Ltd. · Admin Panel
        </p>
      </div>
    </div>
  );
}
