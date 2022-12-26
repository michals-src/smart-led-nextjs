export const colors = ["#9D0208", "#D00000", "#E85D04", "#FFBA08", "#99D98C", "#52B69A", "#168AAD", "#184E77"];

export const hex2rgb = (hex: string) => {
  return (
    hex
      .replace("/^#?([a-fd)([a-fd])([a-fd])$)/i", (m, r, g, b) => "#" + r + r + g + g + b + b)
      .substring(1)
      .match(/.{2}/g)
      ?.map((x) => parseInt(x, 16)) ?? [0, 0, 0]
  );
};

export const rgb2hex = (rgb: number[]): string =>
  "#" +
  rgb
    .map((x) => {
      const hex = Math.floor(x).toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    })
    .join("");

export const DarkenColor = (color: string) => {
  let rgbValue = hex2rgb(color) ?? [0, 0, 0];
  let diff = rgbValue.map((v) => {
    const a = v - v * 0.3;
    return a >= 0 ? a : 0;
  });

  return rgb2hex(diff);
};

export const LightenColor = (color: string) => {
  const rgbValue = hex2rgb(color) ?? [0, 0, 0];
  const diff = rgbValue?.map((v) => {
    const a = v + v * 0.3;
    return a <= 255 ? a : 255;
  });

  return rgb2hex(diff);
};

export const toUpperFirst = (chars: string) => chars.charAt(0).toUpperCase() + chars.substring(1);

export const timeAstimestamp = (time: String) => {
  const splitted = time.split(":");
  return +splitted[0] * 60 + +splitted[1];
};
export const timestampAstime = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return [hours, minutes];
};
export const timeAsText = (time: number[]) => {
  const h = `${time[0]}`;
  const min = `${time[1]}`.length > 1 ? `${time[1]}` : `0${time[1]}`;
  return `${h}:${min}`;
};
