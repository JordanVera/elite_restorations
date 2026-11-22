import "server-only";

import { del, get, head, put } from "@vercel/blob";
import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

import { privateBlobConfigured, privateBlobToken } from "@/server/private-blob";

/**
 * Customer uploads. Production uses the private Blob store; local
 * development without a Blob token writes to .data/uploads (gitignored).
 */
export type StorageMode = "blob" | "local" | "none";

const LOCAL_ROOT = path.join(process.cwd(), ".data", "uploads");

export function storageMode(): StorageMode {
  if (privateBlobConfigured()) return "blob";
  if (process.env.NODE_ENV !== "production") return "local";
  return "none";
}

export const STORAGE_MISSING = "File uploads are not configured (JOBBER_BLOB_READ_WRITE_TOKEN missing).";

function localPath(pathname: string): string {
  const resolved = path.resolve(LOCAL_ROOT, pathname);
  if (!resolved.startsWith(LOCAL_ROOT + path.sep)) throw new Error("Invalid upload path.");
  return resolved;
}

export async function storeFile(pathname: string, body: Buffer, contentType: string): Promise<void> {
  const mode = storageMode();
  if (mode === "blob") {
    await put(pathname, body, {
      access: "private",
      token: privateBlobToken(),
      contentType,
      addRandomSuffix: false,
      allowOverwrite: false,
    });
    return;
  }
  if (mode === "local") {
    const target = localPath(pathname);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, body, { flag: "wx" });
    return;
  }
  throw new Error(STORAGE_MISSING);
}

/** Size and type as stored, or null when the object does not exist. */
export async function statFile(pathname: string): Promise<{ size: number; contentType: string | null } | null> {
  const mode = storageMode();
  try {
    if (mode === "blob") {
      const meta = await head(pathname, { token: privateBlobToken() });
      return { size: meta.size, contentType: meta.contentType ?? null };
    }
    if (mode === "local") {
      const info = await stat(localPath(pathname));
      return { size: info.size, contentType: null };
    }
  } catch {
    return null;
  }
  return null;
}

export async function readFileStream(pathname: string): Promise<ReadableStream<Uint8Array> | null> {
  const mode = storageMode();
  if (mode === "blob") {
    const result = await get(pathname, { access: "private", token: privateBlobToken(), useCache: false }).catch(() => null);
    return result && result.statusCode === 200 && result.stream ? result.stream : null;
  }
  if (mode === "local") {
    const data = await readFile(localPath(pathname)).catch(() => null);
    if (!data) return null;
    return new Response(new Uint8Array(data)).body;
  }
  return null;
}

/** Best effort. A failed delete leaves an orphaned object, never a broken record. */
export async function deleteFiles(pathnames: string[]): Promise<void> {
  if (!pathnames.length) return;
  const mode = storageMode();
  try {
    if (mode === "blob") await del(pathnames, { token: privateBlobToken() });
    if (mode === "local") await Promise.all(pathnames.map((p) => rm(localPath(p), { force: true })));
  } catch (error) {
    console.error("[portal] file cleanup failed", pathnames.length, error instanceof Error ? error.name : "error");
  }
}
