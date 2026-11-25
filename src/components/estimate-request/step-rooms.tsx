"use client";

import { AreaControl, CheckCards, SelectControl, TextControl } from "@/components/estimate-request/controls";
import { FilePicker } from "@/components/estimate-request/file-picker";
import type { RoomFiles } from "@/components/estimate-request/file-types";
import { MeasureFields } from "@/components/estimate-request/measure-fields";
import { MAX_ROOM_FILES, MAX_ROOMS } from "@/lib/estimate-request/files";
import { MEASURE_TIPS, PHOTO_GUIDE, areaTypes, optionLabel, trades, type MeasureKey } from "@/lib/estimate-request/options";
import type { EstimateDraft, FieldErrors, RoomDraft } from "@/lib/estimate-request/schema";

const MEDIA_ACCEPT = "image/*,video/mp4,video/webm,video/quicktime,.pdf,.jpg,.jpeg,.png,.webp,.heic,.heif,.mp4,.webm,.mov";
const DOC_ACCEPT = "image/*,.pdf,.jpg,.jpeg,.png,.webp,.heic,.heif,application/pdf";

export function StepRooms({
  values,
  errors,
  filesFor,
  disabled,
  busyRoomId,
  fileError,
  uploadNote,
  onChange,
  onAddRoom,
  onRemoveRoom,
  onAddFiles,
  onRemoveFile,
  onAddSketch,
  onRemoveSketch,
}: {
  values: EstimateDraft;
  errors: FieldErrors;
  filesFor: (roomId: string) => RoomFiles;
  disabled?: boolean;
  busyRoomId?: string | null;
  fileError?: string;
  uploadNote?: string;
  onChange: (next: EstimateDraft) => void;
  onAddRoom: () => void;
  onRemoveRoom: (index: number) => void;
  onAddFiles: (roomId: string, list: FileList) => void;
  onRemoveFile: (roomId: string, fileId: string) => void;
  onAddSketch: (roomId: string, list: FileList) => void;
  onRemoveSketch: (roomId: string) => void;
}) {
  function update(index: number, patch: Partial<RoomDraft>) {
    onChange({
      ...values,
      rooms: values.rooms.map((room, roomIndex) => (roomIndex === index ? { ...room, ...patch } : room)),
    });
  }

  return (
    <div className="grid gap-6">
      <details className="border border-border bg-surface/70 px-4 py-3">
        <summary className="cursor-pointer text-sm font-medium">How to measure</summary>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          {MEASURE_TIPS.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </details>
      {uploadNote && <p className="text-sm leading-relaxed text-muted-foreground">{uploadNote}</p>}

      {values.rooms.map((room, index) => {
        const files = filesFor(room.id);
        const prefix = `rooms.${index}`;
        return (
          <details key={room.id} open data-room-index={index} className="border border-border bg-background/50">
            <summary className="cursor-pointer list-none px-4 py-4 sm:px-5 [&::-webkit-details-marker]:hidden">
              <span className="eyebrow text-muted-foreground">Room {index + 1}</span>
              <span className="mt-2 block font-display text-3xl leading-tight">
                {room.name || optionLabel(areaTypes, room.areaType) || "Room or area"}
              </span>
            </summary>
            <div className="grid gap-6 border-t border-border px-4 py-5 sm:px-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <SelectControl
                  id={`room-${index}-area`}
                  field={`${prefix}.areaType`}
                  label="Room or area"
                  value={room.areaType}
                  onChange={(areaType) => update(index, { areaType: areaType as RoomDraft["areaType"] })}
                  error={errors[`${prefix}.areaType`]}
                  required
                  disabled={disabled}
                >
                  <option value="">Select</option>
                  {areaTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </SelectControl>
                <TextControl
                  id={`room-${index}-name`}
                  field={`${prefix}.name`}
                  label="Room name"
                  value={room.name}
                  onChange={(name) => update(index, { name })}
                  error={errors[`${prefix}.name`]}
                  required
                  hint="For example, primary bath or hall bath."
                  disabled={disabled}
                />
              </div>

              <CheckCards
                legend="Trades needed"
                field={`${prefix}.trades`}
                options={trades}
                selected={room.trades}
                onToggle={(value) => {
                  const trade = value as RoomDraft["trades"][number];
                  const next = room.trades.includes(trade) ? room.trades.filter((item) => item !== trade) : [...room.trades, trade];
                  update(index, { trades: next });
                }}
                error={errors[`${prefix}.trades`]}
                disabled={disabled}
              />
              {room.trades.includes("other") && (
                <TextControl
                  id={`room-${index}-trade-other`}
                  field={`${prefix}.tradeOther`}
                  label="Other trade"
                  value={room.tradeOther}
                  onChange={(tradeOther) => update(index, { tradeOther })}
                  error={errors[`${prefix}.tradeOther`]}
                  required
                  disabled={disabled}
                />
              )}
              <AreaControl
                id={`room-${index}-description`}
                field={`${prefix}.description`}
                label="Description of the work"
                value={room.description}
                onChange={(description) => update(index, { description })}
                error={errors[`${prefix}.description`]}
                required
                disabled={disabled}
              />

              <MeasureFields
                roomIndex={index}
                trades={room.trades}
                measures={room.measures}
                errors={errors}
                disabled={disabled}
                onChange={(key: MeasureKey, value) => update(index, { measures: { ...room.measures, [key]: value } })}
              />

              <div>
                <p className="eyebrow text-muted-foreground">Photos and video</p>
                <div className="mt-4">
                  <FilePicker
                    id={`room-${index}-files`}
                    files={files.files}
                    max={MAX_ROOM_FILES}
                    accept={MEDIA_ACCEPT}
                    addLabel="Add photos"
                    hint={`${PHOTO_GUIDE} Short video is welcome, 25 MB or less. Photos are reduced on this device before they send.`}
                    disabled={disabled}
                    busy={busyRoomId === room.id}
                    error={busyRoomId === room.id ? fileError : undefined}
                    onFiles={(list) => onAddFiles(room.id, list)}
                    onRemove={(fileId) => onRemoveFile(room.id, fileId)}
                  />
                </div>
              </div>

              <div>
                <p className="eyebrow text-muted-foreground">Sketch</p>
                <div className="mt-4">
                  <FilePicker
                    id={`room-${index}-sketch`}
                    files={files.sketch ? [files.sketch] : []}
                    max={1}
                    accept={DOC_ACCEPT}
                    addLabel="Add a sketch"
                    hint="Optional. A marked-up photo or a PDF of the room."
                    disabled={disabled}
                    busy={busyRoomId === `${room.id}:sketch`}
                    error={busyRoomId === `${room.id}:sketch` ? fileError : undefined}
                    onFiles={(list) => onAddSketch(room.id, list)}
                    onRemove={() => onRemoveSketch(room.id)}
                  />
                </div>
              </div>

              {values.rooms.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveRoom(index)}
                  disabled={disabled}
                  className="justify-self-start text-sm text-accent-ink underline decoration-accent-ink/30 underline-offset-[0.35em]"
                >
                  Remove this room
                </button>
              )}
            </div>
          </details>
        );
      })}

      <button
        type="button"
        onClick={onAddRoom}
        disabled={disabled || values.rooms.length >= MAX_ROOMS}
        className="inline-flex h-12 items-center justify-center border border-foreground/35 px-5 text-[0.72rem] font-medium uppercase tracking-[0.18em] transition-colors hover:border-foreground disabled:opacity-50"
      >
        + Add another room or area
      </button>
      {values.rooms.length >= MAX_ROOMS && (
        <p className="text-sm text-muted-foreground">15 rooms is the limit. Call us if the project is larger.</p>
      )}
    </div>
  );
}
