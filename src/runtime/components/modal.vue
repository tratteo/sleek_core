<template>
    <Teleport :disabled="isDev" v-if="mounted" to="#modal-layer" :defer="true">
        <dialog ref="dialogEl" :id="id" class="modal" @click="stopPropagation" @animationend="onAnimationEnd" v-bind="$attrs">
            <form method="dialog" class="modal-backdrop">
                <button @click="close" v-if="closeOnClickOutside">close</button>
            </form>
            <div v-if="bp.smallerOrEqual('md').value" class="modal-sheet" :class="sheetClass">
                <AnimatedHeight :disable-animation="disableAnimation">
                    <div v-if="isOpen" ref="modalEl" :key="key" class="relative w-full h-full max-h-[100svh] min-h-[40svh] flex flex-col items-stretch px-2 pb-2 pt-2 gap-2">
                        <!-- <div class="h-1 bg-base-content/20 w-[4rem] rounded-full absolute top-4 right-[50%] translate-x-[50%]"></div> -->
                        <div class="flex flex-row items-center justify-end gap-2 min-h-[3rem]">
                            <Transition name="slide" mode="out-in" appear>
                                <Alert :type="toastData.type" v-if="toastData" class="flex-1 overflow-hidden">
                                    <div ref="toastScrollEl" :style="{ '--duration': toastData.duration + 'ms' }" class="w-full flex items-center overflow-x-scroll text-nowrap">
                                        <div class="scroll-text">{{ toastData.message }}</div>
                                        <button @click="dismissToast" class="ml-auto btn btn-xs btn-ghost" v-if="toastData.dismissible">
                                            Chiudi
                                            <!-- <icon name="material-symbols:close-rounded"></icon> -->
                                        </button>
                                    </div>
                                </Alert>
                            </Transition>
                            <button v-if="closeIcon" type="button" tabindex="-1" @click="close" class="btn btn-sm btn-circle btn-ghost" title="Close">
                                <icon name="material-symbols:close-rounded"></icon>
                            </button>
                        </div>
                        <div v-if="slots.title" class="w-full modal-title">
                            <slot name="title" :arg="currentArg"></slot>
                        </div>
                        <slot v-if="slots.header" name="header" :arg="currentArg"></slot>
                        <div class="modal-content-wrapper scrollbar-display overflow-y-auto overflow-x-hidden">
                            <slot name="content" :arg="currentArg"></slot>
                        </div>
                        <div v-if="slots.action" class="my-2 gap-4 flex flex-row justify-end w-full">
                            <slot name="action" :arg="currentArg"></slot>
                        </div>
                    </div>
                </AnimatedHeight>
            </div>
            <div v-else class="modal-box" :class="boxClass">
                <AnimatedHeight :disable-animation="disableAnimation">
                    <div v-if="isOpen" ref="modalEl" :key="key" class="max-h-[80svh] grow h-full flex flex-col items-stretch">
                        <div class="w-full flex flex-row items-center gap-4 justify-end min-h-[3.5rem]">
                            <Transition name="slide" mode="out-in" appear>
                                <Alert :type="toastData.type" v-if="toastData" class="flex-1 overflow-hidden">
                                    <div ref="toastScrollEl" :style="{ '--duration': toastData.duration + 'ms' }" class="w-full flex items-center overflow-x-scroll text-nowrap">
                                        <div class="scroll-text">{{ toastData.message }}</div>
                                        <button @click="dismissToast" class="ml-auto btn btn-xs btn-ghost" v-if="toastData.dismissible">Chiudi</button>
                                    </div>
                                </Alert>
                            </Transition>
                            <button v-if="closeIcon" type="button" tabindex="-1" @click="close" class="btn btn-sm btn-circle btn-ghost" title="Close">
                                <icon name="material-symbols:close-rounded"></icon>
                            </button>
                        </div>
                        <div v-if="slots.title" class="modal-title">
                            <slot name="title" :arg="currentArg"></slot>
                        </div>
                        <slot v-if="slots.header" name="header" :arg="currentArg"></slot>
                        <div class="modal-content-wrapper scrollbar-display overflow-y-auto overflow-x-hidden">
                            <slot name="content" :arg="currentArg"></slot>
                        </div>

                        <div v-if="slots.action" class="modal-action">
                            <slot name="action" :arg="currentArg"></slot>
                        </div>
                    </div>
                </AnimatedHeight>
            </div>
        </dialog>
    </Teleport>
</template>

<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints, useMounted, useMutationObserver } from "@vueuse/core";
import { computed, nextTick, ref, useSlots } from "vue";
import { useRefreshableKey } from "../composables/refreshable_key";
import { useModalController } from "../composables/stores/modal_controller";
import type { ToastData } from "../composables/stores/toast";

