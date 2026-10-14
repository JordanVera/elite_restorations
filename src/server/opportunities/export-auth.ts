export function exportAllowed(origin: string, liveExportPermitted: boolean) {
  if (origin === "demo" || origin === "import") return { allowed: true as const };
  if (origin === "live" && liveExportPermitted) return { allowed: true as const };
  return {
    allowed: false as const,
    reason:
      origin === "live"
        ? "HAR export is off until REPLIERS_EXPORT_AUTHORIZED=authorized records written permission."
        : "This run cannot be exported.",
  };
}
