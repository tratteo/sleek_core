import { defineNuxtPlugin } from "#app";
import * as dayjs from "dayjs";
import * as duration from "dayjs/plugin/duration.js";
import * as quarterOfYear from "dayjs/plugin/quarterOfYear.js";
import * as relativeTime from "dayjs/plugin/relativeTime.js";
import * as timezone from "dayjs/plugin/timezone.js";
import * as utc from "dayjs/plugin/utc.js";
export default defineNuxtPlugin({
  setup(nuxtApp) {
    dayjs.extend(duration.default);
    dayjs.extend(quarterOfYear.default);
    dayjs.extend(relativeTime.default);
    dayjs.extend(timezone.default);
    dayjs.extend(utc.default);
  },
  enforce: "pre"
});
