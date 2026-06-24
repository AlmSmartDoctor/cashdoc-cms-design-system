import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

export const radioGroupItemVariants = cva(
  cn(
    "flex items-center justify-center",
    "aspect-square rounded-full bg-cms-white",
    "border-[1.5px] border-cms-gray-350",
    "transition-colors duration-150 ease-out",
    "focus:outline-none",
    "focus-visible:ring-2 focus-visible:ring-cms-gray-900/15",
    "focus-visible:ring-offset-1",
    "disabled:cursor-not-allowed disabled:opacity-100",
    "disabled:border-cms-gray-250 disabled:bg-cms-gray-100",
    "cursor-pointer",
    "hover:border-cms-gray-600",
  ),
  {
    variants: {
      variant: {
        black: cn(
          "text-cms-gray-900",
          "data-[state=checked]:border-cms-gray-900",
        ),
        default: cn(
          "text-cms-gray-900",
          "data-[state=checked]:border-cms-gray-900",
        ),
        green: cn(
          "text-cms-green-500",
          "data-[state=checked]:border-cms-green-500",
        ),
        blue: cn(
          "text-cms-blue-600",
          "data-[state=checked]:border-cms-blue-600",
        ),
        red: cn(
          "text-cms-red-500",
          "data-[state=checked]:border-cms-red-500",
        ),
      },
      size: {
        sm: "size-4",
        md: "size-[18px]",
        lg: "size-5",
      },
    },
    defaultVariants: {
      variant: "black",
      size: "md",
    },
  },
);

export const radioGroupIndicatorVariants = cva(
  "flex aspect-square items-center justify-center rounded-full bg-current",
  {
    variants: {
      variant: {
        // bg-current를 쓰면 부모 text color를 따라가므로 색상 정의 줄일 수 있음
        black: "text-cms-gray-900",
        default: "text-cms-gray-900",
        green: "text-cms-green-500",
        blue: "text-cms-blue-600",
        red: "text-cms-red-500",
      },
      size: {
        sm: "size-1.5",
        md: "size-2",
        lg: "size-2.5",
      },
    },
    defaultVariants: {
      variant: "black",
      size: "md",
    },
  },
);
