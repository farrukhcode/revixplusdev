"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/** Flips `.dark` on <html> and remembers the choice. The icon swaps via the dark: variant, so no state. */
export function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const dark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* storage can be unavailable; the switch still works for this visit */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      className={cn(
        "grid size-9 place-items-center rounded-full text-fg-2 transition-colors hover:bg-muted hover:text-fg active:scale-95",
        className,
      )}
    >
      <Sun className="hidden size-[1.125rem] dark:block" aria-hidden="true" />
      <Moon className="size-[1.125rem] dark:hidden" aria-hidden="true" />
    </button>
  );
}
