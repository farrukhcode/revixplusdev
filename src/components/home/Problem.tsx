"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Surface } from "@/components/ui/Surface";
import { home } from "@/content/home";

/**
 * Three beats. The section pins and each card materializes (rise + scale, not a
 * plain fade) as the visitor scrolls, so the pain lands one line at a time.
 */
export function Problem() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-beat]", section.current);
        gsap.set(cards, { opacity: 0, y: 40, scale: 0.97 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: "+=110%",
            pin: true,
            scrub: true,
            anticipatePin: 1,
          },
        });
        cards.forEach((card, i) => {
          tl.to(card, { opacity: 1, y: 0, scale: 1, ease: "none", duration: 1 }, i * 1.2);
        });
        tl.to({}, { duration: 0.6 });
      });
      mm.add("(max-width: 1023px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-beat]", section.current);
        for (const card of cards) {
          gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          });
        }
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      id="problem"
      data-chapter="problem"
      data-chapter-label="The problem"
      data-tour-speed="60"
      className="relative flex min-h-svh items-center py-24 lg:h-svh lg:py-0"
    >
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <SectionHeading eyebrow={home.problem.eyebrow} headline={home.problem.headline} />
        <ol className="flex flex-col gap-4">
          {home.problem.beats.map((b, i) => (
            <li key={b.title} data-beat>
              <Surface specular className="p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="t-small grid size-8 shrink-0 place-items-center rounded-full bg-muted font-mono text-fg-2">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="t-h4">{b.title}</h3>
                    <p className="t-body mt-2 text-fg-2">{b.body}</p>
                  </div>
                </div>
              </Surface>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
