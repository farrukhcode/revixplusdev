import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { generalFaqs } from "@/content/faqs";
import { services } from "@/content/services";
import { pillars } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services: AI, Web, Mobile, Games, Growth and Cloud",
  description:
    "AI integration, HIPAA-compliant agents, web and mobile apps, e-commerce, games, SEO, AI engine optimization, social and DevOps, from one senior team.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything it takes to build, launch and grow. One team."
        lead="Six pillars, thirty-one services, no hand-offs between agencies. Pick one service or hand us the whole roadmap."
        crumbs={[{ name: "Services", path: "/services" }]}
      >
        <Button href="/contact" variant="primary" icon={<ArrowUpRight className="size-4" />}>
          Start a project
        </Button>
        <Button href="/pricing" variant="secondary">
          See pricing
        </Button>
      </PageHeader>

      <div className="container-x space-y-20 pb-8">
        {pillars.map((p) => {
          const list = services.filter((s) => s.pillar === p.slug);
          return (
            <section key={p.slug} id={p.slug} aria-labelledby={`pillar-${p.slug}`} className="scroll-mt-28">
              <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-[60ch]">
                  <span
                    className="mb-4 grid size-11 place-items-center rounded-2xl text-background"
                    style={{ background: `linear-gradient(135deg, ${p.accent[0]}, ${p.accent[1]})` }}
                  >
                    <Icon name={p.icon} className="size-5" />
                  </span>
                  <SplitHeading id={`pillar-${p.slug}`} className="t-h2">
                    {p.title}
                  </SplitHeading>
                  <p className="t-lead mt-3">{p.summary}</p>
                </div>
                <p className="t-small text-fg-3">{list.length} services</p>
              </Reveal>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((s, i) => (
                  <Reveal key={s.slug} delay={(i % 3) * 60}>
                    <ServiceCard service={s} />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <FaqList faqs={generalFaqs} />
      <CtaBand />
    </>
  );
}
