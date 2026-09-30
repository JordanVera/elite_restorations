import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-none border-0 border-b border-input bg-transparent px-0 py-2 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-accent-ink focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-accent-ink",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
