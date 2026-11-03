"use client";

import { ArrowUpRight, Pause, Play } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTour } from "@/components/motion/StoryTour";
import { AnimatedRays } from "@/components/ui/animated-rays";
import { Button } from "@/components/ui/Button";
import { home } from "@/content/home";

const HeroGlobe = dynamic(() => import("./HeroGlobe"), { ssr: false });

function useWebGL() {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setOk(Boolean(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setOk(false);
    }
  }, []);
  return ok;
}

/** Static stand-in while the globe loads, and the fallback without WebGL. */
function GlobePoster() {
  return (
    <div className="absolute inset-[12%] rounded-full border border-border bg-card shadow-[0_0_120px_-20px_var(--violet)]">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(var(--subtle-foreground)_1px,transparent_1.5px)] [background-size:14px_14px] opacity-40 [mask-image:radial-gradient(circle,black_45%,transparent_72%)]" />
    </div>
  );
}

export function Hero() {
  const webgl = useWebGL();
  const { toggle, status } = useTour();

  return (
    <section
      id="hero"
      data-chapter="hero"
      data-chapter-label="Start"
      data-tour-speed="70"
      className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-16 lg:pt-24"
    >
      <AnimatedRays className="-z-[1]" />
      <div className="container-x relative grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-4">
        <div className="relative z-[1]">
          <p className="t-eyebrow enter mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
            <span className="size-1.5 rounded-full bg-lime" aria-hidden="true" />
            {home.hero.eyebrow}
          </p>
          <h1 className="t-display goo-load max-w-[14ch]">
            <span>{home.hero.headline}</span>
          </h1>
          <p className="t-lead enter mt-7 max-w-[54ch]" style={{ transitionDelay: "300ms" }}>
            {home.hero.sub}
          </p>
          <div className="enter mt-9 flex flex-wrap items-center gap-3" style={{ transitionDelay: "420ms" }}>
            <Button
              href={home.hero.primaryCta.href}
              variant="primary"
              size="lg"
              icon={<ArrowUpRight className="size-4" />}
            >
              {home.hero.primaryCta.label}
            </Button>
            <Button
              size="lg"
              onClick={toggle}
              icon={status === "playing" ? <Pause className="size-4" /> : <Play className="size-4" />}
              aria-label={status === "playing" ? "Pause the auto-tour" : "Play the auto-tour of this page"}
            >
              {status === "playing" ? "Pause tour" : home.hero.secondaryCta.label}
            </Button>
          </div>
          <ul className="enter mt-12 flex flex-wrap gap-x-6 gap-y-2" style={{ transitionDelay: "560ms" }}>
            {home.hero.trust.map((t) => (
              <li key={t} className="t-small flex items-center gap-2 text-fg-2">
                <span className="size-1.5 rounded-full bg-cyan" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="relative mx-auto aspect-square w-full max-w-[440px] sm:max-w-[560px] lg:max-w-[700px] lg:-mr-[5vw]"
          aria-hidden="true"
        >
          {webgl === false ? <GlobePoster /> : null}
          {webgl ? <HeroGlobe /> : null}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center text-fg-3 lg:flex"
        aria-hidden="true"
      >
        <div className="t-small flex items-center gap-2">
          <span className="relative block h-7 w-4 rounded-full border border-current/40">
            <span className="absolute left-1/2 top-1.5 size-1 -translate-x-1/2 rounded-full bg-current motion-safe:animate-bounce" />
          </span>
          Scroll to explore
        </div>
      </div>
    </section>
  );
}
