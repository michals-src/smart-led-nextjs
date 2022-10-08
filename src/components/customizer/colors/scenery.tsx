import {
  ClockIcon,
  Cog6ToothIcon,
  FlagIcon,
  PaintBrushIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import React, {
  Children,
  forwardRef,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box } from "../..";
import { DarkenColor, hex2rgb, LightenColor } from "../../../utilities";

import { colors } from "./palette";

type IScenery = {};
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

export default function Scenery({}: IScenery) {
  const sliderRef = useRef(null);
  const circleWrapperRef = useRef(null);

  const [paletteValue, setPaletteValue] = useState<string>(colors[2]);

  const [sliderValue, setSliderValue] = useState<number>(0);
  const colorLight = hex2rgb(LightenColor(colors[5]));
  const colorDark = hex2rgb(DarkenColor(colors[5]));

  const Gradient = ({ color1, color2 }: any) => {
    return (
      <div className='w-1/2 mx-auto px-2 relative'>
        <div
          className='w-full h-12 relative'
          style={{
            filter: "blur(40px)",
            background: `linear-gradient(to bottom, ${color1} 0%, ${color2} 150%)`,
          }}></div>
        <div
          className='w-1 h-12 absolute top-0 bg-white'
          style={{
            background: `linear-gradient(to bottom, ${color1} 0%, ${color2} 100%)`,
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",

            opacity: ".4",
            filter: "blur(1px)",
          }}></div>
        <div
          className='absolute'
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: ".85",
          }}>
          <div className='w-auto table p-1 bg-white rounded-full cursor-pointer'>
            <PlusIcon className='w-3 h-3 text-black shadow-xl' />
          </div>
        </div>
      </div>
    );
  };

  const Label = ({ color, children }: any) => {
    return (
      <div
        className='px-4 py-3 rounded-xl shadow-xl relative z-10'
        style={{ background: `${DarkenColor(color)}` }}>
        {children}
      </div>
    );
  };

  return (
    <>
      <div className='flex flex-col nowrap w-full h-auto'>
        <div className='mb-32'>
          <div>
            <Box
              className='px-4 py-3 relative z-10 shadow-none'
              bgSolid='#00000000'>
              <div className='flex flex-row flex-nowrap items-center justify-center'>
                <div className='w-1/12'>
                  <ClockIcon className='w-5 h-5 text-white' />
                </div>
                <p className='ml-4 text-xs text-white'>20:00</p>
              </div>
            </Box>
          </div>
          <div>
            <Gradient
              color1='rgba(0,0,0,0)'
              color2={`${LightenColor(colors[0])}FF`}
            />
            <Box className='px-4 py-3 relative z-10' bgGradient={colors[0]}>
              <div className='flex flex-row flex-nowrap items-center justify-center'>
                <p className='ml-4 text-xs text-white'>21:00</p>
                <div className='w-1/12 ml-auto '>
                  <div className='bg-[#00000040] p-1 rounded-full cursor-pointer table'>
                    <Cog6ToothIcon className='w-5 h-5 text-white' />
                  </div>
                </div>
              </div>
            </Box>
          </div>
          <div>
            <Gradient
              color1={`${LightenColor(colors[0])}FF`}
              color2={`${LightenColor(colors[3])}FF`}
            />
            <Box className='px-4 py-3 relative z-10' bgGradient={colors[3]}>
              <div className='flex flex-row flex-nowrap items-center justify-center'>
                <p className='ml-4 text-xs text-white'>22:00</p>
                <div className='w-1/12 ml-auto '>
                  <div className='bg-[#00000040] p-1 rounded-full cursor-pointer table'>
                    <Cog6ToothIcon className='w-5 h-5 text-white' />
                  </div>
                </div>
              </div>
            </Box>
          </div>
          <div>
            <Gradient
              color1={`${LightenColor(colors[3])}FF`}
              color2={`${LightenColor(colors[6])}FF`}
            />
            <Box className='px-4 py-3 relative z-10' bgGradient={colors[6]}>
              <div className='flex flex-row flex-nowrap items-center justify-center'>
                <div className='w-1/12'>
                  <ClockIcon className='w-5 h-5 text-white' />
                </div>
                <p className='ml-4 text-xs text-white'>23:00</p>
              </div>
            </Box>
          </div>
          <div>
            <Gradient
              color1={`${LightenColor(colors[6])}FF`}
              color2='rgba(0,0,0,0)'
            />
            <Box className='px-4 py-3 relative z-10'>
              <div className='flex flex-row flex-nowrap items-center justify-center'>
                <div className='w-1/12'>
                  <FlagIcon className='w-5 h-5 text-white' />
                </div>
                <p className='ml-4 text-xs text-white'>24:00</p>
              </div>
            </Box>
          </div>
        </div>
        {/** */}
        {/** */}
        {/** */}
        {/** */}
        <div className='flex flex-row nowrap align-middle'>
          <div className='w-1/12'>
            <div className='flex flex-col nowrap items-center h-full'>
              <div className='w-3 h-3 bg-zinc-600 rounded-full'></div>
              <div className='w-1 min-h-3 h-full py-3 bg-zinc-600 -mt-1'></div>
            </div>
          </div>
          <div className='w-11/12 pl-4 pb-4'>
            <div
              className='w-auto py-2 px-3 shadow-lg rounded-md'
              style={{ background: "rgba(255,255,255,.1)" }}>
              <p className='text-zinc-300 text-xs'>20:00</p>
            </div>

            <div className='w-full flex flex-row nowrap items-center'>
              {/* <div className='w-1/12'>
                <div className='p-2 w-8 h-8 bg-zinc-600 rounded-full'>
                  <PaintBrushIcon className=' text-white ' />
                </div>
              </div> */}
            </div>
          </div>
        </div>
        {/** */}
        <div className='flex flex-row flex-wrap align-middle'>
          <div
            className='w-full flex flex-col nowrap rounded-xl shadow-xl p-3'
            style={{
              background: `linear-gradient(0deg, rgba(${colorDark[0]}, ${colorDark[1]}, ${colorDark[2]}, .3) 0%, rgba(${colorLight[0]}, ${colorLight[1]}, ${colorLight[2]}, .4) 100%)`,
            }}>
            <div className='w-full'>
              {/* <div className='w-full'>
                <div
                  className='flex flex-row flex-wrap p-2 rounded-xl shadow-md'
                  style={{ background: "rgba(255,255,255,.15)" }}>
                  {colors.map((color, i) => {
                    return (
                      <div key={i} className='m-2 cursor-pointer'>
                        <div
                          className='w-3 h-3 rounded-full'
                          style={{ background: `${color}` }}></div>
                      </div>
                    );
                  })}
                </div>
              </div> */}

              <p className='text-xs px-1 text-white '>
                Kolor{" "}
                <span
                  className='w-2 h-2 ml-1 inline-block rounded-md'
                  style={{ background: `${colors[5]}` }}></span>
              </p>
              <p className='text-sm mb-4 px-1 text-zinc-100'>
                Intensywność {sliderValue} %
              </p>
              <Slider initialValue={0} value={setSliderValue} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
