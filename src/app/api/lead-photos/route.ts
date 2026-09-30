import { NextResponse } from "next/server";

import { MAX_PHOTO_BYTES, getPhotoStore, looksLikeJpeg } from "@/server/leads/photos";
import { isRateLimited } from "@/server/rate-limit";
import { clientIp } from "@/server/trpc/init";

export const dynamic = "force-dynamic";

const PHOTO_UPLOADS_PER_WINDOW = 30;

type UploadError = "not-configured" | "rate-limited" | "invalid" | "too-large" | "failed";

const fail = (error: UploadError, status: number) => NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  if (isRateLimited(`photo:${clientIp(req)}`, { max: PHOTO_UPLOADS_PER_WINDOW })) {
    return fail("rate-limited", 429);
  }

  const store = getPhotoStore();
  if (!store) return fail("not-configured", 503);

  let file: FormDataEntryValue | null;
  try {
    file = (await req.formData()).get("file");
  } catch {
    return fail("invalid", 400);
  }

  if (!(file instanceof File) || file.type !== "image/jpeg") return fail("invalid", 400);
  if (file.size > MAX_PHOTO_BYTES) return fail("too-large", 413);

  const bytes = await file.arrayBuffer();
  if (!looksLikeJpeg(bytes)) return fail("invalid", 400);

  try {
    const { pathname } = await store.save(bytes);
    return NextResponse.json({ pathname });
  } catch {
    return fail("failed", 502);
  }
}
