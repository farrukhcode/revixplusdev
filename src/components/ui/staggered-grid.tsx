"use client";

import { type ReactNode, useRef, useState } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { cn } from "@/lib/utils";

// VengeanceUI Staggered Grid (@vengeanceui/staggered-grid), adapted: renders
// React nodes (case study posters) instead of photos, so no imagesloaded and no
// react-icons; GSAP from the shared module with scrub: true for Lenis; columns
// are read from the layout so the stagger works at any breakpoint; theme tokens
// instead of zinc/neutral; the credits footer is gone. Reduced motion skips it.
export interface BentoItem {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  content: ReactNode;
}

export interface StaggeredGridProps {
  /** Grid tiles, in order. The bento group sits in the middle row. */
  items: ReactNode[];
  bentoItems: BentoItem[];
  centerText?: string;
  className?: string;
}

export function StaggeredGrid({ items, bentoItems, centerText, className }: StaggeredGridProps) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(q("[data-char]"), {
          yPercent: 110,
          autoAlpha: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: { each: 0.05, from: "center" },
          scrollTrigger: { trigger: q("[data-center-text]")[0], start: "top 90%", once: true },
        });
      });

      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
        const grid = q("[data-grid]")[0] as HTMLElement;
        const tiles = q("[data-tile]") as HTMLElement[];
        // Group tiles by their rendered column, then stagger out from the center.
        const lefts = [...new Set(tiles.map((t) => t.offsetLeft))].sort((a, b) => a - b);
        const mid = (lefts.length - 1) / 2;
        const rise = { yPercent: 160, autoAlpha: 0, ease: "sine.out" };
        const tl = gsap.timeline({
          scrollTrigger: { trigger: grid, start: "top bottom", end: "center center", scrub: true },
        });
        lefts.forEach((left, col) => {
          tl.from(
            tiles.filter((t) => t.offsetLeft === left),
            rise,
            Math.abs(col - mid) * 0.2,
          );
        });
        tl.from(q("[data-bento]"), { ...rise, yPercent: 80 }, 0.1);
      });

      mm.add("(prefers-reduced-motion: no-preference) and (max-width: 1023px)", () => {
        for (const el of q("[data-tile], [data-bento]") as HTMLElement[]) {
          gsap.from(el, {
            y: 40,
            autoAlpha: 0,
            duration: 0.8,
            ease: "expo.out",
            delay: el.offsetLeft > el.offsetWidth ? 0.08 : 0,
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        }
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  // ponytail: balanced for 14 tiles (6 + 1, bento, 1 + 6 on six columns); other counts still flow, unevenly.
  const half = Math.ceil(items.length / 2);
  const tile = (node: ReactNode, i: number) => (
    <div key={i} data-tile className="relative z-10">
      {node}
    </div>
  );

  return (
    <div ref={root} className={cn("relative w-full overflow-x-clip", className)}>
      {centerText ? (
        <div
          data-center-text
          aria-hidden
          className="flex justify-center overflow-hidden py-[0.06em] font-semibold text-[clamp(3rem,14vw,10rem)] uppercase leading-[0.85] tracking-[-0.04em] text-fg"
        >
          {centerText.split("").map((char, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static characters
            <span key={i} data-char className="inline-block">
              {char === " " ? " " : char}
            </span>
          ))}
        </div>
      ) : null}

      <div
        data-grid
        className="container-x mt-[6vh] grid grid-flow-row-dense grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6"
      >
        {items.slice(0, half).map(tile)}
        {bentoItems.length ? (
          <div
            data-bento
            className="relative z-20 col-span-2 flex min-h-[30rem] flex-col gap-2 lg:col-span-4 lg:min-h-0 lg:flex-row"
          >
            {bentoItems.map((b, i) => {
              const on = active === i;
              return (
                <button
                  key={b.id}
                  type="button"
                  aria-expanded={on}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  style={{ flexGrow: on ? 3 : 1 }}
                  className={cn(
                    "relative basis-0 overflow-hidden rounded-[var(--r-lg)] border text-left transition-[flex-grow,background-color,border-color] duration-300 ease-[var(--ease-out)]",
                    on ? "border-border-strong bg-card" : "border-border bg-muted hover:bg-card",
                  )}
                >
                  <span
                    className={cn(
                      "absolute inset-0 flex items-center justify-center gap-3 text-fg-3 transition-opacity duration-300 lg:flex-col",
                      on && "opacity-0",
                    )}
                  >
                    {b.icon}
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] lg:[writing-mode:vertical-rl]">
                      {b.title}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "absolute inset-0 flex flex-col p-5 transition-opacity duration-300 lg:min-w-72",
                      on ? "opacity-100 delay-100" : "opacity-0",
                    )}
                  >
                    <span className="flex items-center gap-2 text-violet">
                      {b.icon}
                      <span className="t-eyebrow">{b.title}</span>
                    </span>
                    <span className="t-small mt-2 text-fg-2">{b.description}</span>
                    <span className="mt-auto flex flex-wrap gap-1.5">{b.content}</span>
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}
        {items.slice(half).map((node, i) => tile(node, half + i))}
      </div>
    </div>
  );
}

export default StaggeredGrid;
