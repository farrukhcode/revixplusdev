import { CalendarClock, Mail, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Concierge } from "@/components/ai/Concierge";
import { LeadForm } from "@/components/forms/LeadForm";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Surface } from "@/components/ui/Surface";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact: Start a Project or Book a Call",
  description:
    "Tell RevixPlus what you are building or what is slowing you down. Reply within one business day. Book a 20-minute call, send a brief, or WhatsApp us.",
  path: "/contact",
});

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's write your next chapter."
        lead="Three ways to start. Pick the one that fits how you like to work. Every route ends with a real person replying within one business day."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <div className="container-x grid gap-8 pb-8 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <Surface className="p-6 sm:p-8">
            <h2 className="t-h3">Send a brief</h2>
            <p className="t-body mt-2 text-fg-2">Two minutes. We reply with questions or a range.</p>
            <div className="mt-6">
              <Suspense fallback={<LeadForm />}>
                <TopicForm searchParams={searchParams} />
              </Suspense>
            </div>
          </Surface>
        </Reveal>

        <div className="grid gap-4 self-start">
          <Reveal delay={60}>
            <a href={site.bookingUrl} target="_blank" rel="noreferrer noopener" className="block">
              <Surface specular interactive className="flex items-start gap-4 p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-muted text-violet">
                  <CalendarClock className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="t-h4">Book a 20-minute call</h2>
                  <p className="t-small mt-1 text-fg-2">
                    Bring the idea. Leave with a scope and a price range.
                  </p>
                </div>
              </Surface>
            </a>
          </Reveal>
          <Reveal delay={120}>
            <a href={site.whatsapp} target="_blank" rel="noreferrer noopener" className="block">
              <Surface specular interactive className="flex items-start gap-4 p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-muted text-orange">
                  <MessageCircle className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="t-h4">WhatsApp</h2>
                  <p className="t-small mt-1 text-fg-2">
                    {site.phone}. Fastest for quick questions and quotes.
                  </p>
                </div>
              </Surface>
            </a>
          </Reveal>
          <Reveal delay={180}>
            <a href={`mailto:${site.email}`} className="block">
              <Surface specular interactive className="flex items-start gap-4 p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-muted text-cyan">
                  <Mail className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="t-h4">Email</h2>
                  <p className="t-small mt-1 text-fg-2">{site.email}</p>
                </div>
              </Surface>
            </a>
          </Reveal>
          <Reveal delay={240}>
            <Concierge suggestions={home.ai.chatSuggestions} placeholder="Or ask the concierge first" />
          </Reveal>
        </div>
      </div>
    </>
  );
}

/** Reads ?topic= so service pages can pre-select the subject. Wrapped in Suspense for cache components. */
async function TopicForm({ searchParams }: { searchParams: PageProps<"/contact">["searchParams"] }) {
  const sp = await searchParams;
  const topic = typeof sp.topic === "string" ? sp.topic : undefined;
  return <LeadForm defaultTopic={topic} />;
}
