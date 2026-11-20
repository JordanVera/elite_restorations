"use client";

import { usePathname } from "next/navigation";

import { LanguageSwitchLinks } from "@/components/language-switch-links";

export function LanguageSwitch({
  className,
  labels = "short",
}: {
  className?: string;
  labels?: "short" | "full";
}) {
  const pathname = usePathname() || "/";
  return (
    <LanguageSwitchLinks pathname={pathname} className={className} labels={labels} />
  );
}
