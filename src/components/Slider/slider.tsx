import React, { forwardRef, useEffect, useRef, useState } from "react";

type ISlider = {
  initialValue: number;
  // value?: React.Dispatch<React.SetStateAction<number>>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  step?: number;
};

const Slider = forwardRef(({ initialValue, onChange, step }: ISlider, ref) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState<number>(initialValue ? initialValue : 0);

  useEffect(() => {
    if (progressRef.current == null || thumbRef.current == null) return;

    progressRef.current.style.width = `${range}%`;
    thumbRef.current.style.width = `${range}%`;
  }, [range]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;

    setRange(parseInt(e.target.value, 10));
    if (typeof onChange !== "undefined") onChange(e);
  };

  return (
    <div className='slider w-full'>
      <div className='slider--placeholder'>
        <div ref={progressRef} className='slider--progress'></div>
      </div>
      <div ref={thumbRef} className='slider--thumb--wrapper'>
        <div ref={thumbRef} className='slider--thumb'></div>
      </div>

      <input
        type='range'
        className='slider--input w-full'
        value={range}
        onChange={handleChange}
        ref={ref}
        step={step}
      />
    </div>
  );
});

Slider.displayName = "Slder";

export default Slider;
