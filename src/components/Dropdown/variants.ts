import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

export const dropdownTriggerVariants = cva(
  cn(
    "flex items-center justify-between",
    "rounded-md px-4 py-2.5",
    "text-sm font-medium",
    "focus-visible:ring-2 focus-visible:outline-none",
    "focus-visible:ring-cms-gray-400 focus-visible:ring-offset-1",
    "transition-all",
    "w-full min-w-0",
  ),
  {
    variants: {
      variant: {
        default: cn(
          "border border-black bg-white text-cms-black",
          "hover:bg-cms-gray-100",
          "disabled:bg-cms-gray-150 disabled:text-cms-gray-400",
          `
            disabled:cursor-not-allowed
            disabled:hover:bg-cms-gray-150
          `,
        ),
        outline: cn(
          "border border-cms-outline bg-transparent",
          "hover:bg-cms-gray-200",
          "disabled:bg-cms-gray-150 disabled:text-cms-gray-400",
          `
            disabled:cursor-not-allowed
            disabled:hover:bg-cms-gray-150
          `,
        ),
        ghost: cn(
          "border-none bg-transparent",
          "hover:bg-cms-gray-200 hover:text-black",
          "disabled:bg-cms-gray-150 disabled:text-cms-gray-400",
          `
            disabled:cursor-not-allowed
            disabled:hover:bg-cms-gray-150
          `,
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
