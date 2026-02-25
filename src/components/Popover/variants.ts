import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

export const popoverMenuItemVariants = cva(
  cn(
    "flex w-full cursor-pointer items-center gap-3 rounded-md border-0 px-3",
    "py-2",
    "bg-white text-sm font-medium transition-colors",
    "hover:bg-cms-gray-100",
    "active:bg-cms-gray-200",
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
