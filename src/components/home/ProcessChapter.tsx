"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Surface } from "@/components/ui/Surface";
import { home } from "@/content/home";
import { processSteps } from "@/content/process";

/** Chapter 5: a vertical rail fills as you scroll past each step. */
export function ProcessChapter() {
  const section = useRef<HTMLElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !fill.current) return;
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-rail]", start: "top 70%", end: "bottom 60%", scrub: true },
        },
      );
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      id="process"
      data-chapter="process"
      data-chapter-label="Process"
      data-tour-speed="70"
      className="relative py-24 lg:py-32"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow={home.process.eyebrow}
          headline={home.process.headline}
          body={home.process.body}
        />
        <ol data-rail className="relative mt-14 grid gap-5 pl-10 sm:pl-14">
          {/* Centered on the step circles: 24px circles on phones, 28px from sm */}
          <div
            className="absolute bottom-0 left-3 top-0 w-px -translate-x-1/2 bg-border sm:left-3.5"
            aria-hidden="true"
          >
            <div
              ref={fill}
              className="h-full w-full origin-top bg-[linear-gradient(180deg,var(--cyan),var(--violet))]"
            />
          </div>
          {processSteps.map((s, i) => (
            <Reveal as="li" key={s.step} delay={i * 60} className="relative">
              <span
                className="absolute -left-10 top-6 grid size-6 place-items-center rounded-full border border-border bg-background text-[0.65rem] font-semibold text-fg-2 sm:-left-[3.5rem] sm:size-7"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <Surface specular className="grid gap-4 p-6 sm:grid-cols-[1fr_auto] sm:items-start sm:p-7">
                <div>
                  <p className="t-eyebrow">{s.step}</p>
                  <h3 className="t-h3 mt-1">{s.title}</h3>
                  <p className="t-body mt-2 max-w-[60ch] text-fg-2">{s.promise}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.outputs.map((o) => (
                      <li key={o} className="chip">
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="t-small whitespace-nowrap rounded-full bg-muted px-3 py-1.5 text-fg-2">
                  {s.duration}
                </p>
              </Surface>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
