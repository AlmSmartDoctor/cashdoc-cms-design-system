import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

export const dropdownTriggerVariants = cva(
  cn(
    "flex items-center justify-between",
    "gap-2 rounded-cms-md",
    "text-sm font-medium text-cms-gray-900",
    "focus-visible:ring-2 focus-visible:outline-none",
    "focus-visible:ring-cms-gray-900/15 focus-visible:ring-offset-1",
    `
      transition-[border-color,box-shadow,background-color] duration-150
      ease-out
    `,
    "w-full min-w-0",
  ),
  {
    variants: {
      variant: {
        default: cn(
          "border border-cms-gray-250 bg-cms-white text-cms-gray-900",
          "hover:border-cms-gray-350",
          "data-[state=open]:border-cms-gray-900",
          "data-[state=open]:shadow-[0_0_0_3px_rgba(15,20,25,0.08)]",
          "disabled:bg-cms-gray-100 disabled:text-cms-gray-450",
          "disabled:border-cms-gray-200",
          `
            disabled:cursor-not-allowed
            disabled:hover:border-cms-gray-200
          `,
        ),
        outline: cn(
          "border border-cms-gray-250 bg-transparent",
          "hover:border-cms-gray-350 hover:bg-cms-gray-50",
          "data-[state=open]:border-cms-gray-900",
          "disabled:bg-cms-gray-100 disabled:text-cms-gray-450",
          `
            disabled:cursor-not-allowed
            disabled:hover:bg-cms-gray-100
          `,
        ),
        ghost: cn(
          "border-none bg-transparent",
          "hover:bg-cms-gray-100 hover:text-cms-gray-900",
          "disabled:bg-transparent disabled:text-cms-gray-450",
          `
            disabled:cursor-not-allowed
            disabled:hover:bg-transparent
          `,
        ),
      },
      size: {
        sm: "h-7 px-2.5 text-[13px]",
        default: "h-9 px-3 text-sm",
        lg: "h-11 px-3.5 text-[15px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
