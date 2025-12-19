import { default as React } from 'react';

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
    label?: string;
    id?: string;
}
export declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLButtonElement>>;
