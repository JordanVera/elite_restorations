import type { Metadata } from "next";

import { BrandPageView, brandPageMetadata } from "@/components/brand-page-view";

export const metadata: Metadata = brandPageMetadata("expo-stone-countertops-houston", "en");

export default function Page() {
  return <BrandPageView slug="expo-stone-countertops-houston" locale="en" />;
}
