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
  return (
    <Accordion.Item value={menu.url} className="border-none">
      <Accordion.Header className="m-0">
        <Accordion.Trigger
          onClick={() => {
            if (!menu.subMenu) {
              onMenuClick(menu.url);
            }
          }}
          className={cn(
            "group flex items-center px-5",
            "text-white",
            "w-full h-13",
            "data-[state=open]:bg-transparent",
            "hover:bg-[#3a3b3e]",
            "transition-colors",
            !menu.subMenu && isSelected && "bg-[#3a3b3e]",
          )}
        >
          {menu.icon && (
            <div
              className={cn(
                "mr-3 flex items-center text-white ",
                "[&>svg]:w-6 [&>svg]:h-6",
              )}
            >
              {menu.icon}
            </div>
          )}
          <span className="text-base font-normal text-white">{menu.title}</span>
          {menu.subMenu && (
            <ChevronDown
              className={cn(
                "ml-auto transition-transform text-white",
                isOpen && "rotate-180",
              )}
              size={20}
            />
          )}
        </Accordion.Trigger>
      </Accordion.Header>
      {menu.subMenu && (
        <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up bg-[#232427]">
          {menu.subMenu.map((subItem) => {
            const subSelected = subItem.url === selectedUrl;
            return (
              <div
                key={subItem.url}
                onClick={() => onMenuClick(subItem.url)}
                className={cn(
                  "flex items-center h-11 px-5 pl-14 cursor-pointer transition-colors hover:bg-[#2e2f32]",
                  subSelected && "bg-[#2e2f32]",
                )}
              >
                <span
                  className={cn(
                    "text-sm font-normal",
                    subSelected ? "text-white font-medium" : "text-[#b4b4b4]",
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
          "w-[280px] min-w-[280px] max-w-[280px] bg-[#2c2d30] flex flex-col text-white h-screen",
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
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3a3b3e] scrollbar-track-transparent">
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
