import type {
  BreadcrumbList,
  FAQPage,
  Organization,
  Service as ServiceSchema,
  WebSite,
  WithContext,
} from "schema-dts";
import { site } from "@/content/site";
import { team } from "@/content/team";
import type { Faq, Service } from "@/content/types";
import { absoluteUrl, SITE_URL } from "./seo";

// The EU is a region, not a country
const areaServed = site.location.serving.map((name) => ({
  "@type": name === "European Union" ? ("Place" as const) : ("Country" as const),
  name,
}));

// The founder leads the team list
const founder = team[0];

export const organizationSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: site.name,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/revixplus-logo-512.png`,
  description: site.description,
  email: site.email,
  telephone: site.phone,
  foundingDate: site.founded,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.city,
    addressCountry: "PK",
  },
  areaServed,
  // Company profiles only; the personal LinkedIn and GitHub belong to the founder entity
  sameAs: [site.social.instagram],
  founder: {
    "@type": "Person",
    name: founder.name,
    jobTitle: founder.role,
    ...(founder.photo && { image: absoluteUrl(founder.photo) }),
    sameAs: [founder.linkedin ?? site.social.linkedin, site.social.github],
  },
  knowsAbout: [
    "AI integration",
    "RAG",
    "AI agents",
    "HIPAA-compliant AI",
    "Next.js",
    "Shopify",
    "WordPress",
    "Mobile app development",
    "Game development",
    "SEO",
    "AI engine optimization",
    "Social media marketing",
  ],
};

export const websiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: site.name,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
};

export function faqSchema(faqs: Faq[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema(s: Service): WithContext<ServiceSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.metaDescription,
    url: absoluteUrl(`/services/${s.slug}`),
    serviceType: s.shortTitle,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed,
    offers: {
      "@type": "Offer",
      description: `${s.startingAt.price}, ${s.startingAt.timeline}`,
      // "from $X": a minimum, not a fixed price; retainers are per month (or week)
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "USD",
        minPrice: Number(s.startingAt.price.replace(/[^0-9.]/g, "")) || undefined,
        ...(/^per (month|week)/.test(s.startingAt.timeline) && {
          unitCode: s.startingAt.timeline.startsWith("per week") ? "WEE" : "MON",
        }),
      },
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}
