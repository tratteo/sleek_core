type AsyncFunc<T> = (...args: any[]) => Promise<T>;
type Func<T> = (...args: any[]) => T;
export interface WithId<T> {
    id: string;
    data: T;
}
export default class Decorators {
    static profiledAsync<R>(func: AsyncFunc<R>, ...args: Parameters<AsyncFunc<R>>): Promise<R>;
    static profiled<R>(func: Func<R>, ...args: Parameters<Func<R>>): R;
    static profiledNamed<R>(name: string, func: Func<R>, ...args: Parameters<Func<R>>): R;
}
export {};
