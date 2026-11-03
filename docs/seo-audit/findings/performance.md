# Performance (Core Web Vitals): revixplus.com (pre-deploy build)

**Score: 58/100**

Audited 2026-11-03, lab data only. There is no CrUX field data: the site isn't live, and there are no PSI or CrUX credentials. Google ranks on field CWV at the 75th percentile, so treat everything here as diagnostics, not pass/fail verdicts.

## Method

- **Lighthouse 12.8.2** CLI, headless Chrome 156, against the production image (`http://localhost:3100`). Default simulated throttling (Moto G Power profile, 4x CPU, slow 4G), mobile on `/`, `/services/seo`, `/work/bankful`, `/pricing`, and desktop on `/`. Reports: `lighthouse-home.json`, `lighthouse-services-seo.json`, `lighthouse-work-bankful.json`, `lighthouse-pricing.json`, `lighthouse-home-desktop.json`.
- **Cross-checks** in `raw/`: a home rerun, a home run with the globe chunk blocked, DevTools-throttled runs (`--throttling-method=devtools`, 2x home, 1x `/services/seo`), and a CDP CPU profile of the home load at 4x throttle (`pw/profile.mjs`).
- **Caveat:** two other auditors were running on the same machine (load average 3.2–4.5). Simulated throttling multiplies observed CPU time by 4, so host contention inflates its TBT. Home mobile TBT ranged from 2,420 to 6,920 ms across simulated runs and 600 to 1,140 ms with DevTools throttling. The direction is the same in every run, but treat single numbers as ±50%.
- **TTFB:** locally the root document took 0–10 ms (prerendered, cache HIT). The ~455 ms TTFB in the LCP breakdown is Lighthouse's simulated RTT. Production TTFB will depend on the droplet and Cloudflare.

## Core Web Vitals status (lab)

| Page (mobile unless noted) | Perf | LCP | TBT (INP proxy) | CLS | LCP element | LCP render delay |
|---|---|---|---|---|---|---|
| `/` | 41 | **6.5 s** (rerun 7.4 s; DevTools 3.2 / 5.2 s) | **6,920 ms** (rerun 2,420; DevTools 1,140 / 600) | 0 | hero `h1.t-display` "We build what's next for your business." | 6,075 ms (93%) |
| `/` desktop | 88 | 1.4 s | 220 ms | 0 | hero line span (`div.gooey-text-reveal-line > span`) | 1,253 ms (91%) |
| `/services/seo` | 89 | 3.8 s (DevTools 1.6 s) | 40 ms (DevTools 90) | 0 (DevTools 0.027) | lead paragraph `header > div.reveal.t-lead` | 3,342 ms (88%) |
| `/work/bankful` | 88 | 3.8 s | 20 ms | 0 | title span `div.gooey-text-reveal-line > span` | 3,372 ms (88%) |
| `/pricing` | 88 | 4.0 s | 40 ms | 0 | title span `div.gooey-text-reveal-line > span` | 3,538 ms (89%) |

| Metric | Verdict |
|---|---|
| LCP | **fail** on home mobile (poor), needs improvement on inner pages under simulated throttling (good under DevTools throttling) |
| INP | not measurable in the lab. TBT proxy is **poor** on home mobile, good on inner pages |
| CLS | **pass** everywhere (0–0.027) |

## What works

- **CLS is effectively zero.** Reveal animations use opacity/transform, there are no `<img>` tags without dimensions (no `<img>` at all), and the fonts use `font-display: swap` (Lighthouse `font-display` passes).
- **No third-party scripts.** Lighthouse `third-party-summary` is empty: no analytics, tag manager or embed in this build.
- **No LCP resource load delay.** LCP is text in every case (0 ms load delay and load time), so the bottleneck is purely main-thread and animation timing, not the network.
- **Compression and caching are right:** gzip on HTML/JS/CSS, `immutable` on `/_next/static/*`, a single 17 KB-gz CSS file, and self-hosted fonts preloaded through a `Link` header.
- **Code-splitting already exists for the globe:** `HeroGlobe` is loaded with `next/dynamic({ ssr: false })` and only when WebGL is available (`src/components/home/Hero.tsx:12,94`).
- Total transfer is 773–1,109 KiB, under Lighthouse's budget warning.

