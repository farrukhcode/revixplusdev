import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { HorizontalChapter, Panel } from "@/components/motion/HorizontalChapter";
import { Button } from "@/components/ui/Button";
import { DeviceCard } from "@/components/ui/DeviceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { home } from "@/content/home";
import { featuredWork } from "@/content/work";

/** Chapter 4: featured projects on floating glass devices, horizontal travel. */
export function WorkChapter() {
  return (
    <HorizontalChapter
      id="work"
      label="Work"
      aside={
        <div>
          <SectionHeading eyebrow={home.work.eyebrow} headline={home.work.headline} body={home.work.body} />
          <Button
            href={home.work.cta.href}
            variant="secondary"
            className="mt-8"
            icon={<ArrowUpRight className="size-4" />}
          >
            {home.work.cta.label}
          </Button>
        </div>
      }
    >
      {featuredWork.map((w) => (
        <Panel key={w.slug} width="min(84vw, 520px)">
          <Link href={`/work/${w.slug}`} className="block h-full" aria-label={`${w.title}, case study`}>
            <DeviceCard study={w} />
          </Link>
        </Panel>
      ))}
    </HorizontalChapter>
  );
}
