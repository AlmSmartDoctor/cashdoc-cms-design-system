import React, { useState, useEffect, useMemo } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import dayjs, { Dayjs } from "dayjs";
import { cn } from "@/utils/cn";
import { CalendarIcon } from "@/components/icons";
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

/**
 * 사용자가 달력 인터페이스를 통해 특정 날짜를 선택할 수 있게 하는 컴포넌트입니다.
 *
 * {@link DatePicker}는 직접적인 텍스트 입력 대신 시각적인 달력을 제공하여
 * 날짜 형식의 오류를 방지하고 사용자 편의성을 높입니다.
 *
 * `react-day-picker`와 `dayjs`를 기반으로 구현되었으며, 한국어 로케일을 기본으로 지원합니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **특정일 선택**: 생년월일, 예약일, 마감일 등 단일 날짜를 입력받아야 할 때
 * - **제한된 범위 내 선택**: 과거 날짜만 선택 가능하거나, 특정 기간 내에서만 선택해야 할 때
 * - **정확한 날짜 입력**: 텍스트 입력 시 발생할 수 있는 포맷 오류를 방지하고 싶을 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **기간 선택**: 시작일과 종료일을 함께 선택해야 하는 경우 `DateRangePicker`를 사용하세요.
 * - **대략적인 시간/날짜**: '방금 전', '1주일 내' 등 상대적인 시간 선택이 필요한 경우 `Dropdown`이나 `RadioButton`이 더 적절할 수 있습니다.
 * - **빠른 연도 이동**: 수십 년 전의 날짜를 선택해야 하는 경우(예: 생년월일) 달력보다는 직접 입력이나 연도 선택 기능이 포함된 별도 UI를 고려하세요.
 *
 * ## Layout behavior
 *
 * - **Popover 기반**: 클릭 시 입력창 아래에 달력 팝오버가 나타나며, 화면 공간을 효율적으로 사용합니다.
 * - **Responsive**: 팝오버는 화면 경계 내에서 최적의 위치를 자동으로 찾아 표시됩니다.
 * - **Full Width**: `className`을 통해 부모 요소의 너비에 맞게 조절할 수 있습니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **적절한 Placeholder**: "YYYY-MM-DD"와 같이 기대하는 날짜 형식을 명시하세요.
 * - **최소/최대 날짜 설정**: 비즈니스 로직에 따라 `min`, `max` 속성을 사용하여 유효하지 않은 날짜 선택을 방지하세요.
 * - **레이블 및 헬퍼 텍스트**: 입력 항목의 용도를 명확히 하고, 필요한 경우 보충 설명을 제공하세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **Read-only 입력**: 사용자가 직접 타이핑하여 입력하는 기능은 현재 지원하지 않으므로, 반드시 달력을 통해 선택하도록 안내하세요.
 * - **복잡한 로직**: 너무 많은 날짜 제한 로직은 사용자에게 혼란을 줄 수 있습니다. 필요한 경우 에러 메시지로 명확히 안내하세요.
 *
 * ## Accessibility
 *
 * - **Keyboard Navigation**: 팝오버는 키보드로 열고 닫을 수 있으며, `Esc` 키로 취소할 수 있습니다.
 * - **Focus Trap**: 달력이 열려 있는 동안 포커스가 달력 내부에 머무르도록 관리됩니다.
 * - **Aria Labels**: 달력의 각 요소에는 스크린 리더를 위한 적절한 레이블이 포함되어 있습니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 기본적인 날짜 선택 예시:
 *
 * ```tsx
 * const [date, setDate] = useState("");
 *
 * <DatePicker
 *   label="방문 예약일"
 *   value={date}
 *   onChange={setDate}
 *   placeholder="예약 날짜를 선택하세요"
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 날짜 범위 제한 및 에러 상태:
 *
 * ```tsx
 * <DatePicker
 *   label="종료일"
 *   min="2024-01-01"
 *   max="2024-12-31"
 *   error={true}
 *   errorMessage="2024년 내의 날짜만 선택 가능합니다"
 * />
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link DateRangePicker}, 기간을 선택해야 하는 경우
 * - {@link TextInput}, 단순한 텍스트 입력이 필요한 경우
 * - {@link Popover}, 일반적인 팝오버 컴포넌트
 *
 * ## 참고사진
 * ![](https://github.com/AlmSmartDoctor/ccds-screenshots/blob/main/screenshots/Forms/DatePicker/For%20Jsdoc.png?raw=true)
 */
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
      const disabled: Array<{ before: Date } | { after: Date }> = [];
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
              <div
                className={cn(
                  "flex items-center",
                  "absolute top-0 left-3 h-full",
                  "pointer-events-none",
                )}
              >
                <CalendarIcon
                  size={20}
                  strokeWidth={1.5}
                  className={cn("text-gray-400", disabled && "text-gray-300")}
                />
              </div>
              <input
                type="text"
                readOnly
                value={displayValue}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(
                  "h-10 w-full rounded border bg-white pr-3 pl-10 text-sm",
                  "hover:border-gray-400 hover:bg-gray-50",
                  "focus:outline-none",
                  "transition-all duration-150",
                  "cursor-pointer",
                  error ? "border-red-500" : "border-gray-300",
                  disabled &&
                    cn(
                      "cursor-not-allowed bg-gray-100",
                      "hover:border-gray-300 hover:bg-gray-100",
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
                "z-50 rounded-lg bg-white p-2 shadow-xl",
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
                  "mt-2 flex items-end justify-between pt-2",
                  "border-t border-gray-200",
                )}
              >
                <div className="flex min-h-8 flex-col">
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
                      "h-8 w-15 cursor-pointer rounded",
                      "text-xs font-medium text-gray-700",
                      "border border-gray-300 bg-transparent",
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
                      "cursor-pointer border-0",
                      "h-8 w-15 rounded bg-blue-600",
                      "text-xs text-white",
                      "hover:bg-blue-700",
                      "active:scale-95",
                      "disabled:bg-gray-300",
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
