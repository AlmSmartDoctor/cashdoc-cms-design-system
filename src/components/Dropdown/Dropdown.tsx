"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/utils/cn";
import { usePortalContainer } from "@/utils/portalContainer";
import type { VariantProps } from "class-variance-authority";
import type { RefAttributes, ReactNode } from "react";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  forwardRef,
} from "react";
import { useScrollIndicator } from "@/hooks/useScrollIndicator";
import {
  ChevronDownIcon,
  ChevronRightFillIcon,
  XIcon as ClearIcon,
} from "../icons";
import { dropdownTriggerVariants } from "./variants";
import { Button } from "../Button";
import { TextInput } from "../TextInput";

export type DropdownOption = {
  value: string;
  label: string;
  disabled?: boolean;
  /** 트리거에 표시할 짧은 이름. 생략 시 `label` 사용. */
  displayLabel?: string;
  children?: DropdownOption[];
};

/** 선택 불가능한 그룹 헤더. hover 시 서브메뉴로 하위 옵션을 펼칩니다. */
export type DropdownGroupOption = {
  label: string;
  group: DropdownOption[];
  disabled?: boolean;
};

/**
 * `options` prop에 전달할 수 있는 아이템 타입.
 * 일반 옵션과 그룹 옵션을 혼합하여 사용할 수 있습니다.
 */
export type DropdownItem = DropdownOption | DropdownGroupOption;

function isGroupOption(item: DropdownItem): item is DropdownGroupOption {
  return "group" in item;
}

/**
 * 소비자가 전달한 `DropdownItem[]`을 내부 `DropdownOption[]`로
 * 정규화합니다. `DropdownGroupOption`의 `group`은 기존
 * `children` 기반 구조로 변환됩니다.
 * 그룹의 합성 value는 label 기반으로 생성하여 렌더링 간 안정적입니다.
 */
function normalizeOptions(items: DropdownItem[]): DropdownOption[] {
  return items.map((item, index) => {
    if (isGroupOption(item)) {
      return {
        value: `__group_${index}_${item.label}`,
        label: item.label,
        disabled: item.disabled,
        children: item.group,
      };
    }
    return item;
  });
}

