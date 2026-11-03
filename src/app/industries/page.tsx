import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHeader } from "@/components/ui/PageHeader";
import { Surface } from "@/components/ui/Surface";
import { industries } from "@/content/industries";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Industries: Healthcare, E-commerce, Fintech, SaaS and More",
  description:
    "Software, AI and growth for the industries we know from the inside: medical billing and healthcare, e-commerce, fintech, SaaS, education and more.",
  path: "/industries",
});

/** Hub for the industry pages, so each one has a parent to link from and a real breadcrumb. */
export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="Industry software, AI and growth, built by people who know the work"
        lead="Each industry has its own rules, tools and buyers. These are the ones we have shipped for, with the problems we solve in each."
        crumbs={[{ name: "Industries", path: "/industries" }]}
      />
      <div className="container-x grid gap-5 pb-8 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((ind, i) => (
          <Reveal key={ind.slug} delay={(i % 3) * 60}>
            <Link href={`/industries/${ind.slug}`} className="block h-full">
              <Surface specular interactive className="flex h-full flex-col p-6">
                <p className="t-eyebrow">{ind.title}</p>
                <h2 className="t-h4 mt-3">{ind.headline}</h2>
                <p className="t-small mt-3 line-clamp-3 text-fg-2">{ind.metaDescription}</p>
                <span className="t-small mt-auto inline-flex items-center gap-1.5 pt-5 text-fg">
                  Explore {ind.title.toLowerCase()}
                  <ArrowUpRight className="size-4 text-fg-2" aria-hidden="true" />
                </span>
              </Surface>
            </Link>
          </Reveal>
        ))}
      </div>
      <CtaBand />
    </>
  );
}
