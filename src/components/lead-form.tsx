'use client';

import * as React from 'react';
import Link from 'next/link';
import { TRPCClientError } from '@trpc/client';
import { ArrowUpRight, ChevronDown, Loader2, Mail, Phone } from 'lucide-react';

import { FormConsent } from '@/components/form-consent';
import { ChoiceGroup, Field } from '@/components/form-fields';
import { PhotoPicker, type PickedPhoto } from '@/components/photo-picker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  callbackPromise,
  claimAnswers,
  contactMethods,
  isUrgentService,
  leadServices,
  optionLabel,
  serviceForSlug,
  type ClaimAnswer,
  type ContactMethod,
} from '@/lib/inquiry';
import { leadSchema, type LeadInput } from '@/lib/inquiry-schema';
import { trackLeadConversion } from '@/lib/lead-analytics';
import { readLeadSource } from '@/lib/lead-source';
import { submitTiming } from '@/lib/lead-timing';
import { uploadLeadPhoto } from '@/lib/photos-client';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';
import { trpc } from '@/trpc/client';
import type { AppRouter } from '@/server/trpc/router';

type Values = {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  claim: string;
  carrier: string;
  contactMethod: string;
  company: string;
  message: string;
  website: string;
};

type FieldKey = keyof Values;
type FieldErrors = Partial<Record<FieldKey | 'photos', string>>;

type ErrorReason = 'unavailable' | 'rate-limited' | 'failed' | 'too-fast' | 'expired';

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting'; step: string }
  | {
      kind: 'sent';
      photosTotal: number;
      photosSaved: number;
      service: string;
      claim: string;
    }
  | { kind: 'error'; reason: ErrorReason };

export type LeadPhotoSeed = { blob: Blob; name: string };

type LeadFormProps = {
  intent?: 'estimate' | 'partner';
  idPrefix?: string;
  density?: 'comfortable' | 'compact';
  showPhotos?: boolean;
  submitLabel?: string;
  defaultService?: string;
  defaultMessage?: string;
  defaultName?: string;
  defaultAddress?: string;
  defaultClaim?: string;
  defaultCarrier?: string;
  defaultContact?: string;
  initialPhotos?: LeadPhotoSeed[];
};

const errorCopy: Record<ErrorReason, { title: string; body: string }> = {
  unavailable: {
    title: 'Online requests are not available yet.',
    body: 'Nothing was sent. Your details are still in the form. Call us and we will take it from here.',
  },
  'rate-limited': {
    title: 'Too many attempts.',
    body: 'Please wait a few minutes, or call us and we will take it from here.',
  },
  failed: {
    title: 'We could not send your request.',
    body: 'Nothing was sent. Your details are still in the form. Call us and we will take it from here.',
  },
  'too-fast': {
    title: 'Please take a moment and send it again.',
    body: 'Nothing was sent. Your details are still in the form. You can also call us.',
  },
  expired: {
    title: 'This page has been open a while.',
    body: 'Refresh the page and send it again, or call us. Your details are still in the form.',
  },
};

const selectClass =
  'h-12 w-full appearance-none rounded-none border-0 border-b border-input bg-transparent py-2 pr-8 text-base outline-none transition-colors focus-visible:border-accent-ink disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-accent-ink';

function asClaim(value: string | undefined): ClaimAnswer | '' {
  return value === 'yes' || value === 'no' || value === 'not-sure' ? value : '';
}

function asContact(value: string | undefined): ContactMethod | '' {
  return value === 'phone' || value === 'text' || value === 'email' ? value : '';
}

function described(id: string, invalid: boolean, required?: boolean) {
  return {
    'aria-invalid': invalid ? (true as const) : undefined,
    'aria-describedby': invalid ? `${id}-error` : undefined,
    'aria-required': required ? (true as const) : undefined,
  };
}

