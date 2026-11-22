'use client';

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CalendarClock, GripVertical, Paperclip, Pencil, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import {
  emptyDraft,
  RequirementDialog,
  type CategoryOption,
  type LineItemOption,
  type RequirementDraft,
} from '@/components/admin/portal/requirement-dialog';
import { Badge, Button, Card, CardHeader, EmptyState, Notice } from '@/components/admin/ui';
import { formatDate, formatMoney } from '@/lib/activity-labels';
import { statusLabel, statusTone, type SelectionStatus } from '@/lib/selections/status';
import { cn } from '@/lib/utils';
import { removeRequirementAction, reorderRequirementsAction } from '@/server/portal/admin-actions';

export type RequirementItem = {
  id: string;
  title: string;
  categoryId: string | null;
  categoryName: string;
  lineItemId: string | null;
  lineItemName: string | null;
  area: string | null;
  instructions: string | null;
  customerGuidance: string | null;
  required: boolean;
  quantity: number | null;
  unit: string | null;
  allowanceCents: number | null;
  preferredOptions: string[];
  enabledFields: string[];
  dueDate: string | null;
  selection: { id: string; status: SelectionStatus; revisions: number; attachments: number } | null;
};

function toDraft(item: RequirementItem): RequirementDraft {
  return {
    id: item.id,
    categoryId: item.categoryId,
    lineItemId: item.lineItemId,
    title: item.title,
    area: item.area ?? '',
    instructions: item.instructions ?? '',
    customerGuidance: item.customerGuidance ?? '',
    required: item.required,
    quantity: item.quantity?.toString() ?? '',
    unit: item.unit ?? '',
    allowance: item.allowanceCents !== null ? (item.allowanceCents / 100).toFixed(2) : '',
    preferredOptions: item.preferredOptions.join('\n'),
    enabledFields: item.enabledFields,
    dueDate: item.dueDate?.slice(0, 10) ?? '',
  };
}

