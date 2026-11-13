'use client';

import * as React from 'react';
import { TRPCClientError } from '@trpc/client';
import { ArrowUpRight, Loader2, Mail, Phone } from 'lucide-react';

import { Field } from '@/components/form-fields';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { partnerSchema } from '@/lib/inquiry-schema';
import { site } from '@/lib/site';
import { trpc } from '@/trpc/client';
import type { AppRouter } from '@/server/trpc/router';

type FormValues = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  website: string;
};

const empty: FormValues = {
  name: '',
  email: '',
  company: '',
  phone: '',
  message: '',
  website: '',
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'sent' }
  | { kind: 'error'; reason: 'unavailable' | 'rate-limited' | 'failed' };

export function PartnerForm() {
  const [values, setValues] = React.useState<FormValues>(empty);
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [status, setStatus] = React.useState<Status>({ kind: 'idle' });
  const statusRef = React.useRef<HTMLDivElement>(null);

  function update(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function focusFirstError(next: FieldErrors) {
    const order: (keyof FormValues)[] = ['name', 'email', 'company', 'phone', 'message'];
    const first = order.find((field) => next[field]);
    if (first) document.getElementById(first)?.focus();
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === 'submitting') return;

    const parsed = partnerSchema.safeParse({
      path: 'partner',
      name: values.name,
      email: values.email,
      company: values.company,
      phone: values.phone,
      message: values.message,
      website: values.website,
      photos: [],
    });

    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors | undefined;
        if (key && key !== 'website' && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus({ kind: 'idle' });
      focusFirstError(next);
      return;
    }

    setErrors({});
    setStatus({ kind: 'submitting' });

    try {
      await trpc.contact.submit.mutate(parsed.data);
      setStatus({ kind: 'sent' });
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch (error) {
      const code =
        error instanceof TRPCClientError
          ? (error as TRPCClientError<AppRouter>).data?.code
          : undefined;
      const reason =
        code === 'SERVICE_UNAVAILABLE'
          ? 'unavailable'
          : code === 'TOO_MANY_REQUESTS'
            ? 'rate-limited'
            : 'failed';
      setStatus({ kind: 'error', reason });
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  if (status.kind === 'sent') {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="border border-border bg-background p-8 outline-none md:p-10"
      >
        <p className="eyebrow text-accent-ink">Request received</p>
        <p className="font-display t-md mt-4">Thanks. We have your note.</p>
        <p className="measure mt-4 leading-relaxed text-muted-foreground">
          Your request has been sent. We will follow up using the contact details you provided.
        </p>
      </div>
    );
  }

  const submitting = status.kind === 'submitting';
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent('Partner referral')}&body=${encodeURIComponent(
    [values.message, '', `Name: ${values.name}`, `Company: ${values.company}`, `Phone: ${values.phone}`].join('\n'),
  )}`;

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            value={values.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'name-error' : undefined}
            onChange={(event) => update('name', event.target.value)}
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
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'email-error' : undefined}
            onChange={(event) => update('email', event.target.value)}
          />
        </Field>
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="company" label="Company or brokerage" error={errors.company}>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            required
            value={values.company}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? 'company-error' : undefined}
            onChange={(event) => update('company', event.target.value)}
          />
        </Field>
        <Field id="phone" label="Phone" error={errors.phone}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            value={values.phone}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            onChange={(event) => update('phone', event.target.value)}
          />
        </Field>
      </div>
      <Field id="message" label="Message" error={errors.message}>
        <Textarea
          id="message"
          name="message"
          required
          value={values.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'message-error' : undefined}
          onChange={(event) => update('message', event.target.value)}
        />
      </Field>
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="partner-website">Leave this field empty</label>
        <input
          id="partner-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update('website', event.target.value)}
        />
      </div>
      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
        {status.kind === 'error' && (
          <div role="alert" className="border border-accent-ink p-6">
            <p className="font-display text-2xl">
              {status.reason === 'unavailable' && 'Online requests are not available yet.'}
              {status.reason === 'rate-limited' && 'Too many attempts.'}
              {status.reason === 'failed' && 'We could not send your request.'}
            </p>
            <p className="mt-3 max-w-[52ch] leading-relaxed text-muted-foreground">
              Nothing was sent. Your details are still in the form. Please call or email us and we
              will help you directly.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              <a
                href={site.phone.href}
                className="inline-flex items-center gap-2 underline underline-offset-[0.5em] hover:text-accent-ink"
              >
                <Phone className="size-4" aria-hidden />
                {site.phone.display}
              </a>
              <a
                href={mailto}
                className="inline-flex items-center gap-2 underline underline-offset-[0.5em] hover:text-accent-ink"
              >
                <Mail className="size-4" aria-hidden />
                Email us this message
              </a>
            </div>
          </div>
        )}
      </div>
      <div>
        <Button type="submit" variant="accent" size="lg" disabled={submitting}>
          {submitting ? (
            <>
              Sending
              <Loader2 className="animate-spin" aria-hidden />
            </>
          ) : (
            <>
              Become a partner
              <ArrowUpRight className="arrow" aria-hidden />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