function buildCandidate(
  intent: 'estimate' | 'partner',
  values: Values,
  photos: string[],
  startedAt: number,
  trap: string,
): LeadInput {
  const shared = {
    name: values.name,
    email: values.email,
    phone: values.phone,
    message: values.message,
    website: trap,
    photos,
    startedAt,
    ...readLeadSource(),
  };
  if (intent === 'partner') {
    return {
      ...shared,
      path: 'partner',
      company: values.company,
      contactMethod: values.contactMethod,
    } as LeadInput;
  }
  return {
    ...shared,
    path: 'estimate',
    address: values.address,
    service: values.service,
    claim: values.claim,
    carrier: values.claim === 'no' ? '' : values.carrier,
    contactMethod: values.contactMethod,
  } as LeadInput;
}

export function LeadForm({
  intent = 'estimate',
  idPrefix = 'lead',
  density = 'comfortable',
  showPhotos,
  submitLabel,
  defaultService,
  defaultMessage,
  defaultName,
  defaultAddress,
  defaultClaim,
  defaultCarrier,
  defaultContact,
  initialPhotos,
}: LeadFormProps) {
  const photosEnabled = showPhotos ?? intent === 'estimate';
  const partner = intent === 'partner';
  const fid = (name: string) => `${idPrefix}-${name}`;
  const [values, setValues] = React.useState<Values>({
    name: defaultName ?? '',
    email: '',
    phone: '',
    address: defaultAddress ?? '',
    service: serviceForSlug(defaultService),
    claim: asClaim(defaultClaim),
    carrier: defaultCarrier ?? '',
    contactMethod: asContact(defaultContact),
    company: '',
    message: defaultMessage ?? '',
    website: '',
  });
  const [photos, setPhotos] = React.useState<PickedPhoto[]>(() =>
    (initialPhotos ?? []).map((photo) => ({
      id: crypto.randomUUID(),
      blob: photo.blob,
      previewUrl: URL.createObjectURL(photo.blob),
      name: photo.name,
    })),
  );
  const [photosOpen, setPhotosOpen] = React.useState(
    () => (initialPhotos?.length ?? 0) > 0,
  );
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [status, setStatus] = React.useState<Status>({ kind: 'idle' });
  const statusRef = React.useRef<HTMLDivElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const honeypotRef = React.useRef<HTMLInputElement>(null);
  const startedAt = React.useRef(0);
  const uploaded = React.useRef(new Map<string, string>());

  React.useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set = (field: FieldKey) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const onText =
    (field: FieldKey) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      set(field)(event.target.value);

  function focusFirstError(next: FieldErrors) {
    const fields = formRef.current?.querySelectorAll<HTMLElement>('[data-field]') ?? [];
    for (const field of fields) {
      if (next[field.dataset.field as keyof FieldErrors]) {
        field.querySelector<HTMLElement>('input, textarea, select, button')?.focus();
        return;
      }
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === 'submitting') return;

    const trap = (honeypotRef.current?.value || values.website).trim();
    const check = leadSchema.safeParse(
      buildCandidate(intent, values, [], startedAt.current, trap),
    );
    if (!check.success) {
      const next: FieldErrors = {};
      for (const issue of check.error.issues) {
        const key = issue.path[0] as keyof FieldErrors | undefined;
        if (key && key !== 'photos' && key !== 'website' && !next[key]) next[key] = issue.message;
      }
      if (
        intent === 'estimate' &&
        values.contactMethod === 'email' &&
        values.email.trim().length === 0 &&
        !next.email
      ) {
        next.email = 'Enter an email address, or choose phone or text.';
      }
      setErrors(next);
      setStatus({ kind: 'idle' });
      focusFirstError(next);
      return;
    }

    const timing = submitTiming(startedAt.current);
    if (timing !== 'ok') {
      setErrors({});
      setStatus({ kind: 'error', reason: timing === 'expired' ? 'expired' : 'too-fast' });
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }

    setErrors({});

    try {
      if (!trap) {
        for (const [index, photo] of photos.entries()) {
          if (uploaded.current.has(photo.id)) continue;
          setStatus({
            kind: 'submitting',
            step: `Uploading photo ${index + 1} of ${photos.length}`,
          });
          const result = await uploadLeadPhoto(photo.blob);
          if (!result.ok) {
            if (result.reason === 'not-configured') break;
            continue;
          }
          uploaded.current.set(photo.id, result.pathname);
        }
      }

      setStatus({ kind: 'submitting', step: 'Sending' });
      const pathnames = trap
        ? []
        : photos.flatMap((photo) => uploaded.current.get(photo.id) ?? []);
      const parsed = leadSchema.parse(
        buildCandidate(intent, values, pathnames, startedAt.current, trap),
      );
      const response = await trpc.contact.submit.mutate(parsed);
      if (!trap) {
        trackLeadConversion({
          intent,
          service: intent === 'estimate' ? values.service : undefined,
        });
      }
      setStatus({
        kind: 'sent',
        photosTotal: trap ? 0 : photos.length,
        photosSaved: response.photosSaved,
        service: values.service,
        claim: values.claim,
      });
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch (error) {
      const trpcError =
        error instanceof TRPCClientError ? (error as TRPCClientError<AppRouter>) : null;
      const code = trpcError?.data?.code;
      const message = trpcError?.message ?? '';
      const reason: ErrorReason =
        code === 'SERVICE_UNAVAILABLE'
          ? 'unavailable'
          : code === 'TOO_MANY_REQUESTS'
            ? 'rate-limited'
            : code === 'PRECONDITION_FAILED' && message === 'expired'
              ? 'expired'
              : code === 'PRECONDITION_FAILED'
                ? 'too-fast'
                : 'failed';
      setStatus({ kind: 'error', reason });
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  const mailto = React.useMemo(() => {
    const lines = partner
      ? [`Company: ${values.company}`, `Preferred contact: ${optionLabel(contactMethods, values.contactMethod)}`]
      : [
          `Service: ${optionLabel(leadServices, values.service)}`,
          `Insurance claim: ${optionLabel(claimAnswers, values.claim)}`,
          values.carrier ? `Insurance carrier: ${values.carrier}` : '',
          `Address or ZIP: ${values.address}`,
          `Preferred contact: ${optionLabel(contactMethods, values.contactMethod)}`,
        ];
    const body = [
      values.message,
      '',
      ...lines.filter(Boolean),
      '',
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Email: ${values.email}`,
    ]
      .join('\n')
      .slice(0, 1500);
    const subject = partner
      ? 'Partner referral'
      : `Estimate request: ${optionLabel(leadServices, values.service) || 'new lead'}`;
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [partner, values]);

  if (status.kind === 'sent') {
    const { photosTotal, photosSaved, service, claim } = status;
    const showLog = claim === 'yes' || isUrgentService(service);
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="border border-border p-6 outline-none sm:p-8"
      >
        <p className="font-display text-4xl">Request received.</p>
        <p className="mt-4 max-w-[48ch] leading-relaxed text-muted-foreground">
          We have your note. If you need us sooner, call{' '}
          <a
            href={site.phone.href}
            className="text-foreground underline underline-offset-[0.4em] hover:text-accent-ink"
          >
            {site.phone.display}
          </a>
          .
        </p>
        <p className="mt-4 max-w-[48ch] leading-relaxed text-muted-foreground">{callbackPromise}</p>
        {photosTotal > 0 && photosSaved < photosTotal && (
          <p className="mt-4 max-w-[48ch] leading-relaxed">
            {photosSaved === 0
              ? 'Your photos could not be attached.'
              : `${photosSaved} of ${photosTotal} photos were attached.`}{' '}
            <a
              href={`mailto:${site.email}`}
              className="underline underline-offset-[0.5em] hover:text-accent-ink"
            >
              Email them to {site.email}
            </a>{' '}
            and we will add them to your request.
          </p>
        )}
        {showLog && (
          <Link
            href="/insurance-log"
            className="mt-8 inline-flex items-center gap-2 underline underline-offset-[0.5em] hover:text-accent-ink"
          >
            Start your insurance photo log
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        )}
      </div>
    );
  }

  const submitting = status.kind === 'submitting';
  const stack = density === 'compact' ? 'space-y-6' : 'space-y-8';
  const askCarrier = values.claim === 'yes' || values.claim === 'not-sure';
  const buttonLabel = submitLabel ?? (partner ? 'Become a partner' : 'Send request');

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-label={partner ? 'Partner request' : 'Estimate request'}
      aria-busy={submitting}
      className={cn('relative', stack)}
    >
      <noscript>
        <p className="text-sm leading-relaxed">
          This form needs JavaScript. Call{' '}
          <a href={site.phone.href} className="underline underline-offset-[0.4em]">
            {site.phone.display}
          </a>
          .
        </p>
      </noscript>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={fid('name')} field="name" label="Name" error={errors.name}>
          <Input
            id={fid('name')}
            name="name"
            autoComplete="name"
            required
            disabled={submitting}
            value={values.name}
            onChange={onText('name')}
            {...described(fid('name'), Boolean(errors.name), true)}
          />
        </Field>
        <Field id={fid('phone')} field="phone" label="Phone" error={errors.phone}>
          <Input
            id={fid('phone')}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            disabled={submitting}
            value={values.phone}
            onChange={onText('phone')}
            {...described(fid('phone'), Boolean(errors.phone), true)}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id={fid('email')}
          field="email"
          label="Email"
          optional={!partner}
          error={errors.email}
        >
          <Input
            id={fid('email')}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required={partner}
            disabled={submitting}
            value={values.email}
            onChange={onText('email')}
            {...described(fid('email'), Boolean(errors.email), partner)}
          />
        </Field>
        {partner ? (
          <Field id={fid('company')} field="company" label="Company or brokerage" error={errors.company}>
            <Input
              id={fid('company')}
              name="organization"
              autoComplete="organization"
              required
              disabled={submitting}
              value={values.company}
              onChange={onText('company')}
              {...described(fid('company'), Boolean(errors.company), true)}
            />
          </Field>
        ) : (
          <Field id={fid('address')} field="address" label="Address or ZIP" error={errors.address}>
            <Input
              id={fid('address')}
              name="street-address"
              autoComplete="street-address"
              required
              disabled={submitting}
              placeholder="Street address or ZIP"
              value={values.address}
              onChange={onText('address')}
              {...described(fid('address'), Boolean(errors.address), true)}
            />
          </Field>
        )}
      </div>

      {!partner && (
        <Field id={fid('service')} field="service" label="Service" error={errors.service}>
          <div className="relative">
            <select
              id={fid('service')}
              name="service"
              required
              disabled={submitting}
              value={values.service}
              onChange={onText('service')}
              className={selectClass}
              {...described(fid('service'), Boolean(errors.service), true)}
            >
              <option value="">Choose a service</option>
              {leadServices.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
          </div>
        </Field>
      )}

      {!partner && isUrgentService(values.service) && (
        <p className="max-w-[52ch] text-sm leading-relaxed">
          If water is still coming in or the roof is open, call{' '}
          <a
            href={site.phone.href}
            className="underline underline-offset-[0.4em] hover:text-accent-ink"
          >
            {site.phone.display}
          </a>{' '}
          first. You can finish this request after you call.
        </p>
      )}

      {!partner && (
        <ChoiceGroup
          name={fid('claim')}
          field="claim"
          legend="Is this an insurance claim?"
          options={claimAnswers}
          value={values.claim}
          onChange={set('claim')}
          error={errors.claim}
          disabled={submitting}
          required
        />
      )}

      {!partner && askCarrier && (
        <Field
          id={fid('carrier')}
          field="carrier"
          label="Insurance carrier"
          optional
          error={errors.carrier}
        >
          <Input
            id={fid('carrier')}
            name="carrier"
            autoComplete="off"
            disabled={submitting}
            value={values.carrier}
            onChange={onText('carrier')}
            {...described(fid('carrier'), Boolean(errors.carrier))}
          />
        </Field>
      )}

      <ChoiceGroup
        name={fid('contact')}
        field="contactMethod"
        legend="Preferred contact"
        options={contactMethods}
        value={values.contactMethod}
        onChange={set('contactMethod')}
        error={errors.contactMethod}
        disabled={submitting}
        required
      />

      <Field
        id={fid('message')}
        field="message"
        label="Message"
        optional={!partner}
        error={errors.message}
      >
        <Textarea
          id={fid('message')}
          name="message"
          rows={density === 'compact' ? 3 : 4}
          required={partner}
          disabled={submitting}
          value={values.message}
          onChange={onText('message')}
          {...described(fid('message'), Boolean(errors.message), partner)}
        />
      </Field>

      {photosEnabled && (
        <div data-field="photos">
          <button
            type="button"
            className="text-sm underline underline-offset-[0.4em] hover:text-accent-ink"
            aria-expanded={photosOpen}
            aria-controls={fid('photos-panel')}
            onClick={() => setPhotosOpen((open) => !open)}
          >
            {photos.length > 0
              ? `Photos attached (${photos.length})`
              : photosOpen
                ? 'Hide photos'
                : 'Add photos (optional)'}
          </button>
          <div id={fid('photos-panel')} hidden={!photosOpen} className="mt-4">
            <p className="mb-4 max-w-[52ch] text-sm text-muted-foreground">
              A few photos of the damage or the room help us prepare. Up to 6.
            </p>
            <PhotoPicker
              id={fid('photos')}
              photos={photos}
              setPhotos={setPhotos}
              disabled={submitting}
            />
          </div>
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 -z-10 h-0 w-0 overflow-hidden"
      >
        <label htmlFor={fid('hp')}>Leave this field empty</label>
        <input
          ref={honeypotRef}
          id={fid('hp')}
          name="hp_field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          data-lpignore="true"
          data-1p-ignore="true"
          className="h-px w-px border-0 p-0"
          value={values.website}
          onChange={onText('website')}
        />
      </div>

      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
        {submitting && (
          <p className="sr-only">{status.kind === 'submitting' ? status.step : 'Sending'}</p>
        )}
        {status.kind === 'error' && (
          <div role="alert" className="border border-accent-ink p-6">
            <p className="font-display text-2xl">{errorCopy[status.reason].title}</p>
            <p className="mt-3 max-w-[52ch] leading-relaxed text-muted-foreground">
              {errorCopy[status.reason].body}
            </p>
            <div className="mt-5 flex flex-col items-start gap-4">
              <a
                href={site.phone.href}
                className="inline-flex items-center gap-3 font-display text-3xl leading-none transition-colors hover:text-accent-ink"
              >
                <Phone className="size-5 text-accent-ink" aria-hidden />
                {site.phone.display}
              </a>
              <a
                href={mailto}
                className="inline-flex items-center gap-2 text-sm underline underline-offset-[0.5em] hover:text-accent-ink"
              >
                <Mail className="size-4" aria-hidden />
                Email us this message
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-5">
        <p className="max-w-[52ch] text-sm leading-relaxed text-muted-foreground">{callbackPromise}</p>
        <FormConsent />
        <div className="flex flex-col items-start gap-4">
          <Button
            type="submit"
            variant="accent"
            size={density === 'compact' ? 'lg' : 'xl'}
            disabled={submitting}
            className="w-full cursor-pointer sm:w-auto"
          >
            {submitting ? (
              <>
                {status.kind === 'submitting' ? status.step : 'Sending'}
                <Loader2 className="animate-spin" aria-hidden />
              </>
            ) : (
              <>
                {buttonLabel}
                <ArrowUpRight className="arrow" aria-hidden />
              </>
            )}
          </Button>
          <a
            href={site.phone.href}
            className="inline-flex items-center gap-2 text-sm underline underline-offset-[0.4em] hover:text-accent-ink"
          >
            <Phone className="size-4" aria-hidden />
            Prefer to call? {site.phone.display}
          </a>
        </div>
      </div>
    </form>
  );
}
