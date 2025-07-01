<template>
    <motion.div
        ref="content"
        class="overflow-y-hidden"
        :animate="{ height: contentHeight }"
        :transition="{ duration: disableAnimation ? 0 : duration, type: 'spring', bounce: 0.25 }"
    >
        <div ref="inner">
            <slot></slot>
        </div>
    </motion.div>
</template>

<script setup>
import { motion } from "motion-v";
import { onMounted, onUnmounted, ref } from "vue";
const props = defineProps({
  initialOpen: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 0.4
  },
  disableAnimation: {
    type: Boolean,
    default: false
  }
});
const content = ref(null);
const inner = ref(null);
const contentHeight = ref("0px");
let resizeObserver = null;
const updateHeight = () => {
  if (!content.value || !inner.value) return;
  contentHeight.value = `${inner.value.offsetHeight + 1}px`;
};
onMounted(() => {
  resizeObserver = new ResizeObserver(() => {
    updateHeight();
  });
  if (inner.value) {
    resizeObserver.observe(inner.value);
  }
  updateHeight();
});
onUnmounted(() => {
  resizeObserver?.disconnect();
});
</script>

<style scoped>
.smooth-container{@apply w-full rounded-box border border-base-content/20 bg-base-100 overflow-hidden}
</style>
