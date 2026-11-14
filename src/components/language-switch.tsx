"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { localeSwitch } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitch({ className }: { className?: string }) {
  const pathname = usePathname() || "/";
  const { current, en, es } = localeSwitch(pathname);
  const label = current === "es" ? "Idioma" : "Language";

  return (
    <nav aria-label={label} className={cn("inline-flex items-center gap-1.5 text-[0.68rem] font-medium uppercase tracking-[0.16em]", className)}>
      <Link
        href={en}
        hrefLang="en-US"
        lang="en"
        aria-current={current === "en" ? "page" : undefined}
        className={cn(current === "en" ? "text-accent-ink" : "hover:text-accent-ink")}
      >
        EN
      </Link>
      <span aria-hidden className="text-muted-foreground">
        /
      </span>
      <Link
        href={es}
        hrefLang="es-US"
        lang="es"
        aria-current={current === "es" ? "page" : undefined}
        className={cn(current === "es" ? "text-accent-ink" : "hover:text-accent-ink")}
      >
        ES
      </Link>
    </nav>
  );
}
