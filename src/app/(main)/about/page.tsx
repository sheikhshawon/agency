import type { Metadata } from "next";
import { Users, Target, Award, Globe } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Enif IT Services Ltd. — our mission, team, and values that drive digital transformation.",
};

const VALUES = [
  {
    icon: Target,
    title: "Precision",
    desc: "We obsess over the details that separate good from exceptional.",
  },
  {
    icon: Users,
    title: "Partnership",
    desc: "Your growth is our mission. We work as an extension of your team.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "Every project is a chance to raise the bar and deliver beyond expectations.",
  },
  {
    icon: Globe,
    title: "Innovation",
    desc: "We stay ahead of the tech curve so you can stay ahead of competition.",
  },
];

const ABOUT_STATS = [
  { value: "5", suffix: "+", label: "Years of Excellence" },
  { value: "200", suffix: "+", label: "Projects Delivered" },
  { value: "50", suffix: "+", label: "Team Members" },
  { value: "30", suffix: "+", label: "Countries Served" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(27,107,255,0.08) 0%, transparent 70%)" }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            badge="Our Story"
            title="We Build Technology That"
            highlight="Transforms"
            description="Enif IT Services Ltd. was founded on a simple belief: technology should empower businesses, not overwhelm them. We bridge the gap between ambitious goals and the digital tools needed to achieve them."
            className="max-w-3xl mx-auto"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-10">
          {ABOUT_STATS.map((s, i) => (
            <AnimatedCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={i * 120} />
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-semibold text-[#1B6BFF] uppercase tracking-wider">Our Mission</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-white leading-tight">
              Empowering businesses through intelligent technology
            </h2>
            <p className="mt-5 text-[#A0A0A0] leading-relaxed">
              We believe every company — from startup to enterprise — deserves access to world-class technology. Our team combines deep technical expertise with business acumen to deliver solutions that actually move the needle.
            </p>
            <p className="mt-4 text-[#A0A0A0] leading-relaxed">
              Founded in Bangladesh with a global mindset, Enif IT has grown into a trusted partner for businesses across industries, delivering premium digital experiences that drive measurable growth.
            </p>
          </div>
          <div className="aspect-[4/3] rounded-3xl bg-[#0F0F0F] border border-[#1E1E1E] grid-bg flex items-center justify-center">
            <div
              className="w-40 h-40 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(27,107,255,0.25) 0%, transparent 70%)", boxShadow: "0 0 60px rgba(27,107,255,0.3)" }}
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#070707]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading badge="Core Values" title="What Drives Us" description="The principles that guide every decision, every line of code, every client relationship." className="mb-16" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl bg-[#0F0F0F] border border-[#1E1E1E]">
                <div className="w-11 h-11 rounded-xl bg-[#1B6BFF]/10 border border-[#1B6BFF]/20 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#1B6BFF]" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-[#606060] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
