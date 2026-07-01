import type { MetadataRoute } from "next";
import { getPublishedBlogs } from "@/app/admin/blog/actions";
import { getCaseStudies } from "@/app/admin/case-studies/actions";
import { getProjects } from "@/app/admin/projects/actions";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://enifit.com";

// Rebuild the sitemap at most once per hour.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/services",
    "/projects",
    "/case-studies",
    "/blog",
    "/contact",
    "/privacy",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  // Pull dynamic content; never let a data hiccup break the sitemap.
  const [blogs, caseStudies, projects] = await Promise.all([
    getPublishedBlogs().catch(() => []),
    getCaseStudies().catch(() => []),
    getProjects().catch(() => []),
  ]);

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${SITE_URL}/blog/${b.slug}`,
    lastModified: new Date(b.published_at ?? b.created_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${SITE_URL}/case-studies/${c.slug}`,
    lastModified: new Date(c.created_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.id}`,
    lastModified: new Date(p.created_at),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes, ...caseStudyRoutes, ...projectRoutes];
}
