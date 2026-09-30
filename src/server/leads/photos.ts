import "server-only";

import { randomUUID } from "node:crypto";

import { issueSignedToken, presignUrl, put } from "@vercel/blob";

import { PHOTO_PATH_PREFIX } from "@/lib/inquiry-schema";

export const MAX_PHOTO_BYTES = 4 * 1024 * 1024;
export const PHOTO_LINK_TTL_MS = 14 * 24 * 60 * 60 * 1000;

export type StoredPhoto = { pathname: string };
export type SignedPhoto = { url: string; expiresAt: string };

export interface PhotoStore {
  save(bytes: ArrayBuffer): Promise<StoredPhoto>;
  sign(pathname: string, now?: number): Promise<SignedPhoto>;
}

const blobStore: PhotoStore = {
  async save(bytes) {
    const pathname = `${PHOTO_PATH_PREFIX}${randomUUID()}.jpg`;
    const result = await put(pathname, Buffer.from(bytes), {
      access: "private",
      contentType: "image/jpeg",
      addRandomSuffix: false,
    });
    return { pathname: result.pathname };
  },

  async sign(pathname, now = Date.now()) {
    const validUntil = now + PHOTO_LINK_TTL_MS;
    const token = await issueSignedToken({ pathname, operations: ["get"], validUntil });
    const { presignedUrl } = await presignUrl(token, {
      access: "private",
      operation: "get",
      pathname,
      validUntil,
    });
    return { url: presignedUrl, expiresAt: new Date(validUntil).toISOString() };
  },
};

/**
 * Photo storage is opt-in like lead delivery: with no Blob credentials in the
 * environment there is no store, and callers report that photos were not kept.
 */
export function getPhotoStore(): PhotoStore | null {
  const configured = !!process.env.BLOB_READ_WRITE_TOKEN || !!process.env.BLOB_STORE_ID;
  return configured ? blobStore : null;
}

const JPEG_MAGIC = [0xff, 0xd8, 0xff];

export function looksLikeJpeg(bytes: ArrayBuffer) {
  const head = new Uint8Array(bytes.slice(0, 3));
  return JPEG_MAGIC.every((b, i) => head[i] === b);
}
