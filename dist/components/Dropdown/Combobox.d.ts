import { DropdownProps } from './Dropdown';

export interface ComboboxProps extends Omit<DropdownProps, 'searchable'> {
    loading?: boolean;
    createable?: boolean;
    onCreateOption?: (value: string) => void;
}
export declare const Combobox: import('react').ForwardRefExoticComponent<ComboboxProps & import('react').RefAttributes<HTMLButtonElement>>;
