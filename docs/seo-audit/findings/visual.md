# Visual / Mobile: revixplus.com

**Score: 86 / 100**

Method:
- Captures used playwright-core with system Chrome, headless, light color scheme (the browser default), against `http://localhost:3100`. Scripts are `$SP/pw/audit-visual.mjs`, `audit-visual2.mjs` and `audit-sweep.mjs`.
- Desktop captures used a 1920x1080 viewport (skill default). Mobile captures used 390x844 with `isMobile`, `hasTouch` and DPR 3.
- Four templates were captured: `/`, `/services/web-development`, `/work/difacto` and `/pricing`.
- Each page was measured in the browser for: H1 position, CTA visibility in the first viewport, `scrollWidth` versus viewport, interactive elements under 48px and under 24px, computed font size of every visible text node, fixed elements, and JS errors.
- A second sweep loaded **all 59 sitemap URLs at 390px** to check horizontal overflow, H1 position and page errors.

Screenshots are in `$SP/revixplus.com-audit/screenshots/`:
- `{home,service,case,pricing}-{desktop,mobile}-fold.png`: the first viewport.
- `…-full.png`: the full page, scrolled through first so reveal animations have fired.
- `case-mobile-results.png`, `case-mobile-bottom.png`, `home-mobile-process.png` and `home-mobile-dark-fold.png`.
- `visual-report.json`: the raw measurements.

## Above-the-fold summary

| Page | Viewport | H1 in first viewport (top to bottom px) | Primary CTA visible |
|---|---|---|---|
| `/` | desktop | yes (266 to 650) | "Start a project" and "Watch the story", plus the header CTA |
| `/` | 390 | yes (166 to 298) | "Start a project" and "Watch the story", plus the header CTA and the dock |
| `/services/web-development` | desktop | yes (235 to 382) | "Get an estimate" |
| `/services/web-development` | 390 | yes (228 to 339) | "Get an estimate", plus the "from $8,000 · 4 weeks" price chip |
| `/work/difacto` | desktop | yes (235 to 382) | "Visit live site" and "Build something like this" |
| `/work/difacto` | 390 | yes (203 to 314) | "Visit live site" and "Build something like this" |
| `/pricing` | desktop | yes (235 to 309) | "Get a quote" on the first three cards, plus the header CTA |
| `/pricing` | 390 | yes (203 to 277) | Header "Start a project" and the dock (the card CTAs are below the fold) |

## What works

- **No horizontal overflow anywhere.** `scrollWidth` equals the viewport width on all 8 captures, and the 390px sweep found **0 of 59 URLs** overflowing.
- **The H1 is in the first mobile viewport on all 59 URLs.** The highest H1 bottom edge measured was well within 844px.
- **No JavaScript errors** on any audited page, and none in the 59-URL sweep.
- **The value proposition is clear above the fold:** a large H1 (44px on mobile, 96px on desktop on the homepage), a one-sentence lead, and a primary plus secondary CTA. Service pages show the starting price and timeline in the first screen, a strong qualifier.
- **Mobile navigation works.** The compact header has the logo, theme toggle, "Start a project" and a hamburger. A fixed bottom dock (366x72) offers Start, Book a call and WhatsApp. The footer has `pb-28` (112px), so the last footer line ("© 2026 RevixPlus", bottom edge at 731px) clears the dock (top edge at 760px) at the end of the page; nothing is permanently hidden.
- **Zoom is allowed.** The viewport meta is `width=device-width, initial-scale=1, viewport-fit=cover`, with no `user-scalable=no` or `maximum-scale`.
- **The type is legible.** Body copy is 17px (`t-body`), lead copy 18px and section headings 24 to 36px on mobile. Light and dark themes both render with strong contrast (`home-mobile-dark-fold.png`).
- **The primary tap targets are large.** The hero CTAs are roughly 190x50 CSS px on mobile, and the dock items are about 120x72.

## Findings

