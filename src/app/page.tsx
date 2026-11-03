import type { Metadata } from "next";
import { AiChapter } from "@/components/home/AiChapter";
import { FinalCta } from "@/components/home/FinalCta";
import { GrowthChapter } from "@/components/home/GrowthChapter";
import { Hero } from "@/components/home/Hero";
import { Problem } from "@/components/home/Problem";
import { ProcessChapter } from "@/components/home/ProcessChapter";
import { ServicesChapter } from "@/components/home/ServicesChapter";
import { Voices } from "@/components/home/Voices";
import { WhyUs } from "@/components/home/WhyUs";
import { WorkChapter } from "@/components/home/WorkChapter";
import { ChapterRail } from "@/components/motion/StoryTour";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${site.name}: Software, AI and Growth Agency`,
  description: site.description,
  path: "/",
});

/**
 * The story. Ten chapters, vertical and horizontal, with an auto-tour that the
 * visitor can pause at any moment. Each chapter is a real section with real text.
 */
export default function HomePage() {
  return (
    <>
      <ChapterRail />
      <Hero />
      <Problem />
      <ServicesChapter />
      <AiChapter />
      <WorkChapter />
      <ProcessChapter />
      <GrowthChapter />
      <WhyUs />
      <Voices />
      <FinalCta />
    </>
  );
}
