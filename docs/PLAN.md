# RevixPlus Website Plan

Working plan for revixplus.com: positioning, information architecture, the home page story, the lead generation system, and the build roadmap. Everything the site says is generated from typed modules in `src/content`, so this document is the source of intent and those files are the source of truth for copy.

## 1. Positioning

One line: RevixPlus builds, markets and AI-enables businesses, end to end.

Hero tagline: "We build what's next for your business."

Alternates kept in reserve: "From first idea to AI-powered growth." and "Software house. Growth studio. AI partner. One team."

### Personas

| Persona | What they need | Entry pages |
|---|---|---|
| Founders and SMB owners (US, UK, DK, UAE, PK) | A site, app or store, and customers for it | Home, /services/web-development, /pricing |
| Operators of existing platforms | AI inside their workflows (RAG, agents, automation) without a rebuild | /services/ai-integration, /services/ai-agents-automation |
| Medical billing and RCM companies | Automation and HIPAA-compliant AI agents, HR and task management | /services/healthcare-ai-automation, /industries/healthcare-rcm |
| Brands | A growth engine: SEO, AI answers, social, ads | /services/seo, /services/social-media-marketing |

### Differentiators

1. One senior team for build plus growth. No agency hand-offs between a dev shop and a marketing shop.
2. Ten years shipping for clients in Denmark, the US, the UK, the UAE and Pakistan.
3. AI is production work here: RAG pipelines, Claude and OpenAI assistants, MCP tool integrations, n8n automation, HIPAA-compliant architectures. Not a slide deck.
4. Transparent "starting at" pricing on every service page.
5. Senior-led delivery with a mentored team and documented process.

### Voice

Confident, plain, specific. Short sentences. Numbers over adjectives. US English. No "synergy", no "cutting-edge", no "in today's fast-paced world". See `docs/CONTENT-GUIDE.md` for the full rules.

## 2. Pillars and services

Six pillars, 31 services. Each service has its own page at `/services/<slug>` generated from `src/content/services/<slug>.ts`.

| Pillar | Slug | Services (slugs) |
|---|---|---|
| AI Solutions | `ai` | `ai-strategy-readiness`, `ai-integration`, `rag-knowledge-assistants`, `ai-agents-automation`, `chatbots-voice-agents`, `llm-evaluation-optimization`, `healthcare-ai-automation` |
| Web & Mobile | `web-mobile` | `web-development`, `mobile-app-development`, `ecommerce-development`, `shopify-development`, `wordpress-development`, `saas-mvp-development`, `api-backend-engineering`, `ui-ux-design` |
| Game Development | `games` | `game-development`, `playable-ads-web-games` |
| Growth Marketing | `growth` | `seo`, `aieo-geo`, `social-media-marketing`, `paid-advertising`, `content-marketing`, `email-marketing-automation`, `conversion-rate-optimization` |
| Creative | `creative` | `branding-graphic-design`, `video-editing-motion-graphics`, `social-media-creatives` |
| Cloud, DevOps & Care | `cloud` | `cloud-devops-deployment`, `security-compliance`, `maintenance-support-retainers`, `dedicated-teams` |

Healthcare note: `healthcare-ai-automation` carries the agent catalog (eligibility verification, claim status and follow-up, denial triage with human-approved appeal drafts, AR worklist prioritizer, patient statements and reminders, coding and documentation assistant, HR and onboarding automation, task management automation, client reporting agent) and the "How we keep PHI safe" compliance block. Wording on every page is "HIPAA-compliant architecture", never "HIPAA certified".

## 3. Sitemap

```
/                          Story home (10 chapters, vertical and horizontal, auto-tour)
/services                  Pillar overview
/services/[slug]           31 service pages
/work                      Portfolio grid with filters (service, industry, stack)
/work/[slug]               14 case studies
/industries/[slug]         ecommerce, healthcare-rcm, fintech, saas, education, energy, hospitality
/process                   Discover, Design, Build, Launch, Grow
/pricing                   Packages, retainers, dedicated team
/about                     Story, values, team, locations
/contact                   Form, WhatsApp, booking
/legal/privacy  /legal/terms  /legal/cookies
/llms.txt  /llms-full.txt  /sitemap.xml  /robots.txt  /opengraph-image
/api/chat  /api/lead  /api/health
```

