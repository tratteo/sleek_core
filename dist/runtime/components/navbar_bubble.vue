<template>
    <div class="relative">
        <nav class="relative flex flex-col overflow-auto">
            <div ref="tabsWrapperEl" class="flex flex-row items-center w-fit gap-1 z-[10]">
                <div :active="selectedIndex === i" v-for="(s, i) in sections" @mouseenter="(ev) => hoveredIndex = i" class="tab-btn" :style="{ '--c': s.color }">
                    <NuxtLink :id="s.path" :to="s.path" class="flex flex-row h-[2rem] items-center text-sm w-full px-2 font-medium">
                        <icon v-if="s.icon" :name="s.icon"></icon>
                        <p class="tab-label">{{ s.title }}</p>
                    </NuxtLink>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup>
import { useRoute } from "#app";
import l from "lodash";
import { ref, watch } from "vue";
const selectedIndex = ref(0);
const hoveredIndex = ref(0);
const props = defineProps({
  sections: { type: Array, required: true }
});
const tabsWrapperEl = ref();
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
.tab-btn *{transition-timing-function:cubic-bezier(.33,1,.68,1)}.tab-btn .tab-label{interpolate-size:allow-keywords;@apply transition-[width] duration-[200ms] w-auto}.tab-btn[active=true]{background-color:var(--c,oklch(var(--p)));@apply text-primary-content}.tab-btn[active=true] .tab-label{@apply ml-2}.tab-btn[active=false] .tab-label{@apply w-0 opacity-0}.tab-btn{@apply z-[10] overflow-hidden rounded-btn bg-base-300}.root-wrapper{@apply h-full flex flex-col items-stretch justify-start w-full px-4 lg:px-16 py-6 gap-2}
</style>
