"use client";

import { Pause, Play } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { useLenis } from "./SmoothScroll";

/**
 * The site can scroll itself, chapter by chapter, when the visitor asks for it.
 *
 * State machine: idle -> playing -> paused | done. It only starts from the
 * "Take the tour" button or the chip. Any wheel, touch, key or scrollbar input
 * pauses immediately and we never auto-resume.
 */

type Status = "idle" | "playing" | "paused" | "done";

export interface TourChapter {
  id: string;
  label: string;
  speed: number; // px per second
  beat: number; // ms pause at the chapter anchor
  el: HTMLElement;
}

interface TourContextValue {
  status: Status;
  chapters: TourChapter[];
  activeIndex: number;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  jumpTo: (index: number) => void;
}

const TourContext = createContext<TourContextValue | null>(null);

export function useTour() {
  const ctx = useContext(TourContext);
  if (!ctx) throw new Error("useTour must be used inside <TourProvider>");
  return ctx;
}

/** Document-space top of a chapter. Pinned chapters live inside a ScrollTrigger pin-spacer. */
function chapterTop(el: HTMLElement) {
  const anchor = el.parentElement?.classList.contains("pin-spacer") ? el.parentElement : el;
  return anchor.getBoundingClientRect().top + window.scrollY;
}
const DEFAULT_SPEED = 80;

export function TourProvider({ children }: { children: ReactNode }) {
  const lenis = useLenis();
  const pathname = usePathname();
  const [status, setStatus] = useState<Status>("idle");
  const [chapters, setChapters] = useState<TourChapter[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const statusRef = useRef<Status>("idle");
  const timers = useRef<number[]>([]);

  const setStatusSafe = useCallback((s: Status) => {
    statusRef.current = s;
    setStatus(s);
  }, []);

  const clearTimers = useCallback(() => {
    for (const t of timers.current) window.clearTimeout(t);
    timers.current = [];
  }, []);

  // Collect chapters from the DOM on every route: this provider lives in the root layout,
  // so mounting once left the rail empty after navigating home from another page.
  // Hidden routes Next keeps around for back/forward are skipped.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the re-collect signal
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]")).filter((el) =>
      el.checkVisibility(),
    );
    setChapters(
      els.map((el) => ({
        id: el.id || el.dataset.chapter || "",
        label: el.dataset.chapterLabel || el.dataset.chapter || "",
        speed: Number(el.dataset.tourSpeed) || DEFAULT_SPEED,
        beat: Number(el.dataset.tourBeat) || 1500,
        el,
      })),
    );
    setActiveIndex(0);
  }, [pathname]);

  // Active chapter from Lenis scroll events. React skips the render when the index is unchanged.
  useEffect(() => {
    if (!lenis || !chapters.length) return;
    const onScroll = ({ scroll }: { scroll: number }) => {
      const y = scroll + window.innerHeight * 0.4;
      let idx = 0;
      for (let i = 0; i < chapters.length; i++) {
        if (chapterTop(chapters[i].el) <= y) idx = i;
      }
      setActiveIndex(idx);
    };
    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis, chapters]);

  const pause = useCallback(() => {
    clearTimers();
    if (statusRef.current === "playing") {
      lenis?.scrollTo(lenis.animatedScroll, { immediate: true, force: true });
      setStatusSafe("paused");
    }
  }, [clearTimers, lenis, setStatusSafe]);

  // Advance to the next chapter anchor; called recursively on completion.
  const advance = useCallback(
    (fromIndex: number) => {
      if (!lenis || statusRef.current !== "playing") return;
      const next = chapters[fromIndex + 1];
      const current = chapters[fromIndex];
      const targetY = next ? chapterTop(next.el) : lenis.limit;
      const distance = Math.abs(targetY - lenis.animatedScroll);
      const speed = current?.speed ?? DEFAULT_SPEED;
      const duration = Math.max(0.6, distance / speed);

      lenis.scrollTo(targetY, {
        duration,
        easing: (t) => t,
        lock: false,
        userData: { tour: true },
        onComplete: () => {
          if (statusRef.current !== "playing") return;
          if (!next) {
            setStatusSafe("done");
            return;
          }
          timers.current.push(window.setTimeout(() => advance(fromIndex + 1), next.beat));
        },
      });
    },
    [lenis, chapters, setStatusSafe],
  );

  const play = useCallback(() => {
    if (!lenis || !chapters.length) return;
    clearTimers();
    setStatusSafe("playing");
    // Start from the chapter the visitor is currently in.
    const y = lenis.animatedScroll + 1;
    let idx = 0;
    for (let i = 0; i < chapters.length; i++) if (chapterTop(chapters[i].el) <= y) idx = i;
    advance(idx);
  }, [lenis, chapters, advance, clearTimers, setStatusSafe]);

  const toggle = useCallback(() => {
    if (statusRef.current === "playing") pause();
    else play();
  }, [pause, play]);

  const jumpTo = useCallback(
    (index: number) => {
      if (!lenis) return;
      const ch = chapters[index];
      if (!ch) return;
      pause();
      lenis.scrollTo(chapterTop(ch.el), { duration: 1.1 });
    },
    [lenis, chapters, pause],
  );

  // Any user input pauses the tour. We never auto-resume.
  useEffect(() => {
    if (!lenis) return;
    const onUser = () => {
      if (statusRef.current === "playing") pause();
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " ", "Escape"].includes(e.key))
        onUser();
    };
    const onMouseDown = (e: MouseEvent) => {
      // Clicks on the native scrollbar land outside the document's client width.
      if (e.clientX >= document.documentElement.clientWidth) onUser();
    };
    window.addEventListener("wheel", onUser, { passive: true });
    window.addEventListener("touchstart", onUser, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("wheel", onUser);
      window.removeEventListener("touchstart", onUser);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [lenis, pause]);

  useEffect(() => clearTimers, [clearTimers]);

  const value = useMemo<TourContextValue>(
    () => ({ status, chapters, activeIndex, play, pause, toggle, jumpTo }),
    [status, chapters, activeIndex, play, pause, toggle, jumpTo],
  );

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
}

