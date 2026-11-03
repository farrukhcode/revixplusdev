"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCallback } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Surface } from "@/components/ui/Surface";
import { home } from "@/content/home";
import { testimonials } from "@/content/testimonials";

// Only client-approved words are published; until the first approval the section stays hidden.
const approved = testimonials.filter((t) => t.status === "approved");

/** Testimonial carousel: drag or use the arrows; it snaps to each card. */
export function Voices() {
  const [ref, api] = useEmblaCarousel({
    align: "start",
    dragFree: false,
    loop: false,
    containScroll: "trimSnaps",
    duration: 22,
  });
  const prev = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);
  if (!approved.length) return null;

  return (
    <section
      id="voices"
      data-chapter="voices"
      data-chapter-label="Voices"
      data-tour-speed="80"
      className="relative py-20 lg:py-28"
    >
      <div className="container-x flex items-end justify-between gap-6">
        <SectionHeading eyebrow={home.voices.eyebrow} headline={home.voices.headline} />
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonials"
            className="glass grid size-11 place-items-center [border-radius:var(--r-pill)] text-fg-2 transition-transform active:scale-95"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonials"
            className="glass grid size-11 place-items-center [border-radius:var(--r-pill)] text-fg-2 transition-transform active:scale-95"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
      <div ref={ref} className="mt-10 overflow-hidden px-[var(--gutter)]" data-lenis-prevent-horizontal>
        <div className="flex gap-5">
          {approved.map((t) => (
            <div key={`${t.company}-${t.author}`} className="w-[min(86vw,420px)] shrink-0">
              <Surface specular className="flex h-full flex-col p-7">
                <Quote className="size-6 text-cyan" aria-hidden="true" />
                <p className="t-body mt-4 text-fg">{t.quote}</p>
                <div className="mt-auto pt-6">
                  <p className="t-small font-medium">{t.author}</p>
                  <p className="t-small text-fg-3">
                    {t.role}, {t.company}
                  </p>
                </div>
              </Surface>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
