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
