# SEO and AIEO Plan

Search engines and AI answer engines (ChatGPT, Claude, Perplexity, Google AI Overviews, Copilot) are the two channels this site is built to rank in. Both reward the same things: clear entity statements, specific answers, structured data, fast pages and citeable content. Volumes below are placeholders; pull them from Ahrefs Keywords Explorer per target country (US first, then UK, DK) before writing titles.

## 1. Keyword clusters

Each service page owns one primary keyword and 4 to 6 supporting terms. The primary goes in the H1 and title, supporting terms go in H2s, FAQs and body copy once each. No stuffing.

### AI Solutions

| Service | Primary | Supporting |
|---|---|---|
| ai-strategy-readiness | AI strategy consulting for small business | AI readiness assessment, AI roadmap, AI adoption plan, AI consulting agency |
| ai-integration | AI integration services | integrate AI into existing software, AI integration for SaaS, LLM integration, add AI to web app, OpenAI integration services |
| rag-knowledge-assistants | RAG development services | retrieval augmented generation, enterprise knowledge assistant, chat with your documents, vector search implementation |
| ai-agents-automation | AI agents development company | AI workflow automation, n8n automation agency, MCP tool integration, autonomous agents for business |
| chatbots-voice-agents | custom AI chatbot development | AI voice agent, customer support chatbot, Claude chatbot, WhatsApp AI bot |
| llm-evaluation-optimization | LLM cost optimization | LLM evaluation, prompt engineering services, model fine-tuning services, AI token cost reduction |
| healthcare-ai-automation | HIPAA compliant AI agents | medical billing automation, RCM automation services, AI for medical billing companies, denial management automation, AI agents for healthcare billing, HIPAA compliant AI development |

### Web & Mobile

| Service | Primary | Supporting |
|---|---|---|
| web-development | web development agency | Next.js development company, custom web application development, React development services, website development for startups |
| mobile-app-development | mobile app development company | React Native development, Flutter app development, iOS and Android app development, MVP app development |
| ecommerce-development | ecommerce development agency | WooCommerce development, online store development, headless ecommerce, cash on delivery store |
| shopify-development | Shopify development agency | Shopify Plus developer, Shopify theme development, Shopify migration, Shopify app development |
| wordpress-development | WordPress development agency | custom WordPress theme, Bricks Builder developer, WordPress speed optimization, WPML multilingual site |
| saas-mvp-development | SaaS MVP development | MVP development company, startup software development, SaaS product development, build an MVP in 6 weeks |
| api-backend-engineering | backend development services | REST API development, Node.js backend, NestJS development, PostgreSQL database design |
| ui-ux-design | UI UX design agency | product design services, website redesign, design system, Figma to code |

### Game Development

| Service | Primary | Supporting |
|---|---|---|
| game-development | mobile game development company | Unity game development, Godot game developer, hyper casual game studio, kids game development |
| playable-ads-web-games | HTML5 game development | YouTube Playables developer, playable ads production, browser game development, gamified marketing |

### Growth Marketing

| Service | Primary | Supporting |
|---|---|---|
| seo | SEO agency | technical SEO services, SEO for SaaS, ecommerce SEO, local SEO services, SEO for Shopify |
| aieo-geo | AI engine optimization | generative engine optimization, GEO services, get cited by ChatGPT, AI search optimization, LLM SEO |
| social-media-marketing | social media marketing agency | social media management services, Instagram marketing agency, LinkedIn marketing for B2B, social media for ecommerce |
| paid-advertising | PPC agency | Google Ads management, Meta ads agency, LinkedIn ads agency, TikTok ads management |
| content-marketing | content marketing agency | B2B content writing, SEO blog writing service, content strategy, case study writing |
| email-marketing-automation | email marketing agency | Klaviyo agency, email automation, lifecycle email, newsletter management |
| conversion-rate-optimization | conversion rate optimization agency | landing page optimization, CRO audit, A/B testing services, checkout optimization |

### Creative

