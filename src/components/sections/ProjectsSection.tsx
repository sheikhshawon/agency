import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { supabase } from "@/lib/supabase";
import type { ProjectRow } from "@/app/admin/projects/actions";
import ProjectCard from "@/components/common/ProjectCard";

async function getFeaturedProjects(): Promise<ProjectRow[]> {
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("order_index", { ascending: true })
    .limit(6);
  return data ?? [];
}

export default async function ProjectsSection() {
  const projects = await getFeaturedProjects();

  return (
    <section id="projects" className="py-24 lg:py-32 bg-[#070707]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <SectionHeading
            badge="Our Work"
            title="Featured Projects"
            highlight="Projects"
            description="Real solutions, real impact. See how we've helped businesses grow."
            align="left"
          />
          <Link
            href="/projects"
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white border border-[#252525] rounded-xl hover:border-[#1B6BFF]/40 hover:bg-[#1B6BFF]/5 transition-all"
          >
            View All Projects
            <ArrowRight size={14} />
          </Link>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-[#606060] py-16">No featured projects yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
