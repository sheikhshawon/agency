"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Code2, LayoutDashboard, TrendingUp, Palette, Sparkles, ArrowRight } from "lucide-react";
import { SERVICES, IMPACT_STATS } from "@/constants/content";

const ICON_MAP: Record<string, React.ElementType> = {
  Code2, LayoutDashboard, TrendingUp, Palette, Sparkles,
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-14">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl lg:text-[2.4rem] xl:text-[2.75rem] font-bold text-white leading-[1.1] tracking-[-0.02em]">
            Transforming Companies with{" "}
            <span className="text-[#1560FF]">Smart Digital Tools</span>
          </h2>
          <p className="text-[#888] text-[15px] leading-[1.75]">
            Our Business Technology solutions are designed to help companies enhance
            productivity, optimize workflows, and stay competitive in today's
            tech-driven world.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((svc, i) => {
            const Icon = ICON_MAP[svc.icon] ?? Sparkles;
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={svc.href}
                  className="group flex flex-col gap-5 p-6 h-full rounded-2xl bg-[#0D0D0D] border border-[#1A1A1A] hover:border-[#1560FF]/30 hover:bg-[#0F0F16] transition-all duration-300 hover:shadow-[0_0_32px_rgba(21,96,255,0.08)]"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#1560FF]/10 border border-[#1560FF]/18 flex items-center justify-center group-hover:bg-[#1560FF]/18 transition-colors">
                    <Icon size={20} className="text-[#1560FF]" />
                  </div>
                  <div className="flex flex-col gap-2.5 flex-1">
                    <h3 className="text-[15px] font-semibold text-white group-hover:text-[#1560FF] transition-colors leading-snug">
                      {svc.title}
                    </h3>
                    <p className="text-[13px] text-[#666] leading-[1.7] flex-1">
                      {svc.description}
                    </p>
                    <ul className="flex flex-col gap-1.5 mt-1">
                      {svc.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-[12px] text-[#555]">
                          <span className="w-1 h-1 rounded-full bg-[#1560FF] shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] text-[#444] group-hover:text-[#1560FF] transition-colors">
                    Learn more
                    <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* "All Services" CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: SERVICES.length * 0.07 }}
          >
            <Link
              href="/services"
              className="group flex flex-col items-center justify-center gap-3 p-6 h-full min-h-[180px] rounded-2xl border border-dashed border-[#222] hover:border-[#1560FF]/35 hover:bg-[#0F0F16] transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-[#1560FF]/10 flex items-center justify-center group-hover:bg-[#1560FF]/18 transition-colors">
                <ArrowRight size={20} className="text-[#1560FF]" />
              </div>
              <div className="text-center">
                <p className="text-[14px] font-semibold text-white mb-1">Explore All Services</p>
                <p className="text-[12px] text-[#555]">See the full scope</p>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Bottom stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-[#141414]"
        >
          {IMPACT_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-0.5">
              <span className="text-2xl lg:text-3xl font-bold text-white tabular-nums">
                {stat.value}
                <span className="text-[#1560FF]">{stat.suffix}</span>
              </span>
              <span className="text-[11px] text-[#555] font-medium">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
