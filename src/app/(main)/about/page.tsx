import type { Metadata } from "next";
import Link from "next/link";
import {
  Target,
  Layers,
  Shield,
  RefreshCw,
  Code2,
  LayoutDashboard,
  TrendingUp,
  Palette,
  Sparkles,
  ArrowRight,
  Search,
  PenTool,
  Hammer,
  LineChart,
} from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import AnimatedCounter from "@/components/common/AnimatedCounter";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Enif IT Services Ltd. is a full-spectrum digital agency engineering the systems, automation, and brand presence that transform how ambitious businesses operate, compete, and scale.",
};

const ABOUT_STATS = [
  { value: "150", suffix: "+", label: "Projects Delivered" },
  { value: "40", suffix: "+", label: "Brands Empowered" },
  { value: "12", suffix: "+", label: "Industries Served" },
  { value: "98", suffix: "%", label: "Client Retention Rate" },
];

const DIFFERENTIATORS = [
  {
    icon: Target,
    title: "Outcome First, Always",
    desc: "Every engagement begins with a single question: what does success look like for your business? We do not measure our work by hours logged or deliverables shipped. We measure it by the results your business achieves.",
  },
  {
    icon: Layers,
    title: "Full-Spectrum Capability",
    desc: "From the first line of code to the final conversion, we cover every layer of your digital growth: development, automation, marketing, brand identity, and AI systems. One partner. Complete execution.",
  },
  {
    icon: Shield,
    title: "Senior Expertise at Every Level",
    desc: "Our team is built from specialists, not generalists. Development, AI, design, and growth strategy, each discipline is led by practitioners who have spent years at the top of their field. You never get junior work signed off by a senior.",
  },
  {
    icon: RefreshCw,
    title: "Built to Scale With You",
    desc: "We architect every solution with your next stage in mind. Whether your business is growing from 10 clients to 100, or from one market to five, the systems we build expand with your ambitions, not against them.",
  },
];

const SERVICES_OVERVIEW = [
  {
    icon: Code2,
    title: "Web & App Development",
    desc: "High-performance websites and web applications built on modern stacks, designed for speed, scale, and exceptional user experience.",
  },
  {
    icon: LayoutDashboard,
    title: "Business Management Solutions",
    desc: "Integrated CRM, ERP, and operations systems that give you complete visibility and control over every moving part of your business.",
  },
  {
    icon: TrendingUp,
    title: "Marketing & Business Growth",
    desc: "Data-led SEO, performance campaigns, and conversion systems that build compounding growth pipelines, not one-off traffic spikes.",
  },
  {
    icon: Palette,
    title: "Brand Identity & Creative Design",
    desc: "Brand systems that communicate authority from the first impression, from visual identity and guidelines to full campaign assets.",
  },
  {
    icon: Sparkles,
    title: "AI Solutions & Automation",
    desc: "Intelligent workflows, predictive tools, and AI-integrated systems that eliminate manual decisions and accelerate every part of your operation.",
  },
];

