import React from "react";
import { TextInput, TextInputProps } from "../TextInput";

export interface DatePickerProps extends Omit<TextInputProps, "type" | "value" | "onChange"> {
  value?: string;
  onChange?: (date: string) => void;
  min?: string;
  max?: string;
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ value, onChange, min, max, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <TextInput
        ref={ref}
        type="date"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        {...props}
      />
    );
  }
);

DatePicker.displayName = "DatePicker";