## Findings

### High

**P1. LCP waits for hydration plus JS reveal animations on every page (render delay 88–93%).**
- Evidence: the LCP text is in the server HTML and visible at first paint (FCP 0.9–1.1 s mobile). Two mechanisms then repaint it after JS runs, so the browser records LCP at the *final* paint:
  1. `src/components/motion/SmoothScroll.tsx:21` adds `html.js` in a `useEffect` after hydration. `src/app/globals.css:461-464` then sets every `.reveal[data-reveal]` to `opacity: 0`, including the above-the-fold eyebrow, lead and CTA row in `src/components/ui/PageHeader.tsx:22-37`. `Reveal` (`src/components/motion/Reveal.tsx`) fades them back in over 600 ms after a 100–180 ms delay. Visible text goes visible → hidden → visible, and `/services/seo`'s LCP is that lead paragraph.
  2. Titles use `SplitHeading` / `GooeyTextReveal` (`src/components/motion/SplitHeading.tsx:29-34`, `src/components/home/Hero.tsx:55`). GSAP SplitText replaces the SSR'd text with new line spans and tweens `filter: blur()` for 1.4 s with a 0.12 s stagger, so the LCP element becomes the last-painted span (`div.gooey-text-reveal-line > span`).
- Impact: LCP ≈ hydration time plus animation length. That's 3.8–4.0 s on inner pages and 6.5–7.4 s on home under mobile simulation, against a 2.5 s target. Field LCP on mid-range Android will track this.
- Fix (smallest first):
  - In `Reveal.tsx`, call `show()` synchronously on mount without the transition when `inViewport()` is already true (the helper exists at lines 39-43). Better still, don't wrap the `PageHeader` eyebrow, lead and CTA in `Reveal` at all. Above-the-fold content should never be re-hidden.
  - For hero and page titles, keep the SSR'd text node as the painted element. Run the gooey/blur effect only on `(min-width: 768px)` and `prefers-reduced-motion: no-preference`, or animate a decorative overlay instead of replacing the text. Changes go in `src/components/ui/gooey-text-reveal.tsx` and `SplitHeading.tsx`.
  - Confirm with Lighthouse: the LCP render delay should fall to under 500 ms and LCP should land near FCP (~1 s).

**P2. Homepage main thread is blocked for seconds on mobile (TBT 0.6–6.9 s, TTI 8.5–12.9 s).**
- Evidence: `lighthouse-home.json` shows `bootup-time` 12.8 s (script evaluation 12.7 s), 8 long tasks, and a top task of 3,727 ms in the React chunk `1c2x89ifpsy6o.js`. DevTools-throttled runs show long tasks in the GSAP chunk `08fuq6t-um5cq.js` (566 ms), React (390 ms) and the three.js globe chunk `3qr5o4ho9f7gv.js` (150 ms). DOM size is 3,196–3,261 elements (Lighthouse flags above ~1,400). Inner pages have TBT of 20–90 ms, so the cost is homepage-specific.
- Attribution: blocking the globe chunk did **not** remove the problem (simulated TBT 4,420 ms with it blocked, vs 2,420–6,920 ms without), so it's spread across hydrating a 3.2k-node tree, GSAP/SplitText/ScrollTrigger setup, Lenis, and the globe's synchronous `buildScene` (`src/components/home/HeroGlobe.tsx:707`, `useMemo`). `buildScene` rasterises the land mask on a canvas and calls `getImageData` (`src/components/home/globe/land.ts:47-71`) on the main thread.
- Fix:
  - Mount `HeroGlobe` after first idle (`requestIdleCallback`, or after the hero animation finishes). Skip it on `navigator.connection.saveData` and on small screens, where the static `GlobePoster` already exists (`Hero.tsx`).
  - Precompute the land-dot positions at build time (a static JSON `Float32Array`) instead of rasterising per visit in `land.ts`.
  - Lazy-load the concierge: `src/components/home/AiChapter.tsx:1` imports `Concierge` statically, which pulls the AI SDK + zod chunk `35460etgk_45c.js` (348 KB raw / 93 KB gz, 74 of 91 KiB unused at load) into the home bundle. Use `next/dynamic(() => import("@/components/ai/Concierge"))` and render it when the section nears the viewport.
  - Cut DOM: the header renders both a 59-link "Primary" nav and a hidden 59-link "Mobile" nav on every page (`src/components/layout/HeaderBar.tsx:219`). Render the mobile panel only when opened (`open &&`), keeping the trigger's `aria-controls` target mounted if needed.
  - Recheck with `lighthouse --throttling-method=devtools`. The target is TBT < 200 ms on home mobile.

