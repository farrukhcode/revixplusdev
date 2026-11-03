"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

// VengeanceUI Perspective Grid (@vengeanceui/perspective-grid), adapted: theme
// tokens for lines, hover light and the fade (no white/black or gray palette),
// a transparent base so it sits behind a section, and a smaller default grid.
interface PerspectiveGridProps {
  className?: string;
  /** Number of tiles per row/column */
  gridSize?: number;
  /** Whether to show the fade overlay */
  showOverlay?: boolean;
  /** Fade radius percentage for the overlay */
  fadeRadius?: number;
}

export function PerspectiveGrid({
  className,
  gridSize = 32,
  showOverlay = true,
  fadeRadius = 80,
}: PerspectiveGridProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const tiles = useMemo(() => Array.from({ length: gridSize * gridSize }, (_, i) => i), [gridSize]);

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
    >
      <div
        className="absolute grid aspect-square w-[80rem] origin-center"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%) rotateX(30deg) rotateY(-5deg) rotateZ(20deg) scale(2)",
          transformStyle: "preserve-3d",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {mounted
          ? tiles.map((i) => (
              <div
                key={i}
                className="min-h-px min-w-px border border-border-strong/50 bg-transparent transition-colors duration-[1500ms] hover:bg-violet/30 hover:duration-0"
              />
            ))
          : null}
      </div>
      {showOverlay ? (
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ background: `radial-gradient(circle, transparent 25%, var(--background) ${fadeRadius}%)` }}
        />
      ) : null}
    </div>
  );
}

export default PerspectiveGrid;
