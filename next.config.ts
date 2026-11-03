import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Browsers ignore it over plain http (local dev); in production every subdomain is https too
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
    ];
  },
  async redirects() {
    // 301 map for URLs from the previous revixplus.com (dental billing site).
    // Add entries as `{ source: "/old-path", destination: "/new-path", permanent: true }`.
    return [
      { source: "/dental-billing-services", destination: "/industries/healthcare-rcm", permanent: true },
      {
        source: "/dental-billing-services/:path*",
        destination: "/industries/healthcare-rcm",
        permanent: true,
      },
      { source: "/services/dental-billing", destination: "/industries/healthcare-rcm", permanent: true },
      // From the live sitemap of the old site (2026-11-03); no close match goes to the healthcare page
      { source: "/specialities/:path*", destination: "/industries/healthcare-rcm", permanent: true },
      { source: "/small-practices", destination: "/industries/healthcare-rcm", permanent: true },
      { source: "/dso-group-billing", destination: "/industries/healthcare-rcm", permanent: true },
      { source: "/hipaa-compliance", destination: "/services/healthcare-ai-automation", permanent: true },
      { source: "/privacy-policy", destination: "/legal/privacy", permanent: true },
      { source: "/terms-of-service", destination: "/legal/terms", permanent: true },
      { source: "/accessibility", destination: "/about", permanent: true },
      { source: "/resources", destination: "/work", permanent: true },
      { source: "/www", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
