export const MAX_LOGO_BYTES = 2 * 1024 * 1024;

export type LogoKind = { ext: 'png' | 'jpg' | 'webp' | 'svg'; contentType: string };

/** Detect a logo from file bytes, not the upload's declared type. */
export function detectLogoKind(bytes: Uint8Array): LogoKind | null {
  if (bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return { ext: 'png', contentType: 'image/png' };
  }
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { ext: 'jpg', contentType: 'image/jpeg' };
  }
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return { ext: 'webp', contentType: 'image/webp' };
  }
  const head = new TextDecoder().decode(bytes.slice(0, 256)).trimStart().toLowerCase();
  if (head.startsWith('<svg') || (head.startsWith('<?xml') && head.includes('<svg'))) {
    return { ext: 'svg', contentType: 'image/svg+xml' };
  }
  return null;
}