Phase 2 routes: `/ai-readiness` (scored report), `/audit` (URL audit), `/blog`.

### Case studies (14)

`difacto`, `bankful`, `hrms-saas`, `hosting-platform`, `revixmd-ai-automation`, `revixmd-website`, `thetoys`, `meeshan-luxe-home`, `the-vitamin-company`, `indibe`, `his-energy`, `sushi2500`, `medallion-dusk`, `hockeystore`.

Featured on the home gallery (8): difacto, bankful, revixmd-ai-automation, meeshan-luxe-home, indibe, his-energy, the-vitamin-company, thetoys.

Rule: only projects Farrukh built or led appear. Techscale client logos (Specsavers, Zyxel, Dacadoo, Nutramino, Magic5) are not used without written permission.

## 4. The home story

"V" is a normal vertical section. "H" is a pinned section where vertical scroll drives horizontal travel. The auto-tour moves through both because it only changes scroll position.

| # | Chapter | Scroll | Animation | Copy |
|---|---|---|---|---|
| 0 | Hero | V, 100vh | Aurora blobs, 3D glass orb (R3F transmission material, lazy, desktop only), SplitText headline rise with 40ms stagger, pointer-down press on CTAs | Eyebrow: AI · Web · Mobile · Games · Growth. H1: We build what's next for your business. Sub: One senior team for software, AI integration, and the marketing that fills it with customers, from first sketch to scale. CTAs: Start a project / Watch the story. Trust strip: 10+ years · 50+ launches · Clients in PK, DK, UK, US, UAE |
| 1 | The problem | V, pinned, 3 beats | Three glass cards materialize (blur + scale, not plain fade), one per beat | H2: Every business has a next chapter. Most are stuck on this page. Cards: "Your site is slow and looks like 2019." / "Your team does by hand what software should." / "Customers now ask ChatGPT, and you're not in the answer." |
| 2 | Services | H, 6 panels | Full-height glass panels slide horizontally, one per pillar, progress dots | H2 (pinned left): One team. Every discipline. No hand-offs. Panels: the 6 pillars with 3 to 4 service chips each (AI panel includes "HIPAA-compliant agents") |
| 3 | AI, integrated | V, pinned diagram | DrawSVG architecture: Your data, Embeddings, RAG, Agents (MCP tools), Your platform. Live concierge chat in a glass card | H2: AI that works inside the tools you already run. Body: We've shipped RAG pipelines, Claude and OpenAI assistants, MCP tool integrations and n8n automations into live products. We don't rip and replace. We plug intelligence into what you have. Proof chips: DiFacto, AI invoice control for construction / Revix MD, AI agents for medical billing |
| 4 | Work | H, 8 devices | Floating glass device mockups with depth parallax, click morphs into the case study (View Transition) | H2: Proof, not promises. |
| 5 | Process | V, timeline | Vertical glass rail fills as you scroll | Discover, Design, Build, Launch, Grow, each with a one-line promise and duration |
| 6 | Growth engine | H, 4 panels | SEO, AIEO, Social, Paid with spring counters (no bounce) | H2: Built it? Now let's fill it. Body: Search, AI answers, social, and ads, run as one system with one dashboard. |
| 7 | Numbers | V, band | Spring counters on enter | 10+ years · 50+ projects · 5 countries · 91% clients return (replace with confirmed figures) |
| 8 | Voices | V, Embla | Drag carousel with momentum projection | 5 or 6 testimonials, placeholders marked TODO until approved |
| 9 | Your turn | V, CTA | Three glass doors with press feedback | H2: Let's write your next chapter. Doors: Book a 20-min call / Get a free AI-readiness report / WhatsApp us. Healthcare visitors see "Get a free RCM automation audit". Small print: Reply within one business day. NDA on request. |

Footer: glass, sitemap, offices, socials, newsletter, link to `/llms.txt`.

