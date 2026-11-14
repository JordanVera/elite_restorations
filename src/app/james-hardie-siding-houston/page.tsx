import type { Metadata } from "next";

import { BrandPageView, brandPageMetadata } from "@/components/brand-page-view";

export const metadata: Metadata = brandPageMetadata("james-hardie-siding-houston", "en");

export default function Page() {
  return <BrandPageView slug="james-hardie-siding-houston" locale="en" />;
}
