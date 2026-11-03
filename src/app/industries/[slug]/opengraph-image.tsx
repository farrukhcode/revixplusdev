import { industries } from "@/content/industries";
import { ogImage } from "@/lib/og";

export { contentType, size } from "@/lib/og";
export const alt = "RevixPlus industry";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = industries.find((i) => i.slug === slug);
  if (!ind) return new Response("Not found", { status: 404 });
  return ogImage({
    eyebrow: `Industry · ${ind.title}`,
    title: ind.headline,
    description: ind.metaDescription,
  });
}
