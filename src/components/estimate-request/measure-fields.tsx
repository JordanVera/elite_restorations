"use client";

import type { ReactNode } from "react";

import { SelectControl, TextControl } from "@/components/estimate-request/controls";
import {
  MEASURE_LABELS,
  applianceResets,
  backsplashStyles,
  bathScopes,
  cabinetLights,
  cabinetPlans,
  counterThickness,
  existingFloors,
  floorLevels,
  newFloors,
  paintExteriorItems,
  roofPitches,
  showerCurbs,
  showerDoors,
  sinkTypes,
  toiletPlans,
  tradeSelection,
  vanitySinks,
  wetAreas,
  yesNo,
  type MeasureKey,
} from "@/lib/estimate-request/options";
import type { FieldErrors, Measures } from "@/lib/estimate-request/schema";
import { countertopSquareFeet, wallSquareFeet } from "@/lib/estimate-request/templates";
import { cn } from "@/lib/utils";

function formatDateLabel(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return value;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date);
}

function Block({ title, tip, children }: { title: string; tip?: string; children: ReactNode }) {
  return (
    <div className="border border-border bg-background/70 p-4 sm:p-5">
      <h4 className="font-display text-2xl leading-tight">{title}</h4>
      {tip && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tip}</p>}
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
  hints,
  onChange,
}: {
  roomIndex: number;
  keys: readonly MeasureKey[];
  measures: Measures;
  errors: FieldErrors;
  disabled?: boolean;
  hints?: Partial<Record<MeasureKey, string>>;
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
        hint={hints?.[key]}
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
  label?: string;
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
      label={label ?? MEASURE_LABELS[measureKey]}
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

function Tokens({
  measureKey,
  legend,
  options,
  measures,
  disabled,
  onChange,
}: {
  roomIndex: number;
  measureKey: MeasureKey;
  legend: string;
  options: readonly { value: string; label: string }[];
  measures: Measures;
  disabled?: boolean;
  onChange: (key: MeasureKey, value: string) => void;
}) {
  const selected = new Set(measures[measureKey].split(",").filter(Boolean));
  return (
    <fieldset className="sm:col-span-2" disabled={disabled}>
      <legend className="eyebrow text-muted-foreground">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const on = selected.has(option.value);
          return (
            <label key={option.value} className={cn("inline-flex min-h-11 cursor-pointer items-center gap-2 border px-3 text-sm", on ? "border-foreground bg-foreground text-background" : "border-input")}>
              <input
                type="checkbox"
                className="size-4 accent-background"
                checked={on}
                onChange={() => {
                  const next = new Set(selected);
                  if (on) next.delete(option.value);
                  else next.add(option.value);
                  onChange(measureKey, [...next].join(","));
                }}
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function MeasureFields({
  roomIndex,
  trades,
  measures,
  errors,
  disabled,
  lossDate,
  propertyStories,
  onChange,
}: {
  roomIndex: number;
  trades: readonly string[];
  measures: Measures;
  errors: FieldErrors;
  disabled?: boolean;
  lossDate?: string;
  propertyStories?: string;
  onChange: (key: MeasureKey, value: string) => void;
}) {
  const show = tradeSelection(trades, measures.flooringIncluded);
  if (!show.interior && !show.roofing && !show.fence && !show.counters && !show.cabinets) return null;
  const text = (keys: readonly MeasureKey[], hints?: Partial<Record<MeasureKey, string>>) => (
    <Texts roomIndex={roomIndex} keys={keys} measures={measures} errors={errors} disabled={disabled} hints={hints} onChange={onChange} />
  );
  const choice = (key: MeasureKey, options: readonly { value: string; label: string }[]) => (
    <Choice roomIndex={roomIndex} measureKey={key} value={measures[key]} options={options} errors={errors} disabled={disabled} onChange={onChange} />
  );
  const counterGuess = countertopSquareFeet(measures.countertopLf, measures.countertopDepth);
  const wallGuess = wallSquareFeet(measures.lengthFt, measures.widthFt, measures.ceilingFt);

  return (
    <div className="grid gap-4">
      {show.interior && (
        <Block title="Room size" tip="Wall to wall, in feet. 12 ft 4 in is fine. A tape in one photo lets us check the number.">
          {text(["lengthFt", "widthFt"])}
          {show.ceiling && text(["ceilingFt"])}
        </Block>
      )}
      {show.cabinets && (
        <Block title="Cabinets" tip="Base and upper LF run along the wall. This can be a kitchen or a bath vanity.">
          {choice("cabinetPlan", cabinetPlans)}
          {text(["baseCabinetLf", "upperCabinetLf", "cabinetStyle", "cabinetHardware"])}
          {choice("cabinetLights", cabinetLights)}
          <Tokens measureKey="appliancesReset" legend="Appliances to disconnect and reset" options={applianceResets} measures={measures} disabled={disabled} onChange={onChange} />
        </Block>
      )}
      {show.counters && (
        <Block title="Countertops and backsplash" tip="LF is the front edge. Depth is usually about 25 inches. Square feet fills in from those two when you leave it blank.">
          {text(["countertopLf", "countertopDepth", "countertopCurrent", "countertopDesired", "countertopEdge"])}
          {text(["countertopSf"], { countertopSf: counterGuess && !measures.countertopSf ? `About ${counterGuess} SF from the length and depth. Type a number to use something else.` : undefined })}
          {choice("countertopThickness", counterThickness)}
          {choice("sinkType", sinkTypes)}
          {text(["sinkCutouts"])}
          {choice("backsplashStyle", backsplashStyles)}
          {text(["backsplashSf"])}
          {choice("removeCounters", yesNo)}
          {choice("island", yesNo)}
          {measures.island === "yes" && text(["islandSize"])}
          {text(["plumbingAppliances"])}
          {show.kitchen && choice("flooringIncluded", yesNo)}
        </Block>
      )}
      {show.bathroom && (
        <Block title="Bathroom" tip="Shower size is the opening, width by depth. Vanity width is the cabinet front.">
          {choice("bathScope", bathScopes)}
          {choice("wetArea", wetAreas)}
          {measures.wetArea === "other" && text(["wetAreaOther"])}
          {choice("showerDoor", showerDoors)}
          {choice("showerCurb", showerCurbs)}
          {text(["showerSize", "tileHeight"])}
          {choice("tileToCeiling", yesNo)}
          {choice("showerNiche", yesNo)}
          {choice("showerBench", yesNo)}
          {text(["vanityWidth"])}
          {choice("vanitySinks", vanitySinks)}
          {choice("medicineCabinet", yesNo)}
          {text(["mirrorLight"])}
          {choice("toiletPlan", toiletPlans)}
          {text(["toiletCount", "fixturesToReplace", "floorTileSf"])}
          {choice("movePlumbing", yesNo)}
          {choice("exhaustFan", yesNo)}
        </Block>
      )}
      {show.flooring && (
        <Block title="Flooring" tip="Use the room length and width above. Square feet is optional if those are filled in. The T-shaped strip and the reducer are the transition strips at doorways.">
          {text(["floorSf"], { floorSf: "Leave this blank to use length times width." })}
          {choice("floorCurrent", existingFloors)}
          {choice("floorNew", newFloors)}
          {choice("floorLevel", floorLevels)}
          {text(["stairSteps", "baseboardLf", "quarterRoundLf"])}
          {text(["tMoldLf", "reducerLf"], {
            tMoldLf: "The T-shaped strip where two floors meet in a doorway.",
            reducerLf: "The strip at a doorway, often where the new floor steps down.",
          })}
          {choice("furnitureMove", yesNo)}
          {text(["subfloorNotes"])}
        </Block>
      )}
      {show.paint && (
        <Block title="Paint and drywall" tip="Count doors and windows. For patches, a rough size is enough, such as 2 ft by 3 ft. Note a change from dark to light.">
          {choice("ceilingsIncluded", yesNo)}
          {text(["wallSf"], { wallSf: wallGuess && !measures.wallSf ? `About ${wallGuess} SF from the room size. Type a number to use something else.` : undefined })}
          {text(["doorCount", "windowTrimCount", "patchCount", "patchSizes", "texture", "colorChange", "crownLf", "closetShelves", "fixturesReset", "stairSpindles", "paintFinish"])}
          <Tokens measureKey="paintExterior" legend="Exterior, if any" options={paintExteriorItems} measures={measures} disabled={disabled} onChange={onChange} />
        </Block>
      )}
      {show.roofing && (
        <Block title="Roofing" tip="One square is 100 square feet of roof. When squares are unknown, the footprint is enough. Ridge and valley are optional.">
          {text(["squares", "footprint", "ridgeLf", "valleyLf"])}
          {choice("pitch", roofPitches)}
          {text(["roofMaterial", "roofLayers"])}
          {choice("leaks", yesNo)}
          {measures.leaks === "yes" && text(["leakWhere"])}
          {text(["guttersLf", "skylightCount", "ventCount"])}
          {choice("roofSeparate", yesNo)}
          {measures.roofSeparate === "yes" ? text(["roofStories"]) : (
            <p className="text-sm leading-relaxed text-muted-foreground sm:col-span-2">
              {propertyStories ? `We'll use the ${propertyStories} ${propertyStories === "1" ? "story" : "stories"} from the property, unless this roof is a separate structure.` : "We'll use the stories from the property, unless this roof is a separate structure."}
            </p>
          )}
        </Block>
      )}
      {show.loss && (
        <Block title="Water or fire damage" tip="Wall height is how far up the damage goes. Note whether the source is stopped.">
          {lossDate ? (
            <p className="text-sm leading-relaxed text-muted-foreground sm:col-span-2">Date of loss: {formatDateLabel(lossDate)}. That date is collected once, on the insurance step.</p>
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground sm:col-span-2">The date of loss is collected once, on the insurance step.</p>
          )}
          {text(["wallHeight", "affectedFlooring", "cabinetsAffected"])}
          {choice("sourceStopped", yesNo)}
          {choice("packOut", yesNo)}
          {choice("boardUp", yesNo)}
          {choice("attic", yesNo)}
          {choice("standingWater", yesNo)}
          {text(["sootWhere"])}
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
