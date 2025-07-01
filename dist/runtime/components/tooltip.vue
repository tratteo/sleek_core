<template>
    <div v-if="mounted">
        <div
            ref="rootEl"
            class="relative items-center flex flex-row gap-2 group cursor-pointer"
            @click="() => modalEl?.open()"
            @mouseenter="hovering = true"
            @mouseleave="hovering = false"
        >
            <icon v-if="infoIcon" class="group-hover:scale-110 transition-all duration-150 opacity-50 ease-out size-6" name="material-symbols:info-outline-rounded"></icon>
            <slot v-if="slots.el" name="el"></slot>
        </div>
        <Modal v-if="bp.smallerOrEqual('md').value" ref="modalEl" :closeAction="false" :actions="false">
            <template #content>
                <div class="w-full flex flex-row items-center justify-stretch">
                    <slot></slot>
                </div>
            </template>
        </Modal>
        <Teleport to="#modal-layer">
            <Transition name="fade" mode="out-in" appear>
                <div ref="floatingEl" v-if="hovering && bp.greater('md').value" class="panel" :style="floatingStyles">
                    <Transition name="slide" appear>
                        <div :style="{ '--y-tr': '4px' }">
                            <slot></slot>
                        </div>
                    </Transition>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup>
import { autoUpdate, offset, shift, useFloating } from "@floating-ui/vue";
import { breakpointsTailwind, useBreakpoints, useMounted } from "@vueuse/core";
import { ref, useSlots } from "vue";
const bp = useBreakpoints(breakpointsTailwind);
const slots = useSlots();
const mounted = useMounted();
const modalEl = ref();
const rootEl = ref();
const floatingEl = ref(null);
const props = defineProps({
  infoIcon: { type: Boolean, required: false, default: true }
});
const hovering = ref(false);
const { floatingStyles } = useFloating(rootEl, floatingEl, {
  middleware: [offset(10), shift({ padding: 8 })],
  placement: "bottom",
  whileElementsMounted: autoUpdate
});
</script>

<style scoped>
.panel{@apply bg-base-100 text-sm border border-base-content/20 rounded-btn px-4 py-4 z-[1000000] max-w-xl overflow-clip}
</style>
