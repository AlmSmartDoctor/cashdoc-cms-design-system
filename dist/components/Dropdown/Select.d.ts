import { DropdownProps } from './Dropdown';

export interface SelectProps extends Omit<DropdownProps, "multiple" | "searchable" | "clearable"> {
    label?: string;
    helperText?: string;
    error?: string;
    required?: boolean;
}
export declare const Select: import('react').ForwardRefExoticComponent<SelectProps & import('react').RefAttributes<HTMLButtonElement>>;
