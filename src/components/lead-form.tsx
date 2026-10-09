'use client';

import * as React from 'react';
import Link from 'next/link';
import { TRPCClientError } from '@trpc/client';
import { ArrowUpRight, Loader2, Mail, Phone } from 'lucide-react';

import { ChoiceGroup, Field } from '@/components/form-fields';
import { PhotoPicker, type PickedPhoto } from '@/components/photo-picker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  callbackPromise,
  incidentForService,
  incidents,
  insurerAnswers,
  isLeadPath,
  pathForService,
  roomForService,
  rooms,
  timelines,
  yesNo,
  type LeadPath,
} from '@/lib/inquiry';
import { leadSchema, type LeadInput } from '@/lib/inquiry-schema';
import { uploadLeadPhoto } from '@/lib/photos-client';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';
import { trpc } from '@/trpc/client';
import type { AppRouter } from '@/server/trpc/router';

type Values = {
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string;
  room: string;
  staying: string;
  timeline: string;
  incident: string;
  waterActive: string;
  insurer: string;
  address: string;
};

type FieldErrors = Partial<Record<keyof Values | 'photos', string>>;

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting'; step: string }
  | { kind: 'sent'; path: LeadPath; photosTotal: number; photosSaved: number }
  | { kind: 'error'; reason: 'unavailable' | 'rate-limited' | 'failed' };

export type LeadPhotoSeed = { blob: Blob; name: string };

type LeadFormProps = {
  defaultService?: string;
  defaultMessage?: string;
  defaultPath?: string;
  defaultName?: string;
  defaultAddress?: string;
  defaultIncident?: string;
  defaultWaterActive?: string;
  /** Photo blobs already on this page. The form makes its own preview URLs. */
  initialPhotos?: LeadPhotoSeed[];
  /** Hides the path choice and fixes the form to one path. */
  lockPath?: LeadPath;
};

const pathChoices: { value: LeadPath; title: string; body: string }[] = [
  {
    value: 'remodel',
    title: 'Plan a remodel',
    body: 'Kitchens, baths, floors, siding and finish work.',
  },
  {
    value: 'recovery',
    title: 'Water or storm damage',
    body: 'Leaks, flooding, roof and storm repairs.',
  },
];

function buildCandidate(
  path: LeadPath,
  v: Values,
  photos: string[],
): LeadInput {
  const shared = {
    name: v.name,
    email: v.email,
    phone: v.phone,
    message: v.message,
    website: v.website,
    photos,
  };
  if (path === 'remodel') {
    return {
      ...shared,
      path,
      room: v.room,
      staying: v.staying,
      timeline: v.timeline,
    } as LeadInput;
  }
  return {
    ...shared,
    path,
    incident: v.incident,
    waterActive: v.waterActive,
    insurer: v.insurer,
    address: v.address,
  } as LeadInput;
}

const labelOf = (
  list: readonly { value: string; label: string }[],
  value: string,
) => list.find((o) => o.value === value)?.label;

