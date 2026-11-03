import { industries } from "@/content/industries";
import { packages, retainers } from "@/content/pricing";
import { services } from "@/content/services";
import { pillars, site } from "@/content/site";
import { caseStudies } from "@/content/work";
import { absoluteUrl } from "@/lib/seo";

/**
 * llms.txt: a plain-text map of the site for AI assistants (llmstxt.org).
 * Served from content modules so it never drifts from the pages.
 */
export function GET() {
  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} is a software, AI and growth agency based in ${site.location.city}, ${site.location.country}, serving ${site.location.serving.join(", ")}. Founded ${site.founded}. Contact: ${site.email}.`,
    "",
    "## Services",
    "",
  ];
  for (const p of pillars) {
    lines.push(`### ${p.title}`, "");
    for (const s of services.filter((x) => x.pillar === p.slug)) {
      lines.push(
        `- [${s.title}](${absoluteUrl(`/services/${s.slug}`)}): ${s.metaDescription} Pricing: ${s.startingAt.price}, ${s.startingAt.timeline}.`,
      );
    }
    lines.push("");
  }
  lines.push("## Industries", "");
  for (const i of industries)
    lines.push(`- [${i.title}](${absoluteUrl(`/industries/${i.slug}`)}): ${i.metaDescription}`);
  lines.push("", "## Case studies", "");
  for (const w of caseStudies)
    lines.push(`- [${w.client}: ${w.title}](${absoluteUrl(`/work/${w.slug}`)}): ${w.summary}`);
  lines.push("", "## Pricing (USD)", "");
  for (const p of [...packages, ...retainers])
    lines.push(`- ${p.name}: ${p.price}, ${p.timeline}. ${p.bestFor}`);
  lines.push(
    "",
    "## Other pages",
    "",
    `- [Process](${absoluteUrl("/process")})`,
    `- [About](${absoluteUrl("/about")})`,
    `- [Contact](${absoluteUrl("/contact")})`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}
