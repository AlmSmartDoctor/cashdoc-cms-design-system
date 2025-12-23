import { default as React } from 'react';

export interface SuccessModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    message: React.ReactNode;
    confirmText?: string;
    onConfirm?: () => void;
    className?: string;
}
export declare const SuccessModal: React.ForwardRefExoticComponent<SuccessModalProps & React.RefAttributes<HTMLDivElement>>;
