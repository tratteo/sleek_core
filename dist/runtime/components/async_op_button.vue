<template>
    <LayoutGroup>
        <motion.div layout :transition="layoutTransition">
            <button class="btn" @click="onClick" :disabled="isAwaiting || props.disabled" :class="btnClass">
                <motion.div key="loading-icon" layout v-if="isAwaiting" :variants="iconVariants" initial="hidden" animate="show" :transition="iconTransition">
                    <icon name="svg-spinners:180-ring-with-bg"></icon>
                </motion.div>
                <motion.div key="icon" layout v-else-if="iconName" :variants="iconVariants" initial="hidden" animate="show" :transition="iconTransition">
                    <icon :name="iconName"></icon>
                </motion.div>
                <motion.div key="content" layout :transition="layoutTransition">
                    <slot></slot>
                </motion.div>
            </button>
        </motion.div>
    </LayoutGroup>
</template>

<script setup>
import { LayoutGroup, motion } from "motion-v";
import { computed, ref } from "vue";
const iconVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5
  },
  show: {
    opacity: 1,
    scale: 1
  }
};
const layoutTransition = {
  type: "spring",
  bounce: 0.25,
  duration: 0.4
};
const iconTransition = {
  type: "spring",
  bounce: 0.4,
  duration: 0.3,
  opacity: { delay: 0 }
};
const awaitingPromise = ref(false);
const isAwaiting = computed(() => props.awaiting || awaitingPromise.value);
const props = defineProps({
  iconName: { type: String, required: false },
  awaiting: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  btnClass: { type: String, required: false },
  promise: { type: Function, required: false }
});
const emits = defineEmits(["click"]);
function onClick(ev) {
  emits("click", ev);
  if (!props.promise) return;
  awaitingPromise.value = true;
  props.promise().finally(() => awaitingPromise.value = false);
}
</script>
