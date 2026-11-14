import type { Metadata } from "next";

import { WaterCauseView, waterCauseMetadata } from "@/components/water-cause-view";

export const metadata: Metadata = waterCauseMetadata("toilet-overflow-water-damage-houston");

export default function Page() {
  return <WaterCauseView slug="toilet-overflow-water-damage-houston" />;
}