import { Resend } from "resend";
import { site } from "@/content/site";

export interface LeadInput {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  topic?: string;
  budget?: string;
  message: string;
  source: "contact-form" | "concierge" | "ai-readiness" | "audit";
  page?: string;
}

/**
 * A lead goes two places: an email to the team (Resend) and an n8n webhook that
 * fans out to the CRM, Slack and WhatsApp. Either can be unset; the function
 * returns true when at least one delivery succeeded, and logs when none is configured.
 */
export async function sendLead(lead: LeadInput): Promise<boolean> {
  const results: boolean[] = [];

  if (process.env.RESEND_API_KEY && process.env.LEAD_TO_EMAIL) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.LEAD_FROM_EMAIL ?? `RevixPlus <leads@revixplus.com>`;
      await resend.emails.send({
        from,
        to: process.env.LEAD_TO_EMAIL.split(",").map((s) => s.trim()),
        replyTo: lead.email,
        subject: `New lead (${lead.source}): ${lead.name}${lead.topic ? ` · ${lead.topic}` : ""}`,
        text: [
          `Name: ${lead.name}`,
          `Email: ${lead.email}`,
          lead.company ? `Company: ${lead.company}` : null,
          lead.phone ? `Phone: ${lead.phone}` : null,
          lead.topic ? `Topic: ${lead.topic}` : null,
          lead.budget ? `Budget: ${lead.budget}` : null,
          lead.page ? `Page: ${lead.page}` : null,
          "",
          lead.message,
        ]
          .filter(Boolean)
          .join("\n"),
      });
      results.push(true);
    } catch (err) {
      console.error("[lead] resend failed", err);
      results.push(false);
    }
  }

  if (process.env.N8N_WEBHOOK_URL) {
    try {
      const res = await fetch(process.env.N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...lead, site: site.url }),
      });
      results.push(res.ok);
    } catch (err) {
      console.error("[lead] n8n webhook failed", err);
      results.push(false);
    }
  }

  if (!results.length) {
    console.info("[lead] no delivery configured; lead logged", {
      ...lead,
      message: lead.message.slice(0, 120),
    });
    return true;
  }
  return results.some(Boolean);
}
