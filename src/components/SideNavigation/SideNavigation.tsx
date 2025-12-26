import React, { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";

export interface SubMenuItem {
  url: string;
  title: string;
}

export interface MenuItem {
  url: string;
  title: string;
  icon?: React.ReactNode;
  subMenu?: SubMenuItem[];
}

export interface SideNavigationProps {
  title?: string;
  menus: MenuItem[];
  selectedUrl: string;
  onMenuClick: (url: string) => void;
  headerSlot?: React.ReactNode;
  className?: string;
}

interface NavigationMenuItemProps {
  menu: MenuItem;
  isOpen: boolean;
  isSelected: boolean;
  selectedUrl: string;
  onMenuClick: (url: string) => void;
}

const NavigationMenuItem = ({
  menu,
  isOpen,
  isSelected,
  selectedUrl,
  onMenuClick,
}: NavigationMenuItemProps) => {
  const isSubMenuSelected = menu.subMenu?.some(
    (sub) => sub.url === selectedUrl,
  );

  return (
    <Accordion.Item value={menu.url} className="border-none">
      <Accordion.Header className="m-0">
        <Accordion.Trigger
          onClick={(e) => {
            if (!menu.subMenu) {
              e.preventDefault();
              onMenuClick(menu.url);
            }
          }}
          className={cn(
            "border-0 group flex items-center px-5 bg-cms-gray-850",
            "text-white font-bold text-lg",
            "w-full h-15",
            "transition-colors",
            "cursor-pointer",
            !isSubMenuSelected && "data-[state=open]:bg-transparent",
            !menu.subMenu && isSelected && "bg-cms-primary-400 text-cms-black",
            isSubMenuSelected && "bg-cms-primary-200 text-cms-black",
          )}
        >
          {menu.icon && (
            <div
              className={cn(
                "mr-3 flex items-center",
                "[&>svg]:w-6 [&>svg]:h-6",
                (!menu.subMenu && isSelected) || isSubMenuSelected
                  ? "text-cms-black"
                  : "text-white",
              )}
            >
              {menu.icon}
            </div>
          )}
          <span
            className={cn(
              (!menu.subMenu && isSelected) || isSubMenuSelected
                ? "text-cms-black"
                : "text-white",
            )}
          >
            {menu.title}
          </span>
          {menu.subMenu && (
            <ChevronDown
              className={cn(
                "ml-auto transition-transform",
                (!menu.subMenu && isSelected) || isSubMenuSelected
                  ? "text-cms-black"
                  : "text-white",
                isOpen && "rotate-180",
              )}
              size={20}
            />
          )}
        </Accordion.Trigger>
      </Accordion.Header>
      {menu.subMenu && (
        <Accordion.Content
          className={cn(
            "overflow-hidden",
            "data-[state=open]:animate-accordion-down",
            "data-[state=closed]:animate-accordion-up",
          )}
        >
          {menu.subMenu.map((subItem) => {
            const subSelected = subItem.url === selectedUrl;
            return (
              <button
                key={subItem.url}
                onClick={() => onMenuClick(subItem.url)}
                className={cn(
                  "border-0 bg-transparent flex items-center",
                  "w-full h-13 px-5 pl-14",
                  "cursor-pointer",
                  "transition-colors",
                  "hover:bg-cms-gray-900",
                )}
              >
                <span
                  className={cn(
                    "text-base font-bold",
                    "transition-colors",
                    subSelected
                      ? "text-cms-primary-400 font-bold"
                      : "text-cms-white",
                  )}
                >
                  {subItem.title}
                </span>
              </button>
            );
          })}
        </Accordion.Content>
      )}
    </Accordion.Item>
  );
};

/**
 * 어플리케이션의 주요 섹션 간 이동을 담당하는 왼쪽 사이드바 메뉴 컴포넌트입니다.
 *
 * {@link SideNavigation}은 계층형 메뉴 구조(1단계 및 서브메뉴)를 지원하며,
 * 현재 사용자의 위치를 시각적으로 강조하여 내비게이션 맥락을 제공합니다.
 * 다크 테마(Dark Theme) 스타일로 고정되어 대시보드 및 CMS 관리 도구에 적합합니다.
 *
 * Radix UI의 Accordion 컴포넌트를 기반으로 구현되어 서브메뉴의 펼침/접힘 동작이
 * 부드럽게 처리됩니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **메인 내비게이션**: 서비스의 핵심 기능을 상시 노출하고 접근해야 할 때
 * - **계층 구조 관리**: 대메뉴와 그에 속한 소메뉴를 구조적으로 보여줘야 할 때
 * - **관리자 페이지**: 다양한 관리 도구와 설정 항목을 분류하여 제공할 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **단순 링크 목록**: 3-4개의 단순한 링크라면 상단 내비게이션(GNB)이 더 적절할 수 있습니다.
 * - **모바일 전용 탭**: 모바일 앱 스타일의 내비게이션이 필요하다면 하단 탭 바를 고려하세요.
 *
 * ## Layout behavior
 *
 * - **Fixed Width**: 기본적으로 `w-70` (280px)의 고정 너비를 가지며, 세로 전체(h-full)를 차지합니다.
 * - **Scrollable**: 메뉴 항목이 많아 화면 높이를 넘어가면 메뉴 영역 내부에 스크롤이 발생합니다.
 * - **Accordion**: 서브메뉴가 있는 항목 클릭 시 아래로 펼쳐지는 애니메이션이 적용됩니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **아이콘 활용**: 각 대메뉴에 적절한 아이콘을 배치하여 사용자가 메뉴의 성격을 빠르게 파악하게 하세요.
 * - **상태 연동**: 현재 활성화된 페이지의 URL과 `selectedUrl`을 정확히 일치시켜 하이라이트가 올바르게 표시되도록 하세요.
 * - **일관된 그룹화**: 연관된 기능들은 하나의 대메뉴 아래 서브메뉴로 묶어 복잡도를 낮추세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **과도한 계층**: 서브메뉴의 서브메뉴(3단계 이상)는 가급적 피하세요. UI가 복잡해지고 사용성이 떨어집니다.
 * - **긴 메뉴 명칭**: 사이드바 너비가 제한적이므로 메뉴 이름은 짧고 명확하게(가급적 10자 이내) 작성하세요.
 *
 * ## Accessibility
 *
 * - **Accordion Support**: 서브메뉴 상태를 스크린 리더에서 '펼쳐짐/접힘'으로 인식합니다.
 * - **Keyboard Interaction**: `Tab` 키로 메뉴를 이동하고, `Enter`나 `Space`로 메뉴를 열거나 이동할 수 있습니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 서브메뉴를 포함한 사이드 네비게이션:
 *
 * ```tsx
 * const menus = [
 *   { url: '/dashboard', title: '홈', icon: <HomeIcon /> },
 *   {
 *     url: '/contents',
 *     title: '콘텐츠 관리',
 *     icon: <FileTextIcon />,
 *     subMenu: [
 *       { url: '/contents/posts', title: '게시글 목록' },
 *       { url: '/contents/comments', title: '댓글 관리' },
 *     ]
 *   },
 * ];
 *
 * <SideNavigation
 *   menus={menus}
 *   selectedUrl="/contents/posts"
 *   onMenuClick={(url) => navigate(url)}
 * />
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link Button}, 단순 액션 실행을 위한 요소
 * - {@link Popover}, 클릭 시 일시적으로 나타나는 추가 메뉴가 필요한 경우
 */
export const SideNavigation = React.forwardRef<
  HTMLDivElement,
  SideNavigationProps
>(
  (
    { title, menus, selectedUrl, onMenuClick, headerSlot, className, ...props },
    ref,
  ) => {
    const [openedMenus, setOpenedMenus] = useState<string[]>([]);

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col",
          "w-70 min-w-70 max-w-70 h-full",
          "bg-cms-gray-850 text-white",
          className,
        )}
        {...props}
      >
        {/* Header Slot */}
        {headerSlot}

        {/* Title */}
        {title && !headerSlot && (
          <div className="px-5 py-4 border-b border-[#3a3b3e]">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
          </div>
        )}

        {/* Menu Body */}
        <div
          className={cn(
            "flex-1 overflow-y-auto",
            "scrollbar-thin",
            "scrollbar-thumb-[#3a3b3e]",
            "scrollbar-track-transparent",
          )}
        >
          <Accordion.Root
            type="multiple"
            value={openedMenus}
            onValueChange={setOpenedMenus}
          >
            {menus.map((menu) => (
              <NavigationMenuItem
                key={menu.url}
                menu={menu}
                isOpen={openedMenus.includes(menu.url)}
                isSelected={selectedUrl === menu.url}
                selectedUrl={selectedUrl}
                onMenuClick={onMenuClick}
              />
            ))}
          </Accordion.Root>
        </div>
      </div>
    );
  },
);

SideNavigation.displayName = "SideNavigation";
