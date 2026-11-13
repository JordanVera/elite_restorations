/** A street address, or a US ZIP / ZIP+4. */
export function isAddressOrZip(value: string): boolean {
  const trimmed = value.trim();
  if (/^\d{5}(?:-\d{4})?$/.test(trimmed)) return true;
  return trimmed.length >= 5 && /[A-Za-z]/.test(trimmed);
}

/** Ten-digit US number, with an optional leading 1. */
export function usablePhoneDigits(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1);
  return digits;
}

export function isUsablePhone(value: string): boolean {
  return usablePhoneDigits(value).length === 10;
}

export function isHttpUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}
