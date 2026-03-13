import React, { useState, useMemo } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { cn } from "@/utils/cn";
import type { DateRange } from "../DateRangePicker/DateRangePicker";
import "react-day-picker/style.css";

const TODAY = "2026-03-13";

const MONTH_NAMES = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

export type MonthRangePickerProps = {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  startLabel?: string;
  endLabel?: string;
  className?: string;
  /** 선택 가능한 최소 날짜 (YYYY-MM-DD) */
  min?: string;
  /** 선택 가능한 최대 날짜 (YYYY-MM-DD) */
  max?: string;
};

const toDayjsRange = (
  range?: DateRange,
): [Dayjs | undefined, Dayjs | undefined] => {
  return [
    range?.start ? dayjs(range.start) : undefined,
    range?.end ? dayjs(range.end) : undefined,
  ];
};

const toDateRangeFromMonths = (
  startYear: number,
  startMonth: number,
  endYear: number,
  endMonth: number,
): DateRange => {
  const today = dayjs(TODAY);
  let start = dayjs(`${startYear}-${String(startMonth).padStart(2, "0")}-01`);
  let end = dayjs(`${endYear}-${String(endMonth).padStart(2, "0")}-01`).endOf(
    "month",
  );

  if (start.isAfter(end)) {
    [start, end] = [end, start];
  }
  start = start.startOf("month");
  end = end.endOf("month");

  if (end.isAfter(today)) {
    end = today;
  }

  return {
    start: start.format("YYYY-MM-DD"),
    end: end.format("YYYY-MM-DD"),
  };
};

const isMonthDisabled = (
  year: number,
  month: number,
  min?: string,
  max?: string,
): boolean => {
  const monthStart = dayjs(`${year}-${String(month).padStart(2, "0")}-01`);
  const monthEnd = monthStart.endOf("month");

  if (min) {
    const minDate = dayjs(min);
    if (monthEnd.isBefore(minDate, "day")) return true;
  }
  if (max) {
    const maxDate = dayjs(max);
    if (monthStart.isAfter(maxDate, "day")) return true;
  }
  return false;
};

export const MonthRangePicker = React.forwardRef<
  HTMLDivElement,
  MonthRangePickerProps
