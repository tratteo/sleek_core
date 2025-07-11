import * as culori from "culori";

export function daisyUiColor(cssVar: string): culori.Color | undefined {
  const property = window
    .getComputedStyle(document.body)
    .getPropertyValue(cssVar);
  return culori.parse(`oklch(${property})`);
}
export function daisyUiColorHex(cssVar: string): string | undefined {
  const property = window
    .getComputedStyle(document.body)
    .getPropertyValue(cssVar);
  return culori.formatHex(culori.parse(`oklch(${property})`));
}
export function hexToRgba(hex: string, alpha: number = 1) {
  const color = culori.parseHex(hex);
  if (!color) return undefined;
  color.alpha = alpha;
  return culori.formatRgb(color);
}
export function daisyUiColorRgba(
  cssVar: string,
  alpha: number = 0.1,
): string | undefined {
  const property = window
    .getComputedStyle(document.body)
    .getPropertyValue(cssVar);
  const color = culori.parse(`oklch(${property})`);
  if (!color) return undefined;
  color.alpha = alpha;

  return culori.formatRgb(color);
}

export function hexToOklch(hex: string): string {
  const color = culori.oklch(hex);
  return ``;
}
