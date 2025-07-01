import { addComponentsDir, addImportsDir, addPlugin, createResolver, defineNuxtModule, installModule, useLogger } from "@nuxt/kit";
import { glob } from "glob";
import pkg from "../package.json";
// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: "@sleek/core",
        configKey: "sleek",
        compatibility: {
            nuxt: ">=3.0.0",
        },
    },
    defaults: {},

    async setup(_options, _nuxt) {
        const logger = useLogger("@sleek/core");
        const resolver = createResolver(import.meta.url);

        // inject lib utils
        const runtimeDir = resolver.resolve("./runtime/lib");
        _nuxt.options.alias["@sleek"] = runtimeDir;
        _nuxt.hook("prepare:types", ({ tsConfig }) => {
            if (tsConfig.compilerOptions && tsConfig.compilerOptions.paths) {
                tsConfig.compilerOptions.paths["@sleek/*"] = [`${runtimeDir}/*`];
            }
        });

        const cssFiles = await glob(resolver.resolve("./runtime/assets/css/*.css"));
        _nuxt.options.css.push(...cssFiles);
        //_nuxt.options.css.push(resolver.resolve("./runtime/assets/css/*.css"));

        addPlugin({
            src: resolver.resolve("./runtime/plugins/chart.client"),
            mode: "client",
        });

        addImportsDir([resolver.resolve("./runtime/composables"), resolver.resolve("./runtime/composables/stores")]);

        // INSTALL MODULES
        await installModule("motion-v/nuxt");
        await installModule("@vueuse/nuxt");
        await installModule("@pinia/nuxt");
        await installModule("@nuxt/fonts", {
            defaults: {
                weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
            },
        });
        await installModule("motion-v/nuxt");
        await installModule("@nuxtjs/tailwindcss", { config: "../tailwind.config.ts" });
        await installModule("@nuxt/icon", {
            size: "24px",
            fetchTimeout: 4000,
            clientBundle: { scan: true },
        });

        _nuxt.hook("tailwindcss:config", (tailwindConfig) => {
            // tailwindConfig.plugins = tailwindConfig.plugins || [];
            // tailwindConfig.plugins.push(daisyui);
            tailwindConfig.content = tailwindConfig.content || [];
            if (Array.isArray(tailwindConfig.content)) {
                (tailwindConfig.content as any[]).push(resolver.resolve("./runtime/components/**/*.{vue,js,ts}"));
            } else {
                (tailwindConfig.content as any).files ??= [];
                (tailwindConfig.content as any).files.push(resolver.resolve("./runtime/components/**/*.{vue,js,ts}"));
            }
        });

        // addComponentsDir({
        //     path: resolver.resolve("./runtime/components"),
        //     pathPrefix: false,
        //     global: true,
        // });
        addComponentsDir({
            path: resolver.resolve("./runtime/components"),
            pathPrefix: false,
            global: true,
        });
        logger.info("@sleek/core module built", `v ${pkg.version}`);
    },
});
