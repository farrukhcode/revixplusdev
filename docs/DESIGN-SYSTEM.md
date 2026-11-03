# Design System

Two complete themes, one set of semantic tokens, solid readable surfaces, and components from [VengeanceUI](https://www.vengenceui.com) for buttons and interactive pieces. Everything is defined in `src/app/globals.css`; no component uses a raw color.

Replaces the earlier Liquid Glass system. Translucent cards over an animated aurora were hard to read and repainted on every scroll frame, so cards are now solid and the background is static.

## 1. Themes

`.dark` on `<html>` switches themes. An inline script in `src/app/layout.tsx` sets it before first paint: a saved choice (`localStorage.theme`) wins, then the OS setting. The toggle in the header (`ThemeToggle`) flips the class and saves the choice. Tailwind's `dark:` variant is bound to the same class (`@custom-variant dark`).

## 2. Color tokens

Names follow shadcn, so registry components theme themselves. Use the Tailwind utility (`bg-card`, `text-muted-foreground`, `border-border`) or the variable (`var(--violet)`) in arbitrary values and inline styles.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--background` | `#f6f6fb` | `#0a0a12` | Page |
| `--card` | `#ffffff` | `#12121d` | Every card (`Surface`) |
| `--muted` | `#efeff6` | `#1a1a28` | Chips, inputs, hover fills |
| `--border` / `--border-strong` | `#e2e2ec` / `#c9c9da` | `#262637` / `#3a3a55` | Hairlines / outlines |
| `--foreground` (`text-fg`) | `#0d0d1a` | `#f4f4fa` | Headings, primary text |
| `--muted-foreground` (`text-fg-2`) | `#45455e` | `#b4b4ca` | Body, leads |
| `--subtle-foreground` (`text-fg-3`) | `#64647e` | `#8e8ea8` | Captions, meta |
| `--primary` / `--primary-foreground` | `#5b34f0` / white | `#7050ff` / white | Primary buttons, user chat bubbles |
| `--ring` | `#5b34f0` | `#a48bff` | Focus outline |

Brand spectrum. Dark values are electric; light values are deepened so each passes 4.5:1 as text on light surfaces.

| Token | Light | Dark |
|---|---|---|
| `--violet` | `#6d45f5` | `#a48bff` |
| `--cyan` | `#08788c` | `#22e1f0` |
| `--blue` | `#2459e0` | `#4c8dff` |
| `--lime` | `#4a7a0c` | `#b8f53d` |
| `--pink` | `#c0157a` | `#ff4fb0` |
| `--orange` | `#a84b06` | `#ff9a3d` |

Contrast on `--background`: foreground about 18:1, muted about 9:1, subtle above 5:1, in both themes.

Rules:

- Text on an accent fill (pillar tiles, case-study posters) uses `text-background`: dark on the electric dark-theme accents, light on the deep light-theme accents.
- Content accents (`accent` in `src/content/site.ts` and `src/content/work/*.ts`) are token references like `"var(--violet)"`, never hex.
- `viewport.themeColor` in `layout.tsx` mirrors `--background` by hand; meta tags can't read CSS variables.

## 3. Surfaces

| Class / component | What |
|---|---|
| `Surface` (`.surface`) | The card. Solid `--card`, `--border`, `--shadow-card`. Props: `muted`, `specular` (on by default: pointer-following glow plus a rainbow edge that lights only the stretch of border near the cursor (the spectrum is centered on the card, so it flows as a gradient along an edge); pass `specular={false}` to opt out), `interactive` (lift and violet border on hover, press feedback). |
| `.glass` | Floating chrome only: header pill, mobile menu, mobile dock. Light blur over static content. |
| `.chip` | Pills for tags and suggestions. Wraps when long so phones never scroll sideways. |
| Backdrop | `body::before/::after`: two static brand glows and a faint grid, fixed, never animated. |

Component classes live in `@layer components`, so utilities (`text-violet`, `lg:sticky`, `border-violet/60`) override them.

## 4. VengeanceUI components

Installed with the shadcn CLI from the `@vengeanceui` registry in `components.json` (`pnpm dlx shadcn@latest add @vengeanceui/<name>`). The source is copied into `src/components/ui/` and is ours to edit. Adaptations are noted at the top of each file: theme tokens instead of hard-coded colors, `motion/react` instead of `framer-motion`, no styled-jsx, polymorphic `as` for links.

| Component | Used for |
|---|---|
| `interactive-hover-button` | Every other button (through `Button`) |
| `border-beam` | Highlight on featured cards: concierge, "Most requested" price, CTA band, first CTA door |
| `faq-accordion` | Every FAQ (through `FaqList`, which adds FAQPage schema) |
| `stats-counter` | Animated numbers (home numbers, growth panels, about) |
| `spotlight-navbar` | Header navigation, active page from the pathname |
| `radial-glow-button` | Every primary action (`Button variant="primary"`); styles and `--glow-*` tokens in globals.css. Secondary actions use `interactive-hover-button` (color fill). Buttons never move on hover. |
| `animated-rays` | Hero backdrop, top right behind the globe; quarter-resolution layer scaled up, paused offscreen |
| `gooey-text-reveal` | Hero headline (once, on load) and every `SplitHeading`: section headings melt in as they scroll into view and melt back out when you scroll back above them; page titles reveal once. The SVG filter is only on while animating, so resting text is crisp. |
| `perspective-grid` | Backdrop of the closing "Start a project" section; tiles light under the cursor |
| `agent-bento-grid` | Home "AI, integrated": how our agents work (request flow, models, n8n run, RAG, MCP scopes); no metrics |
| `why-us-bento` | Home "Why us" (replaced the numbers band; the stats live in its violet panel). Copied from the VengeanceUI repo source, not the registry |
| `research-bento-grid` | Pricing: the Dedicated Developer retainer (stack, invoice from pricing.ts, scaling) |
| `staggered-grid` | /work centerpiece: token-gradient posters per case study (no photos needed) around a facts bento |
| `mega-menu-navbar` | Header Services and Work panels plus the mobile drawer, alongside the spotlight navbar |
| `animated-footer` | Footer flourish: "RevixPlus" over an ASCII horizon that lights under the cursor; draws only while hovered |

Heads-up when adapting new ones: the theme remaps `rounded-md`, `rounded-lg` and `rounded-xl` to 16, 24 and 32px, so copied markup comes out rounder than the demo; use explicit radii where it matters. Do not reintroduce `framer-motion`, `next-themes` or `react-icons`; they were removed.

Use `Button` (`src/components/ui/Button.tsx`) rather than the raw components: it renders a `Link`, an `<a>` or a `<button>` from one API and handles sizes and wrapping.

## 5. Typography

Geist Sans and Geist Mono from the `geist` package. Classes: `.t-display`, `.t-h1` to `.t-h4`, `.t-lead` (muted), `.t-body`, `.t-small`, `.t-eyebrow` (violet, uppercase, tracked). Tracking tightens as size grows.

## 6. Shape and motion

Radii: `--r-sm` 12px, `--r-md` 16px, `--r-lg` 24px (cards), `--r-xl` 32px, `--r-pill`. Easing: `--ease-out` for enter and exit, `--ease-in-out` for movement; UI transitions stay at or under 300ms.

Snapping: horizontal chapters glide to the nearest card once scrolling settles (only while pinned); reveals land with a slight overshoot; the testimonial carousel snaps per card. In horizontal chapters a card stays fully opaque until it reaches the clip edge beside the heading, then fades only while it slides out past it.

Performance rules that keep scrolling smooth:

- Never animate `filter: blur()` or anything under a `backdrop-filter`.
- No `content-visibility: auto` on sections: it changes heights after GSAP measures pins.
- Scroll-linked tweens use `scrub: true`; Lenis already smooths the input.
- Never push per-frame scroll values through React state; write to the DOM (see `ScrollProgress`).
- The hero globe (`HeroGlobe.tsx`: map from `world-atlas`, data centers, satellites, AI processor) stops rendering when off screen and holds a still frame for reduced motion. Its colors are read from the tokens and rebuilt on theme change; drag, hover and click work in both.

## 7. Accessibility

- `prefers-reduced-motion`: reveals don't translate, border beams stop, the globe freezes, the tour never starts on its own (it only plays from its button).
- `prefers-reduced-transparency`: `.glass` becomes solid.
- `prefers-contrast: more`: borders switch to `--border-strong`.
- Focus: 2px `--ring` outline, 3px offset, on every interactive element.

## Logo

An R built from four modules; the gutter between them is the Plus. Revix Violet (`--primary`) on both themes, wordmark in the text colour. `Logo` and `Wordmark` live at the bottom of `src/components/layout/HeaderBar.tsx`; files, colours, clear space and don'ts are in `docs/BRAND.md`.
