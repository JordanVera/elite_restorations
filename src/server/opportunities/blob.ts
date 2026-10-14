import "server-only";

import { get, put } from "@vercel/blob";

export function privateBlobConfigured() {
  return Boolean(process.env.OPPORTUNITY_BLOB_READ_WRITE_TOKEN?.trim());
}

function token() {
  const value = process.env.OPPORTUNITY_BLOB_READ_WRITE_TOKEN?.trim();
  if (!value) throw new Error("Private image storage is not configured. Set OPPORTUNITY_BLOB_READ_WRITE_TOKEN for a private Blob store.");
  return value;
}

export async function savePrivateImage(pathname: string, bytes: Buffer, contentType: string) {
  const result = await put(pathname, bytes, {
    access: "private",
    token: token(),
    contentType,
    addRandomSuffix: false,
  });
  return result.pathname;
}

export async function readPrivateImage(pathname: string) {
  const result = await get(pathname, { access: "private", token: token() });
  if (!result || result.statusCode !== 200) return null;
  return result;
}
