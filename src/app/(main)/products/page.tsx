import type { Metadata } from "next";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/common/SectionHeading";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Products",
  description: "Discover Enif IT's ready-made software products and SaaS tools built for modern businesses.",
};

const PRODUCTS = [
  {
    id: "enif-crm",
    name: "Enif CRM",
    tagline: "Intelligent Customer Relationship Management",
    description: "A modern CRM built for the way teams actually work, with AI lead scoring, automated follow-ups, and real-time pipeline visibility.",
    status: "Available",
    icon: Sparkles,
    features: ["AI Lead Scoring", "Pipeline Automation", "Team Collaboration", "Analytics Dashboard"],
    href: "/products/enif-crm",
  },
  {
    id: "enif-flow",
    name: "Enif Flow",
    tagline: "Business Process Automation Platform",
    description: "No-code workflow automation that connects your apps, automates repetitive tasks, and eliminates the bottlenecks slowing your team down.",
    status: "Available",
    icon: Zap,
    features: ["No-Code Builder", "App Integrations", "Trigger Automation", "Audit Logs"],
    href: "/products/enif-flow",
  },
  {
    id: "enif-vault",
    name: "Enif Vault",
    tagline: "Secure Document & Asset Management",
    description: "Enterprise-grade document management with role-based access, e-signatures, version control, and team collaboration built-in.",
    status: "Coming Soon",
    icon: Shield,
    features: ["Role-Based Access", "E-Signatures", "Version Control", "Team Collaboration"],
    href: "/products/enif-vault",
  },
];

export default function ProductsPage() {
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
            badge="Our Products"
            title="Tech Solutions for Modern"
            highlight="Solutions"
            description="Ready-to-deploy software products built on the same high standards as our custom projects, now available as standalone tools."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-6">
          {PRODUCTS.map((product, i) => {
            const Icon = product.icon;
            const isEven = i % 2 === 0;
            return (
              <div
                key={product.id}
                id={product.id}
                className={`grid lg:grid-cols-2 gap-10 items-center p-8 lg:p-12 rounded-3xl bg-[#0F0F0F] border border-[#1E1E1E]`}
              >
                <div className={!isEven ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#1B6BFF]/10 border border-[#1B6BFF]/20 flex items-center justify-center">
                      <Icon size={20} className="text-[#1B6BFF]" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      product.status === "Available"
                        ? "bg-green-400/10 text-green-400 border border-green-400/20"
                        : "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                    }`}>
                      {product.status}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-1">{product.name}</h2>
                  <p className="text-[#1B6BFF] text-sm font-medium mb-4">{product.tagline}</p>
                  <p className="text-[#A0A0A0] leading-relaxed mb-6">{product.description}</p>
                  <ul className="grid grid-cols-2 gap-3 mb-8">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[#808080]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1B6BFF] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={product.href}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[#1B6BFF] text-white rounded-xl hover:bg-[#4A8FFF] transition-colors"
                  >
                    {product.status === "Available" ? "Get Started" : "Join Waitlist"} <ArrowRight size={14} />
                  </Link>
                </div>
                <div className={`aspect-[4/3] rounded-2xl bg-[#0A0A0A] border border-[#1A1A1A] grid-bg flex items-center justify-center ${!isEven ? "lg:order-1" : ""}`}>
                  <Icon size={80} className="text-[#1B6BFF]/10" />
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
