import { defineNuxtPlugin } from "#app";
import * as dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
import quarterOfYear from "dayjs/plugin/quarterOfYear.js";
import relativeTime from "dayjs/plugin/relativeTime.js";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";

export default defineNuxtPlugin({
    setup(nuxtApp) {
        dayjs.extend(duration);
        dayjs.extend(quarterOfYear);
        dayjs.extend(relativeTime);
        dayjs.extend(timezone);
        dayjs.extend(utc);
    },
    enforce: "pre",
});
