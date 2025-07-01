<template>
    <div class="relative">
        <AsyncOpButton>Date</AsyncOpButton>
        <NuxtPage></NuxtPage>
    </div>
</template>

<script setup lang="ts">
const dayjs = useDayjs();
onMounted(() => {
    const d = dayjs.duration(dayjs().diff(dayjs().subtract(1, "day")));
    console.log(d.asHours());
});
</script>
<style lang="css" scoped></style>
