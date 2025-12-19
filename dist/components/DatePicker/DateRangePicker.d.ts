import { default as React } from 'react';

export interface DateRange {
    start: string;
    end: string;
}
export interface DateRangePickerProps {
    value?: DateRange;
    onChange?: (range: DateRange) => void;
    startLabel?: string;
    endLabel?: string;
    className?: string;
}
export declare const DateRangePicker: React.ForwardRefExoticComponent<DateRangePickerProps & React.RefAttributes<HTMLDivElement>>;
