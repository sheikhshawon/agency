import type { Metadata } from "next";
import { Code2, LayoutDashboard, TrendingUp, Palette, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/common/SectionHeading";
import { SERVICES } from "@/constants/content";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Enif IT's full range of services: web development, AI automation, business solutions, brand design, and growth marketing.",
};

const ICON_MAP: Record<string, React.ElementType> = {
  Code2, LayoutDashboard, TrendingUp, Palette, Sparkles,
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(27,107,255,0.08) 0%, transparent 70%)" }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            badge="What We Offer"
            title="Services Built for"
            highlight="Growth"
            description="From idea to execution, we provide end-to-end technology services designed to accelerate your business growth and competitive edge."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-16">
          {SERVICES.map((service, i) => {
            const Icon = ICON_MAP[service.icon] ?? Sparkles;
            const isEven = i % 2 === 0;
            return (
              <div
                key={service.id}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}
              >
                <div className={!isEven ? "lg:order-2" : ""}>
                  <div className="w-12 h-12 rounded-xl bg-[#1B6BFF]/10 border border-[#1B6BFF]/20 flex items-center justify-center mb-5">
                    <Icon size={22} className="text-[#1B6BFF]" />
                  </div>
                  <span className="text-xs font-semibold text-[#1B6BFF] uppercase tracking-wider">Service 0{i + 1}</span>
                  <h2 className="mt-2 text-2xl lg:text-3xl font-bold text-white mb-4">{service.title}</h2>
                  <p className="text-[#A0A0A0] leading-relaxed mb-6">{service.description}</p>
                  <ul className="grid grid-cols-2 gap-3 mb-7">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[#808080]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1B6BFF] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[#1B6BFF] text-white rounded-xl hover:bg-[#4A8FFF] transition-colors"
                  >
                    Start a Project <ArrowRight size={14} />
                  </Link>
                </div>
                <div className={`aspect-[4/3] rounded-3xl bg-[#0F0F0F] border border-[#1E1E1E] grid-bg flex items-center justify-center ${!isEven ? "lg:order-1" : ""}`}>
                  <Icon size={64} className="text-[#1B6BFF]/15" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CTASection />
    </>
  );
}
