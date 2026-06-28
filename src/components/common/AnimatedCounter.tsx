"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  label: string;
  className?: string;
  delay?: number;
}

function parseNumeric(value: string): { num: number; prefix: string } {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)/);
  if (!match) return { num: 0, prefix: "" };
  return { num: parseFloat(match[2]), prefix: match[1] };
}

export default function AnimatedCounter({
  value,
  suffix = "",
  label,
  className,
  delay = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayed, setDisplayed] = useState("0");
  const { num, prefix } = parseNumeric(value);

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      const duration = 1800;
      const steps = 60;
      const increment = num / steps;
      let current = 0;
      let step = 0;
      const interval = setInterval(() => {
        step++;
        current = Math.min(current + increment, num);
        const isDecimal = value.includes(".");
        setDisplayed(
          prefix + (isDecimal ? current.toFixed(1) : Math.round(current).toLocaleString())
        );
        if (step >= steps) clearInterval(interval);
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [isInView, num, prefix, value, delay]);

  return (
    <div ref={ref} className={cn("flex flex-col gap-1", className)}>
      <span className="text-3xl lg:text-4xl font-bold text-white tabular-nums">
        {displayed}
        <span className="text-[#1B6BFF]">{suffix}</span>
      </span>
      <span className="text-sm text-[#606060] font-medium">{label}</span>
    </div>
  );
}
