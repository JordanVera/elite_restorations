import { ExternalLink, FileText, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ReviewPanel } from '@/components/admin/review/review-panel';
import { SourceBadge } from '@/components/admin/records';
import { Badge, Card, CardHeader, EmptyState, PageHeader } from '@/components/admin/ui';
import { activityLabel, actorLabel, formatDate, formatDateTime, formatMoney, relativeTime } from '@/lib/activity-labels';
import { SELECTION_FIELDS, TEXT_FIELD_KEYS, type TextFieldKey } from '@/lib/selections/fields';
import type { SelectionValues } from '@/lib/selections/input';
import { statusLabel, statusTone } from '@/lib/selections/status';
import { formatBytes, isPreviewableImage } from '@/lib/selections/uploads';
import { can } from '@/server/auth/policy';
import { requireAdmin } from '@/server/auth/session';
import { getSelectionForReview, type SelectionForReview } from '@/server/review/queries';

export const metadata = { title: 'Review selection' };

const DECISION_LABEL = {
  APPROVED: { label: 'Approved', tone: 'success' },
  CHANGES_REQUESTED: { label: 'Changes requested', tone: 'danger' },
  REOPENED: { label: 'Reopened', tone: 'info' },
  NOTE: { label: 'Note', tone: 'neutral' },
} as const;

function valuesOf(sel: SelectionForReview): SelectionValues {
  const values = { productUrls: sel.productUrls, notes: sel.notes } as SelectionValues;
  for (const key of TEXT_FIELD_KEYS) values[key] = sel[key];
  return values;
}

function ValuesList({ values, previous }: { values: SelectionValues; previous?: SelectionValues }) {
  const rows = SELECTION_FIELDS.filter((f) => TEXT_FIELD_KEYS.includes(f.key as TextFieldKey))
    .map((f) => ({ key: f.key as TextFieldKey, label: f.label, value: values[f.key as TextFieldKey], before: previous?.[f.key as TextFieldKey] }))
    .filter((row) => row.value || row.before);
  const linksChanged = previous ? previous.productUrls.join('\n') !== values.productUrls.join('\n') : false;
  const notesChanged = previous ? (previous.notes ?? '') !== (values.notes ?? '') : false;
  const changed = <Badge tone="info" className="ml-2 py-0 text-[0.7rem]">Changed</Badge>;

  if (!rows.length && !values.productUrls.length && !values.notes) {
    return <p className="text-sm text-muted-foreground">No details entered.</p>;
  }
  return (
    <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
      {rows.map((row) => (
        <div key={row.key}>
          <dt className="text-[0.8rem] text-muted-foreground">
            {row.label}
            {previous && (row.value ?? '') !== (row.before ?? '') ? changed : null}
          </dt>
          <dd className="mt-0.5 font-medium">{row.value || <span className="font-normal text-muted-foreground">Removed</span>}</dd>
        </div>
      ))}
      {values.productUrls.length || linksChanged ? (
        <div className="sm:col-span-2">
          <dt className="text-[0.8rem] text-muted-foreground">
            Product links {linksChanged ? changed : null}
          </dt>
          <dd className="mt-0.5 grid gap-1">
            {values.productUrls.map((url) => (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-1 break-all underline">
                {url} <ExternalLink className="size-3.5 shrink-0" aria-hidden />
              </a>
            ))}
            {!values.productUrls.length ? <span className="text-muted-foreground">Removed</span> : null}
          </dd>
        </div>
      ) : null}
      {values.notes || notesChanged ? (
        <div className="sm:col-span-2">
          <dt className="text-[0.8rem] text-muted-foreground">
            Customer notes {notesChanged ? changed : null}
          </dt>
          <dd className="mt-0.5 whitespace-pre-line">{values.notes || <span className="text-muted-foreground">Removed</span>}</dd>
        </div>
      ) : null}
    </dl>
  );
}

