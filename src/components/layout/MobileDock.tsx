import { CalendarClock, MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import { site } from "@/content/site";

/** Bottom glass dock on phones: the three ways to start, always one thumb away. */
export function MobileDock() {
  return (
    <div
      className="fixed inset-x-3 bottom-3 z-40 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="glass grid grid-cols-3 p-1.5 [border-radius:var(--r-xl)]">
        <Link
          href="/contact"
          aria-label="Start a project"
          className="flex flex-col items-center gap-1 rounded-2xl py-2 text-[0.72rem] text-fg-2 transition-colors active:bg-muted"
        >
          <Send className="size-5 text-cyan" />
          Start
        </Link>
        <a
          href={site.bookingUrl}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-1 rounded-2xl py-2 text-[0.72rem] text-fg-2 transition-colors active:bg-muted"
        >
          <CalendarClock className="size-5 text-violet" />
          Book a call
        </a>
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-1 rounded-2xl py-2 text-[0.72rem] text-fg-2 transition-colors active:bg-muted"
        >
          <MessageCircle className="size-5 text-orange" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
