"use client";

import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

const popoverMenuItemVariants = cva(
  cn(
    "flex w-full items-center gap-3 rounded-xl px-4 py-3",
    "text-base font-medium transition-colors",
    "hover:bg-cms-bg03 active:bg-cms-bg04",
    "disabled:pointer-events-none disabled:opacity-50"
  ),
  {
    variants: {
      variant: {
        default: "text-cms-foreground",
        destructive: "text-red-600 hover:text-red-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface PopoverMenuItemProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof popoverMenuItemVariants> {
  icon?: React.ReactNode;
}

const PopoverMenuItem = forwardRef<HTMLButtonElement, PopoverMenuItemProps>(
  ({ className, variant, icon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(popoverMenuItemVariants({ variant }), className)}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

PopoverMenuItem.displayName = "PopoverMenuItem";

export { PopoverMenuItem, popoverMenuItemVariants };
