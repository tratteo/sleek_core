<template>
    <label class="input input-bordered flex items-center gap-2">
        <input type="color" class="" placeholder="Pick a color" v-model="color" />
        <p class="grow">{{ color?.toLocaleUpperCase() }}</p>
    </label>
</template>

<script lang="ts" setup>
const color = defineModel<string>();
</script>

<style lang="css" scoped>
input[type="color"] {
    @apply rounded-btn;
}
</style>
