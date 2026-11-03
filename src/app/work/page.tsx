import { ArrowUpRight, Building2, Code2, Globe } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHeader } from "@/components/ui/PageHeader";
import { type BentoItem, StaggeredGrid } from "@/components/ui/staggered-grid";
import type { CaseStudy } from "@/content/types";
import { caseStudies } from "@/content/work";
import { pageMetadata } from "@/lib/seo";
import { known } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Work: Products, Stores and Platforms We Built",
  description:
    "RevixPlus case studies: AI document intelligence for DiFacto, Bankful's payment gateway, HIPAA-compliant automation for Revix MD, e-commerce and more.",
  path: "/work",
});

/** Gradient poster for one case study, until real screenshots exist. */
function WorkPoster({ study, index }: { study: CaseStudy; index: number }) {
  const [a, b] = study.accent;
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group relative flex aspect-[4/5] flex-col overflow-hidden rounded-[var(--r-md)] p-4 text-background transition-transform duration-300 ease-[var(--ease-out)] hover:-translate-y-1 sm:aspect-[4/3] lg:aspect-[4/5]"
      style={{ background: `linear-gradient(150deg, ${a}, ${b})` }}
    >
      <span className="flex items-start justify-between gap-2">
        <span className="font-mono text-xs text-background/70">{String(index + 1).padStart(2, "0")}</span>
        <ArrowUpRight
          aria-hidden
          className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
      <span className="mt-auto text-[10px] font-semibold uppercase tracking-[0.12em] text-background/75 line-clamp-2">
        {study.industry}
      </span>
      <span className="mt-1 text-lg font-semibold leading-tight tracking-tight">
        {study.client.replace(/\s*\(.*\)$/, "")}
      </span>
      <span className="mt-1.5 text-xs leading-snug text-background/80 line-clamp-3">{study.title}</span>
    </Link>
  );
}

/** Most common values first, TODO placeholders dropped. */
function tally(values: string[], limit?: number) {
  const counts = new Map<string, number>();
  for (const v of values) if (known(v)) counts.set(v, (counts.get(v) ?? 0) + 1);
  return [...counts.keys()].sort((x, y) => counts.get(y)! - counts.get(x)!).slice(0, limit);
}

const chips = (list: string[]) =>
  list.map((v) => (
    <span key={v} className="chip">
      {v}
    </span>
  ));

export default function WorkPage() {
  const bentoItems: BentoItem[] = [
    {
      id: "sectors",
      title: "Sectors",
      description: "The industries these projects were built for.",
      icon: <Building2 aria-hidden className="size-5" />,
      content: chips(tally(caseStudies.map((w) => w.industry.split(",")[0]))),
    },
    {
      id: "stack",
      title: "Stack",
      description: "The tools that come up most across the case studies.",
      icon: <Code2 aria-hidden className="size-5" />,
      content: chips(
        tally(
          caseStudies.flatMap((w) => w.stack),
          8,
        ),
      ),
    },
    {
      id: "locations",
      title: "Client locations",
      description: "Where the clients behind this work are based.",
      icon: <Globe aria-hidden className="size-5" />,
      content: chips(tally(caseStudies.map((w) => w.location.split(/,| and /)[0]))),
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Proof, not promises."
        lead="Fourteen projects across five countries: fintech, SaaS, healthcare, e-commerce and corporate. Screenshots and figures are being added as clients approve them."
        crumbs={[{ name: "Work", path: "/work" }]}
      />
      <StaggeredGrid
        centerText="Shipped"
        className="pb-16 lg:pb-24"
        bentoItems={bentoItems}
        items={caseStudies.map((w, i) => <WorkPoster key={w.slug} study={w} index={i} />)}
      />
      <CtaBand title="Want yours on this page?" />
    </>
  );
}
