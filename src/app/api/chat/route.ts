import { anthropic } from "@ai-sdk/anthropic";
import { convertToModelMessages, stepCountIs, streamText, tool, type UIMessage } from "ai";
import { z } from "zod";
import { site } from "@/content/site";
import { retrieve } from "@/lib/ai/corpus";
import { sendLead } from "@/lib/lead";

export const maxDuration = 60;

const MODEL = process.env.AI_MODEL ?? "claude-sonnet-5-5";

const SYSTEM = `You are the RevixPlus concierge, a friendly senior consultant for a software, AI and growth agency based in ${site.location.city}, ${site.location.country}, serving the US, UK, EU, UAE and Pakistan.

Rules:
- Answer only from the CONTEXT documents provided for each turn plus the agency facts above. If something is not covered, say so and offer a call.
- Be concrete and short. Two to five sentences, or a short list. Quote "from $X" prices and timelines when the context has them.
- Never invent client results, discounts, or guarantees. Never claim HIPAA certification; say "HIPAA-compliant architecture".
- When the visitor shows intent (asks for a quote, timeline, or how to start), ask for their email and a one-line brief, then call send_brief. Ask once; do not nag.
- Suggest booking a call (${site.bookingUrl}) or WhatsApp (${site.whatsapp}) when a human is the better next step.
- Link relevant pages by path, like /services/ai-integration, so the UI can render them.
- Do not use em dashes.`;

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "The concierge is not configured yet. Set ANTHROPIC_API_KEY." },
      { status: 503 },
    );
  }

  const { messages } = (await req.json()) as { messages: UIMessage[] };
  const last = messages.at(-1);
  const lastText =
    last?.parts
      ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join(" ") ?? "";

  const docs = retrieve(lastText, 6);
  const context = docs.map((d) => `### ${d.title} (${d.url})\n${d.text}`).join("\n\n");

  const result = streamText({
    model: anthropic(MODEL),
    system: `${SYSTEM}\n\nCONTEXT:\n${context}`,
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(4),
    maxOutputTokens: 700,
    tools: {
      send_brief: tool({
        description: "Send the visitor's email and brief to the RevixPlus team so a human follows up.",
        inputSchema: z.object({
          email: z.string().email(),
          name: z.string().optional(),
          brief: z.string().min(10),
          service: z.string().optional(),
        }),
        execute: async (input) => {
          const ok = await sendLead({
            name: input.name ?? "Concierge visitor",
            email: input.email,
            message: input.brief,
            topic: input.service ?? "concierge",
            source: "concierge",
          });
          return {
            sent: ok,
            next: ok
              ? "Tell the visitor the team will reply within one business day."
              : "Apologize and offer WhatsApp.",
          };
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
