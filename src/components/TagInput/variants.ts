import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

export const tagInputContainerVariants = cva(
  cn(
    "flex items-center gap-1.5 rounded-cms-md border border-solid",
    "px-1.5 py-[3px]",
    "min-h-8 w-full",
    "transition-[border-color,box-shadow] duration-150 ease-out",
  ),
  {
    variants: {
      readOnly: {
        true: "cursor-default border-cms-gray-200 bg-cms-gray-100",
        false: cn(
          "cursor-text bg-cms-white",
          "border-cms-gray-250",
          "hover:border-cms-gray-350",
          "focus-within:border-cms-gray-900",
          "focus-within:shadow-[0_0_0_3px_rgba(15,20,25,0.08)]",
        ),
      },
      layout: {
        row: "flex-row flex-wrap",
        column: "flex-col items-stretch",
      },
    },
    defaultVariants: {
      readOnly: false,
      layout: "row",
    },
  },
);

export const tagVariants = cva(
  cn(
    "inline-flex items-center gap-1 py-[2px] pl-2.5",
    "border border-solid border-cms-gray-200 bg-cms-gray-100",
    "rounded-cms-sm text-[12px] leading-none font-medium text-cms-gray-900",
  ),
  {
    variants: {
      removable: {
        true: "pr-[3px]",
        false: "pr-2.5",
      },
    },
    defaultVariants: {
      removable: true,
    },
  },
);

export const removeButtonVariants = cva(
  cn(
    "inline-flex items-center justify-center",
    "size-4 border-none p-0",
    "bg-transparent text-cms-gray-500",
    "cursor-pointer rounded-cms-xs leading-none",
    "transition-colors duration-120",
    "hover:bg-cms-gray-200 hover:text-cms-gray-900",
  ),
);

export const inputVariants = cva(
  cn(
    "min-w-[120px] flex-1 border-none outline-none",
    "h-6 px-1 text-[13px]",
    "placeholder:text-cms-gray-450",
    "disabled:cursor-not-allowed disabled:bg-transparent",
  ),
);

export const labelVariants = cva(
  "mb-1.5 block text-[13px] font-medium text-cms-gray-800",
);

export const helperTextVariants = cva(
  cn(
    "mt-1.5 flex items-center justify-between gap-2",
    "text-[12px] text-cms-gray-550",
  ),
);

export const errorMessageVariants = cva(
  "mt-1.5 block text-[12px] font-normal text-cms-red-500",
);

export const tagCountVariants = cva(
  "text-[12px] font-semibold text-cms-gray-800 tabular-nums",
);
