"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

const subscribe = () => () => {};

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const isDark = !mounted || resolvedTheme !== "light";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "group relative inline-flex h-9 w-[4.25rem] shrink-0 items-center border border-foreground/25 px-1 transition-colors hover:border-foreground/60",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "flex size-6 items-center justify-center bg-foreground text-background transition-transform duration-500 ease-out-expo",
          isDark ? "translate-x-[2rem]" : "translate-x-0",
        )}
      >
        {isDark ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
      </span>
      <Sun
        aria-hidden
        className={cn(
          "absolute left-2.5 size-3.5 text-muted-foreground transition-opacity",
          isDark ? "opacity-100" : "opacity-0",
        )}
      />
      <Moon
        aria-hidden
        className={cn(
          "absolute right-2.5 size-3.5 text-muted-foreground transition-opacity",
          isDark ? "opacity-0" : "opacity-100",
        )}
      />
    </button>
  );
}
