import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { PageHeader } from "@/components/ui/PageHeader";
import { Surface } from "@/components/ui/Surface";
import StatsCounter from "@/components/ui/stats-counter";
import { about } from "@/content/about";
import { generalFaqs } from "@/content/faqs";
import { site } from "@/content/site";
import { liveTeam } from "@/content/team";
import { pageMetadata } from "@/lib/seo";
import { initials } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "About RevixPlus: Software, AI and Growth From One Team",
  description:
    "Founded in Lahore in 2026 by an engineer with a decade inside European and US product teams. We build software, integrate AI and grow it with marketing.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={about.eyebrow}
        title={about.headline}
        lead={about.mission}
        crumbs={[{ name: "About", path: "/about" }]}
      >
        <Button href="/contact" variant="primary" icon={<ArrowUpRight className="size-4" />}>
          Work with us
        </Button>
      </PageHeader>

      <section className="container-x grid gap-10 pb-16 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5">
          {about.story.map((p) => (
            <Reveal as="p" key={p.slice(0, 20)} className="t-body text-fg-2">
              {p}
            </Reveal>
          ))}
        </div>
        <Reveal delay={100}>
          <Surface className="grid grid-cols-2 gap-6 p-7">
            {site.stats.map((s) => (
              <div key={s.label}>
                <p className="t-h2 text-gradient">
                  <StatsCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="t-small mt-1 text-fg-2">{s.label}</p>
              </div>
            ))}
            <div className="col-span-2">
              <p className="t-eyebrow">Where we work</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {about.locations.map((l) => (
                  <li key={l} className="chip">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </Surface>
        </Reveal>
      </section>

      <section className="container-x pb-16">
        <SplitHeading as="h2" className="t-h2">
          How we work
        </SplitHeading>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((v, i) => (
            <Reveal key={v.title} delay={i * 60}>
              <Surface specular className="h-full p-6">
                <h3 className="t-h4">{v.title}</h3>
                <p className="t-small mt-2 text-fg-2">{v.body}</p>
              </Surface>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x pb-8">
        <SplitHeading as="h2" className="t-h2">
          The team
        </SplitHeading>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {liveTeam.map((m, i) => (
            <Reveal key={m.name} delay={i * 60}>
              <Surface className="flex h-full flex-col p-6">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={m.name}
                    width={80}
                    height={80}
                    className="size-20 rounded-2xl object-cover ring-1 ring-border"
                  />
                ) : (
                  <div
                    className="grid size-20 place-items-center rounded-2xl text-xl font-semibold text-white"
                    style={{ background: "linear-gradient(135deg, var(--cyan), var(--violet))" }}
                    aria-hidden="true"
                  >
                    {initials(m.name)}
                  </div>
                )}
                <h3 className="t-h4 mt-4">{m.name}</h3>
                <p className="t-small text-fg-3">{m.role}</p>
                <p className="t-small mt-3 text-fg-2">{m.bio}</p>
                {m.linkedin ? (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${m.name} on LinkedIn`}
                    className="t-small mt-auto inline-flex items-center gap-1.5 pt-4 text-fg-2 hover:text-fg"
                  >
                    LinkedIn <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                ) : null}
              </Surface>
            </Reveal>
          ))}
        </div>
      </section>

      <div id="faq">
        <FaqList faqs={generalFaqs} />
      </div>
      <CtaBand />
    </>
  );
}
