"use client";

import { ChoiceGroup } from "@/components/form-fields";
import { AreaControl, SelectControl } from "@/components/estimate-request/controls";
import { ACCESS_NOTE, budgetRanges, contactMethods, contactTimes, finishLevels, materialSources, startWindows } from "@/lib/estimate-request/options";
import type { EstimateDraft, FieldErrors } from "@/lib/estimate-request/schema";

export function StepProject({
  values,
  errors,
  disabled,
  onChange,
}: {
  values: EstimateDraft;
  errors: FieldErrors;
  disabled?: boolean;
  onChange: (next: EstimateDraft) => void;
}) {
  const patch = (partial: Partial<EstimateDraft>) => onChange({ ...values, ...partial });
  return (
    <div className="grid gap-8">
      <ChoiceGroup name="finish" legend="Finish level" options={finishLevels} value={values.finish} onChange={(finish) => patch({ finish: finish as EstimateDraft["finish"] })} error={errors.finish} disabled={disabled} required />
      <ChoiceGroup name="startWhen" legend="Desired start" options={startWindows} value={values.startWhen} onChange={(startWhen) => patch({ startWhen: startWhen as EstimateDraft["startWhen"] })} error={errors.startWhen} disabled={disabled} required />
      <SelectControl id="budget" label="Budget range" value={values.budget} onChange={(budget) => patch({ budget: budget as EstimateDraft["budget"] })} error={errors.budget} required disabled={disabled}>
        <option value="">Select</option>
        {budgetRanges.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectControl>
      <ChoiceGroup name="materials" legend="Materials supplied by" options={materialSources} value={values.materials} onChange={(materials) => patch({ materials: materials as EstimateDraft["materials"] })} error={errors.materials} disabled={disabled} required />
      <ChoiceGroup
        name="occupied"
        legend="Will anyone be living there during the work?"
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        value={values.occupied}
        onChange={(occupied) => patch({ occupied: occupied === "no" ? "no" : "yes" })}
        error={errors.occupied}
        disabled={disabled}
        required
      />
      <ChoiceGroup
        name="pets"
        legend="Pets on the property?"
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        value={values.pets}
        onChange={(pets) => patch({ pets: pets === "yes" ? "yes" : "no" })}
        error={errors.pets}
        disabled={disabled}
        required
      />
      {values.pets === "yes" && (
        <AreaControl id="petNotes" label="What pets, and where will they be?" value={values.petNotes} onChange={(petNotes) => patch({ petNotes })} error={errors.petNotes} optional disabled={disabled} rows={3} />
      )}
      <AreaControl id="accessNotes" label="Gate, HOA, or access notes" value={values.accessNotes} onChange={(accessNotes) => patch({ accessNotes })} error={errors.accessNotes} hint={ACCESS_NOTE} optional disabled={disabled} rows={3} />
      <ChoiceGroup name="bestTime" legend="Best time to contact you" options={contactTimes} value={values.bestTime} onChange={(bestTime) => patch({ bestTime: bestTime as EstimateDraft["bestTime"] })} error={errors.bestTime} disabled={disabled} required />
      <ChoiceGroup name="contactMethod" legend="How should we reach you?" options={contactMethods} value={values.contactMethod} onChange={(contactMethod) => patch({ contactMethod: contactMethod as EstimateDraft["contactMethod"] })} error={errors.contactMethod} disabled={disabled} required />
    </div>
  );
}
