import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, GitFork, Star, Calendar, Tag } from "lucide-react";
import { getProjectById, getRelatedProjects } from "@/app/admin/projects/actions";
import ProjectCard from "@/components/common/ProjectCard";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  props: PageProps<"/projects/[id]">
): Promise<Metadata> {
  const { id } = await props.params;
  const project = await getProjectById(id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description ?? undefined,
  };
}

export default async function ProjectDetailPage(props: PageProps<"/projects/[id]">) {
  const { id } = await props.params;
  const [project, related] = await Promise.all([
    getProjectById(id),
    getProjectById(id).then((p) => getRelatedProjects(p?.category ?? null, id)),
  ]);

  if (!project) notFound();

  return (
    <>
      {/* Back */}
      <div className="pt-28 pb-8 max-w-5xl mx-auto px-6 lg:px-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[#606060] hover:text-white transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Projects
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8 pb-12">
        <div className="rounded-3xl overflow-hidden border border-[#1E1E1E] bg-[#0A0A0A] aspect-[16/7] relative">
          {project.thumbnail_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.thumbnail_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(27,107,255,0.12) 0%, transparent 70%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-3xl bg-[#1B6BFF]/10 border border-[#1B6BFF]/20 flex items-center justify-center">
                  <ExternalLink size={32} className="text-[#1B6BFF]" />
                </div>
              </div>
            </>
          )}

          {/* Overlay badges */}
          {project.featured && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5A623]/15 border border-[#F5A623]/25 text-[#F5A623] text-xs font-semibold backdrop-blur-sm">
              <Star size={11} className="fill-[#F5A623]" />
              Featured
            </div>
          )}
          {project.year && (
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A0A0A]/70 border border-[#252525] text-[#A0A0A0] text-xs backdrop-blur-sm">
              <Calendar size={11} />
              {project.year}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-[1fr_280px] gap-12">

          {/* Left — main info */}
          <div className="flex flex-col gap-8">
            {/* Title & Category */}
            <div>
              {project.category && (
                <span className="text-xs font-semibold text-[#1B6BFF] uppercase tracking-widest">
                  {project.category}
                </span>
              )}
              <h1 className="mt-2 text-3xl lg:text-4xl font-bold text-white leading-tight">
                {project.title}
              </h1>
            </div>

            {/* Description */}
            {project.description && (
              <div>
                <h2 className="text-xs font-semibold text-[#404040] uppercase tracking-widest mb-3">
                  About this project
                </h2>
                <p className="text-[#A0A0A0] leading-relaxed text-base">
                  {project.description}
                </p>
              </div>
            )}

            {/* Tags */}
            {project.tags.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold text-[#404040] uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Tag size={11} />
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-xl bg-[#0F0F0F] border border-[#1E1E1E] text-sm text-[#A0A0A0] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — sidebar */}
          <div className="flex flex-col gap-4">

            {/* CTA buttons */}
            {project.live_url && (
              <Link
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#1B6BFF] hover:bg-[#1557CC] text-white text-sm font-semibold rounded-xl transition-colors"
              >
                <ExternalLink size={15} />
                Visit Live Site
              </Link>
            )}
            {project.github_url && (
              <Link
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-transparent border border-[#252525] hover:border-[#353535] hover:bg-[#0F0F0F] text-[#A0A0A0] hover:text-white text-sm font-semibold rounded-xl transition-all"
              >
                <GitFork size={15} />
                View on GitHub
              </Link>
            )}

            {/* Meta card */}
            <div className="rounded-2xl border border-[#1A1A1A] bg-[#0A0A0A] p-5 flex flex-col gap-4 mt-2">
              {project.category && (
                <MetaRow label="Category" value={project.category} />
              )}
              {project.year && (
                <MetaRow label="Year" value={project.year} />
              )}
              <MetaRow label="Status" value={project.featured ? "Featured" : "Published"} />
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {related.length > 0 && (
        <section className="border-t border-[#111111] py-20 bg-[#070707]">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2 className="text-xl font-bold text-white mb-8">More in {project.category}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold text-[#404040] uppercase tracking-widest">{label}</span>
      <span className="text-sm text-[#A0A0A0]">{value}</span>
    </div>
  );
}
