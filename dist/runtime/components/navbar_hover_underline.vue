<template>
    <div class="relative w-full">
        <nav class="relative flex flex-col overflow-auto">
            <div ref="tabsWrapperEl" class="flex flex-row items-center w-fit z-[10]">
                <div v-for="(s, i) in sections" @mouseenter="(ev) => hoveredIndex = i" class="relative">
                    <NuxtLink :id="s.path" :to="s.path" class="px-4 flex flex-row h-[2rem] items-center gap-2 text-sm">
                        {{ s.title }}
                    </NuxtLink>
                    <motion.div
                        v-if="selectedIndex === i"
                        :layout-id="id"
                        :initial="false"
                        class="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-btn z-[0]"
                        :transition="{ type: 'tween', duration: 0.2, ease: [0.5, 1, 0.89, 1] }"
                    ></motion.div>
                    <AnimatePresence>
                        <motion.div
                            :key="i"
                            :layout-id="hoverId"
                            v-if="hoveredIndex === i && navbarHovered"
                            class="absolute bg-base-200 opacity-75 inset-0 rounded-btn z-[-1]"
                            :initial="{ opacity: 0 }"
                            :exit="{ opacity: 0 }"
                            :transition="{ type: 'tween', duration: 0.2, ease: [0.5, 1, 0.89, 1] }"
                            :animate="{ opacity: 1 }"
                        ></motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </nav>
        <div class="absolute bottom-0 right-0 left-0 h-[1px] bg-base-content/20 z-[100]"></div>
    </div>
</template>

<script setup>
import { useRoute } from "#app";
import { useElementHover } from "#imports";
import l from "lodash";
import { motion } from "motion-v";
import { ref, watch } from "vue";
import { shortUid } from "../lib/string";
const selectedIndex = ref(0);
const hoveredIndex = ref(0);
const props = defineProps({
  sections: { type: Array, required: true }
});
const id = shortUid(props.sections);
const hoverId = shortUid(props.sections + "hover");
const tabsWrapperEl = ref();
const navbarHovered = useElementHover(tabsWrapperEl);
const route = useRoute();
watch(route, updateSelectedElement, { immediate: true });
function updateSelectedElement() {
  const match = props.sections.findIndex((s) => route.path === s.path);
  if (match >= 0) {
    selectedIndex.value = match;
  } else {
    const max = l.maxBy(
      props.sections.filter((s) => route.path.startsWith(s.path)),
      (s) => s.path.length
    );
    if (!max) return;
    selectedIndex.value = props.sections.indexOf(max);
  }
}
</script>

<style scoped>
.root-wrapper{@apply h-full flex flex-col items-stretch justify-start w-full px-4 lg:px-16 py-6 gap-2}.tab-indicator{transition-property:all;transition-timing-function:cubic-bezier(.5,1,.89,1);@apply absolute bg-primary h-[3px] bottom-0 duration-[200ms] rounded-t-full}
</style>
