"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { clearBlobs, clearDraft, deleteBlob, loadBlobs, loadDraft, saveBlob, saveDraft } from "@/components/estimate-request/draft-store";
import { emptyRoomFiles, type LocalFile, type RoomFiles } from "@/components/estimate-request/file-types";
import { prepareEstimateFile } from "@/components/estimate-request/prepare-file";
import { StepContact } from "@/components/estimate-request/step-contact";
import { StepInsurance } from "@/components/estimate-request/step-insurance";
import { StepProject } from "@/components/estimate-request/step-project";
import { StepReview } from "@/components/estimate-request/step-review";
import { StepRooms } from "@/components/estimate-request/step-rooms";
import { uploadPreparedFile, type UploadMode } from "@/components/estimate-request/upload-client";
import { buildEstimatePath, isAccessKey, isUuid, isVideoExt, type EstimateExt, type EstimateRole } from "@/lib/estimate-request/files";
import { OFFICE_PHONE, STEPS, THANK_YOU } from "@/lib/estimate-request/options";
import {
  emptyEstimate,
  emptyRoom,
  stepForErrors,
  validateStep,
  type EstimateDraft,
  type EstimateSubmission,
  type FieldErrors,
} from "@/lib/estimate-request/schema";
import { site } from "@/lib/site";

type Status = { kind: "idle" } | { kind: "sending"; message: string } | { kind: "sent" } | { kind: "error"; message: string };

type Meta = { submissionId: string; accessKey: string; startedAt: number };

const EXT_SET = new Set<string>(["jpg", "png", "webp", "pdf", "mp4", "webm", "mov", "heic"]);

function isExt(value: string): value is EstimateExt {
  return EXT_SET.has(value);
}

function previewFor(blob: Blob, ext: EstimateExt) {
  if (ext === "pdf" || ext === "heic") return null;
  return URL.createObjectURL(blob);
}

function focusField(errors: FieldErrors) {
  const key = Object.keys(errors)[0];
  if (!key || typeof document === "undefined") return;
  for (const match of Object.keys(errors)) {
    const room = /^rooms\.(\d+)\./.exec(match);
    if (!room) continue;
    const details = document.querySelector(`details[data-room-index="${room[1]}"]`);
    if (details instanceof HTMLDetailsElement) details.open = true;
  }
  window.setTimeout(() => {
    const node = document.querySelector(`[data-field="${CSS.escape(key)}"]`);
    if (!(node instanceof HTMLElement)) return;
    node.scrollIntoView({ behavior: "smooth", block: "center" });
    const target = node.matches("input,select,textarea,button") ? node : node.querySelector("input,select,textarea,button");
    if (target instanceof HTMLElement) target.focus();
  }, 40);
}

