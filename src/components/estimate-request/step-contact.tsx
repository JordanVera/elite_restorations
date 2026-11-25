"use client";

import { ChoiceGroup } from "@/components/form-fields";
import { SelectControl, TextControl } from "@/components/estimate-request/controls";
import { TEXT_OPT_IN, US_STATES, STATE_NAMES, hearAbout, propertyTypes, roles, stories } from "@/lib/estimate-request/options";
import type { AddressDraft, EstimateDraft, FieldErrors } from "@/lib/estimate-request/schema";

function AddressFields({
  prefix,
  legend,
  value,
  errors,
  disabled,
  onChange,
}: {
  prefix: "serviceAddress" | "billingAddress";
  legend: string;
  value: AddressDraft;
  errors: FieldErrors;
  disabled?: boolean;
  onChange: (next: AddressDraft) => void;
}) {
  const patch = (partial: Partial<AddressDraft>) => onChange({ ...value, ...partial });
  return (
    <fieldset className="grid gap-5 sm:grid-cols-2">
      <legend className="eyebrow mb-4 text-foreground sm:col-span-2">{legend}</legend>
      <div className="sm:col-span-2">
        <TextControl
          id={`${prefix}-street`}
          field={`${prefix}.street`}
          label="Street"
          value={value.street}
          onChange={(street) => patch({ street })}
          error={errors[`${prefix}.street`]}
          required
          autoComplete="street-address"
          disabled={disabled}
        />
      </div>
      <TextControl
        id={`${prefix}-unit`}
        field={`${prefix}.unit`}
        label="Unit"
        value={value.unit}
        onChange={(unit) => patch({ unit })}
        error={errors[`${prefix}.unit`]}
        optional
        autoComplete="address-line2"
        disabled={disabled}
      />
      <TextControl
        id={`${prefix}-city`}
        field={`${prefix}.city`}
        label="City"
        value={value.city}
        onChange={(city) => patch({ city })}
        error={errors[`${prefix}.city`]}
        required
        autoComplete="address-level2"
        disabled={disabled}
      />
      <SelectControl
        id={`${prefix}-state`}
        field={`${prefix}.state`}
        label="State"
        value={value.state}
        onChange={(state) => {
          if ((US_STATES as readonly string[]).includes(state)) patch({ state: state as AddressDraft["state"] });
        }}
        error={errors[`${prefix}.state`]}
        required
        disabled={disabled}
      >
        {US_STATES.map((state) => (
          <option key={state} value={state}>
            {STATE_NAMES[state]}
          </option>
        ))}
      </SelectControl>
      <TextControl
        id={`${prefix}-zip`}
        field={`${prefix}.zip`}
        label="ZIP"
        value={value.zip}
        onChange={(zip) => patch({ zip })}
        error={errors[`${prefix}.zip`]}
        required
        inputMode="numeric"
        autoComplete="postal-code"
        maxLength={10}
        disabled={disabled}
      />
    </fieldset>
  );
}

