import { default as React } from 'react';
import { VariantProps } from 'class-variance-authority';

import * as RadioGroupPrimitives from "@radix-ui/react-radio-group";
declare const RadioGroup: React.ForwardRefExoticComponent<Omit<RadioGroupPrimitives.RadioGroupProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const radioGroupItemVariants: (props?: ({
    variant?: "default" | "black" | "green" | "blue" | "red" | null | undefined;
    size?: "sm" | "lg" | "md" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Item>, VariantProps<typeof radioGroupItemVariants> {
}
declare const RadioGroupItem: React.ForwardRefExoticComponent<RadioGroupItemProps & React.RefAttributes<HTMLButtonElement>>;
export { RadioGroup, RadioGroupItem };
