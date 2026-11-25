"use client";

import { ChoiceGroup } from "@/components/form-fields";
import { FilePicker } from "@/components/estimate-request/file-picker";
import { SelectControl, TextControl } from "@/components/estimate-request/controls";
import type { LocalFile } from "@/components/estimate-request/file-types";
import { ADJUSTER_NOTE, agreementAnswers, lossCauses } from "@/lib/estimate-request/options";
import { MAX_ADJUSTER_FILES } from "@/lib/estimate-request/files";
import type { EstimateDraft, FieldErrors } from "@/lib/estimate-request/schema";

const DOC_ACCEPT = "image/*,.pdf,.jpg,.jpeg,.png,.webp,.heic,.heif,application/pdf";

export function StepInsurance({
  values,
  errors,
  files,
  disabled,
  busy,
  fileError,
  onChange,
  onFiles,
  onRemove,
}: {
  values: EstimateDraft;
  errors: FieldErrors;
  files: LocalFile[];
  disabled?: boolean;
  busy?: boolean;
  fileError?: string;
  onChange: (next: EstimateDraft) => void;
  onFiles: (list: FileList) => void;
  onRemove: (id: string) => void;
}) {
  const patch = (partial: Partial<EstimateDraft>) => onChange({ ...values, ...partial });
  return (
    <div className="grid gap-8">
      <ChoiceGroup
        name="claim"
        legend="Is this an insurance claim?"
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        value={values.claim}
        onChange={(claim) => patch({ claim: claim === "yes" ? "yes" : "no" })}
        error={errors.claim}
        disabled={disabled}
        required
      />
      {(values.claim === "yes" || values.rooms.some((room) => room.trades.includes("water") || room.trades.includes("fire"))) && (
        <TextControl
          id="lossDate"
          label="Date of loss"
          type="date"
          value={values.lossDate}
          onChange={(lossDate) => patch({ lossDate })}
          error={errors.lossDate}
          required={values.claim === "yes"}
          optional={values.claim !== "yes"}
          hint="Asked once here, and reused for water or fire rooms."
          disabled={disabled}
        />
      )}
      {values.claim === "yes" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <TextControl id="carrier" label="Insurance carrier" value={values.carrier} onChange={(carrier) => patch({ carrier })} error={errors.carrier} required disabled={disabled} />
          <TextControl id="claimNumber" label="Claim number" value={values.claimNumber} onChange={(claimNumber) => patch({ claimNumber })} error={errors.claimNumber} required disabled={disabled} />
          <SelectControl id="cause" label="Cause" value={values.cause} onChange={(cause) => patch({ cause: cause as EstimateDraft["cause"] })} error={errors.cause} required disabled={disabled}>
            <option value="">Select</option>
            {lossCauses.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectControl>
          {values.cause === "other" && (
            <div className="sm:col-span-2">
              <TextControl id="causeOther" label="Describe the cause" value={values.causeOther} onChange={(causeOther) => patch({ causeOther })} error={errors.causeOther} required disabled={disabled} />
            </div>
          )}
          <div className="sm:col-span-2">
            <p className="text-sm leading-relaxed text-muted-foreground">The adjuster name, phone, and email help us talk with them.</p>
            <label className="mt-3 flex items-start gap-3 text-sm leading-relaxed">
              <input
                id="adjusterLater"
                type="checkbox"
                className="mt-1 size-4 accent-accent"
                checked={values.adjusterLater}
                disabled={disabled}
                onChange={(event) => patch({ adjusterLater: event.target.checked })}
              />
              <span>{"I don't have this yet"}</span>
            </label>
          </div>
          {!values.adjusterLater && (
            <>
              <TextControl id="adjusterName" label="Adjuster name" value={values.adjusterName} onChange={(adjusterName) => patch({ adjusterName })} error={errors.adjusterName} required disabled={disabled} />
              <TextControl id="adjusterPhone" label="Adjuster phone" type="tel" value={values.adjusterPhone} onChange={(adjusterPhone) => patch({ adjusterPhone })} error={errors.adjusterPhone} required disabled={disabled} />
              <div className="sm:col-span-2">
                <TextControl id="adjusterEmail" label="Adjuster email" type="email" value={values.adjusterEmail} onChange={(adjusterEmail) => patch({ adjusterEmail })} error={errors.adjusterEmail} required disabled={disabled} />
              </div>
            </>
          )}
          <div className="sm:col-span-2">
            <ChoiceGroup
              name="adjusterInspected"
              legend="Has the adjuster inspected?"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              value={values.adjusterInspected}
              onChange={(adjusterInspected) => patch({ adjusterInspected: adjusterInspected === "yes" ? "yes" : "no" })}
              error={errors.adjusterInspected}
              disabled={disabled}
              required
            />
          </div>
          <TextControl id="deductible" label="Deductible" value={values.deductible} onChange={(deductible) => patch({ deductible })} error={errors.deductible} optional hint="Dollar amount, if you know it." disabled={disabled} />
          <div className="sm:col-span-2">
            <p className="text-sm leading-relaxed text-muted-foreground">{ADJUSTER_NOTE}</p>
            <div className="mt-4">
              <FilePicker
                id="adjuster-files"
                files={files}
                max={MAX_ADJUSTER_FILES}
                accept={DOC_ACCEPT}
                addLabel="Add estimate"
                hint="PDF or photos of the adjuster's estimate. Optional."
                disabled={disabled}
                busy={busy}
                error={fileError}
                onFiles={onFiles}
                onRemove={onRemove}
              />
            </div>
          </div>
        </div>
      )}
      <ChoiceGroup
        name="agreement"
        legend="Have you signed a work agreement with Elite Restorations yet?"
        options={agreementAnswers}
        value={values.agreement}
        onChange={(agreement) => patch({ agreement: agreement as EstimateDraft["agreement"] })}
        disabled={disabled}
      />
    </div>
  );
}
