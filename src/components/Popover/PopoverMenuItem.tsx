"use client";

import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

const popoverMenuItemVariants = cva(
  cn(
    "flex w-full items-center gap-3 rounded-md px-3 py-2",
    "text-sm font-medium transition-colors",
    "hover:bg-cms-gray-200 active:bg-cms-gray-300",
    "disabled:pointer-events-none disabled:opacity-50",
  ),
  {
    variants: {
      variant: {
        default: "text-cms-foreground",
        destructive: "text-cms-red-400 hover:text-cms-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
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
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  },
);

PopoverMenuItem.displayName = "PopoverMenuItem";

export { PopoverMenuItem, popoverMenuItemVariants };
