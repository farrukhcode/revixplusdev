# Technical SEO: revixplus.com (pre-deploy build)

**Score: 74/100**

Audited 2026-11-03. Target: the production Docker image `rvx-audit` at `http://localhost:3100`, built with `NEXT_PUBLIC_SITE_URL=https://revixplus.com`, so every canonical, `og:url`, sitemap `<loc>` and robots line points at `https://revixplus.com`. Production URLs were mapped to local paths for crawling. Method: the claude-seo `seo-technical` checklist; `sitemap_discovery.py` and `agentic_check.py` (raw mode, `CLAUDE_SEO_LOCAL_TARGETS=localhost:3100`); a BFS crawl of every linked and sitemapped URL (63 URLs); targeted curl probes; source review. Host and protocol handling was checked against the **current** live `revixplus.com` (same droplet, IP 167.172.28.157, which still serves the old dental-billing site), because Coolify and Traefik will front the new image the same way.

Not available: Google Search Console, CrUX, PSI, DataForSEO and Moz (no credentials), so there is no indexation or field data. The skill's rendered mode can't load localhost subresources, so rendered checks used playwright-core with the installed Chrome.

## Category breakdown

| Category | Status | Score | Checks behind it |
|---|---|---|---|
| Crawlability | pass | 90 | robots.txt 200 and valid; sitemap declared and valid; no accidental noindex; every page within 2 clicks of `/`; legal pages blocked *and* noindexed (conflict) |
| Indexability | warn | 75 | 59/59 sitemap URLs are 200, `index, follow` and self-canonical; no duplicate titles; query strings canonicalise to the clean URL; soft 404 on unknown slugs for Googlebot; 10 old-site URLs 404 |
| Security | warn | 55 | HTTPS terminates at Traefik; nosniff, XFO, Referrer-Policy and Permissions-Policy are set; no HSTS (confirmed on live); no CSP; http→https is a 302; `X-Powered-By` removed |
| URL structure | pass | 90 | clean hyphenated paths; trailing slash 308s to the slashless URL; uppercase 404s; http://www takes 2 hops |
| Mobile | pass | 95 | viewport meta present; Lighthouse a11y 98–100; small bottom dock only (no interstitial) |
| Core Web Vitals | fail | 50 | see `performance.md`: home mobile LCP and TBT poor, CLS 0 |
| Structured data | pass | 100 (detection only) | JSON-LD on every page (3–5 blocks); validation belongs to the schema specialist |
| JS rendering | pass | 100 | full SSR/prerender: 2,299 words in raw home HTML; title, canonical, robots and JSON-LD in the initial HTML |
| IndexNow | info | not measured | not implemented |

## What works

- **Prerendered, server-rendered HTML** on every route (`x-nextjs-prerender: 1`, `x-nextjs-cache: HIT`). Title, description, canonical, robots meta, OG and JSON-LD are all in the first response, so nothing depends on JavaScript for indexing.
- **Canonicals are consistent.** All 59 indexable pages self-canonicalise to `https://revixplus.com/<path>`, and `og:url` equals the canonical on every page (`src/lib/seo.ts` `pageMetadata`). `/about?utm_source=x` returns 200 with the clean canonical.
- **Trailing slashes are normalised.** `/about/` → `308 /about`, `/services/seo/` → `308 /services/seo`. The live Traefik setup does the same: `https://revixplus.com/about/` → `308 /about`.
- **Top-level 404s are real.** `/this-does-not-exist`, `/index.html` and `/SERVICES/SEO` return `404` with the styled not-found page and an injected `noindex`.
- **Old-path redirects that exist are single-hop 308s.** `/dental-billing-services`, `/dental-billing-services/*` and `/services/dental-billing` all go to `/industries/healthcare-rcm`.
- **`poweredByHeader: false`, `compress: true`.** No `X-Powered-By` header. HTML is gzip-compressed (home 310 KB → 49 KB).
- **Legal pages carry `noindex, nofollow`** and are kept out of the sitemap.
- **Stack exposure:** Node 24 + Next.js 16.4.4 standalone. There's no PHP signal, so the site isn't exposed to the PHP critical-RCE advisory in the skill's reference.
- **No back-button hijacking.** No `history.pushState`/`replaceState`/`popstate`/`beforeunload` anywhere in `src/`.
- **Static assets** under `/_next/static/*` are `public, max-age=31536000, immutable`.

