# syntax=docker/dockerfile:1.7
# RevixPlus web: Next.js 16 standalone build, run as a non-root user.
# Coolify: Build pack "Dockerfile", port 3000, health check GET /api/health.

ARG NODE_VERSION=24
FROM node:${NODE_VERSION}-alpine AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@10.28.0 --activate
WORKDIR /app

# ---- deps ------------------------------------------------------------------
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# ---- build -----------------------------------------------------------------
FROM base AS build
# NEXT_PUBLIC_* values are inlined at build time; pass them as build args from Coolify
ARG NEXT_PUBLIC_SITE_URL=https://revixplus.com
ARG NEXT_PUBLIC_CAL_LINK=https://cal.com/farrukhbilal
# Sitemap lastmod; defaults to the day of the build
ARG BUILD_DATE=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_CAL_LINK=$NEXT_PUBLIC_CAL_LINK \
    NEXT_TELEMETRY_DISABLED=1 \
    NODE_OPTIONS=--max-old-space-size=2048
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN BUILD_DATE="${BUILD_DATE:-$(date -u +%F)}" pnpm build

# ---- run -------------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
# Standalone output does not copy public or .next/static; do it here
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1
CMD ["node", "server.js"]
