"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  createContext,
  forwardRef,
  useContext,
  useMemo,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import { cn } from "@/utils/cn";
import { ChevronDownIcon } from "../icons";
import {
  accordionRootVariants,
  accordionItemVariants,
} from "./variants";

type AccordionVariant = "bordered" | "separated";

const AccordionVariantContext = createContext<{ variant: AccordionVariant }>({
  variant: "bordered",
});

export type AccordionProps = ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Root
> & {
  /**
   * 시각적 variant입니다.
   * - `bordered`(기본): 하나의 박스 안에 구분선으로 아이템을 나눕니다.
   * - `separated`: 아이템마다 개별 박스로 분리하고 간격을 둡니다.
   */
  variant?: AccordionVariant;
};

export type AccordionItemProps = ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Item
>;

export type AccordionTriggerProps = ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
>;

export type AccordionContentProps = ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
>;

/**
 * 여러 섹션을 헤더만 노출한 채 접어 두고, 필요한 섹션만 펼쳐 보는
 * 접이식(disclosure) 컴포넌트입니다.
 *
 * {@link Accordion}은 Compound Component 패턴으로 구성되며,
 * `AccordionItem`, `AccordionTrigger`, `AccordionContent`를 조합합니다.
 * Radix UI의 Accordion primitive를 기반으로 구현되어 키보드 내비게이션,
 * ARIA(`aria-expanded`, `aria-controls`, `role="region"`), focus management가
 * 자동으로 처리됩니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **공간 절약**: 길거나 부가적인 콘텐츠를 평소엔 접어 두고, 필요할 때만
 *   펼쳐 보여줘야 할 때
 * - **설정 그룹화**: 폼을 주제별 섹션으로 묶고 각 섹션을 독립적으로 펼쳐
 *   편집할 때 (예: 알림 채널별 on/off `Switch` 묶음)
 * - **FAQ / 약관**: 질문·항목 단위로 상세 내용을 토글할 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **평행 뷰 전환**: 동일 영역에서 패널을 교체해 보여줄 때는 `Tabs`를 쓰세요.
 * - **항상 보여야 하는 핵심 정보**: 펼침 동작 뒤에 숨기면 발견성이 떨어집니다.
 * - **단일 on/off**: 단순 토글은 `Switch`나 `ToggleButton`을 쓰세요.
 *
 * ## Layout behavior
 *
 * - **Full Width**: 부모 컨테이너의 전체 너비를 차지합니다.
 * - **`bordered`(기본)**: 한 박스 안에서 아이템 사이에 1px 구분선이 그려집니다.
 * - **`separated`**: 아이템마다 개별 박스(테두리+라운드)로 분리되고 세로 간격을
 *   둡니다.
 * - **Animation**: 펼침/접힘 시 `accordion-down`/`accordion-up` 높이 애니메이션이
 *   적용되며, chevron 아이콘이 180° 회전합니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **명확한 헤더**: 트리거 라벨만 보고도 내부 내용을 예측할 수 있게 작성하세요.
 * - **독립 섹션엔 `type="multiple"`**: 여러 섹션을 동시에 펼쳐야 한다면
 *   `multiple`을, 한 번에 하나만 보여주려면 `single`을 사용하세요.
 * - **전체 닫기 허용**: `single`에서 모두 닫을 수 있게 하려면 `collapsible`을
 *   함께 주세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **깊은 중첩**: 아코디언 안에 아코디언을 중첩하면 계층이 모호해집니다.
 * - **과도한 섹션 수**: 항목이 너무 많으면 스크롤·탐색이 어려워집니다. 분할이나
 *   다른 내비게이션을 검토하세요.
 *
 * ## Accessibility
 *
 * - **Roles/ARIA**: 트리거는 `<button>`으로 렌더링되며 `aria-expanded`,
 *   `aria-controls`가 연결되고 콘텐츠는 `role="region"`으로 노출됩니다.
 * - **Keyboard**: `↑`/`↓`로 트리거 간 이동, `Home`/`End`로 처음/끝 이동,
 *   `Enter`/`Space`로 펼침·접힘을 전환합니다. (Radix가 자동 처리)
 *
 * ## Example
 *
 * {@tool snippet}
 * 여러 섹션을 독립적으로 펼치는 설정 폼 (`multiple` + `Switch` 행):
 *
 * ```tsx
 * <Accordion type="multiple" defaultValue={["review"]}>
 *   <AccordionItem value="review">
 *     <AccordionTrigger>후기등록</AccordionTrigger>
 *     <AccordionContent>
 *       <div className="flex items-center justify-between">
 *         <span className="text-[13px] text-cms-gray-600">알림톡</span>
 *         <Switch checked={on} onCheckedChange={setOn} />
 *       </div>
 *     </AccordionContent>
 *   </AccordionItem>
 *   <AccordionItem value="qna">
 *     <AccordionTrigger>Q&A등록</AccordionTrigger>
 *     <AccordionContent>...</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 *
 * 한 번에 하나만 펼치는 FAQ (`single` + `collapsible` + `separated`):
 *
 * ```tsx
 * <Accordion type="single" collapsible variant="separated">
 *   <AccordionItem value="q1">
 *     <AccordionTrigger>배송은 얼마나 걸리나요?</AccordionTrigger>
 *     <AccordionContent>영업일 기준 2~3일 소요됩니다.</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link Tabs}, 동일 영역에서 패널을 교체해 보여주는 경우
 * - {@link Switch}, 아코디언 콘텐츠 내부의 on/off 행에 사용
 * - {@link SideNavigation}, 계층형 메뉴의 접이식 서브메뉴가 필요한 경우
 *
 * ## 참고사진
 * ![](https://raw.githubusercontent.com/AlmSmartDoctor/ccds-screenshots/main/screenshots/Data Display/Accordion/For%20Jsdoc.png?raw=true)
 */
