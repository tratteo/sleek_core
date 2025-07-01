export default defineNuxtConfig({
    compatibilityDate: "2025-06-29",
    modules: ["../src/module", "@nuxtjs/tailwindcss"],
    sleek: {},
    css: ["~/assets/css/tailwind.css"],
    dayjs: {
        plugins: ["duration", "quarterOfYear"],
    },

    devtools: { enabled: true },
});