## Findings

### High

**H1. Ten URLs from the current live site will 404 after cutover; the redirect map covers none of them**
- Evidence: the current `https://revixplus.com/sitemap.xml` (fetched 2026-11-03) lists 14 URLs. Against the new build:
  `404 /specialities`, `/specialities/dental-implant-billing`, `/specialities/endodontic-billing`, `/small-practices`, `/dso-group-billing`, `/resources`, `/privacy-policy`, `/terms-of-service`, `/accessibility`, `/hipaa-compliance` (only `/`, `/about`, `/services`, `/contact` survive).
  `next.config.ts:34-46` redirects `/dental-billing-services` and `/services/dental-billing`, but neither path appears in the live sitemap.
- Caveat: the live site's robots.txt is currently `User-Agent: * / Disallow: /`, so Google may already have dropped much of it. Index status and backlinks can't be checked without GSC.
- Fix: in `next.config.ts` `redirects()`, add permanent redirects before DNS cutover. Following docs/INFRA.md §9 ("no close match → /industries/healthcare-rcm"):
  ```ts
  { source: "/specialities/:path*", destination: "/industries/healthcare-rcm", permanent: true },
  { source: "/specialities", destination: "/industries/healthcare-rcm", permanent: true },
  { source: "/small-practices", destination: "/industries/healthcare-rcm", permanent: true },
  { source: "/dso-group-billing", destination: "/industries/healthcare-rcm", permanent: true },
  { source: "/hipaa-compliance", destination: "/services/healthcare-ai-automation", permanent: true },
  { source: "/privacy-policy", destination: "/legal/privacy", permanent: true },
  { source: "/terms-of-service", destination: "/legal/terms", permanent: true },
  { source: "/resources", destination: "/work", permanent: true },
  ```
  `/accessibility` has no new equivalent. Either add a page or let it 404. Then pull the GSC Pages export for any URL not in the sitemap.

### Medium

**M1. Unknown slugs under dynamic routes return 200 to Googlebot (soft 404)**
- Evidence: the first request for any unlisted slug under `/services/`, `/work/`, `/industries/` or `/legal/` returns `200` (~77 KB) with the not-found UI and an injected `<meta name="robots" content="noindex"/>`. Only later requests for the same URL get the cached `404`:
  ```
  /work/repeat-test-abc  → 200 76967B, then 404, 404
  Googlebot UA, /services/ua-test-* → 200   (bingbot, GPTBot, Twitterbot → 404: HTML-limited bots get blocking render)
  headers: x-nextjs-postponed: 1, Cache-Control: private, no-cache, no-store
  ```
- Cause: with `cacheComponents` + `partialPrefetching`, unlisted params render at request time. The PPR static shell is flushed with `200` before `notFound()` runs (`src/app/services/[slug]/page.tsx:40`, likewise `work/[slug]/page.tsx:40`, `industries/[slug]/page.tsx:43`, `legal/[slug]/page.tsx:34`). Next 16 documents this: once streaming starts the status stays 200 (`node_modules/next/dist/docs/01-app/02-guides/streaming.md`, "Status codes"). `dynamicParams = false` isn't available under cacheComponents.
- Impact: the noindex keeps these URLs out of the index, but Google will report them as soft 404 / "Excluded by noindex", spend crawl on mistyped or removed slugs, and broken internal or external links stay hidden.
- Fix (the documented route): add `src/proxy.ts` that 404s unknown slugs before rendering. Sketch:
  ```ts
  import { NextResponse, type NextRequest } from "next/server";
  import { services } from "@/content/services";
  import { caseStudies } from "@/content/work";
  import { industries } from "@/content/industries";
  import { legal } from "@/content/legal";
  const known: Record<string, Set<string>> = {
    services: new Set(services.map((s) => s.slug)),
    work: new Set(caseStudies.map((w) => w.slug)),
    industries: new Set(industries.map((i) => i.slug)),
    legal: new Set(Object.keys(legal)), // legal is a record keyed by slug
  };
  export function proxy(req: NextRequest) {
    const [, section, slug] = req.nextUrl.pathname.split("/");
    if (slug && known[section] && !known[section].has(slug))
      return NextResponse.rewrite(new URL("/__not-found", req.url)); // any unmatched path renders not-found with 404
  }
  export const config = { matcher: ["/(services|work|industries|legal)/:slug"] };
  ```
  Verify with `curl -A "Googlebot/2.1" -o /dev/null -w '%{http_code}' https://revixplus.com/services/xyz-$RANDOM`, which should print 404 on the first hit.

