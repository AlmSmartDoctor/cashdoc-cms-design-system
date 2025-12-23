import { default as React } from 'react';

export interface ConfirmModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    message: React.ReactNode;
    confirmText?: string;
    onConfirm?: () => void;
    className?: string;
}
export declare const ConfirmModal: React.ForwardRefExoticComponent<ConfirmModalProps & React.RefAttributes<HTMLDivElement>>;
