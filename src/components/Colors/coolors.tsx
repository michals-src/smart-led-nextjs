import React, { useState, useCallback, useEffect, forwardRef, Ref } from "react";

import { colors } from "../customizer/colors/palette";
import CoolorssColorant from "./coolorsColorant";

type TPalette = {
  value: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
};

const radius = 80;
const Coolors = forwardRef((props: TPalette, ref: Ref<HTMLInputElement>) => {
  const { value, onClick } = props;

  return (
    <>
      <div>
        <>
          <div className='flex flex-row flex-wrap justify-center mx-auto w-full h-auto relative '>
            {colors.map((color, ix) => {
              return (
                <CoolorssColorant
                  key={ix}
                  index={ix}
                  isActive={color === value}
                  value={color}
                  onClick={onClick}
                />
              );
            })}
          </div>
        </>
      </div>
    </>
  );
});

Coolors.displayName = "Coolors";

export default Coolors;
