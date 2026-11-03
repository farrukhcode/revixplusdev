import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { DeviceCard } from "@/components/ui/DeviceCard";
import { FaqList } from "@/components/ui/FaqList";
import { PageHeader } from "@/components/ui/PageHeader";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Surface } from "@/components/ui/Surface";
import { industries } from "@/content/industries";
import { getService } from "@/content/services";
import { getCaseStudy } from "@/content/work";
import { pageMetadata } from "@/lib/seo";

const bySlug = Object.fromEntries(industries.map((i) => [i.slug, i]));

// Every slug is prerendered from local content (generateStaticParams), so awaiting params
// never waits on data; opt out of the instant-shell check rather than add a fallback nobody sees.
export const instant = false;

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const ind = bySlug[slug];
  if (!ind) return {};
  return pageMetadata({
    title: ind.seoTitle,
    description: ind.metaDescription,
    path: `/industries/${ind.slug}`,
  });
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const ind = bySlug[slug];
  if (!ind) notFound();
  const services = ind.services.map(getService).filter((s) => s !== undefined);
  const work = ind.work.map(getCaseStudy).filter((w) => w !== undefined);

  return (
    <>
      <PageHeader
        eyebrow={`Industries · ${ind.title}`}
        title={ind.headline}
        lead={ind.intro}
        crumbs={[
          { name: "Industries", path: "/industries" },
          { name: ind.title, path: `/industries/${ind.slug}` },
        ]}
      >
        <Button
          href={`/contact?topic=${ind.slug}`}
          variant="primary"
          icon={<ArrowUpRight className="size-4" />}
        >
          Talk to us about {ind.title.toLowerCase()}
        </Button>
      </PageHeader>

      <section className="container-x pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {ind.pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <Surface specular className="h-full p-6">
                <h2 className="t-h4">{p.title}</h2>
                <p className="t-body mt-2 text-fg-2">{p.body}</p>
              </Surface>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x pb-16">
        <SplitHeading as="h2" className="t-h2 max-w-[20ch]">
          What we do for {ind.title.toLowerCase()}
        </SplitHeading>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 60}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </section>

      {work.length ? (
        <section className="container-x pb-16">
          <SplitHeading as="h2" className="t-h2 max-w-[20ch]">
            Work in this industry
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

      <FaqList faqs={ind.faqs} title={`${ind.title}: questions people ask`} />
      <CtaBand title={`Let's talk about your ${ind.title.toLowerCase()} business.`} />
    </>
  );
}
