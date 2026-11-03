# Content Guide

How to write for revixplus.com and how to add or change content in the repo. Every page is generated from typed modules in `src/content`, so copy lives in TypeScript files, not in a CMS.

## 1. Writing rules

These are non-negotiable. A reviewer will send copy back for any of them.

### Punctuation and sentence shape

- No em dashes and no en dashes, anywhere. Use a comma, a colon, a period or parentheses.
- No "Label: sentence" formulas ("Result: faster pages", "Bottom line: ..."). Write the sentence.
- No formulaic transitions: "Moreover", "Furthermore", "Additionally", "In today's fast-paced world", "It's worth noting", "In conclusion".
- No triplets by habit. Three items only when there are three things.
- Vary sentence length. Short ones carry the point. Longer ones carry the detail.
- No rhetorical questions as openers. No "Let's dive in".
- Contractions are fine. "We've", "don't", "it's".
- US English. "Optimization", "color", "center".

### AI tells to remove

"Unlock", "elevate", "seamless", "robust", "cutting-edge", "leverage", "empower", "game-changing", "in the realm of", "delve", "tapestry", "it is important to note", "navigate the landscape", "harness", "synergy", "holistic", "best-in-class", "world-class", "state-of-the-art".

### Structure

- Parallel sections get equal length. If three pains are 30 words each, all three are 30 words, not 30, 45 and 20.
- One idea per paragraph. Two to four sentences.
- Headlines state an outcome or a fact. "AI that works inside the tools you already run", not "Our AI Services".
- Lead with the specific thing: a number, a client, a tool, a time.

### Claims and numbers

- No invented results. If a number is not in the CV, a client document or a measured source, write `TODO:` in its place and keep the field. TODO values are hidden by the UI until replaced.
- Statistics from outside sources carry a year ("in 2025, according to ...") and a link.
- "10+ years", "50+ launches", "5 countries" are approved. "91% clients who come back" is a placeholder until Farrukh confirms.
- Client names: only projects Farrukh built or led. Revix MD is approved to name publicly. Techscale client logos are not used.

### Healthcare wording

- Spell it HIPAA (Health Insurance Portability and Accountability Act). Never "HIPPA".
- Say "HIPAA-compliant architecture" or "built to the HIPAA Security Rule's administrative, physical and technical safeguards". Never "HIPAA certified"; no such certification exists.
- PHI means protected health information. Define it on first use on each page.
- Every automation that touches a claim, a patient or money is described with a human approval step.
- BAA means business associate agreement. Name the provider path (Anthropic, OpenAI, Azure OpenAI, AWS Bedrock, or self-hosted) when describing a build.

### External links

Service pages carry 2 or 3 links to authoritative sources: standards bodies (W3C, HHS.gov for HIPAA, GDPR text, European Accessibility Act), vendor documentation (Next.js, Shopify, Anthropic, Google), or published research with a year. Links open in the same tab and use descriptive anchor text, never "click here".

### Voice check

Read it aloud. If a sentence sounds like a brochure, cut the adjective. If it sounds like a chatbot, cut the transition. If it could be on any agency's site, add the specific thing that makes it ours.

## 2. Adding a service

1. Create `src/content/services/<slug>.ts`. The slug is the URL: `/services/<slug>`. Lowercase, hyphens, no stop words where avoidable.
2. Export a `Service` object (type from `src/content/types.ts`). Required fields and their sizes:

| Field | Size |
|---|---|
| `title` | H1, keyword plus outcome, up to 70 characters |
| `shortTitle` | up to 28 characters |
| `eyebrow` | pillar name |
| `seoTitle` | 50 to 60 characters |
| `metaDescription` | 140 to 160 characters |
| `keywords` | 5 to 8 |
| `icon` | a lucide-react icon name, e.g. `"Sparkles"` |
| `heroPromise` | 45 to 70 words |
| `pains` | exactly 3, title up to 8 words, body 25 to 40 words, equal length |
| `deliverables` | 6 to 9 chips, 2 to 6 words each |
| `approach` | 4 or 5 steps, 20 to 35 words each |
| `stack` | 6 to 12 items |
| `startingAt` | `{ price, timeline, note? }` |
| `relatedWork` | 2 or 3 case study slugs |
| `relatedServices` | 3 service slugs |
| `faqs` | exactly 5, answers 40 to 70 words, written as direct answers |
| `authorityLinks` | 2 or 3 |
| `compliance` | optional, used by healthcare and security |
| `catalog` | optional, named items with one-line bodies |

