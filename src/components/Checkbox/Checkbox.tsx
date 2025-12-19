import React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/utils/cn";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
  id?: string;
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, id, disabled, ...props }, ref) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex items-center">
      <CheckboxPrimitive.Root
        ref={ref}
        id={checkboxId}
        disabled={disabled}
        className={cn(
          "peer h-[17px] w-[17px] shrink-0 rounded border border-gray-400 bg-white",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-black data-[state=checked]:border-black",
          "transition-colors",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
          <Check className="h-3 w-3" strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label
          htmlFor={checkboxId}
          className={cn(
            "ml-2 text-base font-normal text-gray-500 cursor-pointer select-none",
            "hover:text-black transition-colors",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";
