import { type NextRequest, NextResponse } from "next/server";
import { industries } from "@/content/industries";
import { legal } from "@/content/legal";
import { services } from "@/content/services";
import { caseStudies } from "@/content/work";

// With cacheComponents an unknown slug would stream the page shell with a 200 before
// notFound() runs (a soft 404). Checking the slug here, before rendering, returns a real 404.
const slugs: Record<string, Set<string>> = {
  services: new Set(services.map((s) => s.slug)),
  work: new Set(caseStudies.map((w) => w.slug)),
  industries: new Set(industries.map((i) => i.slug)),
  legal: new Set(Object.keys(legal)),
};

export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.split("/");
  // Any path no route matches renders app/not-found with a 404 status
  if (!slugs[section]?.has(slug)) return NextResponse.rewrite(new URL("/_unknown", request.url));
}

export const config = { matcher: "/(services|work|industries|legal)/:slug" };
