import React, { forwardRef, useEffect, useRef, useState } from "react";

type ISlider = {
  initialValue: number;
  value?: React.Dispatch<React.SetStateAction<number>>;
};

const Slider = forwardRef(({ initialValue, value }: ISlider, ref) => {
  const progressRef = useRef(null);
  const thumbRef = useRef(null);
  const [range, setRange] = useState<number>(initialValue ? initialValue : 0);

  useEffect(() => {
    if (progressRef.current == null || thumbRef.current == null) return;

    progressRef.current.style.width = `${range}%`;
    thumbRef.current.style.width = `${range}%`;

    if (value) value(range);
  }, [range]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>
  ) => {
    setRange(parseInt(e.target.value, 10));
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
        onClick={e => handleChange(e)}
        onChange={e => handleChange(e)}
        ref={ref}
      />
    </div>
  );
});

Slider.displayName = "Slder";

export default Slider;
