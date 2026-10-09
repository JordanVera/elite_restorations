import { MAX_PHOTOS } from '@/lib/inquiry-schema';
import { site } from '@/lib/site';

export const PACKET_STORAGE_KEY = 'elite-restorations-claim-packet-v1';
export const MOVED_LIMIT = 500;

export const AFFECTED_MATERIALS = [
  { value: 'drywall', label: 'Drywall' },
  { value: 'ceiling', label: 'Ceiling' },
  { value: 'insulation', label: 'Insulation' },
  { value: 'flooring', label: 'Flooring' },
  { value: 'cabinets', label: 'Cabinets' },
  { value: 'trim', label: 'Trim' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'belongings', label: 'Belongings' },
  { value: 'roofing', label: 'Roofing' },
] as const;

export type MaterialKey = (typeof AFFECTED_MATERIALS)[number]['value'];

export const NIGHT_SITUATIONS = [
  {
    value: 'leak',
    label: 'Active leak',
    body: 'A pipe, an appliance, or water from the ceiling.',
  },
  {
    value: 'roof',
    label: 'Open roof',
    body: 'Missing shingles, or the roof open to the weather.',
  },
] as const;

export type NightSituation = (typeof NIGHT_SITUATIONS)[number]['value'];

export const NIGHT_ACTIONS = {
  leak: [
    {
      id: 'shutoff',
      label: 'If it is safe, shut off the water at the main valve.',
    },
    {
      id: 'standing',
      label:
        'Stay out of standing water near outlets, appliances, or the breaker panel.',
    },
    {
      id: 'photograph',
      label: 'Photograph each wet room before you move or throw anything out.',
    },
  ],
  roof: [
    { id: 'stay-off', label: 'Stay off the roof.' },
    {
      id: 'under',
      label:
        'Move belongings out from under the opening, and catch the drip from inside if you can reach it.',
    },
    {
      id: 'leave',
      label:
        'Leave wet insulation and ceiling material in place until it is photographed.',
    },
  ],
} as const;

const ACTION_IDS = new Set<string>(
  [...NIGHT_ACTIONS.leak, ...NIGHT_ACTIONS.roof].map((action) => action.id),
);
const MATERIAL_KEYS = new Set<string>(
  AFFECTED_MATERIALS.map((item) => item.value),
);

export type CoverFields = {
  owner: string;
  address: string;
  insurer: string;
  claimNumber: string;
  lossDate: string;
};

export type LossState = {
  waterStarted: string;
  waterStopped: string;
  stillComingIn: boolean;
  moved: string;
  nothingMoved: boolean;
  materials: MaterialKey[];
};

export type SavedRoom = { id: string; name: string; note: string };

export type SavedPacket = {
  situation: NightSituation | '';
  checks: string[];
  cover: CoverFields;
  loss: LossState;
  rooms: SavedRoom[];
};

export const EMPTY_COVER: CoverFields = {
  owner: '',
  address: '',
  insurer: '',
  claimNumber: '',
  lossDate: '',
};

export const EMPTY_LOSS: LossState = {
  waterStarted: '',
  waterStopped: '',
  stillComingIn: false,
  moved: '',
  nothingMoved: false,
  materials: [],
};

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const DATETIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
const ROOM_ID = /^room-\d+$/;

