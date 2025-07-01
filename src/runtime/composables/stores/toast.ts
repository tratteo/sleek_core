import l from "lodash";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { WithId } from "~/src/runtime/lib/decorators";
import type { ToastData } from "../../lib/types";

export const useToast = defineStore("toast", () => {
    const toasts = ref<WithId<ToastData>[]>([]);

    function dismiss(id: string) {
        toasts.value = toasts.value.filter((t) => t.id !== id);
    }

    const add = (data: ToastData) => {
        data.type ??= "info";
        data.duration ??= 8000;
        data.dismissible ??= true;
        const id = l.uniqueId();
        if (data.persistent) {
            data.dismissible = true;
        }
        toasts.value.push({ id: id, data: data });
        if (!data.persistent) {
            setTimeout(() => dismiss(id), data.duration);
        }
    };

    return { add, toasts, dismiss };
});
