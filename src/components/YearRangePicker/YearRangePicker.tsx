import React, { useState, useMemo } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { cn } from "@/utils/cn";
import type { DateRange } from "../DateRangePicker/DateRangePicker";
import "react-day-picker/style.css";

const TODAY = "2026-03-13";

const YEARS_PER_SECTION = 10;

export type YearRangePickerProps = {
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

const toDateRangeFromYears = (
  startYear: number,
  endYear: number,
): DateRange => {
  const today = dayjs(TODAY);
  let start = dayjs(`${startYear}-01-01`);
  let end = dayjs(`${endYear}-12-31`);

  if (start.isAfter(end)) {
    [start, end] = [end, start];
  }

  if (end.isAfter(today)) {
    end = today;
  }

  return {
    start: start.format("YYYY-MM-DD"),
    end: end.format("YYYY-MM-DD"),
  };
};

const isYearDisabled = (
  year: number,
  min?: string,
  max?: string,
): boolean => {
  const yearStart = dayjs(`${year}-01-01`);
  const yearEnd = dayjs(`${year}-12-31`);

  if (min) {
    const minDate = dayjs(min);
    if (yearEnd.isBefore(minDate, "day")) return true;
  }
  if (max) {
    const maxDate = dayjs(max);
    if (yearStart.isAfter(maxDate, "day")) return true;
  }
  return false;
};

export const YearRangePicker = React.forwardRef<
  HTMLDivElement,
  YearRangePickerProps
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
      return Math.floor(from.year() / 20) * 20;
    });
    const [draftRange, setDraftRange] = useState<
      [Dayjs | undefined, Dayjs | undefined]
    >(() => toDayjsRange(value));
    const [fromDay, toDay] = draftRange;

    const leftYears = useMemo(
      () =>
        Array.from({ length: YEARS_PER_SECTION }, (_, i) => baseYear + i),
      [baseYear],
    );
    const rightYears = useMemo(
      () =>
        Array.from(
          { length: YEARS_PER_SECTION },
          (_, i) => baseYear + YEARS_PER_SECTION + i,
        ),
      [baseYear],
    );

    const displayValue = useMemo(() => {
      if (!value || !value.start || !value.end) {
        return { start: "", end: "" };
      }
      return {
        start: dayjs(value.start).format("YYYY-MM-DD"),
        end: dayjs(value.end).format("YYYY-MM-DD"),
      };
    }, [value]);

    const handleYearClick = (year: number) => {
      if (isYearDisabled(year, min, max)) return;

      const yearStart = dayjs(`${year}-01-01`);

      if (!fromDay || (fromDay && toDay)) {
        setDraftRange([yearStart, undefined]);
      } else {
        const [start, end] =
          fromDay.year() <= year ? [fromDay, yearStart] : [yearStart, fromDay];
        setDraftRange([start, end]);
      }
    };

    const getYearState = (
      year: number,
    ): "start" | "end" | "middle" | "start-end" | "none" => {
      if (!fromDay) return "none";
      if (!toDay) {
        return fromDay.year() === year ? "start" : "none";
      }

      const fromYear = fromDay.year();
      const toYear = toDay.year();

      if (year === fromYear && year === toYear) return "start-end";
      if (year === fromYear) return "start";
      if (year === toYear) return "end";
      if (year > fromYear && year < toYear) return "middle";
      return "none";
    };

    const handleApply = () => {
      if (fromDay && toDay) {
        const [start, end] =
          fromDay.year() <= toDay.year() ? [fromDay, toDay] : [toDay, fromDay];
        const range = toDateRangeFromYears(start.year(), end.year());
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
          value?.start
            ? Math.floor(dayjs(value.start).year() / 20) * 20
            : Math.floor(dayjs(TODAY).year() / 20) * 20,
        );
      }
      setIsOpen(nextOpen);
    };

    const numberOfYears = useMemo(() => {
      if (!fromDay || !toDay) return undefined;
      const [s, e] =
        fromDay.year() <= toDay.year() ? [fromDay, toDay] : [toDay, fromDay];
      return e.year() - s.year() + 1;
    }, [fromDay, toDay]);

    const renderYearSection = (years: number[]) => (
      <div key={years[0]} className="rdp-month">
        <table className="rdp-month_grid">
          <tbody>
            {[0, 1].map((rowIdx) => (
              <tr key={rowIdx} className="rdp-week">
                {[0, 1, 2, 3, 4].map((colIdx) => {
                  const year = years[rowIdx * 5 + colIdx];
                  const disabled = isYearDisabled(year, min, max);
                  const state = getYearState(year);
                  const dayClasses = cn(
                    "rdp-day",
                    state === "start" && "rdp-day_selected rdp-day_range_start",
                    state === "end" && "rdp-day_selected rdp-day_range_end",
                    state === "middle" && "rdp-day_range_middle",
                    state === "start-end" &&
                      "rdp-day_selected rdp-day_range_start rdp-day_range_end",
                  );
                  return (
                    <td key={year} className={dayClasses} role="gridcell">
                      <button
                        type="button"
                        className="rdp-day_button"
                        disabled={disabled}
                        onClick={() => handleYearClick(year)}
                      >
                        {year}
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
              "z-50 w-[666px] rounded-lg bg-white p-2",
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
            <div className="date-range-picker-calendar w-[666px]">
              <div className="rdp rdp-root">
                {/* Nav bar: prev at left, next at right, no caption */}
                <div className="rdp-month_caption flex w-full items-center justify-between px-0">
                  <button
                    type="button"
                    className="rdp-button_previous shrink-0"
                    onClick={() => setBaseYear((y) => y - 20)}
                    aria-label="이전 20년"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="rdp-button_next shrink-0"
                    onClick={() => setBaseYear((y) => y + 20)}
                    aria-label="다음 20년"
                  >
                    ›
                  </button>
                </div>
                <div className="rdp-months">
                  {renderYearSection(leftYears)}
                  {renderYearSection(rightYears)}
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
                : (
                  <>
                    <span className="text-xs text-gray-700">
                      {fromDay.format("YYYY-MM-DD")} ~{" "}
                      {toDay.format("YYYY-MM-DD")}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({numberOfYears}년)
                    </span>
                  </>
                )}
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

YearRangePicker.displayName = "YearRangePicker";
