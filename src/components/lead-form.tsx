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
  callbackPromiseEs,
  claimAnswers,
  claimAnswersEs,
  contactMethods,
  contactMethodsEs,
  emergencyCallback,
  emergencyCallbackEs,
  isUrgentService,
  leadServiceLabelsEs,
  leadServices,
  optionLabel,
  serviceForSlug,
  type ClaimAnswer,
  type ContactMethod,
} from '@/lib/inquiry';
import { contactFieldErrors, contactIdentityCopy, type ContactLocale } from '@/lib/contact-identity';
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
  locale?: ContactLocale;
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
  /** Emergency pages use the after-hours water line instead of the office-hours note. */
  timing?: 'office' | 'emergency';
};

const errorCopyEs: Record<ErrorReason, { title: string; body: string }> = {
  unavailable: {
    title: 'El formulario en línea todavía no está disponible.',
    body: 'No se envió nada. Lo que escribió sigue aquí. Llámenos y lo tomamos desde ahí.',
  },
  'rate-limited': {
    title: 'Fueron varios intentos seguidos.',
    body: 'Espere unos minutos e inténtelo de nuevo, o llámenos y lo tomamos desde ahí.',
  },
  failed: {
    title: 'No pudimos enviar esta solicitud.',
    body: 'No se envió nada. Lo que escribió sigue aquí. Llámenos y lo tomamos desde ahí.',
  },
  'too-fast': {
    title: 'Espere un momento y envíela otra vez.',
    body: 'No se envió nada. Lo que escribió sigue aquí. También puede llamar.',
  },
  expired: {
    title: 'Esta página lleva un rato abierta.',
    body: 'Actualice la página y envíela otra vez, o llámenos. Lo que escribió sigue en el formulario.',
  },
};

const schemaErrorsEs: Record<string, string> = {
  'That email is too long.': 'Ese correo es demasiado largo.',
  'Please enter a valid email address.': 'Escriba un correo válido.',
  'That phone number is too long.': 'Ese teléfono es demasiado largo.',
  'That name is too long.': 'Ese nombre es demasiado largo.',
  'Please attach no more than 6 photos.': 'Adjunte no más de 6 fotos.',
  'Choose how we should reach you.': 'Elija cómo debemos comunicarnos.',
  'That address is too long.': 'Esa dirección es demasiado larga.',
  'Enter a street address or a 5-digit ZIP.': 'Escriba una dirección o un código postal de 5 dígitos.',
  'Choose the kind of work.': 'Elija el tipo de trabajo.',
  'Tell us if this is an insurance claim.': 'Díganos si es un reclamo de seguro.',
  'That carrier name is too long.': 'Ese nombre de aseguradora es demasiado largo.',
  'Please keep this under 2,000 characters.': 'Manténgalo en menos de 2,000 caracteres.',
  'Add an email if you want us to write back that way.': 'Agregue un correo si quiere que le respondamos por ahí.',
  'Add an email, or choose phone or text.': 'Agregue un correo, o elija llamada o texto.',
};

