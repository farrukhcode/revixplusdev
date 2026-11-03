# RevixPlus SEO audit, 2026-11-03

Method: the claude-seo `seo-audit` skill (github.com/AgricIDaniel/claude-seo). Three specialist passes covered technical, sitemap, performance and agentic; content, search experience and AI search (GEO); and on-page, schema, images and visual. They ran against the production Docker image (the build Coolify will deploy), crawling all 60 sitemap URLs.

The detailed findings in `findings/` describe the site **before** the fixes listed below. "After" scores are estimates from re-checking each fix, not a second full audit.

## Executive summary

| | Before | After (estimate) |
|---|---|---|
| **SEO Health Score** | **68 / 100** | **≈ 79 / 100** |

- **Business type:** B2B professional-services agency (software, AI, growth), serving clients remotely across the US, UK, EU, UAE and Pakistan from Lahore. Not a local-search business, so the local and maps modules were skipped.
- **Critical issues:** none. Nothing blocks indexing.
- **Not measured:** field Core Web Vitals, Search Console data, backlinks, SERP positions and brand mentions. The site isn't live yet and no API credentials were available. Re-run after launch with Search Console connected.

| Category | Weight | Before | After (est.) | Notes |
|---|---|---|---|---|
| Technical SEO | 22% | 74 | 88 | Two deploy-time items remain (see the action plan) |
| Content quality | 23% | 58 | 64 | The remaining gap needs owner input: proof, claims, legal |
| On-page SEO | 20% | 70 | 86 | |
| Schema | 10% | 74 | 85 | |
| Performance (lab) | 10% | 58 | 75 | Home mobile 62 → 84 (DevTools throttling) |
| AI search readiness | 10% | 72 | 76 | Mean of GEO (58) and agentic access (86) |
| Images | 5% | 80 | 80 | No real screenshots yet |

## Fixed in this pass

### Technical
- **Old-site redirects:** 301s (308) now cover all 10 URLs from the current live sitemap of revixplus.com, plus the earlier dental-billing paths (`next.config.ts`).
- **Soft 404s:** unknown slugs under `/services`, `/work`, `/industries` and `/legal` now return a real 404, even on Googlebot's first hit (`src/proxy.ts`).
- **robots.txt:** `/legal/` can be crawled, so Google can see its `noindex`. The AI-crawler group repeats the `/api/` disallow. `Claude-SearchBot` is named, and the obsolete `anthropic-ai` entry is gone.
- **HSTS:** `Strict-Transport-Security` added.
- **Sitemap dates:** `lastmod` now comes from the build date, not a hard-coded date.

### On-page
- **Titles:** 41 titles ended in "| RevixPlus | RevixPlus". The duplicate is trimmed once in `pageMetadata()`, and titles that would pass 60 characters drop the brand suffix. Four long service titles were shortened. Now 0 of 60 titles are over 60 characters.
- **Meta descriptions:** 10 trimmed. Now 0 are over 155 characters.
- **Placeholders:** "TODO: confirm" no longer shows anywhere. Unconfirmed locations and timelines are hidden, and so are "Pending" result tiles; a case study shows results only once a figure is confirmed.
- **Industries:** a new `/industries` hub. The industry breadcrumbs and sitemap now use it, and the footer links "All industries".

### Schema
- **FAQ markup:** removed from the homepage, where its 5 questions weren't visible.
- **Prices:** Service offers use `UnitPriceSpecification` with `minPrice` ("from" pricing) and a monthly or weekly unit for retainers.
- **Organization:** `sameAs` lists only the company's Instagram. The personal LinkedIn and GitHub now sit under a `founder` Person.
- **Areas served:** the EU is typed as a region (`Place`), not a country.

### Content and search experience
- **Stats in the HTML:** count-up stats now carry the real number in the server HTML. Crawlers and AI engines read "90+", not "0".
- **Testimonials:** the homepage "What clients say" section stays hidden until a client approves the words.
- **Promises:** the "free AI-readiness report" and the "website audit on this site" don't exist. The copy now offers what does exist: a free AI-readiness call.

### Performance
- **Headline LCP:** the hero headline and page titles now do the gooey reveal in pure CSS. They paint in the first frame, so LCP is no longer pushed behind hydration. Measured in Chrome (4× CPU throttle), home LCP equals first paint (~270 ms).
- **Above-the-fold JS:** inner-page headers no longer wait for JavaScript to fade in.
- **AI chat:** on the homepage, the AI SDK (~90 KB gzipped) loads only when the chat nears the viewport.
- **Results:** home mobile went from 62–65 to 84 (DevTools-throttled Lighthouse). Main-thread blocking fell from 0.6–1.1 s (DevTools-throttled) and 6.9 s (simulated) to ~0.4–0.6 s. CLS stays 0.

## Still open (details in `ACTION-PLAN.md`)

These need you, not code:

- **Proof:** real results for the case studies (35 of 42 figures are pending), product screenshots, and approved testimonials.
- **Claims:** "91% clients who come back" (a placeholder), and "10+ years" / "since 2019" next to "founded 2026". Work from before 2026 is written as "we", so it needs one honest line ("delivered by our founder before RevixPlus").
- **Legal:** the privacy, terms and cookies pages are drafts. They need a legal entity, address and counsel review, especially for a site that sells HIPAA and GDPR work.
- **Healthcare:** say whether RevixPlus signs a BAA.

These are deploy-time:

- **Redirects:** make http→https and www→apex single permanent redirects (Cloudflare steps in `docs/INFRA.md` §5).
- **Site URL:** `NEXT_PUBLIC_SITE_URL` must be exactly `https://revixplus.com`.
- **Previews:** protect preview and staging deployments.
- **After launch:** submit the sitemap and request a recrawl. The old site currently serves `Disallow: /`.
