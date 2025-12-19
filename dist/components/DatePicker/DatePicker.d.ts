import { default as React } from 'react';

export interface DatePickerProps {
    value?: string;
    onChange?: (date: string) => void;
    label?: string;
    placeholder?: string;
    min?: string;
    max?: string;
    disabled?: boolean;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    className?: string;
}
export declare const DatePicker: React.ForwardRefExoticComponent<DatePickerProps & React.RefAttributes<HTMLDivElement>>;
