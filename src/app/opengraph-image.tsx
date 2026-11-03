import { site } from "@/content/site";
import { ogImage } from "@/lib/og";

export { contentType, size } from "@/lib/og";
export const alt = `${site.name}: ${site.tagline}`;

export default function Image() {
  return ogImage({
    eyebrow: "Software, AI and growth agency",
    title: site.tagline,
    description: site.description,
  });
}
