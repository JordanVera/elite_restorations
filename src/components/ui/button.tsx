import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/button relative isolate inline-flex shrink-0 items-center justify-center gap-3 overflow-hidden whitespace-nowrap select-none",
    "text-[0.72rem] font-medium uppercase tracking-[0.2em]",
    "transition-[color,border-color,transform] duration-500 ease-out-expo outline-none",
    "before:absolute before:inset-0 before:-z-10 before:translate-y-[101%] before:transition-transform before:duration-500 before:ease-out-expo before:content-['']",
    "hover:before:translate-y-0 focus-visible:before:translate-y-0 active:scale-[0.985]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "[&_svg]:transition-transform [&_svg]:duration-500 [&_svg]:ease-out-expo hover:[&_svg.arrow]:translate-x-1",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background before:bg-accent hover:text-white focus-visible:text-white",
        accent:
          "bg-accent text-white before:bg-foreground hover:text-background focus-visible:text-background",
        outline:
          "border border-foreground/35 bg-transparent text-foreground before:bg-foreground hover:border-foreground hover:text-background focus-visible:text-background",
        ghost:
          "bg-transparent text-foreground before:bg-surface-2 hover:text-foreground",
        link: "gap-2 rounded-none bg-transparent p-0 text-foreground underline decoration-foreground/30 underline-offset-[0.55em] before:hidden hover:decoration-accent-ink",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[0.68rem]",
        lg: "h-14 px-9",
        xl: "h-16 px-10 text-[0.78rem]",
        icon: "size-11 p-0",
        "icon-sm": "size-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
