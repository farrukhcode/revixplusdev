"use client";

import {
  Bot,
  Brain,
  Check,
  Clock,
  Contact,
  Database,
  FileText,
  Hash,
  LoaderCircle,
  type LucideIcon,
  Mail,
  MessageCircle,
  NotebookText,
  Sparkles,
  UserCheck,
  Wrench,
} from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { type ComponentType, type CSSProperties, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Surface } from "@/components/ui/Surface";
import { cn } from "@/lib/utils";

// VengeanceUI Agent Bento Grid (@vengeanceui/agent-bento-grid), rewritten around
// our agent stack: Claude and OpenAI models, RAG over the client's data, MCP
// tools with least privilege, n8n workflows and human approval. Theme tokens
// instead of palette colors, motion/react instead of framer-motion, lucide
// instead of phosphor, Surface cards with Reveal. The demo metrics (tokens,
// cost, call counts, latencies) are gone: every state shown is illustrative.
// Loops only run while the grid is on screen and never under reduced motion.

type Tone = "violet" | "cyan" | "blue" | "lime" | "pink" | "orange";
/** Sets --c to a brand token so one set of classes colors every accent. */
const tone = (t: Tone) => ({ "--c": `var(--${t})` }) as CSSProperties;

// Raised accent tile: solid fill, darker rim, soft top highlight. Text on an accent fill is text-background.
const TILE =
  "border border-[color-mix(in_oklab,var(--c)_75%,var(--foreground))] dark:border-[color-mix(in_oklab,var(--c)_75%,var(--background))] bg-[var(--c)] text-background [box-shadow:inset_0_1px_0_color-mix(in_oklab,var(--primary-foreground)_40%,transparent),var(--shadow-card)]";
const PILL = "bg-[color-mix(in_oklab,var(--c)_15%,transparent)] text-[var(--c)]";
const LABEL = "font-mono text-[9px] uppercase tracking-widest text-fg-3";
// Diagonal hatch in currentColor (set text-border on the element).
const HATCH: CSSProperties = {
  backgroundImage: "repeating-linear-gradient(45deg, transparent 0 6px, currentColor 6px 7px)",
};

/** Cycles 0..count-1 every `ms` while `live`. One state update per step, never per frame. */
function useStep(count: number, ms: number, live: boolean) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setStep((s) => (s + 1) % count), ms);
    return () => clearInterval(id);
  }, [count, ms, live]);
  return step;
}

/* Pipeline: request, router, agent, then docs and tools, then the reply. */

type Step = "request" | "router" | "agent" | "docs" | "tools" | "response";
const STEPS: Step[] = ["request", "router", "agent", "docs", "tools", "response"];
const LIT: Record<Step, string[]> = {
  request: ["request"],
  router: ["router"],
  agent: ["agent"],
  docs: ["agent", "docs"],
  tools: ["agent", "tools"],
  response: ["agent", "router", "request"],
};
const NODES: { id: string; x: number; y: number; icon: LucideIcon; label: string; tone: Tone }[] = [
  { id: "request", x: 50, y: 120, icon: MessageCircle, label: "REQUEST", tone: "cyan" },
  { id: "agent", x: 200, y: 120, icon: Brain, label: "AGENT", tone: "violet" },
  { id: "docs", x: 280, y: 50, icon: FileText, label: "DOCS", tone: "pink" },
  { id: "tools", x: 280, y: 190, icon: Wrench, label: "TOOLS", tone: "lime" },
];
const WIRES: { d: string; steps: Step[]; tone: Tone }[] = [
  { d: "M 78 120 L 113 120", steps: ["request"], tone: "cyan" },
  { d: "M 137 120 L 172 120", steps: ["agent"], tone: "violet" },
  { d: "M 200 92 L 200 50 L 252 50", steps: ["docs"], tone: "pink" },
  { d: "M 200 148 L 200 190 L 252 190", steps: ["tools"], tone: "lime" },
  { d: "M 172 120 L 137 120", steps: ["response"], tone: "cyan" },
  { d: "M 113 120 L 78 120", steps: ["response"], tone: "cyan" },
];

