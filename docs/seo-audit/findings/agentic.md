# Agentic / AI-agent access: revixplus.com (pre-deploy build)

**Score: 86/100** (category score for the audit roll-up; it is separate from the Lighthouse fraction below)

Audited 2026-11-03 against the production image at `http://localhost:3100`, following the claude-seo `seo-agentic` skill.
- Lighthouse Agentic Browsing: local **Lighthouse 13.6.0** CLI, HeadlessChrome 156, read with `lighthouse_agentic.py --from-json`. PSI wasn't used (no key, and localhost isn't reachable from PSI).
- `agentic_check.py --json` (raw mode). `--ua-matrix` was **not** run: no authorization was given, and there is no WAF in front of localhost.
- `agent_ux_check.py`: rendered mode was **unavailable** (the URL guard aborts localhost subresources), so it fell back to HTML-only. It was supplemented with a playwright-core probe of the rendered DOM (`pw/axtree.mjs`) on `/` (desktop) and `/contact` (mobile).
- Vendor facts come from `references/vendor-matrix.md`, last full check 2026-09-23 (41 days old, inside the 60-day window).

## Summary

| Measure | Result |
|---|---|
| Lighthouse Agentic Browsing, mobile | **3/3** (Lighthouse 13.6.0, 2026-11-03) |
| Lighthouse Agentic Browsing, desktop | **3/3** (Lighthouse 13.6.0, 2026-11-03) |
| Agent-UX heuristic (0–100) | **unavailable** (no localhost render through the skill). The manual probe found 0 unnamed controls and 0 focusables inside `aria-hidden`. |
| P0 failures | **0** of 5 tested (WAF not tested) |

What most limits agents today: nothing blocks them. The gaps are optional discovery and Markdown layers, plus cards whose accessible names differ from their visible text.

## Lighthouse Agentic Browsing (per audit)

| Audit | Mobile | Desktop | Notes |
|---|---|---|---|
| `agent-accessibility-tree` | pass | pass | none of the 33 axe rules fail |
| `cumulative-layout-shift` | pass (0) | pass (0) | |
| `llms-txt` | pass | pass | H1, Markdown links, 17 KB |
| `webmcp-form-coverage` | N/A | N/A | the testing browser exposed no WebMCP. The page has 1 form (concierge input) |
| `webmcp-registered-tools` | N/A | N/A | no tools registered |
| `webmcp-schema-validity` | N/A | N/A | |
| `ard-schema` | N/A | N/A | no `ai-catalog.json` (404) |

Paths that would add a counted audit (options, not goals): publishing a valid `/.well-known/ai-catalog.json` adds `ard-schema`. That only makes sense if RevixPlus exposes agent resources, such as an MCP server for the concierge. An invalid catalog would add a counted failure.

## P0 checks

| Item | Result | Evidence |
|---|---|---|
| Accessible names, valid roles, nothing interactive hidden from the tree | pass | Lighthouse `agent-accessibility-tree` pass. Probe: 226 interactive elements on `/`, 0 unnamed, 0 focusable inside `aria-hidden`. Lighthouse Accessibility 98–100. |
| CLS ≤ 0.1 | pass | 0 on all four pages (lab) |
| Primary content without JavaScript | pass | `server-rendered`: 2,299 words in raw home HTML. Every page is prerendered. |
| robots.txt reachable, deliberate AI groups | pass | 200 `text/plain`, 2 groups, AI tokens named deliberately (`src/app/robots.ts`) |
| WAF lets verified bots and agents through | **not tested** | no WAF locally. See deploy-time item 2 (Cloudflare). |

## Findings by priority

### P1

**A1. Card links' accessible names don't match their visible text.**
- Evidence: Lighthouse `label-content-name-mismatch` fails on `/` and `/work/bankful`. For example `<a class="block h-full" aria-label="SEO service" href="/services/seo">`, `<a … aria-label="AI invoice control for Danish construction companies, case study" href="/work/difacto">`, and `<button … aria-label="Play the auto-tour of this page">`. The `aria-label` replaces the card's visible heading in the accessibility tree. An agent told "open the card that says X", or voice control, sees a different name. It isn't one of the 33 rules in the agentic audit, so the 3/3 holds, but the skill's page criteria ask for names that match what's on screen.
- Fix: drop the `aria-label` on card wrapper links and let the visible title name the link, or make the label *start with* the visible title (`"${title}, case study"`). Files: `src/components/ui/ServiceCard.tsx:9` (`aria-label={service.title}`), `src/components/home/WorkChapter.tsx:32`, `src/components/home/GrowthChapter.tsx:25`, and the tour button `src/components/home/Hero.tsx:74`.

