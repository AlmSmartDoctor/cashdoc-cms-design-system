import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

export const switchVariants = cva(
  cn(
    "peer group relative inline-flex items-center transition-colors",
    "box-border rounded-full border-2 border-transparent",
    "h-6 w-(--switch-track-width-safe) shrink-0 px-px py-0.5",
    "cursor-pointer",
    "focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    // Off track: translucent dark + recessed inner shadow (v2 spec)
    "data-[state=unchecked]:bg-cms-gray-900/18",
    "shadow-[inset_0_1px_1.5px_rgba(15,20,25,0.08)]",
  ),

  {
    variants: {
      variant: {
        default: "data-[state=checked]:bg-cms-gray-900/95",
        primary: "data-[state=checked]:bg-cms-primary-200",
        green: "data-[state=checked]:bg-cms-green-500",
        black: "data-[state=checked]:bg-cms-black",
        blue: "data-[state=checked]:bg-cms-blue-700",
        red: "data-[state=checked]:bg-cms-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
