import { ogImage } from "@/lib/og";

export { contentType, size } from "@/lib/og";
export const alt = "RevixPlus work: products, stores and platforms we built";

export default function Image() {
  return ogImage({
    eyebrow: "Work",
    title: "Products, stores and platforms we built",
    description:
      "AI document intelligence, a multi-platform payment gateway, HIPAA-compliant automation and e-commerce that sells.",
  });
}
