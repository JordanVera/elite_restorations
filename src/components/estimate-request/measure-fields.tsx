"use client";

import type { ReactNode } from "react";

import { SelectControl, TextControl } from "@/components/estimate-request/controls";
import { MEASURE_LABELS, roofPitches, tradeSelection, vanitySinks, wetAreas, yesNo } from "@/lib/estimate-request/options";
import type { FieldErrors, Measures } from "@/lib/estimate-request/schema";
import type { MeasureKey } from "@/lib/estimate-request/options";

function Block({ title, tip, children }: { title: string; tip: string; children: ReactNode }) {
  return (
    <div className="border border-border bg-background/70 p-4 sm:p-5">
      <h4 className="font-display text-2xl leading-tight">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tip}</p>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function Texts({
  roomIndex,
  keys,
  measures,
  errors,
  disabled,
  onChange,
}: {
  roomIndex: number;
  keys: readonly MeasureKey[];
  measures: Measures;
  errors: FieldErrors;
  disabled?: boolean;
  onChange: (key: MeasureKey, value: string) => void;
}) {
  return keys.map((key) => {
    const id = `room-${roomIndex}-${key}`;
    const field = `rooms.${roomIndex}.measures.${key}`;
    return (
      <TextControl
        key={key}
        id={id}
        field={field}
        label={MEASURE_LABELS[key]}
        value={measures[key]}
        onChange={(value) => onChange(key, value)}
        error={errors[field]}
        optional
        disabled={disabled}
      />
    );
  });
}

function Choice({
  roomIndex,
  measureKey,
  label,
  value,
  options,
  errors,
  disabled,
  onChange,
}: {
  roomIndex: number;
  measureKey: MeasureKey;
  label: string;
  value: string;
  options: readonly { value: string; label: string }[];
  errors: FieldErrors;
  disabled?: boolean;
  onChange: (key: MeasureKey, value: string) => void;
}) {
  const id = `room-${roomIndex}-${measureKey}`;
  const field = `rooms.${roomIndex}.measures.${measureKey}`;
  return (
    <SelectControl
      id={id}
      field={field}
      label={label}
      value={value}
      onChange={(next) => onChange(measureKey, next)}
      error={errors[field]}
      optional
      disabled={disabled}
    >
      <option value="">Select</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </SelectControl>
  );
}

export function MeasureFields({
  roomIndex,
  trades,
  measures,
  errors,
  disabled,
  onChange,
}: {
  roomIndex: number;
  trades: readonly string[];
  measures: Measures;
  errors: FieldErrors;
  disabled?: boolean;
  onChange: (key: MeasureKey, value: string) => void;
}) {
  const show = tradeSelection(trades);
  if (!show.interior && !show.roofing && !show.fence && !show.kitchen && !show.bathroom) return null;
  const text = (keys: readonly MeasureKey[]) => (
    <Texts roomIndex={roomIndex} keys={keys} measures={measures} errors={errors} disabled={disabled} onChange={onChange} />
  );
  const choice = (key: MeasureKey, options: readonly { value: string; label: string }[]) => (
    <Choice
      roomIndex={roomIndex}
      measureKey={key}
      label={MEASURE_LABELS[key]}
      value={measures[key]}
      options={options}
      errors={errors}
      disabled={disabled}
      onChange={onChange}
    />
  );

  return (
    <div className="grid gap-4">
      {show.interior && (
        <Block title="Room size" tip="Wall to wall, in feet. 12 ft 4 in is fine. A tape in one photo lets us check the number.">
          {text(["lengthFt", "widthFt"])}
          {show.ceiling && text(["ceilingFt"])}
        </Block>
      )}
      {show.kitchen && (
        <Block title="Kitchen" tip="Cabinet and counter LF run along the wall. Depth is usually about 25 inches.">
          {text(["baseCabinetLf", "upperCabinetLf", "countertopLf", "countertopDepth", "countertopCurrent", "countertopDesired"])}
          {choice("island", yesNo)}
          {measures.island === "yes" && text(["islandSize"])}
          {text(["backsplashSf", "plumbingAppliances"])}
          {choice("flooringIncluded", yesNo)}
        </Block>
      )}
      {show.bathroom && (
        <Block title="Bathroom" tip="Shower size is the opening, width by depth. Vanity width is the cabinet front.">
          {choice("wetArea", wetAreas)}
          {text(["showerSize", "tileHeight"])}
          {choice("tileToCeiling", yesNo)}
          {text(["vanityWidth"])}
          {choice("vanitySinks", vanitySinks)}
          {text(["toiletCount", "fixturesToReplace", "floorTileSf"])}
          {choice("exhaustFan", yesNo)}
        </Block>
      )}
      {show.flooring && (
        <Block title="Flooring" tip="Square feet, or length times width. Count stair steps that need a finish.">
          {text(["floorSf", "floorLengthFt", "floorWidthFt", "floorCurrent", "floorNew", "stairSteps", "baseboardLf", "subfloorNotes"])}
          {choice("furnitureMove", yesNo)}
        </Block>
      )}
      {show.paint && (
        <Block title="Paint and drywall" tip="Count doors and windows. For patches, a rough size is enough, such as 2 ft by 3 ft. Note a change from dark to light.">
          {choice("ceilingsIncluded", yesNo)}
          {text(["doorCount", "windowTrimCount", "patchCount", "patchSizes", "texture", "colorChange"])}
        </Block>
      )}
      {show.roofing && (
        <Block title="Roofing" tip="One square is 100 square feet of roof. When squares are unknown, the footprint and stories are enough.">
          {text(["squares", "footprint", "roofStories"])}
          {choice("pitch", roofPitches)}
          {text(["roofMaterial", "roofLayers"])}
          {choice("leaks", yesNo)}
          {measures.leaks === "yes" && text(["leakWhere"])}
          {text(["guttersLf", "skylightCount", "ventCount"])}
        </Block>
      )}
      {show.loss && (
        <Block title="Water or fire damage" tip="Wall height is how far up the damage goes. Note whether the source is stopped.">
          {text(["wallHeight", "affectedFlooring", "cabinetsAffected"])}
          <TextControl
            id={`room-${roomIndex}-lossDate`}
            field={`rooms.${roomIndex}.measures.lossDate`}
            label={MEASURE_LABELS.lossDate}
            type="date"
            value={measures.lossDate}
            onChange={(value) => onChange("lossDate", value)}
            error={errors[`rooms.${roomIndex}.measures.lossDate`]}
            optional
            disabled={disabled}
          />
          {choice("sourceStopped", yesNo)}
          {choice("packOut", yesNo)}
          {choice("boardUp", yesNo)}
        </Block>
      )}
      {show.fence && (
        <Block title="Fence, deck, or patio" tip="Fence LF is the run to build or replace. Deck size is the walking surface.">
          {text(["fenceLf", "fenceHeight", "fenceMaterial", "gateCount", "deckLengthFt", "deckWidthFt", "deckHeight", "deckMaterial", "railings", "deckStairs"])}
        </Block>
      )}
    </div>
  );
}
