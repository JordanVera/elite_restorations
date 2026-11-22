'use client';

import { Check, MessageSquareText, RotateCcw, Undo2 } from 'lucide-react';
import { unstable_rethrow, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { Button, Card, CardHeader, Field, Notice, TextArea } from '@/components/admin/ui';
import type { SelectionStatus } from '@/lib/selections/status';
import { reviewSelectionAction, type ReviewDecisionInput } from '@/server/review/actions';

const COPY: Record<ReviewDecisionInput, { title: string; confirm: string; hint?: string }> = {
  APPROVE: {
    title: 'Approve this selection',
    confirm: 'Approve',
    hint: 'Marks the material as approved for ordering. It does not approve the quote, change the price, or authorize a purchase.',
  },
  REQUEST_CHANGES: {
    title: 'Request changes',
    confirm: 'Send to customer',
    hint: 'The customer sees your message on their portal and can edit and resubmit.',
  },
  REOPEN: { title: 'Reopen for editing', confirm: 'Reopen', hint: 'Moves the selection back to draft so the customer can change it. No message is shown.' },
  NOTE: { title: 'Internal note', confirm: 'Add note', hint: 'Only your team sees notes.' },
};

export function ReviewPanel({
  selectionId,
  status,
  version,
  portalRevoked,
}: {
  selectionId: string;
  status: SelectionStatus;
  version: number;
  portalRevoked: boolean;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<ReviewDecisionInput | null>(null);
  const [note, setNote] = useState('');
  const [feedback, setFeedback] = useState('');
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [pending, start] = useTransition();

  const choices: ReviewDecisionInput[] = portalRevoked
    ? []
    : status === 'SUBMITTED'
      ? ['APPROVE', 'REQUEST_CHANGES', 'REOPEN']
      : status === 'APPROVED'
        ? ['REQUEST_CHANGES', 'REOPEN']
        : [];

  function open(next: ReviewDecisionInput) {
    setMode(next);
    setResult(null);
  }

  function submit() {
    if (!mode) return;
    start(async () => {
      try {
        const res = await reviewSelectionAction({ selectionId, decision: mode, expectedVersion: version, internalNote: note, customerFeedback: feedback });
        setResult(res);
        if (res.ok) {
          setMode(null);
          setNote('');
          setFeedback('');
          router.refresh();
        }
      } catch (error) {
        unstable_rethrow(error);
        setResult({ ok: false, message: 'Something went wrong. Try again.' });
      }
    });
  }

  return (
    <Card>
      <CardHeader title="Review" description="Internal material approval only. Not a quote approval, contract change, or purchase authorization." />
      <div className="grid gap-3 p-5">
        {!choices.length ? (
          <p className="text-sm text-muted-foreground">
            {portalRevoked
              ? 'This portal was revoked. You can still add internal notes.'
              : status === 'CHANGES_REQUESTED'
                ? 'Waiting for the customer to update and resubmit.'
                : 'Waiting for the customer to submit.'}
          </p>
        ) : null}

        {mode === null ? (
          <div className="grid gap-2">
            {choices.includes('APPROVE') ? (
              <Button onClick={() => open('APPROVE')}>
                <Check /> Approve
              </Button>
            ) : null}
            {choices.includes('REQUEST_CHANGES') ? (
              <Button variant="secondary" onClick={() => open('REQUEST_CHANGES')}>
                <Undo2 /> Request changes
              </Button>
            ) : null}
            {choices.includes('REOPEN') ? (
              <Button variant="ghost" onClick={() => open('REOPEN')}>
                <RotateCcw /> Reopen for editing
              </Button>
            ) : null}
            <Button variant="ghost" onClick={() => open('NOTE')}>
              <MessageSquareText /> Add internal note
            </Button>
          </div>
        ) : (
          <div className="grid gap-3">
            <div>
              <p className="font-medium">{COPY[mode].title}</p>
              {COPY[mode].hint ? <p className="mt-0.5 text-[0.8rem] text-muted-foreground">{COPY[mode].hint}</p> : null}
            </div>
            {mode === 'REQUEST_CHANGES' ? (
              <Field label="Message to the customer" htmlFor="review-feedback" hint="Be specific, e.g. “That tile is discontinued. Please pick another color.”">
                <TextArea id="review-feedback" value={feedback} maxLength={2000} onChange={(e) => setFeedback(e.target.value)} autoFocus />
              </Field>
            ) : null}
            <Field label={mode === 'NOTE' ? 'Note' : 'Internal note (optional)'} htmlFor="review-note">
              <TextArea id="review-note" value={note} maxLength={2000} onChange={(e) => setNote(e.target.value)} autoFocus={mode !== 'REQUEST_CHANGES'} />
            </Field>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setMode(null)} disabled={pending}>
                Cancel
              </Button>
              <Button onClick={submit} disabled={pending}>
                {pending ? 'Saving…' : COPY[mode].confirm}
              </Button>
            </div>
          </div>
        )}

        {result ? <Notice tone={result.ok ? 'success' : 'danger'}>{result.message}</Notice> : null}
      </div>
    </Card>
  );
}
