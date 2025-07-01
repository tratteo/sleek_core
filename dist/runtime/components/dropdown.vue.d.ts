import { type IFuseOptions } from "fuse.js";
export interface DropdownSearchOptions {
    keys: string[];
}
declare const _default: <T extends any>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: __VLS_PrettifyLocal<Pick<Partial<{}> & Omit<{
        readonly onChanged?: ((value: any, index: number) => any) | undefined;
        readonly "onUpdate:modelValue"?: ((value: T | undefined) => any) | undefined;
    } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, never>, "onChanged" | "onUpdate:modelValue"> & ({
        items: T[];
        closeOnSelect?: boolean;
        clearBtn?: boolean;
        placeholder?: string;
        required?: boolean;
        initialValue?: T;
        selectFirst?: boolean;
        searchParams?: IFuseOptions<T> | undefined;
        size?: "xs" | "sm" | "md";
        teleport?: boolean;
        formatter?: (e: T | undefined) => string;
    } & {
        modelValue?: T;
    }) & Partial<{}>> & import("vue").PublicProps;
    expose(exposed: import("vue").ShallowUnwrapRef<{}>): void;
    attrs: any;
    slots: {
        button?: (props: {
            value: T | undefined;
            formatter: ((e: T | undefined) => string) | undefined;
        }) => any;
    } & {
        header?: (props: {}) => any;
    } & {
        item?: (props: {
            item: T;
            index: number;
        }) => any;
    } & {
        header?: (props: {}) => any;
    } & {
        item?: (props: {
            item: T;
            index: number;
        }) => any;
    };
    emit: ((e: "changed", value: any, index: number) => void) & ((evt: "update:modelValue", value: T | undefined) => void);
}>) => import("vue").VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
export default _default;
type __VLS_PrettifyLocal<T> = {
    [K in keyof T]: T[K];
} & {};
