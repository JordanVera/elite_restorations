import "server-only";

import OpenAI from "openai";
import { toFile } from "openai";

import { imageModel } from "@/server/opportunities/analyze";

const SUPPORTS_INPUT_FIDELITY = new Set(["gpt-image-1", "gpt-image-1.5"]);

export async function editRoomPhoto(input: {
  bytes: Buffer;
  mime: string;
  prompt: string;
  quality: "low" | "medium" | "high";
}) {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) throw new Error("OPENAI_API_KEY is not configured.");
  const model = imageModel();
  const client = new OpenAI({ apiKey: key });
  const extension = input.mime === "image/png" ? "png" : input.mime === "image/webp" ? "webp" : "jpg";
  const image = await toFile(input.bytes, `room.${extension}`, { type: input.mime });
  const fidelity = SUPPORTS_INPUT_FIDELITY.has(model) ? ({ input_fidelity: "high" as const }) : {};
  const result = await client.images.edit({
    model,
    image,
    prompt: input.prompt,
    n: 1,
    quality: input.quality,
    output_format: "jpeg",
    ...fidelity,
  });
  const first = result.data?.[0];
  const encoded = first?.b64_json;
  if (!encoded) throw new Error("The image edit did not return an image.");
  return {
    bytes: Buffer.from(encoded, "base64"),
    usage: result.usage ?? null,
  };
}

export function recordedEditCents(usage: { input_tokens?: number; output_tokens?: number } | null, quality: string) {
  if (!usage) return quality === "high" ? 16 : quality === "low" ? 4 : 8;
  const tokens = (usage.input_tokens ?? 0) + (usage.output_tokens ?? 0);
  return Math.max(1, Math.round(tokens / 1000));
}
