import "server-only";

import { BlobError, BlobNotFoundError, del, get, put } from "@vercel/blob";

import {
  PRIVATE_BLOB_MISSING,
  privateBlobConfiguredFrom,
  privateBlobTokenFrom,
} from "@/server/private-blob-token";

export { PRIVATE_BLOB_MISSING };

export function privateBlobConfigured(): boolean {
  return privateBlobConfiguredFrom(process.env);
}

export function privateBlobToken(): string {
  return privateBlobTokenFrom(process.env);
}

export function isMissingPrivateBlob(error: unknown): boolean {
  return error instanceof Error && error.message === PRIVATE_BLOB_MISSING;
}

export function isPrivateBlobError(error: unknown): boolean {
  if (error instanceof BlobError) return true;
  if (!(error instanceof Error)) return false;
  return error.message === PRIVATE_BLOB_MISSING || error.message.includes("Vercel Blob:");
}

function isMissingBlob(error: unknown): boolean {
  if (error instanceof BlobNotFoundError) return true;
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  return message.includes("not_found") || /\bnot found\b/.test(message) || message.includes("does not exist");
}

export async function readPrivateText(pathname: string): Promise<{ text: string; etag: string } | null> {
  const token = privateBlobToken();
  try {
    const result = await get(pathname, { access: "private", token, useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    const text = await new Response(result.stream).text();
    return { text, etag: result.blob.etag };
  } catch (error) {
    if (isMissingBlob(error)) return null;
    throw error;
  }
}

export async function writePrivateText(pathname: string, text: string, etag?: string): Promise<string> {
  const token = privateBlobToken();
  const result = await put(pathname, text, {
    access: "private",
    token,
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
    ...(etag ? { ifMatch: etag } : {}),
  });
  return result.etag ?? etag ?? "";
}

/** Claim a path. Fails when the object already exists so two writers cannot both win. */
export async function createPrivateText(pathname: string, text: string): Promise<void> {
  const token = privateBlobToken();
  await put(pathname, text, {
    access: "private",
    token,
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: false,
    cacheControlMaxAge: 60,
  });
}

export async function deletePrivateText(pathname: string): Promise<void> {
  const token = privateBlobToken();
  try {
    await del(pathname, { token });
  } catch (error) {
    if (isMissingBlob(error)) return;
    throw error;
  }
}
