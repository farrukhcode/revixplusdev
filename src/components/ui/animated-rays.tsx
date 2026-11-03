"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// VengeanceUI Animated Rays (@vengeanceui/animated-rays), adapted: theme tokens
// for the stripes and spectrum; drawn at quarter size and scaled up (the blur
// hides it) so each frame repaints 1/16 of the pixels; no fixed attachment (it
// forced a repaint on every scroll); paused offscreen. Styles live in globals.css.
const stripes =
  "repeating-linear-gradient(100deg, var(--rays-stripe) 0%, var(--rays-stripe) 7%, transparent 10%, transparent 12%, var(--rays-stripe) 16%)";
const spectrum =
  "repeating-linear-gradient(100deg, var(--blue) 10%, var(--violet) 15%, var(--blue) 20%, var(--cyan) 25%, var(--blue) 30%)";

export function AnimatedRays({ className, children }: { className?: string; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      el.dataset.paused = String(!e.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("rays pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div className="rays__layer" style={{ backgroundImage: `${stripes}, ${spectrum}` }}>
        <div className="rays__flow" style={{ backgroundImage: `${stripes}, ${spectrum}` }} />
      </div>
      {children}
    </div>
  );
}

export default AnimatedRays;
