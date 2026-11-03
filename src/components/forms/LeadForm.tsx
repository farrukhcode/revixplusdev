"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Surface } from "@/components/ui/Surface";
import { services } from "@/content/services";
import { type LeadFormValues, leadSchema } from "@/lib/leadSchema";
import { cn } from "@/lib/utils";

const budgets = ["Under $2k", "$2k to $5k", "$5k to $15k", "$15k to $50k", "$50k+", "Monthly retainer"];

const field =
  "w-full rounded-2xl border border-border bg-muted px-4 py-3 text-[0.95rem] text-fg placeholder:text-fg-3 " +
  "transition-[border-color,box-shadow] duration-200 focus:border-cyan/60 focus:outline-none focus:ring-2 focus:ring-cyan/30";

export function LeadForm({ defaultTopic }: { defaultTopic?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      topic: defaultTopic ?? "",
      page: typeof window !== "undefined" ? window.location.pathname : "/contact",
    },
  });

  const onSubmit = async (values: LeadFormValues) => {
    setState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <Surface muted className="enter p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-cyan" aria-hidden="true" />
        <h3 className="t-h3 mt-4">Got it. We reply within one business day.</h3>
        <p className="t-body mt-2 text-fg-2">If it is urgent, WhatsApp is the fastest way to reach us.</p>
      </Surface>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input className={field} placeholder="Your name" autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            className={field}
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            {...register("email")}
          />
        </Field>
        <Field label="Company (optional)">
          <input
            className={field}
            placeholder="Company or project"
            autoComplete="organization"
            {...register("company")}
          />
        </Field>
        <Field label="Phone or WhatsApp (optional)">
          <input
            className={field}
            type="tel"
            placeholder="+1 ..."
            autoComplete="tel"
            {...register("phone")}
          />
        </Field>
        <Field label="What do you need?">
          <select className={cn(field, "appearance-none")} {...register("topic")}>
            <option value="">Choose a service (optional)</option>
            <option value="ai-readiness">Free AI-readiness call</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.shortTitle}
              </option>
            ))}
            <option value="other">Something else</option>
          </select>
        </Field>
        <Field label="Budget">
          <select className={cn(field, "appearance-none")} {...register("budget")}>
            <option value="">Pick a range (optional)</option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Tell us about it" error={errors.message?.message}>
        <textarea
          className={cn(field, "min-h-[140px] resize-y")}
          placeholder="What are you building, or what is slowing you down? Links welcome."
          {...register("message")}
        />
      </Field>
      {/* Honeypot, hidden from people */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("website")}
      />
      <input type="hidden" {...register("page")} />

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={state === "sending"}
          icon={<ArrowUpRight className="size-4" />}
        >
          {state === "sending" ? "Sending..." : "Send"}
        </Button>
        <p className="t-small text-fg-3">No newsletter, no spam. NDA on request.</p>
      </div>
      {state === "error" ? (
        <p className="t-small text-pink" role="alert">
          Something went wrong on our side. Email hello@revixplus.com or WhatsApp us and we will pick it up.
        </p>
      ) : null}
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: the control is passed as children and wrapped by this label
    <label className="grid gap-1.5">
      <span className="t-small font-medium text-fg-2">{label}</span>
      {children}
      {error ? (
        <span className="t-small text-pink" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
