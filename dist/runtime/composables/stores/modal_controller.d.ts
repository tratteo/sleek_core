export declare const useModalController: import("pinia").StoreDefinition<"modal-controller", Pick<{
    open: <T>(id: string | HTMLDialogElement | undefined, arg?: T | undefined) => HTMLDialogElement | undefined;
    close: (id: string | HTMLDialogElement | undefined) => HTMLDialogElement | undefined;
    queryArg: <T>(el: HTMLDialogElement | undefined) => T | undefined;
}, never>, Pick<{
    open: <T>(id: string | HTMLDialogElement | undefined, arg?: T | undefined) => HTMLDialogElement | undefined;
    close: (id: string | HTMLDialogElement | undefined) => HTMLDialogElement | undefined;
    queryArg: <T>(el: HTMLDialogElement | undefined) => T | undefined;
}, never>, Pick<{
    open: <T>(id: string | HTMLDialogElement | undefined, arg?: T | undefined) => HTMLDialogElement | undefined;
    close: (id: string | HTMLDialogElement | undefined) => HTMLDialogElement | undefined;
    queryArg: <T>(el: HTMLDialogElement | undefined) => T | undefined;
}, "close" | "open" | "queryArg">>;
