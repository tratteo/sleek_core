<template>
    <div v-if="mounted" role="alert" class="alert-class" :style="getStyle">
        <icon :name="getIconName" class="text-[var(--c)]"></icon>
        <div class="flex-1 flex items-stretch overflow-hidden">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { computed, useMounted } from "#imports";
import { daisyUiColorHex, daisyUiColorRgba, hexToRgba } from "../lib/colors";
const props = defineProps({
  type: { type: String, required: false, default: "info" },
  outlined: { type: Boolean, required: false }
});
const mounted = useMounted();
const getIconName = computed(() => {
  switch (props.type) {
    case "error":
      return "ph:minus-circle-fill";
    case "warning":
      return "material-symbols:warning-rounded";
    case "info":
      return "material-symbols:info-rounded";
    case "tip":
      return "material-symbols:tips-and-updates-rounded";
    case "success":
      return "material-symbols:check-circle-rounded";
  }
});
const getStyle = computed(() => {
  switch (props.type) {
    case "error":
      var c = daisyUiColorHex("--er");
      var cContent = daisyUiColorHex("--erc");
      return {
        "--c": props.outlined ? c : cContent,
        "border-color": c,
        "border-width": "1px",
        "background-color": props.outlined ? daisyUiColorRgba("--er", 0.05) : c,
        color: props.outlined ? daisyUiColorHex("--bc") : cContent
      };
    case "warning":
      var c = daisyUiColorHex("--wa");
      var cContent = daisyUiColorHex("--wac");
      return {
        "--c": props.outlined ? c : cContent,
        "border-color": c,
        "border-width": "1px",
        "background-color": props.outlined ? daisyUiColorRgba("--wa", 0.05) : c,
        color: props.outlined ? daisyUiColorHex("--bc") : cContent
      };
    case "tip":
      var color = "#a684ff";
      var cContent = daisyUiColorHex("--bc");
      return {
        "--c": props.outlined ? color : cContent,
        "border-color": color,
        "border-width": "1px",
        "background-color": props.outlined ? hexToRgba(color, 0.05) : color,
        color: props.outlined ? daisyUiColorHex("--bc") : cContent
      };
    case "info":
      var c = daisyUiColorHex("--in");
      var cContent = daisyUiColorHex("--inc");
      return {
        "--c": props.outlined ? c : cContent,
        "border-color": c,
        "border-width": "1px",
        "background-color": props.outlined ? daisyUiColorRgba("--in", 0.05) : c,
        color: props.outlined ? daisyUiColorHex("--bc") : cContent
      };
    case "success":
      var c = daisyUiColorHex("--su");
      var cContent = daisyUiColorHex("--suc");
      return {
        "--c": props.outlined ? c : cContent,
        "border-color": c,
        "border-width": "1px",
        "background-color": props.outlined ? daisyUiColorRgba("--su", 0.05) : c,
        color: props.outlined ? daisyUiColorHex("--bc") : cContent
      };
  }
});
</script>

<style>
.alert-class{@apply flex flex-col md:flex-row items-center rounded-box px-4 py-2 md:py-4 gap-2 md:gap-4}
</style>
