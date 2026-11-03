# Content Quality and E-E-A-T: revixplus.com

**Content Quality Score: 58/100** (E-E-A-T 45/100, content craft 78/100, weighted 60/40)
**AI Citation Readiness (content view): 62/100**, scored in full in `geo.md`

Scope: all 62 URLs (59 sitemap URLs plus 3 legal pages), fetched from the production Docker build at `http://localhost:3100` with `render_page.py --mode never`. Every page is server-rendered (`is_spa: false`, HTTP 200 on all 62). Paths below are written as their production URLs. Source references are `src/content/<file>:<line>` unless noted. All scores are this skill's own heuristics. They are not Google signals, and Google publishes no numeric E-E-A-T weights.

Tools run: `render_page.py`, `parse_html.py`, `content_quality.py` (16 key pages), `metadata_template.py` (62 title/description pairs), a 6-word-shingle duplicate check across the service, industry and case-study templates, and a Flesch/Flesch-Kincaid pass on prose paragraphs. `textstat` is not installed, so readability uses a standard syllable heuristic. Tools not run: `nlp_analyze.py` (needs a Google Cloud NL key). Off-site reputation, reviews, backlinks and brand mentions are out of scope because the site isn't live and no credentials were provided.

## E-E-A-T breakdown

| Factor | Score | Key signals |
|---|---|---|
| Experience | 9/20 | 14 detailed, specific case-study narratives (DiFacto, Bankful, Revix MD and others) with real stacks and live URLs. But 35 of 42 result slots say "Pending", there are 0 screenshots, 0 testimonials, and visible "TODO: confirm" on 16 URLs. |
| Expertise | 15/25 | Technical depth is strong and accurate in specifics (BAA providers, CARC codes, HIPAA Security Rule, idempotent webhooks, IndexNow), and "Further reading" links go to web.dev, W3C and vendor docs. Weak points: only the founder has a real bio, no named expert appears on service pages, and some AIEO claims overstate Google guidance. |
| Authoritativeness | 7/25 | No on-site third-party proof: no reviews, partner badges, press, awards or client quotes. `sameAs` points to the founder's personal LinkedIn and GitHub. The company was founded in 2026, so this is expected, but nothing compensates for it yet. |
| Trustworthiness | 14/30 | Positives: transparent USD starting prices, an "HIPAA-compliant architecture, never certified" disclaimer, code and account ownership FAQs, email, phone, WhatsApp and city. Negatives: visible placeholders, a placeholder retention stat, privacy and terms visibly marked "draft, not reviewed by legal counsel", pre-2026 work written as "we", a promised AI-readiness tool that doesn't exist, and no legal entity or street address. |

**Who / How / Why:** *Who* is weak: no bylines, no named lead on service pages, and 3 of 4 team bios are one sentence. *How* is good: process, AI-use disclosure and review gates are all explained (`faqs.ts:25-26`). *Why* is good: the pages are clearly written to sell a real service, not to farm clicks.

## What works

- **Service pages are original, not spun.** Across the 31 service pages, 97% of each page's 6-word shingles are unique to it, and the most similar pair shares only 15% (ai-strategy-readiness vs rag-knowledge-assistants). There is no thin or duplicate-content risk between service pages.
- **No templated metadata.** `metadata_template.py` over 62 pairs returned `site_risk: low`, `templated_ratio: 0.0` and no shared CTA phrases.
- **No filler or AI-pattern flags.** `content_quality.py` gave 0 filler and 0 AI-pattern matches on all 16 pages tested, with overall quality of 73 to 94 (only `/contact` was flagged, as `thin-content`).
- **Answers are specific and quotable.** For example, `/services/healthcare-ai-automation`: "HIPAA-compliant AI automation at RevixPlus starts at $7,500 for a four-week first release covering two agents plus HR and task management automation for one client account." 191 unique FAQ questions across 43 pages, with 40-70 word answer-first replies.
- **Honest compliance framing.** "We describe our work as HIPAA-compliant architecture, never as certified" (`faqs.ts:30`). The healthcare page lists which providers offer BAAs and on what terms.
- **Hub readability is good.** Flesch Reading Ease: home 67.7, pricing 69.7, process 76.5, about 63.9. Service pages have a median of 58.6 (grade 9.9), which suits a B2B buyer.
- **AI use is disclosed** with a clear human-review rule (`faqs.ts:25-26`, `about.ts:7`).
- **Service pages carry outbound authority links** in a "Further reading" block (`authorityLinks` in every `services/*.ts`).

## Findings

