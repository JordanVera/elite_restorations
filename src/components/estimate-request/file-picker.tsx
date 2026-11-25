"use client";

import { FileText, Film, ImagePlus, X } from "lucide-react";

import { formatBytes } from "@/lib/selections/uploads";
import { isVideoExt } from "@/lib/estimate-request/files";
import type { LocalFile } from "@/components/estimate-request/file-types";
import { cn } from "@/lib/utils";

export function FilePicker({
  id,
  files,
  max,
  accept,
  addLabel,
  hint,
  disabled,
  busy,
  error,
  onFiles,
  onRemove,
}: {
  id: string;
  files: LocalFile[];
  max: number;
  accept: string;
  addLabel: string;
  hint?: string;
  disabled?: boolean;
  busy?: boolean;
  error?: string;
  onFiles: (files: FileList) => void;
  onRemove: (id: string) => void;
}) {
  const full = files.length >= max;
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
          <ImagePlus className="size-4" aria-hidden />
          {busy ? "Preparing" : files.length > 0 ? "Add more" : addLabel}
          <input
            id={id}
            type="file"
            accept={accept}
            multiple={max > 1}
            disabled={full || disabled || busy}
            onChange={(event) => {
              const list = event.target.files;
              event.target.value = "";
              if (list && list.length > 0) onFiles(list);
            }}
            className="sr-only"
          />
        </label>
        <span className="text-sm text-muted-foreground" aria-live="polite">
          {files.length} of {max}
        </span>
      </div>
      {hint && <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">{hint}</p>}
      {files.length > 0 && (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {files.map((file, index) => (
            <li key={file.id} className="relative border border-border bg-background">
              {file.previewUrl && !isVideoExt(file.ext) ? (
                // Local preview of a file the visitor just picked.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={file.previewUrl} alt="" className="aspect-square w-full object-cover" />
              ) : file.previewUrl && isVideoExt(file.ext) ? (
                <video src={file.previewUrl} className="aspect-square w-full bg-black object-cover" muted playsInline />
              ) : (
                <div className="flex aspect-square flex-col items-center justify-center gap-2 px-3 text-center text-muted-foreground">
                  {file.ext === "pdf" ? (
                    <FileText className="size-5" aria-hidden />
                  ) : isVideoExt(file.ext) ? (
                    <Film className="size-5" aria-hidden />
                  ) : (
                    <ImagePlus className="size-5" aria-hidden />
                  )}
                  <span className="line-clamp-3 text-xs">{file.name}</span>
                </div>
              )}
              <div className="flex items-center justify-between gap-2 border-t border-border px-2 py-1.5">
                <span className="truncate text-xs text-muted-foreground">{formatBytes(file.blob.size)}</span>
                <button
                  type="button"
                  onClick={() => onRemove(file.id)}
                  disabled={disabled}
                  className="inline-flex size-7 items-center justify-center text-foreground hover:text-accent-ink disabled:opacity-50"
                >
                  <X className="size-4" aria-hidden />
                  <span className="sr-only">Remove file {index + 1}</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p role="alert" className="mt-3 text-sm text-accent-ink">
          {error}
        </p>
      )}
    </div>
  );
}
