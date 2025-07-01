import { useState } from "#app";
export const useEntrySnapshot = () => {
  const routeState = useState("initial-route", () => void 0);
  const routeRedirected = useState("initial-route-redirected", () => false);
  return { routeState, routeRedirected };
};
