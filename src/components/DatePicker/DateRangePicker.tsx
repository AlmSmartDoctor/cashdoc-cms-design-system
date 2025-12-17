import React from "react";
import { TextInput, TextInputProps } from "../TextInput";
import { cn } from "@/utils/cn";

export interface DateRange {
  start: string;
  end: string;
}

export interface DateRangePickerProps
  extends Omit<TextInputProps, "value" | "onChange" | "type"> {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  startLabel?: string;
  endLabel?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  min?: string;
  max?: string;
  error?: boolean;
  errorMessage?: string;
}

export const DateRangePicker = React.forwardRef<
  HTMLDivElement,
  DateRangePickerProps
>(
  (
    {
      value,
      onChange,
      startLabel = "시작일",
      endLabel = "종료일",
      startPlaceholder = "YYYY-MM-DD",
      endPlaceholder = "YYYY-MM-DD",
      min,
      max,
      label,
      error,
      errorMessage,
      helperText,
      fullWidth = true,
      ...props
    },
    ref
  ) => {
    const [startDate, setStartDate] = React.useState(value?.start || "");
    const [endDate, setEndDate] = React.useState(value?.end || "");

    React.useEffect(() => {
      if (value) {
        setStartDate(value.start);
        setEndDate(value.end);
      }
    }, [value]);

    const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newStart = e.target.value;
      setStartDate(newStart);
      onChange?.({ start: newStart, end: endDate });
    };

    const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newEnd = e.target.value;
      setEndDate(newEnd);
      onChange?.({ start: startDate, end: newEnd });
    };

    return (
      <div ref={ref} className={cn("cms-w-full", !fullWidth && "cms-w-auto")}>
        {label && (
          <label className="cms-block cms-text-cms-md cms-font-medium cms-text-black cms-mb-2">
            {label}
          </label>
        )}
        <div className="cms-flex cms-gap-4 cms-items-center">
          <TextInput
            type="date"
            value={startDate}
            onChange={handleStartChange}
            placeholder={startPlaceholder}
            min={min}
            max={endDate || max}
            fullWidth
            {...props}
          />
          <span className="cms-text-cms-md cms-text-gray-600">~</span>
          <TextInput
            type="date"
            value={endDate}
            onChange={handleEndChange}
            placeholder={endPlaceholder}
            min={startDate || min}
            max={max}
            fullWidth
            {...props}
          />
        </div>
        {error && errorMessage && (
          <span className="cms-block cms-text-cms-sm cms-font-medium cms-text-red-400 cms-mt-1">
            {errorMessage}
          </span>
        )}
        {!error && helperText && (
          <span className="cms-block cms-text-cms-sm cms-font-normal cms-text-gray-600 cms-mt-1">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

DateRangePicker.displayName = "DateRangePicker";
