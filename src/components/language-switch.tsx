"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { localeSwitch } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitch({
  className,
  labels = "short",
}: {
  className?: string;
  labels?: "short" | "full";
}) {
  const pathname = usePathname() || "/";
  const { current, en, es } = localeSwitch(pathname);
  const label = current === "es" ? "Idioma" : "Language";
  const enText = labels === "full" ? "English" : "EN";
  const esText = labels === "full" ? "Español" : "ES";

  return (
    <nav
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-0.5 font-medium",
        labels === "full"
          ? "text-base normal-case tracking-normal"
          : "text-[0.72rem] uppercase tracking-[0.14em]",
        className,
      )}
    >
      <Link
        href={en}
        hrefLang="en-US"
        lang="en"
        aria-label={enText === "EN" ? "EN, English" : "English"}
        aria-current={current === "en" ? "page" : undefined}
        className={cn(
          "inline-flex min-h-11 items-center px-1.5",
          current === "en"
            ? "text-accent-ink underline decoration-accent-ink underline-offset-4"
            : "hover:text-accent-ink",
        )}
      >
        {enText}
      </Link>
      <span aria-hidden className="text-muted-foreground">
        /
      </span>
      <Link
        href={es}
        hrefLang="es-US"
        lang="es"
        aria-label={esText === "ES" ? "ES, Español" : "Español"}
        aria-current={current === "es" ? "page" : undefined}
        className={cn(
          "inline-flex min-h-11 items-center px-1.5",
          current === "es"
            ? "text-accent-ink underline decoration-accent-ink underline-offset-4"
            : "hover:text-accent-ink",
        )}
      >
        {esText}
      </Link>
    </nav>
  );
}
