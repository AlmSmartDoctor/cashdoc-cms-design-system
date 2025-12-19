import { default as React } from 'react';

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
export declare const SideNavigation: React.ForwardRefExoticComponent<SideNavigationProps & React.RefAttributes<HTMLDivElement>>;
