import { LazyConcierge } from "@/components/ai/LazyConcierge";
import { AgentBentoGrid } from "@/components/ui/agent-bento-grid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { home } from "@/content/home";

/**
 * Chapter 3: a live concierge beside the heading so the visitor can try the
 * thing we sell, then a bento of what our agents do (pipeline, models, run log,
 * retrieval, scoped tools).
 */
export function AiChapter() {
  return (
    <section
      id="ai"
      data-chapter="ai"
      data-chapter-label="AI, integrated"
      data-tour-speed="60"
      className="relative py-24 lg:py-32"
    >
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <div>
            <SectionHeading eyebrow={home.ai.eyebrow} headline={home.ai.headline} body={home.ai.body} />
            <ul className="mt-8 flex flex-wrap gap-2">
              {home.ai.proof.map((p) => (
                <li key={p.label} className="chip">
                  <span className="font-medium text-fg">{p.label}</span>
                  <span className="text-fg-3">{p.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <LazyConcierge
            compact
            suggestions={home.ai.chatSuggestions}
            placeholder={home.ai.chatPrompt}
            className="lg:sticky lg:top-24"
          />
        </div>

        <AgentBentoGrid className="mt-12 lg:mt-16" />
      </div>
    </section>
  );
}
