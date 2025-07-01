import type { ToastData } from "../lib/types.js";
type __VLS_Props = {
    id?: string;
    closeOnClickOutside?: boolean;
    closeIcon?: boolean;
    boxClass?: string;
    sheetClass?: string[];
    actions?: boolean;
    maintainHeight?: boolean;
};
declare var __VLS_21: {
    arg: any;
}, __VLS_23: {
    arg: any;
}, __VLS_25: {
    arg: any;
}, __VLS_27: {
    arg: any;
}, __VLS_45: {
    arg: any;
}, __VLS_47: {
    arg: any;
}, __VLS_49: {
    arg: any;
}, __VLS_51: {
    arg: any;
};
type __VLS_Slots = {} & {
    title?: (props: typeof __VLS_21) => any;
} & {
    header?: (props: typeof __VLS_23) => any;
} & {
    content?: (props: typeof __VLS_25) => any;
} & {
    action?: (props: typeof __VLS_27) => any;
} & {
    title?: (props: typeof __VLS_45) => any;
} & {
    header?: (props: typeof __VLS_47) => any;
} & {
    content?: (props: typeof __VLS_49) => any;
} & {
    action?: (props: typeof __VLS_51) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {
    el: HTMLDialogElement | undefined;
    addToast: (data: ToastData) => void;
    dismissToast: () => void;
    getArg: () => any | undefined;
    open: (arg?: any | undefined) => void;
    close: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    close: () => any;
    open: (arg: any) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClose?: (() => any) | undefined;
    onOpen?: ((arg: any) => any) | undefined;
}>, {
    actions: boolean;
    maintainHeight: boolean;
    closeOnClickOutside: boolean;
    closeIcon: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
