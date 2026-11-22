import assert from "node:assert/strict";
import test from "node:test";

import {
  cleanFileName,
  describeUploadError,
  isUploadPathFor,
  MAX_UPLOAD_BYTES,
  resolveUploadType,
  sameUploadFamily,
  sniffUploadType,
  uploadPathname,
} from "./uploads";

const bytes = (...values: number[]) => new Uint8Array(values);
const ascii = (text: string, pad = 0) => new Uint8Array([...Array.from(text, (c) => c.charCodeAt(0)), ...new Array(pad).fill(0)]);

test("sniffUploadType recognizes allowed formats by their first bytes", () => {
  assert.equal(sniffUploadType(bytes(0xff, 0xd8, 0xff, 0xe0)), "image/jpeg");
  assert.equal(sniffUploadType(bytes(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0)), "image/png");
  assert.equal(sniffUploadType(ascii("RIFF\0\0\0\0WEBPVP8 ")), "image/webp");
  assert.equal(sniffUploadType(ascii("%PDF-1.7")), "application/pdf");
  assert.equal(sniffUploadType(ascii("\0\0\0\x18ftypheic")), "image/heic");
  assert.equal(sniffUploadType(ascii("\0\0\0\x18ftypmif1")), "image/heif");
});

test("sniffUploadType rejects HTML, SVG, and executables posing as images", () => {
  assert.equal(sniffUploadType(ascii("<html><script>alert(1)</script>")), null);
  assert.equal(sniffUploadType(ascii('<svg xmlns="http://www.w3.org/2000/svg">')), null);
  assert.equal(sniffUploadType(bytes(0x4d, 0x5a, 0x90, 0x00)), null);
  assert.equal(sniffUploadType(ascii("\0\0\0\x18ftypisom")), null, "MP4 video is not allowed");
  assert.equal(sniffUploadType(new Uint8Array()), null);
});

test("resolveUploadType trusts allowed types and infers blank ones from the extension", () => {
  assert.equal(resolveUploadType("a.png", "image/png"), "image/png");
  assert.equal(resolveUploadType("IMG_0001.HEIC", ""), "image/heic");
  assert.equal(resolveUploadType("spec.pdf", "application/octet-stream"), "application/pdf");
  assert.equal(resolveUploadType("page.html", "text/html"), null);
  assert.equal(resolveUploadType("logo.svg", "image/svg+xml"), null);
  assert.equal(resolveUploadType("photo.png", "image/gif"), null, "a declared disallowed type wins over the extension");
});

test("describeUploadError enforces type and the 10 MB limit", () => {
  assert.equal(describeUploadError({ name: "a.jpg", size: 1000, type: "image/jpeg" }), null);
  assert.equal(describeUploadError({ name: "a.jpg", size: MAX_UPLOAD_BYTES, type: "image/jpeg" }), null);
  assert.match(describeUploadError({ name: "a.jpg", size: MAX_UPLOAD_BYTES + 1, type: "image/jpeg" }) ?? "", /10 MB/);
  assert.match(describeUploadError({ name: "a.jpg", size: 0, type: "image/jpeg" }) ?? "", /empty/);
  assert.match(describeUploadError({ name: "a.zip", size: 10, type: "application/zip" }) ?? "", /JPG, PNG/);
});

test("upload paths are scoped to one portal and selection", () => {
  const path = uploadPathname("portal1", "req1", "image/jpeg", "abc123");
  assert.equal(path, "portal-uploads/portal1/req1/abc123.jpg");
  assert.equal(isUploadPathFor(path, "portal1", "req1"), true);
  assert.equal(isUploadPathFor(path, "portal2", "req1"), false);
  assert.equal(isUploadPathFor(path, "portal1", "req2"), false);
  assert.equal(isUploadPathFor("portal-uploads/portal1/req1/../req2/x.jpg", "portal1", "req1"), false);
  assert.equal(isUploadPathFor("portal-uploads/portal1/req1/sub/x.jpg", "portal1", "req1"), false);
  assert.equal(isUploadPathFor("portal-uploads/portal1/req1/x.html.jpg", "portal1", "req1"), false);
});

test("cleanFileName strips paths and control characters for display", () => {
  assert.equal(cleanFileName("C:\\Users\\me\\tile sample.png"), "tile sample.png");
  assert.equal(cleanFileName("../../etc/passwd"), "passwd");
  assert.equal(cleanFileName('bad"<name>.jpg'), "badname.jpg");
  assert.equal(cleanFileName("\u0000\u0001"), "file");
  const long = cleanFileName(`${"x".repeat(300)}.jpeg`);
  assert.ok(long.length <= 120 && long.endsWith(".jpeg"));
});

test("HEIC and HEIF count as one family", () => {
  assert.equal(sameUploadFamily("image/heic", "image/heif"), true);
  assert.equal(sameUploadFamily("image/png", "image/jpeg"), false);
});
