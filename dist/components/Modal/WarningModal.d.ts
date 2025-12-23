import { default as React } from 'react';

export interface WarningModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    message: React.ReactNode;
    confirmText?: string;
    onConfirm?: () => void;
    cancelText?: string;
    onCancel?: () => void;
    className?: string;
}
export declare const WarningModal: React.ForwardRefExoticComponent<WarningModalProps & React.RefAttributes<HTMLDivElement>>;