| Service | Primary | Supporting |
|---|---|---|
| branding-graphic-design | branding agency | logo design services, brand identity design, graphic design services, pitch deck design |
| video-editing-motion-graphics | video editing services | motion graphics studio, explainer video production, reels editing service, 3D animation |
| social-media-creatives | social media design services | social media creatives, ad creative production, Instagram post design, carousel design |

### Cloud, DevOps & Care

| Service | Primary | Supporting |
|---|---|---|
| cloud-devops-deployment | DevOps services | Docker deployment services, Coolify hosting setup, AWS deployment, CI CD setup, self-hosted app hosting |
| security-compliance | website security services | GDPR compliance development, European Accessibility Act compliance, HIPAA compliant web development, security hardening |
| maintenance-support-retainers | website maintenance services | WordPress maintenance plan, app maintenance retainer, Shopify support retainer, monthly website care |
| dedicated-teams | dedicated development team | staff augmentation, hire remote developers, offshore development team Pakistan, dedicated Next.js developer |

### Healthcare cluster (priority)

The HIPAA niche has demand and thin competition from agencies with real engineering proof. Pages that carry it: `/services/healthcare-ai-automation`, `/industries/healthcare-rcm`, `/work/revixmd-ai-automation`, and blog posts in phase 2.

| Term | Page |
|---|---|
| HIPAA compliant AI agents | service page H1 |
| medical billing automation | service page H2, industry page |
| RCM automation services | industry page H1 area |
| AI for medical billing companies | service page body, case study |
| denial management automation | catalog item, FAQ |
| AI agents for healthcare billing | FAQ, industry page |
| can AI be HIPAA compliant | FAQ (FAQPage schema) |
| does Claude or ChatGPT sign a BAA | FAQ (FAQPage schema) |

Blog topics for phase 2: "What a HIPAA-compliant AI agent architecture looks like (with a diagram)", "Denial triage with AI: a 30-day pilot plan for billing companies", "BAA, zero data retention and de-identification: the three checks before any AI vendor", "Automating biller worklists from clearinghouse data".

## 2. Metadata rules

- Title: primary keyword, outcome, brand. 50 to 60 characters. Pattern: `HIPAA-Compliant AI Agents for Medical Billing | RevixPlus`.
- Description: 140 to 160 characters, one concrete promise, one proof, no ellipsis.
- One H1 per page. H2s carry supporting terms as plain questions or statements.
- Canonical on every page from `NEXT_PUBLIC_SITE_URL`.
- `hreflang` ready: `en` now, `da` wired for Denmark later.
- Image alt text describes the content, not the keyword.
- Internal links: every service page links to its pillar, 3 related services, 2 or 3 case studies, the industry page when relevant, and pricing.
- External links: 2 or 3 authoritative sources per service page (standards bodies, vendor documentation, published research). They are a trust signal for both search and AI engines.

## 3. JSON-LD

Generated with `schema-dts` in `src/components/seo/JsonLd.tsx`.

| Page | Types |
|---|---|
| Every page | `Organization` (name, url, logo, sameAs, contactPoint), `WebSite` with `SearchAction` omitted (no site search), `BreadcrumbList` |
| Home | `Organization` plus `ProfessionalService` with `areaServed` (US, GB, DK, AE, PK) and `serviceType` list |
| Service | `Service` (name, provider, areaServed, offers with `priceSpecification` from startingAt), `FAQPage` from the 5 FAQs |
| Case study | `Article` (headline, author Organization, datePublished, about), `BreadcrumbList` |
| Industry | `Service` with `audience`, `FAQPage` |
| Blog post (phase 2) | `Article` with `author` Person, `dateModified` |
| About | `Organization` with `founder`, `employee` list once the team is live |

Validate with Google's Rich Results Test after every content change to a service page.

## 4. llms.txt and llms-full.txt

`/llms.txt` is a short Markdown index for AI crawlers: who RevixPlus is in two sentences, then links grouped by pillar with one-line descriptions. `/llms-full.txt` concatenates the full text of every service, industry and case study page in Markdown, generated at build time from `src/content`.

