"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/utils/cn";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";

export type TabsProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Root>;
export type TabsListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List>;
export type TabsTriggerProps = ComponentPropsWithoutRef<
  typeof TabsPrimitive.Trigger
>;
export type TabsContentProps = ComponentPropsWithoutRef<
  typeof TabsPrimitive.Content
>;

/**
 * 동일한 영역에 여러 콘텐츠 패널을 전환해 보여주는 탭 컴포넌트입니다.
 *
 * Radix UI의 Tabs primitive를 기반으로 구현되어 키보드 내비게이션,
 * ARIA(`role="tablist"`, `role="tab"`, `role="tabpanel"`), focus management가
 * 자동으로 처리됩니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **하위 카테고리 전환**: "무료 포인트 / 유료 포인트"처럼 동일 컨텍스트에서
 *   2~6개의 분류된 데이터를 전환해 보여줄 때
 * - **단계가 아닌 평행 뷰**: 순서가 없고 상호 배타적인 패널들
 *
 * **사용하지 말아야 하는 경우:**
 * - **순차적 단계**: Wizard/Stepper를 사용하세요.
 * - **단일 옵션 전환 (on/off)**: `Switch`나 `ToggleButton`을 사용하세요.
 * - **다중 선택 필터**: `CountFilterChips`나 `FilterToggleGroup`을 사용하세요.
 * - **7개 이상의 카테고리**: 가독성이 떨어집니다. `Dropdown`이나 `SegmentedControls`의 변형을 검토하세요.
 *
 * ## Layout behavior
 *
 * - **Underline indicator**: 활성 탭 아래 2px 검은색 indicator가 표시되며,
 *   `TabsList`의 하단 border와 겹쳐서 그려집니다(`-mb-px`).
 * - **Full Width List**: `TabsList`는 기본적으로 `inline-flex`로
 *   내용만큼만 차지합니다. 전체 너비가 필요하면 `className="w-full"`로 확장.
 *
 * ## Accessibility
 *
 * - 키보드: ←/→ 또는 ↑/↓로 탭 이동, Home/End로 처음/끝, 자동 activation은
 *   `activationMode="manual"`로 변경 가능.
 * - ARIA: `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`,
 *   `role="tabpanel"`이 자동 부여됩니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 기본 사용:
 *
 * ```tsx
 * <Tabs defaultValue="paid">
 *   <TabsList>
 *     <TabsTrigger value="free">무료 포인트</TabsTrigger>
 *     <TabsTrigger value="paid">유료 포인트</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="free">무료 포인트 내역</TabsContent>
 *   <TabsContent value="paid">유료 포인트 내역</TabsContent>
 * </Tabs>
 * ```
 *
 * Controlled 사용:
 *
 * ```tsx
 * const [tab, setTab] = useState("paid");
 * <Tabs value={tab} onValueChange={setTab}>
 *   ...
 * </Tabs>
 * ```
 * {@end-tool}
 */
export const Tabs = TabsPrimitive.Root;

/**
 * 탭 트리거(`TabsTrigger`)들을 담는 컨테이너입니다.
 *
 * 하단 1px gray separator를 그리며, 각 활성 트리거의 검은 indicator가
 * separator 위로 오버랩됩니다.
 */
export const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1",
      "border-b border-cms-gray-200",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

/**
 * 탭 라벨 버튼입니다. 활성화 시 검은색 underline indicator가 표시됩니다.
 *
 * `value`는 같은 `Tabs` 안의 `TabsContent.value`와 매칭되어야 합니다.
 */
export const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative -mb-px inline-flex items-center justify-center gap-1.5",
      "border-0 border-b-2 border-transparent bg-transparent",
      "px-3.5 py-2.5",
      "text-sm font-medium text-cms-gray-650",
      "cursor-pointer select-none",
      "transition-colors duration-150 ease-out",
      "hover:text-cms-gray-900",
      "focus-visible:outline-2 focus-visible:outline-offset-2",
      "focus-visible:outline-cms-gray-900",
      "disabled:pointer-events-none disabled:opacity-45",
      "data-[state=active]:border-cms-gray-900",
      "data-[state=active]:font-semibold data-[state=active]:text-cms-gray-900",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

/**
 * 탭 콘텐츠 패널입니다.
 *
 * `value`가 활성 탭과 일치하면 표시되며, 그 외에는 DOM에서 숨겨집니다
 * (`forceMount` 사용 시 항상 마운트).
 */
export const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(`
      mt-4
      focus-visible:outline-none
    `, className)}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";
