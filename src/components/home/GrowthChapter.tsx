import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { HorizontalChapter, Panel } from "@/components/motion/HorizontalChapter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Surface } from "@/components/ui/Surface";
import StatsCounter from "@/components/ui/stats-counter";
import { home } from "@/content/home";

/** Chapter 6: four growth panels, each with a number that settles without bounce. */
export function GrowthChapter() {
  return (
    <HorizontalChapter
      id="growth"
      label="Growth"
      aside={
        <SectionHeading
          eyebrow={home.growth.eyebrow}
          headline={home.growth.headline}
          body={home.growth.body}
        />
      }
    >
      {home.growth.panels.map((p, i) => (
        <Panel key={p.title} width="min(84vw, 420px)">
          <Link href={p.href} className="block h-full" aria-label={`${p.title} service`}>
            <Surface specular interactive className="flex h-full min-h-[380px] flex-col p-7 lg:min-h-[56vh]">
              <p className="t-eyebrow">0{i + 1}</p>
              <h3 className="t-h3 mt-2">{p.title}</h3>
              <p className="t-display mt-8 text-gradient">
                <StatsCounter value={p.value} suffix={p.suffix} />
              </p>
              <p className="t-small mt-2 max-w-[28ch] text-fg-3">{p.metricLabel}</p>
              <p className="t-body mt-6 text-fg-2">{p.body}</p>
              <span className="t-small mt-auto inline-flex items-center gap-1 pt-6 text-fg-2">
                Explore <ArrowUpRight className="size-3.5" />
              </span>
            </Surface>
          </Link>
        </Panel>
      ))}
    </HorizontalChapter>
  );
}
