"use client";

import { useState, useTransition } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { subscribe } from "@/app/admin/subscribers/actions";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData();
    fd.set("email", email);
    startTransition(async () => {
      const res = await subscribe(fd);
      setResult({ ok: res.success, message: res.message });
      if (res.success) setEmail("");
    });
  }

  return (
    <div className="flex flex-col gap-2 w-full sm:w-auto">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setResult(null); }}
          required
          placeholder="Enter your email"
          aria-label="Email address"
          className="h-10 w-full sm:w-56 px-4 rounded-full text-[13px] text-white placeholder-white/35 outline-none transition-colors focus:border-white/30"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", fontFamily: "var(--font-dm-sans)" }}
        />
        <button
          type="submit"
          disabled={isPending}
          aria-label="Subscribe"
          className="h-10 px-4 shrink-0 rounded-full flex items-center justify-center gap-1.5 text-[13px] font-semibold text-white bg-[#1560FF] hover:bg-[#3a7bff] disabled:opacity-60 transition-colors"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {isPending ? (
            <Loader2 size={15} className="animate-spin" />
          ) : result?.ok ? (
            <Check size={15} />
          ) : (
            <>
              <span className="hidden sm:inline">Subscribe</span>
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </form>
      {result && (
        <p
          className="text-[11px] px-1"
          style={{ color: result.ok ? "rgba(120,220,150,0.9)" : "rgba(255,140,140,0.9)", fontFamily: "var(--font-dm-sans)" }}
        >
          {result.message}
        </p>
      )}
    </div>
  );
}
