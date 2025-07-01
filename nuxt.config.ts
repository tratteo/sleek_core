// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    imports: {
        dirs: ["composables/**/*"],
        global: true,
    },
    dayjs: {
        plugins: ["quarterOfYear", "dayOfYear", "duration", "utc", "relativeTime"],
    },
    modules: ["@nuxt/fonts", "@nuxt/icon", "@nuxtjs/tailwindcss", "@pinia/nuxt", "@vueuse/nuxt", "motion-v/nuxt", "dayjs-nuxt"],
});
