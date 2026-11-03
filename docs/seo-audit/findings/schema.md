# Schema / Structured Data: revixplus.com

**Score: 74 / 100**

Scope: all JSON-LD on the 59 sitemap URLs, extracted from server-rendered HTML with `parse_html.py` and a full `json.loads` of every `<script type="application/ld+json">` block (`$SP/onp/pages.json`). There is no Microdata or RDFa on the site (0 pages with `itemscope`, `itemprop`, `typeof` or `vocab`). Rules follow the claude-seo schema skill, checked October 2026: FAQ rich results have been retired for all sites since 2026-05-07; HowTo, SpecialAnnouncement and the other deprecated types are never recommended.

The JSON-LD is emitted by:
- `src/lib/schema.ts`: the schema builders.
- `src/components/seo/JsonLd.tsx`
- `src/app/layout.tsx:67`: Organization and WebSite on every page.
- `src/components/ui/Breadcrumbs.tsx:10`
- `src/components/ui/FaqList.tsx:19`
- `src/app/services/[slug]/page.tsx:47`
- `src/app/page.tsx:32`

## Types per template

| Template | Pages | JSON-LD types found |
|---|---|---|
| Home `/` | 1 | Organization, WebSite, FAQPage (5 Qs, **not on page**) |
| Hubs `/services`, `/process`, `/pricing`, `/about` | 4 | Organization, WebSite, BreadcrumbList, FAQPage (8 Qs) |
| `/work`, `/contact` | 2 | Organization, WebSite, BreadcrumbList |
| Service `/services/*` | 31 | Organization, WebSite, **Service** (+Offer), BreadcrumbList, FAQPage (4 or 5 Qs) |
| Industry `/industries/*` | 7 | Organization, WebSite, BreadcrumbList, FAQPage (4 Qs) |
| Case study `/work/*` | 14 | Organization, WebSite, BreadcrumbList (**no Article or CreativeWork**) |

## Validation results

| Type | Status | Notes |
|---|---|---|
| Organization (`#organization`) | Valid, with warning | Has name, url, logo (512x512 PNG, returns 200), description, email, telephone, address, areaServed, foundingDate and knowsAbout. `sameAs` lists personal profiles (see Medium finding). No `contactPoint`, `founder` or `legalName`. |
| WebSite (`#website`) | Valid | Has name, url, publisher `@id` and inLanguage. This is enough for the site name in results. |
| BreadcrumbList | Valid, with warning | Positions are sequential and every `item` is an absolute URL. The industry trails point "Industries" at `/services`, and the service trails use a fragment URL (`/services#web-mobile`). |
| Service | Valid, with warning | provider `@id` resolves to the Organization on the same page. `offers.price` gives a "from" price as an exact price and drops the "per month" unit. Service is not a Google rich-result type, so this matters only for entity and AI understanding. |
| FAQPage | Info | Valid syntax, but the type has had no Google rich result since 2026-05-07. 215 of 220 Questions match visible on-page text; the 5 homepage Questions do not. |
| All blocks | Pass | `@context` is `https://schema.org`, URLs are absolute, there is no placeholder text (scanned for `TODO`, `[...]` and lorem), no deprecated types, and no JSON parse errors. JSON-LD is server-rendered, not injected by client JS. |

## What works

- **Consistent entity identity:** `@id` anchors (`https://revixplus.com/#organization` and `/#website`) are used as references (`publisher`, `provider`) rather than duplicating the Organization on every page.
- **Sitewide Organization data is rich and accurate:** a logo that meets Google's logo guidelines (512x512, crawlable, legible on white), plus email, telephone, address, areaServed and knowsAbout.
- **Every inner page has a BreadcrumbList that matches the visible breadcrumb trail.**
- **All 31 service pages carry Service with provider, areaServed and a USD Offer**, generated from the same typed content as the page.
- **The markup is typed with `schema-dts`, so invalid property names fail at compile time.** The `<` escaping in `JsonLd.tsx:11` prevents breaking out of the script tag.
- **No deprecated or retired types are used.**

## Findings

### MEDIUM: The homepage FAQPage marks up five questions that are not on the page

- **Evidence:** `/` emits FAQPage with "How do you price projects?", "How long does a typical project take?", "How does remote work across time zones actually function?", "Who actually builds the work?" and "Who owns the code, the accounts and the content?". None of these question or answer strings appears in the visible homepage text; the homepage has no FAQ section among its H2s.
- **Source:** `src/app/page.tsx:32`, `<JsonLd data={faqSchema(generalFaqs.slice(0, 5))} />`.
- **Impact:** Google's structured-data guidelines require marked-up content to be visible on the page; markup for hidden content is the pattern behind "spammy structured data" manual actions. Since 2026-05-07 there is also no rich result to gain.
- **Fix:** Delete line 32, plus the now-unused `faqSchema` and `generalFaqs` imports in `src/app/page.tsx`. Alternatively, render a visible FAQ chapter using `<FaqList withSchema faqs={generalFaqs.slice(0, 5)} />`.

