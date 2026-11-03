# On-Page SEO: revixplus.com

**Score: 70 / 100**

Scope: all 59 URLs in `/sitemap.xml`, fetched from the production Docker build at `http://localhost:3100` (server-rendered HTML, fetch mode) and parsed with the skill's `parse_html.py`, `metadata_template.py` and a BeautifulSoup pass for heading order, links and visible text (`$SP/onp/analyze.py`). Every internal link target (63 unique URLs) was requested and checked for its status code. `/legal/*` is not in the sitemap and is excluded.

Severity scale (seo-audit skill): Critical blocks indexing or causes penalties · High significantly affects rankings · Medium is an optimization opportunity · Low is backlog · Info needs no action.

## What works

- **Every page has one `<title>`, one meta description and exactly one H1.** All titles and all descriptions are unique (59/59). There are no duplicate H1s between pages.
- **Canonicals point to the page itself on all 59 URLs.** `og:url` matches the canonical everywhere. Parameterised entry points collapse correctly: `/contact?topic=seo` has the canonical `https://revixplus.com/contact`.
- **`<meta name="robots" content="index, follow">`, `<html lang="en">` and one `<main>`** are present on every page.
- **Open Graph and Twitter tags are complete on every page:** `og:title`, `og:description`, `og:url`, `og:type` (`article` on case studies, `website` elsewhere), `og:image` with type, width, height and alt, `twitter:card=summary_large_image`, plus Twitter title, description and image. All 59 `og:image` URLs return 200 `image/png` at 1200x630 (details in images.md).
- **No broken internal links.** All 63 unique internal targets return 200.
- **No orphan pages.** Every sitemap URL is linked from at least 2 other pages, and 53 of 59 are linked from all 58 others through the mega-menu and footer.
- **Anchor text is descriptive almost everywhere.** No links have an empty accessible name. Cards link with the service or case-study title. The only repeated generic anchor is listed below.
- **Body copy is substantial:** service pages have 843 to 1,393 words, industry pages 688 to 862, case studies 507 to 672 and the homepage 1,832.
- **The URLs are clean:** short, lowercase, hyphenated and free of parameters.
- **Metadata is not templated.** `metadata_template.py` over all 59 title and description pairs returned `templated_count: 0` and `site_risk: low`.

## Findings

### HIGH: The brand is appended twice to 41 titles (`| RevixPlus | RevixPlus`)

- **Evidence:** All 31 `/services/*`, all 7 `/industries/*` and 3 case studies (`/work/difacto`, `/work/his-energy`, `/work/hockeystore`). Example from `/services/wordpress-development`:
  `<title>WordPress Development Agency | Custom Themes, Bricks, Elementor, WPML | RevixPlus | RevixPlus</title>` (93 chars)
- **Root cause:** The root layout applies `template: "%s | RevixPlus"` (`src/app/layout.tsx:19`). Those 41 `seoTitle` strings already end in ` | RevixPlus`:
  - `src/content/services/*.ts:9` (all 31)
  - `src/content/industries.ts:8,60,112,163,215,267,319`
  - `src/content/work/difacto.ts:32`, `his-energy.ts:31`, `hockeystore.ts:31`

  The other 11 case studies leave the suffix out and render correctly. `og:title` and `twitter:title` are not run through the template, so they carry the brand only once.
- **Impact:** The brand repeats in the SERP and pushes 41 titles past the truncation point. A broken-looking title is also more likely to be rewritten by Google.
- **Fix:** Pick one of two:
  - Strip the suffix from all 41 `seoTitle` values.
  - Normalise once in `src/lib/seo.ts` `pageMetadata()`, so every caller is covered: `const clean = title.replace(/\s*\|\s*RevixPlus$/, "")`. Use `clean` for `title` and add the brand back only on `openGraph.title` if you want it there.

### HIGH: Placeholder text "TODO: confirm" is shown on 16 indexable pages, including the homepage

- **Evidence:** The visible text (scripts excluded) contains the literal string `TODO: confirm`:
  - On `/`, `/industries/ecommerce`, `/services/ecommerce-development`, `/services/email-marketing-automation`, `/services/playable-ads-web-games`, `/services/shopify-development` and `/services/ui-ux-design`, it appears in the case-study card's location slot. Example: `<p class="t-eyebrow">E-commerce, beauty marketplace</p><p class="t-small text-fg-3">TODO: confirm</p>`
  - It appears on 9 case studies. On `indibe`, `medallion-dusk`, `his-energy`, `hockeystore` and `sushi2500` it is in the page's own Location or Timeline facts. On `bankful`, `meeshan-luxe-home`, `the-vitamin-company` and `thetoys` it comes only from the "More like this" cards. `/work/medallion-dusk` shows it 4 times.
