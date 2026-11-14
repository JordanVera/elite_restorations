import type { Metadata } from "next";

import { BrandPageView, brandPageMetadata } from "@/components/brand-page-view";

export const metadata: Metadata = brandPageMetadata(
  "floor-and-decor-flooring-installation-houston",
  "es",
);

export default function Page() {
  return <BrandPageView slug="floor-and-decor-flooring-installation-houston" locale="es" />;
}