**A2. Unknown deep URLs return 200 to browser-class user agents (soft 404).**
- Evidence: `http-404` passes for a top-level probe (`/claude-seo-404-probe-*` → 404). But the first request for an unlisted slug under `/services/`, `/work/`, `/industries/` or `/legal/` returns `200` plus an injected `noindex` to Chrome-like and Googlebot UAs. HTML-limited bots (GPTBot, bingbot) get a real 404. Browser-based agents (Claude in Chrome, Gemini in Chrome, ChatGPT's browser) send Chrome UAs, so a mistyped or hallucinated deep link looks like a live page at the HTTP level. Root cause and fix (`src/proxy.ts`): see `technical.md` M1.

**A3. No Content-Signal in robots.txt** (info; the skill rates it P1 only when it's present in some groups and missing from others).
- Evidence: `content-signal: info`. No group carries `Content-Signal`.
- Note: the policy comment in `src/app/robots.ts:12` says "AI crawlers are welcome", and training bots are explicitly allowed. If that's the intended training policy, `Content-Signal: search=yes, ai-input=yes, ai-train=yes` would state it in machine-readable form. **The training choice is the owner's**, and this audit doesn't make it. `MetadataRoute.Robots` can't emit the line, so it would need a `src/app/robots.txt/route.ts` handler replacing `robots.ts` (keep the hostname guard). Status: Cloudflare CC0 policy; the IETF individual draft expired 2026-04-04, and Google doesn't document the field (vendor-matrix, checked 2026-09-23). It doesn't affect Google Search.

**A4. No Markdown delivery** (opportunity, not a defect).
- Evidence: `markdown-delivery: info`. `Accept: text/markdown` → `text/html`. `/index.md` → 404. No `rel="alternate" type="text/markdown"`.
- Option: the content already lives in typed modules (`src/content/*`), so a `src/app/[...md]/route.ts`-style handler, or per-section `route.ts` files that emit `.md` siblings, would be cheap. `llms.txt` already covers the discovery use case. No named consumer agent is documented as requesting Markdown.

### P2

**A5. Named AI group widens access to `/api/` and `/legal/`** (see `technical.md` L1). GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot and anthropic-ai obey only their own group (`Allow: /`), so the `*` group's `Disallow: /api/` doesn't apply to them. `/api/chat` and `/api/lead` are POST-only (GET returns 405), so the practical exposure is nil. Still, robots.txt isn't an access control. Keep rate limiting and auth on `/api/chat` server-side, since user-triggered agents may ignore robots anyway.

**A6. WebMCP not used** (P2 for a non-transactional site; draft status). There are two forms: the concierge input (home and `/contact`) and the lead form (`/contact`, 8 labelled fields plus a `display:none` + `aria-hidden` honeypot that agents won't see or fill). Neither has `toolname`/`tooldescription`, and neither has an `action` attribute (JS-only submit). If you later expose the lead form as a WebMCP tool, follow `references/webmcp.md`: submit through the form's existing handler and keep a human confirmation step before sending. Status: the Chrome origin trial runs M149–M156 with no ship milestone announced, WebKit is opposed, and only ChatGPT desktop calls tools by default (vendor-matrix, 2026-09-23).

### P3

**A7. llms.txt copy nit.** `src/app/llms.txt/route.ts:27` renders "Starting at from $2,500" because `startingAt.price` already contains "from". Fix: drop the literal "Starting at " or strip "from" from the data. Optional extras: link `/services`, `/work` and `/pricing` under "Other pages" (the pricing section lists prices without a link to `/pricing`). `/llms-full.txt` is absent (404), which is fine.

**A8. ai-catalog.json, A2A agent card, API catalog, OAuth metadata, UCP:** all 404, all N/A for a marketing site with no public agent APIs. No action.

## Access policy (from the robots.txt served by this build)

- **Training:** allowed. GPTBot, ClaudeBot and Google-Extended are in the named `Allow: /` group. CCBot, Applebot-Extended and Bytespider are allowed through `*`.
- **Search / citation:** allowed. OAI-SearchBot and PerplexityBot are named. Claude-SearchBot is allowed through `*`. Googlebot and Bingbot are allowed through `*`, with `/api/` and `/legal/` disallowed.
- **User-triggered agents:** allowed. ChatGPT-User, Claude-User, Perplexity-User and Google-Agent fall under `*`. Several of them don't apply robots.txt at all (Google-Agent, Perplexity-User per vendor-matrix), so access to anything private has to be enforced server-side.

## Standards status (checked against vendor-matrix.md, 2026-09-23)

- WebMCP: draft. Chrome origin trial M149–M156 (end date 2026-11-17 is secondary-sourced).
- Content-Signal: Cloudflare policy; IETF individual draft expired 2026-04-04.
- ai-catalog.json (ARD): proposal (agenticresourcediscovery.org).
- Web Bot Auth: `draft-ietf-webbotauth-httpsig-protocol-00` (2026-09-01).
- Lighthouse Agentic Browsing: still marked "under development". Measured here with 13.6.0, one minor version newer than the matrix's 13.5.0; it still has the same 7 audits.

## Deploy-time items for agents

1. **Keep `NEXT_PUBLIC_SITE_URL=https://revixplus.com` as a build variable.** A different host turns robots.txt into `Disallow: /` for every agent (`src/app/robots.ts:6`).
2. **Cloudflare, once proxied:** check Security → Bots and AI Crawl Control. "Block AI bots", per-crawler blocks and "Managed robots.txt" (which prepends its own rules and Content-Signal) would contradict the allow-AI policy in `robots.ts`. Bot Fight Mode can challenge crawlers. Run `agentic_check.py https://revixplus.com/ --json` after the proxy is on and compare robots.txt with this build's output. The `--ua-matrix` WAF test is only appropriate with the owner's authorization, which as site owner you can give.
3. After cutover, rerun Lighthouse `--only-categories=agentic-browsing` (or PSI `category=AGENTIC_BROWSING` with an API key) on the public URL to confirm 3/3 holds behind Cloudflare.
