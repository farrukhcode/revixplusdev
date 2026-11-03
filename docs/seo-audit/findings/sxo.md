# Search Experience (SXO): revixplus.com

**SXO Gap Score: 55/100.** This is a separate score from the SEO Health Score. It averages the main money pages: `/`, `/services`, `/services/web-development`, `/services/healthcare-ai-automation`, `/services/seo`, `/pricing`, `/work` and `/contact`.

Method: the pages were fetched with `render_page.py` (server HTML) and parsed with `parse_html.py`. They were also loaded in Chrome through playwright-core at 390×844 and 1440×900 to check the above-the-fold view, CTAs and animated counters. Screenshots are in `c3/shots/` in the scratchpad.

**Main limitation:** no SERP data. The site isn't live and there are no Google or DataForSEO credentials, so steps 2-4 of the SXO method (top-10 SERP page types, PAA, ads, AI Overview sources) were **not performed**. Page types are classified with the skill's taxonomy. Alignment is marked "assumed" wherever it depends on a SERP I couldn't see, and personas come from the site's own audience statements (the pricing "Best for" lines and industry intros), not from SERP signals.

## Gap analysis (7 dimensions)

| Dimension | Score | Evidence |
|---|---|---|
| Page type | 12/15 | Service pages meet the taxonomy's "Service Page" profile: problem → deliverables → process → price → case studies → FAQ → CTA, with `Service` and `Offer` schema. The pricing page is a true pricing page and `/services` is a real hub. Alignment with the SERP is assumed, not measured. |
| Content depth | 11/15 | Service pages have 650-760 words of unique main content (healthcare 1,205). Industry pages have about 380-400 unique words. `/contact` is thin (61 extracted words). |
| UX signals | 11/15 | A primary CTA and the price are above the fold on service and pricing pages (screenshots). Mobile has a sticky Start / Book a call / WhatsApp bar. Deductions: a promised AI-readiness tool that doesn't exist (S-1), a "Watch the story" button that has no video, and no location or hours on contact. |
| Schema | 11/15 | Present: Organization, WebSite, Breadcrumb, Service+Offer and FAQPage. Missing: Person, and any CreativeWork/Article on case studies. The homepage FAQ markup has no matching visible content (`geo.md` G-3). |
| Media | 3/15 | There are 0 `<img>` and 0 video elements in `<main>` on `/`, `/work`, case studies, `/about` and service pages. There are no work screenshots or team photos. The WebGL globe and animated bento grids are decorative. |
| Authority | 4/15 | 0 testimonials. 35 of 42 case-study results are "Pending". "TODO: confirm" is visible on 16 URLs, the 91% stat is a placeholder, and the legal pages are drafts (see `content.md` C-1 to C-6). |
| Freshness | 3/10 | No visible dates on service pages or case studies. Sitemap `lastmod` is the build date on all 59 URLs. |

## Page-type alignment (taxonomy-based; SERP not measured)

| Page | Classified as | Likely intent | Verdict |
|---|---|---|---|
| `/` | Landing/hub (brand) | Brand navigation | ALIGNED for brand queries. The H1 "We build what's next for your business." doesn't name the category (S-9). |
| `/services` | Service hub | Commercial investigation | ALIGNED. All 31 services with a one-line summary and starting price. |
| `/services/*` (31) | Service Page | Commercial: "X development agency/services" | ALIGNED (assumed). The taxonomy requires "at least one case study or testimonial": case studies exist, but none has a visible outcome. |
| `/pricing` | Pricing | Transactional or brand + "pricing" | ALIGNED for brand pricing queries. Non-brand "how much does X cost" SERPs often favour guides; not verified. |
| `/work`, `/work/*` | Portfolio / case study | Decision-stage validation | ALIGNED on type, but weak on substance (S-2). |
| `/contact` | Contact/conversion | Navigational | ALIGNED |

## What works

- **Price and CTA above the fold.** On `/services/healthcare-ai-automation` (desktop) the first screen holds the H1, a promise naming the client ("Delivered for Revix MD, a US medical billing company"), "Get an estimate" and a "from $7,500 · 4 weeks" chip. `/pricing` shows three priced packages on the first screen.
- **Open pricing.** All 11 packages show a floor price, timeline, "Best for" and 4 inclusions. Retainer notice periods are stated ("cancel with 30 days notice", "two weeks notice").
- **CTAs carry context.** Service CTAs go to `/contact?topic=<slug>`, which pre-selects the service in the form (`app/contact/page.tsx:96-100`).
- **Low-friction contact.** There are three routes (brief form, 20-minute booking, WhatsApp), a reply promise ("a real person replying within one business day"), "NDA on request", and optional budget ranges.
- **Ownership and lock-in fears are answered directly.** "Who owns the code, the accounts and the content? You do, from the first day."
- **The mobile sticky action bar** (Start / Book a call / WhatsApp) is visible on the first screen at 390px.

