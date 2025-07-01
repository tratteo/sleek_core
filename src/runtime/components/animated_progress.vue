<template>
    <div class="relative w-full bg-base-200 rounded-full overflow-clip">
        <div class="absolute inset-0 bg-current rounded-full transition-all ease-out" :style="{ right: 100 - value + '%', transitionDuration: duration }"></div>
    </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{ value: number; duration?: string }>(), { duration: "400ms" });
</script>

<style></style>
