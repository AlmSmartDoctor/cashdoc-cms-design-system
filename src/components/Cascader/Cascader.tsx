"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { usePortalContainer } from "@/utils/portalContainer";
import { ChevronDownIcon, ChevronRightFillIcon } from "../icons";
import { dropdownTriggerVariants } from "../Dropdown/variants";

/**
 * 계층형(캐스케이딩) 선택지의 한 노드. `children`이 있으면 하위 컬럼을
 * 펼치고, 없으면 leaf(말단 선택지)입니다.
 */
export type CascaderOption = {
  value: string;
  label: string;
  children?: CascaderOption[];
  disabled?: boolean;
};

export type CascaderProps = {
  /** 계층형 선택지 트리. 상위 노드의 `children`이 다음 컬럼이 됩니다. */
  options: CascaderOption[];
  /** 선택된 경로(값 배열). controlled. 예: `["seoul", "gangnam"]`. */
  value?: string[];
  /** 초기 선택 경로. uncontrolled. */
  defaultValue?: string[];
  /**
   * 선택 확정 시 호출. 선택된 값 경로와 그 경로의 옵션 객체 배열을
   * 함께 넘겨 라벨 등을 활용할 수 있습니다.
   */
  onChange?: (value: string[], selectedOptions: CascaderOption[]) => void;
  placeholder?: string;
  disabled?: boolean;
  /**
   * 중간(부모) 노드도 선택 확정할지 여부. 기본 `false`(leaf만 확정).
   * `true`면 부모 노드 클릭 시에도 그 경로가 확정되며 하위 컬럼도 펼칩니다.
   */
  changeOnSelect?: boolean;
  /** 다음 컬럼을 펼치는 트리거. 기본 `hover`. */
  expandTrigger?: "click" | "hover";
  /** 트리거에 표시할 선택 경로 렌더. 기본은 라벨을 `" / "`로 연결. */
  displayRender?: (labels: string[]) => ReactNode;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  /** 팝오버 portal container 직접 지정(보통 불필요, Modal 자동 처리). */
  container?: HTMLElement | null;
} & VariantProps<typeof dropdownTriggerVariants>;

/** 값 경로를 따라 해당하는 옵션 객체들을 순서대로 반환. */
function getOptionsByPath(
  options: CascaderOption[],
  path: string[],
): CascaderOption[] {
  const result: CascaderOption[] = [];
  let level = options;
  for (const val of path) {
    const found = level.find((o) => o.value === val);
    if (!found) break;
    result.push(found);
    level = found.children ?? [];
  }
  return result;
}

/** 펼쳐진 경로(activePath)로부터 화면에 그릴 컬럼 배열을 파생. */
function getColumns(
  options: CascaderOption[],
  activePath: string[],
): CascaderOption[][] {
  const columns: CascaderOption[][] = [options];
  let level = options;
  for (const val of activePath) {
    const found = level.find((o) => o.value === val);
    if (!found?.children?.length) break;
    columns.push(found.children);
    level = found.children;
  }
  return columns;
}

