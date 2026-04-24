import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Clock } from "lucide-react";
import { cn } from "@/utils/cn";
import { useDisclosure } from "@/hooks/useDisclosure";

type TimePeriod = "AM" | "PM";

type ParsedTime = {
  hour: number | null;
  minute: number | null;
  period: TimePeriod;
};

const EMPTY_TIME: ParsedTime = {
  hour: null,
  minute: null,
  period: "AM",
};

const parseTimeValue = (
  time: string | undefined,
  format: "24h" | "12h",
): ParsedTime => {
  if (!time) return EMPTY_TIME;

  const timeRegex24h = /^(\d{1,2}):(\d{2})$/;
  const timeRegex12h = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;

  if (format === "24h") {
    const match = time.match(timeRegex24h);
    if (!match) return EMPTY_TIME;

    const hour = Number.parseInt(match[1], 10);
    const minute = Number.parseInt(match[2], 10);
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return EMPTY_TIME;

    return {
      hour,
      minute,
      period: "AM",
    };
  }

  const match = time.match(timeRegex12h);
  if (!match) return EMPTY_TIME;

  const hour = Number.parseInt(match[1], 10);
  const minute = Number.parseInt(match[2], 10);
  if (hour < 1 || hour > 12 || minute < 0 || minute > 59) return EMPTY_TIME;

  return {
    hour,
    minute,
    period: match[3].toUpperCase() === "PM" ? "PM" : "AM",
  };
};

const formatTimeValue = (
  hour: number | null,
  minute: number | null,
  period: TimePeriod,
  format: "24h" | "12h",
): string => {
  if (hour === null || minute === null) return "";

  const formattedMinute = minute.toString().padStart(2, "0");
  if (format === "24h") {
    const formattedHour = hour.toString().padStart(2, "0");
    return `${formattedHour}:${formattedMinute}`;
  }

  return `${hour}:${formattedMinute} ${period}`;
};

export type TimePickerProps = {
  value?: string;
  onChange?: (time: string) => void;
  label?: string;
  placeholder?: string;
  format?: "24h" | "12h";
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  className?: string;
  minuteStep?: number;
  showIcon?: boolean;
};

/**
 * 사용자가 시간을 선택할 수 있게 하는 컴포넌트입니다.
 *
 * {@link TimePicker}는 직관적인 스크롤 인터페이스를 통해 시간과 분을 선택할 수 있으며,
 * 24시간 형식과 12시간(AM/PM) 형식을 모두 지원합니다.
 *
 * `@radix-ui/react-popover`를 기반으로 구현되었으며, 사용자가 잘못된 시간을 입력하는 것을 방지합니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **특정 시간 입력**: 예약 시간, 알림 시간, 업무 시작/종료 시간 등을 선택해야 할 때
 * - **정확한 시간 선택**: 사용자가 직접 타이핑하여 발생할 수 있는 형식 오류를 방지하고 싶을 때
 * - **제한된 간격 선택**: 5분, 10분, 15분 단위로만 선택이 필요한 경우 (minuteStep 사용)
 *
 * **사용하지 말아야 하는 경우:**
 * - **대략적인 시간**: '오전', '오후', '저녁' 등 상대적인 시간 선택이 필요한 경우 `Dropdown`이나 `RadioButton`이 더 적절할 수 있습니다.
 * - **초 단위 정밀도**: 현재는 시간과 분까지만 지원하므로, 초 단위가 필요한 경우 다른 컴포넌트를 고려하세요.
 *
 * ## Layout behavior
 *
 * - **Popover 기반**: 클릭 시 입력창 아래에 시간 선택 팝오버가 나타나며, 화면 공간을 효율적으로 사용합니다.
 * - **스크롤 선택**: 시간과 분을 각각 스크롤하여 선택할 수 있어 직관적입니다.
 * - **Full Width**: `className`을 통해 부모 요소의 너비에 맞게 조절할 수 있습니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **적절한 Format**: 사용자가 익숙한 형식(한국: 24시간, 미국: 12시간)을 선택하세요.
 * - **Minute Step 활용**: 일정 간격으로만 선택이 필요한 경우 `minuteStep`을 활용하여 UX를 개선하세요.
 * - **레이블 및 헬퍼 텍스트**: 입력 항목의 용도를 명확히 하고, 필요한 경우 보충 설명을 제공하세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **Read-only 입력**: 사용자가 직접 타이핑하여 입력하는 기능은 지원하지 않으므로, 반드시 UI를 통해 선택하도록 안내하세요.
 * - **과도한 Step**: `minuteStep`이 너무 크면 정확한 시간을 선택하기 어려울 수 있습니다.
 *
 * ## Accessibility
 *
 * - **Keyboard Navigation**: 팝오버는 키보드로 열고 닫을 수 있으며, `Esc` 키로 취소할 수 있습니다.
 * - **Focus Management**: 시간 선택기가 열려 있는 동안 포커스가 적절히 관리됩니다.
 * - **Aria Labels**: 각 버튼에는 스크린 리더를 위한 적절한 레이블이 포함되어 있습니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 기본적인 시간 선택 예시 (24시간 형식):
 *
 * ```tsx
 * const [time, setTime] = useState("");
 *
 * <TimePicker
 *   label="출근 시간"
 *   value={time}
 *   onChange={setTime}
 *   placeholder="시간을 선택하세요"
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 12시간 형식 및 15분 단위 선택:
 *
 * ```tsx
 * <TimePicker
 *   label="회의 시간"
 *   format="12h"
 *   minuteStep={15}
 *   value="2:30 PM"
 *   onChange={setTime}
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 에러 상태:
 *
 * ```tsx
 * <TimePicker
 *   label="마감 시간"
 *   error={true}
 *   errorMessage="업무 시간(9:00-18:00) 내에서 선택해주세요"
 * />
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link DatePicker}, 날짜를 선택해야 하는 경우
 * - {@link DateRangePicker}, 날짜 범위를 선택해야 하는 경우
 * - {@link TextInput}, 단순한 텍스트 입력이 필요한 경우
 *
 * ## 참고사진
 * ![](https://raw.githubusercontent.com/AlmSmartDoctor/ccds-screenshots/main/screenshots/Forms/TimePicker/For%20Jsdoc.png?raw=true)
 */
