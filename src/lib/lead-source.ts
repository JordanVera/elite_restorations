export type LeadSourceFields = {
  pageUrl: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
};

const empty: LeadSourceFields = {
  pageUrl: "",
  referrer: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmTerm: "",
  utmContent: "",
};

/** Page URL and campaign tags at the moment of submit. Safe to call during SSR. */
export function readLeadSource(): LeadSourceFields {
  if (typeof window === "undefined") return empty;
  const params = new URLSearchParams(window.location.search);
  const pick = (key: string) => (params.get(key) ?? "").trim().slice(0, 120);
  return {
    pageUrl: window.location.href.slice(0, 800),
    referrer: document.referrer.slice(0, 800),
    utmSource: pick("utm_source"),
    utmMedium: pick("utm_medium"),
    utmCampaign: pick("utm_campaign"),
    utmTerm: pick("utm_term"),
    utmContent: pick("utm_content"),
  };
}
