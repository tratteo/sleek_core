import { defineNuxtPlugin } from "#app";
import { Chart, registerables } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";

export default defineNuxtPlugin({
    setup(nuxtApp) {
        Chart.register(...registerables, annotationPlugin);
    },
});
