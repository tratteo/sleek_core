import l from "lodash";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useToast = defineStore("toast", () => {
  const toasts = ref([]);
  function dismiss(id) {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }
  const add = (data) => {
    data.type ??= "info";
    data.duration ??= 8e3;
    data.dismissible ??= true;
    const id = l.uniqueId();
    if (data.persistent) {
      data.dismissible = true;
    }
    toasts.value.push({ id, data });
    if (!data.persistent) {
      setTimeout(() => dismiss(id), data.duration);
    }
  };
  return { add, toasts, dismiss };
});
