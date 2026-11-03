"use client";

import { useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// VengeanceUI Stats Counter (@vengeanceui/stats-counter), on the already-installed
// `motion` package. Reduced motion shows the final value immediately.
interface StatsCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export default function StatsCounter({
  value,
  duration = 1.5,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: StatsCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // Vertical-only margin: a horizontal inset would stop numbers near a phone edge from ever starting
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const reduced = useReducedMotion();
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (reduced) setDisplayValue(value);
    else motionValue.set(value);
  }, [isInView, value, motionValue, reduced]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [springValue]);

  // The server HTML (what crawlers and AI engines read) carries the final value; the
  // counting number is decoration for sighted users.
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      <span className="sr-only">
        {prefix}
        {value.toFixed(decimals)}
        {suffix}
      </span>
      <span aria-hidden="true">
        {prefix}
        {displayValue.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
}
