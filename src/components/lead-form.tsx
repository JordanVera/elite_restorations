"use client";

import * as React from "react";
import { TRPCClientError } from "@trpc/client";
import { ArrowUpRight, Loader2, Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { inquiryServiceOptions } from "@/lib/inquiry";
import { inquirySchema } from "@/lib/inquiry-schema";
import { site } from "@/lib/site";
import { trpc } from "@/trpc/client";
import type { AppRouter } from "@/server/trpc/router";

type FieldName = "name" | "email" | "phone" | "service" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  | { kind: "error"; reason: "unavailable" | "rate-limited" | "failed" };

type LeadFormProps = {
  defaultService?: string;
  defaultMessage?: string;
};

const groups = ["Interiors", "Floors", "Roof & exterior", "Recovery", "Other"];

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id}>
        {label}
        {optional && <span className="normal-case tracking-normal opacity-70">(optional)</span>}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-accent-ink">
          {error}
        </p>
      )}
    </div>
  );
}

export function LeadForm({ defaultService, defaultMessage }: LeadFormProps) {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    phone: "",
    service: defaultService ?? "",
    message: defaultMessage ?? "",
    website: "",
  });
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [status, setStatus] = React.useState<Status>({ kind: "idle" });
  const statusRef = React.useRef<HTMLDivElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const set = (field: keyof typeof values) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (field in prev ? { ...prev, [field]: undefined } : prev));
  };

  const onText =
    (field: keyof typeof values) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      set(field)(event.target.value);

  const aria = (field: FieldName) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "submitting") return;

    const parsed = inquirySchema.safeParse(values);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as FieldName | undefined;
        if (key && key in values && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus({ kind: "idle" });
      const first = (Object.keys(next) as FieldName[])[0];
      if (first) formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
      return;
    }

    setErrors({});
    setStatus({ kind: "submitting" });

    try {
      await trpc.contact.submit.mutate(parsed.data);
      setStatus({ kind: "sent" });
    } catch (error) {
      const code = error instanceof TRPCClientError ? (error as TRPCClientError<AppRouter>).data?.code : undefined;
      const reason =
        code === "SERVICE_UNAVAILABLE" ? "unavailable" : code === "TOO_MANY_REQUESTS" ? "rate-limited" : "failed";
      setStatus({ kind: "error", reason });
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  const mailto = React.useMemo(() => {
    const service = inquiryServiceOptions.find((o) => o.value === values.service)?.label ?? "General inquiry";
    const body = [
      values.message,
      "",
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Service: ${service}`,
    ].join("\n");
    return `mailto:${site.email}?subject=${encodeURIComponent(`Estimate request: ${service}`)}&body=${encodeURIComponent(body)}`;
  }, [values]);

  if (status.kind === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-border p-8 outline-none">
        <p className="font-display text-4xl">Thank you.</p>
        <p className="mt-4 max-w-[44ch] leading-relaxed text-muted-foreground">
          Your request has been sent. We will follow up using the contact details you provided.
        </p>
      </div>
    );
  }

  const submitting = status.kind === "submitting";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={onText("name")}
            {...aria("name")}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            value={values.email}
            onChange={onText("email")}
            {...aria("email")}
          />
        </Field>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="phone" label="Phone" optional error={errors.phone}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={onText("phone")}
            {...aria("phone")}
          />
        </Field>
        <Field id="service" label="What do you need?" error={errors.service}>
          <Select value={values.service} onValueChange={set("service")}>
            <SelectTrigger id="service" {...aria("service")}>
              <SelectValue placeholder="Choose a service" />
            </SelectTrigger>
            <SelectContent position="popper">
              {groups.map((group) => (
                <SelectGroup key={group}>
                  <SelectLabel>{group}</SelectLabel>
                  {inquiryServiceOptions
                    .filter((o) => o.group === group)
                    .map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field id="message" label="Tell us about it" error={errors.message}>
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          value={values.message}
          onChange={onText("message")}
          {...aria("message")}
        />
      </Field>

      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={onText("website")}
        />
      </div>

      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="outline-none"
      >
        {status.kind === "error" && (
          <div role="alert" className="border border-accent-ink p-6">
            <p className="font-display text-2xl">
              {status.reason === "unavailable" && "Online requests are not available yet."}
              {status.reason === "rate-limited" && "Too many attempts."}
              {status.reason === "failed" && "We could not send your request."}
            </p>
            <p className="mt-3 max-w-[52ch] leading-relaxed text-muted-foreground">
              Nothing was sent. Your details are still in the form. Please call or email us and we will help you
              directly.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              <a href={site.phone.href} className="inline-flex items-center gap-2 underline underline-offset-[0.5em] hover:text-accent-ink">
                <Phone className="size-4" aria-hidden />
                {site.phone.display}
              </a>
              <a href={mailto} className="inline-flex items-center gap-2 underline underline-offset-[0.5em] hover:text-accent-ink">
                <Mail className="size-4" aria-hidden />
                Email us this message
              </a>
            </div>
          </div>
        )}
      </div>

      <Button type="submit" variant="accent" size="xl" disabled={submitting}>
        {submitting ? (
          <>
            Sending
            <Loader2 className="animate-spin" aria-hidden />
          </>
        ) : (
          <>
            Send request
            <ArrowUpRight className="arrow" aria-hidden />
          </>
        )}
      </Button>
    </form>
  );
}
