'use client';

import { Field } from '@/components/form-fields';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  AFFECTED_MATERIALS,
  MOVED_LIMIT,
  lossFieldStatus,
  type LossState,
  type MaterialKey,
} from '@/lib/claim-packet';
import { cn } from '@/lib/utils';

type LossFactsProps = {
  idPrefix: string;
  loss: LossState;
  onChange: (patch: Partial<LossState>) => void;
};

function chipClass(on: boolean) {
  return cn(
    'inline-flex min-h-11 items-center border px-5 py-2 text-left text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300',
    'hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink',
    on ? 'border-accent bg-accent text-white' : 'border-input',
  );
}

function WaterFields({ idPrefix, loss, onChange }: LossFactsProps) {
  return (
    <div>
      <div className="grid gap-8 sm:grid-cols-2">
        <Field
          id={`${idPrefix}-started`}
          label="When the water started"
          optional
        >
          <Input
            id={`${idPrefix}-started`}
            type="datetime-local"
            value={loss.waterStarted}
            onChange={(event) => onChange({ waterStarted: event.target.value })}
          />
        </Field>
        <Field
          id={`${idPrefix}-stopped`}
          label="When it stopped"
          optional
          hint={
            loss.stillComingIn
              ? 'Cleared while water is still coming in.'
              : undefined
          }
        >
          <Input
            id={`${idPrefix}-stopped`}
            type="datetime-local"
            value={loss.waterStopped}
            disabled={loss.stillComingIn}
            onChange={(event) =>
              onChange({
                waterStopped: event.target.value,
                stillComingIn: event.target.value ? false : loss.stillComingIn,
              })
            }
          />
        </Field>
      </div>
      <button
        type="button"
        aria-pressed={loss.stillComingIn}
        onClick={() =>
          onChange(
            loss.stillComingIn
              ? { stillComingIn: false }
              : { stillComingIn: true, waterStopped: '' },
          )
        }
        className={cn('mt-4', chipClass(loss.stillComingIn))}
      >
        Still coming in
      </button>
    </div>
  );
}

function MovedFields({ idPrefix, loss, onChange }: LossFactsProps) {
  return (
    <div>
      <Field id={`${idPrefix}-moved`} label="What was moved" optional>
        <Textarea
          id={`${idPrefix}-moved`}
          rows={3}
          maxLength={MOVED_LIMIT}
          disabled={loss.nothingMoved}
          placeholder="Sofa and rug from the living room…"
          value={loss.moved}
          onChange={(event) =>
            onChange({
              moved: event.target.value,
              nothingMoved: event.target.value.trim()
                ? false
                : loss.nothingMoved,
            })
          }
        />
      </Field>
      {!loss.nothingMoved && (
        <p className="mt-1 text-right text-xs text-muted-foreground">
          {loss.moved.length} / {MOVED_LIMIT}
        </p>
      )}
      <button
        type="button"
        aria-pressed={loss.nothingMoved}
        onClick={() =>
          onChange(
            loss.nothingMoved
              ? { nothingMoved: false }
              : { nothingMoved: true, moved: '' },
          )
        }
        className={cn('mt-4', chipClass(loss.nothingMoved))}
      >
        Nothing was moved
      </button>
    </div>
  );
}

function MaterialsFields({ loss, onChange }: LossFactsProps) {
  function toggle(key: MaterialKey) {
    const selected = new Set(loss.materials);
    if (selected.has(key)) selected.delete(key);
    else selected.add(key);
    onChange({
      materials: AFFECTED_MATERIALS.map((item) => item.value).filter((value) =>
        selected.has(value),
      ),
    });
  }

  return (
    <fieldset>
      <legend className="eyebrow text-muted-foreground">
        Materials affected{' '}
        <span className="normal-case tracking-normal opacity-70">
          (optional)
        </span>
      </legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {AFFECTED_MATERIALS.map((item) => {
          const on = loss.materials.includes(item.value);
          return (
            <button
              key={item.value}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(item.value)}
              className={chipClass(on)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Added({ on }: { on: boolean }) {
  if (!on) return null;
  return <p className="eyebrow mt-4 text-accent-ink">Added to the packet</p>;
}

export function LossFactRows(props: LossFactsProps) {
  const status = lossFieldStatus(props.loss);
  return (
    <>
      <li className="border border-border p-4 sm:p-5">
        <WaterFields {...props} />
        <Added on={status.times} />
      </li>
      <li className="border border-border p-4 sm:p-5">
        <MovedFields {...props} />
        <Added on={status.moved} />
      </li>
      <li className="border border-border p-4 sm:p-5">
        <MaterialsFields {...props} />
        <Added on={status.materials} />
      </li>
    </>
  );
}

export function LossFacts(props: LossFactsProps) {
  return (
    <div className="mt-10 space-y-10">
      <WaterFields {...props} />
      <MovedFields {...props} />
      <MaterialsFields {...props} />
    </div>
  );
}
