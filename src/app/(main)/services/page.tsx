import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { SERVICE_DETAILS } from "@/constants/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Five disciplines. One direction: growth. From your first digital product to a fully automated business operation, we build the systems that move ambitious companies forward.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Services grid */}
      <section className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            badge="What We Do"
            title="Every Solution Your Business Needs to Scale"
            highlight="Scale"
            description="Choose a service to explore what we build, how we work, and what outcomes you can expect."
            className="mb-16"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICE_DETAILS.map(({ slug, number, icon: Icon, title, short }) => (
              <Link
                key={slug}
                href={`/services/${slug}`}
                className="group relative flex flex-col p-7 rounded-2xl bg-[#0F0F0F] border border-[#1E1E1E] hover:border-[#1B6BFF]/40 transition-colors"
              >
                <span className="absolute top-6 right-7 text-5xl font-bold text-[#1B6BFF]/10 tabular-nums leading-none">
                  {number}
                </span>
                <div className="w-11 h-11 rounded-xl bg-[#1B6BFF]/10 border border-[#1B6BFF]/20 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-[#1B6BFF]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2.5">{title}</h3>
                <p className="text-sm text-[#808080] leading-relaxed mb-6">{short}</p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#1B6BFF]">
                  Explore Service
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
          <SectionHeading
            title="Not Sure Which Service You Need?"
            highlight="You Need?"
            description="Tell us where your business is and where you want it to go. We will identify the highest-impact starting point and build from there."
            className="max-w-3xl mx-auto"
          />
          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1B6BFF] hover:bg-[#3a7bff] text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-[0_0_28px_rgba(27,107,255,0.35)] hover:shadow-[0_0_48px_rgba(27,107,255,0.55)]"
          >
            Talk to Our Team
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-4 text-sm text-[#606060]">
            No commitment required. First conversation is on us.
          </p>
        </div>
      </section>
    </>
  );
}
