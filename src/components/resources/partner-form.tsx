'use client';

import * as React from 'react';
import { ArrowUpRight } from 'lucide-react';

import { Field } from '@/components/form-fields';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { referralTiers } from '@/lib/referral-tiers';

type FormValues = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  volume: string;
};

const empty: FormValues = {
  name: '',
  email: '',
  company: '',
  phone: '',
  message: '',
  volume: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function PartnerForm() {
  const [values, setValues] = React.useState<FormValues>(empty);
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitted, setSubmitted] = React.useState(false);

  function update(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate(next: FormValues) {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!next.name.trim()) nextErrors.name = 'Enter your name.';
    if (!next.email.trim()) nextErrors.email = 'Enter your email.';
    else if (!emailPattern.test(next.email.trim())) nextErrors.email = 'Enter a valid email.';
    if (!next.company.trim()) nextErrors.company = 'Enter your company or brokerage.';
    if (!next.phone.trim()) nextErrors.phone = 'Enter a phone number.';
    if (!next.message.trim()) nextErrors.message = 'Tell us about the work you refer.';
    return nextErrors;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(first)?.focus();
      return;
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company.trim(),
      phone: values.phone.trim(),
      message: values.message.trim(),
      volume: values.volume || undefined,
    };
    console.log('[partner-referral]', payload);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div role="status" className="border border-border bg-surface p-8 md:p-10">
        <p className="eyebrow text-accent-ink">Request received</p>
        <p className="font-display t-md mt-4">Thanks. We have your note.</p>
        <p className="measure mt-4 leading-relaxed text-muted-foreground">
          This preview stores the request in the browser console until the form is connected.
          Call the office if you need an answer today.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-8"
          onClick={() => {
            setValues(empty);
            setSubmitted(false);
          }}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
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
            value={values.phone}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            onChange={(event) => update('phone', event.target.value)}
          />
        </Field>
      </div>
      <Field
        id="volume"
        label="Estimated annual volume"
        optional
        hint="Optional. Used only to point you at the matching tier."
      >
        <select
          id="volume"
          name="volume"
          value={values.volume}
          onChange={(event) => update('volume', event.target.value)}
          className="h-12 w-full border-0 border-b border-input bg-transparent text-base outline-none focus-visible:border-accent-ink"
        >
          <option value="">Select a range</option>
          {referralTiers.map((tier) => (
            <option key={tier.revenue} value={tier.revenue}>
              {tier.revenue}
            </option>
          ))}
        </select>
      </Field>
      <Field id="message" label="Message" error={errors.message}>
        <Textarea
          id="message"
          name="message"
          value={values.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'message-error' : undefined}
          onChange={(event) => update('message', event.target.value)}
        />
      </Field>
      <div>
        <Button type="submit" variant="accent" size="lg">
          Become a partner
          <ArrowUpRight className="arrow" aria-hidden />
        </Button>
      </div>
    </form>
  );
}
