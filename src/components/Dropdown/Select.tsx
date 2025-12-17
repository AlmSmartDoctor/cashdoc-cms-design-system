import { cn } from "@/utils/cn";
import { forwardRef } from "react";
import { Dropdown, DropdownProps } from "./Dropdown";

export interface SelectProps extends Omit<
  DropdownProps,
  "multiple" | "searchable" | "clearable"
> {
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ label, helperText, error, required, className, ...props }, ref) => {
    return (
      <div className={cn("space-y-1", className)}>
        {label && (
          <label className="block text-sm font-medium text-cms-black">
            {label}
            {required && <span className="text-cms-red-500 ml-1">*</span>}
          </label>
        )}

        <Dropdown
          ref={ref}
          {...props}
          className={cn(error && "border-cms-red-500 focus:ring-cms-red-500")}
        />

        {(helperText || error) && (
          <p
            className={cn(
              "text-xs",
              error ? "text-cms-red-500" : "text-cms-gray-400"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
