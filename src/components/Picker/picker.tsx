import React, { useState, useEffect, forwardRef, useRef, Ref } from "react";
import { default as PickerOption } from "./pickerOption";
import { default as PickerSelect } from "./pickerSelect";

/**
 *
 * <Picker>
 * <PickerSelect value="0" onChange>
 *   <PickerOption value="0">Nazwa</PickerOption>
 * </PickerSelect/>
 * </Picker>
 *
 */

const Picker = forwardRef(function Picker(
  props: {
    children: React.ReactNode;
  },
  ref: Ref<HTMLDivElement>
) {
  const { children, ...other } = props;

  return (
    <div
      ref={ref}
      {...other}>
      <div className='relative'>
        <div className='relative z-10 h-full'>
          <div className='w-full h-auto absolute left-0 top-[50%]'>
            <div
              className='w-full py-4 px-3 rounded-lg bg-zinc-800 h-[32px]'
              style={{
                transform: "translateY(-50%)",
              }}></div>
          </div>
          <div className='flex flex-row flex-nowrap items-center'>{children}</div>
        </div>
      </div>
    </div>
  );
});

export { Picker, PickerSelect, PickerOption };
