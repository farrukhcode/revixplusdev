# Animation Spec

How the home page moves, how scroll is driven, how the auto-tour works, and the budget everything has to fit in. Component-level motion follows `docs/DESIGN-SYSTEM.md` section 5. This file covers choreography.

Libraries: gsap 3.15 with ScrollTrigger, SplitText, Flip and DrawSVG (all plugins are free since 3.13), lenis 1.3 for smooth scroll and programmatic scrolling, motion 14.9 for springs and gestures, three 0.187 with @react-three/fiber 9.8 and @react-three/drei 10.7 for the hero, embla-carousel-react 8.6 for the testimonial carousel.

## 1. Chapter choreography

| # | Chapter | Trigger | What moves | Properties | Easing or spring | Duration | Stagger |
|---|---|---|---|---|---|---|---|
| 0 | Hero | On load, after fonts ready | Headline words rise, sub and CTAs follow, orb fades and scales in | `y`, `opacity`, `scale`, orb `filter: blur()` on its own layer | `--ease-out` | 700ms words, 500ms rest | 40ms per word, CTAs +150ms |
| 0 | Hero orb | Pointer move | Orb tilts toward the pointer, highlight follows | R3F rotation, `--mx/--my` | Spring bounce 0, duration 0.4 | continuous | none |
| 1 | Problem | ScrollTrigger pin, 3 beats across 250vh | Each card materializes | `opacity 0 to 1`, `scale .96 to 1`, `filter blur(12px) to 0` | `--ease-out` via scrub (smooth 0.6) | one beat each | 0 |
| 2 | Services | ScrollTrigger pin, horizontal travel | Track translates `xPercent` from 0 to -(panels-1)*100, panel content parallax at 0.85x | `xPercent`, inner `x` | scrub true | section height = panels * 100vh | none |
| 3 | AI diagram | ScrollTrigger pin, 200vh | Paths draw, nodes pop, chat card slides in | DrawSVG `drawSVG 0% to 100%`, `scale .96 to 1`, `y 24 to 0` | scrub for paths, `--ease-out` for nodes | path 1 beat | nodes 80ms |
| 4 | Work | ScrollTrigger pin, horizontal travel | Device track translates, each device has a depth factor (0.7 to 1.2) for parallax | `xPercent`, inner `x` | scrub true | 8 devices, 60vw each | none |
| 5 | Process | ScrollTrigger scrub on the rail | Rail fill grows, step cards reveal as the fill passes them | `scaleY` on the fill, cards `opacity`, `y` | scrub for fill, `--ease-out` for cards | per step | 0 |
| 6 | Growth | ScrollTrigger pin, horizontal travel | Panels translate, counters spring up when each panel is 50% visible | `xPercent`, counter value | spring bounce 0 | counter 900ms | none |
| 7 | Numbers | Enter viewport once | Counters | value | spring bounce 0 | 1100ms | 80ms |
| 8 | Voices | User drag | Embla with momentum, snap to nearest card using projected endpoint | `transform` | Embla default decel | n/a | n/a |
| 9 | CTA | Enter viewport once | Three doors rise | `y 24 to 0`, `opacity` | `--ease-out` | 500ms | 60ms |

All reveals animate `transform` and `opacity` only. The one `filter` use (card materialize in chapter 1) is on the card's own layer, never `backdrop-filter`.

Reduced motion: every scrubbed transform becomes a 200ms opacity fade at the same trigger, pins stay (they are layout, not motion), parallax factors become 1, counters render their final value, the orb is a static poster image.

## 2. Lenis and GSAP wiring

One provider mounted in the root layout. Lenis owns the scroll, GSAP's ticker drives Lenis, ScrollTrigger listens to Lenis.

```ts
// src/components/motion/SmoothScroll.tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      autoRaf: false,
      lerp: reduce ? 1 : 0.1,
      smoothWheel: !reduce,
      syncTouch: false,
    });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
  return <>{children}</>;
}
```

`syncTouch: false` leaves native touch scrolling alone on phones; the horizontal chapters switch to native scroll-snap there (section 3).

