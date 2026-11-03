import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

// VengeanceUI Interactive Hover Button (@vengeanceui/interactive-hover-button):
// spans instead of divs (valid inside <button>), polymorphic, and the duplicate
// hover label is hidden from screen readers.
export type InteractiveHoverButtonProps = ComponentPropsWithoutRef<"button"> & {
  as?: ElementType;
  href?: string;
  target?: string;
  rel?: string;
  icon?: ReactNode;
};

export function InteractiveHoverButton({
  as: Comp = "button",
  children,
  className,
  icon,
  ...props
}: InteractiveHoverButtonProps) {
  return (
    <Comp
      className={cn(
        "group bg-background text-foreground relative inline-flex w-auto cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border-strong p-2 px-6 text-center font-semibold whitespace-nowrap select-none",
        className,
      )}
      {...props}
    >
      <span className="flex items-center gap-2">
        <span className="bg-primary h-2 w-2 rounded-full transition-all duration-[var(--vng-transition-speed-slow,300ms)] group-hover:scale-[100.8]" />
        <span className="inline-block transition-all duration-[var(--vng-transition-speed-slow,300ms)] group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="text-primary-foreground absolute inset-0 z-10 flex translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-[var(--vng-transition-speed-slow,300ms)] group-hover:translate-x-0 group-hover:opacity-100"
      >
        <span>{children}</span>
        {icon ?? <ArrowRight className="size-4" />}
      </span>
    </Comp>
  );
}
