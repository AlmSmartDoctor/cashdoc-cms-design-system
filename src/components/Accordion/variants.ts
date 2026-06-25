import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

export const accordionRootVariants = cva("", {
  variants: {
    variant: {
      bordered: cn(
        "overflow-hidden rounded-cms-lg",
        "border border-cms-gray-200 bg-cms-white",
      ),
      separated: "flex flex-col gap-2",
    },
  },
  defaultVariants: {
    variant: "bordered",
  },
});

export const accordionItemVariants = cva("", {
  variants: {
    variant: {
      bordered: "border-b border-cms-gray-200 last:border-b-0",
      separated: cn(
        "overflow-hidden rounded-cms-lg",
        "border border-cms-gray-200 bg-cms-white",
      ),
    },
  },
  defaultVariants: {
    variant: "bordered",
  },
});
