<template>
    <div>
        <div @click="() => modalEl?.open()" class="relative input input-bordered flex items-center gap-2 cursor-pointer " :class="inputClass">
            <span v-if="label" class="label-text">{{ label }}</span>
            <icon v-else name="formkit:datetime"></icon>
            <input tabindex="-1" class="absolute opacity-0 top-0 left-0 right-0 bottom-0 pointer-events-none" :required="required" :value="format(dates)"></input>
            <p>{{ format(dates) }}</p>
            <button v-if="dates && clearBtn" type="button" @click="clear" class="ml-auto btn btn-sm btn-ghost btn-circle">
                <icon name="material-symbols:close-rounded"></icon>
            </button>
        </div>
        <Modal ref="modalEl" box-class="max-w-md">
            <template #content>
                <div class="flex flex-row items-start justify-center">
                    <div class="flex flex-row items-center justify-center w-min">
                        <Datepicker ref="datepickerEl"  v-model="dates" dark inline v-bind="{ ...props.options }" :format-locale="it">
                            <template #action-row="{ selectDate, disabled, closePicker, internalModelValue }">
                                <div class="flex flex-col md:flex-row items-center gap-4 w-full justify-between" >
                                    <p class="text-sm text-start">{{ format(internalModelValue) }}</p>
                                    <button type="button" @click="confirm" :disabled="disabled" class="btn btn-primary md:w-auto w-full">Select</button>
                                </div>
                            </template>
                            <!-- <template #action-buttons>
                                <div class="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto justify-end" >
                                    <button type="button" @click="confirm" class="btn btn-primary md:w-auto w-full">Select</button>
                                </div>
                            </template> -->
                        </Datepicker>
                    </div>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script setup>
import Datepicker, {} from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import * as fns from "date-fns";
import { it } from "date-fns/locale";
import l from "lodash";
import { nextTick, ref } from "vue";
const datepickerEl = ref();
const dates = defineModel({ type: [Date, Array], ...{} });
const modalEl = ref();
const props = defineProps({
  label: { type: String, required: false },
  iconName: { type: String, required: false },
  options: { type: Object, required: false },
  inputClass: { type: Array, required: false },
  clearBtn: { type: Boolean, required: false, default: true },
  required: { type: Boolean, required: false }
});
function format(val) {
  if (!val) return void 0;
  if (l.isArray(val) && val.length >= 2) {
    return `${dateFormat(val[0])} - ${dateFormat(val[1])}`;
  } else if (val instanceof Date) {
    return dateFormat(val);
  }
}
function dateFormat(date) {
  if (!date) return "";
  if (props.options?.enableTimePicker === void 0 || props.options?.enableTimePicker) {
    return fns.formatDate(date, "dd/MM/yyyy HH:mm");
  }
  return fns.formatDate(date, "dd/MM/yyyy");
}
async function confirm() {
  try {
    datepickerEl.value?.selectDate();
  } catch (ex) {
    console.log("unable to select date");
  }
  await nextTick();
  if (dates.value) {
    modalEl.value?.close();
  }
}
function clear(ev) {
  dates.value = void 0;
  ev.stopImmediatePropagation();
}
</script>

<style>
:root{--dp-preview-font-size:1rem}.dp__input_wrap{border-color:var(--fallback-bc,oklch(var(--bc)/.2));border-radius:var(--rounded-btn,.5rem);@apply h-[3rem] border !important}.dp__main{@apply flex flex-row justify-center w-full}.dp__input{background:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)));@apply border-none outline-none h-full w-full}.dp__outer_menu_wrap{@apply w-full}.dp__btn{@apply rounded-lg !important}.dp__btn.dp__inc_dec_button{@apply z-[1000] hover:text-primary-content !important}.dp__arrow_top{display:none}.dp__input_focus{border-color:var(--fallback-bc,oklch(var(--bc)/.2));box-shadow:none;outline-color:var(--fallback-bc,oklch(var(--bc)/.2));outline-offset:3px;outline-style:solid;outline-width:2px}.dp--tp-wrap{@apply w-full max-w-full overflow-hidden rounded-lg !important}.dp__action_button{@apply btn}.dp__theme_dark{--dp-background-color:theme("colors.base-100");--dp-text-color:theme("colors.base-content");--dp-hover-color:theme("colors.primary");--dp-hover-text-color:theme("colors.primary-content");--dp-hover-icon-color:theme("colors.primary-content");--dp-icon-color:theme("colors.base-content");--dp-primary-color:theme("colors.primary");--dp-primary-text-color:theme("colors.primary-content");--dp-primary-disabled-color:theme("colors.base-100");--dp-disabled-color:theme("colors.neutral");--dp-disabled-color-text:var(--fallback-bc,oklch(var(--bc)/0.2));--dp-border-color:transparent;--dp-menu-border-color:theme("colors.base-100");--dp-border-color-hover:transparent;--dp-scroll-bar-background:theme("colors.base-200");--dp-success-color:theme("colors.success");--dp-danger-color:theme("colors.error");--dp-marker-color:theme("colors.error");--dp-highlight-color:theme("colors.primary");--dp-range-between-dates-background-color:var(--dp-hover-color);--dp-range-between-dates-text-color:var(--dp-hover-text-color);--dp-range-between-border-color:var(--dp-hover-color);--dp-border-radius:var(--rounded-btn,0.5rem);--dp-cell-padding:4px;--dp-action-buttons-padding:16px 16px;--dp-font-family:inherit;--dp-button-height:64px;--dp-cell-size:40px;--dp-input-icon-padding:3.5rem}
</style>
