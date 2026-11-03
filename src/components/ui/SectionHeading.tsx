import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  headline: string;
  body?: ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
  size?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  headline,
  body,
  as = "h2",
  align = "left",
  className,
  size,
}: SectionHeadingProps) {
  const sizeClass = size ? `t-${size}` : as === "h1" ? "t-h1" : as === "h3" ? "t-h3" : "t-h2";
  return (
    <div className={cn("max-w-[32ch]", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <Reveal as="p" className="t-eyebrow mb-4">
          {eyebrow}
        </Reveal>
      ) : null}
      <SplitHeading as={as} className={sizeClass}>
        {headline}
      </SplitHeading>
      {body ? (
        <Reveal as="div" className="t-lead mt-5 max-w-[52ch]" delay={120}>
          {body}
        </Reveal>
      ) : null}
    </div>
  );
}
