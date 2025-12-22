import React, { useState, useEffect, useMemo } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import dayjs, { Dayjs } from "dayjs";
import { cn } from "@/utils/cn";
import "react-day-picker/style.css";

export interface DatePickerProps {
  value?: string;
  onChange?: (date: string) => void;
  label?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  className?: string;
}

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      label,
      placeholder = "YYYY-MM-DD",
      min,
      max,
      disabled = false,
      error = false,
      errorMessage,
      helperText,
      className,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalDate, setInternalDate] = useState<Dayjs | undefined>(
      value ? dayjs(value) : undefined,
    );

    useEffect(() => {
      if (value) {
        setInternalDate(dayjs(value));
      } else {
        setInternalDate(undefined);
      }
    }, [value]);

    const selected = useMemo(() => {
      return internalDate?.toDate();
    }, [internalDate]);

    const handleDayClick = (date: Date | undefined) => {
      if (!date) {
        setInternalDate(undefined);
        return;
      }

      const selectedDate = dayjs(date);
      setInternalDate(selectedDate);
    };

    const handleApply = () => {
      if (internalDate) {
        onChange?.(internalDate.format("YYYY-MM-DD"));
        setIsOpen(false);
      }
    };

    const handleCancel = () => {
      setInternalDate(value ? dayjs(value) : undefined);
      setIsOpen(false);
    };

    const displayValue = useMemo(() => {
      if (!value) return "";
      return dayjs(value).format("YYYY-MM-DD");
    }, [value]);

    const disabledDays = useMemo(() => {
      const disabled: any[] = [];
      if (min) {
        disabled.push({ before: dayjs(min).toDate() });
      }
      if (max) {
        disabled.push({ after: dayjs(max).toDate() });
      }
      return disabled.length > 0 ? disabled : undefined;
    }, [min, max]);

    return (
      <div ref={ref} className={cn("flex flex-col gap-1", className)}>
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <PopoverPrimitive.Root
          open={isOpen && !disabled}
          onOpenChange={setIsOpen}
        >
          <PopoverPrimitive.Trigger asChild>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={displayValue}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(
                  "w-full h-10 px-3 border rounded bg-white text-sm",
                  "hover:bg-gray-50 hover:border-gray-400",
                  "focus:outline-none",
                  "transition-all duration-150",
                  "cursor-pointer",
                  error ? "border-red-500" : "border-gray-300",
                  disabled &&
                    cn(
                      "bg-gray-100 cursor-not-allowed",
                      "hover:bg-gray-100 hover:border-gray-300",
                    ),
                )}
              />
            </div>
          </PopoverPrimitive.Trigger>

          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              align="start"
              sideOffset={5}
              className={cn(
                "z-50 bg-white rounded-lg shadow-xl p-2",
                "border border-gray-200",
                "data-[state=open]:animate-in",
                "data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0",
                "data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95",
                "data-[state=open]:zoom-in-95",
                "data-[side=bottom]:slide-in-from-top-2",
                "data-[side=top]:slide-in-from-bottom-2",
              )}
            >
              <div className="date-picker-calendar">
                <DayPicker
                  mode="single"
                  selected={selected}
                  onSelect={handleDayClick}
                  locale={ko}
                  disabled={disabledDays}
                  formatters={{
                    formatCaption: (date) => {
                      return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
                    },
                  }}
                />
              </div>

              {/* Footer */}
              <div
                className={cn(
                  "flex items-end justify-between mt-2 pt-2",
                  "border-t border-gray-200",
                )}
              >
                <div className="flex flex-col min-h-8">
                  {internalDate ? (
                    <span className="text-xs text-gray-700">
                      {internalDate.format("YYYY-MM-DD")}
                    </span>
                  ) : (
                    <span className="text-xs text-red-500">
                      날짜를 선택해 주세요.
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className={cn(
                      "w-15 h-8 rounded",
                      "text-xs font-medium text-gray-700",
                      "border border-gray-300",
                      "transition-all duration-150",
                      "active:scale-95",
                      "hover:bg-gray-50",
                    )}
                  >
                    취소
                  </button>
                  <button
                    onClick={handleApply}
                    disabled={!internalDate}
                    className={cn(
                      "w-15 h-8 bg-blue-600 rounded",
                      "text-xs text-white",
                      "hover:bg-blue-700",
                      "active:scale-95",
                      "disabled:bg-gray-300 ",
                      "disabled:cursor-not-allowed",
                      "disabled:active:scale-100",
                      "transition-all duration-150",
                    )}
                  >
                    적용
                  </button>
                </div>
              </div>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>

        {/* Helper/Error Text */}
        {(helperText || errorMessage) && (
          <div>
            {error && errorMessage ? (
              <p className="text-xs text-red-500">{errorMessage}</p>
            ) : (
              helperText && (
                <p className="text-xs text-gray-500">{helperText}</p>
              )
            )}
          </div>
        )}
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";
