"use client";

import { type ComponentPropsWithoutRef, type ElementType, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

type SurfaceProps<T extends ElementType> = {
  as?: T;
  /** Muted fill, for emphasized blocks */
  muted?: boolean;
  /** Pointer glow + rainbow edge near the cursor (on by default for every card) */
  specular?: boolean;
  /** Hover lift + press feedback */
  interactive?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

/**
 * The one card primitive. Solid and bordered, so text stays readable in both
 * themes and nothing behind it has to be re-blurred while scrolling.
 */
export function Surface<T extends ElementType = "div">({
  as,
  muted = false,
  specular = true,
  interactive = false,
  className,
  ...rest
}: SurfaceProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const frame = useRef<number | null>(null);

  // One style write per frame, fine pointers only (touch produces false hovers).
  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!specular || e.pointerType === "touch") return;
      const el = ref.current;
      if (!el || frame.current) return;
      const { clientX, clientY } = e;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", String((clientX - r.left) / r.width));
        el.style.setProperty("--my", String((clientY - r.top) / r.height));
      });
    },
    [specular],
  );

  return (
    <Tag
      ref={ref}
      onPointerMove={specular ? onPointerMove : undefined}
      // A card can scroll in under a resting cursor; aim the glow before the next move
      onPointerEnter={specular ? onPointerMove : undefined}
      className={cn(
        "surface",
        muted && "surface-muted",
        specular && "surface-spotlight",
        interactive && "surface-interactive",
        className,
      )}
      {...rest}
    />
  );
}
