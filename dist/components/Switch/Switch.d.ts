import { default as React } from 'react';
import { VariantProps } from 'class-variance-authority';

import * as SwitchPrimitives from "@radix-ui/react-switch";
declare const switchVariants: (props?: ({
    variant?: "default" | "black" | "green" | "blue" | "red" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>, VariantProps<typeof switchVariants> {
}
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLButtonElement>>;
export { Switch };
