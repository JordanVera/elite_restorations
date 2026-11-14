import type { Metadata } from "next";

import { BrandPageView, brandPageMetadata } from "@/components/brand-page-view";

export const metadata: Metadata = brandPageMetadata("abc-supply-roofing-siding-houston", "es");

export default function Page() {
  return <BrandPageView slug="abc-supply-roofing-siding-houston" locale="es" />;
}
