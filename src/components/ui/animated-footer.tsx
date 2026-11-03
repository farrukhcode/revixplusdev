"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// VengeanceUI Animated Footer (@vengeanceui/animated-footer), trimmed to a footer
// flourish: a display word that unmasks on scroll over ASCII art the cursor lights up.
// Adapted: the art is a horizon arc drawn in code (no images to load), glyphs take the
// --cyan to --violet gradient (re-read when `.dark` flips), the reveal is CSS (no gsap,
// no next-themes), parallax dropped, and the canvas only redraws while cells are lit
// and the band is on screen (rAF already pauses in hidden tabs). Reduced motion gets
// one static frame.

const RAMP = ".:-=+*#%"; // sparse to dense, picked by mask coverage
const CELL = 11; // css px per glyph cell
const LIT_MS = 320;
const CLUSTER = 8;

type Cell = { x: number; y: number; col: number; row: number; level: number; until: number };

/** Mask for the art: the rim of a huge disc rising behind the word, like a horizon. */
function paintMask(g: CanvasRenderingContext2D, cols: number, rows: number) {
  const cx = cols / 2;
  const r = cols * 0.62;
  const cy = r * 0.97 + rows * 0.12; // apex just under the top edge
  const rim = g.createRadialGradient(cx, cy, 0, cx, cy, r);
  rim.addColorStop(0, "transparent");
  rim.addColorStop(0.7, "transparent");
  rim.addColorStop(0.93, "black");
  rim.addColorStop(1, "transparent");
  g.fillStyle = rim; // only alpha is sampled, the hue never shows
  g.fillRect(0, 0, cols, rows);
}

export function AnimatedFooter({ heading, className }: { heading: string; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cols = 0;
    let rows = 0;
    let grid: (Cell | undefined)[] = [];
    let levels: Cell[][] = [];
    let ink: CanvasGradient | string = "";
    let litInk = "";
    let font = "";
    let raf = 0;
    let visible = false;

    const readTheme = () => {
      const cs = getComputedStyle(document.documentElement);
      const v = (name: string) => cs.getPropertyValue(name).trim();
      ink = ctx.createLinearGradient(0, 0, cols * CELL, 0);
      ink.addColorStop(0, v("--cyan"));
      ink.addColorStop(1, v("--violet"));
      litInk = v("--card");
      font = `${CELL}px ${v("--font-mono") || "monospace"}`;
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, cols * CELL, rows * CELL);
      ctx.font = font;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = ink;
      const lit: Cell[] = [];
      levels.forEach((cells, level) => {
        ctx.globalAlpha = 0.16 + (0.42 * level) / (RAMP.length - 1);
        for (const c of cells) {
          if (c.until > now) lit.push(c);
          else ctx.fillText(RAMP[level], c.x, c.y);
        }
      });
      ctx.globalAlpha = 1;
      for (const c of lit) ctx.fillRect(c.x - CELL / 2, c.y - CELL / 2, CELL, CELL);
      ctx.fillStyle = litInk;
      for (const c of lit) ctx.fillText(RAMP[c.level], c.x, c.y);
      return lit.length > 0;
    };

    const tick = () => {
      raf = draw(performance.now()) && visible ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };

    const build = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      cols = Math.floor(w / CELL);
      rows = Math.floor(h / CELL);
      if (!cols || !rows) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = cols * CELL * dpr;
      canvas.height = rows * CELL * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mask = document.createElement("canvas");
      mask.width = cols;
      mask.height = rows;
      const g = mask.getContext("2d", { willReadFrequently: true });
      if (!g) return;
      paintMask(g, cols, rows);
      const alpha = g.getImageData(0, 0, cols, rows).data;
      grid = new Array(cols * rows);
      levels = RAMP.split("").map(() => []);
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // Jitter dithers the ramp so the rings read as texture, not bands.
          const a = alpha[(row * cols + col) * 4 + 3] / 255 + (Math.random() - 0.5) * 0.3;
          if (a < 0.12) continue;
          const level = Math.min(RAMP.length - 1, Math.floor(a * RAMP.length));
          const cell = { x: col * CELL + CELL / 2, y: row * CELL + CELL / 2, col, row, level, until: 0 };
          grid[row * cols + col] = cell;
          levels[level].push(cell);
        }
      }
      readTheme();
      draw(performance.now());
      document.fonts.load(font).then(() => draw(performance.now()));
    };

    // A short random walk from the cell under the pointer, like the original's hover ripple.
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const col = Math.floor((e.clientX - r.left) / CELL);
      const row = Math.floor((e.clientY - r.top) / CELL);
      if (col < 0 || col >= cols || row < 0 || row >= rows) return;
      let cur = grid[row * cols + col];
      if (!cur) return;
      const now = performance.now();
      cur.until = now + LIT_MS;
      for (let step = 1, n = 1 + Math.floor(Math.random() * CLUSTER); step < n; step++) {
        const near: Cell[] = [];
        for (let dy = -1; dy <= 1; dy++)
          for (let dx = -1; dx <= 1; dx++) {
            const c = cur.col + dx;
            const nb = c >= 0 && c < cols ? grid[(cur.row + dy) * cols + c] : undefined;
            if (nb && nb.until < now) near.push(nb);
          }
        if (!near.length) break;
        cur = near[Math.floor(Math.random() * near.length)];
        cur.until = now + LIT_MS + step * 12;
      }
      kick();
    };

    const resize = new ResizeObserver(build);
    resize.observe(canvas);
    const theme = new MutationObserver(() => {
      readTheme();
      draw(performance.now());
    });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    if (still) {
      root.dataset.in = "";
      return () => {
        resize.disconnect();
        theme.disconnect();
      };
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) root.dataset.in = "";
        else {
          delete root.dataset.in;
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0.3 },
    );
    io.observe(root);
    root.addEventListener("pointermove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      theme.disconnect();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
    };
  }, []);

  const mid = (heading.length - 1) / 2;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn("group relative overflow-hidden [container-type:inline-size]", className)}
    >
      <div className="relative h-[clamp(9rem,26cqw,19rem)]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 size-full transition-[clip-path] duration-1000 ease-[var(--ease-out)] [clip-path:inset(0_50%)] group-data-[in]:[clip-path:inset(0)] motion-reduce:transition-none"
        />
        <p
          className="absolute inset-x-0 bottom-0 flex justify-center overflow-hidden pb-[0.06em] font-semibold leading-[0.9] tracking-[-0.05em] text-fg"
          style={{ fontSize: "min(16cqw, 12rem)" }}
        >
          {Array.from(heading, (ch, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: static characters
              key={i}
              className="inline-block translate-y-[110%] transition-transform duration-1000 ease-[var(--ease-out)] group-data-[in]:translate-y-0 motion-reduce:translate-y-0 motion-reduce:transition-none"
              style={{ transitionDelay: `${Math.abs(i - mid) * 45}ms` }}
            >
              {ch}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
