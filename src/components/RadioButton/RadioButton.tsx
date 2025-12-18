import React from "react";
import * as RadioGroupPrimitives from "@radix-ui/react-radio-group";
import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitives.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitives.Root.displayName;

const radioGroupItemVariants = cva(
  cn(
    "aspect-square rounded-full border-2 transition-colors",
    "focus:outline-none focus-visible:ring-2",
    "focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "cursor-pointer"
  ),
  {
    variants: {
      variant: {
        black:
          "border-cms-gray-300 text-cms-black data-[state=checked]:border-cms-black",
        default:
          "border-cms-gray-300 text-cms-primary-300 data-[state=checked]:border-cms-primary-300",
        green:
          "border-cms-gray-300 text-cms-green-500 data-[state=checked]:border-cms-green-500",
        blue: "border-cms-gray-300 text-cms-blue-700 data-[state=checked]:border-cms-blue-700",
        red: "border-cms-gray-300 text-cms-red-400 data-[state=checked]:border-cms-red-400",
      },
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "black",
      size: "md",
    },
  }
);

const radioGroupIndicatorVariants = cva(
  'w-full h-full relative after:content-[""] after:block after:rounded-full after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2',
  {
    variants: {
      variant: {
        black: "after:bg-cms-black",
        default: "after:bg-cms-primary-300",
        green: "after:bg-cms-green-500",
        blue: "after:bg-cms-blue-700",
        red: "after:bg-cms-red-400",
      },
      size: {
        sm: "after:h-2 after:w-2",
        md: "after:h-2.5 after:w-2.5",
        lg: "after:h-3 after:w-3",
      },
    },
    defaultVariants: {
      variant: "black",
      size: "md",
    },
  }
);

export interface RadioGroupItemProps
  extends
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Item>,
    VariantProps<typeof radioGroupItemVariants> {}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitives.Item>,
  RadioGroupItemProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <RadioGroupPrimitives.Item
      ref={ref}
      className={cn(radioGroupItemVariants({ variant, size }), className)}
      {...props}
    >
      <RadioGroupPrimitives.Indicator
        className={cn(radioGroupIndicatorVariants({ variant, size }))}
      />
    </RadioGroupPrimitives.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitives.Item.displayName;

export { RadioGroup, RadioGroupItem };