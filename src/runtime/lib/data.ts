// import dayjs, { Dayjs } from "dayjs";
// import { type Duration } from "dayjs/plugin/duration";
import type dayjs from "#build/dayjs.imports.mjs";
import l from "lodash";

export interface Aggregation<K, V> {
    key: K;
    elements: V[];
}
export interface DateInterval {
    from: Date;
    to: Date;
}

function adaptiveStride(timespan: DateInterval): plugin.Duration {
    const dayjs = useDayjs();
    const days = dayjs.duration(dayjs(timespan.to).diff(timespan.from), "millisecond").asDays();
    if (days <= 1) {
        return dayjs.duration(1, "hour");
    }
    if (days <= 31) {
        return dayjs.duration(1, "day");
    }
    if (days <= 120) {
        return dayjs.duration(1, "week");
    }
    if (days <= 500) {
        return dayjs.duration(1, "month");
    }
    return dayjs.duration(3, "month");
}

function getPeriodBound(date: dayjs.Dayjs | Date, dur: plugin.Duration, bound: "start" | "end"): dayjs.Dayjs {
    const dayjs = useDayjs();
    date = dayjs(date);
    if (dur.asYears() >= 1) {
        return bound === "start" ? date.startOf("year") : date.endOf("year");
    }

    if (dur.asMonths() >= 3) {
        return bound === "start" ? date.startOf("quarter") : date.endOf("quarter");
    }
    if (dur.asMonths() >= 1) {
        return bound === "start" ? date.startOf("month") : date.endOf("month");
    }
    if (dur.asWeeks() >= 1) {
        return bound === "start" ? date.startOf("week") : date.endOf("week");
    }
    if (dur.asDays() >= 1) {
        return bound === "start" ? date.startOf("day") : date.endOf("day");
    }
    return date;
}

export function aggregate<T extends { [key: string]: any }>({
    elements,
    interval,
    stride,
    key,
    includeEmptyIntervals = true,
}: {
    elements: T[];
    key: (e: T) => Date;
    interval?: DateInterval;
    stride?: { duration: plugin.Duration; fixed?: boolean };
    includeEmptyIntervals?: boolean;
}): Aggregation<DateInterval, T>[] {
    var start = performance.now();
    elements = l.orderBy(elements, key, "asc");

    if (elements.length <= 0) return [];
    let endDate = elements.length > 0 ? key(elements[elements.length - 1]) : undefined;
    let startDate = elements.length > 0 ? key(elements[0]) : undefined;
    if (!startDate || !endDate) {
        return [];
    }
    var strideMs = 0;
    var strideDuration = stride?.duration;
    if (stride === undefined) {
        interval ??= { from: startDate, to: endDate };
        strideDuration = adaptiveStride(interval);
    } else {
        strideMs = stride.duration.asMilliseconds();
        if (stride.fixed) {
            interval ??= {
                from: getPeriodBound(startDate, stride.duration, "start").toDate(),
                to: getPeriodBound(endDate, stride.duration, "end").toDate(),
            };
        } else {
            interval ??= { from: startDate, to: endDate };
        }
    }

    strideMs = strideDuration!.asMilliseconds();

    var aggregation: Aggregation<DateInterval, T>[] = [];
    var current = interval.from.getTime();

    while (current + strideMs < interval.to.getTime()) {
        aggregation.push({
            key: { from: new Date(current), to: new Date(current + strideMs) },
            elements: [],
        });
        current = current + strideMs;
    }
    if (stride === undefined || !stride.fixed) {
        aggregation.push({
            key: { from: new Date(current), to: interval.to },
            elements: [],
        });
    }
    for (const e of elements) {
        const moment = (key(e) as Date).getTime();

        if (moment > interval.to.getTime() || moment < interval.from.getTime()) continue;
        const m = aggregation.find((i) => moment >= i.key.from.getTime() && moment <= i.key.to.getTime());
        if (!m) continue;
        m!.elements.push(e);
    }
    if (!includeEmptyIntervals) {
        aggregation = aggregation.filter((a) => a.elements.length > 0);
    }
    return aggregation;
}

export function listGenerate<T>(length: number, generator: (i: number) => T): T[] {
    const list: T[] = [];
    for (let i = 0; i < length; i++) {
        list.push(generator(i));
    }
    return list;
}

export function pickRandom<T>(collection: T[] | null | undefined, amount: number): T[] {
    if (collection === null || collection === undefined) return [];
    if (collection.length <= amount) return collection;
    var res: T[] = [];
    var indexes = listGenerate(collection.length, (i) => i);
    do {
        const index = indexes.at(Math.floor(Math.random() * indexes.length));
        const el = collection.at(index!);
        res.push(el!);
        indexes = indexes.filter((i) => i !== index);
    } while (res.length < amount && indexes.length > 0);
    return res;
}
