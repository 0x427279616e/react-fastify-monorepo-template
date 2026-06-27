import { ReactNode } from 'react';
import { sileo } from 'sileo';

type ToastType = 'success' | 'error' | 'warning' | 'info';

const notifyWithSileo = (
    message: string,
    type: ToastType,
    duration = 4000,
) => {
    const payload = {
        title:
            type === 'success'
                ? 'Success'
                : type === 'error'
                  ? 'Error'
                  : type === 'warning'
                    ? 'Warning'
                    : 'Info',
        description: message,
        duration,
    };

    if (type === 'success') {
        sileo.success(payload);
        return;
    }

    if (type === 'error') {
        sileo.error(payload);
        return;
    }

    if (type === 'warning') {
        sileo.warning(payload);
        return;
    }

    if (typeof (sileo as any).info === 'function') {
        (sileo as any).info(payload);
        return;
    }

    sileo.success(payload);
};

export const ToastProvider = ({ children }: { children: ReactNode }) => children;

export const useToast = () => {
    return (message: string, type: ToastType, duration?: number) => {
        notifyWithSileo(message, type, duration);
    };
};
