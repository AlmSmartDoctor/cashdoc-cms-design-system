import { VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';

declare const popoverMenuItemVariants: (props?: ({
    variant?: "default" | "destructive" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface PopoverMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof popoverMenuItemVariants> {
    icon?: React.ReactNode;
}
declare const PopoverMenuItem: import('react').ForwardRefExoticComponent<PopoverMenuItemProps & import('react').RefAttributes<HTMLButtonElement>>;
export { PopoverMenuItem, popoverMenuItemVariants };