/**
 * 상위 선택에 따라 하위 선택지가 바뀌는 계층형(캐스케이딩) 선택 컴포넌트.
 *
 * {@link Cascader}는 지역(시/도 → 구/군 → 동)이나 카테고리(대 → 중 → 소)처럼
 * 깊이가 있는 종속 선택을 하나의 트리거와 멀티컬럼 패널로 처리합니다.
 * Radix Popover 기반이라 포커스 트랩, 외부 클릭 dismiss, 위치 계산이
 * 자동 처리되고, Modal 내부에서도 정상 동작합니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **종속 선택**: 상위 선택값이 하위 선택지를 결정하는 2단계 이상 계층
 * - **경로 선택**: 최종 값뿐 아니라 "어느 경로로 도달했는지"가 의미 있을 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **단일 계층 선택**: 종속 관계가 없으면 {@link Select}/{@link Dropdown}
 * - **자유 입력**: 값을 직접 입력해야 하면 {@link TextInput}
 *
 * ## Layout behavior
 *
 * - **Multi-column**: 펼쳐진 각 단계가 좌→우 컬럼으로 동시에 표시됩니다.
 * - **Vertical Stack**: 레이블 - 트리거 - 도움말/에러가 수직 배치됩니다.
 *
 * ## Accessibility
 *
 * - 각 컬럼은 `role="listbox"`, 항목은 `role="option"`이며 부모 항목은
 *   `aria-expanded`로 펼침 상태를 전달합니다.
 * - `Esc`로 닫고, 항목은 버튼이라 `Enter`/`Space`로 선택/펼침이 가능합니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 지역 선택(시/도 → 구/군):
 *
 * ```tsx
 * <Cascader
 *   label="지역"
 *   options={regionOptions}
 *   onChange={(path, opts) => console.log(path, opts)}
 *   placeholder="지역을 선택하세요"
 * />
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link Select}, 단일 계층의 폼 선택
 * - {@link Dropdown}, 레이블 없는 단순 선택
 */
