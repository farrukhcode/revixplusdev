"use client";

import dynamic from "next/dynamic";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import type { Concierge as ConciergeComponent } from "./Concierge";

const Concierge = dynamic(() => import("./Concierge").then((m) => m.Concierge), { ssr: false });

/**
 * The concierge for long pages: its AI SDK chunk (~90 KB gzipped) loads only when the panel
 * is within 800px of the viewport, so it stays off the page's startup path. The box reserves
 * the panel's height; the swap happens off screen, so nothing visibly shifts.
 */
export function LazyConcierge({ className, ...props }: ComponentProps<typeof ConciergeComponent>) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        io.disconnect();
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {near ? <Concierge {...props} /> : <div className="min-h-72" />}
    </div>
  );
}
