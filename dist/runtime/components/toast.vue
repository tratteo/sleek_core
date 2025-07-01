<template>
    <div class="relative rounded-box overflow-clip shadow">
        <div
            class="relative alert gap-2 flex flex-row bg-base-200 text-start items-center justify-start overflow-clip border"
            :key="toastData.id"
            :class="{
  'border-error/35': toastData.data.type === 'error',
  'border-info/35': toastData.data.type === 'info',
  'border-warning/35': toastData.data.type === 'warning',
  'border-success/35': toastData.data.type === 'success'
}"
        >
            <div class="flex items-start gap-2">
                <icon
                    class="size-6"
                    :name="iconName(toastData.data)"
                    :class="{
  'text-error': toastData.data.type === 'error',
  'text-info': toastData.data.type === 'info',
  'text-warning': toastData.data.type === 'warning',
  'text-success': toastData.data.type === 'success'
}"
                ></icon>
                <div class="flex-1 flex flex-col items-start gap-2 mt-[2px]">
                    <span v-html="toastData.data.message" class="text-sm flex-1 opacity-75"></span>
                    <button v-if="toastData.data.action" @click="toastData.data.action.handler" class="btn btn-sm btn-outline">{{ toastData.data.action.label }}</button>
                </div>
            </div>
            <button v-if="toastData.data.dismissible || true" class="btn btn-xs btn-ghost right-2 top-2 ml-4" @click="toasts.dismiss(toastData.id)" title="Dismiss">
                <!-- <icon name="material-symbols:close-rounded"></icon> -->
                Dismiss
            </button>
            <div
                class="absolute bottom-0 left-0 w-[var(--w)] right-0 bg-base-300 h-[0.3rem] origin-left ease-linear z-[10001]"
                :style="{ 'transition-duration': toastData.data.duration + 'ms', '--w': width }"
            ></div>
        </div>
    </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from "vue";
import { useToast } from "../composables/stores/toast";
const toasts = useToast();
const prop = defineProps({
  toastData: { type: Object, required: true }
});
const width = ref("100%");
onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      width.value = "0%";
    }, 10);
  });
});
function iconName(toast) {
  switch (toast.type) {
    case "error":
      return "ph:minus-circle-fill";
    case "warning":
      return "ic:round-warning";
    case "info":
      return "material-symbols:info-rounded";
    case "success":
      return "material-symbols:check-circle-rounded";
    default:
      return "material-symbols:info-rounded";
  }
}
</script>
