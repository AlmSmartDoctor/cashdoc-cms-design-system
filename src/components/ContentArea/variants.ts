import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

export const contentAreaVariants = cva(
  cn(
    "bg-cms-white text-cms-gray-900",
    "border border-cms-gray-200",
    "rounded-cms-lg",
  ),
  {
    variants: {
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      padding: "md",
    },
  },
);