## 5. Lead generation system

| Entry | Mechanism | Where it lands |
|---|---|---|
| AI concierge | `/api/chat` with Claude via AI SDK 7, answers from an in-memory corpus built from `src/content`, tools for estimate, booking and sending a brief. Switches to healthcare mode when a visitor mentions billing, RCM or PHI. Asks for an email before hand-off | Resend email + n8n webhook |
| Contact form | react-hook-form + zod, `/api/lead` | Resend email + n8n webhook (CRM, Slack, WhatsApp alert) |
| Booking | Cal.com link in nav, CTA chapter and every service page | Cal.com |
| WhatsApp | Click-to-chat on mobile dock and CTA chapter | WhatsApp |
| AI readiness report (phase 2) | 8 questions, score, one-page PDF by email | Resend + n8n |
| Free website audit (phase 2) | URL, PageSpeed Insights API, AIEO checks, AI summary by email | Resend + n8n |
| Instant estimate | Range calculator on service pages, concierge explains the range | Concierge |

Trust signals on every page: stats band, client names, testimonials once approved, "starting at" pricing, process page, Core Web Vitals.

## 6. Roadmap

| Phase | Deliverable | Skills to invoke |
|---|---|---|
| 1 Foundations | Repo, Dockerfile, CI, Coolify staging with hero | `frontend-design`, `anthropic-skills:apple-design` |
| 2 Design system | Glass tokens, nav, buttons, cards, sheets, type scale, dark and light | `anthropic-skills:apple-design`, `liquid-glass:liquid-glass` (material semantics only), `design:design-system` |
| 3 Story home | 10 chapters, horizontal and vertical scroll, auto-tour, 3D hero | `anthropic-skills:animate` (with RECIPES.md), `anthropic-skills:animation-performance`, `anthropic-skills:improve-animations` for the audit pass |
| 4 Content pages | 31 services, 14 case studies, industries, process, pricing, about | `marketing:draft-content`, `anthropic-skills:seo-content-optimizer`, `anthropic-skills:ymyl-humanizer`, `design:ux-copy` |
| 5 AI and lead gen | Concierge, lead API, booking, readiness report, audit tool | none required |
| 6 Launch | SEO and AIEO, schema, OG, analytics, accessibility audit, Lighthouse 90+, 301s, go-live | `design:accessibility-review`, `marketing:seo-audit` |
| 7 Growth | Blog cadence, campaigns, email sequences, social | `marketing:campaign-plan`, `marketing:email-sequence` |

Phases 1 to 3 compress to about two weeks when built with Claude alongside. The full roadmap is 6 to 7 weeks solo.

## 7. Open items

| Item | Owner | Blocks launch? |
|---|---|---|
| Logo and wordmark files (SVG) | Farrukh | No, text wordmark ships first |
| Team names, roles, photos | Farrukh | No, `status: "TODO"` entries hide until filled |
| Testimonials from Meeshan, TVC, Sushi2500, Bankful, Revix MD | Farrukh (outreach drafts in SOCIAL-LAUNCH.md) | No, TODO entries hide until approved |
| Pricing confirmation ("starting at" numbers in `src/content/pricing.ts`) | Farrukh | Yes, review before go-live |
| Project screenshots (`pnpm screenshots`) | Run `scripts/screenshot-sites.mjs` locally | No, gradient cards render until images exist |
| 301 map from the old dental-billing URLs on revixplus.com | Farrukh exports old URLs, map goes in `next.config.ts` redirects | Yes, before DNS cutover |
| Revix MD numbers (hours saved, denial turnaround, onboarding time, billers served) and stack (PMS, clearinghouse, model path under BAA or self-hosted) | Farrukh | No, TODO values hide |
| Domain decision: agency replaces the dental-billing site at revixplus.com | Confirmed | Done |
| Fresh palette (teal + violet on ink), not Revix MD teal | Confirmed | Done |
| Market order US, UK, DK/EU, UAE, PK; English only at launch, `da` locale wired but hidden; USD pricing | Default | Done |