type DropdownPropsBase = {
  options: DropdownItem[];
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
  /**
   * 각 옵션 항목의 렌더링을 커스터마이징하는 함수.
   * 제공하지 않으면 `option.label`을 기본으로 표시합니다.
   * 옵션에 부가 정보(예: 설명, 주소)를 함께 표시해야 할 때 사용하세요.
   */
  renderOption?: (option: DropdownOption) => ReactNode;
  /**
   * 검색어가 변경될 때 호출되는 콜백.
   * API 호출 등 외부에서 옵션을 동적으로 갱신해야 할 때 사용하세요.
   * `searchable={true}`일 때만 동작합니다.
   */
  onSearchChange?: (value: string) => void;
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
 * - **Modal 호환**: 상위 `Modal` 내부에서 사용될 때는 모달 콘텐츠에 자동 portal되어 검색 입력 포커스,
 *   휠 스크롤, layer 스택이 정상 동작합니다.
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
 * - **Keyboard Interaction**: `Enter`나 `Space`로 열고, `Esc`로 닫을 수 있습니다. 옵션 간 화살표 키 탐색은 현재 제공하지 않으며 Tab으로 이동합니다.
 * - **Screen Reader**: 트리거는 `aria-expanded`/`aria-haspopup="listbox"`, 목록은 `role="listbox"`, 각 옵션은 `role="option"`과 `aria-selected`를 제공합니다.
 * - **Focus Management**: `searchable={true}`이면 드롭다운이 열릴 때 검색창으로 포커스를 이동합니다.
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
      renderOption,
      onSearchChange,
      ...props
    },
    ref,
  ) => {
    // Defense in depth: the discriminated union prevents this at compile time,
    // but a dynamic `any` cast could still slip through.
    if (selectAll && !multiple) {
      throw new Error("Dropdown: selectAll={true} requires multiple={true}.");
    }

    // DropdownGroupOption → DropdownOption (children 기반) 정규화
    const normalizedOptions = useMemo(
      () => normalizeOptions(options),
      [options],
    );

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

    const searchInputRef = useRef<HTMLInputElement>(null);
    const portalContainer = usePortalContainer();

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

    const selectedOption = findOption(normalizedOptions, value || "");
    const selectedLabel =
      multiple ?
        selectedValues.length > 0 ?
          `${selectedValues.length}개 선택됨`
        : placeholder
      : selectedOption?.displayLabel || selectedOption?.label || placeholder;

    const filteredOptions = normalizedOptions.filter((option) => {
      const term = searchTerm.toLowerCase();
      if (option.label.toLowerCase().includes(term)) return true;
      if (option.children) {
        return option.children.some((child) =>
          child.label.toLowerCase().includes(term),
        );
      }
      return false;
    });

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

    // Radix가 open 상태 전이를 소유한다. 닫힘 시 검색어/서브메뉴 hover 상태를
    // 초기화해 다음 오픈에 이전 상태가 새어나가지 않게 한다.
    const handleOpenChange = useCallback(
      (open: boolean) => {
        if (disabled) return;
        setIsOpen(open);
        if (!open) {
          setHoveredSubmenu(null);
          clearSubmenuCloseTimeout();
          if (searchTerm) {
            setSearchTerm("");
            onSearchChange?.("");
          }
        }
      },
      [disabled, searchTerm, onSearchChange],
    );

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
          // 서브메뉴는 스크롤 컨테이너 바깥(.relative 부모, 스크롤 안 됨) 기준
          // absolute이므로 scrollTop을 더하면 그만큼 아래로 밀린다.
          setHoveredSubmenu({
            value: option.value,
            top: optionRect.top - listRect.top,
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

    return (
      <PopoverPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
        <div className="relative w-full">
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
          <div className="relative">
            <PopoverPrimitive.Trigger asChild>
              <button
                ref={ref}
                type="button"
                className={cn(
                  dropdownTriggerVariants({ variant, size }),
                  "pr-8",
                  className,
                )}
                disabled={disabled}
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
              </button>
            </PopoverPrimitive.Trigger>

            <div
              className={cn(
                "absolute top-1/2 right-3 -translate-y-1/2",
                "flex items-center gap-2",
                "pointer-events-none",
                disabled && "text-cms-gray-400",
              )}
            >
              {clearable && (value || selectedValues.length > 0) && (
                <button
                  type="button"
                  data-cms-dropdown-clear=""
                  className={cn(
                    "pointer-events-auto border-0 bg-transparent",
                    "rounded-cms-md p-1 text-cms-gray-400 transition-colors",
                    "hover:text-cms-black",
                  )}
                  onClick={handleClear}
                  aria-label="선택 취소"
                >
                  <ClearIcon className="size-3" />
                </button>
              )}
              <ChevronDownIcon
                size={14}
                strokeWidth={2}
                className={cn(
                  "transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
              />
            </div>

            <PopoverPrimitive.Portal container={portalContainer}>
              <PopoverPrimitive.Content
                role="listbox"
                aria-multiselectable={multiple || undefined}
                align="start"
                sideOffset={4}
                collisionPadding={8}
                onOpenAutoFocus={(event) => {
                  if (searchable) {
                    // Radix 기본 focus(content root) 대신 검색창으로 포커스 이동
                    event.preventDefault();
                    searchInputRef.current?.focus();
                  }
                }}
                onPointerDownOutside={(event) => {
                  // 트리거 옆 clear 아이콘 버튼은 popover 바깥이지만 여기서 닫히면
                  // 사용자가 "값 지우기"와 "닫기" 두 액션을 한 번에 하게 되어 UX가 튄다.
                  const target = event.target as HTMLElement | null;
                  if (target?.closest("[data-cms-dropdown-clear]")) {
                    event.preventDefault();
                  }
                }}
                style={{
                  width: "var(--radix-popover-trigger-width)",
                }}
                className={cn(
                  "z-cms-overlay min-w-0 py-1",
                  "rounded-cms-xl border border-cms-gray-300",
                  "bg-cms-white shadow-lg",
                  "data-[state=open]:animate-in",
                  "data-[state=closed]:animate-out",
                  "data-[state=closed]:fade-out-0",
                  "data-[state=open]:fade-in-0",
                  "data-[state=closed]:zoom-out-95",
                  "data-[state=open]:zoom-in-95",
                  "data-[side=bottom]:slide-in-from-top-2",
                  "data-[side=top]:slide-in-from-bottom-2",
                  dropdownClassName,
                )}
              >
                {searchable && (
                  <div className="border-b border-cms-gray-200 p-2">
                    <TextInput
                      ref={searchInputRef}
                      type="text"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        onSearchChange?.(e.target.value);
                        requestAnimationFrame(() => refreshScrollIndicator());
                      }}
                      placeholder="검색..."
                    />
                  </div>
                )}

                <div className="relative min-h-0 flex-1">
                  <div
                    className={cn(
                      "h-full overflow-hidden",
                      searchable ? "rounded-b-cms-xl" : "rounded-cms-xl",
                    )}
                  >
                    <div
                      ref={setOptionsListNode}
                      className="overflow-y-auto overscroll-contain"
                      style={{ maxHeight: `${maxHeight}px` }}
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
                          {searchTerm ?
                            "검색 결과가 없습니다"
                          : "옵션이 없습니다"}
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
                                if (el) {
                                  optionRefs.current.set(option.value, el);
                                } else {
                                  optionRefs.current.delete(option.value);
                                }
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
                                role="option"
                                aria-selected={isSelected}
                                aria-haspopup={hasSubmenu ? "menu" : undefined}
                                className={cn(
                                  "border-0",
                                  "flex items-center justify-between gap-2",
                                  "w-full px-3 py-2",
                                  "text-left text-sm",
                                  "transition-colors",
                                  option.disabled ?
                                    cn(
                                      "cursor-not-allowed bg-cms-white",
                                      "text-cms-gray-400",
                                    )
                                  : cn(
                                      "bg-cms-white text-cms-black",
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
                                {renderOption ?
                                  renderOption(option)
                                : <span className="truncate">
                                    {option.label}
                                  </span>
                                }
                                {hasSubmenu ?
                                  <ChevronRightFillIcon
                                    className={cn(
                                      "size-3 shrink-0",
                                      "text-cms-gray-400",
                                    )}
                                  />
                                : isSelected ?
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    className="h-4 w-4 shrink-0 text-cms-black"
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
                            "bg-linear-to-t from-cms-white to-transparent",
                            "pointer-events-none",
                          )}
                        >
                          <ChevronDownIcon
                            size={16}
                            strokeWidth={2}
                            className={cn(
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
                          role="menu"
                          className={cn(
                            `absolute left-full z-cms-overlay ml-1 min-w-40 py-1`,
                            "rounded-cms-xl border border-cms-gray-300",
                            "bg-cms-white shadow-lg",
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
                                role="menuitem"
                                aria-selected={isSubSelected}
                                className={cn(
                                  "border-0",
                                  "flex items-center justify-between gap-2",
                                  "w-full px-3 py-2",
                                  "text-left text-sm",
                                  "transition-colors",
                                  subOption.disabled ?
                                    cn(
                                      "cursor-not-allowed bg-cms-white",
                                      "text-cms-gray-400",
                                    )
                                  : cn(
                                      "bg-cms-white text-cms-black",
                                      "hover:bg-cms-gray-100",
                                      "cursor-pointer",
                                    ),
                                  isSubSelected &&
                                    "bg-cms-gray-150 font-medium",
                                )}
                                onClick={() => handleOptionClick(subOption)}
                                disabled={subOption.disabled}
                              >
                                <span className="truncate">
                                  {subOption.label}
                                </span>
                                {isSubSelected && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    className="h-4 w-4 shrink-0 text-cms-black"
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
              </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
          </div>
        </div>
      </PopoverPrimitive.Root>
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

  (
    props: DropdownPropsMultiple & RefAttributes<HTMLButtonElement>,
  ): ReturnType<typeof DropdownInternal>;

  displayName?: string;
};

export const Dropdown = DropdownInternal as unknown as DropdownComponent;
