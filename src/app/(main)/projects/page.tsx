import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/common/SectionHeading";
import CTASection from "@/components/sections/CTASection";
import { getProjects } from "@/app/admin/projects/actions";
import ProjectsFilter from "@/components/sections/ProjectsFilter";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore Enif IT's portfolio of web apps, business systems, AI solutions, and brand identities.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

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
            badge="Our Portfolio"
            title="Work We're Proud Of"
            highlight="Proud"
            description="From startups to enterprises, each project is a story of challenges solved and goals exceeded."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ProjectsFilter projects={projects} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
