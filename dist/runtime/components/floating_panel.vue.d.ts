import { type Placement } from "@floating-ui/vue";
type __VLS_Props = {
    overrideOpen?: boolean;
    arrow?: boolean;
    placements?: Placement[];
    teleportTarget?: string;
    matchWidth?: boolean;
    sheetClass?: string;
    preventHeightShrink?: boolean;
};
declare function close(): void;
declare var __VLS_1: {}, __VLS_11: {
    close: typeof close;
}, __VLS_23: {
    close: typeof close;
};
type __VLS_Slots = {} & {
    el?: (props: typeof __VLS_1) => any;
} & {
    panel?: (props: typeof __VLS_11) => any;
} & {
    panel?: (props: typeof __VLS_23) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {
    close: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    overrideOpen: boolean;
    arrow: boolean;
    teleportTarget: string;
    matchWidth: boolean;
    preventHeightShrink: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
