<template>
    <div class="w-full card card-bordered border-base-content/20 bg-base-200 card-compact">
        <div class="card-body relative">
            <div class="absolute top-2 right-2 flex items-center gap-2 justify-between w-full">
                <slot name="title" v-if="slots.title"></slot>
                <button class="ml-auto btn btn-ghost btn-square btn-sm" @click="copy">
                    <icon v-if="!copied" name="material-symbols:content-copy-outline-rounded"></icon>
                    <icon v-else name="material-symbols:check-circle-rounded" class="text-success"></icon>
                </button>
            </div>
            <div v-if="highlightedCode" v-html="highlightedCode" class="overflow-x-auto scrollbar-display mt-2"></div>
            <div v-else class="flex items-center gap-2"><icon name="svg-spinners:bouncing-ball"></icon></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useClipboard } from "#imports";
import { codeToHtml, type BuiltinLanguage, type BuiltinTheme } from "shiki";
import { ref, useSlots, watch } from "vue";

const props = withDefaults(defineProps<{ code: string; lang?: BuiltinLanguage | undefined; theme?: BuiltinTheme | undefined; title?: string }>(), {
    theme: "github-dark",
});
const clipboard = useClipboard();
const copied = ref(false);
const slots = useSlots();
let highlightedCode = ref();

watch(
    () => props.code,
    async () => {
        highlightedCode.value = await codeToHtml(props.code, {
            lang: props.lang ?? "js",
            theme: props.theme,
            transformers: [
                {
                    pre(node: any) {
                        node.properties.style += `overflow: hidden;`;
                        node.properties.style += `background-color: transparent;`;
                    },
                },
            ],
        });
    },
    { immediate: true }
);

function copy() {
    clipboard.copy(props.code);
    copied.value = true;
    setTimeout(() => {
        copied.value = false;
    }, 2000);
}
</script>

<style></style>