- **Source:**
  - `src/content/work/indibe.ts:8,11`
  - `src/content/work/medallion-dusk.ts:8,11`
  - `src/content/work/his-energy.ts:11`
  - `src/content/work/hockeystore.ts:11`
  - `src/content/work/sushi2500.ts:11`

  The string is rendered by `src/components/ui/DeviceCard.tsx:47` and the `Fact` rows in `src/app/work/[slug]/page.tsx:79-81`.
- **Impact:** Unfinished copy on the homepage and on proof pages is a page-quality and trust signal (E-E-A-T) that both users and raters see.
- **Fix:** Fill in the real values. If a value is unknown, make the field optional and hide the row: in `DeviceCard.tsx:47` and the `Fact` component, render nothing when `value.startsWith("TODO")`. Use the same guard the Results block already uses at `src/app/work/[slug]/page.tsx:143`.

### MEDIUM: 28 titles stay over 60 characters even after the duplicate brand is removed

- **Evidence:** The longest after de-duplication:
  - `/services/wordpress-development`: 81 chars
  - `/services/ui-ux-design`: 77
  - `/services/shopify-development`: 76
  - `/services/ecommerce-development`: 74
  - `/services/mobile-app-development`: 72, with three pipe-separated segments: "Mobile App Development Agency | iOS & Android | React Native | RevixPlus"
  - `/services/paid-advertising`, `/industries/ecommerce`: 71
  - `/services/security-compliance`, `/services/game-development`: 70

  Ten service titles use 3 or more `|` separators. Eight case studies are 62 to 68 chars because they keep the full " Case Study: …" pattern plus the suffix. Hub pages: `/services` is 62, `/pricing` 63 and `/about` 66 ("About RevixPlus: … | RevixPlus" names the brand twice).
- **Fix:** Put the primary query first and keep titles to 60 characters or fewer, including ` | RevixPlus` (12 characters). Drop the tech-list segment, which the H1, description and body already cover. Examples:
  - "WordPress Development Agency | RevixPlus" (40)
  - "Shopify Development Agency & Shopify Plus | RevixPlus" (53)
  - "Mobile App Development: iOS & Android | RevixPlus" (49)

  Edit the `seoTitle` fields in `src/content/services/*.ts`, `src/content/industries.ts` and `src/content/work/*.ts`, and the `title` in `src/app/{services,pricing,about}/page.tsx`. For `/about`, use "About Us: One Team for Software, AI and Growth".

### MEDIUM: Six hub meta descriptions run over 160 characters

- **Evidence:**
  - `/services`: 237 chars
  - `/pricing`: 202
  - `/work`: 200
  - `/about`: 190
  - `/` (homepage): 186
  - `/process`: 174

  All 53 other pages are between 142 and 160.
- **Source:** `src/content/site.ts:7-8` (homepage, via `src/app/page.tsx:21`), and `src/app/services/page.tsx:18`, `src/app/work/page.tsx:13`, `src/app/process/page.tsx:15`, `src/app/pricing/page.tsx:21`, `src/app/about/page.tsx:19`.
- **Fix:** Cut each to 150 to 160 characters and lead with the differentiator. Note that `site.description` also feeds the Organization schema and the manifest, so it can stay long if you pass a separate short `description` to `pageMetadata` in `src/app/page.tsx`. Example for `/services`: "AI integration, web and mobile apps, e-commerce, games, SEO, social and DevOps from one senior team. Fixed-price builds and monthly retainers." (148)

### MEDIUM: Hub-page H1s are slogans with no topical terms

- **Evidence:**
  - `/` H1: "We build what's next for your business."
  - `/work`: "Proof, not promises."
  - `/pricing`: "Starting prices, in the open."
  - `/process`: "A process you can see from day one."
  - `/contact`: "Let's write your next chapter."

  The `/work` and `/contact` H1s repeat homepage H2s word for word. The keywords exist only in the eyebrow `<p>` ("PRICING", "AI · WEB · MOBILE · GAMES · GROWTH") and in the title.
- **Fix:** Keep the slogans as display text but work the topic into the H1. One way: render the eyebrow inside the H1 as a visually separate span, e.g. `<h1><span class="t-eyebrow">Pricing</span> Starting prices, in the open.</h1>`. Another: rewrite the H1, e.g. "Software, AI and growth agency: we build what's next for your business."
- **Files:** `src/components/home/Hero.tsx:56` (via `src/content/home.ts`), `src/app/work/page.tsx:93`, `src/app/pricing/page.tsx:80`, `src/app/process/page.tsx:25`, `src/app/contact/page.tsx:25`.

