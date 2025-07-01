import { defineNuxtModule, createResolver, addPlugin, addImportsDir, installModule, addComponentsDir } from '@nuxt/kit';
import { glob } from 'glob';
import { logSuccess } from '../dist/runtime/lib/logger.js';

const module = defineNuxtModule({
  meta: {
    name: "@sleek/core",
    configKey: "sleek",
    compatibility: {
      nuxt: ">=3.0.0"
    }
  },
  defaults: {},
  async setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);
    const runtimeDir = resolver.resolve("./runtime/lib");
    _nuxt.options.alias["@sleek"] = runtimeDir;
    _nuxt.hook("prepare:types", ({ tsConfig }) => {
      if (tsConfig.compilerOptions && tsConfig.compilerOptions.paths) {
        tsConfig.compilerOptions.paths["@sleek/*"] = [`${runtimeDir}/*`];
      }
    });
    const cssFiles = await glob(resolver.resolve("./runtime/assets/css/*.css"));
    _nuxt.options.css.push(...cssFiles);
    addPlugin({ src: resolver.resolve("./runtime/plugins/dayjs.ts") });
    addPlugin({
      src: resolver.resolve("./runtime/plugins/chart.client.ts"),
      mode: "client"
    });
    addImportsDir([resolver.resolve("./runtime/composables"), resolver.resolve("./runtime/composables/stores")]);
    await installModule("motion-v/nuxt");
    await installModule("@vueuse/nuxt");
    await installModule("@pinia/nuxt");
    await installModule("@nuxt/fonts", {
      defaults: {
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
      }
    });
    await installModule("motion-v/nuxt");
    await installModule("@nuxtjs/tailwindcss", { config: "../tailwind.config.ts" });
    await installModule("@nuxt/content", {
      build: {
        markdown: {
          toc: {
            depth: 3
          }
        }
      }
    });
    await installModule("@nuxt/icon", {
      size: "24px",
      fetchTimeout: 4e3,
      clientBundle: { scan: true }
    });
    _nuxt.hook("tailwindcss:config", (tailwindConfig) => {
      tailwindConfig.plugins = tailwindConfig.plugins || [];
      tailwindConfig.plugins.push(require("daisyui"));
      tailwindConfig.content = tailwindConfig.content || [];
      if (Array.isArray(tailwindConfig.content)) {
        tailwindConfig.content.push(resolver.resolve("./runtime/components/**/*.{vue,js,ts}"));
      } else {
        tailwindConfig.content.files ??= [];
        tailwindConfig.content.files.push(resolver.resolve("./runtime/components/**/*.{vue,js,ts}"));
      }
      logSuccess("components style injected");
    });
    addComponentsDir({
      path: resolver.resolve("./runtime/components"),
      pathPrefix: false,
      global: true
    });
  }
});

export { module as default };
