import { defineStore } from "pinia";
export const useModalController = defineStore("modal-controller", () => {
  const argumentsStore = [];
  const open = (id, arg) => {
    const el = getEl(id);
    loadArg(el, arg);
    el?.showModal();
    return el;
  };
  const close = (id) => {
    const el = getEl(id);
    el?.close();
    return el;
  };
  const queryArg = (el) => {
    if (!el) return void 0;
    return argumentsStore.find((e) => e.el === el)?.data;
  };
  function loadArg(el, data) {
    if (!el) return;
    const match = argumentsStore.find((e) => e.el === el);
    if (match) {
      match.data = data;
    } else {
      argumentsStore.push({ el, data });
    }
  }
  function getEl(id) {
    var el = void 0;
    if (id === void 0) return void 0;
    if (typeof id === "string") {
      el = document.getElementById(id);
    } else {
      el = id;
    }
    if (el && !document.contains(el)) return void 0;
    return el;
  }
  return { open, close, queryArg };
});