export function EstimateForm({ uploadMode }: { uploadMode: UploadMode }) {
  const [values, setValues] = useState<EstimateDraft | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [rooms, setRooms] = useState<Record<string, RoomFiles>>({});
  const [adjuster, setAdjuster] = useState<LocalFile[]>([]);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [savedNote, setSavedNote] = useState(false);
  const [busyRoomId, setBusyRoomId] = useState<string | null>(null);
  const [fileError, setFileError] = useState("");
  const honeypot = useRef<HTMLInputElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const previews = useRef<string[]>([]);
  const skipFocus = useRef(true);

  useEffect(() => {
    let cancelled = false;
    // localStorage and IndexedDB are empty during SSR. Reading them after
    // mount keeps the server HTML and the first client render the same.
    void loadBlobs().then((rows) => {
      if (cancelled) return;
      const restored = loadDraft();
      const submissionId = restored && isUuid(restored.submissionId) ? restored.submissionId : crypto.randomUUID();
      const accessKey = restored && isAccessKey(restored.accessKey) ? restored.accessKey : crypto.randomUUID().replace(/-/g, "");
      const nextValues = restored?.values ?? emptyEstimate();
      const roomIds = new Set(nextValues.rooms.map((room) => room.id));
      const nextRooms: Record<string, RoomFiles> = {};
      const nextAdjuster: LocalFile[] = [];
      for (const row of rows) {
        if (!isExt(row.ext)) continue;
        const parts = row.key.split(":");
        const url = previewFor(row.blob, row.ext);
        if (url) previews.current.push(url);
        const file: LocalFile = {
          id: parts.at(-1) || crypto.randomUUID(),
          name: row.name,
          blob: row.blob,
          contentType: row.contentType,
          ext: row.ext,
          previewUrl: url,
        };
        if (parts[0] === "media" && parts[1] && roomIds.has(parts[1])) {
          const bag = nextRooms[parts[1]] ?? emptyRoomFiles();
          bag.files.push(file);
          nextRooms[parts[1]] = bag;
        } else if (parts[0] === "sketch" && parts[1] && roomIds.has(parts[1])) {
          const bag = nextRooms[parts[1]] ?? emptyRoomFiles();
          bag.sketch = file;
          nextRooms[parts[1]] = bag;
        } else if (parts[0] === "adjuster") {
          nextAdjuster.push(file);
        }
      }
      setValues(nextValues);
      setMeta({ submissionId, accessKey, startedAt: restored?.startedAt ?? Date.now() });
      setStep(restored?.step ?? 0);
      setRooms(nextRooms);
      setAdjuster(nextAdjuster);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => () => {
    for (const url of previews.current) URL.revokeObjectURL(url);
  }, []);

  useEffect(() => {
    if (!values || !meta || status.kind === "sent") return;
    const timer = window.setTimeout(() => {
      saveDraft({ version: 1, step, startedAt: meta.startedAt, submissionId: meta.submissionId, accessKey: meta.accessKey, values });
      setSavedNote(true);
    }, 400);
    return () => window.clearTimeout(timer);
  }, [values, meta, step, status.kind]);

  useEffect(() => {
    if (skipFocus.current) {
      skipFocus.current = false;
      return;
    }
    heading.current?.focus();
  }, [step]);

  async function remember(key: string, file: LocalFile) {
    await saveBlob({ key, blob: file.blob, name: file.name, contentType: file.contentType, ext: file.ext });
  }

  function revoke(file: LocalFile | null) {
    if (file?.previewUrl) URL.revokeObjectURL(file.previewUrl);
  }

  async function addPrepared(role: EstimateRole, list: FileList, accept: (file: LocalFile) => void, busyId: string) {
    setFileError("");
    setBusyRoomId(busyId);
    const problems: string[] = [];
    for (const file of Array.from(list)) {
      try {
        const prepared = await prepareEstimateFile(file, role);
        const local: LocalFile = {
          id: crypto.randomUUID(),
          name: prepared.name,
          blob: prepared.blob,
          contentType: prepared.contentType,
          ext: prepared.ext,
          previewUrl: previewFor(prepared.blob, prepared.ext),
        };
        if (local.previewUrl) previews.current.push(local.previewUrl);
        accept(local);
      } catch (error) {
        problems.push(error instanceof Error ? error.message : "That file could not be added.");
      }
    }
    setBusyRoomId(null);
    if (problems.length) setFileError(problems.join(" "));
  }

  function filesFor(roomId: string) {
    return rooms[roomId] ?? emptyRoomFiles();
  }

  function addRoomFiles(roomId: string, list: FileList) {
    const current = filesFor(roomId).files.length;
    const roomLeft = Math.max(0, 10 - current);
    const picked = Array.from(list).slice(0, roomLeft);
    if (list.length > roomLeft) setFileError("Each room can have 10 files, so the extra ones were skipped.");
    const data = new DataTransfer();
    picked.forEach((file) => data.items.add(file));
    void addPrepared("media", data.files, (local) => {
      void remember(`media:${roomId}:${local.id}`, local);
      setRooms((prev) => {
        const bag = prev[roomId] ?? emptyRoomFiles();
        return { ...prev, [roomId]: { ...bag, files: [...bag.files, local].slice(0, 10) } };
      });
    }, roomId);
  }

  function addSketch(roomId: string, list: FileList) {
    const file = list.item(0);
    if (!file) return;
    const data = new DataTransfer();
    data.items.add(file);
    void addPrepared("sketch", data.files, (local) => {
      const previous = filesFor(roomId).sketch;
      if (previous) {
        revoke(previous);
        void deleteBlob(`sketch:${roomId}:${previous.id}`);
      }
      void remember(`sketch:${roomId}:${local.id}`, local);
      setRooms((prev) => {
        const bag = prev[roomId] ?? emptyRoomFiles();
        return { ...prev, [roomId]: { ...bag, sketch: local } };
      });
    }, `${roomId}:sketch`);
  }

  function addAdjuster(list: FileList) {
    const roomLeft = Math.max(0, 5 - adjuster.length);
    const picked = Array.from(list).slice(0, roomLeft);
    const data = new DataTransfer();
    picked.forEach((file) => data.items.add(file));
    void addPrepared("adjuster", data.files, (local) => {
      void remember(`adjuster:${local.id}`, local);
      setAdjuster((prev) => [...prev, local].slice(0, 5));
    }, "adjuster");
  }

  function removeRoom(index: number) {
    if (!values) return;
    const room = values.rooms[index];
    const bag = rooms[room.id];
    if (bag) {
      bag.files.forEach((file) => {
        revoke(file);
        void deleteBlob(`media:${room.id}:${file.id}`);
      });
      if (bag.sketch) {
        revoke(bag.sketch);
        void deleteBlob(`sketch:${room.id}:${bag.sketch.id}`);
      }
    }
    setRooms((prev) => {
      const next = { ...prev };
      delete next[room.id];
      return next;
    });
    setValues({ ...values, rooms: values.rooms.filter((_, roomIndex) => roomIndex !== index) });
  }

  function go(nextStep: number, nextErrors: FieldErrors = {}) {
    setErrors(nextErrors);
    setStep(nextStep);
    if (Object.keys(nextErrors).length) focusField(nextErrors);
  }

  function next() {
    if (!values) return;
    const found = validateStep(step, values);
    if (Object.keys(found).length) {
      setErrors(found);
      focusField(found);
      return;
    }
    setErrors({});
    setStep((current) => Math.min(4, current + 1));
  }

  async function uploadOne(file: LocalFile, role: EstimateRole, roomIndex?: number) {
    if (!meta) throw new Error("This request is not ready yet.");
    if (file.pathname) return file;
    if (uploadMode === "none") throw new Error(`Photo upload is not available right now. Call ${OFFICE_PHONE}.`);
    const pathname = buildEstimatePath({
      submissionId: meta.submissionId,
      accessKey: meta.accessKey,
      role,
      roomIndex,
      fileId: crypto.randomUUID(),
      ext: file.ext,
    });
    if (!pathname) throw new Error(`${file.name} could not be prepared.`);
    await uploadPreparedFile({ mode: uploadMode, blob: file.blob, name: file.name, contentType: file.contentType, pathname });
    return { ...file, pathname };
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!values || !meta || status.kind === "sending") return;
    if (step < 4) {
      next();
      return;
    }
    for (let index = 0; index < 5; index += 1) {
      const found = validateStep(index, values);
      if (Object.keys(found).length) {
        go(index, found);
        return;
      }
    }
    const fileCount = Object.values(rooms).reduce((sum, bag) => sum + bag.files.length + (bag.sketch ? 1 : 0), 0) + adjuster.length;
    if (uploadMode === "none" && fileCount > 0) {
      setStatus({ kind: "error", message: `Photo upload is not available right now. Remove the files and send the details, or call ${OFFICE_PHONE}.` });
      return;
    }

    setStatus({ kind: "sending", message: fileCount ? "Uploading files…" : "Sending…" });
    try {
      const uploadedRooms: Record<string, RoomFiles> = {};
      let done = 0;
      for (const [index, room] of values.rooms.entries()) {
        const bag = filesFor(room.id);
        const files: LocalFile[] = [];
        for (const file of bag.files) {
          done += 1;
          setStatus({ kind: "sending", message: `Uploading file ${done} of ${fileCount}…` });
          files.push(await uploadOne(file, "media", index));
        }
        let sketch = bag.sketch;
        if (sketch) {
          done += 1;
          setStatus({ kind: "sending", message: `Uploading file ${done} of ${fileCount}…` });
          sketch = await uploadOne(sketch, "sketch", index);
        }
        uploadedRooms[room.id] = { files, sketch };
      }
      const uploadedAdjuster: LocalFile[] = [];
      for (const file of adjuster) {
        done += 1;
        setStatus({ kind: "sending", message: `Uploading file ${done} of ${fileCount}…` });
        uploadedAdjuster.push(await uploadOne(file, "adjuster"));
      }
      setRooms(uploadedRooms);
      setAdjuster(uploadedAdjuster);
      setStatus({ kind: "sending", message: "Sending…" });

      const payload: EstimateSubmission = {
        ...values,
        submissionId: meta.submissionId,
        accessKey: meta.accessKey,
        startedAt: meta.startedAt,
        website: honeypot.current?.value ?? "",
        pageUrl: window.location.href.slice(0, 500),
        adjusterFiles: values.claim === "yes" ? uploadedAdjuster.map(stored) : [],
        rooms: values.rooms.map((room) => ({
          ...room,
          files: (uploadedRooms[room.id]?.files ?? []).map(stored),
          sketch: uploadedRooms[room.id]?.sketch ? stored(uploadedRooms[room.id].sketch as LocalFile) : null,
        })),
      };

      const response = await fetch("/api/estimate-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => null)) as { ok?: boolean; message?: string; errors?: FieldErrors } | null;
      if (!response.ok || !data?.ok) {
        if (data?.errors) go(stepForErrors(data.errors), data.errors);
        setStatus({ kind: "error", message: data?.message || `We could not send this request. Call ${OFFICE_PHONE}.` });
        return;
      }
      clearDraft();
      await clearBlobs();
      setStatus({ kind: "sent" });
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : `We could not send this request. Call ${OFFICE_PHONE}.` });
    }
  }

  function startOver() {
    if (!window.confirm("Clear this draft on this device?")) return;
    clearDraft();
    void clearBlobs();
    for (const url of previews.current) URL.revokeObjectURL(url);
    previews.current = [];
    setValues(emptyEstimate());
    setRooms({});
    setAdjuster([]);
    setErrors({});
    setStep(0);
    setSavedNote(false);
    setStatus({ kind: "idle" });
    setMeta({ submissionId: crypto.randomUUID(), accessKey: crypto.randomUUID().replace(/-/g, ""), startedAt: Date.now() });
  }

  if (!values || !meta) {
    return (
      <div className="mt-8 border border-border bg-surface/50 p-6 sm:p-8">
        <p className="text-sm text-muted-foreground">Loading your draft…</p>
      </div>
    );
  }

  if (status.kind === "sent") {
    return (
      <div className="mt-8 border border-border bg-surface/60 p-6 sm:p-10" role="status">
        <p className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05]">{THANK_YOU}</p>
        <a href={site.phone.href} className="mt-6 inline-flex text-sm underline decoration-foreground/30 underline-offset-[0.45em] hover:decoration-accent-ink">
          Call {OFFICE_PHONE}
        </a>
      </div>
    );
  }

  const sending = status.kind === "sending";
  const reviewPayload = previewSubmission(values, rooms, adjuster, meta);

  return (
    <form noValidate onSubmit={onSubmit} className="relative mt-8 border border-border bg-surface/40 p-4 sm:p-8 md:p-10">
      <div>
        <div className="flex items-center justify-between gap-4 text-sm">
          <p>
            Step {step + 1} of {STEPS.length}
          </p>
          <p className="eyebrow text-accent-ink">{STEPS[step].label}</p>
        </div>
        <div
          className="mt-3 h-1 bg-surface-2"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-valuenow={step + 1}
          aria-label="Form progress"
        >
          <div className="h-full bg-accent transition-[width] duration-500" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>
        <ol className="mt-4 hidden grid-cols-5 gap-2 sm:grid">
          {STEPS.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                disabled={index >= step || sending}
                aria-current={index === step ? "step" : undefined}
                onClick={() => index < step && go(index)}
                className={`w-full border-b pb-2 text-left text-[0.68rem] uppercase tracking-[0.16em] ${index === step ? "border-accent text-foreground" : "border-transparent text-muted-foreground"} disabled:cursor-default`}
              >
                {index + 1}. {item.label}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <h2 ref={heading} tabIndex={-1} className="font-display mt-8 text-4xl leading-none outline-none">
        {STEPS[step].label}
      </h2>

      <div className="mt-8">
        {step === 0 && <StepContact values={values} errors={errors} disabled={sending} onChange={setValues} />}
        {step === 1 && (
          <StepRooms
            values={values}
            errors={errors}
            filesFor={filesFor}
            disabled={sending}
            busyRoomId={busyRoomId}
            fileError={fileError}
            uploadNote={uploadMode === "none" ? `Photo upload is not available right now. You can still send the written details, or call ${OFFICE_PHONE}.` : undefined}
            onChange={setValues}
            onAddRoom={() => setValues({ ...values, rooms: [...values.rooms, emptyRoom()] })}
            onRemoveRoom={removeRoom}
            onAddFiles={addRoomFiles}
            onRemoveFile={(roomId, fileId) => {
              const file = filesFor(roomId).files.find((item) => item.id === fileId);
              revoke(file ?? null);
              void deleteBlob(`media:${roomId}:${fileId}`);
              setRooms((prev) => {
                const bag = prev[roomId] ?? emptyRoomFiles();
                return { ...prev, [roomId]: { ...bag, files: bag.files.filter((item) => item.id !== fileId) } };
              });
            }}
            onAddSketch={addSketch}
            onRemoveSketch={(roomId) => {
              const file = filesFor(roomId).sketch;
              revoke(file);
              if (file) void deleteBlob(`sketch:${roomId}:${file.id}`);
              setRooms((prev) => {
                const bag = prev[roomId] ?? emptyRoomFiles();
                return { ...prev, [roomId]: { ...bag, sketch: null } };
              });
            }}
          />
        )}
        {step === 2 && <StepProject values={values} errors={errors} disabled={sending} onChange={setValues} />}
        {step === 3 && (
          <StepInsurance
            values={values}
            errors={errors}
            files={adjuster}
            disabled={sending}
            busy={busyRoomId === "adjuster"}
            fileError={busyRoomId === "adjuster" ? fileError : undefined}
            onChange={(next) => {
              if (next.claim !== "yes") {
                adjuster.forEach((file) => {
                  revoke(file);
                  void deleteBlob(`adjuster:${file.id}`);
                });
                setAdjuster([]);
              }
              setValues(next);
            }}
            onFiles={addAdjuster}
            onRemove={(id) => {
              const file = adjuster.find((item) => item.id === id);
              revoke(file ?? null);
              void deleteBlob(`adjuster:${id}`);
              setAdjuster((prev) => prev.filter((item) => item.id !== id));
            }}
          />
        )}
        {step === 4 && reviewPayload && (
          <StepReview
            submission={reviewPayload}
            errors={errors}
            disabled={sending}
            onChange={(consent) => setValues({ ...values, consent })}
            onEdit={(nextStep) => go(nextStep)}
          />
        )}
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 -z-10 h-0 w-0 overflow-hidden">
        <label htmlFor="estimate-hp">Company website</label>
        <input ref={honeypot} id="estimate-hp" name="company_website" type="text" tabIndex={-1} autoComplete="off" className="h-px w-px border-0 p-0" />
      </div>

      {status.kind === "error" && (
        <p role="alert" className="mt-6 border border-accent-ink px-4 py-3 text-sm leading-relaxed">
          {status.message}
        </p>
      )}
      {status.kind === "sending" && (
        <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground" aria-live="polite">
          <Loader2 className="size-4 animate-spin" aria-hidden />
          {status.message}
        </p>
      )}

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
        {step > 0 ? (
          <Button type="button" variant="outline" onClick={() => go(step - 1)} disabled={sending}>
            Back
          </Button>
        ) : (
          <span />
        )}
        {step < 4 ? (
          <Button type="submit" disabled={sending}>
            Next
          </Button>
        ) : (
          <Button type="submit" disabled={sending}>
            {sending ? "Sending" : "Send project details"}
          </Button>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
        <p aria-live="polite">{savedNote ? "Draft saved on this device." : "Your draft stays on this device."}</p>
        <button type="button" onClick={startOver} className="underline decoration-foreground/30 underline-offset-[0.35em] hover:decoration-accent-ink">
          Start over
        </button>
      </div>
    </form>
  );
}

function stored(file: LocalFile) {
  return { pathname: file.pathname ?? "", name: file.name };
}

function previewSubmission(
  values: EstimateDraft,
  roomFiles: Record<string, RoomFiles>,
  adjuster: LocalFile[],
  meta: Meta,
): EstimateSubmission {
  return {
    ...values,
    submissionId: meta.submissionId,
    accessKey: meta.accessKey,
    startedAt: meta.startedAt,
    website: "",
    pageUrl: "",
    adjusterFiles: adjuster.map((file) => ({ pathname: `preview/${file.id}`, name: file.name })),
    rooms: values.rooms.map((room) => ({
      ...room,
      files: (roomFiles[room.id]?.files ?? []).map((file, fileIndex) => ({
        pathname: `preview/${room.id}/${fileIndex}`,
        name: fileLabel(file),
      })),
      sketch: roomFiles[room.id]?.sketch ? { pathname: `preview/${room.id}/sketch`, name: roomFiles[room.id]?.sketch?.name ?? "Sketch" } : null,
    })),
  };
}

function fileLabel(file: LocalFile) {
  if (isVideoExt(file.ext)) return `${file.name} (video)`;
  return file.name;
}