## 3. Pinned horizontal chapters

Markup: a section with `data-chapter`, a sticky viewport, and a track of panels.

```tsx
<section data-chapter="services" data-tour-speed="45" className="h-chapter">
  <div className="h-chapter__viewport">
    <div className="h-chapter__track">
      {panels.map(p => <article className="h-chapter__panel glass glass--refract">...</article>)}
    </div>
  </div>
</section>
```

```ts
// src/components/motion/HorizontalChapter.tsx (inside useGSAP)
const mm = gsap.matchMedia();

mm.add("(min-width: 768px) and (hover: hover) and (prefers-reduced-motion: no-preference)", () => {
  const track = trackRef.current!;
  const panels = gsap.utils.toArray<HTMLElement>(".h-chapter__panel", track);
  const travel = () => track.scrollWidth - window.innerWidth;

  gsap.to(track, {
    x: () => -travel(),
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${travel()}`,
      pin: true,
      scrub: true,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      snap: { snapTo: 1 / (panels.length - 1), duration: 0.4, ease: "power1.out", delay: 0 },
      onUpdate: self => setProgress(self.progress),
    },
  });
});

mm.add("(max-width: 767px), (hover: none), (prefers-reduced-motion: reduce)", () => {
  // No pin. CSS takes over: the track becomes a native horizontal scroller.
  sectionRef.current!.dataset.native = "1";
});
```

```css
.h-chapter[data-native="1"] .h-chapter__track {
  display: flex; overflow-x: auto; scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch; gap: 16px; padding-inline: 16px;
}
.h-chapter[data-native="1"] .h-chapter__panel { scroll-snap-align: center; flex: 0 0 86vw; }
```

Keyboard: left and right arrow keys inside a pinned chapter call `lenis.scrollTo` by one panel's worth of travel. A visible "Next" button does the same.

Section height on desktop is set by the pin (`end: +=travel`), so the total page length changes with viewport width. `ScrollTrigger.refresh()` runs after fonts load and after the hero's 3D poster swaps in, so pins never drift.

## 4. Auto-tour

The site scrolls itself through the story. The user can take over at any instant.

### State machine

```
idle ──(auto-start timer or chip click)──▶ playing
playing ──(wheel | touchstart | keydown | pointerdown on scrollbar | chip click)──▶ paused
paused ──(chip click)──▶ playing
playing ──(reached last chapter)──▶ idle
```

Rules:

- Auto-start fires 2.5s after the hero finishes its entrance, on desktop only (`min-width: 768px`, `hover: hover`), and only when `prefers-reduced-motion` is `no-preference` and `localStorage.revix.tour !== "off"`.
- Touch devices never auto-start. The chip is still available.
- The chip shows a countdown ring during the 2.5s so the start never surprises anyone.
- Any user input pauses immediately. The tour never auto-resumes; only the chip resumes it.
- When the user pauses, `localStorage.revix.tour = "off"` is written. Clicking play writes `"on"`.
- The chip is always visible (WCAG 2.2.2, pause, stop, hide).

### Engine

Chapter by chapter, with a beat at each anchor.

```ts
// src/components/motion/StoryTour.tsx (core loop)
const chapters = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));

