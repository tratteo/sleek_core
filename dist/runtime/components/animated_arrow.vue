<template>
    <div class="flex flex-row items-center group">
        <slot></slot>
        <div class="icon-wrapper">
            <div class="arrow-line"></div>
            <icon class="arrow-head" name="iconamoon:arrow-right-2"></icon>
        </div>
    </div>
</template>

<style scoped>
*{--length:12px;--icon-size:24px;--anim-duration:200ms}.icon-wrapper{@apply relative h-[var(--icon-size)] w-[var(--icon-size)]}.arrow-line{transition:all var(--anim-duration) ease-out;width:var(--length);@apply absolute top-[50%] left-[58%] translate-y-[-50%] origin-left h-[2px] scale-x-0 rounded-full bg-current  group-hover:scale-100;@apply absolute top-[50%] left-[58%] translate-y-[-50%] origin-left h-[2px] scale-x-0 rounded-full bg-current group-hover:scale-100}.arrow-head{height:var(--icon-size);transition:all var(--anim-duration) ease-out;width:var(--icon-size);@apply absolute top-[50%] translate-y-[-50%] left-0 text-current  group-hover:left-[var(--length)]}
</style>
