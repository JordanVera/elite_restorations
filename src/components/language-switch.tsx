import { headers } from "next/headers";

import { LanguageSwitchLinks } from "@/components/language-switch-links";

export async function LanguageSwitch({
  className,
  labels = "short",
}: {
  className?: string;
  labels?: "short" | "full";
}) {
  const pathname = (await headers()).get("x-pathname") || "/";
  return (
    <LanguageSwitchLinks pathname={pathname} className={className} labels={labels} />
  );
}
