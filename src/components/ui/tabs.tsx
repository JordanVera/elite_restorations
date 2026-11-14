"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Animated tabs, adapted from Aceternity UI.
 * https://ui.aceternity.com/components/tabs
 * Sliding indicator plus a paper stack that lifts on hover.
 */
export type TabItem = {
  title: React.ReactNode;
  value: string;
  content?: React.ReactNode;
};

export function Tabs({
  tabs,
  className,
  containerClassName,
  tabClassName,
  activeTabClassName,
  contentClassName,
}: {
  tabs: TabItem[];
  className?: string;
  containerClassName?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  contentClassName?: string;
}) {
  const [active, setActive] = React.useState(0);
  const baseId = React.useId();
  const listRef = React.useRef<HTMLDivElement>(null);
  const current = tabs[Math.min(active, Math.max(tabs.length - 1, 0))] ?? tabs[0];

  const focusTab = (index: number) => {
    const next = (index + tabs.length) % tabs.length;
    setActive(next);
    listRef.current
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusTab(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusTab(active - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusTab(tabs.length - 1);
    }
  };

  if (!current) return null;

  return (
    <div className={className}>
      <div
        ref={listRef}
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className={cn("w-full", containerClassName)}
      >
        {tabs.map((tab, index) => {
          const selected = tab.value === current.value;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.value}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              data-active={selected ? "" : undefined}
              onClick={() => setActive(index)}
              className={cn("group relative cursor-pointer bg-transparent text-left", tabClassName)}
            >
              {selected ? (
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-px z-10 h-px bg-accent",
                    activeTabClassName,
                  )}
                />
              ) : null}
              {tab.title}
            </button>
          );
        })}
      </div>

      <div className="group relative mt-8 lg:mt-11 lg:pt-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-10 top-0 hidden h-16 border border-border bg-surface-2 transition-transform duration-500 ease-out-expo group-hover:-translate-y-4 lg:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-5 top-3 hidden h-16 border border-border bg-surface transition-transform duration-500 ease-out-expo group-hover:-translate-y-2 lg:block"
        />

        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${current.value}`}
          className="relative overflow-hidden"
        >
          {tabs.map((tab) => {
            const selected = tab.value === current.value;
            return (
              <div
                key={tab.value}
                aria-hidden={selected ? undefined : true}
                inert={selected ? undefined : true}
                className={cn(
                  selected
                    ? "relative z-10"
                    : "pointer-events-none absolute inset-0 z-0 opacity-0",
                  contentClassName,
                )}
              >
                {tab.content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
