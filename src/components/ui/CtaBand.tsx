import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Button } from "@/components/ui/Button";
import { BorderBeam } from "@/components/ui/border-beam";
import { Surface } from "@/components/ui/Surface";
import { site } from "@/content/site";

export function CtaBand({
  title = "Ready when you are.",
  body = "Tell us what you are building or what is slowing you down. We reply within one business day.",
  primary = { label: "Start a project", href: "/contact" },
}: {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
}) {
  return (
    <section className="container-x py-16 lg:py-20">
      <Reveal>
        <Surface
          specular
          className="flex flex-col items-start gap-6 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between"
        >
          <BorderBeam size={240} duration={14} />
          <div>
            <SplitHeading className="t-h2 max-w-[18ch]">{title}</SplitHeading>
            <p className="t-lead mt-3 max-w-[48ch]">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              href={primary.href}
              variant="primary"
              size="lg"
              icon={<ArrowUpRight className="size-4" />}
            >
              {primary.label}
            </Button>
            <Button
              href={site.whatsapp}
              variant="secondary"
              size="lg"
              target="_blank"
              rel="noreferrer"
              icon={<MessageCircle className="size-4" />}
            >
              WhatsApp
            </Button>
          </div>
        </Surface>
      </Reveal>
    </section>
  );
}
