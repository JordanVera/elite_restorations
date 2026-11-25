/** Bots that fill the hidden field are dropped before email is sent. */
export function isHoneypotWebsite(value: unknown): boolean {
  if (!value || typeof value !== "object" || !("website" in value)) return false;
  const website = (value as { website?: unknown }).website;
  return typeof website === "string" && website.trim().length > 0;
}
