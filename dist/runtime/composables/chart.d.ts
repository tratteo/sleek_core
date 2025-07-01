import type { ChartOptions, ChartType, ChartTypeRegistry, Plugin } from "chart.js";
import { type Ref } from "vue";
interface UseChartReturn<T extends ChartType> {
    options: Ref<ChartOptions<T> | undefined>;
    plugins?: Plugin[];
}
export declare class PluginsFactory {
    static verticalIndicator: Plugin;
}
export declare const useChart: <T extends ChartType = keyof ChartTypeRegistry>({ decorator, plugins, }: {
    decorator?: (options: ChartOptions<T>) => void;
    plugins?: Plugin[];
}) => UseChartReturn<T>;
export {};
