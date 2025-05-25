export function isValidColor(color: string) {
  // #RGB, #RRGGBB, rgb(), rgba() 형태 검사 (대략적인 예)
  const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  const rgbRegex = /^rgb\((\s*\d+\s*,){2}\s*\d+\s*\)$/;
  const rgbaRegex = /^rgba\((\s*\d+\s*,){3}\s*(0|1|0?\.\d+)\s*\)$/;

  return hexRegex.test(color) || rgbRegex.test(color) || rgbaRegex.test(color);
}
