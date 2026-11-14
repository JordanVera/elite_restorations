import type { Metadata } from "next";

import { BrandPageView, brandPageMetadata } from "@/components/brand-page-view";

export const metadata: Metadata = brandPageMetadata("certainteed-roofing-houston", "es");

export default function Page() {
  return <BrandPageView slug="certainteed-roofing-houston" locale="es" />;
}
