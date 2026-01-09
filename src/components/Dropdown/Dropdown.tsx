import { cn } from "@/utils/cn";
import { VariantProps } from "class-variance-authority";
import { useState, useRef, useEffect, forwardRef, KeyboardEvent } from "react";
import { ChevronDownFillIcon, XIcon as ClearIcon } from "../icons";
import { dropdownTriggerVariants } from "./variants";

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps extends VariantProps<
  typeof dropdownTriggerVariants
> {
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  dropdownClassName?: string;
  searchable?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  maxHeight?: number;
}

/**
 * 사용자가 목록에서 하나 또는 여러 개의 옵션을 선택할 수 있게 하는 컴포넌트입니다.
 *
 * {@link Dropdown}은 공간이 제한적인 UI에서 다양한 선택지를 효율적으로 제공합니다.
 * 검색 기능, 다중 선택(Multiple), 선택 해제(Clearable) 등 복잡한 선택 시나리오를 지원합니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **단일/다중 선택**: 5개 이상의 옵션 중 하나 또는 여러 개를 선택해야 할 때
 * - **공간 절약**: 라디오 버튼이나 체크박스 그룹을 표시하기엔 화면 공간이 부족할 때
 * - **동적 필터링**: 옵션이 너무 많아 검색을 통해 원하는 항목을 찾아야 할 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **옵션이 적은 경우(2-4개)**: 사용자가 모든 옵션을 한눈에 볼 수 있는 `RadioButton`이나 `Checkbox`가 더 좋습니다.
 * - **설정 토글**: 단순히 On/Off를 전환하는 것이라면 `Switch`를 사용하세요.
 * - **단순 내비게이션**: 클릭 시 다른 페이지로 이동만 하는 기능이라면 `Button`이나 `SideNavigation` 아이템이 더 적절합니다.
 *
 * ## Layout behavior
 *
 * - **Popover Menu**: 클릭 시 버튼 아래(또는 위)에 옵션 목록이 나타나며, 다른 요소들 위에 오버레이됩니다.
 * - **Flexible Width**: 부모 컨테이너의 너비에 맞춰지거나, `className`을 통해 고정 너비를 가질 수 있습니다.
 * - **Scrolling**: 옵션이 많아지면 `maxHeight` 설정에 따라 목록 내부에 스크롤이 발생합니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **논리적 정렬**: 옵션 목록은 가나다순, 사용 빈도순 등 사용자가 예측 가능한 순서로 정렬하세요.
 * - **검색 기능 활용**: 옵션이 10개 이상인 경우 `searchable` 속성을 활성화하여 편의성을 높이세요.
 * - **상태 표시**: `placeholder`를 통해 무엇을 선택해야 하는지 안내하고, 선택 후에는 선택된 항목을 명확히 표시하세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **너무 많은 텍스트**: 각 옵션의 레이블은 가급적 한 줄에 들어오도록 짧게 작성하세요.
 * - **중첩 드롭다운 지양**: 드롭다운 안에서 또 다른 드롭다운이 열리는 복잡한 계층 구조는 피하는 것이 좋습니다.
 *
 * ## Accessibility
 *
 * - **Keyboard Interaction**: `Enter`나 `Space`로 열고, 화살표 키로 이동하며, `Esc`로 닫을 수 있습니다.
 * - **Screen Reader**: `aria-expanded`, `aria-haspopup` 등의 속성을 통해 드롭다운의 상태와 역할을 스크린 리더에 전달합니다.
 * - **Focus Management**: 드롭다운이 열리면 검색창이나 첫 번째 옵션으로 포커스가 이동합니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 기본적인 단일 선택 드롭다운:
 *
 * ```tsx
 * <Dropdown
 *   options={[
 *     { value: 'ko', label: '한국어' },
 *     { value: 'en', label: '영어' },
 *     { value: 'ja', label: '일본어' },
 *   ]}
 *   placeholder="언어를 선택하세요"
 *   onValueChange={(val) => console.log(val)}
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 검색과 다중 선택이 가능한 드롭다운:
 *
 * ```tsx
 * <Dropdown
 *   options={largeOptionList}
 *   multiple={true}
 *   searchable={true}
 *   clearable={true}
 *   placeholder="태그 선택"
 * />
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link Select}, 기본적인 HTML select 스타일의 컴포넌트
 * - {@link Combobox}, 입력과 선택이 결합된 컴포넌트
 * - {@link Popover}, 더 자유로운 형태의 팝오버가 필요한 경우
 */
