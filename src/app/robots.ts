import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Staging, previews and localhost stay out of the index.
  if (new URL(SITE_URL).hostname !== "revixplus.com") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      // AI crawlers are welcome: being cited is the point of AIEO.
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "PerplexityBot",
          "Google-Extended",
          "OAI-SearchBot",
          "Claude-SearchBot",
        ],
        // A crawler obeys only its most specific group, so the /api/ rule is repeated here
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
