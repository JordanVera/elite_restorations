import type { Metadata } from "next";

import { EstimateForm } from "@/components/estimate-request/estimate-form";
import { OFFICE_PHONE } from "@/lib/estimate-request/options";
import { site } from "@/lib/site";
import { storageMode } from "@/server/portal/storage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Project estimate request",
  description: "Send project details so Elite Restorations can prepare an estimate and then reach out.",
  robots: { index: false, follow: false },
};

export default function EstimateRequestPage() {
  const mode = storageMode();
  const uploadMode = mode === "blob" ? "blob" : mode === "local" ? "server" : "none";

  return (
    <section className="pb-36 pt-24 md:pb-28 md:pt-28">
      <div className="gutter mx-auto max-w-4xl">
        <p className="eyebrow text-accent-ink">Project estimate</p>
        <h1 className="font-display mt-4 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.03em]">
          Tell us about the work.
        </h1>
        <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-muted-foreground">
          Send the rooms, sizes, and photos for your project. Elite Restorations will review them and reach out.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Questions now?{" "}
          <a href={site.phone.href} className="text-foreground underline decoration-foreground/30 underline-offset-[0.4em] hover:decoration-accent-ink">
            {OFFICE_PHONE}
          </a>
        </p>
        <EstimateForm uploadMode={uploadMode} />
      </div>
    </section>
  );
}
