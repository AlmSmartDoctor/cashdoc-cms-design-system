import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

export const popoverMenuItemVariants = cva(
  cn(
    "flex w-full cursor-pointer items-center gap-2",
    "rounded-cms-sm border-0 px-2.5 py-2",
    "bg-transparent text-[13px] font-medium",
    "text-cms-gray-800",
    "transition-colors duration-150",
    "hover:bg-cms-gray-100",
    "active:bg-cms-gray-150",
    "disabled:pointer-events-none disabled:opacity-45",
  ),
  {
    variants: {
      variant: {
        default: "text-cms-gray-800",
        destructive: cn(
          "text-cms-red-600",
          "hover:bg-cms-red-50 hover:text-cms-red-600",
        ),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
