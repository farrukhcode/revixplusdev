# Sitemap: revixplus.com (pre-deploy build)

**Score: 88/100**

Audited 2026-11-03 against the production image at `http://localhost:3100`. Method: claude-seo `seo-sitemap` checklist; `sitemap_discovery.py --json` (raw output in `raw/sitemap_discovery.json`); every `<loc>` fetched and compared with a BFS crawl of all internal links (`raw/crawl.json`); source `src/app/sitemap.ts`.

## Validation report

| Check | Result | Evidence |
|---|---|---|
| Discoverable | pass | `robots.txt` → `Sitemap: https://revixplus.com/sitemap.xml`; `/sitemap.xml` 200 `application/xml`; discovery script `found` lists it as `valid: true, kind: urlset` |
| Valid XML / namespace | pass | `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`, parsed by the discovery script |
| Size limits | pass | 59 URLs, ~10 KB (limit 50,000 URLs / 50 MB) |
| All URLs return 200 | pass | 59/59 are 200 (paths mapped to localhost) |
| No redirected URLs | pass | 0 redirects |
| No noindexed URLs | pass | 59/59 are `index, follow`; the noindexed `/legal/*` pages are correctly left out |
| Only canonical URLs | pass | 59/59 self-canonical |
| HTTPS only | pass | every `<loc>` is `https://revixplus.com/…` |
| Crawl vs sitemap | pass | the crawl found 63 URLs: the 59 in the sitemap, plus `/legal/{privacy,terms,cookies}` (noindex, correctly excluded) and `/llms.txt` (not a page). No indexable page is missing. |
| Route coverage vs code | pass | the sitemap builds from the same content modules as the routes (`services` 31, `industries` 7, `caseStudies` 14, plus 7 statics). Every `page.tsx` route is covered except `/legal/[slug]` (intentional). |
| `lastmod` accuracy | warn | all 59 are `2026-11-03` |
| Deprecated tags | info | `<changefreq>` and `<priority>` on every URL |
| Location-page quality gate | n/a | no location pages (7 industry pages, each with its own content) |

## What works

- It's generated from the content modules (`src/app/sitemap.ts`), so new services, case studies and industries appear automatically and can't drift from the routes.
- Clean, canonical, 200, indexable URLs only. No parameters, no trailing-slash variants, no noindexed pages.
- Declared in robots.txt with an absolute production URL, and prerendered at build (`x-nextjs-cache: HIT`).

## Findings

### Low

**S1. Every `lastmod` is the same date, which comes from a hard-coded fallback.**
- Evidence: `src/app/sitemap.ts:8` `const LAST_MODIFIED = process.env.BUILD_DATE ?? "2026-11-03";` and `Dockerfile:23` `ARG BUILD_DATE=2026-11-03`. All 59 entries carry `<lastmod>2026-11-03</lastmod>`. Unless Coolify passes `BUILD_DATE`, every future deploy will still say 2026-11-03. If it passes the build date, every URL will claim a change on every deploy. Google only trusts `lastmod` when it's consistently accurate.
- Fix: add an `updatedAt: "YYYY-MM-DD"` field to each entry in `src/content/services`, `src/content/work` and `src/content/industries`, and use it in `sitemap.ts` (statics can keep a per-page constant). Bump it only when the page's main content changes. Until then, pass `--build-arg BUILD_DATE=$(date +%F)` in Coolify so the date at least moves.

### Info

**S2. `<changefreq>` and `<priority>` are ignored by Google.** `src/app/sitemap.ts:14-15,20-21,26-27,32-33`. It's safe to delete these keys to shrink the file. Bing also treats them as weak hints.

**S3. Home `<loc>` has a trailing slash, the canonical doesn't.** `<loc>https://revixplus.com/</loc>` vs `<link rel="canonical" href="https://revixplus.com"/>`. For the root these are the same URL to Google, so no action is needed. For strict tooling parity, `absoluteUrl("/")` in `src/lib/seo.ts` could return the bare origin.

**S4. No image sitemap needed.** No page uses `<img>` (artwork is CSS, SVG or WebGL). The only raster images are the generated `opengraph-image` routes, which don't need a sitemap.

## Old-site URLs (for the cutover, cross-reference technical.md H1)

The current live sitemap (`https://revixplus.com/sitemap.xml`, old dental-billing site) has 14 URLs. Ten of them aren't in the new sitemap and return 404 on the new build: `/specialities`, `/specialities/dental-implant-billing`, `/specialities/endodontic-billing`, `/small-practices`, `/dso-group-billing`, `/resources`, `/privacy-policy`, `/terms-of-service`, `/accessibility`, `/hipaa-compliance`. Redirect them (`next.config.ts` `redirects()`) rather than adding them to the sitemap. Keep redirected URLs **out** of the new sitemap.

## Post-deploy

1. Submit `https://revixplus.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools. The old property's sitemap entry will then be replaced.
2. Rerun `sitemap_discovery.py https://revixplus.com/ --json` and spot-check that `<loc>` values return 200 from the public internet (via Cloudflare once proxied).
