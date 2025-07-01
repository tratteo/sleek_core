declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    min: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    step: {
        type: NumberConstructor;
        default: number;
    };
    initialMin: {
        type: NumberConstructor;
        default: number;
    };
    initialMax: {
        type: NumberConstructor;
        default: number;
    };
    modelValue: {
        type: import("vue").PropType<[number, number]>;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: [number, number] | undefined) => any;
} & {
    change: (min: number, max: number) => any;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    min: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    step: {
        type: NumberConstructor;
        default: number;
    };
    initialMin: {
        type: NumberConstructor;
        default: number;
    };
    initialMax: {
        type: NumberConstructor;
        default: number;
    };
    modelValue: {
        type: import("vue").PropType<[number, number]>;
    };
}>> & Readonly<{
    onChange?: ((min: number, max: number) => any) | undefined;
    "onUpdate:modelValue"?: ((value: [number, number] | undefined) => any) | undefined;
}>, {
    min: number;
    max: number;
    step: number;
    initialMin: number;
    initialMax: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
