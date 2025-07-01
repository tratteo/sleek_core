export declare const typewatch: (callback: () => void, ms: number) => void;
export declare function download(blob: Blob | undefined | null, name: string): Promise<void>;
export declare function share(blob: Blob | undefined | null, name: string): Promise<void>;
export declare function downloadUrl(dataUrl: string, name: string): Promise<void>;