No Critical findings in this category. Nothing here blocks indexing or is likely to draw a penalty on its own. The structured-data mismatch is covered in `geo.md` G-3.

### C-1 · High · "TODO: confirm" is visible on 16 indexable URLs, including the homepage
**Evidence:** The rendered main content shows the literal string `TODO: confirm` on `/` (Indibe card: "E-commerce, beauty marketplace · TODO: confirm"), on 9 case studies (`/work/indibe`, `/work/medallion-dusk`, `/work/hockeystore`, `/work/sushi2500`, `/work/his-energy`, plus the Indibe card on `/work/bankful`, `/work/meeshan-luxe-home`, `/work/the-vitamin-company`, `/work/thetoys`), on `/industries/ecommerce`, and on 5 service pages (`/services/ecommerce-development`, `/services/shopify-development`, `/services/email-marketing-automation`, `/services/playable-ads-web-games`, `/services/ui-ux-design`).
The sources are wider than the two locations you already knew about. There are **2 locations and 5 timelines**: `work/indibe.ts:8,11`, `work/medallion-dusk.ts:8,11`, `work/hockeystore.ts:11`, `work/sushi2500.ts:11`, `work/his-energy.ts:11`.
**Why it matters:** This is the clearest signal of an unfinished site a rater or buyer can see, and it repeats wherever the Indibe or Medallion Dusk card appears.
**Fix:** Fill the 7 fields. Until then, make the case-study page and card renderers skip any `location` or `timeline` value that starts with `TODO` (the field is simply not shown). Don't publish a guessed value.

### C-2 · High · The case studies have no outcome evidence: 35 of 42 result slots say "Pending" and there are no screenshots
**Evidence:** Every case study renders a "Results" block. 35 of the 42 slots show "Pending" with "Figure awaiting client approval." Examples: `/work/difacto` (3 of 3, `work/difacto.ts:25-27`), `/work/revixmd-ai-automation` (3 of 3, `work/revixmd-ai-automation.ts:35-37`) and `/work/thetoys` (3 of 3). The 7 real values describe scope, not outcomes: "5 e-commerce platforms from one codebase", "2 portals on one shared backend", "6 to 7 production apps on one server". There are 0 `<img>` and 0 video elements in `<main>` on `/`, `/work`, `/work/difacto`, `/work/thetoys`, `/about` and `/services/web-development`, and `/public/work/` doesn't exist. The `/work` hub's H1 is "Proof, not promises." and its lead says "Screenshots and figures are being added as clients approve them" (`app/work/page.tsx:93-94`).
**Contradiction:** `industries.ts:99` says "The Toys is our own brand, and we publish its numbers as a live case study", but `/work/thetoys` shows 3 of 3 results as Pending. `industries.ts:358` promises "you can see the creative system and the results before you commit", but no creatives are shown.
**Fix, in order:**
1. **The Toys** is your own brand, so no client approval is needed. Publish real numbers now in `work/thetoys.ts` `results` (orders/month, ROAS, follower growth, COD confirmation rate) and add 6-10 creative samples via the `image` field.
2. Replace pending outcome slots with **verifiable non-confidential facts** you already have. Example for DiFacto: `{ value: "2023", label: "in production since" }`, `{ value: "Any layout", label: "supplier invoice formats parsed" }`. Rather than "Pending", show 2 strong facts.
3. Add one screenshot per case study (`image` field, `types.ts:100`). Blur client data if needed.
4. Until a case study has at least one outcome number, hide the "Results" heading instead of showing three "Pending" tiles.

### C-3 · High · The homepage "What clients say" section shows 6 placeholder cards
**Evidence:** `/` H2 "What clients say." renders 6 cards, each reading "Words from this client are on their way. Ask us for a reference call in the meantime." (Meeshan Luxe Home, The Vitamin Company, Sushi2500, Bankful, Revix MD, DiFacto). The source is `components/home/Voices.tsx:60` reading `testimonials.ts:7-56`, where all six have `status: "TODO"`.
**Why it matters:** A trust section that contains no testimonials draws attention to the gap. It reads as "nobody would give us a quote" and it repeats six times.
**Fix:** Hide the `Voices` chapter until `approvedTestimonials.length >= 2`. In its place, put one honest line under the work gallery: "References from Bankful, DiFacto and Revix MD available on a call." Collect two short approved quotes first, from your own brand or the clients most likely to agree.

