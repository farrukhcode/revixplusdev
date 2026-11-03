# SEO action plan

Items still open after the 2026-11-03 fixes. **Owner** means only the business can supply it; **Deploy** means a Coolify, Cloudflare or Search Console setting; **Code** means a change in this repo.

## Phase 1: before or at launch (week 1)

| Priority | Item | Who | Where |
|---|---|---|---|
| High | Set `NEXT_PUBLIC_SITE_URL=https://revixplus.com` exactly, as a build variable. With `www`, robots.txt blocks the whole site | Deploy | Coolify env |
| High | One-hop permanent redirects: Cloudflare "Always Use HTTPS" on, plus a www→apex 301 Redirect Rule | Deploy | `docs/INFRA.md` §5 |
| High | Export old-site URLs that had impressions in the last 90 days (Search Console, Pages) and add any missing ones to the redirect map | Owner + Code | `next.config.ts` |
| High | Confirm or remove "91% clients who come back" | Owner | `src/content/site.ts` stats |
| High | Reconcile "10+ years" and "since 2019" with "founded 2026". Add a line to pre-2026 case studies: delivered by the founder before RevixPlus | Owner | `src/content/site.ts`, `src/content/work/*`, `src/content/industries.ts` |
| High | Have the privacy, terms and cookies pages reviewed; add the legal entity and address | Owner | `src/content/legal.ts` |
| High | After DNS cutover: verify in Search Console and Bing, submit `/sitemap.xml`, request a recrawl (the old site serves `Disallow: /`) | Deploy | Search Console, Bing |
| Medium | Leave Cloudflare "Block AI bots", "Managed robots.txt" and Bot Fight Mode off | Deploy | Cloudflare |
| Medium | Basic auth on staging and preview deployments | Deploy | Coolify |

## Phase 2: proof and trust (weeks 2–3)

| Priority | Item | Who | Where |
|---|---|---|---|
| High | Confirm the case-study figures (35 of 42 pending), and the location and timeline for Indibe, Medallion Dusk, His Energy, Hockeystore and Sushi2500 | Owner | `src/content/work/*` |
| High | Product screenshots for the 14 case studies (the `image` field already exists) | Owner + Code | `public/work/`, `src/content/work/*` |
| High | Approved testimonials (set `status: "approved"` and the homepage section appears) | Owner | `src/content/testimonials.ts` |
| Medium | Real team bios; a named expert on service pages | Owner | `src/content/team.ts` |
| Medium | State whether you sign a BAA on the healthcare pages | Owner | `src/content/industries.ts`, `healthcare-ai-automation.ts` |
| Medium | Show the city or address on `/contact` and in the footer | Code | `src/app/contact/page.tsx`, `SiteFooter.tsx` |
| Medium | State the discovery-week price on `/pricing` | Owner | `src/content/pricing.ts` |
| Medium | Industry pages: show only on-industry work under "Work in this industry"; add 150–300 unique words each | Owner + Code | `src/content/industries.ts` |
| Medium | Tone down the AIEO page's claims about llms.txt and markup, in line with Google's guidance | Code | `src/content/services/aieo-geo.ts` |

## Phase 3: authority and content (month 2)

| Priority | Item | Who | Where |
|---|---|---|---|
| Medium | `Article` markup for case studies once they have publish dates (ready-to-paste JSON-LD in `findings/schema.md`) | Code | `src/lib/schema.ts` |
| Medium | Informational content AI answers can cite: guides, costs, comparisons | Owner + Code | new `/insights` |
| Medium | Company LinkedIn page, then add it to Organization `sameAs` | Owner | `src/lib/schema.ts` |
| Medium | Hub H1s carry a topic word (e.g. "Software, AI and growth services") | Code | page headers |
| Low | Case-study template: H1 → H2 order; descriptive anchors instead of "About this service" | Code | `src/app/work/[slug]`, `src/app/pricing` |
| Low | Cache headers for `/brand/*` and icons; a CSP once embeds are settled | Code | `next.config.ts` |
| Low | Trim client JS on the homepage (globe idle init, fewer GSAP setups) | Code | `src/components/home/*` |

## Phase 4: ongoing

- Re-run this audit 4–6 weeks after launch with Search Console connected: real Core Web Vitals, indexation and queries.
- Watch Search Console for 404s from old URLs, and add redirects as they appear.
- Keep sitemap `lastmod` honest (it comes from the build date automatically).
