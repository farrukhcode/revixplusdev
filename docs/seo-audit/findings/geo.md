# AI Search Readiness (GEO): revixplus.com

**GEO Readiness Score: 58/100**

| Dimension | Weight | Score | Weighted | Basis |
|---|---|---|---|---|
| Citability | 25% | 68 | 17.0 | 191 unique FAQ questions with answer-first replies of 40-70 words. 27 service-page FAQ answers name RevixPlus inside a self-contained fact. But there are no sourced statistics, every outcome figure is "Pending", and the homepage stats read "0" in the HTML. |
| Structural readability | 20% | 70 | 14.0 | Clean H1 → H2 → H3 hierarchy, lists and accordion FAQs. But the H2s are generic ("Sound familiar?", "What you get", "How we do it"), FAQ questions aren't headings, and there are no comparison tables. |
| Multi-modal | 15% | 20 | 3.0 | 0 images and 0 video in `<main>` on the home, work, case-study, about and service pages tested. The only rich elements are decorative WebGL and animation. |
| Authority & brand signals | 20% | 35 | 7.0 | No bylines, no dates, no Person entity. Entity facts conflict across pages (G-2). `sameAs` points to personal profiles. Off-site presence wasn't measured. |
| Technical accessibility | 20% | 85 | 17.0 | All 62 URLs are server-rendered (`is_spa: false`), and the AI search crawlers are allowed. Deductions: counters render "0" in the HTML (G-1) and letter-split headings (G-11). |
| **Total** | | | **58** | |

This is a heuristic score, not a Google signal. Google's position, per its AI optimization guide (2026), is that optimizing for AI Overviews and AI Mode *is* SEO. Every recommendation below is ordinary SEO and quality work. llms.txt carries **no weight** in the score.

**Platform scores were not measured.** That covers Google AI Overviews, AI Mode, ChatGPT, Perplexity and Copilot. The site isn't live and there's no DataForSEO, SE Ranking or Ahrefs access, so no prompt runs or citation checks were possible. Brand presence on Wikipedia, Wikidata, Reddit, YouTube and LinkedIn wasn't checked either, so this report doesn't assess it.

## AI crawler access (robots.txt as served)

The site serves this `robots.txt`, from `src/app/robots.ts:9-27`:
```
User-Agent: *            Allow: /   Disallow: /api/   Disallow: /legal/
User-Agent: GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot, anthropic-ai   Allow: /
```

| Crawler | Governs | Status |
|---|---|---|
| Googlebot | Google Search, AI Overviews, AI Mode | Allowed (`*`), except `/legal/` |
| Bingbot | Bing, Copilot, and Bing-grounded answers | Allowed (`*`), except `/legal/` |
| OAI-SearchBot | ChatGPT Search citability | Allowed, named. Gets `/api/` and `/legal/` too, see G-9 |
| ChatGPT-User | User-triggered ChatGPT fetches | Allowed (`*`) |
| Claude-SearchBot | Claude search citability | Allowed via `*`, **not named** |
| Claude-User | User-triggered Claude fetches | Allowed (`*`) |
| PerplexityBot | Perplexity search | Allowed, named |
| Perplexity-User | User-triggered Perplexity fetches | Allowed (`*`). Generally ignores robots anyway |
| Applebot | Siri, Spotlight, Safari | Allowed (`*`) |
| GPTBot | OpenAI **training** only | Allowed, named |
| ClaudeBot | Anthropic **training** only | Allowed, named |
| Google-Extended | Gemini/Vertex **training and grounding** (not Search or AI Overviews) | Allowed, named |
| Applebot-Extended | Apple Intelligence **training** only | Allowed (`*`) |
| CCBot, Bytespider, cohere-ai | Training | Allowed (`*`) |
| anthropic-ai | Not listed in Anthropic's current crawler documentation | Named, has no effect |

Search citability is open on every major surface. Training access is fully open too. That is a licensing choice, not a visibility lever (G-9).

