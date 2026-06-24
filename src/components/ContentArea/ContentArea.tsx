import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { contentAreaVariants } from "./variants";

export type ContentAreaProps = {
  /**
   * 내부 padding 크기. 자식 컴포넌트가 자체 padding을 가질 때는 `"none"` 사용.
   * `ContentArea.Header` / `ContentArea.Body` / `ContentArea.Footer`를 함께
   * 쓸 경우 항상 `"none"`을 사용하세요.
   * @default "md"
   */
  padding?: VariantProps<typeof contentAreaVariants>["padding"];
} & ComponentPropsWithoutRef<"div">;

export type ContentAreaHeaderProps = ComponentPropsWithoutRef<"header">;
export type ContentAreaBodyProps = ComponentPropsWithoutRef<"div">;
export type ContentAreaFooterProps = ComponentPropsWithoutRef<"footer">;

/**
 * 메인 영역 안에서 본문을 감싸는 플랫 카드 컨테이너입니다.
 *
 * {@link ContentArea}는 흰색 배경 · 1px 외곽선 · 8px 라운드의 정돈된 카드
 * 표면을 제공합니다. 그림자를 사용하지 않으며, 어드민 화면의 표/필터/폼
 * 영역을 시각적으로 묶는 데 사용합니다.
 *
 * 단일 컨테이너로 사용하거나 `ContentArea.Header` / `ContentArea.Body` /
 * `ContentArea.Footer` 서브 컴포넌트로 조립할 수 있습니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **표 + 필터 + 페이지네이션 영역**을 하나의 시각적 단위로 묶을 때
 * - **폼 섹션** 등 본문 영역을 구획화하고 시멘틱하게 분리하고 싶을 때
 * - **다중 카드 레이아웃**: 같은 페이지에 여러 개의 본문 영역을 가로/세로로 나열할 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **모달/팝오버 내부**: 이미 표면이 분리되어 있어 중복된 외곽선이 됩니다.
 * - **떠 있는 카드 요구**: 강조가 필요한 경우 별도 컴포넌트나 강조 스타일을 사용하세요.
 *   ContentArea는 의도적으로 플랫합니다.
 *
 * ## Layout behavior
 *
 * - **Flat surface**: 그림자 없이 외곽선만으로 영역을 구분합니다.
 * - **Padding variant**: 기본 `padding="md"` (24px). 자식이 자체 padding을
 *   가지는 경우(예: 표 전체를 채우는 레이아웃) 또는 서브 컴포넌트를 함께
 *   사용하는 경우 `padding="none"`을 지정합니다.
 * - **Full width**: 기본은 부모 너비(`width: 100%`)를 따릅니다.
 *   필요 시 `className`으로 max-width를 제어하세요.
 *
 * ## Composition
 *
 * Header/Body/Footer는 중립적으로 padding + 구분선만 적용합니다. 내부 정렬은
 * 소비자가 `className`으로 자유롭게 조합하세요(예: `flex justify-between`).
 *
 * ## Example
 *
 * {@tool snippet}
 * 단일 컨테이너:
 *
 * ```tsx
 * <ContentArea>
 *   <FilterToggleGroup ... />
 *   <Table>...</Table>
 *   <Pagination ... />
 * </ContentArea>
 * ```
 *
 * Header / Body / Footer 조립:
 *
 * ```tsx
 * <ContentArea padding="none">
 *   <ContentArea.Header className="flex items-center justify-between">
 *     <FilterToggleGroup ... />
 *     <TextInput placeholder="검색" />
 *   </ContentArea.Header>
 *   <ContentArea.Body>
 *     <Table>...</Table>
 *   </ContentArea.Body>
 *   <ContentArea.Footer className="flex items-center justify-between">
 *     <span>10건 / 전체 47건</span>
 *     <Pagination ... />
 *   </ContentArea.Footer>
 * </ContentArea>
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link Layout}, 사이드바 + 본문 영역의 페이지 셸
 */
const ContentAreaRoot = forwardRef<HTMLDivElement, ContentAreaProps>(
  ({ className, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(contentAreaVariants({ padding }), className)}
      {...props}
    />
  ),
);
ContentAreaRoot.displayName = "ContentArea";

/**
 * ContentArea 상단 헤더 영역입니다. 하단에 1px 구분선이 그려집니다.
 *
 * 내부 정렬(flex/grid)은 `className`으로 직접 지정합니다.
 */
const ContentAreaHeader = forwardRef<HTMLElement, ContentAreaHeaderProps>(
  ({ className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        "px-5 py-3.5",
        "border-b border-cms-gray-200",
        className,
      )}
      {...props}
    />
  ),
);
ContentAreaHeader.displayName = "ContentArea.Header";

/**
 * ContentArea 본문 영역입니다. 기본 padding은 적용하지 않으며,
 * 표를 끝까지 채우거나 폼을 배치하는 등 자식이 자체 spacing을 관리합니다.
 */
const ContentAreaBody = forwardRef<HTMLDivElement, ContentAreaBodyProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("min-w-0", className)} {...props} />
  ),
);
ContentAreaBody.displayName = "ContentArea.Body";

/**
 * ContentArea 하단 푸터 영역입니다. 상단에 1px 구분선이 그려지며,
 * 페이지네이션이나 액션 버튼을 배치할 때 사용합니다.
 */
const ContentAreaFooter = forwardRef<HTMLElement, ContentAreaFooterProps>(
  ({ className, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn(
        "px-5 py-3.5",
        "border-t border-cms-gray-200",
        className,
      )}
      {...props}
    />
  ),
);
ContentAreaFooter.displayName = "ContentArea.Footer";

export const ContentArea = Object.assign(ContentAreaRoot, {
  Header: ContentAreaHeader,
  Body: ContentAreaBody,
  Footer: ContentAreaFooter,
});