export function StepContact({
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
      <div className="grid gap-5 sm:grid-cols-2">
        <TextControl id="firstName" label="First name" value={values.firstName} onChange={(firstName) => patch({ firstName })} error={errors.firstName} required autoComplete="given-name" disabled={disabled} />
        <TextControl id="lastName" label="Last name" value={values.lastName} onChange={(lastName) => patch({ lastName })} error={errors.lastName} required autoComplete="family-name" disabled={disabled} />
        <div className="sm:col-span-2">
          <TextControl id="company" label="Company" value={values.company} onChange={(company) => patch({ company })} error={errors.company} optional autoComplete="organization" disabled={disabled} />
        </div>
        <TextControl id="mobilePhone" label="Mobile phone" value={values.mobilePhone} onChange={(mobilePhone) => patch({ mobilePhone })} error={errors.mobilePhone} required type="tel" autoComplete="tel" disabled={disabled} />
        <TextControl id="secondPhone" label="Second phone" value={values.secondPhone} onChange={(secondPhone) => patch({ secondPhone })} error={errors.secondPhone} optional type="tel" autoComplete="tel" disabled={disabled} />
        <div className="sm:col-span-2">
          <TextControl id="email" label="Email" value={values.email} onChange={(email) => patch({ email })} error={errors.email} required type="email" autoComplete="email" disabled={disabled} />
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm leading-relaxed">
        <input
          type="checkbox"
          className="mt-1 size-4 accent-accent"
          checked={values.textOptIn}
          disabled={disabled}
          onChange={(event) => patch({ textOptIn: event.target.checked })}
        />
        <span>{TEXT_OPT_IN}</span>
      </label>

      <AddressFields
        prefix="serviceAddress"
        legend="Service address"
        value={values.serviceAddress}
        errors={errors}
        disabled={disabled}
        onChange={(serviceAddress) => patch({ serviceAddress })}
      />

      <ChoiceGroup
        name="billingSame"
        legend="Billing same as service?"
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        value={values.billingSame}
        onChange={(billingSame) => patch({ billingSame: billingSame === "no" ? "no" : "yes" })}
        error={errors.billingSame}
        disabled={disabled}
        required
      />

      {values.billingSame === "no" && (
        <AddressFields
          prefix="billingAddress"
          legend="Billing address"
          value={values.billingAddress}
          errors={errors}
          disabled={disabled}
          onChange={(billingAddress) => patch({ billingAddress })}
        />
      )}

      <SelectControl id="heard" label="How did you hear about us?" value={values.heard} onChange={(heard) => patch({ heard: heard as EstimateDraft["heard"] })} error={errors.heard} required disabled={disabled}>
        <option value="">Select</option>
        {hearAbout.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectControl>
      {values.heard === "referral" && (
        <TextControl id="referredBy" label="Referred by" value={values.referredBy} onChange={(referredBy) => patch({ referredBy })} error={errors.referredBy} required disabled={disabled} />
      )}
      {values.heard === "other" && (
        <TextControl id="hearOther" label="Where did you hear about us?" value={values.hearOther} onChange={(hearOther) => patch({ hearOther })} error={errors.hearOther} required disabled={disabled} />
      )}

      <ChoiceGroup
        name="propertyType"
        legend="Property type"
        options={propertyTypes}
        value={values.propertyType}
        onChange={(propertyType) => patch({ propertyType: propertyType as EstimateDraft["propertyType"] })}
        error={errors.propertyType}
        disabled={disabled}
        required
      />
      <ChoiceGroup
        name="role"
        legend="Are you the owner, tenant, or property manager?"
        options={roles}
        value={values.role}
        onChange={(role) => patch({ role: role as EstimateDraft["role"] })}
        error={errors.role}
        disabled={disabled}
        required
      />
      {values.role && values.role !== "owner" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <TextControl id="ownerName" label="Owner name" value={values.ownerName} onChange={(ownerName) => patch({ ownerName })} error={errors.ownerName} required disabled={disabled} />
          </div>
          <TextControl id="ownerPhone" label="Owner phone" value={values.ownerPhone} onChange={(ownerPhone) => patch({ ownerPhone })} error={errors.ownerPhone} required type="tel" disabled={disabled} />
          <TextControl id="ownerEmail" label="Owner email" value={values.ownerEmail} onChange={(ownerEmail) => patch({ ownerEmail })} error={errors.ownerEmail} required type="email" disabled={disabled} />
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextControl
          id="yearBuilt"
          label="Approximate year built"
          value={values.yearBuilt}
          onChange={(yearBuilt) => patch({ yearBuilt })}
          error={errors.yearBuilt}
          optional
          inputMode="numeric"
          maxLength={4}
          hint="Approximate is fine. Leave it blank when the year is unknown."
          disabled={disabled}
        />
        <div className="sm:pt-1">
          <ChoiceGroup
            name="stories"
            legend="Stories"
            options={stories}
            value={values.stories}
            onChange={(next) => patch({ stories: next as EstimateDraft["stories"] })}
            error={errors.stories}
            disabled={disabled}
            required
          />
        </div>
      </div>
    </div>
  );
}
