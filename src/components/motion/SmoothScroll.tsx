"use client";

import Lenis from "lenis";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "./gsap";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Lenis drives the scroll position with a light lerp; GSAP's ticker drives Lenis;
 * ScrollTrigger listens to Lenis. One clock, no fighting.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("js");

    const instance = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -72 },
      respectReducedMotion: true,
      stopInertiaOnNavigate: true,
    });

    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Web fonts change line heights after first layout; re-measure pins once they land.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
