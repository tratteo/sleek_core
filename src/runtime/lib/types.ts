export interface CarouselSection {
    title: string;
    icon: string;
    color: string;
    duration: number;
    type: "video" | "image" | "component";
    description: string;
    asset: string;
}
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
export interface NavbarItem {
    title: string;
    icon?: string | undefined;
    path: string;
    color?: string;
}
export interface DropdownSearchOptions {
    keys: string[];
}
export interface ModalElement {
    el: HTMLDialogElement | undefined;
    addToast: (data: ToastData) => void;
    dismissToast: () => void;
    getArg: () => any | undefined;
    open: (arg?: any | undefined) => void;
    close: () => void;
}
