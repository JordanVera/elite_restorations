'use client';

import * as React from 'react';
import {
  Camera,
  Download,
  Loader2,
  Plus,
  Share,
  Trash2,
  X,
} from 'lucide-react';

import { Field } from '@/components/form-fields';
import { LeadForm } from '@/components/lead-form';
import { LossFactRows, LossFacts } from '@/components/loss-facts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  EMPTY_COVER,
  EMPTY_LOSS,
  NIGHT_ACTIONS,
  NIGHT_SITUATIONS,
  carrySummary,
  checkedActionLabels,
  checklistProgress,
  checklistShareText,
  formatWhen,
  incidentForSituation,
  getClaimPacketServerSnapshot,
  getClaimPacketSnapshot,
  materialLabels,
  photosForEstimate,
  recoveryMessage,
  saveClaimPacket,
  subscribeClaimPacket,
  waterActiveForLoss,
  type CoverFields,
  type LossState,
  type NightSituation,
} from '@/lib/claim-packet';
import {
  buildInsurancePdf,
  PHOTO_SLOTS,
  photoCount,
  type LogCover,
  type PhotoSlotKey,
} from '@/lib/insurance-pdf';
import { resizeToJpeg } from '@/lib/photos-client';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

const LOG_PHOTO_EDGE = 1400;
const NOTE_LIMIT = 500;

type Slot = { blob: Blob; previewUrl: string } | null;

type RoomState = {
  id: string;
  name: string;
  note: string;
  photos: Record<PhotoSlotKey, Slot>;
};

const emptyRoom = (id: string): RoomState => ({
  id,
  name: '',
  note: '',
  photos: { wide: null, close: null, wet: null },
});

type Status =
  | { kind: 'idle' }
  | { kind: 'building' }
  | { kind: 'done'; filename: string }
  | { kind: 'error' };

type Handoff = {
  name: string;
  address: string;
  incident: string;
  waterActive: string;
  message: string;
  photos: { blob: Blob; name: string }[];
};

function roomSerial(id: string) {
  const match = /^room-(\d+)$/.exec(id);
  return match ? Number(match[1]) : 0;
}

function PhotoSlot({
  id,
  label,
  prompt,
  slot,
  onPick,
  onClear,
}: {
  id: string;
  label: string;
  prompt: string;
  slot: Slot;
  onPick: (file: File) => Promise<void>;
  onClear: () => void;
}) {
  const [busy, setBusy] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    setBusy(true);
    setFailed(false);
    try {
      await onPick(file);
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <p className="eyebrow text-muted-foreground">{label}</p>
      <p className="mt-2 min-h-[3.75rem] text-sm leading-relaxed text-muted-foreground">
        {prompt}
      </p>
      <div className="relative mt-3 aspect-[4/3] overflow-hidden border border-border bg-surface">
        {slot ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
            <img
              src={slot.previewUrl}
              alt={`${label} photo`}
              className="size-full object-cover"
            />
            <button
              type="button"
              onClick={onClear}
              className="absolute right-2 top-2 inline-flex size-8 items-center justify-center bg-background/90 transition-colors hover:bg-accent hover:text-white"
            >
              <X className="size-4" aria-hidden />
              <span className="sr-only">
                Remove {label.toLowerCase()} photo
              </span>
            </button>
          </>
        ) : (
          <label
            htmlFor={id}
            className="flex size-full cursor-pointer flex-col items-center justify-center gap-3 text-muted-foreground transition-colors hover:text-foreground has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-4 has-[:focus-visible]:outline-accent-ink"
          >
            {busy ? (
              <Loader2 className="size-6 animate-spin" aria-hidden />
            ) : (
              <Camera className="size-6" aria-hidden />
            )}
            <span className="eyebrow">{busy ? 'Preparing' : 'Add photo'}</span>
            <input
              id={id}
              type="file"
              accept="image/*"
              onChange={onChange}
              disabled={busy}
              className="sr-only"
            />
          </label>
        )}
      </div>
      {failed && (
        <p role="alert" className="mt-2 text-sm text-accent-ink">
          We could not read that file. Try a JPEG or PNG.
        </p>
      )}
    </div>
  );
}