## llms.txt

**Present and well-formed** at `/llms.txt` (200, `text/plain`, 2,265 words). It is generated from the content modules (`src/app/llms.txt/route.ts`), so it can't drift from the pages. It has an H1, a summary blockquote, a one-line entity statement and links to all 31 services, 7 industries and 14 case studies, plus the pricing. `/llms-full.txt` returns 404. Google ignores llms.txt, but other assistants may read it. Quality nits are in G-10. There is no RSL licensing file.

## What works

- **Fully server-rendered.** All 62 URLs return complete HTML without JavaScript (`render_page.py`: `is_spa: false`, 62 of 62). Crawlers that don't run JS (most AI fetchers) see the full copy.
- **Citable, brand-anchored passages.** These name the brand, the price and the scope in one sentence, which is ideal for an AI answer to lift:
  - `/services/ai-strategy-readiness`: "AI strategy consulting at RevixPlus starts at $2,500 for a two-week assessment covering one business unit."
  - `/services/healthcare-ai-automation`: "Anthropic, OpenAI, Microsoft Azure OpenAI and AWS Bedrock all offer Business Associate Agreements on qualifying enterprise or API plans…"
- **Real definitions.** At least 10 "What is…" FAQs answer the term directly, for example "What is MCP and why does it matter for agents?" and "What is Coolify and why do you use it?".
- **Machine-readable prices.** Every service page carries `Service` and `Offer` JSON-LD.
- **Outbound citations to primary sources** ("Further reading": web.dev, W3C, schema.org, Google Search Central, IndexNow).
- **The entity statement is consistent in machine-readable places.** "RevixPlus is a software, AI and growth agency…" is identical in the meta description, Organization `description` and llms.txt (`site.ts:7-8`).

## Findings

### G-1 · High · Count-up statistics read "0" in the server HTML
**Evidence:** `components/ui/stats-counter.tsx:32` starts with `useState(0)`, so the HTML that every non-JS crawler reads contains:
- `/` "By the numbers": `0+ years shipping software`, `0+ products and stores launched`, `0 countries served`, `0% clients who come back`
- `/` growth panels: `0+ Lighthouse performance score on every page we ship`, `0 AI engines we optimize for`, `0+ creatives a month`, `0 days from kickoff to live tracking`

That is 8 counters on `/` and 4 on `/about`. Real values (90+, 5, 30+, 7 days, 10+, 50+, 5, 91%) appear only after JS runs, and on mobile some never appear (`sxo.md` S-8). Screen readers also announce the animated value.
**Why it matters:** These are the most quotable numbers on the site, and every AI fetcher that reads raw HTML gets "0".
**Fix (one place, all callers):** In `stats-counter.tsx`, render the final value for crawlers and assistive tech, and hide the animated value from them:
```tsx
<span ref={ref} className={cn("tabular-nums", className)}>
  <span className="sr-only">{prefix}{value.toFixed(decimals)}{suffix}</span>
  <span aria-hidden="true">{prefix}{displayValue.toFixed(decimals)}{suffix}</span>
</span>
```
Better still, initialise `displayValue` to `value` and reset it to 0 only on the client right before animating, so the visible HTML is correct too. Fix the stat values themselves first (`content.md` C-4).

### G-2 · High · Entity facts conflict across pages, schema and llms.txt
**Evidence:**

