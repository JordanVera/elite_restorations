import type { Metadata } from "next";

import { MissingRoom } from "@/components/not-found/missing-room";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return <MissingRoom />;
}