**M2. `/legal/` is both disallowed in robots.txt and `noindex`; the two cancel out**
- Evidence: robots.txt `Disallow: /legal/` (`src/app/robots.ts:10`). `/legal/privacy`, `/legal/terms` and `/legal/cookies` serve `noindex, nofollow`, and every page links to them from the footer (62 inlinks each). Because crawling is blocked, Google never sees the noindex and can index the bare URLs from links ("Indexed, though blocked by robots.txt").
- Fix: remove `"/legal/"` from the `disallow` array in `src/app/robots.ts` and keep the noindex. A visible, crawlable privacy policy is also a trust signal, so consider making them indexable.

**M3. No `Strict-Transport-Security` header**
- Evidence: missing from the build's responses (`next.config.ts:21-33` sets only nosniff/XFO/Referrer/Permissions) and from the live Traefik response for `https://revixplus.com/`.
- Fix: add `{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }` to `next.config.ts` `headers()`. Browsers ignore it over plain HTTP, so it's safe behind Traefik. Add `preload` only once every subdomain (staging, analytics) is HTTPS-only. If Cloudflare proxying is enabled, setting HSTS in Cloudflare (SSL/TLS → Edge Certificates) works too.

**M4. http→https redirect is a temporary 302 (deploy-time, Coolify/Traefik)**
- Evidence (live infra): `http://revixplus.com/` → `302 https://revixplus.com/`. `http://www.revixplus.com/` → `302 https://www.revixplus.com/` → `308 https://revixplus.com/` (2 hops, the first temporary).
- Fix: make the scheme redirect permanent. In Coolify's Traefik labels, set `redirectscheme.permanent=true` on the https redirect middleware. Or, if Cloudflare proxy is on, use "Always Use HTTPS" (301) and turn off Coolify's Force HTTPS to avoid a loop (docs/INFRA.md §5 currently says the reverse). Make `http://www` go straight to `https://revixplus.com/` in one hop. Recheck with `curl -sI http://www.revixplus.com/`.

### Low

**L1. AI-crawler group in robots.txt drops the `/api/` and `/legal/` disallows for those bots.** Under RFC 9309 a crawler obeys only its most specific matching group. GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot and anthropic-ai match the second group (`Allow: /` only, `src/app/robots.ts:13-23`), so the `*` disallows don't apply to them. The `*` group already allows everything else, so the named group adds nothing except this gap. Fix: delete the named group, or give it the same `disallow: ["/api/"]`.

**L2. No Content-Security-Policy.** Not a ranking factor. Worth adding once Umami or Cal embeds are settled; start with `Content-Security-Policy-Report-Only` in `next.config.ts`.

**L3. Public icons and OG images revalidate on every request.** `/icon-192.png` `public, max-age=0`; `/opengraph-image`, `/apple-icon.png`, `/favicon.ico`, `/manifest.webmanifest` `public, max-age=0, must-revalidate` (ETag present). It's harmless, but a `headers()` rule giving `/icon-*.png` and `/brand/*` a 1-day `max-age` saves round trips.

**L4. Non-descriptive anchor text "Start".** Lighthouse `link-text` fails on every page because of the mobile dock link `src/components/layout/MobileDock.tsx:18` (`/contact`, text "Start"). Fix: `aria-label="Start a project"` or visible text "Start a project".

