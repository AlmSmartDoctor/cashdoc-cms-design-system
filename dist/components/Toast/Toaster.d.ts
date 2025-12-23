import { Toaster as Sonner } from 'sonner';
import { ComponentProps } from 'react';

type ToasterProps = ComponentProps<typeof Sonner>;
declare const Toaster: ({ position, ...props }: ToasterProps) => import("react/jsx-runtime").JSX.Element;
export { Toaster };
