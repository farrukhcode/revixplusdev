import type { ElementType, ReactNode } from "react";
import { GooeyTextReveal } from "@/components/ui/gooey-text-reveal";
import { cn } from "@/lib/utils";

interface SplitHeadingProps {
  as?: ElementType;
  id?: string;
  children: ReactNode;
  className?: string;
  /** Classes for the reveal wrapper, e.g. sticky positioning that must sit on the grid item */
  wrapperClassName?: string;
  /** Reveal once on mount (page titles) instead of with the scroll */
  immediate?: boolean;
}

/**
 * Headings melt into view with the VengeanceUI gooey reveal as they scroll in, and
 * melt back out the same way as you scroll back up. Page titles reveal once on load in
 * pure CSS (.goo-load), so they paint in the first frame and stay the fast LCP.
 * Text stays real DOM text, so SEO and screen readers see the sentence.
 */
export function SplitHeading({
  as: Tag = "h2",
  id,
  children,
  className,
  wrapperClassName,
  immediate = false,
}: SplitHeadingProps) {
  if (immediate)
    return (
      <Tag id={id} className={cn(className, "goo-load", wrapperClassName)}>
        <span>{children}</span>
      </Tag>
    );
  return (
    <GooeyTextReveal
      // Scrubbed, like the VengeanceUI demo: the reveal follows the scroll position,
      // so scrolling back up melts the heading out exactly the way it came in.
      // The end is measured from the heading's top so headings in pinned chapters still finish.
      mode="scrub"
      duration={1.4}
      stagger={0.12}
      blurAmount={0.4}
      start="top 88%"
      end="top 55%"
      className={wrapperClassName}
    >
      <Tag id={id} className={className}>
        {children}
      </Tag>
    </GooeyTextReveal>
  );
}
