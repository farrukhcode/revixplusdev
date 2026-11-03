# RevixPlus website

The agency site for [revixplus.com](https://revixplus.com): a ten-chapter scrolling story with light and dark themes, a 3D network globe hero, horizontal and vertical chapters, an optional auto-tour, an AI concierge, and 31 service pages, 14 case studies and 7 industry pages generated from typed content modules.

Stack: Next.js 16 (App Router, Cache Components, React Compiler), React 19, TypeScript, Tailwind CSS 4, GSAP 3.15 (ScrollTrigger, SplitText, DrawSVG), Lenis, Motion, React Three Fiber, VengeanceUI (shadcn registry), Embla, AI SDK 7 + Claude, Resend, Zod, Biome, pnpm.

## Run it

```bash
corepack enable            # gives you pnpm (Node 20.9+ required, 22 or 24 recommended)
pnpm install
cp .env.example .env.local # fill in keys when you have them; everything degrades gracefully without
pnpm dev                   # http://localhost:3000
```

Other scripts: `pnpm build`, `pnpm start`, `pnpm lint`, `pnpm format`, `pnpm typecheck`, `pnpm screenshots` (needs Playwright, see below).

## Where things live

| Path | What |
| --- | --- |
| `src/content/` | All copy and data. `site.ts` (company, pillars), `home.ts` (chapter copy), `services/<slug>.ts`, `work/<slug>.ts`, `industries.ts`, `pricing.ts`, `process.ts`, `team.ts`, `about.ts`, `faqs.ts`, `testimonials.ts`, `legal.ts`. Types in `types.ts`. |
| `src/app/` | Routes. `/` is the story; `services`, `work`, `industries`, `process`, `pricing`, `about`, `contact`, `legal`; `api/chat`, `api/lead`, `api/health`; `sitemap.ts`, `robots.ts`, `llms.txt`, `opengraph-image.tsx`. |
| `src/components/ui/` | `Surface` (cards), `Button` (VengeanceUI radial glow and hover buttons, one API for links and buttons), the VengeanceUI components in kebab-case files, and shared pieces like `FaqList`, `DeviceCard`. Tokens and rules: `docs/DESIGN-SYSTEM.md`. |
| `src/components/motion/` | `SmoothScroll` (Lenis + GSAP ticker), `StoryTour` (auto-tour, chip, rail, progress), `HorizontalChapter` (pinned horizontal travel with touch fallback), `Reveal`, `SplitHeading` (gooey heading reveal). |
| `src/components/home/` | The ten chapters, plus `HeroGlobe` (R3F network globe, theme-aware). |
| `src/lib/` | `seo.ts`, `schema.ts` (JSON-LD), `lead.ts` (Resend + n8n), `leadSchema.ts`, `ai/corpus.ts` (retrieval for the concierge). |
| `docs/` | PLAN (original plan), DESIGN-SYSTEM (current), ANIMATION-SPEC, INFRA (Coolify click-by-click), SEO-AIEO, SOCIAL-LAUNCH, CONTENT-GUIDE. |
| `Dockerfile`, `.github/workflows/ci.yml` | Production image and CI. |

## Deploy (Coolify)

The short version; the full click-by-click is in `docs/INFRA.md`.

1. Push this repo to GitHub (`main` = production, `develop` = staging).
2. Coolify: Project RevixPlus, add resource from your GitHub App, build pack **Dockerfile**, port **3000**.
3. Domains: `revixplus.com`, `www.revixplus.com` (redirect to apex), `staging.revixplus.com` on the `develop` resource.
4. Environment variables from `.env.example`. Mark `NEXT_PUBLIC_*` as build-time.
5. Health check path `/api/health`. Deploy.

## Placeholders to replace before launch

Search the content for `TODO:`. They mark pending case-study figures, testimonials awaiting approval, and team bios. Screenshots for the work gallery are generated with `pnpm screenshots` (install Playwright first: `pnpm add -D playwright && pnpm exec playwright install chromium`), then set `image` on each case study or run the script with `--write`.

## Writing rules

The copy follows a plain, human voice: no em or en dashes, no label formulas, no invented numbers, equal lengths across parallel items, and HIPAA spelled correctly with "HIPAA-compliant architecture" (never "certified"). Details in `docs/CONTENT-GUIDE.md`.
