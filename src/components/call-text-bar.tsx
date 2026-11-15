"use client";

import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";

import { isSpanishPath } from "@/lib/i18n";
import { site } from "@/lib/site";

export function CallTextBar() {
  const pathname = usePathname() || "/";
  const es = isSpanishPath(pathname);
  const call = es ? "Llamar" : "Call";
  const text = es ? "Envíanos un texto" : "Text us";

  return (
    <>
      <div className="h-[4.25rem] md:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md md:hidden">
        <div className="grid grid-cols-2 pb-[env(safe-area-inset-bottom)]">
          <a
            href={site.phone.href}
            className="inline-flex h-14 items-center justify-center gap-2 text-sm font-medium"
          >
            <Phone className="size-4 text-accent-ink" aria-hidden />
            {call}
          </a>
          <a
            href={site.phone.sms}
            className="inline-flex h-14 items-center justify-center border-l border-border text-sm font-medium"
          >
            {text}
          </a>
        </div>
      </div>
      <div className="fixed right-4 bottom-5 z-40 hidden md:block">
        <div className="flex overflow-hidden border border-border bg-background shadow-[0_16px_40px_-24px_rgba(22,19,15,0.7)]">
          <a
            href={site.phone.href}
            className="inline-flex h-11 items-center gap-2 px-3 text-[0.72rem] font-medium uppercase tracking-[0.16em] hover:text-accent-ink"
          >
            <Phone className="size-3.5" aria-hidden />
            {call}
          </a>
          <a
            href={site.phone.sms}
            className="inline-flex h-11 items-center border-l border-border px-3 text-[0.72rem] font-medium uppercase tracking-[0.16em] hover:text-accent-ink"
          >
            {text}
          </a>
        </div>
      </div>
    </>
  );
}