| Fact | Surface → value |
|---|---|
| Age | `site.ts:19` / Organization `foundingDate: "2026"` / llms.txt "Founded 2026" **vs** "10+ years shipping" (hero, `home.ts:11`), "Between 2019 and 2023 we built" (`industries.ts:116`), "Since 2023… We have shipped" (`about.ts:7`) |
| Markets | Hero "US, UK, EU, UAE and Pakistan" · home work "five countries" · `/work` "Denmark, Pakistan, United States, Europe" · `/about` "the US, UK, Denmark and the EU, the UAE and Pakistan" · schema `areaServed` has 6 entries, "European Union" and "UAE" both typed `Country` · privacy "United States, the United Kingdom, the European Union, the UAE and Pakistan" |
| Profiles | Organization `sameAs` = `linkedin.com/in/farrukhbilal` (a **personal** profile), `instagram.com/revixplus`, `github.com/farrukhcode` (personal) (`lib/schema.ts:30`). `site.ts:24` defines `x.com/revixplus` but it's used nowhere. There's no company LinkedIn page. |
| People | No `founder` in Organization and no `Person` schema anywhere. The founder's name isn't in the About story (`about.ts:5` says only "founded by an engineer"). |

**Why it matters:** AI systems resolve entities by agreement across sources. Here the site disagrees with itself on the company's age and markets, and links the company to a person's profiles without saying who that person is.
**Fix:**
1. Pick one canonical fact sheet in `site.ts`. It should state the founding year, the founder's name, verified client countries and target markets as two separate lists, and the legal name. Render every surface from it: hero trust line, `/work` lead, `/about`, privacy, llms.txt and schema.
2. In `lib/schema.ts`, add `founder: { "@type": "Person", "@id": "https://revixplus.com/about#farrukh-bilal", name: "Farrukh Bilal", jobTitle: "Founder and CTO", sameAs: ["https://www.linkedin.com/in/farrukhbilal/", "https://github.com/farrukhcode"] }`.
3. Move the personal LinkedIn and GitHub out of the Organization `sameAs`. Create a LinkedIn company page and use it there, along with the Instagram and X profiles (include X only if the account is live).
4. In `about.ts:5`, change "founded by an engineer who had spent ten years…" to "founded by Farrukh Bilal, an engineer who had spent ten years…".

### G-3 · High · The homepage marks up 5 FAQs that aren't visible on the page
**Evidence:** `/` serves `FAQPage` JSON-LD with 5 Q&As ("How do you price projects?" and four more; `app/page.tsx:32`, `faqSchema(generalFaqs.slice(0, 5))`). None of the 5 questions appears in the page's visible text, which was checked against the HTML with scripts and styles removed. All 42 other FAQPage pages pass the same check.
**Why it matters:** Google's structured-data guidelines require marked-up content to be visible to users. Hidden markup is the "spammy structured data" pattern, and it gives AI parsers claims they can't find on the page. Cross-reference: schema specialist.
**Fix:** Either render a 5-question FAQ section on the homepage, or remove line 32 of `app/page.tsx`. The second is the smaller change, and the FAQs are already marked up on `/about`, `/pricing`, `/process` and `/services`.

### G-4 · Medium · No visible "what is RevixPlus" sentence on the pages that should define it
**Evidence:** The visible text of `/` and `/about` never says "RevixPlus is…". The sentence lives only in meta, schema and llms.txt. The one visible full definition, "RevixPlus is a software, AI and growth agency based in Lahore, Pakistan…", is on `/legal/privacy`, which is `noindex, nofollow` **and** blocked by `Disallow: /legal/`.
**Fix:** Open `/about` with a 40-60 word definition block placed before the story (`about.ts`, add a `summary` field):
> "RevixPlus is a software, AI and growth agency in Lahore, Pakistan, founded in 2026 by Farrukh Bilal. A four-person senior team builds web and mobile apps, Shopify stores, AI integrations and HIPAA-compliant AI agents, then runs the SEO, social and ads that bring customers. Clients include DiFacto (Denmark), Bankful and Revix MD (US)."

Use the first sentence as the homepage subhead too (`sxo.md` S-9).

