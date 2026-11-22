'use client';

import { Check, Copy, ExternalLink, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useId, useState, useTransition } from 'react';

import { ActionButton } from '@/components/admin/action-button';
import { Button, Card, CardHeader, Field, Notice, TextArea, TextInput } from '@/components/admin/ui';
import {
  deleteDraftPortalAction,
  getPortalLinkAction,
  publishPortalAction,
  regeneratePortalLinkAction,
  revokePortalAction,
  unpublishPortalAction,
  updatePortalSettingsAction,
} from '@/server/portal/admin-actions';

type Status = 'DRAFT' | 'PUBLISHED' | 'REVOKED';

export function PortalLinkCard({ portalId, status, neverPublished }: { portalId: string; status: Status; neverPublished: boolean }) {
  const router = useRouter();
  const [url, setUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const copy = (value: string) =>
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => undefined);

  const reveal = () =>
    start(async () => {
      setError(null);
      const result = await getPortalLinkAction(portalId);
      if (result.ok && result.url) {
        setUrl(result.url);
        await copy(result.url);
      } else setError(result.message);
    });

  if (status === 'REVOKED') {
    return (
      <Card className="p-5">
        <p className="font-medium">Link revoked</p>
        <p className="mt-1 text-sm text-muted-foreground">
          The customer can no longer open this portal. Selections and files are kept for your records.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader
        title="Customer link"
        description={
          status === 'PUBLISHED'
            ? 'Anyone with this link can view and edit these selections. Send it only to the customer.'
            : 'Publish to make the link work. Until then it shows a not-available page.'
        }
      />
      <div className="grid gap-3 p-5">
        {status === 'DRAFT' ? (
          <ActionButton action={publishPortalAction.bind(null, portalId)} variant="primary" pendingLabel="Publishing">
            Publish portal
          </ActionButton>
        ) : null}
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={reveal} disabled={pending}>
            {pending ? <LoaderCircle className="animate-spin" /> : copied ? <Check /> : <Copy />}
            {copied ? 'Copied' : 'Copy link'}
          </Button>
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-[8px] px-3 text-sm font-medium hover:bg-surface-2"
            >
              Open <ExternalLink className="size-4" />
            </a>
          ) : null}
        </div>
        {url ? (
          <input
            readOnly
            value={url}
            onFocus={(event) => event.currentTarget.select()}
            className="h-9 w-full rounded-[8px] border border-input bg-surface-2/50 px-3 font-mono text-[0.75rem]"
            aria-label="Portal link"
          />
        ) : null}
        {error ? <Notice tone="danger">{error}</Notice> : null}

        <div className="mt-2 grid gap-2 border-t border-border pt-4">
          {status === 'PUBLISHED' ? (
            <ActionButton action={unpublishPortalAction.bind(null, portalId)} variant="ghost" size="sm">
              Move back to draft (pause link)
            </ActionButton>
          ) : null}
          <ActionButton
            action={async () => {
              const result = await regeneratePortalLinkAction(portalId);
              if (result.ok && result.url) setUrl(result.url);
              router.refresh();
              return result;
            }}
            variant="ghost"
            size="sm"
            confirm={{
              title: 'Create a new link?',
              description: 'The current link stops working immediately. Use this if the link was sent to the wrong person.',
              confirmLabel: 'Create new link',
            }}
          >
            Regenerate link
          </ActionButton>
          <ActionButton
            action={revokePortalAction.bind(null, portalId)}
            variant="ghost"
            size="sm"
            className="[&_button]:text-accent-ink"
            confirm={{
              title: 'Revoke this portal?',
              description:
                'The customer link stops working for good and the portal becomes read-only. Answers and files are kept. You can then create a new portal for this quote.',
              confirmLabel: 'Revoke',
              danger: true,
            }}
          >
            Revoke portal
          </ActionButton>
          {status === 'DRAFT' && neverPublished ? (
            <ActionButton
              action={deleteDraftPortalAction.bind(null, portalId)}
              variant="ghost"
              size="sm"
              className="[&_button]:text-accent-ink"
              confirm={{
                title: 'Delete this draft?',
                description: 'The draft and its selections are deleted. The quote is not affected.',
                confirmLabel: 'Delete draft',
                danger: true,
              }}
            >
              Delete draft
            </ActionButton>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

export function PortalSettingsCard({
  portalId,
  initial,
  editable,
  canSeeMoney,
}: {
  portalId: string;
  initial: { title: string; welcomeMessage: string; showAllowances: boolean; expiresAt: string };
  editable: boolean;
  canSeeMoney: boolean;
}) {
  const id = useId();
  const router = useRouter();
  const [values, setValues] = useState(initial);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [pending, start] = useTransition();
  const dirty = JSON.stringify(values) !== JSON.stringify(initial);

  const save = () =>
    start(async () => {
      const next = await updatePortalSettingsAction(portalId, { ...values, expiresAt: values.expiresAt || null });
      setResult(next);
      if (next.ok) router.refresh();
    });

  return (
    <Card>
      <CardHeader title="Portal settings" />
      <fieldset disabled={!editable} className="grid gap-4 p-5">
        <Field label="Title" htmlFor={`${id}-title`}>
          <TextInput id={`${id}-title`} value={values.title} maxLength={120} onChange={(e) => setValues({ ...values, title: e.target.value })} />
        </Field>
        <Field label="Welcome message" htmlFor={`${id}-welcome`}>
          <TextArea
            id={`${id}-welcome`}
            rows={4}
            maxLength={2000}
            value={values.welcomeMessage}
            onChange={(e) => setValues({ ...values, welcomeMessage: e.target.value })}
          />
        </Field>
        <Field label="Link expires" htmlFor={`${id}-exp`} hint="Optional.">
          <TextInput id={`${id}-exp`} type="date" value={values.expiresAt} onChange={(e) => setValues({ ...values, expiresAt: e.target.value })} />
        </Field>
        {canSeeMoney ? (
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="mt-0.5 size-4 accent-foreground"
              checked={values.showAllowances}
              onChange={(e) => setValues({ ...values, showAllowances: e.target.checked })}
            />
            <span>
              Show allowance amounts to the customer
              <span className="block text-[0.8rem] text-muted-foreground">Quote totals are never shown.</span>
            </span>
          </label>
        ) : null}
        {result ? <Notice tone={result.ok ? 'success' : 'danger'}>{result.message}</Notice> : null}
        {editable ? (
          <div>
            <Button onClick={save} disabled={pending || !dirty}>
              {pending ? <LoaderCircle className="animate-spin" /> : null}
              Save settings
            </Button>
          </div>
        ) : null}
      </fieldset>
    </Card>
  );
}
