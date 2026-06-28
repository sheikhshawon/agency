"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { ProjectRow } from "@/app/admin/projects/actions";
// ExternalLink is used in the thumbnail placeholder

const ALL = "All";

export default function ProjectsFilter({ projects }: { projects: ProjectRow[] }) {
  const categories = [ALL, ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean) as string[]))];
  const [active, setActive] = useState(ALL);

  const filtered = active === ALL ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-12 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              active === cat
                ? "bg-[#1B6BFF] text-white border-[#1B6BFF]"
                : "text-[#606060] border-[#252525] hover:text-white hover:border-[#353535]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-24 text-[#606060]">No projects found.</div>
      )}

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="group flex flex-col bg-[#0F0F0F] border border-[#1E1E1E] rounded-2xl overflow-hidden hover:border-[#1B6BFF]/30 transition-all duration-300"
          >
            {/* Thumbnail or placeholder */}
            <div className="aspect-[16/9] bg-[#111111] relative overflow-hidden">
              {project.thumbnail_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.thumbnail_url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <div className="absolute inset-0 grid-bg opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ExternalLink size={32} className="text-[#1B6BFF]/30 group-hover:text-[#1B6BFF]/60 transition-colors" />
                  </div>
                </>
              )}
              {project.category && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#1B6BFF]/15 text-[#1B6BFF] text-[10px] font-semibold">
                  {project.category}
                </div>
              )}
              {project.year && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#0A0A0A]/80 text-[#606060] text-[10px]">
                  {project.year}
                </div>
              )}
            </div>

            <div className="p-5 flex flex-col gap-3 flex-1">
              <h3 className="font-semibold text-white group-hover:text-[#1B6BFF] transition-colors">
                {project.title}
              </h3>
              {project.description && (
                <p className="text-sm text-[#606060] leading-relaxed line-clamp-2">{project.description}</p>
              )}
              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-[#1A1A1A] border border-[#252525] text-[10px] text-[#808080]">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