function FileTile({ file }: { file: { id: string; originalName: string; contentType: string; size: number } }) {
  const href = `/api/admin/files/${file.id}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-[10px] border border-border bg-white">
      {isPreviewableImage(file.contentType) ? (
        // eslint-disable-next-line @next/next/no-img-element -- private, session-gated file
        <img src={href} alt={file.originalName} className="aspect-[4/3] w-full bg-surface-2 object-cover" loading="lazy" />
      ) : (
        <span className="flex aspect-[4/3] w-full items-center justify-center bg-surface-2 text-muted-foreground">
          {file.contentType === 'application/pdf' ? <FileText className="size-8" /> : <ImageIcon className="size-8" />}
        </span>
      )}
      <span className="block px-2.5 py-2">
        <span className="block truncate text-[0.8rem] font-medium group-hover:underline">{file.originalName}</span>
        <span className="block text-[0.75rem] text-muted-foreground">
          {formatBytes(file.size)}
          {file.contentType === 'image/heic' || file.contentType === 'image/heif' ? ' · HEIC, opens in Photos or Safari' : ''}
        </span>
      </span>
    </a>
  );
}

export default async function SelectionReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin('review_selections');
  const { id } = await params;
  const canSeeMoney = can(admin.role, 'view_financials');
  const sel = await getSelectionForReview(id, canSeeMoney);
  if (!sel) notFound();

  const { requirement } = sel;
  const { portal } = requirement;
  const { quote } = portal;
  const current = valuesOf(sel);
  const latest = sel.revisions[0];
  const showingDraft = sel.status !== 'SUBMITTED' && sel.status !== 'APPROVED' && latest;

  return (
    <>
      <PageHeader
        eyebrow={
          <span className="flex flex-wrap items-center gap-1">
            <Link href="/admin/selections" className="hover:underline">
              Material Selections
            </Link>
            <span aria-hidden>/</span>
            <Link href={`/admin/portals/${portal.id}`} className="hover:underline">
              {portal.title}
            </Link>
          </span>
        }
        title={
          <span className="flex flex-wrap items-center gap-2">
            {requirement.title}
            <Badge tone={statusTone(sel.status)}>{statusLabel(sel.status)}</Badge>
          </span>
        }
        description={
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Link href={`/admin/customers/${quote.client.id}`} className="hover:underline">
              {quote.client.name}
            </Link>
            <span aria-hidden>·</span>
            <Link href={`/admin/quotes/${quote.id}`} className="hover:underline">
              Quote #{quote.quoteNumber}
            </Link>
            <SourceBadge source={quote.source} />
            {requirement.area ? (
              <>
                <span aria-hidden>·</span> {requirement.area}
              </>
            ) : null}
            <span aria-hidden>·</span> {requirement.categoryName}
          </span>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="grid min-w-0 content-start gap-6">
          <Card>
            <CardHeader
              title={showingDraft ? 'Customer’s current draft' : 'Customer’s choice'}
              description={
                sel.submittedAt
                  ? `Last submitted ${formatDateTime(sel.submittedAt)}${latest ? ` · revision ${latest.revisionNumber}` : ''}${showingDraft ? '. The draft below has not been resubmitted yet.' : ''}`
                  : 'Not submitted yet.'
              }
            />
            <div className="grid gap-5 p-5">
              <ValuesList values={current} />
              {sel.attachments.length ? (
                <div>
                  <p className="mb-2 text-[0.8rem] text-muted-foreground">Photos and files</p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                    {sel.attachments.map((file) => (
                      <FileTile key={file.id} file={file} />
                    ))}
                  </div>
                </div>
              ) : null}
              {current.productUrls.length ? (
                <p className="text-[0.75rem] text-muted-foreground">Product links come from the customer and open third-party sites. Nothing is fetched automatically.</p>
              ) : null}
            </div>
          </Card>

          <Card>
            <CardHeader title="What we asked for" />
            <div className="grid gap-3 p-5 text-sm">
              {requirement.instructions ? <p className="whitespace-pre-line">{requirement.instructions}</p> : null}
              {requirement.customerGuidance ? <p className="whitespace-pre-line text-muted-foreground">{requirement.customerGuidance}</p> : null}
              <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {requirement.lineItem ? (
                  <div>
                    <dt className="text-[0.8rem] text-muted-foreground">Quote line item</dt>
                    <dd>{requirement.lineItem.name}</dd>
                  </div>
                ) : null}
                {requirement.quantity !== null ? (
                  <div>
                    <dt className="text-[0.8rem] text-muted-foreground">Quantity</dt>
                    <dd>
                      {requirement.quantity.toLocaleString('en-US')} {requirement.unit ?? ''}
                    </dd>
                  </div>
                ) : null}
                {requirement.allowanceCents !== null ? (
                  <div>
                    <dt className="text-[0.8rem] text-muted-foreground">Allowance (internal)</dt>
                    <dd>{formatMoney(requirement.allowanceCents / 100)}</dd>
                  </div>
                ) : null}
                {requirement.dueDate ? (
                  <div>
                    <dt className="text-[0.8rem] text-muted-foreground">Due</dt>
                    <dd>{formatDate(requirement.dueDate)}</dd>
                  </div>
                ) : null}
                {requirement.preferredOptions.length ? (
                  <div className="sm:col-span-2">
                    <dt className="text-[0.8rem] text-muted-foreground">Suggested options</dt>
                    <dd>{requirement.preferredOptions.join(', ')}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </Card>

          <Card>
            <CardHeader title="Revision history" description="A frozen copy is saved every time the customer submits." />
            {sel.revisions.length ? (
              <ol className="divide-y divide-border">
                {sel.revisions.map((rev, i) => {
                  const previous = sel.revisions[i + 1];
                  return (
                    <li key={rev.id} className="grid gap-3 p-5">
                      <p className="text-sm font-medium">
                        Revision {rev.revisionNumber}
                        <span className="ml-2 font-normal text-muted-foreground">{formatDateTime(rev.submittedAt)}</span>
                      </p>
                      <ValuesList values={rev.snapshot.values} previous={previous?.snapshot.values} />
                      {rev.snapshot.attachments.length ? (
                        <p className="text-[0.8rem] text-muted-foreground">
                          Files: {rev.snapshot.attachments.map((a) => a.originalName).join(', ')}
                        </p>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            ) : (
              <EmptyState title="No submissions yet" className="py-8" />
            )}
          </Card>
        </div>

        <div className="grid content-start gap-6">
          <ReviewPanel selectionId={sel.id} status={sel.status} version={sel.version} portalRevoked={portal.status === 'REVOKED'} />

          <Card>
            <CardHeader title="Review history" />
            {sel.reviews.length ? (
              <ol className="divide-y divide-border">
                {sel.reviews.map((review) => {
                  const label = DECISION_LABEL[review.decision];
                  return (
                    <li key={review.id} className="grid gap-1.5 px-5 py-4 text-sm">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone={label.tone}>{label.label}</Badge>
                        {review.revision ? <span className="text-[0.75rem] text-muted-foreground">rev {review.revision.revisionNumber}</span> : null}
                      </div>
                      {review.customerFeedback ? (
                        <p className="whitespace-pre-line">
                          <span className="text-[0.75rem] text-muted-foreground">To customer: </span>
                          {review.customerFeedback}
                        </p>
                      ) : null}
                      {review.internalNote ? (
                        <p className="whitespace-pre-line text-foreground/80">
                          <span className="text-[0.75rem] text-muted-foreground">Internal: </span>
                          {review.internalNote}
                        </p>
                      ) : null}
                      <p className="text-[0.75rem] text-muted-foreground">
                        {review.reviewer?.name ?? 'Former teammate'} · {formatDateTime(review.createdAt)}
                      </p>
                    </li>
                  );
                })}
              </ol>
            ) : (
              <p className="px-5 py-4 text-sm text-muted-foreground">No reviews yet.</p>
            )}
          </Card>

          <Card>
            <CardHeader title="Activity" />
            {sel.activity.length ? (
              <ol className="divide-y divide-border">
                {sel.activity.map((entry) => (
                  <li key={entry.id} className="px-5 py-3 text-sm">
                    <span className="font-medium">{actorLabel(entry.actorType, entry.actorName)}</span> {activityLabel(entry.action)}
                    <span className="block text-[0.75rem] text-muted-foreground" title={formatDateTime(entry.createdAt)}>
                      {relativeTime(entry.createdAt)}
                    </span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="px-5 py-4 text-sm text-muted-foreground">No activity yet.</p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
