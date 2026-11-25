"use client";

import Link from "next/link";

import { summarize } from "@/lib/estimate-request/summary";
import type { EstimateDraft, EstimateSubmission, FieldErrors } from "@/lib/estimate-request/schema";

export function StepReview({
  submission,
  errors,
  disabled,
  onChange,
  onEdit,
}: {
  submission: EstimateSubmission;
  errors: FieldErrors;
  disabled?: boolean;
  onChange: (consent: boolean) => void;
  onEdit: (step: number) => void;
}) {
  const sections = summarize(submission);
  const thinPhotos = submission.rooms.filter((room) => photoCount(room.files) < 4);
  return (
    <div className="grid gap-8">
      {thinPhotos.length > 0 && (
        <div className="border border-border bg-surface/70 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
          {thinPhotos.map((room) => (
            <p key={room.id}>
              {room.name || "A room"} has {photoCount(room.files)} photo{photoCount(room.files) === 1 ? "" : "s"}. Four or more wide shots and close-ups help. You can still send this.
            </p>
          ))}
        </div>
      )}
      {sections.map((section) => (
        <section key={section.title} className="border-t border-border pt-5">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-3xl leading-tight">{section.title}</h3>
            <button type="button" onClick={() => onEdit(section.step)} className="text-sm underline decoration-foreground/30 underline-offset-[0.35em] hover:decoration-accent-ink">
              Edit
            </button>
          </div>
          <dl className="mt-4 grid gap-4">
            {section.rows.map((row, index) => (
              <div key={`${section.title}-${row.label}-${index}`}>
                <dt className="eyebrow text-muted-foreground">{row.label}</dt>
                <dd className="mt-2 whitespace-pre-line leading-relaxed">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      <div data-field="consent">
        <label className="flex items-start gap-3 text-sm leading-relaxed">
          <input
            type="checkbox"
            className="mt-1 size-4 accent-accent"
            checked={submission.consent}
            disabled={disabled}
            onChange={(event) => onChange(event.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>
            I agree Elite Restorations may use this information, including photos and files, to prepare an estimate and to contact me. We do not sell this information.
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" role="alert" className="mt-2 text-sm text-accent-ink">
            {errors.consent}
          </p>
        )}
        <p className="mt-3 text-sm text-muted-foreground">
          <Link href="/privacy" className="underline decoration-foreground/30 underline-offset-[0.35em] hover:decoration-accent-ink">
            Privacy
          </Link>
          {" · "}
          <Link href="/terms" className="underline decoration-foreground/30 underline-offset-[0.35em] hover:decoration-accent-ink">
            Terms
          </Link>
        </p>
      </div>
    </div>
  );
}

function photoCount(files: { name: string }[]) {
  return files.filter((file) => !/\.(mp4|webm|mov|pdf)$/i.test(file.name)).length;
}

export function reviewSubmission(draft: EstimateDraft, extras: Pick<EstimateSubmission, "rooms" | "adjusterFiles" | "submissionId" | "accessKey" | "website" | "startedAt" | "pageUrl">): EstimateSubmission {
  return { ...draft, ...extras, consent: draft.consent };
}
