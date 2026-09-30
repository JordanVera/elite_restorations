"use client";

import * as React from "react";
import { Camera, Loader2, X } from "lucide-react";

import { MAX_PHOTOS } from "@/lib/inquiry-schema";
import { resizeToJpeg } from "@/lib/photos-client";
import { cn } from "@/lib/utils";

export type PickedPhoto = { id: string; blob: Blob; previewUrl: string; name: string };

type PhotoPickerProps = {
  id: string;
  photos: PickedPhoto[];
  setPhotos: React.Dispatch<React.SetStateAction<PickedPhoto[]>>;
  max?: number;
  disabled?: boolean;
};

export function PhotoPicker({ id, photos, setPhotos, max = MAX_PHOTOS, disabled }: PhotoPickerProps) {
  const [busy, setBusy] = React.useState(false);
  const [problem, setProblem] = React.useState<string | null>(null);
  const latest = React.useRef(photos);

  React.useEffect(() => {
    latest.current = photos;
  }, [photos]);

  React.useEffect(
    () => () => {
      for (const photo of latest.current) URL.revokeObjectURL(photo.previewUrl);
    },
    [],
  );

  async function onFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target;
    const files = Array.from(input.files ?? []);
    input.value = "";
    if (files.length === 0) return;

    setProblem(null);
    const room = Math.max(0, max - latest.current.length);
    const accepted = files.slice(0, room);
    const failed: string[] = [];

    setBusy(true);
    const added: PickedPhoto[] = [];
    for (const file of accepted) {
      try {
        const blob = await resizeToJpeg(file);
        added.push({ id: crypto.randomUUID(), blob, previewUrl: URL.createObjectURL(blob), name: file.name });
      } catch {
        failed.push(file.name);
      }
    }
    setPhotos((prev) => [...prev, ...added].slice(0, max));
    setBusy(false);

    const messages: string[] = [];
    if (files.length > room) messages.push(`Only ${max} photos can be attached, so the extra ones were skipped.`);
    if (failed.length > 0) messages.push(`We could not read ${failed.join(", ")}. Try a JPEG or PNG.`);
    if (messages.length > 0) setProblem(messages.join(" "));
  }

  function remove(photo: PickedPhoto) {
    URL.revokeObjectURL(photo.previewUrl);
    setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    setProblem(null);
  }

  const full = photos.length >= max;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <label
          htmlFor={id}
          className={cn(
            "relative inline-flex h-12 cursor-pointer items-center gap-3 border border-foreground/35 px-5 text-[0.72rem] font-medium uppercase tracking-[0.18em] transition-colors hover:border-foreground has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-ink",
            (full || disabled || busy) && "pointer-events-none opacity-50",
          )}
        >
          {busy ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Camera className="size-4" aria-hidden />}
          {busy ? "Preparing" : photos.length > 0 ? "Add more" : "Add photos"}
          <input
            id={id}
            type="file"
            accept="image/*"
            multiple
            disabled={full || disabled || busy}
            onChange={onFiles}
            className="sr-only"
          />
        </label>
        <span className="text-sm text-muted-foreground" aria-live="polite">
          {photos.length} of {max}
        </span>
      </div>

      {photos.length > 0 && (
        <ul className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {photos.map((photo, index) => (
            <li key={photo.id} className="relative aspect-square overflow-hidden border border-border bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
              <img src={photo.previewUrl} alt={`Attached photo ${index + 1}`} className="size-full object-cover" />
              <button
                type="button"
                onClick={() => remove(photo)}
                disabled={disabled}
                className="absolute right-1 top-1 inline-flex size-7 items-center justify-center bg-background/90 text-foreground transition-colors hover:bg-accent hover:text-white disabled:opacity-50"
              >
                <X className="size-4" aria-hidden />
                <span className="sr-only">Remove photo {index + 1}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {problem && (
        <p role="alert" className="mt-3 text-sm text-accent-ink">
          {problem}
        </p>
      )}
    </div>
  );
}
