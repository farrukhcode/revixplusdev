import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { BorderBeam } from "@/components/ui/border-beam";
import { Icon } from "@/components/ui/Icon";
import { PerspectiveGrid } from "@/components/ui/perspective-grid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Surface } from "@/components/ui/Surface";
import { home } from "@/content/home";
import { site } from "@/content/site";

function resolveHref(href: string) {
  if (href === "booking") return site.bookingUrl;
  if (href === "whatsapp") return site.whatsapp;
  return href;
}

/** Closing section: three ways to start, over a perspective grid that lights up under the cursor. */
export function FinalCta() {
  return (
    <section
      id="start"
      data-chapter="start"
      data-chapter-label="Your turn"
      data-tour-speed="80"
      className="relative isolate overflow-hidden py-24 lg:py-32"
    >
      {/* Tiles light up where the cursor passes; the content layer lets pointer events through except on the doors */}
      <PerspectiveGrid className="!absolute inset-0 -z-10" />
      <div className="container-x pointer-events-none">
        <SectionHeading
          eyebrow={home.cta.eyebrow}
          headline={home.cta.headline}
          body={home.cta.body}
          align="center"
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {home.cta.doors.map((d, i) => {
            const href = resolveHref(d.href);
            const external = /^https?:/.test(href);
            const inner = (
              <Surface specular interactive className="flex h-full flex-col p-7">
                {i === 0 ? <BorderBeam size={160} duration={10} /> : null}
                <span className="grid size-11 place-items-center rounded-2xl bg-muted text-cyan">
                  <Icon name={d.icon} className="size-5" />
                </span>
                <h3 className="t-h4 mt-5">{d.title}</h3>
                <p className="t-body mt-2 text-fg-2">{d.body}</p>
                <span className="t-small mt-auto inline-flex items-center gap-1 pt-6 text-fg">
                  Go <ArrowUpRight className="size-3.5" />
                </span>
              </Surface>
            );
            return (
              <Reveal key={d.title} delay={i * 80} className="pointer-events-auto">
                {external ? (
                  <a href={href} target="_blank" rel="noreferrer" className="block h-full">
                    {inner}
                  </a>
                ) : (
                  <Link href={href} className="block h-full">
                    {inner}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