export interface ModalElement {
    el: HTMLDialogElement | undefined;
    addToast: (data: ToastData) => void;
    dismissToast: () => void;
    getArg: () => any | undefined;
    open: (arg?: any | undefined) => void;
    close: () => void;
}
const disableAnimation = ref(true);
const mounted = useMounted();
const bp = useBreakpoints(breakpointsTailwind);
const dialogEl = ref<HTMLDialogElement>();
const slots = useSlots();
const currentArg = ref<any | undefined>();
const emit = defineEmits<{ (e: "close"): void; (e: "open", arg: any): any }>();
const { key, refresh } = useRefreshableKey();
const isOpen = ref(false);
const modalEl = ref<HTMLElement>();
const toastData = ref<ToastData | undefined>(undefined);
var toastTimeout: NodeJS.Timeout | undefined;
const toastScrollEl = ref<HTMLElement | undefined>();
const modalController = useModalController();
defineOptions({ inheritAttrs: true });

const props = withDefaults(
    defineProps<{
        id?: string;
        closeOnClickOutside?: boolean;
        closeIcon?: boolean;
        boxClass?: string;
        sheetClass?: string[];
        actions?: boolean;
        maintainHeight?: boolean;
    }>(),
    {
        maintainHeight: false,
        closeIcon: true,
        actions: true,
        closeButton: false,
        closeOnClickOutside: true,
    }
);
const isDev = computed(() => import.meta.dev);
useMutationObserver(
    dialogEl,
    (mutations) => {
        const target = mutations.at(0)?.target as HTMLElement;
        if (!target) return;
        if (target.hasAttribute("open")) {
            onOpen();
        } else {
            onClose();
        }
    },
    { attributeFilter: ["open"], attributes: true }
);

function onAnimationEnd(payload: AnimationEvent) {
    disableAnimation.value = false;
    requestAnimationFrame(() => {
        const size = modalEl.value?.getBoundingClientRect().height;
        if (size && props.maintainHeight) {
            modalEl.value!.style.height = `${size}px`;
        }
    });
}
function dismissToast() {
    toastData.value = undefined;
}
function open(arg: any | undefined) {
    currentArg.value = arg;
    dialogEl.value?.showModal();
}
function close() {
    disableAnimation.value = true;
    dialogEl.value?.close();
}
function addToast(data: ToastData) {
    clearTimeout(toastTimeout);
    data.type ??= "info";
    data.duration ??= 8000;
    data.dismissible ??= true;
    if (data.persistent) {
        data.dismissible = true;
    }
    toastData.value = data;
    nextTick(() => {
        const offset = (toastScrollEl.value?.offsetWidth ?? 0) - (toastScrollEl.value?.scrollWidth ?? 0);
        toastScrollEl.value?.style.setProperty("--scroll-tr", `${offset}px`);
    });
    if (!data.persistent) {
        toastTimeout = setTimeout(() => {
            toastData.value = undefined;
        }, data.duration);
    }
}

function onOpen() {
    isOpen.value = true;
    const queryArg = modalController.queryArg(dialogEl.value);
    if (queryArg !== undefined) {
        currentArg.value = queryArg;
    }
    emit("open", currentArg.value);
    refresh();
}
function onClose() {
    disableAnimation.value = true;
    isOpen.value = false;
    toastData.value = undefined;
    emit("close");
}
function stopPropagation(ev: Event) {
    ev.stopImmediatePropagation();
}

defineExpose<ModalElement>({
    addToast: addToast,
    dismissToast: dismissToast,
    getArg: () => currentArg.value,
    open: open,
    close: close,
    el: dialogEl.value,
});
</script>

<style lang="css" scoped>
.modal-box {
    @apply w-full p-4 overflow-visible !important;
}
.modal-title {
    @apply font-bold text-xl mx-1 mb-2;
}
.modal[open] .modal-sheet {
    @apply translate-y-0;
}
.modal:not([open]) * {
    @apply pointer-events-none !important;
}
.modal-sheet {
    z-index: 1000 !important;
    @apply fixed bottom-0 w-[100vw] max-h-[100svh] translate-y-[20%] border-x-[0px] bg-base-100 rounded-t-box  duration-200 ease-out text-base-content shadow-md;
}

.modal-content-wrapper {
    @apply text-sm w-full h-full p-1 gap-2 flex flex-col overflow-visible !important;
}

.scroll-text {
    @apply inline-block text-sm;
    animation: autoScroll var(--duration) ease-out forwards;
}
@keyframes autoScroll {
    10% {
        transform: translateX(0);
    }
    90% {
        transform: translateX(var(--scroll-tr));
    }
    100% {
        transform: translateX(var(--scroll-tr));
    }
}

.alert-class {
    --duration-tr: 300ms;
    --y-tr: -4px;
    --x-tr: 0px;
    @apply flex flex-row items-center rounded-box px-2 py-2 gap-2 text-sm !important;
}
</style>
