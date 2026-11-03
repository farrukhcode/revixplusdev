import { ogImage } from "@/lib/og";

export { contentType, size } from "@/lib/og";
export const alt = "RevixPlus pricing: fixed-price packages and monthly retainers";

export default function Image() {
  return ogImage({
    eyebrow: "Pricing",
    title: "Fixed-price packages and monthly retainers",
    description:
      "Transparent starting prices for websites, stores, apps, AI and games, plus growth and care retainers.",
  });
}
