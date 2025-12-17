import { VariantProps } from 'class-variance-authority';

export declare const dropdownTriggerVariants: (props?: ({
    variant?: "default" | "outline" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface DropdownOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export interface DropdownProps extends VariantProps<typeof dropdownTriggerVariants> {
    options: DropdownOption[];
    value?: string;
    placeholder?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    className?: string;
    dropdownClassName?: string;
    searchable?: boolean;
    clearable?: boolean;
    multiple?: boolean;
    maxHeight?: number;
}
export declare const Dropdown: import('react').ForwardRefExoticComponent<DropdownProps & import('react').RefAttributes<HTMLButtonElement>>;
