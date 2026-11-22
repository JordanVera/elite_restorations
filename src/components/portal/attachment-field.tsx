'use client';

import { FileText, ImageIcon, Loader2, Paperclip, X } from 'lucide-react';
import { useId, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import {
  describeUploadError,
  formatBytes,
  isPreviewableImage,
  MAX_ATTACHMENTS_PER_SELECTION,
  resolveUploadType,
  UPLOAD_ACCEPT,
  uploadPathname,
} from '@/lib/selections/uploads';
import { registerUploadAction, removeAttachmentAction } from '@/server/portal/customer-actions';
import type { CustomerAttachment } from '@/server/portal/customer';

export type UploadConfig = { mode: 'blob'; portalId: string } | { mode: 'server' } | { mode: 'none' };

function randomId(): string {
  return crypto.randomUUID().replace(/-/g, '');
}

async function uploadOne(token: string, requirementId: string, file: File, uploads: UploadConfig): Promise<CustomerAttachment> {
  if (uploads.mode === 'blob') {
    const type = resolveUploadType(file.name, file.type);
    if (!type) throw new Error(`${file.name}: use a JPG, PNG, WebP, HEIC, or PDF file.`);
    const { upload } = await import('@vercel/blob/client');
    const stored = await upload(uploadPathname(uploads.portalId, requirementId, type, randomId()), file, {
      access: 'private',
      handleUploadUrl: `/api/portal/${token}/upload`,
      clientPayload: JSON.stringify({ requirementId }),
      contentType: type,
    });
    const result = await registerUploadAction(token, requirementId, stored.pathname, file.name);
    if (!result.ok) throw new Error(result.message);
    return result.attachment;
  }
  const body = new FormData();
  body.set('requirementId', requirementId);
  body.set('file', file);
  const response = await fetch(`/api/portal/${token}/upload`, { method: 'POST', body });
  const data = (await response.json().catch(() => null)) as { ok?: boolean; message?: string; attachment?: CustomerAttachment } | null;
  if (!response.ok || !data?.attachment) throw new Error(data?.message ?? 'The upload failed. Try again.');
  return data.attachment;
}

export function AttachmentField({
  token,
  requirementId,
  uploads,
  attachments,
  editable,
  onChange,
}: {
  token: string;
  requirementId: string;
  uploads: UploadConfig;
  attachments: CustomerAttachment[];
  editable: boolean;
  onChange: (next: CustomerAttachment[]) => void;
}) {
  const inputId = useId();
  const input = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<{ key: string; name: string }[]>([]);
  const [removing, setRemoving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const remaining = MAX_ATTACHMENTS_PER_SELECTION - attachments.length - pending.length;

  async function handleFiles(list: FileList | null) {
    if (!list?.length) return;
    setError(null);
    const files = Array.from(list);
    if (files.length > remaining) {
      setError(`You can add ${remaining} more file${remaining === 1 ? '' : 's'} to this selection.`);
      return;
    }
    const problem = files.map(describeUploadError).find(Boolean);
    if (problem) {
      setError(problem);
      return;
    }
    let current = attachments;
    for (const file of files) {
      const key = randomId();
      setPending((p) => [...p, { key, name: file.name }]);
      try {
        const added = await uploadOne(token, requirementId, file, uploads);
        current = [...current, added];
        onChange(current);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'The upload failed. Try again.');
      } finally {
        setPending((p) => p.filter((entry) => entry.key !== key));
      }
    }
    if (input.current) input.current.value = '';
  }

  async function remove(file: CustomerAttachment) {
    setRemoving(file.id);
    setError(null);
    try {
      const result = await removeAttachmentAction(token, file.id);
      if (result.ok) onChange(attachments.filter((a) => a.id !== file.id));
      else setError(result.message);
    } catch {
      setError('The file could not be removed. Try again.');
    } finally {
      setRemoving(null);
    }
  }

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[0.8rem] font-medium" id={`${inputId}-label`}>
          Photos or spec sheets
        </span>
        <span className="text-xs text-muted-foreground">JPG, PNG, WebP, HEIC, or PDF up to 10 MB</span>
      </div>

      {attachments.length ? (
        <ul className="grid gap-2 sm:grid-cols-2" aria-labelledby={`${inputId}-label`}>
          {attachments.map((file) => {
            const href = `/api/portal/${token}/files/${file.id}`;
            return (
              <li key={file.id} className="flex items-center gap-3 rounded-[10px] border border-border bg-white p-2">
                <a href={href} target="_blank" rel="noopener noreferrer" className="flex min-w-0 flex-1 items-center gap-3">
                  {isPreviewableImage(file.contentType) ? (
                    // eslint-disable-next-line @next/next/no-img-element -- private, token-gated file
                    <img src={href} alt="" className="size-12 shrink-0 rounded-[6px] bg-surface-2 object-cover" loading="lazy" />
                  ) : (
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-[6px] bg-surface-2 text-muted-foreground">
                      {file.contentType === 'application/pdf' ? <FileText className="size-5" /> : <ImageIcon className="size-5" />}
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{file.name}</span>
                    <span className="block text-xs text-muted-foreground">{formatBytes(file.size)}</span>
                  </span>
                </a>
                {editable && !file.locked ? (
                  <button
                    type="button"
                    onClick={() => remove(file)}
                    disabled={removing === file.id}
                    className="flex size-9 shrink-0 items-center justify-center rounded-[8px] text-muted-foreground hover:bg-surface-2 hover:text-foreground disabled:opacity-50"
                    aria-label={`Remove ${file.name}`}
                  >
                    {removing === file.id ? <Loader2 className="size-4 animate-spin" /> : <X className="size-4" />}
                  </button>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}

      {pending.length ? (
        <ul className="grid gap-1 text-sm text-muted-foreground" aria-live="polite">
          {pending.map((entry) => (
            <li key={entry.key} className="flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" aria-hidden /> Uploading {entry.name}…
            </li>
          ))}
        </ul>
      ) : null}

      {editable ? (
        uploads.mode === 'none' ? (
          <p className="text-sm text-muted-foreground">File uploads aren&apos;t available right now. Email photos to us instead.</p>
        ) : remaining > 0 ? (
          <label
            htmlFor={inputId}
            className={cn(
              'flex cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-dashed border-input bg-white px-4 py-4 text-sm font-medium text-foreground/80 transition-colors hover:border-foreground/40 hover:text-foreground',
              pending.length && 'pointer-events-none opacity-60',
            )}
          >
            <Paperclip className="size-4" aria-hidden />
            Add photos or files
            <input
              ref={input}
              id={inputId}
              type="file"
              multiple
              accept={UPLOAD_ACCEPT}
              className="sr-only"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>
        ) : (
          <p className="text-sm text-muted-foreground">This selection has the maximum of {MAX_ATTACHMENTS_PER_SELECTION} files.</p>
        )
      ) : null}

      {error ? (
        <p className="text-sm text-accent-ink" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
