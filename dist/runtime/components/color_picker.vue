<template>
    <label class="input input-bordered flex items-center gap-2">
        <input type="color" class="" placeholder="Pick a color" v-model="color" />
        <p class="grow">{{ color?.toLocaleUpperCase() }}</p>
    </label>
</template>

<script setup>
const color = defineModel({ type: String });
</script>

<style scoped>
input[type=color]{@apply rounded-btn}
</style>
