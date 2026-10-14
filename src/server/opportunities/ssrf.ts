import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

const BLOCKED = new Set(["localhost"]);

function ipv4Blocked(ip: string) {
  const [a, b] = ip.split(".").map(Number);
  if (a === 10 || a === 127 || a === 0) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 100 && b >= 64 && b <= 127) return true;
  return false;
}

function ipv6Blocked(ip: string) {
  const value = ip.toLowerCase();
  return value === "::1" || value.startsWith("fc") || value.startsWith("fd") || value.startsWith("fe80");
}

export async function assertPublicHttps(raw: string) {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error("The image URL is not valid.");
  }
  if (url.protocol !== "https:") throw new Error("Only HTTPS image URLs are allowed.");
  if (url.username || url.password) throw new Error("Image URLs cannot include credentials.");
  if (BLOCKED.has(url.hostname) || url.hostname.endsWith(".local") || url.hostname.endsWith(".internal")) {
    throw new Error("That image host is not allowed.");
  }
  const literal = isIP(url.hostname);
  if (literal === 4 && ipv4Blocked(url.hostname)) throw new Error("Private network addresses are blocked.");
  if (literal === 6 && ipv6Blocked(url.hostname)) throw new Error("Private network addresses are blocked.");
  if (!literal) {
    const records = await lookup(url.hostname, { all: true });
    for (const record of records) {
      if (record.family === 4 && ipv4Blocked(record.address)) throw new Error("The image host resolves to a private address.");
      if (record.family === 6 && ipv6Blocked(record.address)) throw new Error("The image host resolves to a private address.");
    }
  }
  return url;
}

export async function downloadImage(raw: string, redirects = 0): Promise<{ bytes: Buffer; mime: string }> {
  if (redirects > 2) throw new Error("Too many redirects while downloading an image.");
  const url = await assertPublicHttps(raw);
  const response = await fetch(url, { redirect: "manual" });
  if (response.status >= 300 && response.status < 400) {
    const next = response.headers.get("location");
    if (!next) throw new Error("The image redirect did not include a location.");
    return downloadImage(new URL(next, url).toString(), redirects + 1);
  }
  if (!response.ok) throw new Error(`The image download failed (${response.status}).`);
  const mime = response.headers.get("content-type")?.split(";")[0]?.trim() ?? "";
  if (!["image/jpeg", "image/png", "image/webp"].includes(mime)) {
    throw new Error("The image must be JPEG, PNG, or WebP.");
  }
  const length = Number(response.headers.get("content-length") ?? 0);
  if (length > 8_000_000) throw new Error("The image is larger than 8 MB.");
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.byteLength > 8_000_000) throw new Error("The image is larger than 8 MB.");
  return { bytes, mime };
}
