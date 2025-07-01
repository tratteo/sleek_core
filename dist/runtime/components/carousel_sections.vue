<template>
    <div class="flex flex-col xl:flex-row lg:gap-16 gap-4 items-center xl:items-stretch justify-center w-full">
        <div class="flex flex-col items-start xl:max-w-2xl gap-2">
            <div class="flex flex-col items-stretch gap-0">
                <div :style="{ '--c': e.color }" v-for="(e, i) in sections" @click="(ev) => next(i, ev.target)" class="carousel" :class="{ 'opacity-50': i !== selected }">
                    <input type="radio" :checked="i === selected" />

                    <div :id="`carousel-widget-${i}`" class="collapse-title">
                        <SolidIcon :name="e.icon" class="text-[var(--c)] bg-[var(--c)]"></SolidIcon>
                        {{ e.title }}
                    </div>
                    <div class="collapse-content px-0">
                        <p>{{ e.description }}</p>
                    </div>
                    <motion.div
                        v-if="selected === i"
                        class="absolute bottom-0 h-[2px] w-full rounded-full origin-left bg-[var(--c)]"
                        :initial="{ scaleX: 0 }"
                        :animate="{ scaleX: 1, transition: { duration: e.duration / 1e3, type: 'tween', ease: 'linear' } }"
                    ></motion.div>

                    <div v-if="selected === i" class="w-full xl:hidden rounded-box border border-base-content/20 shadow overflow-clip flex-col flex items-center">
                        <video v-if="sections.at(i)?.type === 'video'" :src="sections.at(i)?.asset" muted autoplay class="rounded-box"></video>
                        <div v-else-if="sections.at(i)?.type === 'image'" class="p-4">
                            <img :src="sections.at(i)?.asset" alt="" class="" />
                        </div>
                        <div v-else class="p-4">
                            <component :is="sections.at(i)?.asset"></component>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hidden xl:flex relative w-full justify-center items-stretch">
            <motion.div
                :key="selected"
                class="relative w-full rounded-box border border-base-content/20 shadow h-[30rem] overflow-clip flex items-center"
                :initial="{ transform: 'translateY(8px)', opacity: 0 }"
                :animate="{ transform: 'translateY(0px)', opacity: 1 }"
                :transition="{ duration: 0.6, type: 'spring', bounce: 0.3 }"
            >
                <video v-if="sections.at(selected)?.type === 'video'" :src="sections.at(selected)?.asset" muted autoplay class="w-full h-full object-cover rounded-box"></video>
                <div v-else-if="sections.at(selected)?.type === 'image'" class="object-contain p-4">
                    <img :src="sections.at(selected)?.asset" alt="" class="" />
                </div>
                <div v-else class="w-full h-full object-cover p-4">
                    <component :is="sections.at(selected)?.asset"></component>
                </div>
            </motion.div>
        </div>
    </div>
</template>

<script setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { motion } from "motion-v";
import { onMounted, ref } from "vue";
const bp = useBreakpoints(breakpointsTailwind);
const props = defineProps({
  sections: { type: Array, required: true }
});
const selected = ref(0);
let timeout;
function next(index, el) {
  if (index !== void 0 && index === selected.value) return;
  index ??= selected.value + 1;
  selected.value = index % props.sections.length;
  clearTimeout(timeout);
  if (bp.smallerOrEqual("lg").value && el) {
    requestAnimationFrame(() => {
      el.scrollIntoView();
    });
  }
  timeout = setTimeout(next, props.sections[selected.value].duration);
}
onMounted(() => {
  timeout = setTimeout(next, props.sections[selected.value].duration);
});
</script>

<style scoped>
.indicator{@apply absolute bottom-0 h-[2px] w-full rounded-full origin-left duration-1000 bg-[var(--c)]}.carousel{@apply relative collapse border-t-0 border-b border-r-0 border-l-0 rounded-none duration-0 lg:duration-[250ms] py-2 select-none transition-all ease-out !important}.carousel .collapse-title{@apply font-bold px-0 origin-left transition-all flex items-center gap-2 duration-[250ms] ease-out !important}.points-list{@apply flex flex-col items-stretch gap-4 font-medium}.points-list li{@apply flex flex-row items-center gap-2}.points-list li .iconify{@apply text-current}.points-list li p{@apply text-base-content}
</style>
