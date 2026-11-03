import { ArrowUpRight, Check, ExternalLink, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { DeviceCard } from "@/components/ui/DeviceCard";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Surface } from "@/components/ui/Surface";
import { getService, services } from "@/content/services";
import { pillarBySlug } from "@/content/site";
import { getCaseStudy } from "@/content/work";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

// Every slug is prerendered from local content (generateStaticParams), so awaiting params
// never waits on data; opt out of the instant-shell check rather than add a fallback nobody sees.
export const instant = false;

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata({ title: s.seoTitle, description: s.metaDescription, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const pillar = pillarBySlug[s.pillar];
  const work = s.relatedWork.map(getCaseStudy).filter((w) => w !== undefined);
  const related = s.relatedServices.map(getService).filter((x) => x !== undefined);

  return (
    <>
      <JsonLd data={serviceSchema(s)} />
      <PageHeader
        eyebrow={s.eyebrow}
        title={s.title}
        lead={s.heroPromise}
        crumbs={[
          { name: "Services", path: "/services" },
          { name: pillar.title, path: `/services#${pillar.slug}` },
          { name: s.shortTitle, path: `/services/${s.slug}` },
        ]}
      >
        <Button
          href={`/contact?topic=${s.slug}`}
          variant="primary"
          icon={<ArrowUpRight className="size-4" />}
        >
          Get an estimate
        </Button>
        <span className="chip h-11 px-4 text-[0.9rem]">
          {s.startingAt.price} · {s.startingAt.timeline}
        </span>
      </PageHeader>

      {/* Pains */}
      <section className="container-x pb-16">
        <Reveal as="h2" className="t-eyebrow mb-5">
          Sound familiar?
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {s.pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <Surface specular className="h-full p-6">
                <h3 className="t-h4">{p.title}</h3>
                <p className="t-body mt-2 text-fg-2">{p.body}</p>
              </Surface>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Deliverables + approach */}
      <section className="container-x grid gap-10 pb-16 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SplitHeading as="h2" className="t-h2 max-w-[16ch]">
            What you get
          </SplitHeading>
          <ul className="mt-6 grid gap-2">
            {s.deliverables.map((d) => (
              <Reveal as="li" key={d} className="flex items-start gap-3">
                <Check className="mt-1 size-4 shrink-0 text-cyan" aria-hidden="true" />
                <span className="t-body">{d}</span>
              </Reveal>
            ))}
          </ul>
          <div className="mt-8">
            <p className="t-eyebrow mb-3">Stack and tools</p>
            <ul className="flex flex-wrap gap-2">
              {s.stack.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <SplitHeading as="h2" className="t-h2 max-w-[16ch]">
            How we do it
          </SplitHeading>
          <ol className="mt-6 grid gap-3">
            {s.approach.map((a, i) => (
              <Reveal as="li" key={a.step} delay={i * 60}>
                <Surface className="flex gap-4 p-5">
                  <span className="t-small grid size-8 shrink-0 place-items-center rounded-full bg-muted font-mono text-fg-2">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="t-h4 text-[1.05rem]">{a.step}</h3>
                    <p className="t-body mt-1 text-fg-2">{a.body}</p>
                  </div>
                </Surface>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Optional catalog (e.g. agent catalog) */}
      {s.catalog ? (
        <section className="container-x pb-16">
          <SplitHeading as="h2" className="t-h2 max-w-[20ch]">
            {s.catalog.title}
          </SplitHeading>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.catalog.items.map((it, i) => (
              <Reveal key={it.name} delay={(i % 3) * 60}>
                <Surface specular className="h-full p-6">
                  <span className="grid size-9 place-items-center rounded-xl bg-muted text-violet">
                    <Icon name={s.icon} className="size-4" />
                  </span>
                  <h3 className="t-h4 mt-4 text-[1.05rem]">{it.name}</h3>
                  <p className="t-small mt-2 text-fg-2">{it.body}</p>
                </Surface>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {/* Optional compliance block */}
      {s.compliance ? (
        <section className="container-x pb-16">
          <Reveal>
            <Surface muted className="p-7 sm:p-10">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-6 text-cyan" aria-hidden="true" />
                <h2 className="t-h3">{s.compliance.title}</h2>
              </div>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {s.compliance.items.map((it) => (
                  <li key={it} className="flex items-start gap-3">
                    <Check className="mt-1 size-4 shrink-0 text-cyan" aria-hidden="true" />
                    <span className="t-body text-fg-2">{it}</span>
                  </li>
                ))}
              </ul>
            </Surface>
          </Reveal>
        </section>
      ) : null}

      {/* Pricing */}
      <section className="container-x pb-16">
        <Reveal>
          <Surface
            specular
            className="flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10"
          >
            <div>
              <p className="t-eyebrow">Starting at</p>
              <p className="t-h1 text-gradient mt-2">{s.startingAt.price}</p>
              <p className="t-body mt-2 text-fg-2">
                Typical timeline {s.startingAt.timeline}.{s.startingAt.note ? ` ${s.startingAt.note}` : ""}
              </p>
            </div>
            <Button
              href={`/contact?topic=${s.slug}`}
              variant="primary"
              size="lg"
              icon={<ArrowUpRight className="size-4" />}
            >
              Get an exact quote
            </Button>
          </Surface>
        </Reveal>
      </section>

      {/* Related work */}
      {work.length ? (
        <section className="container-x pb-16">
          <SplitHeading as="h2" className="t-h2 max-w-[16ch]">
            Related work
          </SplitHeading>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {work.map((w, i) => (
              <Reveal key={w.slug} delay={i * 70}>
                <Link href={`/work/${w.slug}`} className="block h-full">
                  <DeviceCard study={w} />
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <FaqList faqs={s.faqs} title={`${s.shortTitle}: questions people ask`} />

      {/* Authority links + related services */}
      <section className="container-x grid gap-10 pb-8 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <h2 className="t-h4">Further reading</h2>
          <ul className="mt-4 grid gap-2">
            {s.authorityLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="t-small inline-flex items-center gap-1.5 text-fg-2 underline-offset-4 hover:text-fg hover:underline"
                >
                  {l.label} <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="t-h4">Often paired with</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <ServiceCard key={r.slug} service={r} compact />
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={`Let's scope your ${s.shortTitle.toLowerCase()} project.`} />
    </>
  );
}
