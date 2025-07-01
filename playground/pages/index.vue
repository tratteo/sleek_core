<template>
    <div class="w-full flex flex-col items-center pt-16 gap-8">
        <h1 class="tp-2xl">Headline 1</h1>
        <h2 class="tp-xs">Headline 2</h2>
        <h3>Headline 3</h3>
    </div>
</template>

<script lang="ts" setup>
import { listGenerate } from "@sleek/data";

const toast = useToast();

const elements = listGenerate(100, (i) => i);

function showToast() {
    toast.add({
        message: "Evvai cristo iddio i toasts",
        type: "success",

        dismissible: true,
        persistent: true,
    });
}
</script>

<style></style>
