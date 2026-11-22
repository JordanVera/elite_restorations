'use client';

import { LoaderCircle } from 'lucide-react';
import { unstable_rethrow, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { Button, Notice, type ButtonSize, type ButtonVariant } from '@/components/admin/ui';
import { ConfirmDialog } from '@/components/admin/confirm-dialog';

type Result = { ok: boolean; message: string } | void;

/** Runs a server action and shows its result message under the button. */
export function ActionButton({
  action,
  children,
  variant = 'secondary',
  size = 'md',
  confirm,
  pendingLabel,
  disabled,
  className,
}: {
  action: () => Promise<Result>;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  confirm?: { title: string; description: React.ReactNode; confirmLabel: string; danger?: boolean };
  pendingLabel?: string;
  disabled?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [open, setOpen] = useState(false);

  const run = () =>
    start(async () => {
      setOpen(false);
      try {
        const next = await action();
        setResult(next ?? null);
        router.refresh();
      } catch (error) {
        unstable_rethrow(error);
        setResult({ ok: false, message: error instanceof Error ? error.message : 'Something went wrong.' });
      }
    });

  return (
    <div className={className}>
      <Button
        variant={variant}
        size={size}
        disabled={pending || disabled}
        onClick={() => (confirm ? setOpen(true) : run())}
      >
        {pending ? <LoaderCircle className="animate-spin" /> : null}
        {pending && pendingLabel ? pendingLabel : children}
      </Button>
      {result ? (
        <Notice tone={result.ok ? 'success' : 'danger'} className="mt-3">
          {result.message}
        </Notice>
      ) : null}
      {confirm ? (
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title={confirm.title}
          description={confirm.description}
          confirmLabel={confirm.confirmLabel}
          danger={confirm.danger}
          onConfirm={run}
        />
      ) : null}
    </div>
  );
}
