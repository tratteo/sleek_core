declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    text: {
        type: StringConstructor;
        required: true;
    };
    typeByWord: {
        type: BooleanConstructor;
        default: boolean;
    };
    typingSpeed: {
        type: NumberConstructor;
        default: number;
    };
    prefix: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    startDelay: {
        type: NumberConstructor;
        default: number;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    text: {
        type: StringConstructor;
        required: true;
    };
    typeByWord: {
        type: BooleanConstructor;
        default: boolean;
    };
    typingSpeed: {
        type: NumberConstructor;
        default: number;
    };
    prefix: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    startDelay: {
        type: NumberConstructor;
        default: number;
    };
}>> & Readonly<{}>, {
    prefix: string;
    typeByWord: boolean;
    typingSpeed: number;
    startDelay: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
