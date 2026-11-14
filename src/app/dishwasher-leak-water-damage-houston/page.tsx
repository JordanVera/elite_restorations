import type { Metadata } from "next";

import { WaterCauseView, waterCauseMetadata } from "@/components/water-cause-view";

export const metadata: Metadata = waterCauseMetadata("dishwasher-leak-water-damage-houston");

export default function Page() {
  return <WaterCauseView slug="dishwasher-leak-water-damage-houston" />;
}
