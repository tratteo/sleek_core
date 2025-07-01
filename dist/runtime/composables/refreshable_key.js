import { ref } from "vue";
export const useRefreshableKey = () => {
  const key = ref(0);
  const refresh = () => {
    key.value = (key.value + 1) % 2;
  };
  return { key, refresh };
};
