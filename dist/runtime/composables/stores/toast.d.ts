import type { WithId } from "~/src/runtime/lib/decorators";
export type ToastType = "error" | "warning" | "info" | "success";
export interface ToastData {
    type?: ToastType;
    message: string;
    dismissible?: boolean;
    duration?: number;
    persistent?: boolean;
    action?: {
        label: string;
        handler: () => void;
    };
}
export declare const useToast: import("pinia").StoreDefinition<"toast", Pick<{
    add: (data: ToastData) => void;
    toasts: import("vue").Ref<{
        id: string;
        data: {
            type?: ToastType | undefined;
            message: string;
            dismissible?: boolean | undefined;
            duration?: number | undefined;
            persistent?: boolean | undefined;
            action?: {
                label: string;
                handler: () => void;
            } | undefined;
        };
    }[], WithId<ToastData>[] | {
        id: string;
        data: {
            type?: ToastType | undefined;
            message: string;
            dismissible?: boolean | undefined;
            duration?: number | undefined;
            persistent?: boolean | undefined;
            action?: {
                label: string;
                handler: () => void;
            } | undefined;
        };
    }[]>;
    dismiss: (id: string) => void;
}, "toasts">, Pick<{
    add: (data: ToastData) => void;
    toasts: import("vue").Ref<{
        id: string;
        data: {
            type?: ToastType | undefined;
            message: string;
            dismissible?: boolean | undefined;
            duration?: number | undefined;
            persistent?: boolean | undefined;
            action?: {
                label: string;
                handler: () => void;
            } | undefined;
        };
    }[], WithId<ToastData>[] | {
        id: string;
        data: {
            type?: ToastType | undefined;
            message: string;
            dismissible?: boolean | undefined;
            duration?: number | undefined;
            persistent?: boolean | undefined;
            action?: {
                label: string;
                handler: () => void;
            } | undefined;
        };
    }[]>;
    dismiss: (id: string) => void;
}, never>, Pick<{
    add: (data: ToastData) => void;
    toasts: import("vue").Ref<{
        id: string;
        data: {
            type?: ToastType | undefined;
            message: string;
            dismissible?: boolean | undefined;
            duration?: number | undefined;
            persistent?: boolean | undefined;
            action?: {
                label: string;
                handler: () => void;
            } | undefined;
        };
    }[], WithId<ToastData>[] | {
        id: string;
        data: {
            type?: ToastType | undefined;
            message: string;
            dismissible?: boolean | undefined;
            duration?: number | undefined;
            persistent?: boolean | undefined;
            action?: {
                label: string;
                handler: () => void;
            } | undefined;
        };
    }[]>;
    dismiss: (id: string) => void;
}, "add" | "dismiss">>;
