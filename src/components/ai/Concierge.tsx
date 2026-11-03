"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUp, Sparkles, Square } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import { Surface } from "@/components/ui/Surface";
import { cn } from "@/lib/utils";

interface ConciergeProps {
  placeholder?: string;
  suggestions?: readonly string[];
  className?: string;
  compact?: boolean;
}

/** Turns "/services/x" and "/work/y" paths in model output into links. */
function Linkify({ text }: { text: string }) {
  const parts = text.split(/(\/(?:services|work|industries|pricing|process|about|contact)[a-z0-9\-/]*)/g);
  return (
    <>
      {parts.map((p, i) =>
        /^\/(services|work|industries|pricing|process|about|contact)/.test(p) ? (
          <Link key={`${p}-${i}`} href={p} className="text-cyan underline underline-offset-4">
            {p}
          </Link>
        ) : (
          <span key={`${p.slice(0, 8)}-${i}`}>{p}</span>
        ),
      )}
    </>
  );
}

/**
 * The AI concierge. Streams from /api/chat (Claude via AI SDK) and answers from
 * the site's own content. Works as a small panel on the home page and as a
 * larger panel on the contact page.
 */
export function Concierge({
  placeholder = "Ask anything about working with us",
  suggestions = [],
  className,
  compact,
}: ConciergeProps) {
  const [input, setInput] = useState("");
  const [transport] = useState(() => new DefaultChatTransport({ api: "/api/chat" }));
  const { messages, sendMessage, status, stop, error } = useChat({ transport });
  const listRef = useRef<HTMLDivElement>(null);
  const busy = status === "submitted" || status === "streaming";

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll to the end whenever a message arrives or streaming state changes
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length, status]);

  const submit = (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    sendMessage({ text: t });
    setInput("");
  };

  return (
    <Surface className={cn("flex flex-col overflow-hidden", className)} data-lenis-prevent>
      <BorderBeam size={180} duration={12} />
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="grid size-7 place-items-center rounded-full bg-[linear-gradient(135deg,var(--violet),var(--cyan))] text-background">
          <Sparkles className="size-4" />
        </span>
        <div>
          <p className="t-small font-medium text-fg">RevixPlus concierge</p>
          <p className="text-[0.72rem] text-fg-3">
            Answers from our services, work and pricing. A human follows up.
          </p>
        </div>
      </div>

      <div
        ref={listRef}
        className={cn(
          "flex-1 space-y-3 overflow-y-auto px-4 py-4",
          compact ? "max-h-[300px]" : "max-h-[60vh] min-h-[320px]",
        )}
      >
        {messages.length === 0 ? (
          <div className="space-y-2">
            <p className="t-small text-fg-2">Try one of these:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => submit(s)}
                  className="chip text-left hover:text-fg"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {messages.map((m) => (
          <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "t-small max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 leading-relaxed",
                m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-fg",
              )}
            >
              {m.parts.map((p, i) => {
                if (p.type === "text") return <Linkify key={`${m.id}-${i}`} text={p.text} />;
                if (p.type.startsWith("tool-")) {
                  return (
                    <span key={`${m.id}-${i}`} className="block text-[0.72rem] text-fg-3">
                      Sending your brief to the team...
                    </span>
                  );
                }
                return null;
              })}
            </div>
          </div>
        ))}

        {error ? (
          <p className="t-small text-pink">
            The concierge is unavailable right now. Use the contact form or WhatsApp and a person will reply.
          </p>
        ) : null}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
        className="flex items-center gap-2 border-t border-border p-2"
      >
        <label htmlFor="concierge-input" className="sr-only">
          Message
        </label>
        <input
          id="concierge-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="h-10 flex-1 rounded-full bg-muted px-4 text-[0.9rem] text-fg placeholder:text-fg-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        {busy ? (
          <button
            type="button"
            onClick={() => stop()}
            aria-label="Stop"
            className="grid size-10 place-items-center rounded-full bg-muted text-fg-2 active:scale-95"
          >
            <Square className="size-4" />
          </button>
        ) : (
          <button
            type="submit"
            aria-label="Send"
            disabled={!input.trim()}
            className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground transition-transform active:scale-95 disabled:opacity-40"
          >
            <ArrowUp className="size-4" />
          </button>
        )}
      </form>
    </Surface>
  );
}
