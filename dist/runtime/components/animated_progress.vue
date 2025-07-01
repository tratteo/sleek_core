<template>
    <div class="relative w-full bg-base-200 rounded-full overflow-clip">
        <div class="absolute inset-0 bg-current rounded-full transition-all ease-out" :style="{ right: 100 - value + '%', transitionDuration: duration }"></div>
    </div>
</template>

<script setup>
const props = defineProps({
  value: { type: Number, required: true },
  duration: { type: String, required: false, default: "400ms" }
});
</script>
