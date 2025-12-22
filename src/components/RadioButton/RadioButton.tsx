import React from "react";
import * as RadioGroupPrimitives from "@radix-ui/react-radio-group";
import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitives.Root className={className} {...props} ref={ref} />
  );
});
RadioGroup.displayName = RadioGroupPrimitives.Root.displayName;

const radioGroupItemVariants = cva(
  cn(
    "flex items-center justify-center aspect-square rounded-full border-2 transition-colors",
    "focus:outline-none",
    "focus-visible:ring-offset-2",
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
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
    },
    defaultVariants: {
      variant: "black",
      size: "md",
    },
  }
);

const radioGroupIndicatorVariants = cva(
  "flex items-center justify-center rounded-full bg-current aspect-square",
  {
    variants: {
      variant: {
        // bg-current를 쓰면 부모 text color를 따라가므로 색상 정의 줄일 수 있음
        black: "text-cms-black",
        default: "text-cms-primary-300",
        green: "text-cms-green-500",
        blue: "text-cms-blue-700",
        red: "text-cms-red-400",
      },
      size: {
        sm: "size-2",
        md: "size-2.5",
        lg: "size-3",
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
