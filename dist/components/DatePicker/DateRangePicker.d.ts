import { default as React } from 'react';
import { TextInputProps } from '../TextInput';

export interface DateRange {
    start: string;
    end: string;
}
export interface DateRangePickerProps extends Omit<TextInputProps, "value" | "onChange" | "type"> {
    value?: DateRange;
    onChange?: (range: DateRange) => void;
    startLabel?: string;
    endLabel?: string;
    startPlaceholder?: string;
    endPlaceholder?: string;
    min?: string;
    max?: string;
    error?: boolean;
    errorMessage?: string;
}
export declare const DateRangePicker: React.ForwardRefExoticComponent<DateRangePickerProps & React.RefAttributes<HTMLDivElement>>;