export const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
  (
    {
      options,
      value,
      placeholder = "선택하세요",
      onValueChange,
      disabled = false,
      className,
      dropdownClassName,
      variant,
      size,
      searchable = false,
      clearable = false,
      multiple = false,
      maxHeight = 200,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedValues, setSelectedValues] = useState<string[]>(
      multiple ? (value ? [value] : []) : []
    );
    const [showScrollIndicator, setShowScrollIndicator] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const optionsListRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((option) => option.value === value);
    const selectedLabel = multiple
      ? selectedValues.length > 0
        ? `${selectedValues.length}개 선택됨`
        : placeholder
      : selectedOption?.label || placeholder;

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        setSearchTerm("");
      }
    };

    const handleOptionClick = (option: DropdownOption) => {
      if (option.disabled) return;

      if (multiple) {
        const newSelectedValues = selectedValues.includes(option.value)
          ? selectedValues.filter((v) => v !== option.value)
          : [...selectedValues, option.value];

        setSelectedValues(newSelectedValues);
        onValueChange?.(newSelectedValues.join(","));
      } else {
        onValueChange?.(option.value);
        setIsOpen(false);
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (multiple) {
        setSelectedValues([]);
        onValueChange?.("");
      } else {
        onValueChange?.("");
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleToggle();
      }
    };

    // 외부 클릭 감지
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 드롭다운이 열릴 때 검색 입력창에 포커스
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

    // 스크롤 가능 여부 체크
    const checkScrollIndicator = () => {
      if (optionsListRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = optionsListRef.current;
        const hasMoreContent = scrollHeight > clientHeight;
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 1;
        setShowScrollIndicator(hasMoreContent && !isAtBottom);
      }
    };

    // 드롭다운이 열릴 때와 옵션이 변경될 때 스크롤 인디케이터 체크
    useEffect(() => {
      if (isOpen) {
        checkScrollIndicator();
      }
    }, [isOpen, filteredOptions]);

    // 스크롤 이벤트 리스너
    useEffect(() => {
      const optionsList = optionsListRef.current;
      if (optionsList && isOpen) {
        optionsList.addEventListener("scroll", checkScrollIndicator);
        return () => {
          optionsList.removeEventListener("scroll", checkScrollIndicator);
        };
      }
    }, [isOpen]);

    return (
      <div ref={dropdownRef} className="relative w-full">
        <button
          ref={ref}
          type="button"
          className={cn(
            dropdownTriggerVariants({ variant, size }),
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          {...props}
        >
          <span
            className={cn(
              "truncate flex-1 text-left",
              !selectedOption && !multiple && "text-cms-gray-400"
            )}
          >
            {selectedLabel}
          </span>

          <div className="flex items-center gap-2 ml-3">
            {clearable && (value || selectedValues.length > 0) && (
              <button
                type="button"
                className={cn(
                  "border-0 bg-transparent",
                  "p-1 rounded text-cms-gray-400 transition-colors",
                  "hover:text-cms-black"
                )}
                onClick={handleClear}
                aria-label="선택 취소"
              >
                <ClearIcon className="w-3 h-3" />
              </button>
            )}
            <ChevronDownFillIcon
              className={cn("w-3 h-3 transition-transform duration-200", isOpen && "rotate-180")}
            />
          </div>
        </button>

        {isOpen && (
          <div
            className={cn(
              "absolute z-50 mt-1 py-1 w-full min-w-0",
              "rounded-md border border-cms-gray-300",
              "bg-white shadow-lg",
              dropdownClassName
            )}
            style={{ maxHeight: `${maxHeight}px` }}
          >
            {searchable && (
              <div className="px-3 py-2 border-b border-cms-gray-200">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="검색..."
                  className={cn(
                    "w-full px-2 py-1 text-sm",
                    "rounded outline-none",
                    "border border-cms-gray-300",
                    "focus:ring-1 focus:ring-cms-gray-400"
                  )}
                />
              </div>
            )}

            <div className="relative">
              <div
                ref={optionsListRef}
                className="max-h-48 overflow-y-auto"
              >
                {filteredOptions.length === 0 ? (
                  <div className="px-3 py-2 text-sm text-cms-gray-400 text-center">
                    {searchTerm ? "검색 결과가 없습니다" : "옵션이 없습니다"}
                  </div>
                ) : (
                  filteredOptions.map((option) => {
                    const isSelected = multiple
                      ? selectedValues.includes(option.value)
                      : value === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        className={cn(
                          "border-0",
                          "flex items-center justify-between gap-2",
                          "w-full px-3 py-2 ",
                          "text-left text-sm",
                          "transition-colors",
                          option.disabled
                            ? "text-cms-gray-400 cursor-not-allowed bg-white"
                            : "text-cms-black bg-white hover:bg-cms-gray-100 cursor-pointer",
                          isSelected && "bg-cms-gray-150 font-medium"
                        )}
                        onClick={() => handleOptionClick(option)}
                        disabled={option.disabled}
                      >
                        <span className="truncate">{option.label}</span>
                        {isSelected && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="w-4 h-4 text-black shrink-0"
                          >
                            <path
                              d="M13.5 4.5L6 12L2.5 8.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              {showScrollIndicator && (
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none flex items-end justify-center pb-1">
                  <ChevronDownFillIcon className="w-4 h-4 text-cms-gray-400 animate-bounce" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";