### G-5 · Medium · No first-party data or sourced statistics to cite
**Evidence:** The site has no sourced statistic anywhere. Every outcome figure is "Pending" (`content.md` C-2), and the headline stats are unverifiable or placeholders (`content.md` C-4). The richest first-party data the team holds isn't published as numbers: the `/work/hosting-platform` cost per app on one droplet, DiFacto field accuracy, Revix MD hours saved.
**Fix:** Publish 3-5 numbers you can stand behind, with their context, inside the case-study `results` and `solution` copy. Example for `work/hosting-platform.ts`:
> "Seven production apps run on one DigitalOcean droplet at $X/month, about $Y per app, versus $Z on per-app managed hosting (prices as of Nov 2026)."

Dated, first-party numbers like that are what AI answers quote and attribute.

### G-6 · Medium · No informational content for AI answers to cite
**Evidence:** The 59 sitemap URLs are all service, industry, case-study or hub pages. There is no blog, guide or insights page (`/blog` returns 404), yet the site sells Content Marketing, SEO and AIEO. Non-brand informational questions (for example "do Claude and ChatGPT sign a BAA?" or "what does a Shopify COD setup in Pakistan need?") have no page here to cite. The existing FAQ answers are good but are one paragraph deep.
**Fix:** Expand 4-6 existing FAQ answers into standalone answer pages with a table and a date. Candidates:
- "Which LLM providers sign a BAA? Anthropic vs OpenAI vs Azure vs Bedrock (2026)", expanding the healthcare FAQ
- "What HIPAA-compliant AI automation costs a medical billing company", with the $7,500 floor broken down
- "Running 7 production apps on one server with Coolify: costs and setup", from the hosting-platform case
- "Cash on delivery on Shopify in Pakistan: confirmation flows that cut returns", from the Toys and Meeshan experience

Link each one to its service page.

### G-7 · Medium · No author or lead attribution, and no dates
**Evidence:** No page has a byline, a reviewer, a `Person` node, `datePublished` or `dateModified` (the only top-level JSON-LD types anywhere on the site are Organization, WebSite, BreadcrumbList, Service/Offer and FAQPage). See `content.md` C-7 and C-16.
**Fix:** Add `lead` and `updated` fields to the content types, render them under each hero ("Led by Farrukh Bilal · Updated Nov 2026"), and emit `provider` → the Person `@id` and `dateModified` in the Service JSON-LD.

### G-8 · Medium · No multi-modal content
**Evidence:** 0 `<img>` and 0 `<video>`/`<iframe>` in `<main>` on `/`, `/work`, `/work/difacto`, `/work/thetoys`, `/services/web-development` and `/about`. `/public` holds only brand assets and icons. No team photos, no product screenshots, no diagrams with alt text.
**Fix:**
- One annotated screenshot per case study (`image` field), with descriptive alt text such as "DiFacto review queue flagging a supplier invoice line that exceeds the quoted price".
- One architecture diagram on `/services/healthcare-ai-automation` showing the PHI-minimization flow, as an SVG with a text caption.
- A 60-90 second founder video on `/about` (also answers `sxo.md` S-7).

