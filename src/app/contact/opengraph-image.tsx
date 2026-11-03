import { ogImage } from "@/lib/og";

export { contentType, size } from "@/lib/og";
export const alt = "Contact RevixPlus";

export default function Image() {
  return ogImage({
    eyebrow: "Contact",
    title: "Start a project or book a call",
    description:
      "Tell us what you are building or what is slowing you down. We reply within one business day.",
  });
}
