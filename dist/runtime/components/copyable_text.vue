<template>
    <div class="rounded-btn max-w-full w-fit border justify-between border-base-content/25 px-2 py-1 gap-2 flex flex-row items-center">
        <p class="break-all">{{ content }}</p>
        <div class="flex items-center gap-1">
            <button @click="onClick" class="relative btn btn-square btn-sm btn-ghost" title="Copy text" type="button" aria-label="copy content">
                <icon v-if="copied" class="size-6 transition-all duration-150 text-success" name="material-symbols:check-circle-rounded"></icon>
                <icon v-else name="material-symbols:content-copy-outline-rounded" class="size-6 transition-all duration-150"></icon>
            </button>
            <slot v-if="slots.actions" name="actions"></slot>
        </div>
    </div>
</template>

<script setup>
import { useClipboard } from "#imports";
import { ref, useSlots } from "vue";
const clipboard = useClipboard();
const copied = ref(false);
const props = defineProps({
  content: { type: String, required: true }
});
const emit = defineEmits(["click"]);
const slots = useSlots();
function onClick(event) {
  emit("click", props.content, event);
  clipboard.copy(props.content);
  copied.value = true;
  setTimeout(() => {
    console.log(false);
    return copied.value = false;
  }, 1500);
}
</script>
