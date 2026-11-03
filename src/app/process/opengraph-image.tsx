import { ogImage } from "@/lib/og";

export { contentType, size } from "@/lib/og";
export const alt = "The RevixPlus process: discover, design, build, launch, grow";

export default function Image() {
  return ogImage({
    eyebrow: "Process",
    title: "Discover, design, build, launch, grow",
    description:
      "A fixed-price discovery week, weekly demos, a launch checklist and a growth plan from day one.",
  });
}