### MEDIUM: The case-study hero visual is a placeholder card

- **Evidence:** The first-screen visual on every `/work/*` page is a gradient "device" with only the client name and industry. In `case-desktop-fold.png` it occupies the left half of the second band (y 610 to 1030). On mobile its top edge is at about 630 CSS px, inside the first viewport (`case-mobile-fold.png`).
- **Impact:** This is the most prominent proof element on the page, and it shows no product.
- **Fix:** Covered in images.md: add screenshots through `scripts/screenshot-sites.mjs` and `DeviceCard`'s existing `next/image` branch (`src/components/ui/DeviceCard.tsx:19-26`).
- **Related:** the "Pending" result cards (`case-mobile-results.png`) are reported in onpage.md.

### LOW: Decorative diagram and chip text renders at 9 to 11px on mobile

- **Evidence:**
  - Homepage (mobile): 29 characters at 9px, the bento process labels "Discover / Design / Build / Launch / Grow". Source: `src/components/ui/why-us-bento.tsx:206` (`text-[9px] … xl:text-[10px]`).
  - Homepage (desktop): the same labels at 10px.
  - `/pricing` (mobile): 56 characters at 10px, the tech chips "Next.js, GitHub, Docker, Coolify, Cloudflare, Shopify, n8n, Claude API". Source: `src/components/ui/research-bento-grid.tsx:190` (`text-[10px] … sm:text-[11px]`).
  - Other 9px labels: `src/components/ui/agent-bento-grid.tsx:43,302,406,440` and `src/app/work/page.tsx:34` (10px).
- **Impact:** These labels are inside illustrations, not body copy, so there is no SEO impact. They are hard to read on phones.
- **Fix:** Raise these labels to at least 11px on mobile (`text-[11px] sm:text-[11px]`), or mark the purely decorative ones `aria-hidden`.

### LOW: Text links fall below the 48px touch-target guideline

- **Evidence:** On 390px pages, 77 to 109 visible interactive elements per page are under 48px in one dimension, and 23 to 35 are under 24px tall. All of the under-24px ones are text links:
  - footer links: 18px tall, for example "LinkedIn" 55x18 and "Web development" 118x18
  - breadcrumb links: 21px tall
  - `/pricing` "About this service" links: 118x21
  - "Further reading" links on service pages: 21px tall

  Footer links sit on a roughly 35px vertical pitch, and breadcrumb links are separated by chevrons. That likely satisfies the spacing exception of WCAG 2.2 SC 2.5.8 (24px), but not the 48px guideline the skill checks against.
- **Fix:** Add vertical padding to footer and breadcrumb links so the hit area is at least 44 to 48px while the visual stays the same. For example, `py-3 -my-3` or `inline-block py-2.5` on the `<a>` in `src/components/layout/SiteFooter.tsx` and `src/components/ui/Breadcrumbs.tsx`.

### INFO: The fixed mobile dock covers the bottom 84px of the viewport

- **Evidence:** The dock is `div.fixed inset-x-3 bottom-3 z-40 md:hidden`, 366x72 plus a 12px offset, so it covers about 10% of an 844px screen. In the first viewport it overlaps the price chip on service pages and the first pricing card's feature list (`service-mobile-fold.png`, `pricing-mobile-fold.png`).
- **Impact:** It is a persistent navigation bar, not an interstitial, so Google's intrusive-interstitial guidance does not apply. The content scrolls clear of it.
- **Fix:** No change is needed. Optionally, hide the dock until the user scrolls past the hero (the header CTA already covers the first screen).

### INFO: The homepage is very long

- **Evidence:** The document is 18,607px tall on desktop and 14,173px on mobile, across 10 chapters with an optional auto-tour ("Watch the story").
- **Impact:** All chapters are server-rendered text, so they are crawlable. This is a UX note only: key proof (Work, Process) sits several screens down. The chapter rail (desktop) and the "Watch the story" control mitigate it.
