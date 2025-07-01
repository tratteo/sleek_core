import type { WithId } from "~/src/runtime/lib/decorators";
import type { ToastData } from "../../lib/types.js";
export declare const useToast: import("pinia").StoreDefinition<"toast", Pick<{
    add: (data: ToastData) => void;
    toasts: import("vue").Ref<{
        id: string;
        data: {
            type?: import("../../lib/types.js").ToastType | undefined;
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
            type?: import("../../lib/types.js").ToastType | undefined;
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
            type?: import("../../lib/types.js").ToastType | undefined;
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
            type?: import("../../lib/types.js").ToastType | undefined;
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
            type?: import("../../lib/types.js").ToastType | undefined;
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
            type?: import("../../lib/types.js").ToastType | undefined;
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
