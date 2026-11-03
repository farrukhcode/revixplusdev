import { ArrowUpRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Button } from "@/components/ui/Button";
import { BorderBeam } from "@/components/ui/border-beam";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { PageHeader } from "@/components/ui/PageHeader";
import { ResearchBentoGrid } from "@/components/ui/research-bento-grid";
import { Surface } from "@/components/ui/Surface";
import { generalFaqs } from "@/content/faqs";
import { packages, pricingNotes, retainers } from "@/content/pricing";
import type { PricingPackage } from "@/content/types";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Pricing: Fixed-Price Packages and Monthly Retainers",
  description:
    "Starting prices in USD for websites, Shopify stores, apps, AI integration, HIPAA-compliant agents and games, plus growth, care and developer retainers.",
  path: "/pricing",
});

function PackageCard({ p, i }: { p: PricingPackage; i: number }) {
  return (
    <Reveal delay={(i % 3) * 60} className="h-full">
      <Surface
        specular
        interactive
        className={cn("flex h-full flex-col p-6", p.highlight && "border-violet/60")}
      >
        {p.highlight ? <BorderBeam size={160} duration={10} /> : null}
        {p.highlight ? (
          <span className="chip mb-3 w-fit border-violet/40 text-violet">Most requested</span>
        ) : null}
        <h3 className="t-h4">{p.name}</h3>
        <p className="t-h2 text-gradient mt-3">{p.price}</p>
        <p className="t-small mt-1 text-fg-3">{p.timeline}</p>
        <p className="t-small mt-4 text-fg-2">Best for: {p.bestFor}</p>
        <ul className="mt-5 grid gap-2">
          {p.includes.map((inc) => (
            <li key={inc} className="flex items-start gap-2">
              <Check className="mt-1 size-3.5 shrink-0 text-cyan" aria-hidden="true" />
              <span className="t-small">{inc}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <Link
            href={`/services/${p.serviceSlug}`}
            className="t-small text-fg-2 underline-offset-4 hover:text-fg hover:underline"
          >
            About this service
          </Link>
          <Button
            href={`/contact?topic=${p.serviceSlug}`}
            variant={p.highlight ? "primary" : "secondary"}
            size="sm"
            icon={<ArrowUpRight className="size-3.5" />}
          >
            Get a quote
          </Button>
        </div>
      </Surface>
    </Reveal>
  );
}

// The dedicated developer retainer gets the showcase; its price is parsed from the content string.
const dedicated = retainers.find((r) => r.slug === "dedicated-developer");
const dedicatedPrice = dedicated ? Number(dedicated.price.replace(/[^\d]/g, "")) : 0;

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Starting prices, in the open."
        lead="Every project is scoped in a fixed-price discovery week, so the number you sign is the number you pay. These are the floors for common builds, in USD."
        crumbs={[{ name: "Pricing", path: "/pricing" }]}
      />

      <section className="container-x pb-16">
        <SplitHeading as="h2" className="t-h2">
          Fixed-price builds
        </SplitHeading>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((p, i) => (
            <PackageCard key={p.slug} p={p} i={i} />
          ))}
        </div>
      </section>

      <section className="container-x pb-16">
        <SplitHeading as="h2" className="t-h2">
          Monthly retainers
        </SplitHeading>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {retainers.map((p, i) => (
            <PackageCard key={p.slug} p={p} i={i} />
          ))}
        </div>
      </section>

      {dedicated ? (
        <section className="container-x pb-16">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="t-eyebrow">{dedicated.name}</p>
              <SplitHeading as="h2" className="t-h2 mt-3">
                A senior developer on your backlog
              </SplitHeading>
              <p className="t-lead mt-3 max-w-[52ch]">
                {dedicated.timeline}. You interview the developer first, and nobody starts without your
                approval.
              </p>
            </div>
            <Button
              href={`/contact?topic=${dedicated.serviceSlug}`}
              variant="primary"
              icon={<ArrowUpRight className="size-4" />}
            >
              Hire a developer
            </Button>
          </div>
          <Reveal className="mt-8">
            <ResearchBentoGrid
              monthlyPrice={dedicatedPrice}
              planName={dedicated.name}
              lineItems={dedicated.includes}
            />
          </Reveal>
        </section>
      ) : null}

      <section className="container-x pb-16">
        <ul className="grid gap-2 sm:grid-cols-2">
          {pricingNotes.map((n) => (
            <li key={n} className="t-small flex items-start gap-2 text-fg-2">
              <Check className="mt-1 size-3.5 shrink-0 text-cyan" aria-hidden="true" />
              {n}
            </li>
          ))}
        </ul>
      </section>

      <FaqList faqs={generalFaqs} />
      <CtaBand
        title="Not sure which one fits?"
        body="Send a two-line description and we will reply with a range before any call."
      />
    </>
  );
}
