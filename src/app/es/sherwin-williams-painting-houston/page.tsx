import type { Metadata } from "next";

import { BrandPageView, brandPageMetadata } from "@/components/brand-page-view";

export const metadata: Metadata = brandPageMetadata("sherwin-williams-painting-houston", "es");

export default function Page() {
  return <BrandPageView slug="sherwin-williams-painting-houston" locale="es" />;
}
