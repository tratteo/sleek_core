<template>
    <div class="fixed bottom-[1rem] w-full z-[1000] pointer-events-none md:px-[1rem] px-2">
        <AnimatePresence as="div" :initial="false" class="w-full flex flex-col items-center md:items-end overflow-y-auto max-h-[85svh]">
            <motion.div
                v-for="(t, i) in toasts"
                :key="t.id"
                :initial="{ opacity: 0, height: 0 }"
                :animate="{
  height: 'auto',
  opacity: 1,
  transition: {
    duration: 0.5,
    type: 'spring',
    bounce: 0.4,
    opacity: { delay: 0.075 }
  }
}"
                :exit="{ opacity: 0, height: 0 }"
                :transition="{
  duration: 0.4,
  type: 'spring',
  bounce: 0,
  opacity: { duration: 0.2 }
}"
            >
                <div class="md:py-2 py-1 pointer-events-auto max-w-[40rem]">
                    <Toast :toast-data="t" class="w-fit h-[inherit]"></Toast>
                </div>
            </motion.div>
        </AnimatePresence>
    </div>
</template>

<script setup>
import { AnimatePresence, motion } from "motion-v";
import { toRefs } from "vue";
import { useToast } from "../composables/stores/toast";
const { toasts } = toRefs(useToast());
</script>
