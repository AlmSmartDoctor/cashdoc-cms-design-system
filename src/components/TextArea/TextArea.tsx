import React, { useId, useState } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import {
  textAreaVariants,
  labelVariants,
  errorMessageVariants,
  helperTextVariants,
} from "./variants";

export type TextAreaProps = {
  label?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  showCharCount?: boolean;
  labelLayout?: "vertical" | "horizontal";
  labelWidth?: string;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> &
  VariantProps<typeof textAreaVariants>;

/**
 * 사용자로부터 여러 줄의 텍스트 데이터를 입력받는 필드입니다.
 *
 * {@link TextArea}는 긴 문장이나 메모, 설명 등 여러 줄에 걸친 텍스트 입력에 사용됩니다.
 * label, placeholder, 에러 메시지, helper 텍스트, 글자 수 카운터 등을 통합적으로 제공하여
 * {@link TextInput}과 일관된 폼 경험을 제공합니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **여러 줄 텍스트 입력**: 자기소개, 메모, 설명, 요청사항 등 줄바꿈이 필요한 입력
 * - **글자 수 제한**: 최대 글자 수를 지정하고 실시간으로 카운터를 표시
 * - **유효성 검증**: 에러 상태와 메시지를 통해 사용자에게 피드백 제공
 * - **필수 입력**: `required` 속성을 사용하여 반드시 입력해야 함을 시각적으로 안내
 *
 * **사용하지 않아야 하는 경우:**
 * - 한 줄 입력만 필요한 경우 → {@link TextInput} 사용
 *
 * ## Layout behavior
 *
 * TextArea는 기본적으로 부모 요소의 전체 너비(`fullWidth={true}`)를 차지합니다.
 * 기본 높이는 native `rows` 속성(기본값 4줄)으로 제어되며, 사용자가 세로 방향으로
 * 자유롭게 크기를 조절할 수 있습니다. `resize` prop으로 리사이즈 동작을 제어할 수 있습니다.
 *
 * 레이블 배치는 `labelLayout` prop으로 제어됩니다:
 * - **vertical** (기본값): Label이 입력 필드 위에 세로로 배치됩니다.
 * - **horizontal**: Label과 입력 필드가 가로로 나란히 배치됩니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 글자 수 제한이 있는 자기소개 입력:
 *
 * ```tsx
 * <TextArea
 *   label="자기소개"
 *   placeholder="자기소개를 입력하세요"
 *   maxLength={300}
 *   showCharCount
 *   rows={5}
 * />
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link TextInput}, 한 줄 텍스트 입력을 위한 컴포넌트
 * - {@link TagInput}, 여러 태그를 입력받는 컴포넌트
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      variant,
      fullWidth,
      resize,
      label,
      required,
      error,
      errorMessage,
      helperText,
      showCharCount,
      maxLength,
      value,
      defaultValue,
      onChange,
      id,
      rows = 4,
      labelLayout = "vertical",
      labelWidth = "120px",
      ...props
    },
    ref,
  ) => {
    const reactId = useId();
    const isControlled = value !== undefined;
    const toDisplayString = (inputValue: typeof value): string =>
      inputValue == null ? "" : String(inputValue);
    const [internalValue, setInternalValue] = useState<string>(
      toDisplayString(defaultValue),
    );
    const inputId = id || reactId;
    const errorMessageId = `${inputId}-error`;
    const helperTextId = `${inputId}-helper`;
    const finalVariant = error ? "error" : variant;

    const currentValue = isControlled ? toDisplayString(value) : internalValue;
    const charCount = currentValue.length;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const valueProps = isControlled ? { value } : { defaultValue };

    const hasHeader = label || (showCharCount && maxLength);
    const isHorizontal = labelLayout === "horizontal";
    const describedBy =
      error && errorMessage ? errorMessageId
      : helperText ? helperTextId
      : undefined;

    return (
      <div className={cn("w-full", !fullWidth && "w-auto")}>
        {isHorizontal && hasHeader ?
          <div className="flex items-start gap-3">
            {label && (
              <label
                htmlFor={inputId}
                className={cn(labelVariants(), "mt-2 mb-0 shrink-0")}
                style={{ width: labelWidth }}
              >
                {label}
                {required && <span className="ml-1 text-cms-red-400">*</span>}
              </label>
            )}
            <div className="flex-1">
              <textarea
                id={inputId}
                ref={ref}
                rows={rows}
                className={cn(
                  textAreaVariants({
                    variant: finalVariant,
                    fullWidth: true,
                    resize,
                  }),
                  className,
                )}
                maxLength={maxLength}
                {...valueProps}
                onChange={handleChange}
                required={required}
                aria-invalid={error || undefined}
                aria-describedby={describedBy}
                {...props}
              />
              {showCharCount && maxLength && (
                <div className="mt-1 text-right text-sm text-cms-gray-600">
                  {charCount} / {maxLength}
                </div>
              )}
            </div>
          </div>
        : <>
            {hasHeader && (
              <div className="mb-2 flex items-center justify-between">
                {label ?
                  <label htmlFor={inputId} className={labelVariants()}>
                    {label}
                    {required && (
                      <span className="ml-1 text-cms-red-400">*</span>
                    )}
                  </label>
                : <div />}
                {showCharCount && maxLength && (
                  <span className="text-sm text-cms-gray-600">
                    {charCount} / {maxLength}
                  </span>
                )}
              </div>
            )}
            <textarea
              id={inputId}
              ref={ref}
              rows={rows}
              className={cn(
                textAreaVariants({
                  variant: finalVariant,
                  fullWidth,
                  resize,
                }),
                className,
              )}
              maxLength={maxLength}
              {...valueProps}
              onChange={handleChange}
              required={required}
              aria-invalid={error || undefined}
              aria-describedby={describedBy}
              {...props}
            />
          </>
        }
        {error && errorMessage && (
          <span id={errorMessageId} className={errorMessageVariants()}>
            {errorMessage}
          </span>
        )}
        {!error && helperText && (
          <span id={helperTextId} className={helperTextVariants()}>
            {helperText}
          </span>
        )}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";
