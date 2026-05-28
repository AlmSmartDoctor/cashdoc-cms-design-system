import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

export type LayoutRootProps = ComponentPropsWithoutRef<"div">;
export type LayoutSidebarProps = ComponentPropsWithoutRef<"aside">;
export type LayoutMainProps = ComponentPropsWithoutRef<"main">;

/**
 * 사이드바와 메인 영역을 가로로 배치하는 어드민 페이지 셸입니다.
 *
 * {@link Layout}은 `Layout.Root`, `Layout.Sidebar`, `Layout.Main` 세 개의
 * 복합 컴포넌트로 구성되며, {@link SideNavigation}과 {@link ContentArea}를
 * 자연스럽게 조립하기 위한 골격을 제공합니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **CMS/어드민 메인 셸**: 좌측 내비게이션과 우측 본문이 항상 함께 노출되는 페이지
 * - **본문 스크롤 분리**: 사이드바는 고정한 채로 본문만 스크롤되어야 할 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **단일 페이지(로그인/온보딩 등)**: 별도의 레이아웃 없이 컨텐츠만 노출되는 화면
 * - **모바일 우선 뷰**: 사이드바가 항상 가려져 있는 좁은 화면 전용 레이아웃
 *
 * ## Layout behavior
 *
 * - **Root**: `flex` 가로 정렬, 화면 전체 높이(`h-screen`)를 차지하고
 *   페이지 배경(`bg-cms-gray-50`)을 깔아 둡니다.
 * - **Sidebar**: `shrink-0`으로 너비를 유지합니다. 내부 `SideNavigation`이
 *   자체 너비(`w-[232px]`)를 지정하므로 별도의 너비 제어가 필요하지 않습니다.
 * - **Main**: `flex-1 min-w-0`로 남은 가로폭을 사용하고 세로 스크롤을 담당합니다.
 *   기본 padding은 적용하지 않으므로 본문 위에서 {@link ContentArea}로 카드 영역을
 *   감싸거나 직접 패딩을 부여하세요.
 *
 * ## Example
 *
 * {@tool snippet}
 * SideNavigation + ContentArea 조합:
 *
 * ```tsx
 * <Layout.Root>
 *   <Layout.Sidebar>
 *     <SideNavigation menus={menus} selectedUrl={url} onMenuClick={...} />
 *   </Layout.Sidebar>
 *   <Layout.Main>
 *     <ContentArea>
 *       <Table>...</Table>
 *     </ContentArea>
 *   </Layout.Main>
 * </Layout.Root>
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link SideNavigation}, 좌측 네비게이션 컴포넌트
 * - {@link ContentArea}, 메인 영역 안에서 본문을 감싸는 플랫 카드 컨테이너
 */
const LayoutRoot = forwardRef<HTMLDivElement, LayoutRootProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-screen w-full items-stretch",
        "bg-cms-gray-50 text-cms-gray-900",
        className,
      )}
      {...props}
    />
  ),
);
LayoutRoot.displayName = "Layout.Root";

/**
 * 좌측 사이드바 슬롯입니다. 내부에 {@link SideNavigation}을 배치합니다.
 *
 * 너비는 자식 요소(SideNavigation)가 결정하며, 본문 영역에 의해 줄어들지 않도록
 * `shrink-0`이 적용됩니다.
 */
const LayoutSidebar = forwardRef<HTMLElement, LayoutSidebarProps>(
  ({ className, ...props }, ref) => (
    <aside
      ref={ref}
      className={cn("flex h-full shrink-0", className)}
      {...props}
    />
  ),
);
LayoutSidebar.displayName = "Layout.Sidebar";

/**
 * 우측 본문 영역입니다. 남은 가로폭을 차지하며 세로 스크롤을 담당합니다.
 *
 * `min-w-0`로 flex item이 자식 컨텐츠 폭에 끌려가지 않도록 보장합니다.
 */
const LayoutMain = forwardRef<HTMLElement, LayoutMainProps>(
  ({ className, ...props }, ref) => (
    <main
      ref={ref}
      className={cn(
        "flex h-full min-w-0 flex-1 flex-col overflow-auto",
        className,
      )}
      {...props}
    />
  ),
);
LayoutMain.displayName = "Layout.Main";

export const Layout = {
  Root: LayoutRoot,
  Sidebar: LayoutSidebar,
  Main: LayoutMain,
};
