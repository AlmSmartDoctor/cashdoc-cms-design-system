import { default as React } from 'react';
import { VariantProps } from 'class-variance-authority';

declare const tagInputContainerVariants: (props?: ({
    readOnly?: boolean | null | undefined;
    layout?: "row" | "column" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TagInputProps extends Omit<VariantProps<typeof tagInputContainerVariants>, "readOnly"> {
    label?: string;
    required?: boolean;
    maxTags?: number;
    placeholder?: string;
    value?: string[];
    onChange?: (tags: string[]) => void;
    readOnly?: boolean;
    noLimit?: boolean;
    validateTag?: (tag: string, currentTags: string[]) => boolean | string | undefined;
    className?: string;
    id?: string;
}
export declare const TagInput: React.ForwardRefExoticComponent<TagInputProps & React.RefAttributes<HTMLDivElement>>;
export {};
