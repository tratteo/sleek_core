import { onMounted, onUnmounted, ref } from "vue";
export const useScrollProgress = () => {
  const x = ref(0);
  const y = ref(0);
  const isScrolling = ref(false);
  const xDirection = ref(1);
  const yDirection = ref(1);
  const rootScrollable = ref();
  onUnmounted(() => {
    rootScrollable.value?.removeEventListener("scroll", onScroll);
    rootScrollable.value?.removeEventListener("scrollend", onScrollEnd);
    document.removeEventListener("scroll", onScroll);
    document.removeEventListener("scrollend", onScrollEnd);
  });
  onMounted(() => {
    rootScrollable.value = document.documentElement;
    document.addEventListener("scroll", onScroll);
    document.addEventListener("scrollend", onScrollEnd);
    rootScrollable.value?.addEventListener("scroll", onScroll);
    rootScrollable.value?.addEventListener("scrollend", onScrollEnd);
  });
  function onScroll(event) {
    if (!rootScrollable.value) return;
    if (!isScrolling.value) {
      isScrolling.value = true;
    }
    let newY = rootScrollable.value.scrollTop / (rootScrollable.value.scrollHeight - rootScrollable.value.offsetHeight);
    let newX = rootScrollable.value.scrollLeft / (rootScrollable.value.scrollWidth - rootScrollable.value.offsetWidth);
    newX = Number.isNaN(newX) ? 0 : newX;
    newY = Number.isNaN(newY) ? 0 : newY;
    xDirection.value = Math.sign(newX - x.value);
    yDirection.value = Math.sign(newY - y.value);
    x.value = newX;
    y.value = newY;
  }
  function onScrollEnd(event) {
    isScrolling.value = false;
  }
  return { x, y, isScrolling, xDirection, yDirection };
};
