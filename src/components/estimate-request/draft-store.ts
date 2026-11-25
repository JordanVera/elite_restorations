import { hydrateDraft, type EstimateDraft } from "@/lib/estimate-request/schema";
import { MAX_SUBMIT_MS } from "@/lib/estimate-request/timing";

const DRAFT_KEY = "elite-estimate-request-v1";
const DB_NAME = "elite-estimate-request";
const STORE = "files";

export type PersistedDraft = {
  version: 1;
  step: number;
  startedAt: number;
  submissionId: string;
  accessKey: string;
  values: EstimateDraft;
};

export type StoredBlob = {
  key: string;
  blob: Blob;
  name: string;
  contentType: string;
  ext: string;
};

export function loadDraft(): PersistedDraft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PersistedDraft>;
    if (parsed.version !== 1) return null;
    const values = hydrateDraft(parsed.values);
    if (!values) return null;
    const startedAt = typeof parsed.startedAt === "number" ? parsed.startedAt : Date.now() - 60_000;
    return {
      version: 1,
      step: typeof parsed.step === "number" && parsed.step >= 0 && parsed.step <= 4 ? parsed.step : 0,
      startedAt: Date.now() - startedAt > MAX_SUBMIT_MS - 60_000 ? Date.now() - 60_000 : startedAt,
      submissionId: typeof parsed.submissionId === "string" ? parsed.submissionId : crypto.randomUUID(),
      accessKey: typeof parsed.accessKey === "string" ? parsed.accessKey : crypto.randomUUID().replace(/-/g, ""),
      values,
    };
  } catch {
    return null;
  }
}

export function saveDraft(draft: PersistedDraft) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // A private window can refuse storage. The form still works for this visit.
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // Ignore storage failures.
  }
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Storage failed."));
  });
}

export async function saveBlob(record: StoredBlob) {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(
        { blob: record.blob, name: record.name, contentType: record.contentType, ext: record.ext },
        record.key,
      );
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error("Storage failed."));
    });
    db.close();
  } catch {
    // The file stays in memory for this visit when IndexedDB is blocked.
  }
}

export async function deleteBlob(key: string) {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).delete(key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error("Storage failed."));
    });
    db.close();
  } catch {
    // A missing store should not block removing the file from the form.
  }
}

export async function loadBlobs(): Promise<StoredBlob[]> {
  try {
    const db = await openDb();
    const rows = await new Promise<StoredBlob[]>((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const request = tx.objectStore(STORE).openCursor();
      const found: StoredBlob[] = [];
      request.onsuccess = () => {
        const cursor = request.result;
        if (!cursor) {
          resolve(found);
          return;
        }
        const value = cursor.value as Omit<StoredBlob, "key">;
        if (value?.blob instanceof Blob) {
          found.push({ key: String(cursor.key), blob: value.blob, name: value.name, contentType: value.contentType, ext: value.ext });
        }
        cursor.continue();
      };
      request.onerror = () => reject(request.error ?? new Error("Storage failed."));
    });
    db.close();
    return rows;
  } catch {
    return [];
  }
}

export async function clearBlobs() {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error("Storage failed."));
    });
    db.close();
  } catch {
    // Ignore storage failures on the thank-you screen.
  }
}
