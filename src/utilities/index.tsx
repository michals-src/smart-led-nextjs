export const colors = [
  "#9D0208",
  "#D00000",
  "#E85D04",
  "#FFBA08",
  "#99D98C",
  "#52B69A",
  "#168AAD",
  "#184E77",
];

export const hex2rgb = (hex: string) =>
  hex
    .replace(
      "/^#?([a-fd)([a-fd])([a-fd])$)/i",
      (m, r, g, b) => "#" + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    ?.map(x => parseInt(x, 16));

export const rgb2hex = (rgb: number[]): string =>
  "#" +
  rgb
    .map(x => {
      const hex = Math.floor(x).toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    })
    .join("");

export const DarkenColor = (color: string) => {
  let rgbValue = hex2rgb(color);
  let diff = rgbValue?.map(v => {
    const a = v - v * 0.3;
    return a >= 0 ? a : 0;
  });

  return rgb2hex(diff);
};

export const LightenColor = (color: string) => {
  const rgbValue = hex2rgb(color);
  const diff = rgbValue?.map(v => {
    const a = v + v * 0.3;
    return a <= 255 ? a : 255;
  });

  return rgb2hex(diff);
};