export function LeadForm({
  defaultService,
  defaultMessage,
  defaultPath,
  lockPath,
  defaultName,
  defaultAddress,
  defaultIncident,
  defaultWaterActive,
  initialPhotos,
}: LeadFormProps) {
  const [path, setPath] = React.useState<LeadPath>(
    lockPath ??
      (isLeadPath(defaultPath) ? defaultPath : pathForService(defaultService)),
  );
  const [values, setValues] = React.useState<Values>({
    name: defaultName ?? '',
    email: '',
    phone: '',
    message: defaultMessage ?? '',
    website: '',
    room: roomForService(defaultService),
    staying: '',
    timeline: '',
    incident: defaultIncident || incidentForService(defaultService),
    waterActive: defaultWaterActive ?? '',
    insurer: '',
    address: defaultAddress ?? '',
  });
  const [photos, setPhotos] = React.useState<PickedPhoto[]>(() =>
    (initialPhotos ?? []).map((photo) => ({
      id: crypto.randomUUID(),
      blob: photo.blob,
      previewUrl: URL.createObjectURL(photo.blob),
      name: photo.name,
    })),
  );
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [status, setStatus] = React.useState<Status>({ kind: 'idle' });
  const statusRef = React.useRef<HTMLDivElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const uploaded = React.useRef(new Map<string, string>());

  const set = (field: keyof Values) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const onText =
    (field: keyof Values) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      set(field)(event.target.value);

  const aria = (field: keyof Values) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  });

  function choosePath(next: LeadPath) {
    if (next === path) return;
    setPath(next);
    setErrors({});
  }

  function focusFirstError(next: FieldErrors) {
    const fields =
      formRef.current?.querySelectorAll<HTMLElement>('[data-field]') ?? [];
    for (const field of fields) {
      if (next[field.dataset.field as keyof FieldErrors]) {
        field.querySelector<HTMLElement>('input, textarea, button')?.focus();
        return;
      }
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === 'submitting') return;

    const check = leadSchema.safeParse(buildCandidate(path, values, []));
    if (!check.success) {
      const next: FieldErrors = {};
      for (const issue of check.error.issues) {
        const key = issue.path[0] as keyof FieldErrors | undefined;
        if (key && key !== 'photos' && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus({ kind: 'idle' });
      focusFirstError(next);
      return;
    }

    setErrors({});

    try {
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

      setStatus({ kind: 'submitting', step: 'Sending' });
      const pathnames = photos.flatMap((p) => uploaded.current.get(p.id) ?? []);
      const parsed = leadSchema.parse(buildCandidate(path, values, pathnames));
      const response = await trpc.contact.submit.mutate(parsed);
      setStatus({
        kind: 'sent',
        path,
        photosTotal: photos.length,
        photosSaved: response.photosSaved,
      });
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

  const mailto = React.useMemo(() => {
    const lines =
      path === 'recovery'
        ? [
            `What happened: ${labelOf(incidents, values.incident) ?? ''}`,
            `Water still coming in: ${labelOf(yesNo, values.waterActive) ?? ''}`,
            `Insurance claim: ${labelOf(insurerAnswers, values.insurer) ?? ''}`,
            `Address: ${values.address}`,
          ]
        : [
            `Space: ${labelOf(rooms, values.room) ?? ''}`,
            `Timeline: ${labelOf(timelines, values.timeline) ?? ''}`,
            `Staying: ${values.staying}`,
          ];
    const body = [
      values.message,
      '',
      ...lines,
      '',
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
    ].join('\n');
    const subject =
      path === 'recovery'
        ? 'Water or storm damage request'
        : 'Remodel estimate request';
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [path, values]);

  if (status.kind === 'sent') {
    const { path: sentPath, photosTotal, photosSaved } = status;
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="border border-border p-8 outline-none"
      >
        <p className="font-display text-4xl">
          {sentPath === 'recovery' ? 'Request received.' : 'Thank you.'}
        </p>
        <p className="mt-4 max-w-[48ch] leading-relaxed text-muted-foreground">
          {sentPath === 'recovery'
            ? callbackPromise
            : 'Your request has been sent. We will follow up using the contact details you provided.'}
        </p>
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
        {sentPath === 'recovery' && (
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            <a
              href={site.phone.href}
              className="inline-flex items-center gap-2 underline underline-offset-[0.5em] hover:text-accent-ink"
            >
              <Phone className="size-4" aria-hidden />
              Water still coming in? Call {site.phone.display}
            </a>
            <Link
              href="/insurance-log"
              className="inline-flex items-center gap-2 underline underline-offset-[0.5em] hover:text-accent-ink"
            >
              Start your insurance photo log
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        )}
      </div>
    );
  }

  const submitting = status.kind === 'submitting';
  const recovery = path === 'recovery';

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-10">
      {!lockPath && (
        <fieldset disabled={submitting}>
          <legend className="eyebrow text-muted-foreground">
            What do you need?
          </legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {pathChoices.map((choice) => (
              <label key={choice.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="path"
                  value={choice.value}
                  checked={path === choice.value}
                  onChange={() => choosePath(choice.value)}
                  className="peer sr-only"
                />
                <span className="block h-full border border-input p-5 transition-colors duration-300 hover:border-foreground peer-checked:border-accent peer-checked:bg-accent/10 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-ink">
                  <span className="font-display block text-2xl">
                    {choice.title}
                  </span>
                  <span className="mt-2 block text-sm text-muted-foreground">
                    {choice.body}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {recovery ? (
        <div className="space-y-10">
          <ChoiceGroup
            name="waterActive"
            legend="Is water still coming in?"
            options={yesNo}
            value={values.waterActive}
            onChange={set('waterActive')}
            error={errors.waterActive}
            disabled={submitting}
          />

          {values.waterActive === 'yes' && (
            <div role="alert" className="border border-accent-ink p-6">
              <p className="font-display text-2xl">Call us now.</p>
              <p className="mt-2 max-w-[46ch] leading-relaxed text-muted-foreground">
                A phone call is the fastest way to get help. If it is safe, shut
                off the water at the main valve. You can finish this request
                afterward.
              </p>
              <a
                href={site.phone.href}
                className="mt-4 inline-flex items-center gap-3 text-2xl transition-colors hover:text-accent-ink"
              >
                <Phone className="size-5 text-accent-ink" aria-hidden />
                {site.phone.display}
              </a>
            </div>
          )}

          <ChoiceGroup
            name="incident"
            legend="What happened?"
            options={incidents}
            value={values.incident}
            onChange={set('incident')}
            error={errors.incident}
            disabled={submitting}
          />
          <ChoiceGroup
            name="insurer"
            legend="Is an insurance company involved?"
            options={insurerAnswers}
            value={values.insurer}
            onChange={set('insurer')}
            error={errors.insurer}
            disabled={submitting}
          />
          <Field id="address" label="Property address" error={errors.address}>
            <Input
              id="address"
              name="address"
              autoComplete="street-address"
              required
              value={values.address}
              onChange={onText('address')}
              {...aria('address')}
            />
          </Field>
        </div>
      ) : (
        <div className="space-y-10">
          <ChoiceGroup
            name="room"
            legend="Which space?"
            options={rooms}
            value={values.room}
            onChange={set('room')}
            error={errors.room}
            disabled={submitting}
          />
          <ChoiceGroup
            name="timeline"
            legend="When would you like to start?"
            options={timelines}
            value={values.timeline}
            onChange={set('timeline')}
            error={errors.timeline}
            disabled={submitting}
          />
          <Field
            id="staying"
            label="What is staying?"
            optional
            error={errors.staying}
          >
            <Input
              id="staying"
              name="staying"
              placeholder="Cabinets, flooring, the layout…"
              value={values.staying}
              onChange={onText('staying')}
              {...aria('staying')}
            />
          </Field>
        </div>
      )}

      <Field
        id="message"
        label={
          recovery
            ? 'Anything else we should know'
            : 'Tell us about the project'
        }
        optional={recovery}
        error={errors.message}
      >
        <Textarea
          id="message"
          name="message"
          rows={recovery ? 3 : 5}
          required={!recovery}
          value={values.message}
          onChange={onText('message')}
          {...aria('message')}
        />
      </Field>

      <div data-field="photos">
        <p className="eyebrow text-muted-foreground">
          Photos{' '}
          <span className="normal-case tracking-normal opacity-70">
            (optional)
          </span>
        </p>
        <p className="mb-4 mt-2 max-w-[52ch] text-sm text-muted-foreground">
          {recovery
            ? 'Take a few before anything is cleaned up: the damage, the wet materials, and the room.'
            : 'A few photos of the space help us prepare for the walkthrough.'}
        </p>
        <PhotoPicker
          id="photos"
          photos={photos}
          setPhotos={setPhotos}
          disabled={submitting}
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={onText('name')}
            {...aria('name')}
          />
        </Field>
        <Field
          id="phone"
          label="Phone"
          optional={!recovery}
          error={errors.phone}
        >
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required={recovery}
            value={values.phone}
            onChange={onText('phone')}
            {...aria('phone')}
          />
        </Field>
      </div>
      <Field id="email" label="Email" error={errors.email}>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={values.email}
          onChange={onText('email')}
          {...aria('email')}
        />
      </Field>

      <div
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={onText('website')}
        />
      </div>

      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="outline-none"
      >
        {status.kind === 'error' && (
          <div role="alert" className="border border-accent-ink p-6">
            <p className="font-display text-2xl">
              {status.reason === 'unavailable' &&
                'Online requests are not available yet.'}
              {status.reason === 'rate-limited' && 'Too many attempts.'}
              {status.reason === 'failed' && 'We could not send your request.'}
            </p>
            <p className="mt-3 max-w-[52ch] leading-relaxed text-muted-foreground">
              Nothing was sent. Your details are still in the form. Please call
              or email us and we will help you directly.
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

      <div className={cn('space-y-5', recovery && 'pt-2')}>
        {recovery && (
          <p className="max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
            {callbackPromise}
          </p>
        )}
        <Button type="submit" variant="accent" size="xl" disabled={submitting}>
          {submitting ? (
            <>
              {status.kind === 'submitting' ? status.step : 'Sending'}
              <Loader2 className="animate-spin" aria-hidden />
            </>
          ) : (
            <>
              {recovery ? 'Request a call back' : 'Send request'}
              <ArrowUpRight className="arrow" aria-hidden />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