export const Accordion = forwardRef<
  ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ className, variant, ...props }, ref) => {
  const resolvedVariant = variant ?? "bordered";
  const contextValue = useMemo(
    () => ({ variant: resolvedVariant }),
    [resolvedVariant],
  );

  return (
    <AccordionVariantContext.Provider value={contextValue}>
      <AccordionPrimitive.Root
        ref={ref}
        className={cn(accordionRootVariants({ variant }), className)}
        {...props}
      />
    </AccordionVariantContext.Provider>
  );
});
Accordion.displayName = "Accordion";

/**
 * 아코디언의 단일 섹션입니다. 같은 `Accordion` 안에서 고유한 `value`를 가져야
 * 하며, `disabled`로 개별 섹션을 비활성화할 수 있습니다.
 *
 * 부모 `Accordion`의 `variant`에 따라 구분선/개별 박스 스타일이 자동 적용됩니다.
 */
export const AccordionItem = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, ...props }, ref) => {
  const { variant } = useContext(AccordionVariantContext);

  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    />
  );
});
AccordionItem.displayName = "AccordionItem";

/**
 * 섹션 헤더 버튼입니다. children(라벨)과 우측 chevron 아이콘을 렌더링하며,
 * 펼쳐지면 chevron이 180° 회전합니다. 내부에서 `Accordion.Header`로 감싸므로
 * 별도 헤더 래핑이 필요 없습니다.
 */
export const AccordionTrigger = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between gap-3",
        "border-0 bg-transparent px-4 py-3.5",
        "text-left text-sm font-medium text-cms-gray-800",
        "cursor-pointer select-none",
        "transition-colors duration-150 ease-out",
        "hover:bg-cms-gray-50",
        "focus-visible:outline-2 focus-visible:-outline-offset-2",
        "focus-visible:outline-cms-gray-900",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        size={18}
        aria-hidden
        className={cn(
          "shrink-0 text-cms-gray-450",
          "transition-transform duration-200",
          "group-data-[state=open]:rotate-180",
        )}
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

/**
 * 펼침 영역입니다. children을 자유롭게 배치할 수 있으며(예: `Switch` 행들),
 * 펼침/접힘 시 `accordion-down`/`accordion-up` 높이 애니메이션이 적용됩니다.
 *
 * `className`은 내부 패딩 래퍼에 병합되어 콘텐츠 간격을 조정할 수 있습니다.
 */
export const AccordionContent = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm text-cms-gray-700",
      "data-[state=open]:animate-accordion-down",
      "data-[state=closed]:animate-accordion-up",
    )}
    {...props}
  >
    <div className={cn("px-4 pt-0 pb-3.5", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";