export function RequirementList({
  portalId,
  items,
  categories,
  lineItems,
  editable,
  canSeeMoney,
}: {
  portalId: string;
  items: RequirementItem[];
  categories: CategoryOption[];
  lineItems: LineItemOption[];
  editable: boolean;
  canSeeMoney: boolean;
}) {
  const router = useRouter();
  const [order, setOrder] = useState(items);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [dialog, setDialog] = useState<{ key: number; draft: RequirementDraft } | null>(null);
  const [removing, setRemoving] = useState<RequirementItem | null>(null);
  const [pending, start] = useTransition();
  const [syncedItems, setSyncedItems] = useState(items);
  if (items !== syncedItems) {
    setSyncedItems(items);
    setOrder(items);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const previous = order;
    const next = arrayMove(order, order.findIndex((i) => i.id === active.id), order.findIndex((i) => i.id === over.id));
    setOrder(next);
    start(async () => {
      const result = await reorderRequirementsAction(portalId, next.map((i) => i.id));
      if (!result.ok) {
        setOrder(previous);
        setMessage({ ok: false, text: result.message });
      }
      router.refresh();
    });
  };

  const remove = (item: RequirementItem) =>
    start(async () => {
      setRemoving(null);
      const result = await removeRequirementAction(portalId, item.id);
      setMessage({ ok: result.ok, text: result.message });
      router.refresh();
    });

  const openNew = () => setDialog({ key: Date.now(), draft: emptyDraft(categories.find((c) => c.active)) });

  return (
    <Card>
      <CardHeader
        title="Selections"
        description={editable ? 'Drag to reorder. The customer sees them in this order.' : `${order.length} selections`}
        action={
          editable ? (
            <Button size="sm" onClick={openNew}>
              <Plus /> Add selection
            </Button>
          ) : null
        }
      />
      {message ? (
        <Notice tone={message.ok ? 'success' : 'danger'} className="mx-4 mt-4">
          {message.text}
        </Notice>
      ) : null}
      {order.length === 0 ? (
        <EmptyState
          title="No selections yet"
          description="Add what the customer needs to choose, like flooring or a paint color."
          action={
            editable ? (
              <Button variant="secondary" onClick={openNew}>
                <Plus /> Add selection
              </Button>
            ) : null
          }
        />
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={order.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            <ul className={cn('divide-y divide-border', pending && 'opacity-80')}>
              {order.map((item) => (
                <SortableRow
                  key={item.id}
                  item={item}
                  editable={editable}
                  canSeeMoney={canSeeMoney}
                  onEdit={() => setDialog({ key: Date.now(), draft: toDraft(item) })}
                  onRemove={() => setRemoving(item)}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}

      {dialog ? (
        <RequirementDialog
          key={dialog.key}
          portalId={portalId}
          open
          onOpenChange={(open) => !open && setDialog(null)}
          initial={dialog.draft}
          categories={categories}
          lineItems={lineItems}
          canSeeMoney={canSeeMoney}
          onSaved={(text) => {
            setMessage({ ok: true, text });
            router.refresh();
          }}
        />
      ) : null}
      <ConfirmDialog
        open={Boolean(removing)}
        onOpenChange={(open) => !open && setRemoving(null)}
        title={`Remove “${removing?.title}”?`}
        description={
          removing?.selection && removing.selection.status !== 'NOT_STARTED'
            ? `The customer already started this selection. Removing it deletes their answers${removing.selection.attachments ? ` and ${removing.selection.attachments} uploaded file(s)` : ''}. This can't be undone.`
            : 'The customer will no longer see this selection.'
        }
        confirmLabel="Remove"
        danger
        onConfirm={() => removing && remove(removing)}
      />
    </Card>
  );
}

function SortableRow({
  item,
  editable,
  canSeeMoney,
  onEdit,
  onRemove,
}: {
  item: RequirementItem;
  editable: boolean;
  canSeeMoney: boolean;
  onEdit: () => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    disabled: !editable,
  });
  const status = item.selection?.status ?? 'NOT_STARTED';

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn('flex items-start gap-2 bg-white px-3 py-3 sm:px-4', isDragging && 'relative z-10 shadow-lg ring-1 ring-border')}
    >
      {editable ? (
        <button
          ref={setActivatorNodeRef}
          type="button"
          className="mt-0.5 flex size-8 shrink-0 cursor-grab touch-none items-center justify-center rounded-[6px] text-muted-foreground hover:bg-surface-2 active:cursor-grabbing"
          aria-label={`Reorder ${item.title}`}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="size-4" />
        </button>
      ) : null}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium">{item.title}</span>
          <Badge tone={statusTone(status)}>{statusLabel(status)}</Badge>
          {!item.required ? <Badge>Optional</Badge> : null}
        </div>
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[0.8rem] text-muted-foreground">
          <span>{item.categoryName}</span>
          {item.area ? <span>{item.area}</span> : null}
          {item.quantity ? (
            <span>
              {item.quantity} {item.unit}
            </span>
          ) : null}
          {canSeeMoney && item.allowanceCents !== null ? <span>Allowance {formatMoney(item.allowanceCents / 100)}</span> : null}
          {item.dueDate ? (
            <span className="inline-flex items-center gap-1">
              <CalendarClock className="size-3.5" /> Due {formatDate(new Date(item.dueDate))}
            </span>
          ) : null}
          {item.selection?.attachments ? (
            <span className="inline-flex items-center gap-1">
              <Paperclip className="size-3.5" /> {item.selection.attachments}
            </span>
          ) : null}
          {item.lineItemName ? <span className="truncate">From “{item.lineItemName}”</span> : null}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        {item.selection && status !== 'NOT_STARTED' ? (
          <Link
            href={`/admin/selections/${item.selection.id}`}
            className="hidden h-8 items-center rounded-[8px] px-3 text-[0.8rem] font-medium hover:bg-surface-2 sm:inline-flex"
          >
            {status === 'SUBMITTED' ? 'Review' : 'View'}
          </Link>
        ) : null}
        {editable ? (
          <>
            <Button variant="ghost" size="icon" className="size-8" onClick={onEdit} aria-label={`Edit ${item.title}`}>
              <Pencil />
            </Button>
            <Button variant="ghost" size="icon" className="size-8 text-accent-ink" onClick={onRemove} aria-label={`Remove ${item.title}`}>
              <Trash2 />
            </Button>
          </>
        ) : null}
      </div>
    </li>
  );
}
