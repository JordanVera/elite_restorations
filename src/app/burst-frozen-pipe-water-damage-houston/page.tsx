import type { Metadata } from "next";

import { WaterCauseView, waterCauseMetadata } from "@/components/water-cause-view";

export const metadata: Metadata = waterCauseMetadata("burst-frozen-pipe-water-damage-houston");

export default function Page() {
  return <WaterCauseView slug="burst-frozen-pipe-water-damage-houston" />;
}
