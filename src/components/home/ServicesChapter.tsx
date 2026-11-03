import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { HorizontalChapter, Panel } from "@/components/motion/HorizontalChapter";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Surface } from "@/components/ui/Surface";
import { home } from "@/content/home";
import { services } from "@/content/services";
import { pillars } from "@/content/site";

/** Chapter 2: six pillars travel horizontally. Each panel lists its services. */
export function ServicesChapter() {
  return (
    <HorizontalChapter
      id="services"
      label="Services"
      aside={
        <SectionHeading
          eyebrow={home.services.eyebrow}
          headline={home.services.headline}
          body={home.services.body}
        />
      }
    >
      {pillars.map((p, i) => {
        const list = services.filter((s) => s.pillar === p.slug);
        return (
          <Panel key={p.slug} width="min(84vw, 460px)">
            <Surface
              specular
              interactive
              className="flex h-full min-h-[440px] flex-col p-7 lg:min-h-[62vh]"
              style={
                {
                  "--accent-a": p.accent[0],
                  "--accent-b": p.accent[1],
                } as React.CSSProperties
              }
            >
              <div
                className="grid size-12 place-items-center rounded-2xl text-background"
                style={{ background: `linear-gradient(135deg, ${p.accent[0]}, ${p.accent[1]})` }}
              >
                <Icon name={p.icon} className="size-6" />
              </div>
              <p className="t-eyebrow mt-6">0{i + 1}</p>
              <h3 className="t-h3 mt-2">{p.title}</h3>
              <p className="t-body mt-3 text-fg-2">{p.tagline}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {list.slice(0, 6).map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="chip hover:text-fg">
                      {s.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/services#${p.slug}`}
                className="t-small mt-auto inline-flex items-center gap-1 pt-6 text-fg-2 underline-offset-4 hover:text-fg hover:underline"
              >
                All {p.title.toLowerCase()} services <ArrowUpRight className="size-3.5" />
              </Link>
            </Surface>
          </Panel>
        );
      })}
    </HorizontalChapter>
  );
}