>(
  (
    {
      value,
      onChange,
      startLabel = "시작일자",
      endLabel = "종료일자",
      className,
      min,
      max,
    },
    ref,
  ) => {
    const id = React.useId();
    const [isOpen, setIsOpen] = useState(false);
    const [baseYear, setBaseYear] = useState(() => {
      const from = value?.start ? dayjs(value.start) : dayjs(TODAY);
      return from.year();
    });
    const [draftRange, setDraftRange] = useState<
      [Dayjs | undefined, Dayjs | undefined]
    >(() => toDayjsRange(value));
    const [fromDay, toDay] = draftRange;

    const displayValue = useMemo(() => {
      if (!value || !value.start || !value.end) {
        return { start: "", end: "" };
      }
      return {
        start: dayjs(value.start).format("YYYY-MM-DD"),
        end: dayjs(value.end).format("YYYY-MM-DD"),
      };
    }, [value]);

    const handleMonthClick = (year: number, month: number) => {
      if (isMonthDisabled(year, month, min, max)) return;

      const monthDate = dayjs(`${year}-${String(month).padStart(2, "0")}-01`);

      if (!fromDay || (fromDay && toDay)) {
        setDraftRange([monthDate, undefined]);
      } else {
        const [start, end] =
          fromDay.isBefore(monthDate) || fromDay.isSame(monthDate, "month") ?
            [fromDay, monthDate]
          : [monthDate, fromDay];
        setDraftRange([start, end]);
      }
    };

    const getMonthState = (
      year: number,
      month: number,
    ): "start" | "end" | "middle" | "start-end" | "none" => {
      if (!fromDay) return "none";
      if (!toDay) {
        const d = dayjs(`${year}-${String(month).padStart(2, "0")}-01`);
        return fromDay.isSame(d, "month") ? "start" : "none";
      }

      const monthStart = dayjs(`${year}-${String(month).padStart(2, "0")}-01`);
      const fromMonth = fromDay.startOf("month");
      const toMonth = toDay.startOf("month");

      if (
        monthStart.isSame(fromMonth, "month") &&
        monthStart.isSame(toMonth, "month")
      ) {
        return "start-end";
      }
      if (monthStart.isSame(fromMonth, "month")) return "start";
      if (monthStart.isSame(toMonth, "month")) return "end";
      if (
        monthStart.isAfter(fromMonth, "month") &&
        monthStart.isBefore(toMonth, "month")
      ) {
        return "middle";
      }
      return "none";
    };

    const handleApply = () => {
      if (fromDay && toDay) {
        const [start, end] =
          fromDay.isBefore(toDay) || fromDay.isSame(toDay, "month") ?
            [fromDay, toDay]
          : [toDay, fromDay];
        const range = toDateRangeFromMonths(
          start.year(),
          start.month() + 1,
          end.year(),
          end.month() + 1,
        );
        onChange?.(range);
        setIsOpen(false);
      }
    };

    const handleCancel = () => {
      setDraftRange(toDayjsRange(value));
      setIsOpen(false);
    };

    const handleOpenChange = (nextOpen: boolean) => {
      if (nextOpen) {
        setDraftRange(toDayjsRange(value));
        setBaseYear(
          value?.start ? dayjs(value.start).year() : dayjs(TODAY).year(),
        );
      }
      setIsOpen(nextOpen);
    };

    const numberOfMonths = useMemo(() => {
      if (!fromDay || !toDay) return undefined;
      const [s, e] =
        fromDay.isBefore(toDay) || fromDay.isSame(toDay, "month") ?
          [fromDay, toDay]
        : [toDay, fromDay];
      return (e.year() - s.year()) * 12 + (e.month() - s.month()) + 1;
    }, [fromDay, toDay]);

    const renderMonthSection = (year: number) => (
      <div key={year} className="rdp-month">
        <table className="rdp-month_grid">
          <tbody>
            {[0, 1, 2].map((rowIdx) => (
              <tr key={rowIdx} className="rdp-week">
                {[0, 1, 2, 3].map((colIdx) => {
                  const month = rowIdx * 4 + colIdx + 1;
                  const disabled = isMonthDisabled(year, month, min, max);
                  const state = getMonthState(year, month);
                  const dayClasses = cn(
                    "rdp-day",
                    state === "start" && "rdp-day_selected rdp-day_range_start",
                    state === "end" && "rdp-day_selected rdp-day_range_end",
                    state === "middle" && "rdp-day_range_middle",
                    state === "start-end" &&
                      "rdp-day_selected rdp-day_range_start rdp-day_range_end",
                  );
                  return (
                    <td key={month} className={dayClasses} role="gridcell">
                      <button
                        type="button"
                        className="rdp-day_button"
                        disabled={disabled}
                        onClick={() => handleMonthClick(year, month)}
                      >
                        {MONTH_NAMES[month - 1]}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

    return (
      <PopoverPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverPrimitive.Trigger asChild>
          <div ref={ref} className={cn("flex items-center gap-0", className)}>
            <div className="relative flex-1">
              <div
                className={cn(
                  "absolute top-0 left-3 flex h-full items-center",
                  "text-xs text-gray-500",
                  "pointer-events-none",
                )}
              >
                <label htmlFor={`${id}-start`}>{startLabel}</label>
              </div>
              <input
                id={`${id}-start`}
                type="text"
                readOnly
                value={displayValue.start}
                placeholder="YYYY-MM-DD"
                aria-label={startLabel}
                className={cn(
                  "h-10 w-full bg-white pr-3 pl-14-75 text-sm",
                  "focus:outline-none",
                  "rounded-l border border-r-0 border-gray-300",
                  "hover:border-gray-400 hover:bg-gray-50",
                  "transition-all duration-150",
                  "cursor-pointer",
                )}
              />
            </div>
            <div className="relative flex-1">
              <div
                className={cn(
                  "absolute top-0 left-3 flex h-full items-center",
                  "text-xs text-gray-500",
                  "pointer-events-none",
                )}
              >
                <label htmlFor={`${id}-end`}>{endLabel}</label>
              </div>
              <input
                id={`${id}-end`}
                type="text"
                readOnly
                value={displayValue.end}
                placeholder="YYYY-MM-DD"
                aria-label={endLabel}
                className={cn(
                  "h-10 w-full bg-white pr-3 pl-14-75",
                  "text-sm",
                  "rounded-r border border-gray-300",
                  "hover:border-gray-400 hover:bg-gray-50",
                  "focus:outline-none",
                  "transition-all duration-150",
                  "cursor-pointer",
                )}
              />
            </div>
          </div>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={5}
            className={cn(
              "z-50 rounded-lg bg-white p-2",
              "border border-gray-200",
              "shadow-xl",
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
            <div className="date-range-picker-calendar month-range-picker-calendar">
              <div className="rdp rdp-root">
                {/* Full-width nav bar: prev at left, years in center, next at right */}
                <div className="rdp-month_caption flex w-full items-center justify-between px-0">
                  <button
                    type="button"
                    className="rdp-button_previous shrink-0"
                    onClick={() => setBaseYear((y) => y - 1)}
                    aria-label="이전 연도"
                  >
                    ‹
                  </button>
                  <div className="flex flex-1 gap-20">
                    <div className="rdp-caption_label flex-1 justify-center">
                      {baseYear}년
                    </div>
                    <div className="rdp-caption_label flex-1 justify-center">
                      {baseYear + 1}년
                    </div>
                  </div>
                  <button
                    type="button"
                    className="rdp-button_next shrink-0"
                    onClick={() => setBaseYear((y) => y + 1)}
                    aria-label="다음 연도"
                  >
                    ›
                  </button>
                </div>
                <div className="rdp-months">
                  {renderMonthSection(baseYear)}
                  {renderMonthSection(baseYear + 1)}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className={cn(
                "mt-2 flex items-end justify-between pt-2",
                "border-t border-gray-200",
              )}
            >
              <div className="flex min-h-8 flex-col">
                {!fromDay || !toDay ?
                  <span className="text-xs text-red-500">
                    종료일자를 선택해 주세요.
                  </span>
                : <>
                    <span className="text-xs text-gray-700">
                      {fromDay.format("YYYY-MM-DD")} ~{" "}
                      {toDay.format("YYYY-MM-DD")}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({numberOfMonths}개월)
                    </span>
                  </>
                }
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className={cn(
                    "h-8 w-15 cursor-pointer",
                    "rounded-sm border border-gray-300 bg-transparent",
                    "text-xs font-medium text-gray-700",
                    "transition-all duration-150",
                    "hover:bg-gray-50",
                    "active:scale-95",
                  )}
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  disabled={!fromDay || !toDay}
                  className={cn(
                    "cursor-pointer border-0",
                    "h-8 w-15",
                    "rounded-sm bg-[#358fff]",
                    "text-xs font-medium text-white",
                    "hover:bg-[#0071fe]",
                    "active:scale-95",
                    "disabled:bg-gray-300",
                    "disabled:active:scale-100",
                    "disabled:cursor-not-allowed",
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
    );
  },
);

MonthRangePicker.displayName = "MonthRangePicker";