async function playFrom(index: number) {
  for (let i = index; i < chapters.length && state === "playing"; i++) {
    const el = chapters[i];
    const speed = Number(el.dataset.tourSpeed ?? 80); // px per second
    const target = el.offsetTop; // Lenis uses document coordinates
    const distance = Math.abs(target - lenis.scroll);
    await new Promise<void>(resolve =>
      lenis.scrollTo(target, {
        duration: Math.max(0.6, distance / speed),
        easing: t => t,          // linear, the eye reads constant speed as calm
        lock: false,             // user input still wins
        onComplete: resolve,
      })
    );
    if (state !== "playing") return;
    await wait(1500);            // the beat
  }
  if (state === "playing") setState("idle");
}
```

Speeds: `data-tour-speed="80"` on vertical chapters, `"45"` on horizontal chapters (the pinned travel is long and the panels need reading time). Chapter 1 (problem, three beats) uses `"60"`.

Input detection:

```ts
const pause = () => state === "playing" && setState("paused");
window.addEventListener("wheel", pause, { passive: true });
window.addEventListener("touchstart", pause, { passive: true });
window.addEventListener("keydown", pause);
window.addEventListener("pointerdown", e => {
  // pointerdown on the scrollbar track lands on <html>
  if (e.target === document.documentElement) pause();
});
```

Pausing calls `lenis.stop()` and immediately `lenis.start()` so the in-flight programmatic scroll is cancelled but the user's own scroll continues from the current position (no jump; Lenis animates from its present value).

### Chapter rail and progress bar

- Rail: fixed on the right, one dot per `[data-chapter]`, label on hover and when active. Clicking a dot calls `lenis.scrollTo(chapter.offsetTop, { duration: 1.2, easing: easeOutQuint })` and pauses the tour.
- Active chapter is derived from ScrollTrigger `onToggle` on each chapter, not from scroll math.
- Progress bar: 2px at the very top, `scaleX` bound to `lenis.progress`, transform only.
- Hidden under 768px; the mobile dock takes the space.

## 5. Hero 3D

- `three` + `@react-three/fiber` + `@react-three/drei` `MeshTransmissionMaterial` on a torus-knot or blob geometry, `transmission 1`, `thickness 0.6`, `roughness 0.08`, `chromaticAberration 0.04`, `ior 1.4`, environment from a small HDR or `Environment preset="city"`.
- Loaded with `next/dynamic` from a client component, `ssr: false`, after first paint.
- Gated on: `min-width: 768px`, `prefers-reduced-motion: no-preference`, `navigator.deviceMemory >= 4` when available, `navigator.hardwareConcurrency >= 4` when available, and WebGL2 present.
- `frameloop="demand"`; invalidate on pointer move and while in view. An `IntersectionObserver` stops the loop when the hero leaves the viewport.
- Poster fallback: a static WebP of the orb at the same position so layout never shifts (CLS 0).
- Pixel ratio capped at 1.5.

## 6. Performance budget

| Metric | Budget |
|---|---|
| LCP (mobile) | under 2.0s |
| INP | under 200ms |
| CLS | under 0.05 |
| Home JS, gzipped, before the 3D chunk | 180KB or less |
| 3D chunk | lazy, desktop only, not in the LCP path |
| Lighthouse mobile | 90 or higher on performance, accessibility, best practices, SEO |
| Glass layers per viewport | 4 or fewer |
| Backdrop blur on large surfaces | 20px or less |

Techniques: `content-visibility: auto` with `contain-intrinsic-size` on chapters below the fold, `will-change: transform` only on the active horizontal track, images via `next/image` with explicit sizes, fonts self-hosted with `font-display: swap`, no third-party scripts in the critical path (Umami loads `defer`), the concierge chat chunk loads on first interaction.

## 7. Review checklist

Run before merging any motion change. Each line is a block, not a suggestion.

- No `transition: all`. Properties are named.
- No `scale(0)` entrance. Start at `.96` with `opacity: 0`.
- No `ease-in` on UI. Enter and exit with `--ease-out`.
- No built-in `ease-out` on deliberate motion. Use the token curve.
- No animation on keyboard shortcuts or actions fired 100+ times a day.
- No UI duration over 300ms without a reason written in the PR.
- Trigger-anchored popovers set `transform-origin` to the trigger. Modals stay centered.
- Toasts, toggles and anything fired rapidly use transitions, never keyframes.
- No animation of `width`, `height`, `margin`, `padding`, `top`, `left`. Accordions may animate `height` only.
- No `backdrop-filter` or blur radius animation.
- Hover motion is gated by `@media (hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion` has a gentler variant, not nothing.
- Groups enter with a 30 to 80ms stagger, never all at once.
- Every spring is interruptible: new input retargets from the current value.
- Enter and exit use the same path.
- Feedback fires on pointer-down.
- The tour has a visible pause control and never auto-resumes.
- Play the change at 0.25x speed in DevTools and step frame by frame once. Look again the next day.
