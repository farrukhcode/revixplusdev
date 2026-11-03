import { ogImage } from "@/lib/og";

export { contentType, size } from "@/lib/og";
export const alt = "RevixPlus services: AI, web, mobile, games, growth and cloud";

export default function Image() {
  return ogImage({
    eyebrow: "Services",
    title: "AI, web, mobile, games, growth and cloud",
    description: "Every discipline a business needs to build and grow, in one senior team.",
  });
}