const PROCESS = [
  {
    icon: Search,
    label: "Discover",
    title: "We Learn Your Business First",
    desc: "Every engagement begins with deep discovery. We map your goals, constraints, competitive position, and growth targets before we propose a single solution. The more we understand your business, the more precisely we can build for it.",
  },
  {
    icon: PenTool,
    label: "Strategise",
    title: "We Design the Right Solution",
    desc: "Based on discovery, we propose a structured plan with clear milestones, defined deliverables, and measurable success criteria. You know exactly what is being built, why, and what it will produce before work begins.",
  },
  {
    icon: Hammer,
    label: "Build",
    title: "We Execute With Precision",
    desc: "Our specialists build with speed and accuracy. You have a dedicated point of contact throughout, clear progress updates, and full visibility at every stage. No surprises, no silent gaps.",
  },
  {
    icon: LineChart,
    label: "Grow",
    title: "We Optimise for the Long Term",
    desc: "Delivery is not the finish line. We monitor performance, identify optimisation opportunities, and ensure the systems we build continue to compound value as your business scales.",
  },
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
            badge="About Us"
            title="We Are the Technology Partner Built for Your Growth"
            highlight="Partner"
            description="Enif IT Services is a full-spectrum digital agency engineering the systems, automation, and brand presence that transform how ambitious businesses operate, compete, and scale."
            className="max-w-3xl mx-auto"
          />
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-[0.85fr_1.15fr] gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <span className="text-xs font-semibold text-[#1B6BFF] uppercase tracking-wider">Our Story</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-white leading-tight">
              Born from a Star.
              <br />
              Built for Business.
            </h2>
          </div>
          <div className="space-y-5 text-[#A0A0A0] leading-relaxed">
            <p>
              Enif is named after the brightest star in the constellation Pegasus, a fixed point of brilliance that has guided navigators for centuries. That name was not chosen by accident. It reflects exactly what we set out to be: a reliable, intelligent guide for businesses navigating the complexity of growth in a fast-moving digital world.
            </p>
            <p>
              We were founded on a single belief, that technology, when applied with genuine precision and deep business understanding, does not just improve operations. It transforms them. Every service we offer, every system we build, and every strategy we design is shaped by that belief.
            </p>
            <p>
              From our first project to our 150th, that conviction has never changed. What has changed is the scale at which we deliver it.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-[#070707]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-6">
          <div className="p-8 lg:p-10 rounded-3xl bg-[#0F0F0F] border border-[#1E1E1E]">
            <span className="text-xs font-semibold text-[#1B6BFF] uppercase tracking-wider">Our Mission</span>
            <h3 className="mt-3 text-2xl lg:text-3xl font-bold text-white leading-tight">
              Turning Intelligent Technology into Measurable Business Growth
            </h3>
            <p className="mt-5 text-[#A0A0A0] leading-relaxed">
              We exist to close the gap between where a business is and where it is capable of going. We do that by building technology solutions, automation systems, marketing engines, and brand identities that are precisely engineered for each client&apos;s goals, not adapted from a generic template.
            </p>
          </div>
          <div className="p-8 lg:p-10 rounded-3xl bg-[#0F0F0F] border border-[#1E1E1E]">
            <span className="text-xs font-semibold text-[#1B6BFF] uppercase tracking-wider">Our Vision</span>
            <h3 className="mt-3 text-2xl lg:text-3xl font-bold text-white leading-tight">
              A World Where Every Business Has Access to Intelligent Systems
            </h3>
            <p className="mt-5 text-[#A0A0A0] leading-relaxed">
              We believe the future belongs to businesses that move with intelligence, not just speed. Our vision is to be the partner that makes that future accessible, delivering the tools, strategy, and execution that allow businesses at every stage to compete at the highest level.
            </p>
          </div>
        </div>
      </section>

      {/* Stats / Proof bar */}
      <section className="py-16 border-y border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-10">
          {ABOUT_STATS.map((s, i) => (
            <AnimatedCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={i * 120} />
          ))}
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            badge="Why Enif"
            title="Not an Agency. A Growth Partner."
            highlight="Growth Partner."
            className="mb-16"
          />
          <div className="grid sm:grid-cols-2 gap-5">
            {DIFFERENTIATORS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-7 rounded-2xl bg-[#0F0F0F] border border-[#1E1E1E]">
                <div className="w-11 h-11 rounded-xl bg-[#1B6BFF]/10 border border-[#1B6BFF]/20 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-[#1B6BFF]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2.5">{title}</h3>
                <p className="text-sm text-[#808080] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-[#070707]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            badge="What We Do"
            title="Five Disciplines. One Direction: Growth."
            highlight="One Direction: Growth."
            description="Every service we offer is designed to work independently or as part of a connected growth system. The more integrated your stack, the faster your business moves."
            className="mb-16"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES_OVERVIEW.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-7 rounded-2xl bg-[#0F0F0F] border border-[#1E1E1E] hover:border-[#1B6BFF]/30 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#1B6BFF]/10 border border-[#1B6BFF]/20 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-[#1B6BFF]" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2.5">{title}</h3>
                <p className="text-sm text-[#808080] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            badge="How We Work"
            title="Precision at Every Stage. No Guesswork. No Noise."
            highlight="No Guesswork. No Noise."
            className="mb-16"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS.map(({ icon: Icon, label, title, desc }, i) => (
              <div key={label} className="relative p-7 rounded-2xl bg-[#0F0F0F] border border-[#1E1E1E]">
                <span className="absolute top-6 right-7 text-5xl font-bold text-[#1B6BFF]/10 tabular-nums leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-11 h-11 rounded-xl bg-[#1B6BFF]/10 border border-[#1B6BFF]/20 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-[#1B6BFF]" />
                </div>
                <span className="text-xs font-semibold text-[#1B6BFF] uppercase tracking-wider">{label}</span>
                <h3 className="mt-2 text-base font-semibold text-white mb-2.5">{title}</h3>
                <p className="text-sm text-[#808080] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-[#070707]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative rounded-3xl bg-[#0F0F0F] border border-[#1E1E1E] grid-bg overflow-hidden px-8 py-16 lg:px-16 lg:py-20 text-center flex flex-col items-center">
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[500px] h-[500px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(27,107,255,0.10) 0%, transparent 70%)" }}
            />
            <SectionHeading
              badge="The Team"
              title="The People Behind Every Solution"
              highlight="Every Solution"
              description="Enif is built from specialists who bring deep expertise to every project. Developers, strategists, designers, automation engineers, and AI practitioners, working as one integrated team with a shared focus on your outcomes."
              className="relative z-10 max-w-2xl mx-auto"
            />
            <Link
              href="/contact"
              className="group relative z-10 mt-8 inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#1B6BFF] hover:bg-[#3a7bff] text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-[0_0_28px_rgba(27,107,255,0.35)] hover:shadow-[0_0_48px_rgba(27,107,255,0.55)]"
            >
              Work With Our Team
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
          <SectionHeading
            title="Ready to Build Something Extraordinary Together?"
            highlight="Extraordinary"
            description="Whether you are launching your first digital product or scaling an established business, we are ready for that conversation. Let us map what your next stage looks like."
            className="max-w-3xl mx-auto"
          />
          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1B6BFF] hover:bg-[#3a7bff] text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-[0_0_28px_rgba(27,107,255,0.35)] hover:shadow-[0_0_48px_rgba(27,107,255,0.55)]"
          >
            Join With Us
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