**L5. Weakly linked case studies.** Inlinks: `/work/hockeystore` 3, `/work/medallion-dusk` 4, `/work/his-energy` 5, `/work/sushi2500` 8 (most pages have 62). They're reachable from `/work`, so not orphaned. Link them from relevant service and industry pages.

### Info

- `robots.txt` emits `Host: https://revixplus.com` (`src/app/robots.ts:26`, `host: SITE_URL`). It's a non-standard, Yandex-only directive that Google ignores. Harmless, and can be removed.
- Home canonical is `https://revixplus.com` (no slash) while the sitemap `<loc>` is `https://revixplus.com/`. Google treats the root as identical, so no action needed.
- HTML weight: home 310 KB raw / 49 KB gz (96 KB of it inline RSC payload), well under Googlebot's 2 MB HTML cap.
- HTML `Cache-Control: s-maxage=900, stale-while-revalidate=31535100` with ETag is Next's ISR default and fine. If Cloudflare proxying is enabled, keep HTML out of "Cache Everything" unless tested. Next sends `Vary: rsc, …`, which Cloudflare ignores, and its `_rsc` cache-buster mitigates most of the risk.
- IndexNow isn't implemented. Optional for Bing/Yandex: put a key file in `public/` and ping on deploy.
- `next.config.ts:45` `{ source: "/www", destination: "/" }` is an odd but harmless entry.

## robots.ts: behaviour here and in production

- `src/app/robots.ts:6` compares `new URL(SITE_URL).hostname` with `"revixplus.com"`. `SITE_URL` comes from `NEXT_PUBLIC_SITE_URL` (`src/content/site.ts:9`, default `https://revixplus.com`), which is inlined **at build time**, and robots.txt is prerendered (`x-nextjs-cache: HIT`). The check never looks at the request's Host header.
- Here: the image was built with the production URL, so `localhost:3100/robots.txt` serves the **production** rules (`Allow: /`, `Disallow: /api/`, `/legal/`, `Sitemap: https://revixplus.com/sitemap.xml`). That's expected, and it means **production will be correct** as long as the production build gets exactly `https://revixplus.com` (the Dockerfile `ARG` default is that value).
- Production risks:
  - Setting `NEXT_PUBLIC_SITE_URL=https://www.revixplus.com` (or any other host) makes production serve `Disallow: /` for every crawler.
  - `http://revixplus.com` passes the check but makes every canonical `http://`.
  - Staging and Coolify preview deployments only get `Disallow: /` if their **build** sets `NEXT_PUBLIC_SITE_URL` to their own host. Changing it at runtime does nothing, and previews inherit the production build args, so they serve allow-all robots plus production canonicals. Protect staging and previews with Coolify basic auth or a Traefik `X-Robots-Tag: noindex` header.

## Deploy-time checklist (Coolify / Traefik / Cloudflare)

1. `NEXT_PUBLIC_SITE_URL=https://revixplus.com` exactly (no www, no trailing path), ticked as a **Build** variable. Staging: its own host, also build-time.
2. Add the old-site 301s (H1) **before** switching DNS.
3. www→apex in one hop from both schemes, and make http→https permanent (M4).
4. HSTS (M3), in Next or at the edge.
5. Staging and previews: basic auth or `X-Robots-Tag: noindex`. Robots alone relies on the build arg.
6. Cloudflare (when you turn the proxy on): check Security → Bots. "Block AI bots", AI Crawl Control and "Managed robots.txt" can override the allow-AI policy in `robots.ts`, and Bot Fight Mode can challenge crawlers. Keep HTML out of "Cache Everything".
7. After cutover: submit `https://revixplus.com/sitemap.xml` in GSC and Bing Webmaster Tools. The live site currently serves `Disallow: /`, and Google can cache robots.txt for up to 24 h, so request a recrawl.
8. Pass `--build-arg BUILD_DATE=$(date +%F)` per release, or sitemap `lastmod` stays `2026-11-03` forever (see `sitemap.md`).
9. `NEXT_PUBLIC_UMAMI_ID` is documented in `.env.example` and docs/INFRA.md, but nothing in `src/` reads it. Setting it in Coolify adds no analytics until a script is wired in (for example in `src/app/layout.tsx`).
