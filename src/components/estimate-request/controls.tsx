"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

import { Field } from "@/components/form-fields";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const selectClass =
  "h-12 w-full appearance-none rounded-none border-0 border-b border-input bg-transparent py-2 pr-8 text-base outline-none transition-colors focus-visible:border-accent-ink disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-accent-ink";

function described(id: string, error?: string, hint?: boolean) {
  const ids = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ");
  return {
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": ids || undefined,
  };
}

export function TextControl({
  id,
  field,
  label,
  value,
  onChange,
  error,
  hint,
  optional,
  required,
  type = "text",
  autoComplete,
  inputMode,
  maxLength,
  disabled,
}: {
  id: string;
  field?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  optional?: boolean;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
  disabled?: boolean;
}) {
  return (
    <Field id={id} field={field ?? id} label={label} error={error} hint={hint} optional={optional} required={required}>
      <Input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        disabled={disabled}
        {...described(id, error, Boolean(hint))}
      />
    </Field>
  );
}

export function AreaControl({
  id,
  field,
  label,
  value,
  onChange,
  error,
  hint,
  optional,
  required,
  disabled,
  rows = 4,
}: {
  id: string;
  field?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  optional?: boolean;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}) {
  return (
    <Field id={id} field={field ?? id} label={label} error={error} hint={hint} optional={optional} required={required}>
      <Textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        disabled={disabled}
        {...described(id, error, Boolean(hint))}
      />
    </Field>
  );
}

export function SelectControl({
  id,
  field,
  label,
  value,
  onChange,
  error,
  hint,
  optional,
  required,
  disabled,
  children,
}: {
  id: string;
  field?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  optional?: boolean;
  required?: boolean;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <Field id={id} field={field ?? id} label={label} error={error} hint={hint} optional={optional} required={required}>
      <div className="relative">
        <select
          id={id}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className={selectClass}
          {...described(id, error, Boolean(hint))}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
      </div>
    </Field>
  );
}

export function CheckCards({
  legend,
  field,
  options,
  selected,
  onToggle,
  error,
  disabled,
}: {
  legend: string;
  field: string;
  options: readonly { value: string; label: string }[];
  selected: readonly string[];
  onToggle: (value: string) => void;
  error?: string;
  disabled?: boolean;
}) {
  const errorId = `${field}-error`;
  return (
    <fieldset data-field={field} aria-invalid={error ? true : undefined} aria-describedby={error ? errorId : undefined} disabled={disabled}>
      <legend className="eyebrow text-muted-foreground">{legend}</legend>
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const checked = selected.includes(option.value);
          return (
            <label
              key={option.value}
              className={cn(
                "flex min-h-11 cursor-pointer items-center gap-3 border px-3 py-2 text-sm transition-colors",
                checked ? "border-foreground bg-foreground text-background" : "border-input hover:border-foreground",
              )}
            >
              <input
                type="checkbox"
                className="size-4 accent-background"
                checked={checked}
                onChange={() => onToggle(option.value)}
              />
              {option.label}
            </label>
          );
        })}
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-3 text-sm text-accent-ink">
          {error}
        </p>
      )}
    </fieldset>
  );
}
