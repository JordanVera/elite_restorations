type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: Record<string, unknown>[];
};

/**
 * GA4 recommended lead event. No-op unless gtag or a dataLayer is already on the page.
 */
export function trackLeadConversion(detail: { intent: string; service?: string }) {
  if (typeof window === "undefined") return;
  const analytics = window as AnalyticsWindow;
  const params = {
    event_category: "lead",
    event_label: detail.service || detail.intent,
    lead_type: detail.intent,
    service: detail.service,
  };
  if (typeof analytics.gtag === "function") {
    analytics.gtag("event", "generate_lead", params);
    return;
  }
  if (Array.isArray(analytics.dataLayer)) {
    analytics.dataLayer.push({ event: "generate_lead", ...params });
  }
}
