# Infrastructure

Docker image built from the repo, deployed by Coolify on the existing DigitalOcean droplet. Nothing changes at the server level: one new Coolify resource, optional one-click services, and DNS.

## 1. Dockerfile

Multi-stage build on `node:24-alpine`. Next.js 16 needs Node 20.9 or newer; 24 is the current LTS.

The file is `Dockerfile` in the repo root (kept there only, so this doc can't drift from it).

Walkthrough:

| Stage | Purpose |
|---|---|
| `deps` | Installs with the lockfile only. Dev dependencies are included because `next build` needs TypeScript, Tailwind and Biome. |
| `build` | Runs `pnpm build` with `output: "standalone"` set in `next.config.ts`. `NEXT_PUBLIC_*` values are build arguments because Next inlines them at build time. |
| `runner` | Copies only `.next/standalone` (includes `server.js` and a pruned `node_modules`), `.next/static` and `public`. Runs as `nextjs`, not root. |

`sharp` is pulled in by Next for image optimization and ends up inside the standalone `node_modules`. If the runner ever logs a missing sharp binary, add `RUN pnpm add sharp` in the `build` stage.

`.dockerignore` excludes `node_modules`, `.next`, `.git`, `docs`, `*.md`, `.env*`.

## 2. Local commands

```bash
# build
docker build -t revixplus:local --build-arg NEXT_PUBLIC_SITE_URL=http://localhost:3000 .

# run
docker run --rm -p 3000:3000 \
  -e ANTHROPIC_API_KEY=... -e RESEND_API_KEY=... \
  -e LEAD_TO_EMAIL=hello@revixplus.com -e LEAD_FROM_EMAIL="RevixPlus <noreply@revixplus.com>" \
  revixplus:local

# health
curl -s http://localhost:3000/api/health
```

The app runs without any secret set: the concierge answers with a static message, the lead API logs to stdout, and the health check reports which integrations are configured.

## 3. Environment variables

| Name | Scope | Required | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Build time | Yes | `https://revixplus.com` in production, `https://staging.revixplus.com` on staging |
| `NEXT_PUBLIC_CAL_LINK` | Build time | No | Cal.com booking URL |
| `ANTHROPIC_API_KEY` | Runtime | For the concierge | Never exposed to the client |
| `AI_MODEL` | Runtime | No | Defaults to `claude-sonnet-5-5` |
| `RESEND_API_KEY` | Runtime | For lead emails | |
| `LEAD_TO_EMAIL` | Runtime | For lead emails | Inbox that receives leads |
| `LEAD_FROM_EMAIL` | Runtime | For lead emails | A verified Resend sender |
| `N8N_WEBHOOK_URL` | Runtime | No | Leads are POSTed here as JSON when set |

In Coolify, tick "Build Variable" (or the equivalent "Available at build time" flag) on the two `NEXT_PUBLIC_*` entries. Runtime secrets stay unticked. Redeploy after adding or changing any variable.

## 4. Coolify, click by click

1. Projects: create `RevixPlus`.
2. Environments: `production` and `staging`.
3. In `production`, add a resource: Public or Private Repository with GitHub App. Pick the existing GitHub App, select the repo, branch `main`.
4. Build pack: `Dockerfile`. Dockerfile location: `/Dockerfile`. Base directory: `/`.
5. Port exposes: `3000`.
6. Domains: `https://revixplus.com,https://www.revixplus.com`. In Advanced, set `www` to redirect to the apex (or add a Traefik redirect middleware label; Coolify offers the redirect in the domain settings on v4.0.0-beta.400 and newer).
7. Environment variables: add the table above. Tick the build flag on `NEXT_PUBLIC_*`.
8. Health check: enabled, path `/api/health`, port `3000`, interval `30`, timeout `5`, retries `3`, start period `20`.
9. Resource limits: memory `1024m` for the running container. Leave CPU unlimited.
10. Auto deploy: on. Coolify installs the webhook through the GitHub App.
11. Preview deployments: on, if you want a URL per pull request. This needs a wildcard DNS record `*.revixplus.com` pointing at the droplet (or a dedicated preview domain). Skip at first; add when PRs start.
12. Deploy. Watch the build log for `Creating an optimized production build` and `Route (app)`.
13. Repeat steps 3 to 12 in `staging` with branch `develop` and domain `https://staging.revixplus.com`, `NEXT_PUBLIC_SITE_URL=https://staging.revixplus.com`. Add `robots` blocking on staging by setting `NEXT_PUBLIC_SITE_URL` to the staging host; `robots.ts` disallows everything when the host is not `revixplus.com`. Production must use exactly `https://revixplus.com` (no `www`), or robots.txt blocks the whole site. Preview deployments inherit the production build variables, so protect them with Coolify's basic auth before turning previews on.

Build memory: Next builds comfortably in about 1.5GB. If the droplet has 2GB total and other apps are running, use the GHCR fallback in section 6 rather than adding swap.

## 5. Cloudflare

The domain is on Cloudflare DNS.

1. Create `A revixplus.com -> <droplet IP>` and `A www -> <droplet IP>` (and `A staging -> <droplet IP>`). Set the proxy to DNS only (grey cloud) for the first deploy.
2. Deploy in Coolify. Traefik requests a Let's Encrypt certificate over the HTTP challenge; this needs port 80 reachable, which DNS only guarantees.
3. After the first successful HTTPS load, turn the proxy on (orange cloud).
4. SSL/TLS mode: Full (strict). Traefik already holds a valid certificate, so strict works. (Only "Flexible" mode can loop with Coolify's Force HTTPS; never use it.)
5. Turn "Always Use HTTPS" on. With the proxy on, Cloudflare answers `http://` with a permanent 301 at the edge. Coolify's Traefik redirect is a temporary 302 (the SEO audit caught it on the live site).
6. Add a Redirect Rule: hostname equals `www.revixplus.com` → dynamic `concat("https://revixplus.com", http.request.uri.path)`, status 301, preserve query string. Every `www` URL, http or https, then reaches the apex in one hop.
7. Security > Bots and AI Crawl Control: leave "Block AI bots", "Managed robots.txt" and Bot Fight Mode off. They would override the site's robots.txt, which deliberately welcomes AI search crawlers.
8. Optional: Cloudflare cache rules for `/_next/static/*` (cache everything, edge TTL 1 month). Next already sets immutable headers on those paths.

Renewals happen through Traefik while the proxy is on; Let's Encrypt's HTTP challenge passes through Cloudflare's proxy. If a renewal ever fails, flip the record to DNS only, redeploy, flip back.

## 6. GHCR fallback (build off the droplet)

Use this if `pnpm build` fails with an out-of-memory error on the server.

1. Add `.github/workflows/image.yml`: on push to `main`, build the Dockerfile with `docker/build-push-action`, push to `ghcr.io/<org>/revixplus:latest` and `:sha-<short>`.
2. In Coolify, replace the GitHub resource with a Docker Image resource pointing at `ghcr.io/<org>/revixplus:latest`. Add a registry credential (a GitHub PAT with `read:packages`) under Coolify Settings, if the package is private.
3. Add a Coolify deploy webhook as the last step of the workflow so a push still deploys automatically.
4. Build arguments (`NEXT_PUBLIC_*`) move into the workflow as `build-args`.

Everything else (domains, health check, env vars) stays the same.

## 7. Optional one-click services

| Service | Why | Notes |
|---|---|---|
| Umami | Privacy-friendly analytics, no cookie banner needed | Needs its own Postgres; Coolify's one-click template bundles it. Put it on `analytics.revixplus.com`; the site has no tracking script yet, so adding it means a `<Script>` tag in `src/app/layout.tsx`. |
| PostgreSQL | Only when Payload CMS or pgvector arrives in phase 2 | Enable automated backups to DigitalOcean Spaces in Coolify |
| Cal.com | Self-hosted booking | Heavier (Postgres + the app). Start with cal.com cloud; self-host later if needed. |

## 8. CI

`.github/workflows/ci.yml` runs on every push and pull request: `pnpm install --frozen-lockfile`, `pnpm lint` (Biome), `pnpm typecheck` (`tsc --noEmit`), `pnpm build`. Coolify deploys only from `main` and `develop`, so a failing build on a feature branch never reaches a server. Lighthouse CI and Playwright smoke tests can be added to the same workflow in phase 6.

## 9. Redirects from the old site

revixplus.com currently serves the dental-billing site. Before DNS cutover, export its indexed URLs (Google Search Console, Pages report) and map each one in `next.config.ts`:

```ts
async redirects() {
  return [
    { source: "/dental-billing-services", destination: "/industries/healthcare-rcm", permanent: true },
    { source: "/dental-billing-services/:path*", destination: "/industries/healthcare-rcm", permanent: true },
    { source: "/blog/:slug", destination: "/", permanent: true },
    // TODO: fill from the Search Console export
  ];
}
```

Rule: every old URL with impressions in the last 90 days gets a 301 to the closest new page. Pages with no close match go to `/industries/healthcare-rcm`, not the home page.

## 10. Backups and rollback

Phase 1 is stateless: no database, no uploads, no volumes. Back up the environment variables (export from Coolify, store in the password manager). Git holds everything else.

Rollback: Coolify keeps the last deployments; open the resource, Deployments, pick the previous successful one, Redeploy. Or push a revert to `main`. Either path takes about the length of one build.

Monitoring: Coolify's health check restarts the container on three failed checks. Add an external uptime monitor (for example Better Stack or UptimeRobot) on `https://revixplus.com/api/health` with a 1 minute interval and WhatsApp or email alerts.
