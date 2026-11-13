/**
 * Read-write token for the private Blob store.
 * OAuth tokens, the LSA watermark, and lead dedupe all use this.
 * Never fall back to BLOB_READ_WRITE_TOKEN. That token is the public photo store.
 */
export const PRIVATE_BLOB_MISSING =
  "Private token store not configured (JOBBER_BLOB_READ_WRITE_TOKEN missing)";

export function privateBlobTokenFrom(env: Record<string, string | undefined>): string {
  const token = env.JOBBER_BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) throw new Error(PRIVATE_BLOB_MISSING);
  return token;
}

export function privateBlobConfiguredFrom(env: Record<string, string | undefined>): boolean {
  return Boolean(env.JOBBER_BLOB_READ_WRITE_TOKEN?.trim());
}
