import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";

/* Primitives for /admin and /portal. The public site's square, uppercase
   controls stay on the public pages; these are rounded and sentence-case. */

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-[12px] border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04)]", className)}
      {...props}
    />
  );
}

export function CardHeader({
  title,
  description,
  action,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4", className)}>
      <div className="min-w-0">
        <h2 className="text-[0.95rem] font-semibold tracking-tight">{title}</h2>
        {description ? <p className="mt-0.5 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

const buttonBase =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-[8px] text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0";

const buttonVariants = {
  primary: "bg-foreground text-white hover:bg-foreground/85",
  secondary: "border border-input bg-white text-foreground hover:bg-surface-2",
  ghost: "text-foreground hover:bg-surface-2",
  danger: "bg-accent text-white hover:bg-accent-ink",
  "danger-outline": "border border-accent/40 bg-white text-accent-ink hover:bg-accent/5",
} as const;

const buttonSizes = {
  sm: "h-8 px-3 text-[0.8rem]",
  md: "h-10 px-4",
  lg: "h-12 px-5 text-base",
  icon: "size-9",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;
export type ButtonSize = keyof typeof buttonSizes;

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(buttonBase, buttonVariants[variant], buttonSizes[size], className);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: React.ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return <button type={type} className={buttonClass(variant, size, className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ComponentProps<typeof Link> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return <Link className={buttonClass(variant, size, className)} {...props} />;
}

const controlClass =
  "w-full rounded-[8px] border border-input bg-white px-3 text-sm text-foreground shadow-[inset_0_1px_1px_rgba(0,0,0,0.03)] outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground/50 focus:ring-2 focus:ring-foreground/10 disabled:cursor-not-allowed disabled:bg-surface-2 disabled:opacity-70 aria-invalid:border-accent";

export function TextInput({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(controlClass, "h-10", className)} {...props} />;
}

export function TextArea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(controlClass, "min-h-24 py-2 leading-relaxed", className)} {...props} />;
}

export function SelectInput({ className, ...props }: React.ComponentProps<"select">) {
  return <select className={cn(controlClass, "h-10 pr-8", className)} {...props} />;
}

export function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
  className,
}: {
  label: React.ReactNode;
  htmlFor?: string;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-[0.8rem] font-medium text-foreground">
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-[0.8rem] text-accent-ink" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-[0.8rem] text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

const tones = {
  neutral: "bg-surface-2 text-foreground/80 ring-foreground/10",
  info: "bg-sky-50 text-sky-800 ring-sky-700/15",
  warning: "bg-amber-50 text-amber-800 ring-amber-700/20",
  success: "bg-emerald-50 text-emerald-800 ring-emerald-700/15",
  danger: "bg-red-50 text-red-800 ring-red-700/15",
  dark: "bg-foreground text-white ring-foreground",
} as const;

export type Tone = keyof typeof tones;

export function Badge({ tone = "neutral", className, ...props }: React.ComponentProps<"span"> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.75rem] font-medium whitespace-nowrap ring-1 ring-inset",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  eyebrow?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow ? <div className="mb-1 text-[0.8rem] text-muted-foreground">{eyebrow}</div> : null}
        <h1 className="text-2xl font-semibold tracking-tight md:text-[1.7rem]">{title}</h1>
        {description ? <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center px-6 py-14 text-center", className)}>
      {icon ? (
        <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-surface-2 text-muted-foreground [&_svg]:size-5">
          {icon}
        </div>
      ) : null}
      <p className="font-medium">{title}</p>
      {description ? <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-[8px] bg-foreground/[0.07]", className)} />;
}

export function Notice({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: "info" | "warning" | "danger" | "success";
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  const styles = {
    info: "border-sky-700/15 bg-sky-50 text-sky-900",
    warning: "border-amber-700/20 bg-amber-50 text-amber-900",
    danger: "border-red-700/20 bg-red-50 text-red-900",
    success: "border-emerald-700/15 bg-emerald-50 text-emerald-900",
  }[tone];
  return (
    <div className={cn("rounded-[10px] border px-4 py-3 text-sm", styles, className)} role="status">
      {title ? <p className="font-medium">{title}</p> : null}
      {children ? <div className={cn(title && "mt-0.5", "opacity-90")}>{children}</div> : null}
    </div>
  );
}

export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full border-collapse text-left text-sm", className)} {...props} />
    </div>
  );
}

export function Th({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "border-b border-border bg-surface-2/50 px-4 py-2.5 text-[0.75rem] font-medium whitespace-nowrap text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function Td({ className, ...props }: React.ComponentProps<"td">) {
  return <td className={cn("border-b border-border px-4 py-3 align-top", className)} {...props} />;
}

export function Stat({
  label,
  value,
  hint,
  icon,
  href,
}: {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
}) {
  const body = (
    <Card className={cn("h-full p-5", href && "transition-colors hover:border-foreground/25")}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-[0.8rem] text-muted-foreground">{label}</p>
        {icon ? <span className="text-muted-foreground [&_svg]:size-4">{icon}</span> : null}
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums">{value}</p>
      {hint ? <p className="mt-1 text-[0.8rem] text-muted-foreground">{hint}</p> : null}
    </Card>
  );
  return href ? (
    <Link href={href} className="block rounded-[12px] outline-none focus-visible:ring-2 focus-visible:ring-foreground/30">
      {body}
    </Link>
  ) : (
    body
  );
}
