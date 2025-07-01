<template>
    <div class="w-full flex flex-col items-center gap-4">
        <div class="overflow-x-auto scrollbar-display w-full">
            <slot :items="shownItems"></slot>
        </div>
        <button v-if="props.items.length > shownItems.length" @click="showMore" class="link link-hover link-primary">Load more</button>
    </div>
</template>

<script setup>
import l from "lodash";
import { onMounted, ref, watch } from "vue";
const props = defineProps({
  pageSize: { type: Number, required: false, default: 20 },
  items: { type: Array, required: true }
});
const shownItems = ref([]);
const pageIndex = ref(0);
watch(
  () => props.items,
  () => {
    pageIndex.value = 0;
    showMore();
  },
  { deep: true }
);
onMounted(() => {
  showMore();
});
function showMore() {
  pageIndex.value += 1;
  shownItems.value = l.take(props.items, props.pageSize * pageIndex.value);
}
</script>
