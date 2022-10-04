import React, {
  FC,
  forwardRef,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { LightBulbIcon } from "@heroicons/react/24/solid";
import { hex2rgb, rgb2hex } from "../../utilities";

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
  valueState: React.SetStateAction<boolean>;
};

const Switch: FC<ISwitch> = forwardRef(
  ({ initialValue, valueState }, ref): ReactElement => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      valueState(value);
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
  }
);

const PanelRange: FC<IPanelRange> = forwardRef(
  ({ rangeValue, handleChange }, ref): ReactElement => {
    return (
      <div className='panel--range'>
        <div className='panel--range-bg'></div>
        <div ref={ref} className='panel--range-progress'></div>
        <input
          type='range'
          className='panel--range-input'
          value={rangeValue}
          onClick={handleChange}
          onChange={handleChange}
        />
      </div>
    );
  }
);

const Panel: FC<IPanel> = ({ color, initialRange }): ReactElement => {
  const panelRef = useRef(null);
  const progressRef = useRef(null);
  const switchRef = useRef(null);

  const [switchValue, setSwitchValue] = useState<boolean>(false);
  const [rangeValue, setRangeValue] = useState<number>(initialRange);

  const DarkenColor = useCallback((color: string) => {
    let rgbValue = hex2rgb(color);
    let diff = rgbValue?.map(v => {
      const a = v - v * 0.3;
      return a >= 0 ? a : 0;
    });

    return rgb2hex(diff);
  }, []);

  const LightenColor = useCallback((color: string) => {
    const rgbValue = hex2rgb(color);
    const diff = rgbValue?.map(v => {
      const a = v + v * 0.3;
      return a <= 255 ? a : 255;
    });

    return rgb2hex(diff);
  }, []);

  useEffect(() => {
    progressRef.current.style.width = `${initialRange}%`;
  }, []);

  useEffect(() => {
    if (panelRef.current == null) return;

    const dark = DarkenColor(color);
    const light = LightenColor(color);
    panelRef.current.style.setProperty("--app-panel-bg-color", color);
    panelRef.current.style.setProperty("--app-panel-bg-dark", dark);
    panelRef.current.style.setProperty("--app-panel-bg-light", light);
  }, [color]);

  useEffect(() => {
    console.log(switchValue);
  }, [switchValue]);

  useEffect(() => {
    progressRef.current.style.width = `${rangeValue}%`;
  }, [rangeValue]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLDialogElement>) => {
    const el = e.target;
    if (!el || progressRef.current == null) return;

    setRangeValue(el.value);

    progressRef.current.style.width = `${rangeValue}%`;
  };

  return (
    <div ref={panelRef} className='panel rounded-lg shadow-xl'>
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
        <PanelRange
          ref={progressRef}
          rangeValue={rangeValue}
          handleChange={handleRangeChange}
        />
      </div>
    </div>
  );
};

Switch.displayName = "Switch";
PanelRange.displayName = "PanelRange";

export default Panel;
