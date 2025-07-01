import { type VueDatePickerProps } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
type __VLS_Props = {
    label?: string;
    iconName?: string;
    options?: VueDatePickerProps;
    inputClass?: string[];
    clearBtn?: boolean;
    required?: boolean;
};
type __VLS_PublicProps = __VLS_Props & {
    modelValue?: Date | Date[];
};
declare const _default: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: Date | Date[] | undefined) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: Date | Date[] | undefined) => any) | undefined;
}>, {
    clearBtn: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
