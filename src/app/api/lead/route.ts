import { sendLead } from "@/lib/lead";
import { leadSchema } from "@/lib/leadSchema";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "Please check the form fields." }, { status: 422 });
  }
  const { website: _honeypot, ...lead } = parsed.data;
  const ok = await sendLead({ ...lead, source: "contact-form" });
  return Response.json({ ok }, { status: ok ? 200 : 502 });
}
