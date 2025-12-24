import { cn } from "@/utils/cn";
import { forwardRef } from "react";
import { Dropdown, DropdownProps } from "./Dropdown";

export interface SelectProps extends Omit<
  DropdownProps,
  "multiple" | "searchable" | "clearable"
> {
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
}

/**
 * 사용자에게 레이블, 도움말, 에러 메시지와 함께 단일 선택 드롭다운을 제공하는 컴포넌트입니다.
 *
 * {@link Select}는 {@link Dropdown}을 기반으로 하며, 폼(Form) 구성에 필요한
 * 추가적인 UI 요소(레이블, 필수 표시, 유효성 검사 메시지 등)를 포함하고 있습니다.
 * 주로 입력 폼 내에서 하나의 값을 선택받아야 할 때 사용됩니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **표준 폼 입력**: 이름, 이메일 등과 함께 성별, 지역, 카테고리 등을 선택받을 때
 * - **유효성 검사가 필요한 경우**: 선택하지 않았을 때 에러 메시지를 표시해야 하는 상황
 * - **상세 설명 필요**: 입력 항목에 대한 추가적인 도움말(helperText)이 필요한 경우
 *
 * **사용하지 말아야 하는 경우:**
 * - **단순 필터/정렬**: 레이블 없이 목록 위에 놓이는 필터 등은 `Dropdown`을 직접 사용하세요.
 * - **다중 선택/검색**: 다중 선택이나 검색 기능이 필요하다면 `Dropdown` 또는 `Combobox`를 사용하세요.
 *
 * ## Layout behavior
 *
 * - **Vertical Stack**: 레이블 - 드롭다운 버튼 - 도움말/에러 메시지가 수직으로 배치됩니다.
 * - **Consistency**: 다른 입력 컴포넌트(TextInput 등)와 동일한 간격과 스타일을 유지하여 일관된 폼 레이아웃을 구성합니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **명확한 레이블**: 사용자가 무엇을 선택해야 하는지 알 수 있도록 구체적인 레이블을 제공하세요.
 * - **필수 여부 표시**: `required` 속성을 사용하여 필수 입력 항목임을 시각적으로 나타내세요.
 * - **에러 메시지 활용**: 유효성 검사 실패 시 `error` prop을 통해 구체적인 오류 원인을 안내하세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **레이블 생략 지양**: 폼 내에서는 접근성과 사용자 경험을 위해 가급적 레이블을 생략하지 마세요.
 * - **과도한 도움말**: 도움말이 너무 길어지면 폼 전체의 가독성이 떨어집니다. 가급적 한 줄 이내로 작성하세요.
 *
 * ## Accessibility
 *
 * - **Label Association**: 레이블은 드롭다운 버튼과 논리적으로 연결되어 스크린 리더에서 함께 읽어줍니다.
 * - **Error States**: 에러 상태가 되면 `aria-invalid` 등의 속성을 통해 시각 장애 사용자에게도 오류 상태를 전달합니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 레이블과 필수 표시가 포함된 선택 창:
 *
 * ```tsx
 * <Select
 *   label="사용자 등급"
 *   required={true}
 *   options={[
 *     { value: 'admin', label: '관리자' },
 *     { value: 'editor', label: '편집자' },
 *     { value: 'viewer', label: '뷰어' },
 *   ]}
 *   placeholder="등급을 선택해 주세요"
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 에러 메시지가 표시된 상태:
 *
 * ```tsx
 * <Select
 *   label="국가 선택"
 *   options={countryOptions}
 *   error="국가를 선택하는 것은 필수입니다"
 * />
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link Dropdown}, 레이블 없이 단순한 선택 기능만 필요한 경우
 * - {@link TextInput}, 텍스트 직접 입력이 필요한 경우
 * - {@link RadioButton}, 옵션이 적고 한눈에 보여야 하는 경우
 */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ label, helperText, error, required, className, ...props }, ref) => {
    return (
      <div className={cn("space-y-1", className)}>
        {label && (
          <label className="block text-sm font-medium text-cms-black">
            {label}
            {required && <span className="text-cms-red-500 ml-1">*</span>}
          </label>
        )}

        <Dropdown
          ref={ref}
          {...props}
          className={cn(error && "border-cms-red-500 focus:ring-cms-red-500")}
        />

        {(helperText || error) && (
          <p
            className={cn(
              "text-xs",
              error ? "text-cms-red-500" : "text-cms-gray-400",
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
