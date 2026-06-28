"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { ProjectRow } from "@/app/admin/projects/actions";

export default function ProjectCard({ project, index }: { project: ProjectRow; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link href={`/projects/${project.id}`} className="block">
        {/* Thumbnail */}
        <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-[#111111] border border-[#1E1E1E] mb-4 relative">
          {project.thumbnail_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.thumbnail_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <div
                className="absolute inset-0 grid-bg"
                style={{
                  background: `linear-gradient(135deg, rgba(27,107,255,0.${(index + 1) * 3}) 0%, rgba(27,107,255,0.02) 100%)`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-[#1B6BFF]/10 border border-[#1B6BFF]/20 flex items-center justify-center">
                  <ExternalLink size={24} className="text-[#1B6BFF]" />
                </div>
              </div>
            </>
          )}
          <div className="absolute inset-0 bg-[#1B6BFF]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          {project.year && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#0A0A0A]/80 backdrop-blur-sm border border-[#252525] text-[10px] text-[#A0A0A0] font-medium">
              {project.year}
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-2">
          {project.category && (
            <span className="text-xs text-[#1B6BFF] font-semibold uppercase tracking-wider">
              {project.category}
            </span>
          )}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold text-white group-hover:text-[#1B6BFF] transition-colors leading-snug">
              {project.title}
            </h3>
            {project.live_url && (
              <Link
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-[#404040] hover:text-[#1B6BFF] transition-colors mt-0.5"
              >
                <ExternalLink size={14} />
              </Link>
            )}
          </div>
          {project.description && (
            <p className="text-sm text-[#606060] leading-relaxed line-clamp-2">
              {project.description}
            </p>
          )}
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full bg-[#1A1A1A] border border-[#252525] text-[10px] text-[#808080] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