## Findings (lead finding first)

### S-1 · High · Two promised free tools don't exist
**Evidence:**
- `/` final CTA "Get a free AI-readiness report: Eight questions, a score, and the three things to do first." links to `/contact?topic=ai-readiness` (`home.ts:121-125`). That page is the generic brief form with "Free AI-readiness report" as a dropdown option (`components/forms/LeadForm.tsx:92`). There are no questions and no score.
- The FAQ "What is the first step…" says "You can also run the free AI readiness check or website audit on this site first and bring the report to the call" (`faqs.ts:34`). No such check or audit exists. A grep of `src/` finds `ai-readiness` only in the form option and `lib/lead.ts`. This FAQ renders on `/about`, `/pricing`, `/process` and `/services`.

**Why it matters:** These are the two lowest-commitment entry points for the "exploring AI" persona, and the first one fails right after the click.
**Fix (choose one):**
- (a) Build the 8-question quiz.
- (b) Change the copy today:
  - `home.ts:122-123`: title "Ask for a free AI-readiness note", body "Tell us your top three manual processes. We reply within two business days with a scored shortlist and the first thing to automate."
  - `faqs.ts:34`: delete the last sentence, or change it to "You can also ask for a free AI-readiness note through the contact form and bring it to the call."

### S-2 · High · The decision-stage proof path ends in "Pending"
**Evidence:** Every service page funnels to "Related work", and the case studies there show "Pending · Figure awaiting client approval" (35 of 42 slots). `/work` has the H1 "Proof, not promises." with the lead "Screenshots and figures are being added as clients approve them" (`app/work/page.tsx:93-94`). The homepage "What clients say." shows 6 placeholder cards. For every persona below, Trust is the lowest dimension. Details and fixes are in `content.md` C-2 and C-3.
**SXO fix:** Until real figures arrive, change the `/work` H1 to something the page can deliver, for example "Work you can open and check." (every case study has a live URL). Add a "Visit live site" link on every work card, and show 2 verifiable facts per case study instead of 3 Pending tiles.

### S-3 · Medium · Pricing leaves out the first thing a buyer pays for
**Evidence:** `/pricing` says "Every project is scoped in a fixed-price discovery week" and "credited toward the build" (`pricing.ts:165`), but the discovery week's price appears nowhere on the site (searched across all of `src/content`). The page doesn't state payment terms (deposit or milestone split) beyond "billed by milestone". All prices are USD only, while the hero targets UK, EU and UAE buyers.
**Fix:** In `pricing.ts`, add "Discovery week: $X, fixed, credited in full toward the build" to the notes. Add a "Payment terms" line, for example "30% at kickoff, the rest by milestone on staging". Add "We invoice in USD, GBP, EUR or AED" if true. Mirror both in the pricing FAQ (`content.md` C-15).

### S-4 · Medium · The contact page and footer don't show where the company is
**Evidence:** `/contact` main text contains no city, time zone or working hours; it lists only the form, booking, WhatsApp (+92 321 242 2242) and email. The footer contains email, LinkedIn, Instagram, GitHub, links and "© 2026 RevixPlus", with no location. "Lahore" appears only on `/about` and in the FAQs. A US or EU buyer who sees a +92 number with no context is left guessing.
**Fix:** Add a "Where we are" block to `/contact` and the footer, sourced from `site.ts`: "RevixPlus · Lahore, Pakistan (PKT, UTC+5) · Working hours overlap US Eastern mornings and EU afternoons · Mon-Fri". Add the street address if one can be published (it also helps the `geo.md` entity findings).

### S-5 · Medium · The healthcare buyer's first trust question goes unanswered
**Evidence:** On `/services/healthcare-ai-automation` and `/industries/healthcare-rcm`, every BAA statement is about the model provider: "We sign a BAA with the model provider or run the model inside your own environment" (`industries.ts:39`, `faqs.ts:30`). Nothing says whether RevixPlus itself signs a BAA with the client as a business associate or subcontractor. The privacy policy is still a draft (`content.md` C-6), and the only healthcare proof is Revix MD (`content.md` C-11).
**Fix:** Add a 6th FAQ to `services/healthcare-ai-automation.ts`, "Will RevixPlus sign a BAA with us?", with the answer: "Yes. Before any PHI reaches our systems we sign a Business Associate Agreement with you, and matching agreements with every model or hosting provider in the chain." Use it only if true, and have counsel confirm it.

### S-6 · Low · Industry-page CTAs don't pre-select a topic
**Evidence:** `/industries/healthcare-rcm` links "Talk to us about healthcare & medical billing" to `/contact?topic=healthcare-rcm`. The form's `<select>` contains only service slugs plus `ai-readiness` (`components/forms/LeadForm.tsx:90-92`), so the value doesn't match and the select silently falls back to "Choose a service".
**Fix:** In `industries.ts`, point each industry CTA at its lead service, for example `?topic=healthcare-ai-automation`. Alternatively, add an optgroup of industries to the form.

