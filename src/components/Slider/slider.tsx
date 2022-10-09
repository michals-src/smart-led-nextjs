import classNames from "classnames";
import React, { forwardRef, useEffect, useRef, useState } from "react";

type ISlider = {
  value?: number;
  // value?: React.Dispatch<React.SetStateAction<number>>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  step?: number;
  thumb?: boolean;
  size?: "sm" | "md" | "lg";
};

const Slider = forwardRef(
  ({ value = 0, onChange, step, thumb = true, size = "md" }: ISlider, ref) => {
    const progressRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const [range, setRange] = useState<number>(value ? value : 0);

    const cnPlaceholder = classNames("slider--placeholder", {
      "h-1": size === "sm",
      "h-3": size === "md",
      "h-6": size === "lg",
    });

    const cnThumb = classNames("slider--thumb", {
      "w-2 h-2": size === "sm",
      "w-4 h-4": size === "md",
      "w-7 h-7": size === "lg",
    });

    useEffect(() => {
      if (progressRef.current == null || thumbRef.current == null) return;

      progressRef.current.style.width = `${value}%`;
      thumbRef.current.style.width = `${value}%`;
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target) return;

      setRange(parseInt(e.target.value, 10));
      if (typeof onChange !== "undefined") onChange(e);
    };

    return (
      <div className='slider w-full'>
        <div className={cnPlaceholder}>
          <div ref={progressRef} className='slider--progress'></div>
        </div>
        <div ref={thumbRef} className='slider--thumb--wrapper'>
          {thumb && <div ref={thumbRef} className={cnThumb}></div>}
        </div>

        <input
          type='range'
          className='slider--input w-full'
          value={value}
          onChange={handleChange}
          ref={ref}
          step={step}
        />
      </div>
    );
  }
);

Slider.displayName = "Slder";

export default Slider;
