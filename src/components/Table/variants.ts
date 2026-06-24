import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

export const tableVariants = cva(
  "w-full caption-bottom [border-spacing:0] bg-cms-white text-[13px]",
  {
    variants: {
      bordered: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      bordered: false,
    },
  },
);

export const tableRowVariants = cva(
  "border-b border-cms-gray-150 transition-colors",
  {
    variants: {
      hoverable: {
        true: "hover:bg-cms-gray-50",
        false: "",
      },
      selected: {
        true: "bg-cms-gray-100",
        false: "",
      },
    },
    defaultVariants: {
      hoverable: false,
      selected: false,
    },
  },
);

export const tableCellVariants = cva(
  cn(
    "px-3.5 py-3 align-middle text-cms-gray-850",
    "[&:has([role=checkbox])]:pr-0",
  ),
  {
    variants: {
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      align: "left",
    },
  },
);
