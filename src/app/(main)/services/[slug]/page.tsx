import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Search,
  PenTool,
  Hammer,
  LineChart,
} from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import {
  SERVICE_DETAILS,
  getServiceBySlug,
  type ProcessStep,
} from "@/constants/services";

export function generateStaticParams() {
  return SERVICE_DETAILS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.heroSupporting ?? service.headline,
  };
}

const DEFAULT_PROCESS: ProcessStep[] = [
  {
    icon: Search,
    label: "Discover",
    title: "We Learn Your Business",
    desc: "Before we propose anything, we map your goals, constraints, current systems, and growth targets. The clearer our picture of your business, the more precisely we can engineer for it.",
  },
  {
    icon: PenTool,
    label: "Strategise",
    title: "We Design the Right Solution",
    desc: "We propose a structured plan with defined milestones, clear deliverables, and measurable success criteria. You know exactly what is being built and what it will produce before work begins.",
  },
  {
    icon: Hammer,
    label: "Build",
    title: "We Execute With Precision",
    desc: "Our specialists build with speed and accuracy. A dedicated contact keeps you informed at every stage. No silent gaps, no surprises.",
  },
  {
    icon: LineChart,
    label: "Grow",
    title: "We Optimise for the Long Term",
    desc: "Delivery is the beginning, not the end. We monitor performance and continue optimising to ensure every system compounds value as your business scales.",
  },
];

/** Renders a headline, accenting `highlight` (first occurrence) in brand blue. */
function HighlightedTitle({
  text,
  highlight,
  className,
}: {
  text: string;
  highlight?: string;
  className?: string;
}) {
  if (!highlight || !text.includes(highlight)) {
    return <span className={className}>{text}</span>;
  }
  const [before, ...rest] = text.split(highlight);
  const after = rest.join(highlight);
  return (
    <span className={className}>
      {before}
      <span className="text-[#1B6BFF]">{highlight}</span>
      {after}
    </span>
  );
}

export default async function ServiceDetailPage(
  props: PageProps<"/services/[slug]">
) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const {
    number,
    icon: Icon,
    title,
    headline,
    heroHighlight,
    heroSupporting,
    short,
    body,
    overviewLabel,
    overviewHeadline,
    overviewBody,
    includedHeadline,
    includedHighlight,
    included,
    techStack,
    process,
    processHeadline,
    processHighlight,
    bottomCta,
    cta,
  } = service;

  const overviewParas = overviewBody ?? body;
  const steps = process ?? DEFAULT_PROCESS;

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-28 pb-8 max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-sm text-[#606060]">
          <Link href="/services" className="hover:text-white transition-colors">
            Services
          </Link>
          <ChevronRight size={14} className="text-[#404040]" />
          <span className="text-[#A0A0A0]">{title}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="pb-16 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(27,107,255,0.08) 0%, transparent 70%)" }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#1B6BFF]/10 border border-[#1B6BFF]/20 flex items-center justify-center">
              <Icon size={26} className="text-[#1B6BFF]" />
            </div>
            <span className="text-6xl font-bold text-[#1B6BFF]/15 tabular-nums leading-none">{number}</span>
          </div>
          <span className="text-xs font-semibold text-[#1B6BFF] uppercase tracking-wider">{title}</span>
          <h1 className="mt-3 text-3xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] max-w-3xl">
            <HighlightedTitle text={headline} highlight={heroHighlight} />
          </h1>
          <p className="mt-6 text-[#A0A0A0] leading-relaxed text-base lg:text-lg max-w-3xl">
            {heroSupporting ?? short}
          </p>
          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-2 px-7 py-3 bg-[#1B6BFF] hover:bg-[#3a7bff] text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-[0_0_28px_rgba(27,107,255,0.35)] hover:shadow-[0_0_48px_rgba(27,107,255,0.55)]"
          >
            {cta}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-24 border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-[0.85fr_1.15fr] gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <span className="text-xs font-semibold text-[#1B6BFF] uppercase tracking-wider">
              {overviewLabel ?? "What We Do"}
            </span>
            {overviewHeadline && (
              <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-white leading-tight">
                {overviewHeadline}
              </h2>
            )}
          </div>
          <div className="space-y-5 text-[#A0A0A0] leading-relaxed">
            {overviewParas.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* What is Included */}
      <section className="py-24 bg-[#070707] border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            badge="Services Included"
            title={includedHeadline ?? "Everything We Build Under This Discipline"}
            highlight={includedHighlight ?? "Under This Discipline"}
            className="mb-16"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {included.map((item) => {
              const ItemIcon = item.icon;
              return (
                <div key={item.title} className="p-7 rounded-2xl bg-[#0F0F0F] border border-[#1E1E1E]">
                  {ItemIcon && (
                    <div className="w-11 h-11 rounded-xl bg-[#1B6BFF]/10 border border-[#1B6BFF]/20 flex items-center justify-center mb-5">
                      <ItemIcon size={20} className="text-[#1B6BFF]" />
                    </div>
                  )}
                  <h3 className="text-base font-semibold text-white mb-2.5">{item.title}</h3>
                  <p className="text-sm text-[#808080] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      {techStack && techStack.length > 0 && (
        <section className="py-24 border-t border-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <SectionHeading
              badge="Technology"
              title="Modern Stacks. Future-Ready Foundations."
              highlight="Future-Ready Foundations."
              description="We work with the technologies best suited to each project. No single-stack bias. No legacy choices. Just the right tools for the job."
              className="mb-12"
            />
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-xl bg-[#0F0F0F] border border-[#1E1E1E] text-sm text-[#A0A0A0] font-medium hover:border-[#1B6BFF]/30 hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      <section className="py-24 bg-[#070707] border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            badge="How It Works"
            title={processHeadline ?? "From Brief to Launch, With Precision at Every Step"}
            highlight={processHighlight ?? "With Precision at Every Step"}
            className="mb-16"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map(({ icon: StepIcon, label, title: stepTitle, desc }, i) => (
              <div key={label} className="relative p-7 rounded-2xl bg-[#0F0F0F] border border-[#1E1E1E]">
                <span className="absolute top-6 right-7 text-5xl font-bold text-[#1B6BFF]/10 tabular-nums leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-11 h-11 rounded-xl bg-[#1B6BFF]/10 border border-[#1B6BFF]/20 flex items-center justify-center mb-5">
                  <StepIcon size={20} className="text-[#1B6BFF]" />
                </div>
                <span className="text-xs font-semibold text-[#1B6BFF] uppercase tracking-wider">{label}</span>
                <h3 className="mt-2 text-base font-semibold text-white mb-2.5">{stepTitle}</h3>
                <p className="text-sm text-[#808080] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
          <SectionHeading
            title={bottomCta?.headline ?? "Ready to Get Started?"}
            highlight={bottomCta?.highlight ?? "Get Started?"}
            description={
              bottomCta?.supporting ??
              "Tell us where your business is and where you want it to go. We will identify the highest-impact starting point and build from there."
            }
            className="max-w-3xl mx-auto"
          />
          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1B6BFF] hover:bg-[#3a7bff] text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-[0_0_28px_rgba(27,107,255,0.35)] hover:shadow-[0_0_48px_rgba(27,107,255,0.55)]"
          >
            {cta}
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
