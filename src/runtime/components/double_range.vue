<template>
    <div class="relative h-[2rem] w-full" @click="update">
        <div class="bg-base-content/10 rounded-full top-[50%] h-[0.5rem] translate-y-[-50%] absolute w-full" ref="trackRef"></div>
        <div class="absolute top-[50%] translate-y-[-50%] bg-primary rounded-full h-[1.5rem]" :style="{ left: `${progressLeft}%`, width: `${progressWidth}%` }">
            <div class="relative w-full h-full">
                <div left class="range-slider-thumb-hit" @mousedown="startDrag($event, 'min')" @touchstart="startDrag($event, 'min')">
                    <div left class="range-slider-thumb"></div>
                </div>
                <div right class="range-slider-thumb-hit" @mousedown="startDrag($event, 'max')" @touchstart="startDrag($event, 'max')">
                    <div right class="range-slider-thumb"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
    min: {
        type: Number,
        default: 0,
    },
    max: {
        type: Number,
        default: 100,
    },
    step: {
        type: Number,
        default: 1,
    },
    initialMin: {
        type: Number,
        default: 25,
    },
    initialMax: {
        type: Number,
        default: 75,
    },
});

const emit = defineEmits<{ (e: "change", min: number, max: number): void }>();

const model = defineModel<[number, number]>();

const trackRef = ref<HTMLElement>();
const minValue = ref(props.initialMin);
const maxValue = ref(props.initialMax);
const activeDrag = ref<string | null>(null);

// Calculate the position percentage for each thumb
const minThumbPosition = computed(() => {
    return ((minValue.value - props.min) / (props.max - props.min)) * 100;
});

const maxThumbPosition = computed(() => {
    return ((maxValue.value - props.min) / (props.max - props.min)) * 100;
});

// Calculate progress bar position and width
const progressLeft = computed(() => minThumbPosition.value);
const progressWidth = computed(() => {
    return maxThumbPosition.value - minThumbPosition.value;
});

// Handle dragging logic
function startDrag(event: any, thumb: string) {
    event.preventDefault();
    activeDrag.value = thumb;
    document.addEventListener("mousemove", update);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchmove", update);
    document.addEventListener("touchend", stopDrag);
}

function update(event: any) {
    if (!activeDrag.value || !trackRef.value) return;

    const track = trackRef.value;
    const trackRect = track?.getBoundingClientRect();

    // Get clientX from either mouse or touch event
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    // Calculate position percentage
    let percentage = ((clientX - trackRect.left) / trackRect.width) * 100;
    percentage = Math.min(Math.max(percentage, 0), 100);

    // Calculate value based on percentage, respecting step
    const rawValue = props.min + (percentage / 100) * (props.max - props.min);
    const steppedValue = Math.round(rawValue / props.step) * props.step;

    // Update the appropriate value while maintaining min < max
    if (activeDrag.value === "min") {
        minValue.value = Math.min(steppedValue, maxValue.value - props.step);
    } else {
        maxValue.value = Math.max(steppedValue, minValue.value + props.step);
    }
    model.value = [minValue.value, maxValue.value];
    emit("change", minValue.value, maxValue.value);
}

function stopDrag() {
    document.removeEventListener("mousemove", update);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchmove", update);
    document.removeEventListener("touchend", stopDrag);
}

// Clean up event listeners
onUnmounted(() => {
    document.removeEventListener("mousemove", update);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchmove", update);
    document.removeEventListener("touchend", stopDrag);
});
</script>

<style lang="css" scoped>
.range-slider-thumb-hit {
    @apply absolute top-[50%] translate-y-[-50%] w-12 h-10 cursor-pointer z-[2] flex items-center;
}
.range-slider-thumb-hit[right] {
    @apply right-[1.4rem] justify-start translate-x-[100%];
}
.range-slider-thumb-hit[left] {
    @apply left-[1.4rem] justify-end translate-x-[-100%];
}
.range-slider-thumb {
    @apply size-[1.2rem] bg-base-100 rounded-full cursor-pointer z-[2];
}
</style>