3. Register it in `src/content/services/index.ts` by importing the module and adding it to the `services` array. Order within a pillar is the display order.
4. Run `pnpm typecheck`. Type errors mean a missing or malformed field.
5. Run `pnpm dev` and open `/services/<slug>`. Check the FAQ schema in the page source.

Example skeleton:

```ts
import type { Service } from "../types";

export const service: Service = {
  slug: "example-service",
  pillar: "ai",
  title: "...",
  shortTitle: "...",
  eyebrow: "AI Solutions",
  seoTitle: "...",
  metaDescription: "...",
  keywords: ["..."],
  icon: "Sparkles",
  heroPromise: "...",
  pains: [
    { title: "...", body: "..." },
    { title: "...", body: "..." },
    { title: "...", body: "..." },
  ],
  deliverables: ["..."],
  approach: [{ step: "Discover", body: "..." }],
  stack: ["..."],
  startingAt: { price: "from $5,000", timeline: "3 weeks" },
  relatedWork: ["difacto"],
  relatedServices: ["rag-knowledge-assistants", "ai-agents-automation", "ai-strategy-readiness"],
  faqs: [{ q: "...", a: "..." }],
  authorityLinks: [{ label: "...", href: "https://..." }],
};
```

## 3. Adding a case study

1. Create `src/content/work/<slug>.ts` exporting a `CaseStudy`.
2. Sizes: `summary` 20 to 30 words, `challenge` 2 paragraphs of 40 to 60 words, `solution` 3 paragraphs of 40 to 60 words, `results` exactly 3 metrics (`value` may start with `TODO:`), optional `quote`.
3. `services` lists the service slugs the project demonstrates; the service pages pick up the case study automatically through `relatedWork`, and the work grid filters use these.
4. `featured: true` plus `order` puts it in the home gallery (keep 8 featured).
5. `accent` is two CSS colors for the glass device card gradient. `image` is optional until the screenshot exists.
6. Register in `src/content/work/index.ts`.
7. Generate the screenshot (section 5).

## 4. Industries, testimonials, pricing, team

| File | Notes |
|---|---|
| `src/content/industries.ts` | Array of `Industry`. Each links 4 to 6 services and 2 to 4 case studies. |
| `src/content/testimonials.ts` | `status: "approved"` renders. `status: "TODO"` stays hidden. Never publish a quote the client has not approved in writing. |
| `src/content/pricing.ts` | Packages with `price` as "from $X". Review with Farrukh before launch. |
| `src/content/team.ts` | `status: "live"` renders. Add photo under `public/team/`. |
| `src/content/process.ts` | Five steps. Durations are promises; keep them honest. |
| `src/content/home.ts` | Home chapter copy. Changing a headline here changes the story; check the chapter still reads in sequence. |
| `src/content/faqs.ts` | Site-wide FAQs used on contact and pricing. |
| `src/content/legal.ts` | Privacy, terms, cookies. Plain language, dated. |

## 5. Screenshots

`scripts/screenshot-sites.mjs` opens each case study's `liveUrl` with Playwright, waits for network idle, captures a 1440 by 900 viewport, and writes `public/work/<slug>.webp`.

```bash
pnpm screenshots            # all case studies with a liveUrl
pnpm screenshots difacto    # one slug
```

Run it on your own machine (the container may not reach every site). Review every image; replace any that show a cookie banner or a login wall with a manual capture at the same size. Commit the images.

## 6. Replacing TODO placeholders

Search the content folder:

```bash
grep -rn "TODO" src/content
```

Each hit is one of:

| Pattern | Action |
|---|---|
| `results: [{ value: "TODO: ..." }]` | Replace with the real number and unit, e.g. `"38%"` with label `"fewer manual invoice checks"`. |
| `status: "TODO"` on a testimonial | Paste the approved quote, set `status: "approved"`. |
| `status: "TODO"` on a team member | Fill name, role, bio, photo, set `status: "live"`. |
| `// TODO` in `pricing.ts` | Confirm the number with Farrukh, remove the comment. |
| `TODO` in `next.config.ts` redirects | Fill from the Search Console export of the old site. |

The UI hides any value that starts with `TODO`, so a half-finished entry never reaches visitors. Still, run the grep before every release and aim for zero hits.

## 7. Review checklist before publishing a page

- Zero em or en dashes (`grep -rnP "\x{2014}|\x{2013}" src/content` returns nothing).
- No words from the AI tells list.
- Parallel items are equal length.
- Numbers have a source or a TODO.
- HIPAA spelled correctly, no "certified".
- 2 or 3 authority links present on service pages.
- Title 50 to 60 characters, description 140 to 160.
- Related work and related services resolve to real slugs (`pnpm typecheck` and the dev server both complain if not).
- Read aloud once.