### C-4 · High · Placeholder and unverifiable statistics
**Evidence:** `site.ts:26-31` renders on `/` ("By the numbers") and `/about`: **"91% clients who come back"** (placeholder you already know about; there is no source and no client count for a company founded in 2026, per `site.ts:19`), **"50+ products and stores launched"** (14 case studies are shown), **"10+ years shipping software"** (shown as a company stat, but it is the founder's career, per `about.ts:5` and `team.ts:7`), and **"5 countries served"**, while `site.ts:17` lists 6 markets.
**Why it matters:** Each figure is presented as company data, but none can be checked from the site.
**Fix (`site.ts` `stats`):** Delete the 91% stat. Reword the rest so each one is true and attributable:
- `{ value: 10, suffix: "+", label: "years our founder has shipped production software" }`
- `{ value: 14, suffix: "", label: "case studies you can open and verify" }` (or keep 50+ only if you can list them on request, with the label "projects launched by our team since 2016")
- `{ value: 4, suffix: "", label: "countries with live client work: Denmark, US, Pakistan, EU" }`. Match this to C-6 and `geo.md` G-2.

### C-5 · High · Work done before the 2026 founding is written as "we" with no explanation
**Evidence:** `site.ts:19` `founded: "2026"` and `about.ts:5` "RevixPlus started in Lahore in 2026". Yet:
- `industries.ts:116` (`/industries/fintech`): "Between 2019 and 2023 we built and maintained a payment gateway…"
- `industries.ts:114`: "Four years building Bankful's multi-platform gateway."
- `about.ts:7`: "Since 2023 the work itself has changed. We have shipped RAG pipelines…"
- Case-study timelines: Bankful 2019-2023 (`work/bankful.ts:22`), Meeshan 2018-2023 ("technical operations led in-house for five years", `work/meeshan-luxe-home.ts:22`), The Vitamin Company 2017-2020 (`work/the-vitamin-company.ts:21`), DiFacto 2023-present.

All 9 case studies with a known timeline start before the company existed (the other 5 say "TODO: confirm"), and 3 ended before it. Phrases like "led in-house" and "delivered inside a distributed US and Pakistan team" (`work/bankful.ts:33`) suggest employee or contractor roles.
**Why it matters:** This is the main trust risk on the site. A buyer who calls a reference, or a rater who checks the founding date, finds that the "agency" claims predate the agency. Google's QRG treats misrepresenting who did the work as a trust problem.
**Fix:** Keep the work but attribute it honestly. Add one sentence to each pre-2026 case study's first `challenge` paragraph, or add a `context` field. Examples:
- Bankful: "Delivered 2019-2023 by our founder, Farrukh Bilal, as lead engineer on Bankful's distributed US and Pakistan team, before RevixPlus was founded."
- `industries.ts:116`: "Between 2019 and 2023 our founder built and maintained a payment gateway…"
- `about.ts:7`: "Since 2023 our team has shipped RAG pipelines…" (this works only if that is accurate for each person). Otherwise write "Since 2023 Farrukh has shipped…".

### C-6 · High · Privacy, terms and cookies are publicly labelled as unreviewed drafts
**Evidence:** `/legal/privacy`: "Draft notice: This policy is a working draft prepared for RevixPlus and has not yet been reviewed by legal counsel." The same appears on `/legal/terms` and `/legal/cookies` (`legal.ts:8,38,68`). The policy names no legal entity, registration number or postal address of the controller (`legal.ts` "Who we are"). `site.ts:5` sets `legalName: "RevixPlus"`, the same as the brand.
**Why it matters:** The site sells "Security hardening and GDPR, HIPAA and EU Accessibility Act compliance" (`/services/security-compliance`). A buyer evaluating a compliance vendor reads this as the vendor not having its own compliance in order. GDPR Art. 13 also expects the controller's identity and contact details.
**Fix:** Get the three documents reviewed and remove the draft notice. Add the registered entity name (for example "RevixPlus (SMC-Private) Limited" or the sole-proprietor name), a registration number if one exists, and a postal address to `legal.ts` and `site.ts:5` `legalName`. If review will take weeks, replace the notice with a neutral "Last reviewed: <date>" line and keep the substance accurate.

### C-7 · Medium · Team signals are thin, and no named expert appears on service pages
**Evidence:** `/about` "The team" (`team.ts:12-28`): 3 of 4 bios are one sentence. "Jillani" has no surname and his role is just "Developer". Only the founder has a LinkedIn link. Avatars are initials ("FB", "US", "SH", "J") with no photos (`photo` is unset for everyone). No member lists credentials, certifications or years of experience. On service pages, including the healthcare page (YMYL-adjacent), no person is named as lead or reviewer.
**Fix:**
- `team.ts`: give everyone a full name, a photo (`photo`), a LinkedIn link, and a 2-3 sentence bio with years of experience, 2 named past projects and any certifications (Shopify Partner, Meta Blueprint, Google Ads, AWS). Example for Saqib: "Saqib has run SEO and paid social for e-commerce and healthcare brands since 20XX, including The Toys and the Revix MD blog. He holds Google Ads Search and Meta Media Buying certifications."
- Add an optional `lead` field to the `Service` type and render "Led by Farrukh Bilal, Founder and CTO · 10+ years in production software" under the hero on AI, healthcare and engineering pages.

### C-8 · Medium · Three priced services have no first-hand proof, and their "Related work" isn't related
**Evidence:** No case study mentions games, Unity, Godot, playables, React Native, Expo, iOS or Android (word-boundary grep of `work/*.ts`). Even so:
- `/services/game-development` ("You get a finished game…", from $10,000) shows Related work of The Toys (a toy store) and Hockeystore.dk (a hockey gear store) (`services/game-development.ts` `relatedWork`).
- `/services/playable-ads-web-games` shows The Toys and Indibe.
- `/services/mobile-app-development` (from $12,000) shows HRMS, DiFacto and Bankful, which are all web projects.
- `/pricing` lists "Game MVP from $10,000" and "Mobile App from $12,000".

**Fix:** Retitle the block on these pages from "Related work" to "Projects by the same team", or remove it. Add one small proof item each: a playable demo or HTML5 game you built (even an internal one, like `hosting-platform`), or an app store link. If none exists, say so honestly in the hero: "New practice, led by…".

### C-9 · Medium · Industry pages say "Work in this industry" but show off-industry projects, and their unique copy is thin
**Evidence:** `industries.ts:242` (`/industries/education`) lists `hrms-saas` (HR software) and `revixmd-website` (medical billing) under "Work in this industry", although the intro says "We have built program sites with enrollment workflows, student portals…" (`industries.ts:218-219`). `/industries/hospitality-food` shows `thetoys` (a toy store, `industries.ts:346`). `/industries/fintech` and `/industries/energy-industrial` show the internal `hosting-platform` (`industries.ts:138,294`). The unique copy on each industry page (intro, 3 pains and 4 FAQs) comes to roughly 380-400 words. The rest is reused service and case-study cards: 20-27% of `/industries/ecommerce`'s shingles also appear on 4 service pages.
**Fix:** Rename the block to "Related work" when no in-industry project exists, and add one in-industry proof line or project per page. Raise unique copy to 600+ words with an industry-specific "How we approach <industry> projects" section (compliance, integrations and KPIs specific to that sector). For education, either add the real enrollment-workflow project mentioned in the FAQ (`industries.ts:246` "We have done this on WordPress with Gravity Forms") as a case study, or soften the intro claim.

### C-10 · Medium · Healthcare industry page and healthcare service page overlap in intent
**Evidence:** `/industries/healthcare-rcm` has the title "Healthcare & Medical Billing Software, HIPAA-Compliant AI" and the H1 "Software, AI and growth for medical billing companies and practices". `/services/healthcare-ai-automation` has the title "HIPAA-Compliant AI Agents for Medical Billing & RCM". Both pitch HIPAA AI agents for billing companies using the same Revix MD proof, and 24% of the industry page's shingles appear on the service page.
**Fix:** Make the industry page the broad hub: website, SEO, content and automation for billing companies, with the title "Medical Billing Company Websites, SEO & Automation". Keep "HIPAA-compliant AI agents" for the service page only, and link the industry page to it with that anchor text.

### C-11 · Medium · Revix MD is the only healthcare proof, and its name overlaps with "RevixPlus"
**Evidence:** Healthcare proof on `/industries/healthcare-rcm`, `/services/healthcare-ai-automation` and `/work/revixmd-ai-automation` comes entirely from "Revix MD". The shared "Revix" name invites the question whether it is a sister company. The site discloses affiliation for The Toys ("RevixPlus growth lab", `work/thetoys.ts:6`) and the hosting platform ("internal"), but says nothing about Revix MD.
**Fix:** If the companies are related (shared ownership or founder), add "(sister company)" to `client` in `work/revixmd-ai-automation.ts:6` and `work/revixmd-website.ts:6`, plus one sentence explaining the relationship. If they are not related, add "Revix MD is an independent US billing company; the similar name is a coincidence" to the case study. Either way, the reader stops wondering.

### C-12 · Medium · Client-geography claims conflict, and two markets have no proof
**Evidence:** Hero: "Clients in the US, UK, EU, UAE and Pakistan" (`home.ts:11`). Home work section: "clients in five countries" (`home.ts:54`). `/work` "Client locations": Denmark, Pakistan, United States, Europe (`app/work/page.tsx:82`). `/services/web-development`: "Ten years of production apps for clients in Denmark, the US, the UK and the UAE" (`services/web-development.ts:21`). None of the 14 case studies is in the UK or UAE.
**Fix:** Settle on one verifiable set and use it everywhere. For example `site.location.serving` = clients in Denmark, the US, the EU and Pakistan, serving the UK and UAE. Hero: "Client work live in Denmark, the US, the EU and Pakistan". Change "Ten years of production apps for clients in Denmark, the US, the UK and the UAE" to "…for clients in Denmark, the US and Pakistan" unless UK/UAE work can be named.

### C-13 · Medium · The AIEO service page overstates what Google says about llms.txt and markup
**Evidence:** `/services/aieo-geo`:
- Hero: "We make yours one of them: clear entity statements, structured data, quotable answers, an llms.txt file…" (`services/aieo-geo.ts:23`)
- Pain: "The summary favors pages with direct answers, structured data and consistent entity names" (`:31`)
- Step: "seed mentions on the sources models already cite" (`:63`)

Google's AI optimization guide (Search Central, 2026) says llms.txt and AI-specific markup are not needed for Google Search or AI Overviews, and warns that chasing inauthentic mentions is unhelpful. Your own FAQ at `:99` is more accurate ("a proposed convention rather than a formal standard").
**Why it matters:** For an agency that sells this service, an inaccurate claim on its own page is an Expertise problem.
**Fix:**
- `:31`: "The summary is drawn from pages Google already ranks and trusts; clear, direct answers and consistent entity names make the right passage easy to lift."
- `:23`: drop llms.txt from the hero or add "(for non-Google assistants)".
- `:63`: "earn mentions in the communities and directories your buyers already read" instead of "seed mentions".

### C-14 · Low · Case-study prose runs long
**Evidence:** The 14 case studies have a median Flesch Reading Ease of 48.5 (grade 11.5), an average sentence length of 20.8 words, and 30-47% of sentences over 25 words. Examples: `/work/revixmd-ai-automation` (47% long), `/work/his-energy` and `/work/the-vitamin-company` (41%). Some service pages are also long-winded: `/services/social-media-marketing` 57%, `/services/branding-graphic-design` 54%, `/services/security-compliance` FRE 41.6.
**Fix:** Split `solution[]` paragraphs in `work/*.ts` into 2-3 sentences each, and lead each with the result: "n8n now builds each biller's daily worklist. It pulls eligibility and claim status…".

### C-15 · Low · The same 8 general FAQs repeat on 5 hub pages
**Evidence:** `generalFaqs` (`faqs.ts:3-36`) is rendered, with FAQPage markup, on `/about`, `/pricing`, `/process` and `/services`, and 5 of the 8 are also on `/` (schema only, see `geo.md` G-3).
**Fix:** Give each hub its own 4-5 questions:
- **pricing:** "What does the discovery week cost?", "What payment terms do you use?", "Can I pay in GBP, EUR or AED?"
- **process:** "What happens if scope changes mid-build?"
- **about:** "Who founded RevixPlus?", "Is RevixPlus a registered company?"

Keep 2-3 shared questions at most.

### C-16 · Low · No visible publish or update dates
**Evidence:** No service, industry or case-study page shows a date. `render_page.py` (htmldate) falls back to `2026-01-01` from "© 2026". All 59 sitemap `<lastmod>` values equal the build date (`2026-11-03`). Only the legal pages show "Last updated".
**Fix:** Add `updated: "YYYY-MM-DD"` to the `Service`, `Industry` and `CaseStudy` types and render "Updated <Month YYYY>" in the page footer area. Feed it to the sitemap `lastModified` and to `dateModified` in schema.

### C-17 · Info · Placeholder bios
Team bios are short placeholders (`team.ts:14,20,26`), which you already know. Severity is covered by C-7.

## Recommendations (priority order)
1. Remove every visible placeholder: TODOs (C-1), "Pending" tiles (C-2), the testimonials section (C-3) and the 91% stat (C-4). This is a few hours of content edits and is the biggest trust gain per hour.
2. Attribute pre-2026 work honestly (C-5) and settle the country list (C-12).
3. Get the legal pages reviewed and add the legal entity and address (C-6).
4. Publish The Toys numbers and creatives, and add one screenshot per case study (C-2).
5. Strengthen team bios and add a named lead on service pages (C-7).