function clip(value: unknown, max: number) {
  return typeof value === 'string' ? value.slice(0, max) : '';
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function normalize(value: unknown): SavedPacket | null {
  const data = asRecord(value);
  if (!data) return null;

  const cover = asRecord(data.cover);
  const loss = asRecord(data.loss);
  const situation =
    data.situation === 'leak' || data.situation === 'roof'
      ? data.situation
      : '';
  const checks = Array.isArray(data.checks)
    ? [
        ...new Set(
          data.checks.filter(
            (id): id is string => typeof id === 'string' && ACTION_IDS.has(id),
          ),
        ),
      ]
    : [];

  const picked = new Set(
    Array.isArray(loss?.materials)
      ? loss.materials.filter((key): key is string => typeof key === 'string')
      : [],
  );
  const materials = AFFECTED_MATERIALS.map((item) => item.value).filter(
    (key) => picked.has(key) && MATERIAL_KEYS.has(key),
  );

  const stillComingIn = loss?.stillComingIn === true;
  const nothingMoved = loss?.nothingMoved === true;
  const waterStarted = DATETIME.test(clip(loss?.waterStarted, 16))
    ? clip(loss?.waterStarted, 16)
    : '';
  const waterStopped =
    stillComingIn || !DATETIME.test(clip(loss?.waterStopped, 16))
      ? ''
      : clip(loss?.waterStopped, 16);
  const moved = nothingMoved ? '' : clip(loss?.moved, MOVED_LIMIT);

  const rooms: SavedRoom[] = [];
  const seen = new Set<string>();
  if (Array.isArray(data.rooms)) {
    for (const entry of data.rooms) {
      const room = asRecord(entry);
      if (!room) continue;
      const id = clip(room.id, 24);
      if (!ROOM_ID.test(id) || seen.has(id)) continue;
      seen.add(id);
      rooms.push({
        id,
        name: clip(room.name, 120),
        note: clip(room.note, 500),
      });
      if (rooms.length >= 24) break;
    }
  }

  const lossDate = clip(cover?.lossDate, 10);

  return {
    situation,
    checks,
    cover: {
      owner: clip(cover?.owner, 200),
      address: clip(cover?.address, 200),
      insurer: clip(cover?.insurer, 200),
      claimNumber: clip(cover?.claimNumber, 80),
      lossDate: DATE.test(lossDate) ? lossDate : '',
    },
    loss: {
      waterStarted,
      waterStopped,
      stillComingIn,
      moved,
      nothingMoved,
      materials,
    },
    rooms,
  };
}

export type ClaimSnapshot = {
  packet: SavedPacket | null;
  persisted: boolean;
  source: 'server' | 'client';
};

const SERVER_SNAPSHOT: ClaimSnapshot = {
  packet: null,
  persisted: false,
  source: 'server',
};

let clientSnapshot: ClaimSnapshot | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

export function subscribeClaimPacket(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

export function getClaimPacketSnapshot(): ClaimSnapshot {
  if (!clientSnapshot) {
    try {
      const raw = window.localStorage.getItem(PACKET_STORAGE_KEY);
      const packet = raw ? normalize(JSON.parse(raw) as unknown) : null;
      clientSnapshot = { packet, persisted: packet !== null, source: 'client' };
    } catch {
      clientSnapshot = { packet: null, persisted: false, source: 'client' };
    }
  }
  return clientSnapshot;
}

export function getClaimPacketServerSnapshot(): ClaimSnapshot {
  return SERVER_SNAPSHOT;
}

export function saveClaimPacket(packet: SavedPacket): boolean {
  try {
    window.localStorage.setItem(PACKET_STORAGE_KEY, JSON.stringify(packet));
    if (!clientSnapshot?.persisted) {
      clientSnapshot = {
        packet: clientSnapshot?.packet ?? null,
        persisted: true,
        source: 'client',
      };
      emit();
    }
    return true;
  } catch {
    if (clientSnapshot?.persisted) {
      clientSnapshot = {
        packet: clientSnapshot.packet,
        persisted: false,
        source: 'client',
      };
      emit();
    }
    return false;
  }
}

export function lossFieldStatus(loss: LossState) {
  return {
    times:
      loss.waterStarted !== '' &&
      (loss.stillComingIn || loss.waterStopped !== ''),
    moved: loss.nothingMoved || loss.moved.trim() !== '',
    materials: loss.materials.length > 0,
  };
}

export function checklistProgress(
  situation: NightSituation | '',
  checks: readonly string[],
  loss: LossState,
) {
  if (!situation) return { done: 0, total: 0 };
  const status = lossFieldStatus(loss);
  const actions = NIGHT_ACTIONS[situation];
  const actionDone = actions.filter((action) =>
    checks.includes(action.id),
  ).length;
  const fieldDone =
    Number(status.times) + Number(status.moved) + Number(status.materials);
  return { done: actionDone + fieldDone, total: actions.length + 3 };
}

export function checkedActionLabels(
  situation: NightSituation | '',
  checks: readonly string[],
) {
  if (!situation) return [];
  return NIGHT_ACTIONS[situation]
    .filter((action) => checks.includes(action.id))
    .map((action) => action.label);
}

export function materialLabels(keys: readonly MaterialKey[]) {
  const picked = new Set(keys);
  return AFFECTED_MATERIALS.filter((item) => picked.has(item.value)).map(
    (item) => item.label,
  );
}

export function formatWhen(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);
  if (!match) return value;
  const date = new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
    Number(match[4]),
    Number(match[5]),
  );
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function incidentForSituation(situation: NightSituation | '') {
  if (situation === 'roof') return 'storm-roof';
  if (situation === 'leak') return 'leak';
  return '';
}

export function waterActiveForLoss(loss: LossState) {
  if (loss.stillComingIn) return 'yes';
  if (loss.waterStopped) return 'no';
  return '';
}

export function recoveryMessage(loss: LossState) {
  const lines: string[] = [];
  if (loss.waterStarted)
    lines.push(`Water started: ${formatWhen(loss.waterStarted)}`);
  if (loss.stillComingIn) lines.push('Water stopped: still coming in');
  else if (loss.waterStopped)
    lines.push(`Water stopped: ${formatWhen(loss.waterStopped)}`);
  const materials = materialLabels(loss.materials);
  if (materials.length > 0)
    lines.push(`Materials affected: ${materials.join(', ')}`);
  if (loss.nothingMoved) lines.push('Moved: nothing was moved');
  else if (loss.moved.trim()) lines.push(`Moved: ${loss.moved.trim()}`);
  return lines.join('\n');
}

export function checklistShareText(
  situation: NightSituation | '',
  address: string,
) {
  const place = address.trim() ? ` at ${address.trim()}` : '';
  const lead =
    situation === 'roof'
      ? `The roof is open${place}.`
      : situation === 'leak'
        ? `There is an active leak${place}.`
        : `Water is coming in${place}.`;
  return `${lead} Follow this list on your phone. Call ${site.name} at ${site.phone.display} if you need them tonight. ${site.url}/insurance-log#first-night`;
}

const CARRY_ORDER = [
  { key: 'close', label: 'Close-up of damage' },
  { key: 'wet', label: 'Wet materials' },
  { key: 'wide', label: 'Wide shot' },
] as const;

export function photosForEstimate(
  rooms: readonly {
    name: string;
    photos: Record<(typeof CARRY_ORDER)[number]['key'], { blob: Blob } | null>;
  }[],
) {
  const picked: { blob: Blob; name: string }[] = [];
  for (const [index, room] of rooms.entries()) {
    const roomName = room.name.trim() || `Room ${index + 1}`;
    for (const slot of CARRY_ORDER) {
      const photo = room.photos[slot.key];
      if (!photo) continue;
      picked.push({ blob: photo.blob, name: `${roomName}, ${slot.label}` });
      if (picked.length >= MAX_PHOTOS) return picked;
    }
  }
  return picked;
}

export function carrySummary(total: number, carried: number) {
  if (total === 0)
    return 'No photos yet. You can still send what you wrote down, or add photos above first.';
  if (carried >= total)
    return `All ${total} ${total === 1 ? 'photo' : 'photos'} will go with the request.`;
  return `${carried} of ${total} photos will go with the request. The PDF keeps all ${total}.`;
}