Format of `/llms.txt`:

```
# RevixPlus

> RevixPlus is a software, AI and growth agency based in Lahore, serving clients in the United States, United Kingdom, Denmark, UAE and Pakistan. One senior team for web and mobile development, AI integration (including HIPAA-compliant AI agents for medical billing), game development, and growth marketing.

## Services
- [AI integration services](https://revixplus.com/services/ai-integration): plug RAG, agents and automation into an existing platform.
...

## Industries
...

## Work
...

## Contact
- Email: hello@revixplus.com
- Booking: <Cal.com link>
```

Entity sentences: every main page states plainly what RevixPlus is, where it is, who it serves and what it does, in one sentence near the top. AI engines quote these.

## 5. Indexing

- Submit `sitemap.xml` to Google Search Console and Bing Webmaster Tools.
- IndexNow: Bing, Yandex and others accept pushes. Add an IndexNow key file at `/<key>.txt` and ping on deploy from the CI workflow (phase 6).
- `robots.ts` allows everything on `revixplus.com`, disallows everything on any other host (staging, previews), and lists the sitemap.
- Do not block AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended). Being crawled is the point.

## 6. OG images

Every route has its own 1200 by 630 card, prerendered at build with `ImageResponse`: an `opengraph-image.tsx` per page (and per `[slug]` route, reading the title and summary from `src/content`), all drawn by `src/lib/og.tsx` with the logo, an eyebrow, the title, one supporting line and revixplus.com. `pageMetadata()` leaves `images` empty so Next emits each route's own card for both `og:image` and `twitter:image` (pass `image` to override). Twitter card type is `summary_large_image`. Favicon, app icons and the web manifest come from the logo mark (`src/app/icon.svg`, `favicon.ico`, `apple-icon.png`, `manifest.ts`).

## 7. Core Web Vitals

Targets from `docs/ANIMATION-SPEC.md` section 6: LCP under 2.0s, INP under 200ms, CLS under 0.05. Check with PageSpeed Insights on the home page, one service page and one case study after every release. The home page's hero poster is the LCP element; it is preloaded.

## 8. International

| Market | Notes |
|---|---|
| US | Primary. Prices in USD. Healthcare cluster is US-specific (HIPAA). |
| UK | Same English copy. Add "agency" terms with UK spelling only in paid campaigns, not on the site. |
| DK/EU | `da` locale wired in next-intl but hidden until translated. GDPR page in `/legal/privacy`. European Accessibility Act (in force June 2025) is a selling point on `security-compliance`. |
| UAE | Mention in `areaServed` and the about page. |
| PK | Local proof (The Toys, The Vitamin Company). No PKR pricing on the site. |

## 9. Blog cadence and standards (phase 2)

Two posts per week, drafted with Claude, edited by a human against `docs/CONTENT-GUIDE.md`. Each post: 1,200 to 2,000 words, one primary keyword, a real example from the portfolio, two external sources with year qualifiers, a diagram or screenshot, an author with a bio page, `Article` schema, and a link to one service page. One post per month is a public scorecard from "The Toys growth lab" (see `docs/SOCIAL-LAUNCH.md`).

## 10. Measurement

| Source | What to read |
|---|---|
| Google Search Console | Queries, pages, Core Web Vitals, indexing errors |
| Bing Webmaster Tools | Bing and Copilot indexing, IndexNow status |
| Umami | Visits, referrers, entry pages, UTM campaigns, events (lead_submitted, chat_opened, booking_clicked, whatsapp_clicked, tour_started, tour_paused) |
| AI referral tracking | Umami referrer filter for chatgpt.com, perplexity.ai, claude.ai, copilot.microsoft.com, gemini.google.com |
| Ahrefs | Rankings for the primary keywords, backlinks, Brand Radar mentions in AI answers |
| Lead log | Every lead carries `source` (form, chat, booking, whatsapp) and the landing page |

Review monthly. The healthcare cluster gets its own row in the review because it is the highest-intent traffic the site will see.
