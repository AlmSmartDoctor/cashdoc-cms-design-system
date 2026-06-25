import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

export const countFilterChipVariants = cva(
  cn(
    "group inline-flex items-center",
    "rounded-full border border-solid select-none",
    "font-medium whitespace-nowrap",
    "cursor-pointer outline-none",
    "transition-colors duration-150 ease-out",
    "border-cms-gray-250 bg-cms-white text-cms-gray-800",
    "hover:border-cms-gray-350 hover:bg-cms-gray-50",
    "focus-visible:ring-2 focus-visible:ring-cms-gray-900/15",
    "focus-visible:ring-offset-1",
    // Active: translucent dark fill + subtle inset white sheen (v2)
    "data-[state=on]:border-cms-gray-900",
    "data-[state=on]:bg-cms-gray-900/95",
    "data-[state=on]:text-cms-white",
    "data-[state=on]:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
    "disabled:pointer-events-none disabled:opacity-45",
  ),
  {
    variants: {
      size: {
        sm: "h-7 gap-1.5 px-2.5 text-[12px]",
        md: "h-8 gap-1.5 px-3 text-[13px]",
        lg: "h-9 gap-2 px-3.5 text-sm",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export const countBadgeVariants = cva(
  cn(
    "inline-flex items-center justify-center",
    "rounded-full font-bold tabular-nums",
    "bg-cms-gray-150 text-cms-gray-700",
    "group-data-[state=on]:bg-white/18",
    "group-data-[state=on]:text-cms-white",
  ),
  {
    variants: {
      size: {
        sm: "h-4 min-w-4 px-1 text-[10px]",
        md: "h-[18px] min-w-[18px] px-1.5 text-[11px]",
        lg: "h-5 min-w-5 px-1.5 text-xs",
      },
    },
    defaultVariants: { size: "md" },
  },
);
