import React, { FC, forwardRef, ReactElement, useCallback, useEffect, useRef, useState } from "react";

import { LightBulbIcon } from "@heroicons/react/24/solid";
import { Box, Slider } from "../";

type IPanel = {
  color?: string;
  initialRange: number;
};

type IPanelRange = {
  rangeValue: number;
  handleChange: VoidFunction;
};

type ISwitch = {
  initialValue: boolean;
  valueState: React.Dispatch<React.SetStateAction<boolean>>;
};

const Switch = forwardRef<HTMLInputElement, ISwitch>(({ initialValue, valueState }, ref): ReactElement => {
  const [value, setValue] = useState<any>(initialValue);

  useEffect(() => {
    //valueState(value);
  }, [value]);

  return (
    <div
      className='switch'
      attr-checked={`${value}`}
      onClick={() => setValue(!value)}>
      <div className='switch-thumb'></div>
      <input
        ref={ref}
        type='checkbox'
        className='switch-checkbox'
        checked={value}
        onChange={() => setValue(!value)}
      />
    </div>
  );
});

const PanelRange = forwardRef<HTMLDivElement, IPanelRange>(({ rangeValue, handleChange }, ref): ReactElement => {
  return (
    <div className='panel--range'>
      <div className='panel--range-bg'></div>
      <div
        ref={ref}
        className='panel--range-progress'></div>
      <input
        type='range'
        className='panel--range-input'
        value={rangeValue}
        onClick={handleChange}
        onChange={handleChange}
      />
    </div>
  );
});

const Panel: FC<IPanel> = ({ color, initialRange }): ReactElement => {
  const progressRef = useRef<HTMLDivElement>(null);
  const switchRef = useRef(null);

  const [switchValue, setSwitchValue] = useState<boolean>(false);
  const [rangeValue, setRangeValue] = useState<number>(initialRange);

  useEffect(() => {
    if (progressRef.current == null) return;
    progressRef.current.style.width = `${rangeValue}%`;
  }, [rangeValue]);

  // const handleRangeChange = (e: React.ChangeEvent<HTMLDialogElement>) => {
  //   const el = e.target;
  //   if (!el || progressRef.current == null) return;

  //   setRangeValue(el.value);

  //   progressRef.current.style.width = `${rangeValue}%`;
  // };

  return (
    <Box bgGradient={color}>
      <>
        <div className='p-4 flex flex-row nowrap items-center'>
          <div className='w-2/12'>
            <LightBulbIcon className='w-6 h-6 text-white mx-auto' />
          </div>
          <div className='w-8/12 pl-4 pr-8'>
            <p className='text-sm'>Kanał 1</p>
            <p className='text-xs'>{rangeValue} %</p>
          </div>
          <div className='w-2/12'>
            <Switch
              ref={switchRef}
              initialValue={false}
              valueState={setSwitchValue}
            />
          </div>
        </div>
        <div className='w-full'>
          <Slider
            onChange={(e) => setRangeValue(parseInt(e.target.value, 10))}
            value={rangeValue}
            size='lg'
            thumb={false}
          />
          {/* <PanelRange
            ref={progressRef}
            rangeValue={rangeValue}
            handleChange={handleRangeChange}
          /> */}
        </div>
      </>
    </Box>
  );
};

Switch.displayName = "Switch";
PanelRange.displayName = "PanelRange";

export default Panel;
