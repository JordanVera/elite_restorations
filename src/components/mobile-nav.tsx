"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "radix-ui";
import { ArrowUpRight, Phone, X } from "lucide-react";

import { SiteLogo } from "@/components/site-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ctaHref, nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MobileNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const [openOn, setOpenOn] = React.useState<string | null>(null);
  const open = openOn === pathname;

  return (
    <Dialog.Root open={open} onOpenChange={(next) => setOpenOn(next ? pathname : null)}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={cn(
            "group inline-flex h-11 items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.22em]",
            className,
          )}
        >
          Menu
          <span aria-hidden className="flex w-6 flex-col gap-[6px]">
            <span className="h-px w-full bg-current transition-all group-hover:w-4" />
            <span className="h-px w-4 bg-current transition-all group-hover:w-full" />
          </span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-background data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 duration-300" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-background outline-none data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 duration-300"
        >
          <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
          <div className="gutter flex h-20 shrink-0 items-center justify-between">
            <Link href="/" aria-label="Elite Restorations home">
              <SiteLogo />
            </Link>
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex h-11 items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.22em]"
              >
                Close
                <X className="size-5" aria-hidden />
              </button>
            </Dialog.Close>
          </div>

          <nav aria-label="Primary" className="gutter flex flex-1 flex-col justify-center py-8">
            <ul className="flex flex-col">
              {[{ href: "/", label: "Home" }, ...nav].map((item, i) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li
                    key={item.href}
                    className="border-b border-border first:border-t animate-in fade-in-0 slide-in-from-bottom-6 fill-mode-both duration-700"
                    style={{ animationDelay: `${120 + i * 70}ms` }}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="group flex items-baseline gap-5 py-5"
                    >
                      <span className="eyebrow w-8 text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "t-lg transition-transform duration-500 ease-out-expo group-hover:translate-x-2",
                          active && "italic text-accent-ink",
                        )}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="gutter flex flex-col gap-6 pb-10">
            <Button asChild variant="accent" size="xl" className="w-full">
              <Link href={ctaHref}>
                Request an estimate
                <ArrowUpRight className="arrow" aria-hidden />
              </Link>
            </Button>
            <div className="flex items-center justify-between gap-4">
              <a
                href={site.phone.href}
                className="inline-flex items-center gap-2.5 text-sm"
              >
                <Phone className="size-4 text-accent-ink" aria-hidden />
                {site.phone.display}
              </a>
              <ThemeToggle />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
