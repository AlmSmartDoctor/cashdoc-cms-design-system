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
            "group flex items-center px-5",
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
            "bg-[#232427]",
            "data-[state=open]:animate-accordion-down",
            "data-[state=closed]:animate-accordion-up",
          )}
        >
          {menu.subMenu.map((subItem) => {
            const subSelected = subItem.url === selectedUrl;
            return (
              <div
                key={subItem.url}
                onClick={() => onMenuClick(subItem.url)}
                className={cn(
                  "flex items-center",
                  "h-13 px-5 pl-14",
                  "cursor-pointer",
                  "transition-colors",
                  "hover:bg-[#2e2f32]",
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
              </div>
            );
          })}
        </Accordion.Content>
      )}
    </Accordion.Item>
  );
};

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
          "bg-[#2c2d30] text-white",
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
