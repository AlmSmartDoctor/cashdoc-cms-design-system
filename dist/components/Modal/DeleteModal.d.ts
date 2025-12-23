import { default as React } from 'react';

export interface DeleteModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    message?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel?: () => void;
    className?: string;
}
export declare const DeleteModal: React.ForwardRefExoticComponent<DeleteModalProps & React.RefAttributes<HTMLDivElement>>;
