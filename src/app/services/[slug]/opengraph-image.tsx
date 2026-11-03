import { getService, services } from "@/content/services";
import { ogImage } from "@/lib/og";

export { contentType, size } from "@/lib/og";
export const alt = "RevixPlus service";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s) return new Response("Not found", { status: 404 });
  return ogImage({ eyebrow: `Service · ${s.eyebrow}`, title: s.title, description: s.metaDescription });
}
