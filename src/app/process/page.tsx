import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { PageHeader } from "@/components/ui/PageHeader";
import { Surface } from "@/components/ui/Surface";
import { generalFaqs } from "@/content/faqs";
import { processSteps } from "@/content/process";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Process: Discover, Design, Build, Launch, Grow",
  description:
    "How RevixPlus runs a project: a fixed-price discovery week, weekly demos through design and build, a launch checklist and a growth plan from day one.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        title="A process you can see from day one."
        lead="Fixed-price discovery, weekly demos on a staging link, and a launch plan agreed before we write production code. Then growth, because launch is the start."
        crumbs={[{ name: "Process", path: "/process" }]}
      >
        <Button href="/contact" variant="primary" icon={<ArrowUpRight className="size-4" />}>
          Start with discovery
        </Button>
      </PageHeader>

      <div className="container-x grid gap-5 pb-8">
        {processSteps.map((s, i) => (
          <Reveal key={s.step} delay={i * 50}>
            <Surface specular className="grid gap-6 p-7 lg:grid-cols-[120px_1fr_auto] lg:items-start lg:p-9">
              <p className="t-h1 text-gradient">0{i + 1}</p>
              <div>
                <p className="t-eyebrow">{s.step}</p>
                <h2 className="t-h3 mt-1">{s.title}</h2>
                <p className="t-body mt-3 max-w-[64ch] text-fg-2">{s.promise}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.outputs.map((o) => (
                    <li key={o} className="chip">
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="t-small whitespace-nowrap rounded-full bg-muted px-3 py-1.5 text-fg-2">
                {s.duration}
              </p>
            </Surface>
          </Reveal>
        ))}
      </div>

      <FaqList faqs={generalFaqs} />
      <CtaBand
        title="Discovery is one week and a fixed price."
        body="Bring the idea or the problem. You leave with a scope, a timeline and a number."
      />
    </>
  );
}