### MEDIUM: Industry pages get no contextual internal links, and their breadcrumb points to `/services`

- **Evidence:**
  - None of the 7 `/industries/*` URLs is linked from any page's `<main>` content. They are reached only through the mega-menu and footer (58 inlinks each, 0 contextual).
  - The breadcrumb, both visible and in the JSON-LD, reads "Industries" but links to `/services`: `<a href="/services">Industries</a>`. `/services` has no industries section, and `/industries` returns 404.
  - Source: `src/app/industries/[slug]/page.tsx:53-56`, `{ name: "Industries", path: "/services" }`.
  - `/process` and `/about` also have 0 contextual inlinks.
- **Fix:**
  - Add a small `/industries` index page (`src/app/industries/page.tsx`) listing the 7 industries, and point the crumb at it.
  - Link each industry from relevant service pages (for example, healthcare-ai-automation to `/industries/healthcare-rcm`) and from the matching case studies (`industry` field to industry slug).
  - If you don't want a hub page, remove the middle crumb so the trail is Home > Fintech & Payments.

### MEDIUM: Every case study shows "Pending" results (35 of 42 metric cards)

- **Evidence:** All 14 case studies render result cards reading "Pending … Figure awaiting client approval." Eight have all three pending: `difacto`, `his-energy`, `hockeystore`, `indibe`, `medallion-dusk`, `revixmd-ai-automation`, `revixmd-website`, `thetoys`.
- **Source:** `src/app/work/[slug]/page.tsx:141-155`, fed by `results[].value: "TODO: add figure"` in `src/content/work/*.ts`.
- **Impact:** The Results H2 is the part of a case study that searchers and AI answers quote. Empty proof weakens the pages meant to carry E-E-A-T.
- **Fix:** Publish approved numbers. Until then, hide the Results section when every value is pending, and replace it with qualitative outcomes.

### LOW: The case-study template jumps from H1 to an H3 that repeats the H1

- **Evidence:** On all 14 `/work/*` pages the outline is `h1 "AI invoice control for Danish construction companies"` followed by `h3 "AI invoice control for Danish construction companies"`, then `h2 "The challenge"`.
- **Source:** `src/components/ui/DeviceCard.tsx:49` renders `<h3>{study.title}</h3>` and is reused in the hero at `src/app/work/[slug]/page.tsx:75`.
- **Fix:** Add a `titleAs?: "h3" | "p"` prop to `DeviceCard` and pass `"p"` in the case-study hero, or omit the title there.

### LOW: Pricing uses the anchor "About this service" for 11 different service pages

- **Evidence:** On `/pricing`, `<a href="/services/web-development">About this service</a>` and 10 siblings use the same text for different targets.
- **Source:** `src/app/pricing/page.tsx:51-56`.
- **Fix:** Use descriptive anchors, e.g. `{p.name} service details` or the service's `shortTitle` ("Web Development service").

### LOW: Some case studies are weakly linked or linked from the wrong service

- **Evidence:**
  - `/work/hockeystore` is linked from only 2 pages: `/work` and `/services/game-development`. It is an e-commerce store, yet it appears in `relatedWork` for Game Development (`src/content/services/game-development.ts:87`) and is missing from E-commerce (`src/content/services/ecommerce-development.ts:83`).
  - `/work/medallion-dusk` has 3 inlinks and `/work/his-energy` has 4.
- **Fix:**
  - Move `hockeystore` to `ecommerce-development` `relatedWork`.
  - Add the thin-linked studies to the related industry pages' `work` arrays (`src/content/industries.ts`).

### LOW: The same 8 general FAQs are repeated on four hub pages

- **Evidence:** The same 8 questions, for example "How do you price projects?" and "Who owns the code, the accounts and the content?", are rendered and marked up on `/services`, `/process`, `/pricing` and `/about`. Five of them are also in the homepage schema.
- **Fix:** Keep the full set on one page (`/process` or `/pricing`). Give the other hubs page-specific questions, or link to that page.

### LOW: The footer links `/legal/*` on every page, but robots.txt blocks those URLs

- **Evidence:** `robots.txt` has `Disallow: /legal/`, and `/legal/privacy` also serves `<meta name="robots" content="noindex, nofollow">`. Because crawling is blocked, Google cannot see the `noindex`, and the URLs, which are linked from 59 pages, can show up as "Indexed, though blocked by robots.txt".
- **Fix:** Remove `/legal/` from the disallow list in `src/app/robots.ts` and keep the `noindex` (cross-reference: technical findings).

