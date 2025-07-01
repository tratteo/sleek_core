// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    imports: {
        dirs: ["composables/**/*"],
        global: true,
    },

    modules: ["@nuxt/fonts", "@nuxt/icon", "@nuxt/image", "@nuxt/scripts", "@nuxt/content", "@nuxtjs/tailwindcss", "@pinia/nuxt", "@vueuse/nuxt", "motion-v/nuxt"],
});
