import { generalFaqs } from "@/content/faqs";
import { industries } from "@/content/industries";
import { packages, retainers } from "@/content/pricing";
import { processSteps } from "@/content/process";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { caseStudies } from "@/content/work";
import { known } from "@/lib/utils";

export interface Doc {
  id: string;
  title: string;
  url: string;
  text: string;
  tokens: Set<string>;
}

const STOP = new Set(
  "a an and are as at be by for from has have in is it its of on or that the to was we with you your this our will can what how do does".split(
    " ",
  ),
);

function tokenize(s: string) {
  return new Set(
    s
      .toLowerCase()
      .replace(/[^a-z0-9+#. ]/g, " ")
      .split(/\s+/)
      .filter((t) => t.length > 2 && !STOP.has(t)),
  );
}

function doc(id: string, title: string, url: string, text: string): Doc {
  return { id, title, url, text, tokens: tokenize(`${title} ${text}`) };
}

/**
 * The concierge answers from the site's own content. The corpus is built at
 * module load from the typed content modules, so there is nothing to sync.
 * Retrieval is lexical (token overlap) which is plenty for ~60 short documents
 * and avoids an embeddings dependency at request time.
 */
export const corpus: Doc[] = [
  doc(
    "site",
    `${site.name} overview`,
    "/",
    `${site.description} Based in ${site.location.city}, ${site.location.country}. Serving ${site.location.serving.join(", ")}. Contact ${site.email}, WhatsApp ${site.phone}. Booking: ${site.bookingUrl}.`,
  ),
  ...services.map((s) =>
    doc(
      `service:${s.slug}`,
      s.title,
      `/services/${s.slug}`,
      [
        s.heroPromise,
        `Starting at ${s.startingAt.price}, typical timeline ${s.startingAt.timeline}. ${s.startingAt.note ?? ""}`,
        `Deliverables: ${s.deliverables.join(", ")}.`,
        `Stack: ${s.stack.join(", ")}.`,
        s.compliance ? `${s.compliance.title}: ${s.compliance.items.join("; ")}.` : "",
        s.catalog
          ? `${s.catalog.title}: ${s.catalog.items.map((i) => `${i.name} (${i.body})`).join("; ")}.`
          : "",
        s.faqs.map((f) => `Q: ${f.q} A: ${f.a}`).join(" "),
      ].join(" "),
    ),
  ),
  ...caseStudies.map((w) =>
    doc(
      `work:${w.slug}`,
      `${w.client}: ${w.title}`,
      `/work/${w.slug}`,
      [
        w.summary,
        ...w.challenge,
        ...w.solution,
        `Stack: ${w.stack.join(", ")}.`,
        `Industry: ${w.industry}.${known(w.location) ? ` Location: ${w.location}.` : ""}`,
      ].join(" "),
    ),
  ),
  ...industries.map((i) =>
    doc(
      `industry:${i.slug}`,
      i.headline,
      `/industries/${i.slug}`,
      [i.intro, i.faqs.map((f) => `Q: ${f.q} A: ${f.a}`).join(" ")].join(" "),
    ),
  ),
  doc(
    "pricing",
    "Pricing and packages",
    "/pricing",
    [...packages, ...retainers]
      .map(
        (p) =>
          `${p.name}: ${p.price}, ${p.timeline}. Best for: ${p.bestFor}. Includes ${p.includes.join(", ")}.`,
      )
      .join(" "),
  ),
  doc(
    "process",
    "How we work",
    "/process",
    processSteps
      .map((p) => `${p.step} ${p.title}: ${p.promise} (${p.duration}). Outputs: ${p.outputs.join(", ")}.`)
      .join(" "),
  ),
  doc("faqs", "General FAQs", "/about#faq", generalFaqs.map((f) => `Q: ${f.q} A: ${f.a}`).join(" ")),
];

export function retrieve(query: string, k = 5): Doc[] {
  const q = tokenize(query);
  if (!q.size) return corpus.slice(0, k);
  const scored = corpus.map((d) => {
    let hits = 0;
    for (const t of q) if (d.tokens.has(t)) hits += 1;
    return { d, score: hits / Math.sqrt(d.tokens.size + 1) };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .filter((s) => s.score > 0)
    .map((s) => s.d);
}
