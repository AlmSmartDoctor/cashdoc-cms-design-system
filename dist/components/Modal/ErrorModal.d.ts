import { default as React } from 'react';

export interface ErrorModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    message: React.ReactNode;
    confirmText?: string;
    onConfirm?: () => void;
    className?: string;
}
export declare const ErrorModal: React.ForwardRefExoticComponent<ErrorModalProps & React.RefAttributes<HTMLDivElement>>;