export function InsuranceLog() {
  const [cover, setCover] = React.useState<CoverFields>(EMPTY_COVER);
  const [loss, setLoss] = React.useState<LossState>(EMPTY_LOSS);
  const [situation, setSituation] = React.useState<NightSituation | ''>('');
  const [checks, setChecks] = React.useState<string[]>([]);
  const [rooms, setRooms] = React.useState<RoomState[]>(() => [
    emptyRoom('room-1'),
  ]);
  const [status, setStatus] = React.useState<Status>({ kind: 'idle' });
  const [ready, setReady] = React.useState(false);
  const [shareStatus, setShareStatus] = React.useState('');
  const [handoff, setHandoff] = React.useState<Handoff | null>(null);
  const latest = React.useRef(rooms);
  const sharing = React.useRef(false);
  const estimateRef = React.useRef<HTMLElement>(null);
  const stored = React.useSyncExternalStore(
    subscribeClaimPacket,
    getClaimPacketSnapshot,
    getClaimPacketServerSnapshot,
  );

  if (!ready && stored.source === 'client') {
    setReady(true);
    if (stored.packet) {
      setCover(stored.packet.cover);
      setLoss(stored.packet.loss);
      setSituation(stored.packet.situation);
      setChecks(stored.packet.checks);
      if (stored.packet.rooms.length > 0) {
        setRooms(
          stored.packet.rooms.map((room) => ({
            ...emptyRoom(room.id),
            name: room.name,
            note: room.note,
          })),
        );
      }
    }
  }

  React.useEffect(() => {
    latest.current = rooms;
  }, [rooms]);

  React.useEffect(
    () => () => {
      for (const room of latest.current) {
        for (const slot of Object.values(room.photos))
          if (slot) URL.revokeObjectURL(slot.previewUrl);
      }
    },
    [],
  );

  React.useEffect(() => {
    if (!ready) return;
    saveClaimPacket({
      situation,
      checks,
      cover,
      loss,
      rooms: rooms.map(({ id, name, note }) => ({ id, name, note })),
    });
  }, [ready, situation, checks, cover, loss, rooms]);

  React.useEffect(() => {
    if (handoff)
      estimateRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
  }, [handoff]);

  const updateRoom = (id: string, patch: Partial<RoomState>) =>
    setRooms((prev) =>
      prev.map((room) => (room.id === id ? { ...room, ...patch } : room)),
    );

  const patchLoss = (patch: Partial<LossState>) =>
    setLoss((prev) => ({ ...prev, ...patch }));

  function toggleCheck(id: string) {
    setChecks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }

  async function pick(room: RoomState, key: PhotoSlotKey, file: File) {
    const blob = await resizeToJpeg(file, LOG_PHOTO_EDGE);
    const previous = room.photos[key];
    if (previous) URL.revokeObjectURL(previous.previewUrl);
    setRooms((prev) =>
      prev.map((r) =>
        r.id === room.id
          ? {
              ...r,
              photos: {
                ...r.photos,
                [key]: { blob, previewUrl: URL.createObjectURL(blob) },
              },
            }
          : r,
      ),
    );
  }

  function clear(room: RoomState, key: PhotoSlotKey) {
    const previous = room.photos[key];
    if (previous) URL.revokeObjectURL(previous.previewUrl);
    updateRoom(room.id, { photos: { ...room.photos, [key]: null } });
  }

  function addRoom() {
    setRooms((prev) => {
      const next =
        prev.reduce((max, room) => Math.max(max, roomSerial(room.id)), 0) + 1;
      return [...prev, emptyRoom(`room-${next}`)];
    });
  }

  function removeRoom(room: RoomState) {
    for (const slot of Object.values(room.photos))
      if (slot) URL.revokeObjectURL(slot.previewUrl);
    setRooms((prev) => prev.filter((r) => r.id !== room.id));
  }

  async function textList() {
    if (sharing.current) return;
    sharing.current = true;
    const text = checklistShareText(situation, cover.address);
    const url = `${site.url}/insurance-log#first-night`;
    try {
      if (typeof navigator.share === 'function') {
        try {
          await navigator.share({ title: 'First-night checklist', text, url });
          setShareStatus('Share sheet opened.');
          return;
        } catch (error) {
          if (error instanceof DOMException && error.name === 'AbortError')
            return;
        }
      }
      window.location.href = `sms:?&body=${encodeURIComponent(text)}`;
      setShareStatus('Opening a text message with the list.');
    } finally {
      sharing.current = false;
    }
  }

  const logRooms = rooms.map((room) => ({
    name: room.name,
    note: room.note,
    photos: {
      wide: room.photos.wide?.blob ?? null,
      close: room.photos.close?.blob ?? null,
      wet: room.photos.wet?.blob ?? null,
    },
  }));
  const total = photoCount(logRooms);
  const carried = photosForEstimate(rooms);
  const building = status.kind === 'building';
  const progress = checklistProgress(situation, checks, loss);
  const nightActions = situation ? NIGHT_ACTIONS[situation] : [];

  const packetCover = (): LogCover => ({
    ...cover,
    waterStarted: loss.waterStarted ? formatWhen(loss.waterStarted) : '',
    waterStopped: loss.stillComingIn
      ? 'Still coming in'
      : loss.waterStopped
        ? formatWhen(loss.waterStopped)
        : '',
    materials: materialLabels(loss.materials).join(', '),
    moved: loss.nothingMoved ? 'Nothing was moved' : loss.moved.trim(),
    actions: checkedActionLabels(situation, checks)
      .map((label) => `• ${label}`)
      .join('\n'),
  });

  async function download() {
    if (total === 0 || building) return;
    setStatus({ kind: 'building' });
    try {
      const bytes = await buildInsurancePdf(packetCover(), logRooms);
      const filename = `claim-packet-${new Date().toISOString().slice(0, 10)}.pdf`;
      const url = URL.createObjectURL(
        new Blob([bytes as BlobPart], { type: 'application/pdf' }),
      );
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
      setStatus({ kind: 'done', filename });
    } catch {
      setStatus({ kind: 'error' });
    }
  }

  function openEstimate() {
    setHandoff({
      name: cover.owner,
      address: cover.address,
      incident: incidentForSituation(situation),
      waterActive: waterActiveForLoss(loss),
      message: recoveryMessage(loss),
      photos: photosForEstimate(rooms),
    });
  }

  const setCoverField =
    (field: keyof CoverFields) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setCover((prev) => ({ ...prev, [field]: event.target.value }));

  return (
    <div className="space-y-20">
      {/* <section
        id="first-night"
        aria-labelledby="first-night-title"
        className="max-w-lg scroll-mt-28"
      >
        <p className="eyebrow text-accent-ink">First night</p>
        <h2 id="first-night-title" className="font-display t-md mt-4">
          If water is coming in right now.
        </h2>
        <p className="mt-3 text-muted-foreground">
          A short list for an active leak or an open roof. Text it to whoever is
          at the house. It saves on this phone and fills the claim packet below.
        </p>

        <div
          className="mt-8 grid gap-3"
          role="radiogroup"
          aria-label="What is happening"
        >
          {NIGHT_SITUATIONS.map((item) => (
            <label key={item.value} className="cursor-pointer">
              <input
                type="radio"
                name="night-situation"
                value={item.value}
                checked={situation === item.value}
                onChange={() => setSituation(item.value)}
                className="peer sr-only"
              />
              <span className="block border border-input p-4 transition-colors peer-checked:border-accent peer-checked:bg-accent/10 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-ink">
                <span className="font-display block text-2xl">
                  {item.label}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </span>
              </span>
            </label>
          ))}
        </div>

        <div className="mt-6">
          <Button
            type="button"
            variant="accent"
            size="lg"
            className="w-full"
            onClick={() => void textList()}
          >
            Text this list
            <Share aria-hidden />
          </Button>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            {stored.persisted && <p>Saved on this phone.</p>}
            {shareStatus && <p role="status">{shareStatus}</p>}
          </div>
        </div>

        {situation && (
          <>
            <p
              className="mt-8 text-sm text-muted-foreground"
              aria-live="polite"
            >
              {progress.done} of {progress.total} done.
            </p>
            <ol className="mt-4 space-y-3">
              {nightActions.map((action) => (
                <li key={action.id}>
                  <label className="flex min-h-14 cursor-pointer items-start gap-4 border border-border p-4 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-ink">
                    <input
                      type="checkbox"
                      className="mt-1 size-5 shrink-0 accent-accent"
                      checked={checks.includes(action.id)}
                      onChange={() => toggleCheck(action.id)}
                    />
                    <span className="leading-relaxed">{action.label}</span>
                  </label>
                </li>
              ))}
              <LossFactRows idPrefix="night" loss={loss} onChange={patchLoss} />
            </ol>
          </>
        )}
      </section> */}

      <section aria-labelledby="log-property">
        <p className="eyebrow text-accent-ink">Step 1</p>
        <h2 id="log-property" className="font-display t-md mt-4">
          About the property.
        </h2>
        <p className="mt-3 max-w-[52ch] text-muted-foreground">
          These details go on the cover page. Add what you have; everything here
          is optional.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <Field id="log-owner" label="Property owner" optional>
            <Input
              id="log-owner"
              autoComplete="name"
              value={cover.owner}
              onChange={setCoverField('owner')}
            />
          </Field>
          <Field id="log-address" label="Property address" optional>
            <Input
              id="log-address"
              autoComplete="street-address"
              value={cover.address}
              onChange={setCoverField('address')}
            />
          </Field>
          <Field id="log-insurer" label="Insurance company" optional>
            <Input
              id="log-insurer"
              value={cover.insurer}
              onChange={setCoverField('insurer')}
            />
          </Field>
          <Field id="log-claim" label="Claim number" optional>
            <Input
              id="log-claim"
              value={cover.claimNumber}
              onChange={setCoverField('claimNumber')}
            />
          </Field>
          <Field id="log-date" label="Date of damage" optional>
            <Input
              id="log-date"
              type="date"
              value={cover.lossDate}
              onChange={setCoverField('lossDate')}
            />
          </Field>
        </div>
      </section>

      <section
        id="what-happened"
        aria-labelledby="log-loss"
        className="scroll-mt-28"
      >
        <p className="eyebrow text-accent-ink">Step 2</p>
        <h2 id="log-loss" className="font-display t-md mt-4">
          What happened.
        </h2>
        <p className="mt-3 max-w-[52ch] text-muted-foreground">
          When the water started and stopped, what was moved, and which
          materials got wet. The list above writes these too. Everything here is
          optional.
        </p>
        <LossFacts idPrefix="loss" loss={loss} onChange={patchLoss} />
      </section>

      <section
        id="log-rooms"
        aria-labelledby="log-rooms-title"
        className="scroll-mt-28"
      >
        <p className="eyebrow text-accent-ink">Step 3</p>
        <h2 id="log-rooms-title" className="font-display t-md mt-4">
          Photograph each room.
        </h2>
        <p className="mt-3 max-w-[52ch] text-muted-foreground">
          Take the photos before anything is moved, dried or thrown out. Three
          shots per room is enough.
        </p>

        <ol className="mt-10 space-y-12">
          {rooms.map((room, index) => (
            <li
              key={room.id}
              className="border border-border p-6 md:p-8"
              aria-label={`Room ${index + 1}`}
            >
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div className="min-w-[14rem] flex-1 sm:max-w-md">
                  <Field
                    id={`room-name-${room.id}`}
                    label={`Room ${index + 1}`}
                  >
                    <Input
                      id={`room-name-${room.id}`}
                      placeholder="Kitchen, hallway, attic…"
                      value={room.name}
                      onChange={(e) =>
                        updateRoom(room.id, { name: e.target.value })
                      }
                    />
                  </Field>
                </div>
                {rooms.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRoom(room)}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-[0.5em] transition-colors hover:text-accent-ink"
                  >
                    <Trash2 className="size-4" aria-hidden />
                    Remove this room
                  </button>
                )}
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-3">
                {PHOTO_SLOTS.map((slot) => (
                  <PhotoSlot
                    key={slot.key}
                    id={`slot-${room.id}-${slot.key}`}
                    label={slot.label}
                    prompt={slot.prompt}
                    slot={room.photos[slot.key]}
                    onPick={(file) => pick(room, slot.key, file)}
                    onClear={() => clear(room, slot.key)}
                  />
                ))}
              </div>

              <div className="mt-8">
                <Field id={`room-note-${room.id}`} label="Notes" optional>
                  <Textarea
                    id={`room-note-${room.id}`}
                    rows={3}
                    maxLength={NOTE_LIMIT}
                    placeholder="What you see, how far it spreads, what was affected."
                    value={room.note}
                    onChange={(e) =>
                      updateRoom(room.id, { note: e.target.value })
                    }
                  />
                </Field>
                <p className="mt-1 text-right text-xs text-muted-foreground">
                  {room.note.length} / {NOTE_LIMIT}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="mt-10"
          onClick={addRoom}
        >
          <Plus aria-hidden />
          Add another room
        </Button>
      </section>

      <section aria-labelledby="log-download">
        <p className="eyebrow text-accent-ink">Step 4</p>
        <h2 id="log-download" className="font-display t-md mt-4">
          Download your record.
        </h2>
        <p className="mt-3 max-w-[56ch] leading-relaxed text-muted-foreground">
          The PDF is built in your browser. Your photos stay on this device and
          are not uploaded anywhere. Keep this page open until you have
          downloaded the file. It includes the loss summary and the room photos.
          It is a record you can hand to your adjuster, not a filing with your
          insurer.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button
            type="button"
            variant="accent"
            size="xl"
            onClick={download}
            disabled={total === 0 || building}
          >
            {building ? (
              <>
                Building PDF
                <Loader2 className="animate-spin" aria-hidden />
              </>
            ) : (
              <>
                Download claim packet
                <Download aria-hidden />
              </>
            )}
          </Button>
          <p className={cn('text-sm text-muted-foreground')} aria-live="polite">
            {total === 0
              ? 'Add at least one photo to enable the download.'
              : `${total} ${total === 1 ? 'photo' : 'photos'} across ${rooms.length} ${rooms.length === 1 ? 'room' : 'rooms'}.`}
          </p>
        </div>

        <div role="status" aria-live="polite" className="mt-6">
          {status.kind === 'done' && (
            <p className="max-w-[56ch] leading-relaxed">
              Downloaded {status.filename}. Send it to your adjuster, and keep a
              copy with your claim paperwork.
            </p>
          )}
          {status.kind === 'error' && (
            <p role="alert" className="text-accent-ink">
              We could not build the PDF. Please try again.
            </p>
          )}
        </div>
      </section>

      <section
        ref={estimateRef}
        aria-labelledby="log-estimate"
        className="scroll-mt-28"
      >
        <p className="eyebrow text-accent-ink">After the packet</p>
        <h2 id="log-estimate" className="font-display t-md mt-4">
          Send the photos with a recovery request.
        </h2>
        <p className="mt-3 max-w-[56ch] leading-relaxed text-muted-foreground">
          The request can include 6 photos. Close-ups and wet materials go
          first. The PDF keeps every photo. Nothing is sent until you submit the
          form.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          {carrySummary(total, carried.length)}
        </p>

        {handoff ? (
          <div className="mt-10 max-w-3xl">
            <LeadForm
              lockPath="recovery"
              defaultName={handoff.name}
              defaultAddress={handoff.address}
              defaultIncident={handoff.incident}
              defaultWaterActive={handoff.waterActive}
              defaultMessage={handoff.message}
              initialPhotos={handoff.photos}
            />
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="mt-8"
            onClick={openEstimate}
          >
            Continue to the request
          </Button>
        )}
      </section>
    </div>
  );
}
