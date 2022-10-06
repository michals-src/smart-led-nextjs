import React, { useEffect, useState } from "react";
import { DarkenColor, LightenColor } from "../../utilities";

type TPaletteColor = {
  value: string;
};

function PaletteColor({ value }: TPaletteColor) {
  const [color, setColor] = useState<string>(
    `linear-gradient(to bottom, ${LightenColor(
      value
    )} 0%, ${value} 50%, ${DarkenColor(value)} 140%)`
  );

  useEffect(() => {
    setColor(
      `linear-gradient(to bottom, ${LightenColor(
        value
      )} 0%, ${value} 50%, ${DarkenColor(value)} 140%)`
    );
  }, [value]);

  return (
    <>
      <div
        className='w-16 h-16 absolute rounded-full shadow-sm'
        style={{
          background: color,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}></div>
    </>
  );
}

export default PaletteColor;
