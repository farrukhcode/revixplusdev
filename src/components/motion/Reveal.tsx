"use client";

import { type ElementType, type ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** ms, applied via transition-delay for simple staggers */
  delay?: number;
  once?: boolean;
}

/**
 * Cheap scroll reveal: opacity + translate via CSS, toggled by IntersectionObserver.
 * A throttled scroll check backs it up for elements inside pinned (position: fixed)
 * chapters, where the observer can lag behind the pin.
 */
export function Reveal({ as: Tag = "div", children, className, delay = 0, once = true }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }

    let revealed = false;
    let ticking = false;

    const show = () => {
      revealed = true;
      el.classList.add("is-in");
    };

    const inViewport = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.9 && r.bottom > 0;
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show();
            if (once) io.unobserve(el);
          } else if (!once) {
            revealed = false;
            el.classList.remove("is-in");
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);

    const onScroll = () => {
      if (revealed || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (!revealed && inViewport()) show();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [once]);

  return (
    <Tag
      ref={ref}
      data-reveal
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