### INFO

- `<meta name="keywords">` is set site-wide (`src/app/layout.tsx:23`). Google ignores it, so it is harmless.
- The homepage canonical is `https://revixplus.com` while the sitemap uses `https://revixplus.com/`. Both are the same URL, so no action is needed.
- Footer column headings ("Services", "Company", "Industries", "Legal") are H3s and nest under each page's final CTA H2. This is acceptable. Use `<h2 class="sr-only">Site</h2>` plus H3s, or plain `<p>`, if you want a cleaner outline.
- `metadata_template.py` flagged `/services/shopify-development` because its description opens with its title's lead phrase ("Shopify development agency for …"). This is minor; vary the opening when you shorten the title.

## Per-URL table

Title len is the length of the rendered `<title>`. Inlinks counts the distinct pages linking to the URL, then the subset where the link sits inside `<main>`.

| URL | Title len | Desc len | H1 | Inlinks (pages / contextual) | Issues |
|---|---|---|---|---|---|
| / | 41 | 186 | 1 | 58 / 58 | desc >160; visible "TODO: confirm" x1; FAQPage schema not visible |
| /services | 62 | 237 | 1 | 58 / 39 | title >60; desc >160 |
| /work | 57 | 200 | 1 | 58 / 15 | desc >160 |
| /process | 58 | 174 | 1 | 58 / 0 | desc >160; no contextual inlinks |
| /pricing | 63 | 202 | 1 | 58 / 1 | title >60; desc >160; 11x "About this service" anchors |
| /about | 66 | 190 | 1 | 58 / 0 | title >60; desc >160; no contextual inlinks |
| /contact | 51 | 149 | 1 | 58 / 58 | none |
| /services/ai-strategy-readiness | 58 | 159 | 1 | 58 / 3 | double brand |
| /services/ai-integration | 70 | 157 | 1 | 58 / 11 | double brand |
| /services/rag-knowledge-assistants | 69 | 152 | 1 | 58 / 8 | double brand |
| /services/ai-agents-automation | 66 | 145 | 1 | 58 / 10 | double brand |
| /services/chatbots-voice-agents | 70 | 149 | 1 | 58 / 6 | double brand |
| /services/llm-evaluation-optimization | 71 | 153 | 1 | 58 / 7 | double brand |
| /services/healthcare-ai-automation | 75 | 159 | 1 | 58 / 6 | double brand; title >60 (63 after dedupe) |
| /services/web-development | 78 | 155 | 1 | 58 / 14 | double brand; title >60 (66 after dedupe) |
| /services/mobile-app-development | 84 | 157 | 1 | 58 / 5 | double brand; title >60 (72 after dedupe) |
| /services/ecommerce-development | 86 | 156 | 1 | 58 / 13 | double brand; title >60 (74 after dedupe); visible "TODO: confirm" x1 |
| /services/shopify-development | 88 | 152 | 1 | 58 / 9 | double brand; title >60 (76 after dedupe); visible "TODO: confirm" x1; desc echoes title |
| /services/wordpress-development | 93 | 153 | 1 | 58 / 11 | double brand; title >60 (81 after dedupe) |
| /services/saas-mvp-development | 73 | 160 | 1 | 58 / 6 | double brand; title >60 (61 after dedupe) |
| /services/api-backend-engineering | 79 | 152 | 1 | 58 / 10 | double brand; title >60 (67 after dedupe) |
| /services/ui-ux-design | 89 | 160 | 1 | 58 / 7 | double brand; title >60 (77 after dedupe); visible "TODO: confirm" x1 |
| /services/game-development | 82 | 156 | 1 | 58 / 4 | double brand; title >60 (70 after dedupe) |
| /services/playable-ads-web-games | 81 | 155 | 1 | 58 / 3 | double brand; title >60 (69 after dedupe); visible "TODO: confirm" x1 |
| /services/seo | 59 | 148 | 1 | 58 / 14 | double brand |
| /services/aieo-geo | 68 | 160 | 1 | 58 / 5 | double brand |
| /services/social-media-marketing | 66 | 158 | 1 | 58 / 9 | double brand |
| /services/paid-advertising | 83 | 155 | 1 | 58 / 9 | double brand; title >60 (71 after dedupe) |
| /services/content-marketing | 64 | 153 | 1 | 58 / 8 | double brand |
| /services/email-marketing-automation | 65 | 160 | 1 | 58 / 6 | double brand; visible "TODO: confirm" x1 |
| /services/conversion-rate-optimization | 68 | 153 | 1 | 58 / 8 | double brand |
| /services/branding-graphic-design | 58 | 155 | 1 | 58 / 3 | double brand |
| /services/video-editing-motion-graphics | 64 | 157 | 1 | 58 / 4 | double brand |
| /services/social-media-creatives | 61 | 155 | 1 | 58 / 10 | double brand |
| /services/cloud-devops-deployment | 67 | 144 | 1 | 58 / 11 | double brand |
| /services/security-compliance | 82 | 142 | 1 | 58 / 9 | double brand; title >60 (70 after dedupe) |
| /services/maintenance-support-retainers | 59 | 154 | 1 | 58 / 9 | double brand |
| /services/dedicated-teams | 71 | 146 | 1 | 58 / 3 | double brand |
| /industries/healthcare-rcm | 81 | 157 | 1 | 58 / 0 | double brand; title >60 (69 after dedupe); no contextual inlinks; breadcrumb "Industries"→/services |
| /industries/ecommerce | 83 | 158 | 1 | 58 / 0 | double brand; title >60 (71 after dedupe); visible "TODO: confirm" x1; no contextual inlinks; breadcrumb "Industries"→/services |
| /industries/fintech | 63 | 157 | 1 | 58 / 0 | double brand; no contextual inlinks; breadcrumb "Industries"→/services |
| /industries/saas | 66 | 150 | 1 | 58 / 0 | double brand; no contextual inlinks; breadcrumb "Industries"→/services |
| /industries/education | 73 | 155 | 1 | 58 / 0 | double brand; title >60 (61 after dedupe); no contextual inlinks; breadcrumb "Industries"→/services |
| /industries/energy-industrial | 67 | 158 | 1 | 58 / 0 | double brand; no contextual inlinks; breadcrumb "Industries"→/services |
| /industries/hospitality-food | 76 | 159 | 1 | 58 / 0 | double brand; title >60 (64 after dedupe); no contextual inlinks; breadcrumb "Industries"→/services |
| /work/difacto | 67 | 155 | 1 | 58 / 17 | double brand; h1→h3 skip (DeviceCard h3 repeats H1); results pending 3/3 |
| /work/bankful | 62 | 157 | 1 | 58 / 20 | title >60; h1→h3 skip (DeviceCard h3 repeats H1); visible "TODO: confirm" x1; results pending 2/3 |
| /work/revixmd-ai-automation | 66 | 157 | 1 | 58 / 11 | title >60; h1→h3 skip (DeviceCard h3 repeats H1); results pending 3/3 |
| /work/meeshan-luxe-home | 65 | 152 | 1 | 58 / 18 | title >60; h1→h3 skip (DeviceCard h3 repeats H1); visible "TODO: confirm" x1; results pending 2/3 |
| /work/indibe | 64 | 157 | 1 | 58 / 13 | title >60; h1→h3 skip (DeviceCard h3 repeats H1); visible "TODO: confirm" x3; results pending 3/3 |
| /work/hrms-saas | 60 | 157 | 1 | 58 / 19 | h1→h3 skip (DeviceCard h3 repeats H1); results pending 2/3 |
| /work/thetoys | 67 | 158 | 1 | 58 / 18 | title >60; h1→h3 skip (DeviceCard h3 repeats H1); visible "TODO: confirm" x1; results pending 3/3 |
| /work/hosting-platform | 60 | 157 | 1 | 58 / 9 | h1→h3 skip (DeviceCard h3 repeats H1); results pending 1/3 |
| /work/revixmd-website | 60 | 156 | 1 | 14 / 14 | h1→h3 skip (DeviceCard h3 repeats H1); results pending 3/3 |
| /work/the-vitamin-company | 65 | 159 | 1 | 12 / 12 | title >60; h1→h3 skip (DeviceCard h3 repeats H1); visible "TODO: confirm" x1; results pending 2/3 |
| /work/his-energy | 69 | 153 | 1 | 4 / 4 | double brand; h1→h3 skip (DeviceCard h3 repeats H1); visible "TODO: confirm" x1; results pending 3/3; weakly linked |
| /work/sushi2500 | 68 | 154 | 1 | 7 / 7 | title >60; h1→h3 skip (DeviceCard h3 repeats H1); visible "TODO: confirm" x2; results pending 2/3 |
| /work/medallion-dusk | 65 | 159 | 1 | 3 / 3 | title >60; h1→h3 skip (DeviceCard h3 repeats H1); visible "TODO: confirm" x4; results pending 3/3; weakly linked |
| /work/hockeystore | 71 | 155 | 1 | 2 / 2 | double brand; h1→h3 skip (DeviceCard h3 repeats H1); visible "TODO: confirm" x2; results pending 3/3; weakly linked |
