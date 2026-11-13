import * as React from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function Field({
  id,
  field,
  label,
  error,
  optional,
  hint,
  children,
}: {
  id: string;
  /** Schema key used to move focus to the first invalid field. Defaults to `id`. */
  field?: string;
  label: string;
  error?: string;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  return (
    <div data-field={field ?? id}>
      <Label htmlFor={id}>
        {label}
        {optional && <span className="normal-case tracking-normal opacity-70">(optional)</span>}
      </Label>
      {hint && (
        <p id={hintId} className="mt-2 text-sm text-muted-foreground">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-sm text-accent-ink">
          {error}
        </p>
      )}
    </div>
  );
}

type Choice = { value: string; label: string };

export function ChoiceGroup({
  name,
  field,
  legend,
  options,
  value,
  onChange,
  error,
  disabled,
  required,
}: {
  name: string;
  /** Schema key used to move focus to the first invalid field. Defaults to `name`. */
  field?: string;
  legend: string;
  options: readonly Choice[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}) {
  const errorId = `${name}-error`;
  return (
    <fieldset
      data-field={field ?? name}
      aria-required={required || undefined}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? errorId : undefined}
      disabled={disabled}
    >
      <legend className="eyebrow text-muted-foreground">{legend}</legend>
      <div className="mt-4 flex flex-wrap gap-3">
        {options.map((option) => (
          <label key={option.value} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <span
              className={cn(
                "inline-flex min-h-11 items-center border border-input px-5 py-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300",
                "hover:border-foreground peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white",
                "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-ink",
                error && "border-accent-ink",
              )}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-3 text-sm text-accent-ink">
          {error}
        </p>
      )}
    </fieldset>
  );
}
