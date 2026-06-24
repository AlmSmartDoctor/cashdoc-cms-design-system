import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

export const textInputVariants = cva(
  cn(
    "box-border h-9 w-full",
    "px-3",
    "rounded-cms-md",
    "border border-solid",
    "leading-tight font-normal",
    "transition-[border-color,box-shadow] duration-150 ease-out",
    "outline-none",
    "bg-cms-white text-sm text-cms-gray-900",
    "placeholder:text-sm placeholder:text-cms-gray-450",
    "hover:border-cms-gray-350",
  ),
  {
    variants: {
      variant: {
        default: cn(
          "border-cms-gray-250",
          "focus:border-cms-gray-900",
          "focus:shadow-[0_0_0_3px_rgba(15,20,25,0.08)]",
          "disabled:bg-cms-gray-100",
          "disabled:text-cms-gray-450",
          "disabled:border-cms-gray-200",
          "disabled:cursor-not-allowed",
          "disabled:hover:border-cms-gray-200",
        ),
        error: cn(
          "border-cms-red-500",
          "focus:border-cms-red-500",
          "focus:shadow-[0_0_0_3px_rgba(229,56,74,0.22)]",
          "hover:border-cms-red-500",
        ),
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      fullWidth: true,
    },
  },
);

export const labelVariants = cva(
  "mb-1.5 block text-[13px] font-medium text-cms-gray-800",
);

export const errorMessageVariants = cva(
  "mt-1.5 block text-[12px] font-normal text-cms-red-500",
);

export const helperTextVariants = cva(
  "mt-1.5 block text-[12px] font-normal text-cms-gray-550",
);