const errorCopy: Record<ErrorReason, { title: string; body: string }> = {
  unavailable: {
    title: 'The online form is not available yet.',
    body: 'Nothing went out. What you typed is still here. Call us and we will take it from there.',
  },
  'rate-limited': {
    title: 'That was a few tries in a row.',
    body: 'Wait a few minutes and try again, or call us and we will take it from there.',
  },
  failed: {
    title: 'We could not send this request.',
    body: 'Nothing went out. What you typed is still here. Call us and we will take it from there.',
  },
  'too-fast': {
    title: 'Give it a moment, then send it again.',
    body: 'Nothing went out. What you typed is still here. You can also call.',
  },
  expired: {
    title: 'This page has been open a while.',
    body: 'Refresh the page and send it again, or call us. What you typed is still in the form.',
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
  locale = 'en',
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
  timing = 'office',
}: LeadFormProps) {
  const photosEnabled = showPhotos ?? intent === 'estimate';
  const partner = intent === 'partner';
  const es = locale === 'es';
  const copy = contactIdentityCopy[locale];
  const claimOptions = es ? claimAnswersEs : claimAnswers;
  const contactOptions = es ? contactMethodsEs : contactMethods;
  const hoursNote =
    timing === 'emergency'
      ? es
        ? emergencyCallbackEs
        : emergencyCallback
      : es
        ? callbackPromiseEs
        : callbackPromise;
  const ui = es
    ? {
        gotIt: 'Recibimos su solicitud.',
        haveIt: 'Tenemos lo que envió. Si nos necesita antes, llame al',
        photosNone: 'No pudimos adjuntar sus fotos.',
        photosSome: (saved: number, total: number) => `Adjuntamos ${saved} de ${total} fotos.`,
        emailThem: 'Envíelas a',
        addThem: 'y las agregamos a su solicitud.',
        insuranceLog: 'Empiece su registro de fotos del seguro',
        another: 'Enviar otra solicitud',
        noJs: 'Este formulario necesita JavaScript para enviarse. También puede llamar al',
        email: 'Correo',
        optional: 'opcional',
        company: 'Empresa o inmobiliaria',
        address: 'Dirección o código postal',
        addressPlaceholder: 'Dirección o código postal',
        service: 'Servicio',
        chooseService: 'Elija un servicio',
        urgent:
          'Si el agua sigue entrando, o el techo está abierto, llame primero al',
        urgentAfter: 'Puede terminar este formulario cuando cuelgue.',
        claim: '¿Es un reclamo de seguro?',
        carrier: 'Aseguradora',
        contact: 'Cómo prefiere que lo contactemos',
        message: 'Mensaje',
        photosAttached: (n: number) => `Fotos adjuntas (${n})`,
        hidePhotos: 'Ocultar fotos',
        addPhotos: 'Agregar fotos (opcional)',
        photoHelp:
          'Unas fotos del daño, o del cuarto, nos ayudan a prepararnos. Puede agregar hasta 6.',
        honeypot: 'Deje este campo vacío',
        sending: 'Enviando',
        emailThis: 'Envíenos este mensaje por correo',
        send: 'Enviar solicitud',
        partnerSend: 'Unirse al programa para agentes',
        preferCall: '¿Prefiere llamar?',
        estimateRequest: 'Solicitud de estimado',
        partnerRequest: 'Solicitud del programa para agentes',
        uploading: (index: number, total: number) => `Subiendo foto ${index} de ${total}`,
      }
    : {
        gotIt: 'We got your request.',
        haveIt: 'We have what you sent. If you need us sooner, call',
        photosNone: 'We could not attach your photos.',
        photosSome: (saved: number, total: number) => `We attached ${saved} of ${total} photos.`,
        emailThem: 'Email them to',
        addThem: 'and we will add them to your request.',
        insuranceLog: 'Start your insurance photo log',
        another: 'Send another request',
        noJs: 'This form needs JavaScript to send. You can also call',
        email: 'Email',
        optional: 'optional',
        company: 'Company or brokerage',
        address: 'Address or ZIP',
        addressPlaceholder: 'Street address or ZIP',
        service: 'Service',
        chooseService: 'Choose a service',
        urgent: 'If water is still coming in, or the roof is open, call',
        urgentAfter: 'You can finish this form after you hang up.',
        claim: 'Is this an insurance claim?',
        carrier: 'Insurance company',
        contact: 'Preferred contact',
        message: 'Message',
        photosAttached: (n: number) => `Photos attached (${n})`,
        hidePhotos: 'Hide photos',
        addPhotos: 'Add photos (optional)',
        photoHelp: 'A few photos of the damage, or of the room, help us get ready. You can add up to 6.',
        honeypot: 'Leave this field empty',
        sending: 'Sending',
        emailThis: 'Email us this message',
        send: 'Send request',
        partnerSend: 'Join the Realtor program',
        preferCall: 'Prefer to call?',
        estimateRequest: 'Estimate request',
        partnerRequest: 'Realtor program request',
        uploading: (index: number, total: number) => `Uploading photo ${index} of ${total}`,
      };
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
    const identity = contactFieldErrors(values.name, values.phone, locale);
    const check = leadSchema.safeParse(
      buildCandidate(intent, values, [], startedAt.current, trap),
    );
    if (!check.success || identity.name || identity.phone) {
      const next: FieldErrors = {};
      if (!check.success) {
        for (const issue of check.error.issues) {
          const key = issue.path[0] as keyof FieldErrors | undefined;
          if (key && key !== 'photos' && key !== 'website' && !next[key]) {
            next[key] = es ? (schemaErrorsEs[issue.message] ?? issue.message) : issue.message;
          }
        }
      }
      if (identity.name) next.name = identity.name;
      if (identity.phone) next.phone = identity.phone;
      if (
        intent === 'estimate' &&
        values.contactMethod === 'email' &&
        values.email.trim().length === 0 &&
        !next.email
      ) {
        next.email = es
          ? schemaErrorsEs['Add an email, or choose phone or text.']
          : 'Add an email, or choose phone or text.';
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
            step: ui.uploading(index + 1, photos.length),
          });
          const result = await uploadLeadPhoto(photo.blob);
          if (!result.ok) {
            if (result.reason === 'not-configured') break;
            continue;
          }
          uploaded.current.set(photo.id, result.pathname);
        }
      }

      setStatus({ kind: 'submitting', step: ui.sending });
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
      if (code === 'BAD_REQUEST') {
        const next: FieldErrors = {};
        if (message.includes(contactIdentityCopy.en.nameError)) next.name = copy.nameError;
        if (message.includes(contactIdentityCopy.en.phoneError)) next.phone = copy.phoneError;
        if (next.name || next.phone) {
          setErrors(next);
          setStatus({ kind: 'idle' });
          focusFirstError(next);
          return;
        }
      }
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
          values.carrier ? `Insurance company: ${values.carrier}` : '',
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
        <p className="font-display text-4xl">{ui.gotIt}</p>
        <p className="mt-4 max-w-[48ch] leading-relaxed text-muted-foreground">
          {ui.haveIt}{' '}
          <a
            href={site.phone.href}
            className="text-foreground underline underline-offset-[0.4em] hover:text-accent-ink"
          >
            {site.phone.display}
          </a>
          .
        </p>
        <p className="mt-4 max-w-[48ch] leading-relaxed text-muted-foreground">{hoursNote}</p>
        {photosTotal > 0 && photosSaved < photosTotal && (
          <p className="mt-4 max-w-[48ch] leading-relaxed">
            {photosSaved === 0 ? ui.photosNone : ui.photosSome(photosSaved, photosTotal)}{' '}
            <a
              href={`mailto:${site.email}`}
              className="underline underline-offset-[0.5em] hover:text-accent-ink"
            >
              {ui.emailThem} {site.email}
            </a>{' '}
            {ui.addThem}
          </p>
        )}
        {showLog && (
          <Link
            href="/insurance-log"
            className="mt-8 inline-flex items-center gap-2 underline underline-offset-[0.5em] hover:text-accent-ink"
          >
            {ui.insuranceLog}
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        )}
      </div>
    );
  }

  const submitting = status.kind === 'submitting';
  const stack = density === 'compact' ? 'space-y-6' : 'space-y-8';
  const askCarrier = values.claim === 'yes' || values.claim === 'not-sure';
  const buttonLabel = submitLabel ?? (partner ? ui.partnerSend : ui.send);

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-label={partner ? ui.partnerRequest : ui.estimateRequest}
      aria-busy={submitting}
      className={cn('relative', stack)}
    >
      <noscript>
        <p className="text-sm leading-relaxed">
          {ui.noJs}{' '}
          <a href={site.phone.href} className="underline underline-offset-[0.4em]">
            {site.phone.display}
          </a>
          .
        </p>
      </noscript>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id={fid('name')}
          field="name"
          label={copy.nameLabel}
          error={errors.name}
          required
          requiredLabel={copy.required}
        >
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
        <Field
          id={fid('phone')}
          field="phone"
          label={copy.phoneLabel}
          error={errors.phone}
          required
          requiredLabel={copy.required}
        >
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
          label={ui.email}
          optional={!partner}
          optionalLabel={ui.optional}
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
          <Field id={fid('company')} field="company" label={ui.company} error={errors.company}>
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
          <Field
            id={fid('address')}
            field="address"
            label={ui.address}
            error={errors.address}
            required
            requiredLabel={copy.required}
          >
            <Input
              id={fid('address')}
              name="street-address"
              autoComplete="street-address"
              required
              disabled={submitting}
              placeholder={ui.addressPlaceholder}
              value={values.address}
              onChange={onText('address')}
              {...described(fid('address'), Boolean(errors.address), true)}
            />
          </Field>
        )}
      </div>

      {!partner && (
        <Field
          id={fid('service')}
          field="service"
          label={ui.service}
          error={errors.service}
          required
          requiredLabel={copy.required}
        >
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
              <option value="">{ui.chooseService}</option>
              {leadServices.map((service) => (
                <option key={service.value} value={service.value}>
                  {es ? leadServiceLabelsEs[service.value] : service.label}
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
          {ui.urgent}{' '}
          <a
            href={site.phone.href}
            className="underline underline-offset-[0.4em] hover:text-accent-ink"
          >
            {site.phone.display}
          </a>
          {es ? '. ' : ' first. '}
          {ui.urgentAfter}
        </p>
      )}

      {!partner && (
        <ChoiceGroup
          name={fid('claim')}
          field="claim"
          legend={ui.claim}
          options={claimOptions}
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
          label={ui.carrier}
          optional
          optionalLabel={ui.optional}
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
        legend={ui.contact}
        options={contactOptions}
        value={values.contactMethod}
        onChange={set('contactMethod')}
        error={errors.contactMethod}
        disabled={submitting}
        required
      />

      <Field
        id={fid('message')}
        field="message"
        label={ui.message}
        optional={!partner}
        optionalLabel={ui.optional}
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
              ? ui.photosAttached(photos.length)
              : photosOpen
                ? ui.hidePhotos
                : ui.addPhotos}
          </button>
          <div id={fid('photos-panel')} hidden={!photosOpen} className="mt-4">
            <p className="mb-4 max-w-[52ch] text-sm text-muted-foreground">
              {ui.photoHelp}
            </p>
            <PhotoPicker
              id={fid('photos')}
              photos={photos}
              setPhotos={setPhotos}
              disabled={submitting}
              locale={locale}
            />
          </div>
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 -z-10 h-0 w-0 overflow-hidden"
      >
        <label htmlFor={fid('hp')}>{ui.honeypot}</label>
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
          <p className="sr-only">{status.kind === 'submitting' ? status.step : ui.sending}</p>
        )}
        {status.kind === 'error' && (
          <div role="alert" className="border border-accent-ink p-6">
            <p className="font-display text-2xl">{(es ? errorCopyEs : errorCopy)[status.reason].title}</p>
            <p className="mt-3 max-w-[52ch] leading-relaxed text-muted-foreground">
              {(es ? errorCopyEs : errorCopy)[status.reason].body}
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
                {ui.emailThis}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-5">
        <p className="max-w-[52ch] text-sm leading-relaxed text-muted-foreground">{hoursNote}</p>
        <FormConsent locale={locale} />
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
                {status.kind === 'submitting' ? status.step : ui.sending}
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
            {ui.preferCall} {site.phone.display}
          </a>
        </div>
      </div>
    </form>
  );
}
