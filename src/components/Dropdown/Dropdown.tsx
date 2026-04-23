import { cn } from "@/utils/cn";
import type { VariantProps } from "class-variance-authority";
import type { KeyboardEvent, RefAttributes } from "react";
import { useState, useRef, useEffect, useCallback, forwardRef } from "react";
import { useScrollIndicator } from "@/hooks/useScrollIndicator";
import {
  ChevronDownFillIcon,
  ChevronRightFillIcon,
  XIcon as ClearIcon,
} from "../icons";
import { dropdownTriggerVariants } from "./variants";
import { Button } from "../Button";

export type DropdownOption = {
  value: string;
  label: string;
  disabled?: boolean;
  children?: DropdownOption[];
};

type DropdownPropsBase = {
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  /**
   * 선택 변경 콜백.
   * - 단일 모드: 선택된 값 한 개.
   * - 다중 모드(`multiple=true`): 콤마(`,`)로 구분된 문자열.
   *   새로운 소비 코드는 `onValuesChange`를 사용하세요.
   */
  onValueChange?: (value: string) => void;
  /**
   * 다중 모드 전용 콜백. 선택된 값을 배열로 받습니다.
   * `multiple=true`에서 `onValueChange`보다 우선 호출됩니다.
   * 단일 모드에서는 호출되지 않습니다.
   */
  onValuesChange?: (values: string[]) => void;
  disabled?: boolean;
  className?: string;
  dropdownClassName?: string;
  searchable?: boolean;
  clearable?: boolean;
  maxHeight?: number;
  defaultOpen?: boolean;
} & VariantProps<typeof dropdownTriggerVariants>;

type DropdownPropsSingle = DropdownPropsBase & {
  multiple?: false;
  selectAll?: false;
};

type DropdownPropsMultiple = DropdownPropsBase & {
  multiple: true;
  selectAll?: boolean;
};

// 공개 타입: `selectAll: true`는 `multiple: true`에서만 허용되도록 강제하는 구분 유니온.
export type DropdownProps = DropdownPropsSingle | DropdownPropsMultiple;

