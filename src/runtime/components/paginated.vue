<template>
    <div class="w-full flex flex-col items-center gap-4">
        <div class="overflow-x-auto scrollbar-display w-full">
            <slot :items="shownItems"></slot>
        </div>
        <button v-if="props.items.length > shownItems.length" @click="showMore" class="link link-hover link-primary">Load more</button>
    </div>
</template>

<script lang="ts" setup generic="T">
import l from "lodash";
import { onMounted, ref, watch } from "vue";
const props = withDefaults(defineProps<{ pageSize?: number; items: T[] }>(), { pageSize: 20 });
const shownItems = ref<T[]>([]);
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

<style></style>
