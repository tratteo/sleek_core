<template>
    <details v-if="mounted" ref="rootEl" class="dropdown relative select-none">
        
        <summary :data-size="size" class="w-full btn data-[size='sm']:btn-sm data-[size='xs']:btn-xs btn-outline list-none no-animation min-w-[inherit] max-w-[inherit]">
            <input tabindex="-1" :required="required" :value="model" class="absolute opacity-0 inset-0 pointer-events-none" ></input>
            <div class="relative w-full justify-start flex items-center gap-2">
                <slot v-if="slots.button" name="button" :value="model" :formatter="formatter"></slot>
                <div v-else type="button" class="flex justify-start items-center w-full text-start">
                    <p v-if="placeholder && !model" class="opacity-75">{{ placeholder }}</p>
                    <p v-else>
                        {{ formatter?.(model) ?? model }}
                    </p>
                    <div class="flex items-center gap-2 ml-auto">
                        <button v-if="clearBtn && model" class="btn btn-sm btn-circle btn-ghost" @click="clear">
                            <icon name="material-symbols:close-rounded"></icon>
                        </button>
                    </div>
                </div>
                <icon name="material-symbols:keyboard-arrow-down-rounded" class="transition-all duration-150 ease-out ml-auto" :class="{ 'rotate-180': open }"></icon>
            </div>
        </summary>

        <Teleport to="#modal-layer" :disabled="!teleport" v-if="bp.greaterOrEqual('md').value">
            <div
                v-if="open"
                ref="panelEl"
                :style="floatingStyles"
                class="dropdown-content menu menu-vertical flex flex-col items-stretch bg-base-100 z-[100] shadow-lg border border-base-content/20 p-2 rounded-btn gap-2 min-w-fit"
            >
                <label v-if="searchParams" class="input input-bordered flex bg-base-200 items-center gap-2 w-full">
                    <icon name="material-symbols:search-rounded"></icon>
                    <input type="text" class="grow" placeholder="Cerca" v-model="searchQuery" />
                </label>
                <slot name="header"></slot>
                <ul class="max-h-[20rem] scrollbar-display overflow-y-auto flex flex-col items-stretch text-sm">
                    <li v-for="(el, i) in filteredItems" @click="(ev) => elementClicked(el, i)" class="">
                        <slot v-if="slots.item" name="item" :item="el" :index="i"></slot>
                        <a v-else>{{ formatter?.(el) ?? el }}</a>
                    </li>
                </ul>
            </div>
        </Teleport>

        <Modal v-else ref="modalEl" @close="() => (open = false)" maintain-height>
            <template #header>
                <div class="flex flex-col items-stretch gap-2">
                    <slot name="header"></slot>
                    <label v-if="searchParams" class="input input-bordered flex bg-base-200 items-center gap-2 w-full">
                        <icon name="material-symbols:search-rounded"></icon>
                        <input type="text" class="grow" placeholder="Cerca" v-model="searchQuery" />
                    </label>
                </div>
            </template>
            <template #content>
                <div class="w-full flex flex-col items-stretch gap-2">
                    <div v-if="props.items.length > 0" class="w-full">
                        <ul class="flex-col flex flex-wrap items-stretch justify-center gap-2">
                            <li
                                :aria-label="`select ${formatter?.(i) ?? i?.toString()}`"
                                v-for="(i, index) in filteredItems"
                                class="element-button"
                                @click="elementClicked(i, index)"
                            >
                                <slot v-if="slots.item" name="item" :item="i" :index="index"></slot>
                                <p v-else>
                                    {{ formatter?.(i) ?? i?.toString() }}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </template>
        </Modal>
    </details>
</template>

<script lang="ts" setup generic="T extends any">
import { autoPlacement, autoUpdate, offset, useFloating } from "@floating-ui/vue";
import { breakpointsTailwind, onClickOutside, useBreakpoints, useMounted, useMutationObserver } from "@vueuse/core";
import Fuse, { type IFuseOptions } from "fuse.js";
import { computed, onMounted, ref, useSlots, watch } from "vue";
import { isNullOrEmpty } from "../lib/string";
import type { ModalElement } from "../lib/types";

const bp = useBreakpoints(breakpointsTailwind);
const mounted = useMounted();
const rootEl = ref<HTMLElement>();
const modalEl = ref<ModalElement>();
const open = ref(false);
const slots = useSlots();
const model = defineModel<T>();
const panelEl = ref<HTMLElement>();
const searchQuery = ref<string>();
let fuse: Fuse<T>;

const filteredItems = computed(() => {
    if (!props.searchParams || isNullOrEmpty(searchQuery.value)) return props.items;
    const res = fuse.search(searchQuery.value!);
    return res.map((i) => i.item);
});

const props = withDefaults(
    defineProps<{
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
    }>(),
    {
        size: "md",
        initialValue: undefined,
        teleport: false,
        closeOnSelect: true,
        selectFirst: true,
        placeholder: "Select",
        clearBtn: false,
    }
);
watch(
    () => props.searchParams,
    () => {
        fuse = new Fuse(props.items, { keys: props.searchParams?.keys ?? [] });
    }
);
watch(
    () => props.items,
    () => {
        fuse = new Fuse(props.items, { keys: props.searchParams?.keys ?? [] });
    },
    { deep: true, immediate: true }
);

onClickOutside(rootEl, () => {
    open.value = false;
});
useMutationObserver(
    rootEl,
    (_) => {
        open.value = rootEl.value?.hasAttribute("open") ?? false;
    },
    { attributeFilter: ["open"], attributes: true }
);

watch(open, () => {
    rootEl.value?.toggleAttribute("open", open.value);
    if (open.value) {
        searchQuery.value = undefined;
        modalEl.value?.open();
    } else {
        modalEl.value?.close();
    }
});

const { floatingStyles } = useFloating(rootEl, panelEl, {
    middleware: [offset(4), autoPlacement({ allowedPlacements: ["bottom", "bottom-start", "bottom-end", "top-start", "top-end", "top"] })],
    whileElementsMounted: autoUpdate,
});

onMounted(() => {
    if (!model.value && props.initialValue) {
        model.value = props.initialValue;
    } else if (props.items.length > 0 && !model.value && props.selectFirst) {
        model.value = props.items.at(0);
    }
});

const emit = defineEmits<{
    (e: "changed", value: any, index: number): void;
}>();
function clear() {
    model.value = undefined;
    emit("changed", undefined, -1);
    if (props.closeOnSelect) {
        open.value = false;
    }
    modalEl.value?.close();
}
function elementClicked(element: any, index: number) {
    model.value = element;
    emit("changed", element, index);
    if (props.closeOnSelect) {
        open.value = false;
        modalEl.value?.close();
    }
}
</script>

<style lang="css" scoped>
.element-button {
    @apply btn bg-transparent hover:bg-base-200 shadow-none border-base-content/20;
}
</style>
