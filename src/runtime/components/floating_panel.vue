<template>
    <div>
        <!-- <div v-if="open" class="absolute w-screen h-screen bg-red-500/10 top-0 left-0" @click="() => (open = false)"></div> -->
        <div ref="rootEl" class="w-full h-full flex items-center">
            <div ref="triggerEl" class="flex flex-row items-center w-full cursor-pointer select-none">
                <div class="w-full flex justify-center items-center" @click="toggleOpen">
                    <slot name="el"> </slot>
                </div>
                <icon v-if="arrow" class="transition-all duration-[250ms] ease-out" name="material-symbols:keyboard-arrow-down-rounded" :class="{ 'rotate-180': isOpen }"></icon>
            </div>
        </div>
        <Transition v-if="bp.greater('md').value" name="fade" mode="out-in" appear>
            <div v-if="isOpen" ref="panelEl" class="panel-container" :style="{ ...floatingStyles, width: matchWidth ? rootEl?.getBoundingClientRect()?.width + 'px' : undefined }">
                <slot name="panel" :close="close"></slot>
            </div>
        </Transition>

        <Modal v-else ref="modalEl" @close="() => (open = false)" :sheet-class="[sheetClass ?? '']">
            <template #content>
                <div ref="panelEl" class="text-base">
                    <slot name="panel" :close="close"></slot>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script lang="ts" setup>
import { autoPlacement, autoUpdate, offset, shift, useFloating, type Placement } from "@floating-ui/vue";
import { breakpointsTailwind, onClickOutside, useBreakpoints } from "@vueuse/core";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import type { ModalElement } from "../lib/types";

const bp = useBreakpoints(breakpointsTailwind);
const open = ref(false);
const triggerEl = ref<HTMLElement>();
const rootEl = ref<HTMLElement>();
const panelEl = ref<HTMLElement>();
const modalEl = ref<ModalElement>();

const activeBp = computed(() => bp.active().value);
const isDev = computed(() => import.meta.dev);
watch(activeBp, (val) => {
    if (val === "sm") close();
});

onClickOutside(rootEl, (ev) => {
    const targetEl = ev.target as HTMLElement;
    if (!triggerEl.value?.contains(targetEl) && !panelEl.value?.contains(targetEl) && !modalEl.value?.el?.contains(targetEl)) {
        open.value = false;
    }
});
const props = withDefaults(
    defineProps<{
        overrideOpen?: boolean;
        arrow?: boolean;
        placements?: Placement[];
        teleportTarget?: string;
        matchWidth?: boolean;
        sheetClass?: string;
        preventHeightShrink?: boolean;
    }>(),
    {
        teleportTarget: "#modal-layer",
        overrideOpen: undefined,
        arrow: false,
        preventHeightShrink: false,
        matchWidth: false,
    }
);
const isOpen = computed(() => (props.overrideOpen !== undefined ? props.overrideOpen : open.value));
watch(open, () => {
    if (bp.greater("md").value) return;
    if (open.value) {
        modalEl.value?.open();
    } else {
        modalEl.value?.close();
    }
});

function toggleOpen() {
    // if (open.value) return;
    open.value = !open.value;
    console.log(open.value);
}
function close() {
    open.value = false;
}

const { floatingStyles } = useFloating(rootEl, panelEl, {
    middleware: [offset(8), shift({ padding: 16 }), autoPlacement({ allowedPlacements: props.placements })],
    whileElementsMounted: autoUpdate,
});

onMounted(() => {
    window.addEventListener("click", onWindowClick);
});

onUnmounted(() => {
    window.removeEventListener("click", onWindowClick);
});

function onWindowClick(ev: MouseEvent) {
    // const el = ev.target as HTMLElement;
    // if (!rootEl.value?.contains(el) && open.value && ((panelEl.value && !panelEl.value.contains(el)) || (modalEl.value && !modalEl.value.el?.contains(el)))) {
    //     open.value = false;
    // }
}
defineExpose<{ close: () => void }>({ close: () => close() });
</script>

<style lang="css" scoped>
.panel-container {
    z-index: 2000 !important;
    @apply absolute w-fit left-[var(--x)] top-[var(--y)] bg-base-100 rounded-btn p-4 border border-base-content/10 shadow;
}
</style>
