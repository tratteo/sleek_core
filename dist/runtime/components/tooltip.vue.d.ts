type __VLS_Props = {
    infoIcon?: boolean;
};
declare var __VLS_5: {}, __VLS_13: {}, __VLS_27: {};
type __VLS_Slots = {} & {
    el?: (props: typeof __VLS_5) => any;
} & {
    default?: (props: typeof __VLS_13) => any;
} & {
    default?: (props: typeof __VLS_27) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    infoIcon: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
