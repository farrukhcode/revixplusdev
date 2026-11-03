import { caseStudies, getCaseStudy } from "@/content/work";
import { ogImage } from "@/lib/og";

export { contentType, size } from "@/lib/og";
export const alt = "RevixPlus case study";

export function generateStaticParams() {
  return caseStudies.map((w) => ({ slug: w.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const w = getCaseStudy((await params).slug);
  if (!w) return new Response("Not found", { status: 404 });
  return ogImage({ eyebrow: `Case study · ${w.industry}`, title: w.title, description: w.summary });
}
