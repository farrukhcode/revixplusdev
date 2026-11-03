"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger, useGSAP } from "./gsap";
import { useLenis } from "./SmoothScroll";

interface HorizontalChapterProps {
  id: string;
  label: string;
  /** Sticky heading column rendered to the left of the track on desktop */
  aside?: ReactNode;
  /** Panels. Each should be a full-height block with its own width. */
  children: ReactNode;
  className?: string;
  /** Tour speed inside this chapter (px/s). Horizontal chapters read slower. */
  tourSpeed?: number;
}

/**
 * Vertical scroll drives horizontal travel. The section is pinned and the track
 * translates by the overflow width. On touch devices (gsap.matchMedia) the same
 * markup becomes a native scroll-snap swiper, so nothing fights the browser.
 */
export function HorizontalChapter({
  id,
  label,
  aside,
  children,
  className,
  tourSpeed = 45,
}: HorizontalChapterProps) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const lenis = useLenis();

  // Snap: once scrolling settles inside the pin, glide to the nearest card.
  // Only while pinned, so it never tugs the page outside the chapter.
  useEffect(() => {
    if (!lenis) return;
    let timer = 0;
    const snap = () => {
      const st = trigger.current;
      const tr = track.current;
      if (!st?.isActive || !tr) return;
      const panels = tr.querySelectorAll<HTMLElement>("[data-panel]");
      const first = panels[0]?.offsetLeft ?? 0;
      const span = st.end - st.start; // 1px of scroll = 1px of travel
      let target = st.start;
      let best = Number.POSITIVE_INFINITY;
      for (const p of panels) {
        const y = st.start + Math.min(span, p.offsetLeft - first);
        const d = Math.abs(y - lenis.animatedScroll);
        if (d < best) {
          best = d;
          target = y;
        }
      }
      if (best > 2) lenis.scrollTo(target, { duration: 0.7, easing: (x) => 1 - (1 - x) ** 4 });
    };
    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(snap, 160);
    };
    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, [lenis]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(hover: hover) and (pointer: fine) and (min-width: 1024px)", () => {
        const sec = section.current;
        const tr = track.current;
        if (!sec || !tr) return;

        // The track scrolls inside its own clipping viewport (beside the heading),
        // so travel is exactly the part of the track that doesn't fit in it.
        const getDistance = () =>
          Math.max(0, tr.scrollWidth - (tr.parentElement?.clientWidth ?? sec.clientWidth));

        const tween = gsap.to(tr, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            // Lenis already smooths the scroll; a second lag here made travel feel sluggish
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
        trigger.current = tween.scrollTrigger ?? null;

        // Panels drift in at slightly different depths for parallax
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", tr);
        for (const p of panels) {
          const inner = p.querySelector<HTMLElement>("[data-panel-inner]");
          if (!inner) continue;
          gsap.fromTo(
            inner,
            { xPercent: 6, opacity: 0.4 },
            {
              xPercent: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: p,
                containerAnimation: tween,
                // Fully settled by 70%, so the last cards (which stop near 60%) end crisp
                start: "left right",
                end: "left 70%",
                scrub: true,
              },
            },
          );
          // Leaving on the left: a card stays fully opaque until it reaches the clip
          // edge, then fades only while it slides out past it.
          const edge = () => tr.parentElement?.getBoundingClientRect().left ?? 0;
          gsap.fromTo(
            p,
            { autoAlpha: 1 },
            {
              autoAlpha: 0,
              ease: "none",
              scrollTrigger: {
                trigger: p,
                containerAnimation: tween,
                start: () => `left ${edge()}px`,
                end: () => `right ${edge()}px`,
                scrub: true,
              },
            },
          );
        }

        return () => {
          trigger.current = null;
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      id={id}
      data-chapter={id}
      data-chapter-label={label}
      data-tour-speed={tourSpeed}
      className={cn("relative overflow-hidden lg:h-svh", className)}
    >
      <div className="flex h-full flex-col gap-6 py-16 lg:flex-row lg:items-stretch lg:py-0">
        {aside ? (
          <div className="container-x shrink-0 lg:flex lg:w-[38vw] lg:max-w-[520px] lg:flex-col lg:justify-center lg:pr-0">
            {aside}
          </div>
        ) : null}
        <div className="relative lg:h-full lg:min-w-0 lg:flex-1">
          {/* Clipping viewport: keeps cards off the heading; they fade as they slide out past its edge */}
          <div className="lg:h-full lg:overflow-hidden lg:[mask-image:linear-gradient(to_right,transparent,black_2.5rem)]">
            <div
              ref={track}
              className={cn(
                "no-scrollbar flex gap-5 px-[var(--gutter)] lg:h-full lg:items-center lg:gap-6 lg:pl-24 lg:pr-[var(--gutter)]",
                "overflow-x-auto snap-x snap-mandatory lg:overflow-visible lg:snap-none",
                "will-change-transform",
              )}
              data-lenis-prevent-horizontal
            >
              {children}
            </div>
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-x-[var(--gutter)] bottom-6 hidden h-px bg-border lg:block"
        aria-hidden="true"
      >
        <div
          ref={progress}
          className="h-full origin-left bg-[linear-gradient(90deg,var(--cyan),var(--violet))]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      <p className="t-small container-x mt-4 text-fg-3 lg:hidden">Swipe to explore</p>
    </section>
  );
}

/** One panel inside a HorizontalChapter. */
export function Panel({
  children,
  className,
  width = "min(82vw, 520px)",
}: {
  children: ReactNode;
  className?: string;
  width?: string;
}) {
  return (
    <div data-panel className={cn("shrink-0 snap-center lg:snap-align-none", className)} style={{ width }}>
      <div data-panel-inner className="h-full">
        {children}
      </div>
    </div>
  );
}

export { ScrollTrigger };
