import { SplitHeading } from "@/components/motion/SplitHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import type { Faq } from "@/content/types";
import { faqSchema } from "@/lib/schema";

/** FAQ section on VengeanceUI's accordion, with FAQPage schema. Answers stay in the HTML for search. */
export function FaqList({
  faqs,
  title = "Questions people ask",
  withSchema = true,
}: {
  faqs: Faq[];
  title?: string;
  withSchema?: boolean;
}) {
  return (
    <section aria-labelledby="faq-heading" className="container-x py-16 lg:py-20">
      {withSchema ? <JsonLd data={faqSchema(faqs)} /> : null}
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <SplitHeading
          id="faq-heading"
          className="t-h2 max-w-[16ch]"
          wrapperClassName="lg:sticky lg:top-28 lg:self-start"
        >
          {title}
        </SplitHeading>
        <FaqAccordion items={faqs.map((f) => ({ question: f.q, answer: f.a }))} className="max-w-none" />
      </div>
    </section>
  );
}
