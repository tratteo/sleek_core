import * as culori from "culori";
export function daisyUiColor(cssVar) {
  const property = window.getComputedStyle(document.body).getPropertyValue(cssVar);
  return culori.parse(`oklch(${property})`);
}
export function daisyUiColorHex(cssVar) {
  const property = window.getComputedStyle(document.body).getPropertyValue(cssVar);
  return culori.formatHex(culori.parse(`oklch(${property})`));
}
export function hexToRgba(hex, alpha = 1) {
  const color = culori.parseHex(hex);
  if (!color) return void 0;
  color.alpha = alpha;
  return culori.formatRgb(color);
}
export function daisyUiColorRgba(cssVar, alpha = 0.1) {
  const property = window.getComputedStyle(document.body).getPropertyValue(cssVar);
  const color = culori.parse(`oklch(${property})`);
  if (!color) return void 0;
  color.alpha = alpha;
  return culori.formatRgb(color);
}
export function hexToOklch(hex) {
  const color = culori.oklch(hex);
  return ``;
}