### MEDIUM: Case studies have no Article markup

- **Evidence:** All 14 `/work/*` pages set `og:type=article` but carry only Organization, WebSite and BreadcrumbList. These pages are the site's first-hand-experience proof, and `CaseStudy` has the data Article needs: title, summary, client, liveUrl and an OG image per slug. It has no dates, though.
- **Fix:**
  1. Add `published: string` and `updated?: string` (ISO 8601) to `CaseStudy` in `src/content/types.ts` and fill them in with real dates.
  2. Add the builder below to `src/lib/schema.ts`.
  3. Render `<JsonLd data={caseStudySchema(w)} />` in `src/app/work/[slug]/page.tsx`.

  `datePublished` is not strictly required by Google, but Article is eligible for the article rich result and date display only with accurate dates. Do not invent them.

```ts
// src/lib/schema.ts
import type { Article } from "schema-dts";
import type { CaseStudy } from "@/content/types";

export function caseStudySchema(w: CaseStudy): WithContext<Article> {
  const url = absoluteUrl(`/work/${w.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: w.title,
    description: w.metaDescription,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(`/work/${w.slug}/opengraph-image`),
    datePublished: w.published,
    dateModified: w.updated ?? w.published,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    about: {
      "@type": "Organization",
      name: w.client,
      ...(w.liveUrl && { url: w.liveUrl }),
    },
    keywords: w.stack.join(", "),
  };
}
```

Rendered example for `/work/difacto` (fill in the dates):

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://revixplus.com/work/difacto#article",
  "headline": "AI invoice control for Danish construction companies",
  "description": "How RevixPlus built DiFacto, a GenAI SaaS that reads supplier invoices in any layout and validates prices against quotes for Danish construction companies.",
  "url": "https://revixplus.com/work/difacto",
  "mainEntityOfPage": "https://revixplus.com/work/difacto",
  "image": "https://revixplus.com/work/difacto/opengraph-image",
  "datePublished": "[YYYY-MM-DD: real publish date]",
  "dateModified": "[YYYY-MM-DD]",
  "author": { "@id": "https://revixplus.com/#organization" },
  "publisher": { "@id": "https://revixplus.com/#organization" },
  "about": { "@type": "Organization", "name": "DiFacto", "url": "https://difacto.dk" },
  "keywords": "Next.js, React, Node.js, REST APIs, Document analysis model, PostgreSQL, TypeScript"
}
```

`https://revixplus.com/work/difacto/opengraph-image` (with no hash query) was verified to return 200 `image/png`.

### MEDIUM: Organization `sameAs` points to a person's profiles instead of the company's

- **Evidence:** `"sameAs": ["https://www.linkedin.com/in/farrukhbilal/", "https://www.instagram.com/revixplus", "https://github.com/farrukhcode"]`, from `src/lib/schema.ts:30` reading `src/content/site.ts:20-25`.
  - `linkedin.com/in/…` and `github.com/farrukhcode` are the founder's personal profiles, so they tell Google the Organization *is* that person.
  - `site.social.x` (`https://x.com/revixplus`) exists but is not included.
- **Fix:**
  - Limit Organization `sameAs` to accounts the company owns: Instagram, a LinkedIn company page (`linkedin.com/company/…`) once it exists, and X if it is active.
  - Move the personal profiles to a `founder` Person, which also helps E-E-A-T for the healthcare and HIPAA claims.
  - Add `legalName` (already in `site.legalName`) and a `contactPoint`.

