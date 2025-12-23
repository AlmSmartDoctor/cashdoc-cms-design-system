import { default as React } from 'react';

export interface ModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    icon?: React.ReactNode;
    title?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    showCloseButton?: boolean;
    size?: "sm" | "md" | "lg";
}
export declare const Modal: React.ForwardRefExoticComponent<ModalProps & React.RefAttributes<HTMLDivElement>>;