export const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      value,
      onChange,
      label,
      placeholder = "HH:MM",
      format = "24h",
      disabled = false,
      error = false,
      errorMessage,
      helperText,
      className,
      minuteStep = 1,
      showIcon = true,
    },
    ref,
  ) => {
    const initialTime = parseTimeValue(value, format);
    const reactId = useId();
    const inputId = `${reactId}-input`;
    const errorId = `${reactId}-error`;
    const helperId = `${reactId}-helper`;
    const describedBy =
      error && errorMessage ? errorId
      : helperText ? helperId
      : undefined;
    const { isOpen, onOpenChange: setIsOpen } = useDisclosure();
    const [selectedHour, setSelectedHour] = useState<number | null>(
      initialTime.hour,
    );
    const [selectedMinute, setSelectedMinute] = useState<number | null>(
      initialTime.minute,
    );
    const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>(
      initialTime.period,
    );
    const [internalValue, setInternalValue] = useState(value ?? "");

    const hourScrollRef = useRef<HTMLDivElement>(null);
    const minuteScrollRef = useRef<HTMLDivElement>(null);
    const isControlled = value !== undefined;
    const committedValue = isControlled ? value : internalValue;
    const parsedCommittedValue = useMemo(
      () => parseTimeValue(committedValue, format),
      [committedValue, format],
    );

    const syncDraftFromCommittedValue = () => {
      setSelectedHour(parsedCommittedValue.hour);
      setSelectedMinute(parsedCommittedValue.minute);
      setSelectedPeriod(parsedCommittedValue.period);
    };

    const handleOpenChange = (nextOpen: boolean) => {
      if (disabled) return;
      if (nextOpen) {
        syncDraftFromCommittedValue();
      }
      setIsOpen(nextOpen);
    };

    const hours = useMemo(() => {
      if (format === "24h") {
        return Array.from({ length: 24 }, (_, i) => i);
      } else {
        return Array.from({ length: 12 }, (_, i) => i + 1);
      }
    }, [format]);

    const minutes = useMemo(() => {
      const options: number[] = [];
      for (let i = 0; i < 60; i += minuteStep) {
        options.push(i);
      }
      return options;
    }, [minuteStep]);

    const draftDisplayValue = useMemo(
      () =>
        formatTimeValue(selectedHour, selectedMinute, selectedPeriod, format),
      [selectedHour, selectedMinute, selectedPeriod, format],
    );
    const committedDisplayValue = useMemo(
      () =>
        formatTimeValue(
          parsedCommittedValue.hour,
          parsedCommittedValue.minute,
          parsedCommittedValue.period,
          format,
        ),
      [parsedCommittedValue, format],
    );
    const displayValue = isOpen ? draftDisplayValue : committedDisplayValue;
    const hourAriaLabelSuffix = format === "24h" ? "시" : "";
    const minuteAriaLabelSuffix = format === "24h" ? "분" : " minutes";

    const handleApply = () => {
      if (selectedHour !== null && selectedMinute !== null) {
        const nextValue = formatTimeValue(
          selectedHour,
          selectedMinute,
          selectedPeriod,
          format,
        );
        if (!isControlled) {
          setInternalValue(nextValue);
        }
        onChange?.(nextValue);
        setIsOpen(false);
      }
    };

    const handleCancel = () => {
      syncDraftFromCommittedValue();
      setIsOpen(false);
    };

    // Scroll to selected item when popover opens
    useEffect(() => {
      if (isOpen && selectedHour !== null) {
        setTimeout(() => {
          const hourButton = hourScrollRef.current?.querySelector(
            `[data-value="${selectedHour}"]`,
          );
          hourButton?.scrollIntoView({ block: "center" });
        }, 0);
      }
      if (isOpen && selectedMinute !== null) {
        setTimeout(() => {
          const minuteButton = minuteScrollRef.current?.querySelector(
            `[data-value="${selectedMinute}"]`,
          );
          minuteButton?.scrollIntoView({ block: "center" });
        }, 0);
      }
    }, [isOpen, selectedHour, selectedMinute]);

    return (
      <div ref={ref} className={cn("flex flex-col gap-1", className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-cms-gray-700"
          >
            {label}
          </label>
        )}
        <PopoverPrimitive.Root
          open={isOpen && !disabled}
          onOpenChange={handleOpenChange}
        >
          <PopoverPrimitive.Trigger asChild>
            <div className="relative">
              <input
                id={inputId}
                type="text"
                readOnly
                value={displayValue}
                placeholder={placeholder}
                disabled={disabled}
                aria-invalid={error || undefined}
                aria-describedby={describedBy}
                className={cn(
                  "h-10 w-full rounded-sm border bg-cms-white px-3 text-sm",
                  "hover:border-cms-gray-400 hover:bg-cms-gray-100",
                  "focus:outline-none",
                  "transition-all duration-150",
                  "cursor-pointer",
                  error ? "border-cms-red-500" : "border-cms-gray-300",
                  disabled &&
                    cn(
                      "cursor-not-allowed bg-cms-gray-150",
                      "hover:border-cms-gray-300 hover:bg-cms-gray-150",
                    ),
                )}
              />
              {showIcon && (
                <Clock
                  className={cn(
                    "absolute top-1/2 right-0 -translate-y-1/2",
                    "size-4 text-cms-gray-400",
                    disabled && "opacity-50",
                  )}
                />
              )}
            </div>
          </PopoverPrimitive.Trigger>

          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              align="start"
              sideOffset={5}
              className={cn(
                "z-cms-overlay rounded-lg bg-cms-white shadow-xl",
                "border border-cms-gray-200",
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
              <div className="p-4">
                {/* Time Picker Columns */}
                <div className="flex gap-2">
                  {/* Hour Column */}
                  <div className="flex flex-col">
                    <div
                      className={cn(
                        "text-center text-xs text-cms-gray-500",
                        "mb-2",
                        "font-medium",
                      )}
                    >
                      {format === "24h" ? "시" : "Hour"}
                    </div>
                    <div
                      ref={hourScrollRef}
                      className={cn(
                        "h-48 w-16 overflow-y-auto",
                        "border border-cms-gray-200",
                        "cms-no-scrollbar rounded-sm",
                      )}
                    >
                      {hours.map((hour) => (
                        <button
                          key={hour}
                          type="button"
                          data-value={hour}
                          onClick={() => setSelectedHour(hour)}
                          className={cn(
                            "cursor-pointer border-0",
                            "h-10 w-full text-sm transition-colors",
                            "hover:bg-cms-gray-150",
                            selectedHour === hour ?
                              "bg-cms-blue-100 font-medium text-cms-blue-700"
                            : "bg-cms-white text-cms-gray-700",
                          )}
                          aria-label={`${hour}${hourAriaLabelSuffix}`}
                          aria-selected={selectedHour === hour}
                        >
                          {format === "24h" ?
                            hour.toString().padStart(2, "0")
                          : hour}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Minute Column */}
                  <div className="flex flex-col">
                    <div
                      className={cn(
                        "mb-2",
                        "text-center text-xs font-medium text-cms-gray-500",
                      )}
                    >
                      {format === "24h" ? "분" : "Min"}
                    </div>
                    <div
                      ref={minuteScrollRef}
                      className={cn(
                        "h-48 w-16 overflow-y-auto",
                        "border border-cms-gray-200",
                        "cms-no-scrollbar rounded-sm",
                      )}
                    >
                      {minutes.map((minute) => (
                        <button
                          key={minute}
                          type="button"
                          data-value={minute}
                          onClick={() => setSelectedMinute(minute)}
                          className={cn(
                            "cursor-pointer border-0",
                            "h-10 w-full text-sm transition-colors",
                            "hover:bg-cms-gray-150",
                            selectedMinute === minute ?
                              "bg-cms-blue-100 font-medium text-cms-blue-700"
                            : "bg-cms-white text-cms-gray-700",
                          )}
                          aria-label={`${minute}${minuteAriaLabelSuffix}`}
                          aria-selected={selectedMinute === minute}
                        >
                          {minute.toString().padStart(2, "0")}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* AM/PM Column for 12h format */}
                  {format === "12h" && (
                    <div className="flex flex-col">
                      <div
                        className={cn(
                          "text-center text-xs text-cms-gray-500",
                          "mb-2",
                          "font-medium",
                        )}
                      >
                        Period
                      </div>
                      <div className="flex w-16 flex-col gap-1">
                        <button
                          type="button"
                          onClick={() => setSelectedPeriod("AM")}
                          className={cn(
                            "cursor-pointer border-0",
                            "h-10 rounded-sm text-sm transition-colors",
                            "hover:bg-cms-gray-150",
                            selectedPeriod === "AM" ?
                              "bg-cms-blue-100 font-medium text-cms-blue-700"
                            : "bg-cms-white text-cms-gray-700",
                          )}
                          aria-label="AM"
                          aria-selected={selectedPeriod === "AM"}
                        >
                          AM
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedPeriod("PM")}
                          className={cn(
                            "cursor-pointer border-0",
                            "h-10 rounded-sm text-sm transition-colors",
                            "hover:bg-cms-gray-150",
                            selectedPeriod === "PM" ?
                              "bg-cms-blue-100 font-medium text-cms-blue-700"
                            : "bg-cms-white text-cms-gray-700",
                          )}
                          aria-label="PM"
                          aria-selected={selectedPeriod === "PM"}
                        >
                          PM
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div
                className={cn(
                  "flex items-end justify-end px-4 pb-4",
                  "border-t border-cms-gray-200 pt-2",
                )}
              >
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className={cn(
                      "h-8 w-15 cursor-pointer rounded-sm",
                      "text-xs font-medium text-cms-gray-700",
                      "border border-cms-gray-300 bg-transparent",
                      "transition-all duration-150",
                      "active:scale-95",
                      "hover:bg-cms-gray-100",
                    )}
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    onClick={handleApply}
                    disabled={selectedHour === null || selectedMinute === null}
                    className={cn(
                      "cursor-pointer border-0",
                      "h-8 w-15 rounded-sm bg-cms-blue-700",
                      "text-xs text-cms-white",
                      "hover:bg-cms-blue-800",
                      "active:scale-95",
                      "disabled:bg-cms-gray-300",
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
            {error && errorMessage ?
              <p id={errorId} className="text-xs text-cms-red-500">
                {errorMessage}
              </p>
            : helperText && (
                <p id={helperId} className="text-xs text-cms-gray-500">
                  {helperText}
                </p>
              )
            }
          </div>
        )}
      </div>
    );
  },
);

TimePicker.displayName = "TimePicker";
