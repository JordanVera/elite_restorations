import type { Metadata } from "next";

import { WaterCauseView, waterCauseMetadata } from "@/components/water-cause-view";

export const metadata: Metadata = waterCauseMetadata("water-heater-leak-damage-houston");

export default function Page() {
  return <WaterCauseView slug="water-heater-leak-damage-houston" />;
}
