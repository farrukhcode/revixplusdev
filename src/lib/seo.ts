import type { Metadata } from "next";
import { site } from "@/content/site";

export const SITE_URL = site.url.replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

interface PageMeta {
  title: string;
  description: string;
  path: string;
  /** Override the route's opengraph-image file */
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
}

/** One place for every page's metadata so titles, canonicals and OG stay consistent. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  noIndex,
  type = "website",
}: PageMeta): Metadata {
  const url = absoluteUrl(path);
  // The layout's title template appends the brand, so a title that already ends with it is
  // trimmed. Past ~60 characters Google truncates titles; drop the brand rather than the topic.
  const brand = ` | ${site.name}`;
  if (title.endsWith(brand)) title = title.slice(0, -brand.length);
  // `images` is only set for an override: Next fills in the route's opengraph-image file
  // (and copies it to twitter) only when the key is absent.
  return {
    title: title.length + brand.length > 60 ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type,
      locale: "en_US",
      ...(image && { images: [{ url: image, width: 1200, height: 630, alt: title }] }),
    },
    twitter: { card: "summary_large_image", title, description, ...(image && { images: [image] }) },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
