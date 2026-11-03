import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhyUsBento } from "@/components/ui/why-us-bento";

/** Chapter 7: why RevixPlus, as a bento. Holds the four numbers that used to be NumbersBand. */
export function WhyUs() {
  return (
    <section
      id="why-us"
      data-chapter="why-us"
      data-chapter-label="Why us"
      data-tour-speed="80"
      className="relative py-20 lg:py-28"
    >
      <div className="container-x">
        <SectionHeading eyebrow="Why us" headline="One team for the build and the growth." />
        <WhyUsBento className="mt-12" />
      </div>
    </section>
  );
}