### G-9 · Low · robots.txt: name Claude-SearchBot, drop anthropic-ai, keep the disallows consistent
**Evidence:** `src/app/robots.ts:14-21`. The named AI group has only `allow: "/"`. Because a named group replaces `*` for those bots, GPTBot, OAI-SearchBot and the others may crawl `/api/` and `/legal/`, which `*` disallows. Claude-SearchBot (Anthropic's search crawler) isn't named. It's allowed through `*`, but the comment "AI crawlers are welcome" suggests it was meant to be included. `anthropic-ai` isn't in Anthropic's current crawler documentation.
**Fix:**
```ts
{ userAgent: ["OAI-SearchBot", "Claude-SearchBot", "PerplexityBot", "GPTBot", "ClaudeBot", "Google-Extended"],
  allow: "/", disallow: ["/api/", "/legal/"] },
```
Remove `anthropic-ai`. Allowing the training bots (GPTBot, ClaudeBot, Google-Extended, CCBot) doesn't affect search citability. Keep or block them as a licensing choice.

### G-10 · Low · llms.txt quality nits
**Evidence (`/llms.txt`):**
- All 31 service lines read "…from $8,000. Starting at from $8,000, 4 weeks." The price is repeated and "Starting at from" is ungrammatical (`src/app/llms.txt/route.ts`, the `Starting at ${s.startingAt.price}` template).
- It inherits the market-list conflict from G-2.
- It gives no founder, team or phone.
- `/llms-full.txt` returns 404, although `/services/aieo-geo` sells "llms.txt and llms-full.txt" as a deliverable.

**Fix:** Change the template to `Starting price: ${price.replace(/^from /, "")} (${timeline}).` and strip the trailing price clause from `metaDescription` for this output, or don't append it. Add a "## Key facts" section: founder, founded, team size, verified client countries, phone, legal entity. Optionally serve `/llms-full.txt`, since you sell it.

### G-11 · Low · Letter-split animated headings pollute naive text extraction
**Evidence:** The `/` H3 "AI, integrated" is rendered as an `sr-only` span plus two `aria-hidden` copies split into one span per letter. `parse_html.py` reads this as "AI, integratedAI,integratedAI,integrated". `/work` "Shipped" and the footer wordmark "RevixPlus" are also emitted one letter per span, and "Shipped" has no `sr-only` whole-word copy, so extractors read "S h i p p e d". The "AI, integrated" `sr-only` copy is correct, so screen readers are fine there, but extractors that ignore `aria-hidden` read junk.
**Fix:** Render the animated letters through CSS (`::before` with `content: attr(data-text)`) or create them client-side after hydration, keeping only the `sr-only` text in the server HTML.

### G-12 · Low · 41 titles repeat the brand ("| RevixPlus | RevixPlus")
**Evidence:** All 31 service, 7 industry and 3 case-study titles end with a doubled brand, for example `/services/seo` "SEO Services for Growing Businesses | RevixPlus | RevixPlus". The cause is that each `seoTitle` already ends in "| RevixPlus" (for example `services/seo.ts:9`, `industries.ts:8`, `work/difacto.ts:32`) and `app/layout.tsx:19` appends `%s | RevixPlus` again. Cross-reference: on-page specialist.
**Fix:** Remove " | RevixPlus" from those `seoTitle` values, or return `title: { absolute: seoTitle }` from the page `generateMetadata`.

### G-13 · Low · Section headings are generic, and FAQ questions aren't headings
**Evidence:** Service-page H2s are "Sound familiar?", "What you get", "How we do it", "Related work" and "Further reading" (`/services/web-development`). FAQ questions are accordion buttons, not `h3`.
**Fix:** Make 2-3 H2s per service page descriptive, for example "What our web application development includes" and "How a RevixPlus web app project runs, week by week". Render FAQ questions inside `<h3>` within the accordion trigger.

### G-14 · Info · Not measured
AI citation share, AI-referral traffic, brand mentions (Wikipedia, Wikidata, Reddit, YouTube, LinkedIn) and per-platform visibility for Google AI Overviews, AI Mode, ChatGPT, Perplexity and Copilot were not measured: the site isn't live and no tools or credentials were available. After launch, re-run the question set your own `/services/aieo-geo` page describes against revixplus.com, and verify the domain in Bing Webmaster Tools and Search Console.

## Top 5 highest-impact changes

| # | Change | Finding | Effort |
|---|---|---|---|
| 1 | Make counters output their real value in the server HTML, and fix the stat values | G-1, `content.md` C-4 | 30 min (one component) |
| 2 | One canonical fact sheet (age, founder, countries, profiles), plus a Person node and founder in schema | G-2, G-4 | 2-3 h |
| 3 | Remove or make visible the homepage FAQ markup | G-3 | 5 min |
| 4 | Publish 3-5 dated first-party numbers, and screenshots for case studies | G-5, G-8 | 1-2 days (gathering data) |
| 5 | Turn 4 strong FAQs into dated answer pages with tables | G-6 | 1 week |
