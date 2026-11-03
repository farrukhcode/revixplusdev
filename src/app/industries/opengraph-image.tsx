import { ogImage } from "@/lib/og";

export { contentType, size } from "@/lib/og";
export const alt = "RevixPlus industries: healthcare, e-commerce, fintech, SaaS and more";

export default function Image() {
  return ogImage({
    eyebrow: "Industries",
    title: "Industry software, AI and growth",
    description: "Medical billing and healthcare, e-commerce, fintech, SaaS, education and more.",
  });
}
