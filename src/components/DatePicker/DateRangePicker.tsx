import React, { useState, useEffect, useMemo } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { DayPicker, DateRange as DayPickerDateRange } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import dayjs, { Dayjs } from "dayjs";
import { cn } from "@/utils/cn";
import "react-day-picker/style.css";

export interface DateRange {
  start: string;
  end: string;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  startLabel?: string;
  endLabel?: string;
  className?: string;
}

type QuickSelectOption = {
  label: string;
  getValue: () => [Dayjs, Dayjs];
};

const getQuickSelectOptions = (): QuickSelectOption[] => {
  const now = dayjs();

  return [
    {
      label: "전체",
      getValue: () => [dayjs("2000-01-01"), dayjs("2099-12-31")],
    },
    {
      label: "오늘",
      getValue: () => [now, now],
    },
    {
      label: "내일",
      getValue: () => [now.add(1, "day"), now.add(1, "day")],
    },
    {
      label: "이번주",
      getValue: () => [now.startOf("week"), now.endOf("week")],
    },
    {
      label: "이번달",
      getValue: () => [now.startOf("month"), now.endOf("month")],
    },
    {
      label: "7일",
      getValue: () => [now, now.add(6, "day")],
    },
    {
      label: "30일",
      getValue: () => [now, now.add(29, "day")],
    },
    {
      label: "다음주",
      getValue: () => [
        now.add(1, "week").startOf("week"),
        now.add(1, "week").endOf("week"),
      ],
    },
    {
      label: "다음달",
      getValue: () => [
        now.add(1, "month").startOf("month"),
        now.add(1, "month").endOf("month"),
      ],
    },
  ];
};

export const DateRangePicker = React.forwardRef<
  HTMLDivElement,
  DateRangePickerProps
>(
  (
    {
      value,
      onChange,
      startLabel = "시작일자",
      endLabel = "종료일자",
      className,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalRange, setInternalRange] = useState<
      [Dayjs | undefined, Dayjs | undefined]
    >([
      value?.start ? dayjs(value.start) : undefined,
      value?.end ? dayjs(value.end) : undefined,
    ]);

    useEffect(() => {
      if (value) {
        setInternalRange([
          value.start ? dayjs(value.start) : undefined,
          value.end ? dayjs(value.end) : undefined,
        ]);
      }
    }, [value]);

    const [fromDay, toDay] = internalRange;

    const selected: DayPickerDateRange | undefined = useMemo(() => {
      if (!fromDay) return undefined;
      return {
        from: fromDay.toDate(),
        to: toDay?.toDate(),
      };
    }, [fromDay, toDay]);

    const handleQuickSelect = (option: QuickSelectOption) => {
      const [start, end] = option.getValue();
      setInternalRange([start, end]);
    };

    const handleDayClick = (range: DayPickerDateRange | undefined) => {
      if (!range) {
        setInternalRange([undefined, undefined]);
        return;
      }

      const from = range.from ? dayjs(range.from) : undefined;
      const to = range.to ? dayjs(range.to) : undefined;

      setInternalRange([from, to]);
    };

    const handleApply = () => {
      if (fromDay && toDay) {
        onChange?.({
          start: fromDay.format("YYYY-MM-DD"),
          end: toDay.format("YYYY-MM-DD"),
        });
        setIsOpen(false);
      }
    };

    const handleCancel = () => {
      setInternalRange([
        value?.start ? dayjs(value.start) : undefined,
        value?.end ? dayjs(value.end) : undefined,
      ]);
      setIsOpen(false);
    };

    const numberOfDays = useMemo(() => {
      if (!fromDay || !toDay) return undefined;
      return toDay.diff(fromDay, "day") + 1;
    }, [fromDay, toDay]);

    const displayValue = useMemo(() => {
      if (!value?.start || !value?.end) {
        return { start: "", end: "" };
      }
      return {
        start: dayjs(value.start).format("YYYY-MM-DD"),
        end: dayjs(value.end).format("YYYY-MM-DD"),
      };
    }, [value]);

    return (
      <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <PopoverPrimitive.Trigger asChild>
          <div
            ref={ref}
            className={cn("flex items-center gap-0", className)}
          >
            <div className="relative flex-1">
              <label className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                {startLabel}
              </label>
              <input
                type="text"
                readOnly
                value={displayValue.start}
                placeholder="YYYY-MM-DD"
                className="w-full h-10 pl-[59px] pr-3 border border-gray-300 border-r-0 rounded-l bg-white text-sm cursor-pointer hover:bg-gray-50 hover:border-gray-400 focus:outline-none transition-all duration-150"
              />
            </div>
            <div className="relative flex-1">
              <label className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                {endLabel}
              </label>
              <input
                type="text"
                readOnly
                value={displayValue.end}
                placeholder="YYYY-MM-DD"
                className="w-full h-10 pl-[59px] pr-3 border border-gray-300 rounded-r bg-white text-sm cursor-pointer hover:bg-gray-50 hover:border-gray-400 focus:outline-none transition-all duration-150"
              />
            </div>
          </div>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={5}
            className="z-50 bg-white rounded-lg shadow-xl p-2 border border-gray-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
          >
            <div className="flex gap-2">
              {/* Quick Select Buttons */}
              <div className="flex flex-col border-r border-gray-200 pr-2">
                {getQuickSelectOptions().map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleQuickSelect(option)}
                    className="w-[70px] h-[26px] px-2 text-left text-xs text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:font-medium border-b border-gray-200 last:border-b-0 transition-all duration-150 rounded-sm"
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {/* Calendar */}
              <div className="date-range-picker-calendar">
                <DayPicker
                  mode="range"
                  selected={selected}
                  onSelect={handleDayClick}
                  numberOfMonths={2}
                  locale={ko}
                  formatters={{
                    formatCaption: (date) => {
                      return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
                    },
                  }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-end justify-between mt-2 pt-2 border-t border-gray-200">
              <div className="flex flex-col min-h-[32px]">
                {!fromDay || !toDay ? (
                  <span className="text-xs text-red-500">
                    종료일자를 선택해 주세요.
                  </span>
                ) : (
                  <>
                    <span className="text-xs text-gray-700">
                      {fromDay.format("YYYY-MM-DD")} ~{" "}
                      {toDay.format("YYYY-MM-DD")}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({numberOfDays}일간)
                    </span>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="w-[60px] h-8 border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 active:scale-95 transition-all duration-150"
                >
                  취소
                </button>
                <button
                  onClick={handleApply}
                  disabled={!fromDay || !toDay}
                  className="w-[60px] h-8 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:active:scale-100 transition-all duration-150"
                >
                  적용
                </button>
              </div>
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  }
);

DateRangePicker.displayName = "DateRangePicker";
