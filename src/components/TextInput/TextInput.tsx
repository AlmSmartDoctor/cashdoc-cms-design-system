import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const textInputVariants = cva(
  cn(
    "w-full box-border",
    "px-3 py-2",
    "rounded-cms-sm",
    "border border-solid",
    "font-normal leading-tight",
    "transition-colors duration-200",
    "outline-none",
    "text-md text-cms-black",
    "placeholder:text-cms-gray-500",
    "placeholder:text-md",
  ),
  {
    variants: {
      variant: {
        default: cn(
          "bg-cms-white ",
          "border-cms-gray-450",
          "focus:border-cms-gray-800",
          "disabled:bg-cms-gray-150",
          "disabled:text-cms-gray-400",
          "disabled:cursor-not-allowed",
        ),
        error: cn(
          "bg-cms-white",
          "border-cms-red-400",
          "focus:border-cms-red-500",
        ),
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      fullWidth: true,
    },
  },
);

const labelVariants = cva("block text-md font-medium text-cms-black");

const errorMessageVariants = cva(
  "block text-sm font-medium text-cms-red-400 mt-1",
);

const helperTextVariants = cva(
  "block text-sm font-normal text-cms-gray-700 mt-1",
);

export interface TextInputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof textInputVariants> {
  label?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  showCharCount?: boolean;
  labelLayout?: "vertical" | "horizontal";
  labelWidth?: string;
}

/**
 * 사용자로부터 텍스트, 이메일, 숫자 등의 단일 라인 데이터를 입력받는 필드입니다.
 *
 * {@link TextInput}은 가장 기본적인 폼 입력 요소로, label, placeholder, 에러 메시지,
 * helper 텍스트, 글자 수 카운터 등을 통합적으로 제공합니다. 일관된 스타일과 동작으로
 * 사용자 경험을 향상시킵니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **단일 라인 텍스트 입력**: 이름, 이메일, 전화번호 등 한 줄로 입력 가능한 정보
 * - **특정 타입 입력**: email, password, number, date 등 HTML input type을 활용
 * - **글자 수 제한**: 최대 글자 수를 지정하고 실시간으로 카운터를 표시
 * - **유효성 검증**: 에러 상태와 메시지를 통해 사용자에게 피드백 제공
 * - **필수 입력**: `required` 속성을 사용하여 반드시 입력해야 함을 시각적으로 안내
 *
 * ## Layout behavior
 *
 * TextInput은 기본적으로 부모 요소의 전체 너비(`fullWidth={true}`)를 차지합니다.
 * `fullWidth={false}`로 설정하면 내용에 맞춰 자동으로 조절됩니다.
 *
 * 레이블 배치는 `labelLayout` prop으로 제어됩니다:
 * - **vertical** (기본값): Label이 입력 필드 위에 세로로 배치됩니다.
 * - **horizontal**: Label과 입력 필드가 가로로 나란히 배치됩니다. `labelWidth`로 Label 너비를 조정할 수 있습니다 (기본값: 120px).
 *
 * 구조는 다음 순서로 배치됩니다:
 * 1. **헤더 영역** (있는 경우): label (좌측, 필수 시 * 표시) + 글자 수 카운터 (우측)
 * 2. **입력 필드**: 텍스트 입력 영역
 * 3. **메시지 영역** (있는 경우): errorMessage 또는 helperText
 *
 * 높이는 `h-10` (2.5rem / 40px)로 고정되어 일관된 버튼 높이와 정렬됩니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **명확한 label 제공**: 무엇을 입력해야 하는지 명확하게 표시하세요
 * - **필수 여부 명시**: 반드시 입력해야 하는 필드라면 `required` 속성을 활성화하세요.
 * - **가로 배치 활용**: 폼에서 여러 입력 필드를 정렬할 때는 `labelLayout="horizontal"`을 사용하여 일관된 레이아웃을 유지하세요.
 *
 * ## Example
 *
 * {@tool snippet}
 * 레이블과 필수 표시가 포함된 입력 필드:
 *
 * ```tsx
 * <TextInput
 *   label="사용자 아이디"
 *   required={true}
 *   placeholder="아이디를 입력하세요"
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 가로 배치 레이아웃:
 *
 * ```tsx
 * <TextInput
 *   label="상호(법인명)"
 *   required={true}
 *   labelLayout="horizontal"
 *   labelWidth="150px"
 *   placeholder="회사명을 입력하세요"
 * />
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link Textarea}, 여러 줄 텍스트 입력을 위한 컴포넌트
 * - {@link TagInput}, 여러 태그를 입력받는 컴포넌트
 * - {@link DatePicker}, 날짜 선택을 위한 컴포넌트
 * - {@link Dropdown}, 옵션 선택을 위한 컴포넌트
 *
 * ## 참고사진
 * ![](https://github.com/AlmSmartDoctor/ccds-screenshots/blob/main/screenshots/Forms/TextInput/For%20Jsdoc.png?raw=true)
 */
export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      variant,
      fullWidth,
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
      labelLayout = "vertical",
      labelWidth = "120px",
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState<string>(
      (value || defaultValue || "") as string,
    );
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const finalVariant = error ? "error" : variant;

    const currentValue =
      value !== undefined ? (value as string) : internalValue;
    const charCount = currentValue?.length || 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const hasHeader = label || (showCharCount && maxLength);
    const isHorizontal = labelLayout === "horizontal";

    return (
      <div className={cn("w-full", !fullWidth && "w-auto")}>
        {isHorizontal && hasHeader ? (
          <div className="flex items-center gap-3">
            {label && (
              <label
                htmlFor={inputId}
                className={cn(labelVariants(), "mb-0 shrink-0")}
                style={{ width: labelWidth }}
              >
                {label}
                {required && <span className="ml-1 text-cms-red-400">*</span>}
              </label>
            )}
            <div className="flex-1">
              <input
                id={inputId}
                ref={ref}
                className={cn(
                  textInputVariants({ variant: finalVariant, fullWidth: true }),
                  className,
                )}
                maxLength={maxLength}
                value={value}
                defaultValue={defaultValue}
                onChange={handleChange}
                required={required}
                {...props}
              />
            </div>
            {showCharCount && maxLength && (
              <span className="shrink-0 text-sm text-cms-gray-600">
                {charCount} / {maxLength}
              </span>
            )}
          </div>
        ) : (
          <>
            {hasHeader && (
              <div className="mb-2 flex items-center justify-between">
                {label ? (
                  <label htmlFor={inputId} className={labelVariants()}>
                    {label}
                    {required && (
                      <span className="ml-1 text-cms-red-400">*</span>
                    )}
                  </label>
                ) : (
                  <div />
                )}
                {showCharCount && maxLength && (
                  <span className="text-sm text-cms-gray-600">
                    {charCount} / {maxLength}
                  </span>
                )}
              </div>
            )}
            <input
              id={inputId}
              ref={ref}
              className={cn(
                textInputVariants({ variant: finalVariant, fullWidth }),
                className,
              )}
              maxLength={maxLength}
              value={value}
              defaultValue={defaultValue}
              onChange={handleChange}
              required={required}
              {...props}
            />
          </>
        )}
        {error && errorMessage && (
          <span className={errorMessageVariants()}>{errorMessage}</span>
        )}
        {!error && helperText && (
          <span className={helperTextVariants()}>{helperText}</span>
        )}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";
