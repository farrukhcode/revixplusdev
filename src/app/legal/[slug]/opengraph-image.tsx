import { legal } from "@/content/legal";
import { ogImage } from "@/lib/og";

export { contentType, size } from "@/lib/og";
export const alt = "RevixPlus legal";

export function generateStaticParams() {
  return Object.keys(legal).map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const doc = legal[(await params).slug as keyof typeof legal];
  if (!doc) return new Response("Not found", { status: 404 });
  return ogImage({ eyebrow: "Legal", title: doc.title, description: `Last updated ${doc.updated}.` });
}
