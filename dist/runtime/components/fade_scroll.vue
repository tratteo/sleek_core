<template>
    <motion.div
        :initial="{ opacity: 0, marginTop, marginLeft, marginRight }"
        :whileInView="{ opacity: 1, marginTop: 0, marginLeft: 0, marginRight: 0 }"
        :transition="{ duration: 0.6, type: 'tween', ease: 'easeOut' }"
        :inViewOptions="{ once: true, margin: '0px 0px -50% 0px' }"
        class="w-full"
    >
        <slot></slot>
    </motion.div>
</template>

<script setup>
import { motion } from "motion-v";
const props = defineProps({
  marginTop: { type: Number, required: false, default: 64 },
  marginLeft: { type: Number, required: false, default: 0 },
  marginRight: { type: Number, required: false, default: 0 }
});
</script>