### Medium

**P3. Heavy client JavaScript for a marketing site.**
- Evidence: the home HTML references 17 JS chunks totalling 1.39 MB raw / 437 KB gz (`raw/home-assets.txt`). Lighthouse "Reduce unused JavaScript" estimates 321 KiB savings on home and 252–278 KiB on inner pages. Two animation stacks ship together: `gsap` + `@gsap/react` (most of the 08fuq chunk, 188 KB raw) and `motion` (imported by `stats-counter`, `why-us-bento`, `spotlight-navbar`, `research-bento-grid` and `agent-bento-grid` in `src/components/ui/`), plus `lenis` and, lazily, `three`. On inner pages the 91 KiB AI-SDK chunk and a 70 KiB three/motion chunk are fetched as idle route prefetches for the header's `/` and `/contact` links. They never show up in bootup time, so it's bandwidth, not main-thread cost.
- Fix: consolidate on one animation library (GSAP is already needed for SplitText/ScrollTrigger, so move the `motion` usages to CSS or GSAP), and do the lazy-loading in P2. Track with `npx @next/bundle-analyzer` or Lighthouse `unused-javascript`.

### Low

**P4. Both variable fonts are preloaded on every page.** The `Link` header preloads `Geist_Variable` (69.6 KB) and `GeistMono_Variable` (71.3 KB). Mono is used only in below-the-fold components (bento grids, footer, globe labels, `src/components/ui/agent-bento-grid.tsx`, `animated-footer.tsx`), so its preload competes with the critical path. Fix: load the mono face without preload (`next/font/local` with `preload: false` instead of `geist/font/mono`'s preset), or drop it from the root layout's `className` and apply it only where used.

**P5. 13 KiB of legacy JavaScript polyfills** (Lighthouse `legacy-javascript`). Fix: set a modern `browserslist` in `package.json` (for example `"defaults and fully supports es6-module"`).

**P6. Non-composited animations** (5–17 elements per page: `.reveal` transitions, `section#hero .rays__flow`). These don't cause CLS here. Animating only `transform` and `opacity` (no `filter: blur` on large text) keeps them on the compositor and helps INP on low-end devices.

### Info

- Images: there are no `<img>` elements on any page, so no oversized-image or missing-dimension issues. The generated OG PNGs are ~230 KB, which is fine for social scrapers. `images.formats: ["image/avif","image/webp"]` in `next.config.ts` is ready for when photos arrive.
- HTML documents are 150–310 KB raw / 27–49 KB gz (about 96 KB of inline RSC payload on home). That's acceptable. It shrinks if the duplicated mobile nav (P2) is removed.
- Once live and receiving traffic, check field data in CrUX Vis or PSI (PHONE form factor), and monitor INP specifically, since TBT is only a proxy.
