import type { MetadataRoute } from "next";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { caseStudies } from "@/content/work";
import { absoluteUrl } from "@/lib/seo";

// Fixed per release so the prerender stays pure (no Date.now() during build).
const LAST_MODIFIED = process.env.BUILD_DATE ?? "2026-11-03";

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = [
    "/",
    "/services",
    "/industries",
    "/work",
    "/process",
    "/pricing",
    "/about",
    "/contact",
  ].map((p) => ({
    url: absoluteUrl(p),
    lastModified: LAST_MODIFIED,
    changeFrequency: (p === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: p === "/" ? 1 : 0.8,
  }));
  const svc = services.map((s) => ({
    url: absoluteUrl(`/services/${s.slug}`),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const work = caseStudies.map((w) => ({
    url: absoluteUrl(`/work/${w.slug}`),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const ind = industries.map((i) => ({
    url: absoluteUrl(`/industries/${i.slug}`),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...statics, ...svc, ...ind, ...work];
}
