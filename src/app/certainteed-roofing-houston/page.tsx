import type { Metadata } from "next";

import { BrandPageView, brandPageMetadata } from "@/components/brand-page-view";

export const metadata: Metadata = brandPageMetadata("certainteed-roofing-houston", "en");

export default function Page() {
  return <BrandPageView slug="certainteed-roofing-houston" locale="en" />;
}
