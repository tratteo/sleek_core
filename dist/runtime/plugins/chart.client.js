import { defineNuxtPlugin } from "#app";
import { Chart, registerables } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { logInfo } from "../lib/logger.js";
export default defineNuxtPlugin({
  setup(nuxtApp) {
    Chart.register(...registerables, annotationPlugin);
    logInfo("chartjs plugin initialized");
  }
});