// 내부 구현에서 사용하는 느슨한 props 타입. forwardRef 시그니처가 유니온을 다루면
// Storybook Meta/Omit 유틸이 제대로 추론하지 못하므로 내부에서는 완화된 형태를 사용한다.
type DropdownPropsInternal = DropdownPropsBase & {
  multiple?: boolean;
  selectAll?: boolean;
};

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
 * {@tool snippet}
 * 전체 선택 버튼이 포함된 다중 선택 드롭다운. `selectAll`은 `multiple={true}`일 때만 허용되며,
 * 검색 중이라면 현재 필터링된 옵션들만 선택합니다:
 *
 * ```tsx
 * <Dropdown
 *   options={options}
 *   multiple={true}
 *   selectAll={true}
 *   searchable={true}
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
 *
 * ## 참고사진
 * ![](https://raw.githubusercontent.com/AlmSmartDoctor/ccds-screenshots/main/screenshots/Forms/Dropdown/For%20Jsdoc.png?raw=true)
 */
const DropdownInternal = forwardRef<HTMLButtonElement, DropdownPropsInternal>(
  (
    {
      options,
      value,
      placeholder = "선택하세요",
      onValueChange,
      onValuesChange,
      disabled = false,
      className,
      dropdownClassName,
      variant,
      size,
      searchable = false,
      clearable = false,
      multiple = false,
      selectAll = false,
      maxHeight = 200,
      defaultOpen = false,
      ...props
    },
    ref,
  ) => {
    // Defense in depth: the discriminated union prevents this at compile time,
    // but a dynamic `any` cast could still slip through.
    if (selectAll && !multiple) {
      throw new Error("Dropdown: selectAll={true} requires multiple={true}.");
    }

    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [searchTerm, setSearchTerm] = useState("");
    const [internalSelectedValues, setInternalSelectedValues] = useState<
      string[]
    >(
      multiple ?
        value ? value.split(",").filter(Boolean)
        : []
      : [],
    );
    const selectedValues =
      multiple && value !== undefined ?
        value.split(",").filter(Boolean)
      : internalSelectedValues;
    const [hoveredSubmenu, setHoveredSubmenu] = useState<{
      value: string;
      top: number;
    } | null>(null);
    const optionRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    const closeSubmenuTimeoutRef = useRef<number | null>(null);

    const {
      ref: setOptionsListNode,
      nodeRef: optionsListRef,
      showEnd: showScrollIndicator,
      refresh: refreshScrollIndicator,
    } = useScrollIndicator<HTMLDivElement>("y");

    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // 서브메뉴 포함하여 옵션 찾기
    const findOption = (
      opts: DropdownOption[],
      val: string,
    ): DropdownOption | undefined => {
      for (const opt of opts) {
        if (opt.value === val) return opt;
        if (opt.children) {
          const found = findOption(opt.children, val);
          if (found) return found;
        }
      }
      return undefined;
    };

    const selectedOption = findOption(options, value || "");
    const selectedLabel =
      multiple ?
        selectedValues.length > 0 ?
          `${selectedValues.length}개 선택됨`
        : placeholder
      : selectedOption?.label || placeholder;

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        setSearchTerm("");
      }
    };

    const clearSubmenuCloseTimeout = () => {
      if (closeSubmenuTimeoutRef.current !== null) {
        window.clearTimeout(closeSubmenuTimeoutRef.current);
        closeSubmenuTimeoutRef.current = null;
      }
    };

    const scheduleSubmenuClose = () => {
      clearSubmenuCloseTimeout();
      closeSubmenuTimeoutRef.current = window.setTimeout(() => {
        setHoveredSubmenu(null);
      }, 300);
    };

    const handleOptionMouseEnter = useCallback(
      (option: DropdownOption, hasSubmenu: boolean) => {
        clearSubmenuCloseTimeout();
        if (!hasSubmenu) {
          setHoveredSubmenu(null);
          return;
        }
        const el = optionRefs.current.get(option.value);
        if (el && optionsListRef.current) {
          const optionRect = el.getBoundingClientRect();
          const listRect = optionsListRef.current.getBoundingClientRect();
          setHoveredSubmenu({
            value: option.value,
            top:
              optionRect.top - listRect.top + optionsListRef.current.scrollTop,
          });
        }
      },
      [optionsListRef],
    );

    useEffect(() => {
      return () => {
        clearSubmenuCloseTimeout();
      };
    }, []);

    const emitMultipleChange = (nextValues: string[]) => {
      if (onValuesChange) {
        onValuesChange(nextValues);
      } else {
        onValueChange?.(nextValues.join(","));
      }
    };

    const handleOptionClick = (option: DropdownOption) => {
      if (option.disabled) return;

      if (multiple) {
        const newSelectedValues =
          selectedValues.includes(option.value) ?
            selectedValues.filter((v) => v !== option.value)
          : [...selectedValues, option.value];

        if (value === undefined) {
          setInternalSelectedValues(newSelectedValues);
        }
        emitMultipleChange(newSelectedValues);
      } else {
        onValueChange?.(option.value);
        setIsOpen(false);
      }
    };

    const handleSelectAll = () => {
      if (!multiple) return;
      const selectable = filteredOptions
        .filter((o) => !o.disabled)
        .map((o) => o.value);
      const merged = Array.from(new Set([...selectedValues, ...selectable]));
      if (value === undefined) {
        setInternalSelectedValues(merged);
      }
      onValueChange?.(merged.join(","));
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (multiple) {
        if (value === undefined) {
          setInternalSelectedValues([]);
        }
        emitMultipleChange([]);
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

    return (
      <div ref={dropdownRef} className="relative w-full">
        {selectAll && (
          <div className="mb-1 flex justify-start -space-x-4">
            <Button
              variant="underline"
              type="button"
              onClick={handleSelectAll}
              disabled={disabled}
            >
              모두 선택
            </Button>
            <Button
              variant="underline"
              type="button"
              onClick={handleClear}
              disabled={disabled}
            >
              해제
            </Button>
          </div>
        )}
        <button
          ref={ref}
          type="button"
          className={cn(
            dropdownTriggerVariants({ variant, size }),
            disabled && "cursor-not-allowed opacity-50",
            className,
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
              "flex-1 truncate text-left",
              !selectedOption && !multiple && "text-cms-gray-400",
            )}
          >
            {selectedLabel}
          </span>

          <div className="ml-3 flex items-center gap-2">
            {clearable && (value || selectedValues.length > 0) && (
              <button
                type="button"
                className={cn(
                  "border-0 bg-transparent",
                  "rounded-sm p-1 text-cms-gray-400 transition-colors",
                  "hover:text-cms-black",
                )}
                onClick={handleClear}
                aria-label="선택 취소"
              >
                <ClearIcon className="size-3" />
              </button>
            )}
            <ChevronDownFillIcon
              className={cn(
                "size-3 transition-transform duration-200",
                isOpen && "rotate-180",
              )}
            />
          </div>
        </button>

        {isOpen && (
          <div
            className={cn(
              "z-cms-overlay absolute mt-1 w-full min-w-0 py-1",
              "rounded-md border border-cms-gray-300",
              "bg-white shadow-lg",
              "cms-dropdown-show",
              dropdownClassName,
            )}
            style={{ maxHeight: `${maxHeight}px` }}
          >
            {searchable && (
              <div className="flex border-b border-cms-gray-200 px-3 py-2">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    requestAnimationFrame(() => refreshScrollIndicator());
                  }}
                  placeholder="검색..."
                  className={cn(
                    "w-full px-2 py-1 text-sm",
                    "rounded-sm outline-none",
                    "border border-cms-gray-300",
                    "focus:ring-1 focus:ring-cms-gray-400",
                  )}
                />
              </div>
            )}

            <div className="relative min-h-0 flex-1">
              <div
                className={cn(
                  "h-full overflow-hidden",
                  searchable ? "rounded-b-md" : "rounded-md",
                )}
              >
                <div
                  ref={setOptionsListNode}
                  className="max-h-48 overflow-y-auto"
                  onMouseEnter={clearSubmenuCloseTimeout}
                  onMouseLeave={scheduleSubmenuClose}
                >
                  {filteredOptions.length === 0 ?
                    <div
                      className={cn(
                        "px-3 py-2",
                        "text-sm text-cms-gray-400",
                        "text-center",
                      )}
                    >
                      {searchTerm ? "검색 결과가 없습니다" : "옵션이 없습니다"}
                    </div>
                  : filteredOptions.map((option) => {
                      const isSelected =
                        multiple ?
                          selectedValues.includes(option.value)
                        : value === option.value;
                      const hasSubmenu = Boolean(option.children?.length);
                      const isSubmenuOpen =
                        hoveredSubmenu?.value === option.value;

                      return (
                        <div
                          key={option.value}
                          ref={(el) => {
                            if (el) optionRefs.current.set(option.value, el);
                          }}
                          onMouseEnter={() =>
                            handleOptionMouseEnter(option, hasSubmenu)
                          }
                          onMouseLeave={() => {
                            if (hasSubmenu) {
                              scheduleSubmenuClose();
                            }
                          }}
                        >
                          <button
                            type="button"
                            className={cn(
                              "border-0",
                              "flex items-center justify-between gap-2",
                              "w-full px-3 py-2",
                              "text-left text-sm",
                              "transition-colors",
                              option.disabled ?
                                cn(
                                  "cursor-not-allowed bg-white",
                                  "text-cms-gray-400",
                                )
                              : cn(
                                  "bg-white text-cms-black",
                                  "hover:bg-cms-gray-100",
                                  "cursor-pointer",
                                ),
                              isSelected && "bg-cms-gray-150 font-medium",
                              isSubmenuOpen && "bg-cms-gray-100",
                            )}
                            onClick={() => {
                              if (!hasSubmenu) {
                                handleOptionClick(option);
                              }
                            }}
                            disabled={option.disabled}
                          >
                            <span className="truncate">{option.label}</span>
                            {hasSubmenu ?
                              <ChevronRightFillIcon
                                className="h-3 w-3 shrink-0 text-cms-gray-400"
                              />
                            : isSelected ?
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="h-4 w-4 shrink-0 text-black"
                              >
                                <path
                                  d="M13.5 4.5L6 12L2.5 8.5"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            : null}
                          </button>
                        </div>
                      );
                    })
                  }
                  {showScrollIndicator && (
                    <div
                      className={cn(
                        "sticky bottom-0 -mt-8 flex h-8 w-full items-end",
                        "justify-center pb-1",
                        "bg-linear-to-t from-white to-transparent",
                        "pointer-events-none",
                      )}
                    >
                      <ChevronDownFillIcon
                        className={cn(
                          "h-4 w-4",
                          "text-cms-gray-400",
                          "animate-bounce",
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Submenu - rendered outside overflow container */}
              {hoveredSubmenu &&
                (() => {
                  const parentOption = filteredOptions.find(
                    (o) => o.value === hoveredSubmenu.value,
                  );
                  if (!parentOption?.children) return null;

                  return (
                    <div
                      className={cn(
                        "z-cms-overlay absolute left-full ml-1 min-w-40 py-1",
                        "rounded-md border border-cms-gray-300",
                        "bg-white shadow-lg",
                        "cms-dropdown-show",
                      )}
                      style={{ top: hoveredSubmenu.top }}
                      onMouseEnter={() => {
                        clearSubmenuCloseTimeout();
                        setHoveredSubmenu(hoveredSubmenu);
                      }}
                      onMouseLeave={scheduleSubmenuClose}
                    >
                      {parentOption.children.map((subOption) => {
                        const isSubSelected =
                          multiple ?
                            selectedValues.includes(subOption.value)
                          : value === subOption.value;

                        return (
                          <button
                            key={subOption.value}
                            type="button"
                            className={cn(
                              "border-0",
                              "flex items-center justify-between gap-2",
                              "w-full px-3 py-2",
                              "text-left text-sm",
                              "transition-colors",
                              subOption.disabled ?
                                cn(
                                  "cursor-not-allowed bg-white",
                                  "text-cms-gray-400",
                                )
                              : cn(
                                  "bg-white text-cms-black",
                                  "hover:bg-cms-gray-100",
                                  "cursor-pointer",
                                ),
                              isSubSelected && "bg-cms-gray-150 font-medium",
                            )}
                            onClick={() => handleOptionClick(subOption)}
                            disabled={subOption.disabled}
                          >
                            <span className="truncate">{subOption.label}</span>
                            {isSubSelected && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="h-4 w-4 shrink-0 text-black"
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
                      })}
                    </div>
                  );
                })()}
            </div>
          </div>
        )}
      </div>
    );
  },
);

DropdownInternal.displayName = "Dropdown";

// 공개 컴포넌트 타입. 호출 시그니처를 오버로드로 선언하여
// `selectAll={true}`는 `multiple={true}`와만 호환되도록 TS가 강제한다.
// `ForwardRefExoticComponent`는 상속하지 않는다(상속하면 베이스 시그니처가 유니온을 무효화함).
type DropdownComponent = {
  // 합치면 union 검사 방식으로 인해 `selectAll={true}` + `multiple={false}` 조합이 허용되므로
  // 분리된 오버로드를 유지한다.

  (
    props: DropdownPropsSingle & RefAttributes<HTMLButtonElement>,
  ): ReturnType<typeof DropdownInternal>;
  /* eslint-disable @typescript-eslint/unified-signatures */
  (
    props: DropdownPropsMultiple & RefAttributes<HTMLButtonElement>,
  ): ReturnType<typeof DropdownInternal>;
  /* eslint-enable @typescript-eslint/unified-signatures */

  displayName?: string;
};

export const Dropdown = DropdownInternal as unknown as DropdownComponent;
