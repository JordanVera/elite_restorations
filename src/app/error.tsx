"use client";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="gutter mx-auto flex min-h-[80dvh] max-w-[120rem] flex-col justify-center pt-32">
      <p className="eyebrow text-accent-ink">Something went wrong</p>
      <h1 className="font-display t-xl mt-6 max-w-[16ch]">That did not load.</h1>
      <p className="measure mt-6 text-lg text-muted-foreground">
        Please try again. If it keeps happening, call us at{" "}
        <a href={site.phone.href} className="underline underline-offset-[0.5em]">
          {site.phone.display}
        </a>
        .
      </p>
      <div className="mt-10">
        <Button variant="accent" size="lg" onClick={reset}>
          Try again
        </Button>
      </div>
    </section>
  );
}
