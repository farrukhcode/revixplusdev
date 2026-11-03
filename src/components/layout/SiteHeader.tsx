import { Icon } from "@/components/ui/Icon";
import { industries } from "@/content/industries";
import { getService, servicesByPillar } from "@/content/services";
import { pillars } from "@/content/site";
import { featuredWork } from "@/content/work";
import { HeaderBar } from "./HeaderBar";

export { Logo, Wordmark } from "./HeaderBar";

/**
 * Server half of the header: it slims the content modules down to the links the mega menu
 * needs, so the full service and case study copy never ships in the client bundle.
 */
export function SiteHeader() {
  const hipaa = getService("healthcare-ai-automation");

  return (
    <HeaderBar
      menus={{
        services: pillars.map((p) => ({
          title: p.title,
          href: `/services#${p.slug}`,
          icon: <Icon name={p.icon} className="size-3.5" />,
          accent: p.accent[0],
          links: servicesByPillar(p.slug).map((s) => ({ label: s.shortTitle, href: `/services/${s.slug}` })),
        })),
        feature: hipaa
          ? {
              href: `/services/${hipaa.slug}`,
              icon: <Icon name={hipaa.icon} className="size-[1.125rem]" />,
              eyebrow: hipaa.eyebrow,
              title: "HIPAA-compliant AI agents",
              body: hipaa.metaDescription,
              meta: hipaa.startingAt.price,
            }
          : undefined,
        work: featuredWork.map((w) => ({
          // "Bankful (eMerchantBroker LLC)" reads as "Bankful" in a menu
          label: w.client.replace(/\s*\(.*\)$/, ""),
          meta: w.industry,
          href: `/work/${w.slug}`,
          accent: w.accent,
        })),
        industries: industries.map((i) => ({ label: i.title, href: `/industries/${i.slug}` })),
      }}
    />
  );
}
