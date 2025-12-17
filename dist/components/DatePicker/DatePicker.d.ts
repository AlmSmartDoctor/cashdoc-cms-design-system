import { default as React } from 'react';
import { TextInputProps } from '../TextInput';

export interface DatePickerProps extends Omit<TextInputProps, "type" | "value" | "onChange"> {
    value?: string;
    onChange?: (date: string) => void;
    min?: string;
    max?: string;
}
export declare const DatePicker: React.ForwardRefExoticComponent<DatePickerProps & React.RefAttributes<HTMLInputElement>>;
