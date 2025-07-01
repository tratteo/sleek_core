<template>
    <div class="collapse-container">
        <div class="collapse-trigger cursor-pointer select-none" @click="toggle" :class="{ active: isOpen }">
            <slot name="trigger">
                {{ title }}
            </slot>
            <icon name="material-symbols:expand-more-rounded" class="transition-all duration-300 ease-out" :class="{ 'rotate-180': isOpen }"></icon>
        </div>

        <div ref="content" class="overflow-hidden transition-[height] ease-in-out" :style="{ height: contentHeight, transitionDuration: addAnimation ? '250ms' : '0ms' }">
            <div ref="inner" class="p-4">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
const props = defineProps({
  title: {
    type: String,
    default: "Click to expand"
  },
  initialOpen: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(["changed"]);
const isOpen = ref(props.initialOpen);
const content = ref(null);
const inner = ref(null);
const addAnimation = ref(false);
const contentHeight = ref("0px");
const updateHeight = () => {
  if (!content.value || !inner.value) return;
  contentHeight.value = isOpen.value ? `${inner.value.offsetHeight}px` : "0px";
};
const toggle = () => {
  isOpen.value = !isOpen.value;
  emit("changed", isOpen.value);
};
onMounted(() => {
  const resizeObserver = new ResizeObserver(() => {
    updateHeight();
  });
  if (inner.value) {
    resizeObserver.observe(inner.value);
  }
  updateHeight();
  requestAnimationFrame(() => {
    addAnimation.value = true;
  });
});
watch(isOpen, () => {
  updateHeight();
});
</script>

<style scoped>
.collapse-container{@apply w-full rounded-box border border-base-content/20 bg-base-100 overflow-hidden}.collapse-trigger{@apply bg-base-100 justify-between flex p-4 items-center}
</style>