### S-7 · Low · "Watch the story" suggests a video that doesn't exist
**Evidence:** The secondary hero CTA on `/` is "Watch the story", which links to `#problem` (`home.ts:10`). It only scrolls the page.
**Fix:** Rename it to "See how we work" or "Read the story". Alternatively, record a 60-90 second founder video, which also helps `content.md` C-7 and `geo.md` G-8.

### S-8 · Low · On mobile, the growth-panel counters stay at "0" until the user swipes sideways
**Evidence:** In Chrome at 390×844, after scrolling the whole homepage, the counters read `["90+","0","0+","0 days",…]`. On desktop all of them animate: `["90+","5","30+","7 days",…]`. The panels sit in a horizontal scroller, and `useInView` (vertical margin) never fires for off-screen panels (`components/ui/stats-counter.tsx:28`). The server-HTML side of this bug is a GEO issue (`geo.md` G-1).
**Fix:** Initialise `displayValue` to `value` and animate only after mount, or render the final value whenever `useInView` hasn't fired (see `geo.md` G-1).

### S-9 · Low · The homepage H1 is a slogan with no category word
**Evidence:** The `/` H1 is "We build what's next for your business." The category ("software, AI and growth agency") appears only in the title and meta description, not in any visible heading. That's fine for brand searches, but weak for "software and AI agency Lahore/Pakistan" type queries.
**Fix:** Keep the slogan and put the category in the eyebrow and subhead. `home.ts:6`: change the eyebrow to "Software, AI and growth agency · Lahore". Or start `home.ts:8` with: "RevixPlus is one senior team for software, AI integration and the marketing that fills it with customers."

### S-10 · Low · The footer lists only 5 of the 7 industries
**Evidence:** The footer's "Industries" column lists Healthcare, E-commerce, Fintech, SaaS and Education. `/industries/energy-industrial` and `/industries/hospitality-food` are missing (they are in the sitemap).
**Fix:** Render all industries from `industries.ts` in the footer, or link a single "All industries" entry.

## Persona scores (derived from the site's stated audiences, not SERP)

Ordered weakest first.

| Persona (source) | Stage | Relevance | Clarity | Trust | Action | Total | Biggest gap → fix |
|---|---|---|---|---|---|---|---|
| SMB owner exploring AI (home "AI-readiness report" door) | Awareness | 18 | 17 | 13 | 10 | **58** | The promised quiz is missing → S-1 |
| UK / UAE buyer (hero "Clients in the US, UK, EU, UAE") | Consideration | 15 | 18 | 11 | 17 | **61** | No UK/UAE proof, USD only, no address → `content.md` C-12, S-3, S-4 |
| E-commerce brand owner (`/pricing` "Shopify Store… cash on delivery markets") | Decision | 22 | 20 | 11 | 19 | **72** | TODO on Indibe/Medallion cards and The Toys numbers not shown → `content.md` C-1, C-2 |
| Founder shipping an MVP (`/pricing` "Web App… real MVP") | Decision | 21 | 20 | 12 | 19 | **72** | No outcome figures or testimonials on DiFacto/HRMS → S-2 |
| Medical/dental billing company (`/pricing` "HIPAA AI Agents") | Decision | 23 | 20 | 12 | 18 | **73** | No client BAA statement, single affiliated-looking proof → S-5, `content.md` C-11 |
| Product team hiring a developer (`/pricing` "Dedicated Developer") | Decision | 21 | 21 | 13 | 20 | **75** | Thin team bios, no photos or named developers → `content.md` C-7 |

## Priority actions
1. S-1: fix or remove the AI-readiness and website-audit promises. This is a copy change today.
2. S-2 and `content.md` C-1 to C-3: clear the placeholders on the proof path, and retitle `/work` until figures arrive.
3. S-3: publish the discovery-week price and payment terms.
4. S-4: show location, time zone and hours on `/contact` and in the footer.
5. S-5: answer the client-BAA question on the healthcare pages.

## Limitations
- SERP backwards analysis was not run: no live SERP, PAA, ads, AI Overview or related-search data (the site isn't live, and no Google or DataForSEO credentials were available). Page-type alignment and personas need re-checking against real SERPs after launch for at least these queries: "HIPAA compliant AI agents medical billing", "Shopify development agency", "AI integration services", "dedicated developers Pakistan" and "RevixPlus".
- The chat concierge and the lead form were not submitted, so the reply flow wasn't tested end to end.
- Mobile and desktop above-the-fold checks used one viewport each (390×844 and 1440×900).
