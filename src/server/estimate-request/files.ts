import "server-only";

import { maxBytesForExt, parseEstimatePath, sniffEstimateExt } from "@/lib/estimate-request/files";
import type { EstimateSubmission } from "@/lib/estimate-request/schema";
import { readFileStream, statFile } from "@/server/portal/storage";

export type ListedFile = { name: string; pathname: string };

export function listSubmissionFiles(submission: EstimateSubmission): ListedFile[] {
  const files: ListedFile[] = [];
  for (const room of submission.rooms) {
    files.push(...room.files);
    if (room.sketch) files.push(room.sketch);
  }
  files.push(...submission.adjusterFiles);
  return files;
}

async function prefixBytes(pathname: string): Promise<Uint8Array | null> {
  const stream = await readFileStream(pathname);
  if (!stream) return null;
  const reader = stream.getReader();
  try {
    const { value } = await reader.read();
    return value ? value.subarray(0, 64) : null;
  } finally {
    await reader.cancel().catch(() => undefined);
  }
}

/** Confirms each uploaded object exists, matches its extension, and stays under the size cap. */
export async function rejectBadFile(submission: EstimateSubmission): Promise<string | null> {
  for (const file of listSubmissionFiles(submission)) {
    const parsed = parseEstimatePath(file.pathname);
    if (!parsed) return file.name || "A file";
    const stat = await statFile(file.pathname);
    if (!stat || stat.size <= 0 || stat.size > maxBytesForExt(parsed.ext)) return file.name || "A file";
    const sniffed = sniffEstimateExt((await prefixBytes(file.pathname)) ?? new Uint8Array());
    if (sniffed !== parsed.ext) return file.name || "A file";
  }
  return null;
}
