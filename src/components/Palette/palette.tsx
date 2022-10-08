import React, { useState, useCallback, useEffect } from "react";

import { Box } from "../";
import { colors } from "../customizer/colors/palette";
import PaletteColor from "./paletteColor";
import PaletteColorant from "./paletteColorant";

type TPalette = {
  initialValue?: string;
  state: React.Dispatch<React.SetStateAction<string>>;
};

const Palette = ({ initialValue, state }: TPalette) => {
  const radius = 100;

  const [colorantValue, setColorantValue] = useState<string>(
    initialValue ? initialValue : colors[0]
  );

  const Circle = useCallback((radius: number, radian: number) => {
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    return { x, y };
  }, []);

  const Radian = useCallback((index: number): number => {
    return (2 * Math.PI * index) / colors.length;
  }, []);

  useEffect(() => {
    if (state == null || typeof state == "undefined") return;
    state(colorantValue);
  }, [colorantValue, state]);

  return (
    <>
      <div className='px-12 py-16'>
        <>
          <div
            className='mx-auto  w-full h-40 relative '
            style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}>
            {colors.map((color, ix) => {
              const radian = Radian(ix);
              const { x, y } = Circle(radius, -radian);

              let topY = (y / radius) * 100;
              let leftX = (x / radius) * 100;

              return (
                <PaletteColorant
                  key={ix}
                  index={ix}
                  y={topY}
                  x={leftX}
                  value={color}
                  state={setColorantValue}
                />
              );
            })}
            <PaletteColor value={colorantValue} />
          </div>
        </>
      </div>
    </>
  );
};

export default Palette;
