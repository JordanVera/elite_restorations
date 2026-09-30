import Image from "next/image";

import { cn } from "@/lib/utils";

export function SiteLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logo/elite-restorations-logo.jpg"
      alt="Elite Restorations"
      width={226}
      height={102}
      priority
      className={cn("h-11 w-auto", className)}
    />
  );
}
