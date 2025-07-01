import { type BuiltinLanguage, type BuiltinTheme } from "shiki";
type __VLS_Props = {
    code: string;
    lang?: BuiltinLanguage | undefined;
    theme?: BuiltinTheme | undefined;
    title?: string;
};
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    title?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    theme: import("shiki").BundledTheme;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