function Pipeline({ live }: { live: boolean }) {
  const step = STEPS[useStep(STEPS.length, 2000, live)];
  const lit = LIT[step];
  const routerOn = lit.includes("router");

  return (
    <div className="absolute inset-0 select-none">
      <svg className="absolute inset-0 h-full w-full text-border" aria-hidden="true">
        <defs>
          <pattern id="abg-dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.75" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#abg-dots)" />
      </svg>
      <svg className="absolute inset-0 h-full w-full p-2" viewBox="12 16 306 208" aria-hidden="true">
        {WIRES.slice(0, 4).map((w) => (
          <path key={w.d} d={w.d} fill="none" className="stroke-border-strong" strokeWidth={1} />
        ))}
        {WIRES.filter((w) => w.steps.includes(step)).map((w) => (
          <g key={`${step}-${w.d}`} style={tone(w.tone)} className="stroke-[var(--c)]">
            {[3.5, 1.5].map((width) => (
              <motion.path
                key={width}
                d={w.d}
                fill="none"
                strokeWidth={width}
                strokeOpacity={width > 2 ? 0.2 : 1}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            ))}
          </g>
        ))}

        {/* Router */}
        <g style={tone("orange")}>
          <circle
            cx={125}
            cy={120}
            r={10}
            strokeWidth={2}
            className={cn(
              "transition-colors duration-300",
              routerOn
                ? "fill-[color-mix(in_oklab,var(--c)_20%,var(--background))] stroke-[var(--c)]"
                : "fill-card stroke-border-strong",
            )}
          />
          <circle
            cx={125}
            cy={120}
            r={5}
            fill="none"
            strokeDasharray="2 2"
            className={cn(
              "origin-center [transform-box:fill-box]",
              routerOn ? "stroke-[var(--c)]" : "stroke-fg-3",
              live && "animate-spin [animation-duration:4s]",
            )}
          />
        </g>

        {NODES.map((n) => {
          const on = lit.includes(n.id);
          return (
            <foreignObject key={n.id} x={n.x - 28} y={n.y - 28} width={56} height={56} style={tone(n.tone)}>
              <div
                className={cn(
                  "flex h-full w-full flex-col items-center justify-center gap-0.5 rounded-[14px] border transition-[background-color,color,border-color,box-shadow] duration-300",
                  on ? TILE : "border-border bg-card text-[var(--c)]",
                )}
              >
                <n.icon className="size-5" />
                <span className={cn("font-mono text-[8.5px] font-bold tracking-wider", !on && "text-fg-3")}>
                  {n.label}
                </span>
              </div>
            </foreignObject>
          );
        })}
      </svg>
    </div>
  );
}

/* Models: Claude and OpenAI, plus the provider paths we deploy through. */

const MODELS: { vendor: string; model: string; icon: LucideIcon; tone: Tone }[] = [
  { vendor: "Anthropic", model: "Claude", icon: Sparkles, tone: "violet" },
  { vendor: "OpenAI", model: "GPT", icon: Bot, tone: "cyan" },
];
const PROVIDERS = ["Anthropic API", "OpenAI API", "Azure OpenAI", "AWS Bedrock", "Self-hosted"];

