export interface Aggregation<K, V> {
    key: K;
    elements: V[];
}
export interface DateInterval {
    from: Date;
    to: Date;
}
export declare function aggregate<T extends {
    [key: string]: any;
}>({ elements, interval, stride, key, includeEmptyIntervals, }: {
    elements: T[];
    key: (e: T) => Date;
    interval?: DateInterval;
    stride?: {
        duration: plugin.Duration;
        fixed?: boolean;
    };
    includeEmptyIntervals?: boolean;
}): Aggregation<DateInterval, T>[];
export declare function listGenerate<T>(length: number, generator: (i: number) => T): T[];
export declare function pickRandom<T>(collection: T[] | null | undefined, amount: number): T[];
