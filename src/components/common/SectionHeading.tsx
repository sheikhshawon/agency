"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
}

export default function SectionHeading({
  badge,
  title,
  highlight,
  description,
  align = "center",
  className,
  titleClassName,
}: SectionHeadingProps) {
  const alignClass = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }[align];

  const fullTitle = highlight
    ? title.replace(highlight, `<span class="text-[#1B6BFF]">${highlight}</span>`)
    : title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex flex-col gap-4", alignClass, className)}
    >
      {badge && (
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B6BFF]/10 border border-[#1B6BFF]/20 text-[#1B6BFF] text-xs font-semibold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1B6BFF] animate-pulse" />
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]",
          titleClassName
        )}
        dangerouslySetInnerHTML={{ __html: fullTitle }}
      />
      {description && (
        <p className="text-[#A0A0A0] text-base lg:text-lg leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </motion.div>
  );
}