function Models({ live }: { live: boolean }) {
  const active = useStep(MODELS.length, 3000, live);
  return (
    <div className="flex h-full flex-col justify-between gap-2 p-3">
      <div className="flex gap-3 pt-2 pr-2">
        {MODELS.map((m, i) => (
          <div key={m.model} className="relative h-[60px] flex-1" style={tone(m.tone)}>
            <div className="absolute inset-0 rounded-[12px] border border-border text-border" style={HATCH} />
            <motion.div
              className="absolute inset-0 flex items-center justify-between gap-2 rounded-[12px] border border-border bg-card p-3"
              animate={{ x: i === active ? 8 : 0, y: i === active ? -8 : 0 }}
              whileHover={{ x: 8, y: -8 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
            >
              <div className="min-w-0">
                <p className={LABEL}>{m.vendor}</p>
                <p className="mt-1.5 font-semibold text-base text-fg leading-none tracking-tight">
                  {m.model}
                </p>
              </div>
              <span className={cn("grid size-8 shrink-0 place-items-center rounded-[8px]", TILE)}>
                <m.icon className="size-4" />
              </span>
            </motion.div>
          </div>
        ))}
      </div>
      <div className="rounded-[12px] border border-border bg-card/60 p-2.5">
        <p className={LABEL}>Provider path</p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {PROVIDERS.map((p) => (
            <li
              key={p}
              className="rounded-[6px] border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-fg-2"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* Activity: one workflow, step by step, ending at a human approval. */

const STATUS = {
  done: { icon: Check, tone: "lime" },
  running: { icon: LoaderCircle, tone: "blue" },
  waiting: { icon: Clock, tone: "orange" },
} as const satisfies Record<string, { icon: LucideIcon; tone: Tone }>;
const LOG: { step: string; action: string; status: keyof typeof STATUS }[] = [
  { step: "Trigger", action: "n8n picked up a new support email", status: "done" },
  { step: "Lookup", action: "Found the customer in the CRM", status: "done" },
  { step: "Retrieve", action: "Matched the refund policy, source attached", status: "done" },
  { step: "Draft", action: "Claude is writing the reply", status: "running" },
  { step: "Approve", action: "Waiting for a person to send it", status: "waiting" },
];
// Fixed y per slot: a tight stack, not linear steps.
const SLOT_Y: Record<number, number> = { [-2]: -68, [-1]: -38, 0: 0, 1: 38, 2: 68 };

function Activity({ live }: { live: boolean }) {
  const active = useStep(LOG.length, 2400, live);
  const half = Math.floor(LOG.length / 2);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {LOG.map((l, i) => {
        // Signed slot: 0 is the front, negative upcoming, positive past.
        let slot = i - active;
        if (slot > half) slot -= LOG.length;
        if (slot < -half) slot += LOG.length;
        const abs = Math.abs(slot);
        const front = slot === 0;
        const s = STATUS[l.status];

        return (
          <motion.div
            key={l.step}
            className="absolute inset-x-0 mx-auto px-2"
            style={{ zIndex: 30 - abs * 10 }}
            initial={false}
            animate={{
              y: SLOT_Y[slot] ?? (slot < 0 ? -150 : 150),
              scale: front ? 1 : abs === 1 ? 0.93 : 0.87,
              opacity: front ? 1 : abs === 1 ? 0.65 : 0.38,
            }}
            transition={{
              y: { type: "spring", stiffness: 500, damping: 35 },
              scale: { type: "spring", stiffness: 500, damping: 35 },
              opacity: { duration: 0.25, ease: "easeOut" },
            }}
          >
            <div
              style={tone(s.tone)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-2xl border",
                front ? "border-border-strong bg-card px-3 py-2.5" : "border-border bg-muted px-2.5 py-1.5",
              )}
            >
              <span
                className={cn(
                  "grid shrink-0 place-items-center rounded-[8px] transition-all duration-300",
                  TILE,
                  front ? "size-8" : "size-5",
                )}
              >
                <s.icon
                  className={cn(
                    front ? "size-4" : "size-2.5",
                    l.status === "running" && live && "animate-spin",
                  )}
                  strokeWidth={2.5}
                />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "font-mono font-semibold text-fg leading-none",
                      front ? "text-[11px]" : "text-[9px]",
                    )}
                  >
                    {l.step}
                  </span>
                  <span
                    className={cn(
                      "rounded px-1 py-0.5 font-mono uppercase tracking-wide",
                      PILL,
                      front ? "text-[8px]" : "text-[7px]",
                    )}
                  >
                    {l.status}
                  </span>
                </div>
                {front && <p className="mt-1 truncate text-[10.5px] text-fg-2 leading-tight">{l.action}</p>}
              </div>
            </div>
          </motion.div>
        );
      })}

      <div className="absolute inset-x-0 bottom-1.5 flex justify-center gap-1">
        {LOG.map((l, i) => (
          <motion.span
            key={l.step}
            className="h-[3px] rounded-full bg-fg"
            initial={false}
            animate={{ width: i === active ? 14 : 4, opacity: i === active ? 0.6 : 0.2 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
    </div>
  );
}

/* Knowledge: the sources an assistant retrieves from, and what it asked them. */

type SourceId = "docs" | "notion" | "crm" | "email" | "slack" | "db";
const SOURCES: Record<SourceId, { label: string; icon: LucideIcon; tone: Tone }> = {
  docs: { label: "Docs", icon: FileText, tone: "violet" },
  notion: { label: "Notion", icon: NotebookText, tone: "blue" },
  crm: { label: "CRM", icon: Contact, tone: "cyan" },
  email: { label: "Email", icon: Mail, tone: "orange" },
  slack: { label: "Slack", icon: Hash, tone: "pink" },
  db: { label: "Database", icon: Database, tone: "lime" },
};
const QUERIES: { src: SourceId; q: string }[] = [
  { src: "docs", q: "refund policy for annual plans" },
  { src: "crm", q: "open deals with no reply" },
  { src: "notion", q: "new hire onboarding checklist" },
  { src: "slack", q: "#support thread on invoices" },
  { src: "email", q: "last message from this customer" },
  { src: "db", q: "orders shipped this week" },
];

function Knowledge({ live }: { live: boolean }) {
  const tick = useStep(QUERIES.length, 2000, live);
  const activeSrc = QUERIES[tick].src;
  const recent = [0, 1, 2, 3].map((o) => QUERIES[(tick - o + QUERIES.length) % QUERIES.length]);

  return (
    <div className="flex h-full gap-4 p-3">
      <div className="flex min-w-0 flex-1 flex-col">
        <p className={cn(LABEL, "mb-2.5")}>Sources</p>
        <ul className="grid flex-1 auto-rows-fr grid-cols-2 gap-2 lg:grid-cols-3">
          {(Object.keys(SOURCES) as SourceId[]).map((id) => {
            const s = SOURCES[id];
            const on = id === activeSrc;
            return (
              <li
                key={id}
                style={tone(s.tone)}
                className={cn(
                  "flex min-w-0 items-center gap-2 rounded-[12px] border bg-card px-2 transition-colors duration-500",
                  on ? "border-[color-mix(in_oklab,var(--c)_55%,var(--border))]" : "border-border",
                )}
              >
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-[8px] border transition-[background-color,color,border-color,box-shadow] duration-500",
                    on ? TILE : "border-border bg-background text-fg-3",
                  )}
                >
                  <s.icon className="size-4" />
                </span>
                <span
                  className={cn(
                    "truncate font-mono text-[10px] transition-colors duration-300",
                    on ? "font-semibold text-fg" : "text-fg-3",
                  )}
                >
                  {s.label}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="mt-auto flex items-center gap-2 pt-3" style={tone("lime")}>
          <span className="relative grid size-2 place-items-center">
            {live && <span className="absolute inset-0 animate-ping rounded-full bg-[var(--c)] opacity-50" />}
            <span className="size-1.5 rounded-full bg-[var(--c)]" />
          </span>
          <span className="font-mono text-[9px] text-fg-3 tracking-wide">Re-indexed on a schedule</span>
        </div>
      </div>

      <div className="hidden w-px shrink-0 self-stretch bg-border sm:block" />

      <div className="hidden w-[11.5rem] shrink-0 flex-col sm:flex">
        <p className={cn(LABEL, "mb-2.5")}>Retrieval log</p>
        <div className="flex flex-1 flex-col gap-1.5 overflow-hidden">
          {recent.map((q, i) => {
            const s = SOURCES[q.src];
            return (
              <motion.div
                key={`${q.q}-${i}`}
                style={tone(s.tone)}
                className="rounded-[12px] border border-border bg-card px-2.5 py-2"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: [1, 0.8, 0.5, 0.25][i], y: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 35, delay: i * 0.05 }}
              >
                <div className="mb-1 flex items-center gap-1">
                  <span
                    className={cn(
                      "rounded-[6px] px-1.5 py-0.5 font-mono font-semibold text-[7px] uppercase",
                      PILL,
                    )}
                  >
                    {s.label}
                  </span>
                  <span className="ml-auto flex items-center gap-0.5 font-mono text-[7px] text-fg-3 uppercase">
                    <Check className="size-2.5" strokeWidth={3} />
                    cited
                  </span>
                </div>
                <p className="truncate font-mono text-[9px] text-fg-2 leading-tight">{q.q}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* Tools: each MCP tool and the narrowest access it holds. */

const TOOLS: {
  name: string;
  scope: string;
  level: number;
  icon: LucideIcon;
  tone: Tone;
  approval?: boolean;
}[] = [
  { name: "notion_search", scope: "read", level: 1, icon: NotebookText, tone: "blue" },
  { name: "sql_query", scope: "read", level: 1, icon: Database, tone: "lime" },
  { name: "gmail_draft", scope: "draft", level: 2, icon: Mail, tone: "orange" },
  { name: "crm_update", scope: "write", level: 3, icon: Contact, tone: "violet", approval: true },
];

function Tools({ live }: { live: boolean }) {
  const active = useStep(TOOLS.length, 1800, live);
  return (
    <div className="grid h-full grid-cols-2 content-center gap-2 p-3">
      {TOOLS.map((t, i) => (
        <div
          key={t.name}
          style={tone(t.tone)}
          className={cn(
            "flex flex-col justify-between rounded-2xl border bg-card p-2.5 transition-colors duration-300",
            i === active ? "border-[color-mix(in_oklab,var(--c)_55%,var(--border))]" : "border-border",
          )}
        >
          <div className="flex items-start justify-between gap-1">
            <span className={cn("grid size-7 place-items-center rounded-[8px]", TILE)}>
              <t.icon className="size-3.5" />
            </span>
            <span
              className={cn(
                "rounded-[6px] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-widest",
                PILL,
              )}
            >
              {t.scope}
            </span>
          </div>
          <div className="mt-2.5">
            <div className="flex items-center justify-between gap-1">
              <span className="truncate font-medium font-mono text-[10px] text-fg tracking-tight">
                {t.name}
              </span>
              {t.approval && <UserCheck className="size-3 shrink-0 text-fg-3" />}
            </div>
            <div className="mt-1.5 flex gap-1">
              {[1, 2, 3].map((n) => (
                <span
                  key={n}
                  className={cn("h-1.5 flex-1 rounded-full", n <= t.level ? "bg-[var(--c)]" : "bg-muted")}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Grid */

const CARDS: {
  title: string;
  description: string;
  Visual: ComponentType<{ live: boolean }>;
  className?: string;
}[] = [
  {
    title: "From request to reply",
    description: "The agent reads your docs, calls only the tools it is allowed to, then replies.",
    Visual: Pipeline,
  },
  {
    title: "Claude and OpenAI models",
    description: "Picked per task, and run under a BAA or in your own cloud when patient data is involved.",
    Visual: Models,
  },
  {
    title: "Every step on the record",
    description: "n8n runs the workflow and logs each action. A person approves anything irreversible.",
    Visual: Activity,
  },
  {
    title: "Answers from your own data",
    description:
      "RAG over your docs, Notion, CRM, email, Slack and databases, with a source on every answer.",
    Visual: Knowledge,
    className: "md:col-span-2 md:order-last lg:order-none",
  },
  {
    title: "MCP tools, least privilege",
    description: "Each tool gets the narrowest access it needs. Writes wait for human approval.",
    Visual: Tools,
  },
];

export function AgentBentoGrid({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "120px 0px" });
  const reduced = useReducedMotion();
  const live = inView && !reduced;

  return (
    <div
      ref={ref}
      data-agent-bento
      className={cn("grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3", className)}
    >
      {CARDS.map(({ title, description, Visual, className: span }, i) => (
        <Reveal key={title} delay={i * 70} className={cn("h-[19rem]", span)}>
          <Surface className="flex h-full flex-col gap-3 p-4">
            <div>
              <h3 className="font-semibold text-fg text-sm tracking-tight">{title}</h3>
              <p className="mt-1 text-[0.8125rem] text-fg-2 leading-relaxed">{description}</p>
            </div>
            <div
              aria-hidden="true"
              className="relative min-h-0 flex-1 overflow-hidden rounded-[var(--r-md)] border border-border bg-background"
            >
              <Visual live={live} />
            </div>
          </Surface>
        </Reveal>
      ))}
    </div>
  );
}
