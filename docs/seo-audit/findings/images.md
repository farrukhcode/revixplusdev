# Images: revixplus.com

**Score: 80 / 100**

Scope:
- Every `<img>`, `<picture>`, `<video>`, `<canvas>` and inline `<svg>`, plus inline-style `background-image`, on the 59 sitemap URLs (server HTML).
- All 59 `og:image` and `twitter:image` URLs, fetched and decoded for status, MIME type, pixel size and bytes.
- The Organization logo, favicon, apple-touch icon and manifest icons.
- Method follows `skills/seo-images/SKILL.md`. OG files were saved to `$SP/onp/og/`.

## Inventory

| Metric | Count |
|---|---|
| `<img>` / `<picture>` / `<video>` elements | **0 / 0 / 0** on all 59 pages |
| Inline `<svg>` | 3,660 across the 59 pages, **all `aria-hidden="true"`** (0 unlabeled, 0 `role="img"`) |
| `<canvas>` | 1 (homepage hero chapter), inside an `aria-hidden="true"` wrapper |
| Raster CSS backgrounds | 0 (inline `background-image` values are all gradients or dot patterns) |
| Links whose only content is an icon and that lack an accessible name | 0 |
| `og:image` URLs | 59 unique, 59 return 200 `image/png` at 1200x630, 207 to 238 KB |
| Missing alt / oversized (>200 KB content image) / missing dimensions / LCP image lazy-loaded | n/a: there are no content images |

The hero LCP element on every audited template is text (the H1), not an image. No image affects LCP or CLS today.

## What works

- **Decorative graphics are correctly hidden from assistive tech and crawlers.** Icons (lucide), diagrams, the globe canvas and the bento illustrations are all `aria-hidden`. Icon-only controls carry an `aria-label`, for example the header logo link `aria-label="RevixPlus home"`.
- **The OG cards are per-URL, correctly sized and on-message.** Each is generated at build time from the page's own eyebrow, title and summary (`src/lib/og.tsx`, `src/app/**/opengraph-image.tsx`). All 59 are 1200x630 PNG and between 207 and 238 KB, comfortably below the platform limits. Spot-checked visually: `/services/web-development` and `/work/difacto` render brand, eyebrow, H1-level title and a summary.
- **`og:image:width`, `og:image:height`, `og:image:type` and `og:image:alt` are emitted for every page**, and `twitter:image` mirrors `og:image`.
- **The Organization logo `https://revixplus.com/brand/revixplus-logo-512.png` meets Google's logo guidelines:** 200, 512x512 PNG, 4.4 KB, solid mark on a flat background, legible on white.
- **The icon set is complete and resolves:** `/favicon.ico` (48), `/icon.svg`, `/apple-icon.png` (180), and manifest icons 192, 512 and a maskable 512, all 200.
- **The image pipeline is ready:** `next.config.ts` enables `formats: ["image/avif", "image/webp"]`. `DeviceCard` already switches to `next/image` (`fill` plus a `sizes` attribute) when a screenshot exists. `scripts/screenshot-sites.mjs` generates `public/work/<slug>.webp`.

## Findings

### MEDIUM: All 14 case studies show a gradient placeholder instead of a product screenshot

- **Evidence:** No case study sets `image` (`src/content/types.ts:100`, `image?: string`, "Optional until screenshots exist"), and `public/work/` does not exist. Every `DeviceCard` therefore renders the fallback, a gradient panel with the client name in text (`src/components/ui/DeviceCard.tsx:27-33`).
  - This affects the case-study heroes (`src/app/work/[slug]/page.tsx:75`), the `/work` grid, the homepage Work chapter, and the "Related work" cards on service and industry pages.
  - Screenshot `screenshots/case-desktop-fold.png` shows the DiFacto hero: a blank gradient card reading "DiFacto / Construction SaaS".
- **Impact:** Case studies are the site's experience proof. With no real visuals there is nothing for Google Images or Discover to show, nothing to put in an `Article.image` beyond the generated card, and the work looks less real to buyers.
- **Fix:**
  1. Run `pnpm screenshots --write` (`scripts/screenshot-sites.mjs`) for the 12 studies that have a `liveUrl`. Supply designed screenshots for the 2 without one (`hrms-saas`, `hosting-platform`).
  2. When the images land:
     - Make the alt describe what is shown, not just "screenshot". The current template `alt={`${study.client} screenshot`}` (`DeviceCard.tsx:22`) would produce "DiFacto screenshot". Prefer `${study.client} ${study.industry.toLowerCase()} interface: ${study.title}`, or a per-study `imageAlt` field.
     - On the case-study hero instance only (`src/app/work/[slug]/page.tsx:75`), pass `fetchPriority="high"`, and keep the grid cards lazy (the `next/image` default). Next 16 deprecates `priority` in favour of `preload`, and its docs prefer `fetchPriority="high"` or `loading="eager"` (`node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md:266-294`).
     - Use descriptive file names: `/work/difacto-invoice-review-queue.webp` rather than `/work/difacto.webp`.

### LOW: The dynamic OG images share one generic alt per template (52 pages)

- **Evidence:** All 31 service pages have `og:image:alt="RevixPlus service"`, all 7 industries have `"RevixPlus industry"` and all 14 case studies have `"RevixPlus case study"`. The 7 static routes have specific alts, e.g. `/pricing` uses "RevixPlus pricing: fixed-price packages and monthly retainers".
- **Source:** `export const alt = …` in `src/app/services/[slug]/opengraph-image.tsx:5`, `src/app/industries/[slug]/opengraph-image.tsx:5` and `src/app/work/[slug]/opengraph-image.tsx:5`.
- **Fix:** Replace the constant with `generateImageMetadata({ params })`, returning `[{ id: "og", alt: `${w.client} case study: ${w.title}`, size, contentType }]` per slug. This API is documented in the bundled Next docs (`01-app/03-api-reference/04-functions/generate-image-metadata`). It changes the image URL to `…/opengraph-image/og`, which Next wires into the metadata automatically.

### LOW: OG PNGs are about 225 KB each

- **Evidence:** 59 PNGs between 207 and 238 KB (average about 228 KB). Each is a gradient-heavy photo-like card, the kind of image JPEG compresses far better than PNG.
- **Impact:** None on rankings. It is slightly slower for social scrapers and chat-app unfurls.
- **Fix:** Optional. In `src/lib/og.tsx`, keep PNG (simplest, broadest support) or switch the `ImageResponse` output to JPEG if the size matters. No action is needed for SEO.

### INFO: OG images are served with `Cache-Control: public, max-age=0, must-revalidate`

- **Evidence:** This header appears on all 59 OG image responses, even though each URL carries a content hash (`?6712f269d30b97fe`).
- **Impact:** None for SEO. Social crawlers cache the image themselves.
- **Fix:** Leave it, or set a long `Cache-Control` for `/:path*/opengraph-image` in `next.config.ts` `headers()`.

### INFO: No image sitemap is needed today

- There are no content images to submit. Revisit after the case-study screenshots ship; `next/image` URLs under `/_next/image` are not worth listing. Put the screenshots under stable `/work/*.webp` paths so they can be referenced from `Article.image` (see schema.md).
