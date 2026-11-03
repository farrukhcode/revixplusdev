import { ArrowUpRight, ExternalLink, Quote } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { DeviceCard } from "@/components/ui/DeviceCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Surface } from "@/components/ui/Surface";
import { getService } from "@/content/services";
import { caseStudies, getCaseStudy } from "@/content/work";
import { pageMetadata } from "@/lib/seo";
import { known } from "@/lib/utils";

// Every slug is prerendered from local content (generateStaticParams), so awaiting params
// never waits on data; opt out of the instant-shell check rather than add a fallback nobody sees.
export const instant = false;

export async function generateStaticParams() {
  return caseStudies.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const w = getCaseStudy(slug);
  if (!w) return {};
  return pageMetadata({
    title: w.seoTitle,
    description: w.metaDescription,
    path: `/work/${w.slug}`,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const w = getCaseStudy(slug);
  if (!w) notFound();
  const services = w.services.map(getService).filter((s) => s !== undefined);
  const results = w.results.filter((r) => known(r.value));
  const more = caseStudies
    .filter((x) => x.slug !== w.slug && x.services.some((s) => w.services.includes(s)))
    .slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={`${w.client} · ${w.industry}`}
        title={w.title}
        lead={w.summary}
        crumbs={[
          { name: "Work", path: "/work" },
          { name: w.client, path: `/work/${w.slug}` },
        ]}
      >
        {w.liveUrl ? (
          <Button
            href={w.liveUrl}
            variant="secondary"
            target="_blank"
            rel="noreferrer noopener"
            icon={<ExternalLink className="size-4" />}
          >
            Visit live site
          </Button>
        ) : null}
        <Button href="/contact" variant="primary" icon={<ArrowUpRight className="size-4" />}>
          Build something like this
        </Button>
      </PageHeader>

      <div className="container-x grid gap-10 pb-16 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <DeviceCard study={w} />
        </Reveal>
        <Reveal delay={80}>
          <Surface className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-1">
            <Fact label="Client" value={w.client} />
            <Fact label="Industry" value={w.industry} />
            <Fact label="Location" value={w.location} />
            <Fact label="Timeline" value={w.timeline} />
            <div>
              <p className="t-eyebrow">Services</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="chip hover:text-fg">
                      {s.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="t-eyebrow">Stack</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {w.stack.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Surface>
        </Reveal>
      </div>

      <section className="container-x grid gap-12 pb-16 lg:grid-cols-2">
        <div>
          <SplitHeading as="h2" className="t-h2">
            The challenge
          </SplitHeading>
          <div className="mt-5 space-y-4">
            {w.challenge.map((p) => (
              <Reveal as="p" key={p.slice(0, 24)} className="t-body text-fg-2">
                {p}
              </Reveal>
            ))}
          </div>
        </div>
        <div>
          <SplitHeading as="h2" className="t-h2">
            What we built
          </SplitHeading>
          <div className="mt-5 space-y-4">
            {w.solution.map((p) => (
              <Reveal as="p" key={p.slice(0, 24)} className="t-body text-fg-2">
                {p}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Only confirmed figures are shown; with none and no quote, the section is left out */}
      {results.length || w.quote ? (
        <section className="container-x pb-16">
          {results.length ? (
            <>
              <SplitHeading as="h2" className="t-h2">
                Results
              </SplitHeading>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {results.map((r, i) => (
                  <Reveal key={r.label} delay={i * 70}>
                    <Surface specular className="h-full p-6">
                      <p className="t-h1 text-gradient">{r.value}</p>
                      <p className="t-small mt-2 text-fg-2">{r.label}</p>
                    </Surface>
                  </Reveal>
                ))}
              </div>
            </>
          ) : null}
          {w.quote ? (
            <Reveal className="mt-8">
              <Surface muted className="p-7 sm:p-10">
                <Quote className="size-6 text-cyan" aria-hidden="true" />
                <p className="t-lead mt-4 text-fg">{w.quote.text}</p>
                <p className="t-small mt-4 text-fg-2">
                  {w.quote.author}, {w.quote.role}
                </p>
              </Surface>
            </Reveal>
          ) : null}
        </section>
      ) : null}

      {services.length ? (
        <section className="container-x pb-16">
          <h2 className="t-h3">Services used</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} compact />
            ))}
          </div>
        </section>
      ) : null}

      {more.length ? (
        <section className="container-x pb-8">
          <h2 className="t-h3">More like this</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {more.map((m) => (
              <Link key={m.slug} href={`/work/${m.slug}`} className="block h-full">
                <DeviceCard study={m} />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <CtaBand title={`Need something like ${w.client}?`} />
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  if (!known(value)) return null;
  return (
    <div>
      <p className="t-eyebrow">{label}</p>
      <p className="t-body mt-1">{value}</p>
    </div>
  );
}
