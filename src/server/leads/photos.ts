import 'server-only';

import { randomUUID } from 'node:crypto';

import { head, put } from '@vercel/blob';

import { PHOTO_PATH_PREFIX } from '@/lib/inquiry-schema';

export const MAX_PHOTO_BYTES = 4 * 1024 * 1024;

export type StoredPhoto = { pathname: string };
export type SignedPhoto = { pathname: string; url: string; expiresAt: string };

export interface PhotoStore {
  save(bytes: ArrayBuffer): Promise<StoredPhoto>;
  sign(pathname: string, now?: number): Promise<SignedPhoto>;
}

const blobStore: PhotoStore = {
  async save(bytes) {
    const pathname = `${PHOTO_PATH_PREFIX}${randomUUID()}.jpg`;
    const result = await put(pathname, Buffer.from(bytes), {
      access: 'public',
      contentType: 'image/jpeg',
      addRandomSuffix: false,
    });
    return { pathname: result.pathname };
  },

  async sign(pathname) {
    const meta = await head(pathname);
    return { pathname: meta.pathname, url: meta.url, expiresAt: '' };
  },
};

/**
 * Photo storage is opt-in like lead delivery: with no Blob credentials in the
 * environment there is no store, and callers report that photos were not kept.
 */
export function getPhotoStore(): PhotoStore | null {
  const configured =
    !!process.env.BLOB_READ_WRITE_TOKEN || !!process.env.BLOB_STORE_ID;
  return configured ? blobStore : null;
}

const JPEG_MAGIC = [0xff, 0xd8, 0xff];

export function looksLikeJpeg(bytes: ArrayBuffer) {
  const signature = new Uint8Array(bytes.slice(0, 3));
  return JPEG_MAGIC.every((b, i) => signature[i] === b);
}
