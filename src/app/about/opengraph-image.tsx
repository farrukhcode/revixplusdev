import { ogImage } from "@/lib/og";

export { contentType, size } from "@/lib/og";
export const alt = "About RevixPlus";

export default function Image() {
  return ogImage({
    eyebrow: "About",
    title: "Software, AI and growth from one team",
    description: "Founded in Lahore by an engineer with a decade inside European and US product teams.",
  });
}
