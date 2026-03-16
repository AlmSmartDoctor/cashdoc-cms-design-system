import React, { useState, useMemo } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { cn } from "@/utils/cn";
import type { DateRange } from "../DateRangePicker/DateRangePicker";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import "react-day-picker/style.css";

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

const clampToMinMaxYears = (
  fromYear: Dayjs,
  toYear: Dayjs,
  min?: string,
  max?: string,
): { start: Dayjs; end: Dayjs } => {
  let start = fromYear.startOf("year");
  let end = toYear.endOf("year");
  if (fromYear.isAfter(toYear, "year")) {
    [start, end] = [toYear.startOf("year"), fromYear.endOf("year")];
  }
  if (min) {
    const minDate = dayjs(min);
    if (start.isBefore(minDate, "day")) start = minDate;
  }
  if (max) {
    const maxDate = dayjs(max);
    if (end.isAfter(maxDate, "day")) end = maxDate;
  }
  return { start, end };
};

const toDateRangeFromYears = (
  startYear: number,
  endYear: number,
  min?: string,
  max?: string,
): DateRange => {
  const fromYear = dayjs(`${startYear}-01-01`);
  const toYear = dayjs(`${endYear}-12-31`);
  const { start, end } = clampToMinMaxYears(fromYear, toYear, min, max);
  return {
    start: start.format("YYYY-MM-DD"),
    end: end.format("YYYY-MM-DD"),
  };
};

const isYearDisabled = (year: number, min?: string, max?: string): boolean => {
  const minYear = min ? dayjs(min).year() : undefined;
  const maxYear = max ? dayjs(max).year() : undefined;
  if (minYear != null && year < minYear) return true;
  if (maxYear != null && year > maxYear) return true;
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
      const from = value?.start ? dayjs(value.start) : dayjs();
      return Math.floor(from.year() / 20) * 20;
    });
    const [draftRange, setDraftRange] = useState<
      [Dayjs | undefined, Dayjs | undefined]
    >(() => toDayjsRange(value));
    const [fromDay, toDay] = draftRange;

    const leftYears = useMemo(
      () => Array.from({ length: YEARS_PER_SECTION }, (_, i) => baseYear + i),
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

      const yearDate = dayjs(`${year}-01-01`);
      const hasSingleYear = fromDay && toDay && fromDay.isSame(toDay, "year");

      // 1. 처음: start year 선택 → start=end (해당 연도 1/1 ~ 12/31)
      if (!fromDay || !toDay) {
        setDraftRange([yearDate.startOf("year"), yearDate.endOf("year")]);
        return;
      }

      // 5. single year 상태에서 같은 연도 재클릭 → clear
      if (hasSingleYear && fromDay.isSame(yearDate, "year")) {
        setDraftRange([undefined, undefined]);
        return;
      }

      // 2. single year 상태에서 다른 연도 클릭 → 이전 연도=start, 이후 연도=end
      if (hasSingleYear) {
        const [start, end] =
          fromDay.isBefore(yearDate) || fromDay.isSame(yearDate, "year") ?
            [fromDay.startOf("year"), yearDate.endOf("year")]
          : [yearDate.startOf("year"), fromDay.endOf("year")];
        setDraftRange([start, end]);
        return;
      }

      // 4. range 상태에서 start 또는 end 클릭 → 해당 연도로 start=end
      const [start, end] =
        fromDay.isBefore(toDay) || fromDay.isSame(toDay, "year") ?
          [fromDay, toDay]
        : [toDay, fromDay];
      if (yearDate.isSame(start, "year") || yearDate.isSame(end, "year")) {
        setDraftRange([yearDate, yearDate.endOf("year")]);
        return;
      }

      // 3. range 상태에서 middle year 클릭
      // start 이전 선택 → start 변경, 그 외(범위 내/end 이후) → end 변경
      if (yearDate.isBefore(start, "year")) {
        setDraftRange([yearDate, end]);
      } else {
        setDraftRange([start, yearDate.endOf("year")]);
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
          fromDay.isBefore(toDay) || fromDay.isSame(toDay, "year") ?
            [fromDay, toDay]
          : [toDay, fromDay];
        const range = toDateRangeFromYears(start.year(), end.year(), min, max);
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
          value?.start ?
            Math.floor(dayjs(value.start).year() / 20) * 20
          : Math.floor(dayjs().year() / 20) * 20,
        );
      }
      setIsOpen(nextOpen);
    };

    const clampedRange = useMemo(() => {
      if (!fromDay || !toDay) return undefined;
      const fromYear = fromDay.startOf("year");
      const toYear = toDay.endOf("year");
      return clampToMinMaxYears(fromYear, toYear, min, max);
    }, [fromDay, toDay, min, max]);

    const numberOfYears = useMemo(() => {
      if (!clampedRange) return undefined;
      const { start, end } = clampedRange;
      return end.year() - start.year() + 1;
    }, [clampedRange]);

    const minYear = min ? dayjs(min).year() : undefined;
    const maxYear = max ? dayjs(max).year() : undefined;
    const isPrevDisabled = minYear != null && baseYear <= minYear;
    const isNextDisabled = maxYear != null && baseYear + 20 > maxYear;

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
                    disabled && "rdp-day_disabled",
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
                        className={cn(
                          "rdp-day_button",
                          disabled && "rdp-day_button--disabled",
                        )}
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
            <div className="date-range-picker-calendar year-range-picker-calendar">
              <div className="rdp rdp-root">
                <div className="rdp-month_caption flex w-full items-center justify-between px-0">
                  <button
                    type="button"
                    className="rdp-button_previous shrink-0"
                    disabled={isPrevDisabled}
                    onClick={() => setBaseYear((y) => y - 20)}
                    aria-label="이전 20년"
                  >
                    <ChevronLeftIcon size={16} className="text-cms-gray-600" />
                  </button>
                  <div className="rdp-caption_label flex-1 justify-center text-center text-sm font-semibold">
                    {baseYear} ~ {baseYear + 19}년
                  </div>
                  <button
                    type="button"
                    className="rdp-button_next shrink-0"
                    disabled={isNextDisabled}
                    onClick={() => setBaseYear((y) => y + 20)}
                    aria-label="다음 20년"
                  >
                    <ChevronRightIcon size={16} className="text-cms-gray-600" />
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
                    기간을 선택해 주세요.
                  </span>
                : clampedRange ?
                  <>
                    <span className="text-xs text-gray-700">
                      {clampedRange.start.format("YYYY-MM-DD")} ~{" "}
                      {clampedRange.end.format("YYYY-MM-DD")}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({numberOfYears}년)
                    </span>
                  </>
                : null}
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
