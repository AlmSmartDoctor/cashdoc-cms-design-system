import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const textInputVariants = cva(
  cn(
    "w-full box-border",
    "px-3 py-2",
    "rounded-cms-sm",
    "border border-solid",
    "font-normal leading-tight",
    "transition-colors duration-200",
    "outline-none",
    "text-cms-black text-cms-sm",
    "placeholder:text-cms-gray-500",
    "placeholder:text-cms-sm"
  ),
  {
    variants: {
      variant: {
        default: cn(
          "bg-cms-white ",
          "border-cms-gray-450",
          "focus:border-cms-gray-800",
          "disabled:bg-cms-gray-150 disabled:text-cms-gray-400 disabled:cursor-not-allowed"
        ),
        error: cn(
          "bg-cms-white",
          "border-cms-red-400",
          "focus:border-cms-red-500"
        ),
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      fullWidth: true,
    },
  }
);

const labelVariants = cva("block text-cms-sm font-medium text-cms-black");

const errorMessageVariants = cva(
  "block text-cms-sm font-medium text-cms-red-400 mt-1"
);

const helperTextVariants = cva(
  "block text-cms-sm font-normal text-cms-gray-700 mt-1"
);

export interface TextInputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof textInputVariants> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  showCharCount?: boolean;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      variant,
      fullWidth,
      label,
      error,
      errorMessage,
      helperText,
      showCharCount,
      maxLength,
      value,
      defaultValue,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string>(
      (value || defaultValue || "") as string
    );
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const finalVariant = error ? "error" : variant;

    const currentValue =
      value !== undefined ? (value as string) : internalValue;
    const charCount = currentValue?.length || 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const hasHeader = label || (showCharCount && maxLength);

    return (
      <div className={cn("w-full", !fullWidth && "w-auto")}>
        {hasHeader && (
          <div className="flex justify-between items-center mb-2">
            {label ? (
              <label htmlFor={inputId} className={labelVariants()}>
                {label}
              </label>
            ) : (
              <div />
            )}
            {showCharCount && maxLength && (
              <span className="text-cms-xs text-cms-gray-600">
                {charCount} / {maxLength}
              </span>
            )}
          </div>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            textInputVariants({ variant: finalVariant, fullWidth }),
            className
          )}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          {...props}
        />
        {error && errorMessage && (
          <span className={errorMessageVariants()}>{errorMessage}</span>
        )}
        {!error && helperText && (
          <span className={helperTextVariants()}>{helperText}</span>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