```ts
// src/lib/schema.ts, organizationSchema additions
legalName: site.legalName,
sameAs: [site.social.instagram /*, "https://www.linkedin.com/company/revixplus" when live, site.social.x if active */],
contactPoint: {
  "@type": "ContactPoint",
  contactType: "sales",
  email: site.email,
  telephone: site.phone,
  availableLanguage: ["en"],
},
founder: {
  "@type": "Person",
  "@id": `${SITE_URL}/about#farrukh-bilal`,
  name: "Farrukh Bilal",
  jobTitle: "Founder and CTO",
  url: `${SITE_URL}/about`,
  sameAs: ["https://www.linkedin.com/in/farrukhbilal/", "https://github.com/farrukhcode"],
},
```

### MEDIUM: Service `Offer.price` states "from" prices as exact prices and drops billing units

- **Evidence:** `/services/seo` has `"offers": {"@type":"Offer","priceCurrency":"USD","price":"1200","description":"from $1,200, per month"}`. Ten services are per-month or per-week retainers, but the machine-readable `price` is a bare one-off amount:
  - seo, aieo-geo, social-media-marketing, paid-advertising, content-marketing, email-marketing-automation, social-media-creatives, maintenance-support-retainers and dedicated-teams are per month.
  - video-editing-motion-graphics is per week.

  The other 21 services state their "from" prices the same way.
- **Source:** `src/lib/schema.ts:79-84`.
- **Fix:** Use `priceSpecification` with `minPrice`, plus a unit for retainers:

```ts
// src/lib/schema.ts, serviceSchema
const amount = Number(s.startingAt.price.replace(/[^0-9.]/g, "")) || undefined;
const unit = /per month/.test(s.startingAt.timeline) ? "MON" : /per week/.test(s.startingAt.timeline) ? "WEE" : undefined;
offers: {
  "@type": "Offer",
  url: absoluteUrl(`/services/${s.slug}`),
  priceCurrency: "USD",
  priceSpecification: {
    "@type": unit ? "UnitPriceSpecification" : "PriceSpecification",
    minPrice: amount,
    priceCurrency: "USD",
    ...(unit && { unitCode: unit, referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: unit } }),
  },
  description: `${s.startingAt.price}, ${s.startingAt.timeline}`,
},
```

Rendered result for `/services/seo`:

```json
"offers": {
  "@type": "Offer",
  "url": "https://revixplus.com/services/seo",
  "priceCurrency": "USD",
  "priceSpecification": {
    "@type": "UnitPriceSpecification",
    "minPrice": 1200,
    "priceCurrency": "USD",
    "unitCode": "MON",
    "referenceQuantity": { "@type": "QuantitativeValue", "value": 1, "unitCode": "MON" }
  },
  "description": "from $1,200, per month"
}
```

### LOW: The "Industries" breadcrumb item points to `/services`

- **Evidence:** On all 7 industry pages, `{"@type":"ListItem","position":2,"name":"Industries","item":"https://revixplus.com/services"}`. `/industries` returns 404.
- **Source:** `src/app/industries/[slug]/page.tsx:53-56`.
- **Fix:** Create `src/app/industries/page.tsx` and use `path: "/industries"`, or drop the middle crumb. The schema follows the visible trail automatically because both come from `Breadcrumbs.tsx`.

### LOW: Service breadcrumbs use a fragment URL for the pillar level

- **Evidence:** On `/services/web-development`, position 3 is `"item": "https://revixplus.com/services#web-mobile"`. Google drops fragments, so position 3 resolves to the same URL as position 2 (`/services`).
- **Source:** `src/app/services/[slug]/page.tsx:54`.
- **Fix:** Acceptable as is. To be strictly clean, drop the pillar crumb or give pillars their own URLs.

### LOW: `areaServed` types the "European Union" as a Country

- **Evidence:** `{"@type":"Country","name":"European Union"}` appears in the Organization and in all 31 Service blocks (`src/lib/schema.ts:29,78`).
- **Fix:** Map that entry to `{"@type":"Place","name":"European Union"}` or `AdministrativeArea`, and keep Country for the rest.

### LOW: `/about` and `/contact` are missing page-type markup

- **Fix:**
  - On `src/app/about/page.tsx`, add `AboutPage`, plus `Person` nodes for the 4 live team members from `src/content/team.ts` (name, jobTitle, `worksFor: {"@id":"https://revixplus.com/#organization"}`).
  - On `src/app/contact/page.tsx`, add `ContactPage`.

  These add no rich results; they help entity understanding and E-E-A-T only.

```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "url": "https://revixplus.com/about",
  "mainEntity": { "@id": "https://revixplus.com/#organization" },
  "about": { "@id": "https://revixplus.com/#organization" }
}
```

### INFO: 43 pages carry FAQPage

- FAQPage is on the homepage, the 4 hubs (`/services`, `/process`, `/pricing`, `/about`), all 31 services and all 7 industries. Of 220 Questions, 215 are visible on the page; the 5 that are not are the homepage block covered above.
- FAQ rich results have been retired for all sites since 2026-05-07, and any AI-citation benefit is unconfirmed.
- Keep them (they are accurate). Do not add new FAQPage expecting SERP features, and fix only the homepage block above.
- QAPage is not applicable: these are publisher-written FAQs, not user Q&A.

### INFO: No markup on `/pricing` beyond breadcrumbs and FAQ

- Product or Offer rich results do not apply to agency services, so no Product markup is recommended.
- An `OfferCatalog` under the Organization (`hasOfferCatalog`) would mirror the 11 packages for machine readers, but it has low value, so it is optional.
