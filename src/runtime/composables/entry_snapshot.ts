import { useState } from "#app";
import type { _RouteLocationBase } from "#vue-router";

export const useEntrySnapshot = () => {
    const routeState = useState<_RouteLocationBase | undefined>("initial-route", () => undefined);
    const routeRedirected = useState<boolean>("initial-route-redirected", () => false);
    return { routeState, routeRedirected };
};
