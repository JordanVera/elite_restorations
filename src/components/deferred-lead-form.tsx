"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import type { LeadForm } from "@/components/lead-form";

/**
 * The estimate form sits below the fold. Its client code, including the
 * request client, loads when the section is near the viewport.
 */
export function DeferredLeadForm(
  props: React.ComponentProps<typeof LeadForm>,
) {
  const ref = useRef<HTMLDivElement>(null);
  const [Form, setForm] = useState<typeof LeadForm | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancel = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        void import("@/components/lead-form").then((mod) => {
          if (!cancel) setForm(() => mod.LeadForm);
        });
      },
      { rootMargin: "160px" },
    );
    io.observe(el);
    return () => {
      cancel = true;
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="min-h-40">
      {Form ? (
        <Form {...props} />
      ) : (
        <p className="text-sm leading-relaxed text-[#efe9dd]/70">
          The form loads as you reach it. You can also{" "}
          <Link href="/contact" className="text-[#efe9dd] underline underline-offset-4">
            request an estimate
          </Link>
          .
        </p>
      )}
    </div>
  );
}
