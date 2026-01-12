import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

export const dropdownTriggerVariants = cva(
  cn(
    "flex items-center justify-between",
    "rounded-md px-4 py-2.5",
    "text-sm font-medium",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-cms-gray-400 focus-visible:ring-offset-1",
    "transition-colors transition-shadow",
    "w-full min-w-0",
  ),
  {
    variants: {
      variant: {
        default: cn(
          "bg-white text-cms-black border border-black",
          "hover:bg-cms-gray-100",
        ),
        outline: cn(
          "border border-cms-outline bg-transparent",
          "hover:bg-cms-gray-200",
        ),
        ghost: cn(
          "border-none bg-transparent",
          "hover:bg-cms-gray-200 hover:text-black",
        ),
      },
      size: {
        sm: "px-3 py-2 text-xs",
        default: "px-4 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