/** The visible control (WCAG 2.2.2: moving content must be pausable). */
export function TourChip({ className }: { className?: string }) {
  const { status, toggle, chapters } = useTour();
  if (chapters.length < 2) return null;
  const playing = status === "playing";
  const label = playing ? "Pause tour" : status === "done" ? "Replay tour" : "Auto-tour";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Pause the auto-tour" : "Play the auto-tour"}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full border border-border bg-muted px-3 text-[0.8125rem] font-medium text-fg-2 transition-colors hover:text-fg active:scale-[0.97]",
        className,
      )}
    >
      {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
      <span className="hidden lg:inline">{label}</span>
    </button>
  );
}

/** Thin progress bar along the top edge. Writes the transform directly: no React render per frame. */
export function ScrollProgress() {
  const lenis = useLenis();
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lenis) return;
    const onScroll = ({ progress }: { progress: number }) => {
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
    };
    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]" aria-hidden="true">
      <div
        ref={bar}
        className="h-full origin-left bg-[linear-gradient(90deg,var(--violet),var(--cyan))]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

/** Chapter rail on the right edge, desktop only. A glass capsule, so it reads over cards. */
export function ChapterRail() {
  const { chapters, activeIndex, jumpTo } = useTour();
  if (!chapters.length) return null;
  return (
    <nav
      aria-label="Sections"
      className="glass fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col rounded-full p-1 lg:flex"
    >
      {chapters.map((c, i) => (
        <button
          key={c.id}
          type="button"
          onClick={() => jumpTo(i)}
          aria-label={`Go to ${c.label}`}
          aria-current={i === activeIndex ? "step" : undefined}
          className="group relative grid size-6 place-items-center"
        >
          <span className="t-small pointer-events-none absolute right-full mr-3 translate-x-1 whitespace-nowrap rounded-full bg-card px-2 py-0.5 text-fg-2 opacity-0 shadow-[var(--shadow-card)] transition-[opacity,transform] duration-200 ease-[var(--ease-out)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
            {c.label}
          </span>
          <span
            className={cn(
              "block rounded-full transition-[height,background-color] duration-200 ease-[var(--ease-out)]",
              i === activeIndex ? "h-3.5 w-1.5 bg-violet" : "h-1.5 w-1.5 bg-fg-3 group-hover:bg-fg-2",
            )}
          />
        </button>
      ))}
    </nav>
  );
}