export const Cascader = forwardRef<HTMLButtonElement, CascaderProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      placeholder = "선택하세요",
      disabled = false,
      changeOnSelect = false,
      expandTrigger = "hover",
      displayRender,
      label,
      error,
      helperText,
      required,
      className,
      container,
      variant,
      size,
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState<string[]>(
      defaultValue ?? [],
    );
    const currentValue = value ?? internalValue;

    const [open, setOpen] = useState(false);
    const [activePath, setActivePath] = useState<string[]>(currentValue);

    const portalContainer = usePortalContainer(container);

    // 패널 밖으로 hover가 벗어나면 닫는다(Dropdown 서브메뉴와 동일한 지연
    // 패턴). 컬럼 사이를 이동할 때의 순간적 leave로 닫히지 않도록 짧은
    // 지연을 두고, 재진입 시 취소한다.
    const closeTimeoutRef = useRef<number | null>(null);
    const cancelClose = () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };
    const scheduleClose = () => {
      cancelClose();
      closeTimeoutRef.current = window.setTimeout(() => setOpen(false), 200);
    };
    useEffect(() => cancelClose, []);

    const selectedOptions = useMemo(
      () => getOptionsByPath(options, currentValue),
      [options, currentValue],
    );
    const columns = useMemo(
      () => getColumns(options, activePath),
      [options, activePath],
    );

    // 각 컬럼은 그 컬럼을 연 부모 항목의 높이에서 시작한다(flyout-down).
    // 오프셋 = 이전 컬럼들에서 펼쳐진 항목의 인덱스 누적 × 행 높이.
    // 행 높이는 단일 줄(text-sm + py-2 = 36px) 기준. 스크롤(>6행)이나
    // 2줄 라벨에서는 어긋날 수 있어 라벨은 한 줄을 전제한다.
    const columnOffsets = useMemo(() => {
      const ROW_HEIGHT = 36;
      const offsets: number[] = [];
      let acc = 0;
      for (let i = 0; i < columns.length; i++) {
        offsets.push(acc);
        const idx = columns[i].findIndex((o) => o.value === activePath[i]);
        if (idx > 0) acc += idx * ROW_HEIGHT;
      }
      return offsets;
    }, [columns, activePath]);

    const labels = selectedOptions.map((o) => o.label);
    const hasValue = labels.length > 0;
    const display =
      hasValue ?
        displayRender ?
          displayRender(labels)
        : labels.join(" / ")
      : placeholder;

    const commit = (path: string[]) => {
      if (value === undefined) setInternalValue(path);
      onChange?.(path, getOptionsByPath(options, path));
    };

    const handleOpenChange = (next: boolean) => {
      // 열 때마다 현재 확정값 기준으로 컬럼을 복원한다.
      if (next) setActivePath(currentValue);
      setOpen(next);
    };

    const handleSelect = (colIndex: number, option: CascaderOption) => {
      if (option.disabled) return;
      const path = [...activePath.slice(0, colIndex), option.value];
      const hasChildren = Boolean(option.children?.length);
      if (hasChildren) {
        setActivePath(path);
        if (changeOnSelect) commit(path);
      } else {
        commit(path);
        setOpen(false);
      }
    };

    const handleHover = (colIndex: number, option: CascaderOption) => {
      if (expandTrigger !== "hover") return;
      if (option.disabled || !option.children?.length) return;
      setActivePath([...activePath.slice(0, colIndex), option.value]);
    };

    return (
      <div className={cn("space-y-1", className)}>
        {label && (
          <label className="block text-sm font-medium text-cms-black">
            {label}
            {required && <span className="ml-1 text-cms-red-500">*</span>}
          </label>
        )}

        <PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
          <PopoverPrimitive.Trigger
            ref={ref}
            type="button"
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            className={cn(
              dropdownTriggerVariants({ variant, size }),
              error && "border-cms-red-500 focus-visible:ring-cms-red-500/20",
            )}
          >
            <span
              className={cn(
                "truncate",
                !hasValue && "text-cms-gray-450",
              )}
            >
              {display}
            </span>
            <ChevronDownIcon
              className={cn(
                "size-4 shrink-0 text-cms-gray-500 transition-transform",
                open && "rotate-180",
              )}
            />
          </PopoverPrimitive.Trigger>

          <PopoverPrimitive.Portal container={portalContainer}>
            <PopoverPrimitive.Content
              align="start"
              sideOffset={6}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              className={cn(
                // 컬럼을 나란히 붙여 배치. items-start로 각 컬럼이 요소
                // 개수에 맞는 자연 높이를 가진다(하나의 흰 패널로 묶으면 짧은
                // 컬럼 아래 빈 흰 여백 때문에 높이가 통일돼 보이므로 컬럼별
                // 카드로 분리). 바깥 모서리만 둥글리고 -ml-px로 인접 border를
                // 겹쳐 단일 구분선으로 연결한다.
                "z-cms-overlay flex items-start",
                "data-[state=open]:animate-in data-[state=open]:fade-in-0",
                "data-[state=open]:zoom-in-95",
              )}
            >
              {columns.map((column, colIndex) => (
                <div
                  key={colIndex}
                  role="listbox"
                  style={{ marginTop: columnOffsets[colIndex] }}
                  className={cn(
                    "cms-no-scrollbar max-h-60 min-w-36 overflow-y-auto",
                    "overscroll-contain rounded-cms-lg py-1",
                    "border border-cms-gray-200 bg-cms-white",
                    `
                      shadow-[0_12px_24px_rgba(15,20,25,0.08),0_4px_8px_rgba(15,20,25,0.04)]
                    `,
                    colIndex > 0 && "-ml-px",
                  )}
                >
                  {column.map((option) => {
                    const hasChildren = Boolean(option.children?.length);
                    const isActive = activePath[colIndex] === option.value;
                    const isSelected =
                      currentValue[colIndex] === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        aria-expanded={hasChildren ? isActive : undefined}
                        aria-disabled={option.disabled || undefined}
                        disabled={option.disabled}
                        onMouseEnter={() => handleHover(colIndex, option)}
                        onClick={() => handleSelect(colIndex, option)}
                        className={cn(
                          "flex w-full items-center justify-between gap-2",
                          "border-0 px-3 py-2 text-left text-sm",
                          "transition-colors",
                          option.disabled ?
                            "cursor-not-allowed bg-cms-white text-cms-gray-400"
                          : cn(
                              "cursor-pointer bg-cms-white text-cms-black",
                              "hover:bg-cms-gray-100",
                            ),
                          isActive && "bg-cms-gray-100",
                          isSelected && "bg-cms-gray-150 font-medium",
                        )}
                      >
                        <span className="truncate">{option.label}</span>
                        {hasChildren && (
                          <ChevronRightFillIcon
                            className="size-3 shrink-0 text-cms-gray-400"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>

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

Cascader.displayName = "Cascader";
