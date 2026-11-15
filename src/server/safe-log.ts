/** Log text with secrets, phones, and email addresses removed. */
export function safeLog(error: unknown): string {
  const message = error instanceof Error ? error.message : "unknown error";
  return message
    .replace(/bearer\s+\S+/gi, "bearer [redacted]")
    .replace(/eyJ[\w.-]+/g, "[redacted]")
    .replace(/(client_secret|refresh_token|access_token|code_verifier|developer-token|authorization)(=|:)\s*\S+/gi, "$1=[redacted]")
    .replace(/\b(?:\+?1[\s.-]*)?\(?\d{3}\)?[\s.-]*\d{3}[\s.-]*\d{4}\b/g, "[phone]")
    .replace(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi, "[email]")
    .slice(0, 300);
}
