import React, {
  Children,
  forwardRef,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  CheckCircleIcon,
  ClockIcon,
  Cog6ToothIcon,
  FlagIcon,
  PaintBrushIcon,
  PlayIcon,
  PlusIcon,
  SunIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

import { default as modalCtx } from "@context/modal/modalContext";
import { Box, Palette, Slider } from "@components";
import { DarkenColor, hex2rgb, LightenColor, colors } from "@utils";
import channelContext from "@context/channel/channelContext";

type IScenery = {};


const SceneryModal = () => {
  const [paletteValue, setPaletteValue] = useState<string>(colors[0]);
  const [brightnessValue, setBrightnessValue] = useState<number>(100);
  const [sliderValue, setSliderValue] = useState<number>(50);
  const [newTime, setNewTime] = useState<object>({ hour: 0, min: 0 });

  const time2hhmm = (time: number) => {
    const hour = Math.floor(time / 60);
    const min = time % 60;

    return { hour, min };
  };

  const hhmm2time = (hhmm: string) => {
    // const num = hhmm
    //   .split(":")
    //   .reverse()
    //   .map((t, i) => t * (60 * i));
    const num2_arr = hhmm.split(":");
    const num2 = +num2_arr[0] * 60 + +num2_arr[1];

    return num2;
  };

  const startTime = hhmm2time("20:35");
  const endTime = hhmm2time("22:55");
  const diff = endTime - startTime;

  const sliderHandleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTime = Math.floor(startTime + diff * (e.target.value / 100));

      setNewTime(time2hhmm(newTime));
      setSliderValue(e.target.value);
    },
    []
  );

  const brightnessHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrightnessValue(e.target.value);
  };

  const handlelColorClick = (e: React.MouseEvent) => {
    setPaletteValue(e.target.value);
  };

  return (
    <>
      <div className='p-4 mb-4'>
        <p className='text-xs text-zinc-300'>Edycja scenerii</p>
        <p className='text-sm'>Dodawanie nowego punktu</p>
      </div>
      <div className='relative mb-8'>
        <div>
          <Box className='text-center mb-4'>
            <div className='py-2 px-4'>
              <p className='text-zinc-100 mx-auto'>
                {newTime.hour} <span className='mx-3'>:</span>
                {`${newTime.min}`.length < 2 ? "0" + newTime.min : newTime.min}
              </p>
            </div>
            <Slider
              onChange={sliderHandleChange}
              value={sliderValue}
              thumb={false}
              size='lg'
            />
          </Box>
        </div>
        <div className='flex flex-row flex-nowrap w-full justify-center items-center relative px-4'>
          <div className='w-3/12 relative z-10'>
            <Box
              bgSolid={`${colors[0]}80`}
              className='relative text-center py-2 px-4 overflow-visible'>
              <div
                className='absolute top-0 left-[50%]'
                style={{
                  borderRight: "8px solid transparent",
                  borderLeft: "8px solid transparent",
                  borderBottom: `8px solid ${colors[0]}80`,
                  transform: "translate(-50%, -100%)",
                }}></div>
              <p className='text-xs text-zinc-100'> 20:30</p>
            </Box>
          </div>
          <div className='w-8/12 relative z-[9]'>
            <div className='relative'>
              <div className='p-4'>
                <Slider size='sm' track={false} value={sliderValue} />
              </div>
            </div>
          </div>
          <div className='w-3/12 relative z-10'>
            <Box
              bgSolid={`${colors[4]}80`}
              className='relative text-center py-2 px-4 overflow-visible'>
              <div
                className='absolute top-0 left-[50%]'
                style={{
                  borderRight: "8px solid transparent",
                  borderLeft: "8px solid transparent",
                  borderBottom: `8px solid ${colors[4]}80`,
                  transform: "translate(-50%, -100%)",
                }}></div>
              <p className='text-xs text-zinc-100'> 23:00</p>
            </Box>
          </div>
        </div>
      </div>

      <div className='py-4'>
        <Box bgGradient={`${paletteValue}40`} className='p-4'>
          <Palette value={paletteValue} onClick={handlelColorClick} />

          <Box>
            <div className='w-full'>
              <div className='flex flex-row flex-nowrap w-full justify-between px-6 py-4'>
                <div className='w-8/12 mr-4 flex flex-row flex-nowrap items-center'>
                  <div className='table mr-4'>
                    <SunIcon className='w-4 h-4 text-white ' />
                  </div>
                  <p className='text-sm'>Jasność</p>
                </div>
                <div className='w-4/12 flex items-end self-center'>
                  <div className='table ml-auto'>
                    <p className='text-lg'>{brightnessValue} %</p>
                  </div>
                </div>
              </div>
              <div>
                <Slider
                  onChange={brightnessHandleChange}
                  value={brightnessValue}
                  thumb={false}
                  size='lg'
                />
              </div>
            </div>
          </Box>
        </Box>
      </div>

      <div className='p-3 pb-8 mt-6 w-full'>
        <button className='py-3 px-4 bg-zinc-400 text-black rounded-lg mx-auto table shadow-lg'>
          <div className='flex flex-row flex-nowrap items-center'>
            <span className='mr-4'>
              <CheckCircleIcon className='w-6 h-6 text-inherit' />
            </span>
            <span className='text-sm'>Zapisz</span>
          </div>
        </button>
      </div>
    </>
  );
};

export default function ChannelTabScenery({ }: IScenery) {
  const { viewModal } = useContext(modalCtx);
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
          <div
            className='w-auto table p-1 bg-white rounded-full cursor-pointer'
            onClick={() => {
              viewModal(<SceneryModal />);
            }}>
            <PlusIcon className='w-3 h-3 text-black shadow-xl' />
          </div>
        </div>
      </div>
    );
  };

  const SceneryCreate = ({ color = "#FFFFFF" }) => {
    return (
      <div className='w-1/2 mx-auto px-2 relative'>
        <div
          className='w-full h-12 relative'
          style={{
            filter: "blur(40px)",
            background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, ${color} 150%)`,
          }}></div>
        <div
          className='w-1 h-12 absolute top-0 bg-white opacity-[0.4] bottom-0 left-[50%]'
          style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, ${color} 100%)`,
            transform: "translateX(-50%)",
            filter: "blur(1px)",
          }}></div>
        <div
          className='absolute top-[50%] left-[50%] opacity-[0.85]'
          style={{
            transform: "translate(-50%, -50%)",
          }}>
          <div
            className='w-auto table p-1 bg-white rounded-full cursor-pointer'
            onClick={() => {
              viewModal(<SceneryModal />);
            }}>
            <PlusIcon className='w-3 h-3 text-black shadow-xl' />
          </div>
        </div>
      </div>
    );
  };

  const SceneryItem = ({
    type = "normal",
    label = "",
    color = "#FFFFFF15",
  }) => {
    return (
      <div>
        {(type === "normal" || type === "end") && (
          <SceneryCreate color={`${LightenColor(color)}FF`} />
        )}
        <Box className='px-4 py-3 relative z-10' bgGradient={color}>
          <div className='flex flex-row flex-nowrap items-center justify-center'>
            <div className='mr-1'>
              {type === "start" && <PlayIcon className='w-5 h-5 text-white' />}
              {type === "normal" && (
                <ClockIcon className='w-5 h-5 text-white' />
              )}
              {type === "end" && <FlagIcon className='w-5 h-5 text-white' />}
            </div>
            <p className='ml-4 text-xs text-white'>{label}</p>
            {type === "normal" && (
              <>
                <div className='w-1/12 ml-auto '>
                  <div className='bg-[#00000040] p-1 rounded-full cursor-pointer table'>
                    <TrashIcon className='w-5 h-5 text-white' />
                  </div>
                </div>
                <div className='w-1/12 ml-6'>
                  <div className='bg-[#00000040] p-1 rounded-full cursor-pointer table'>
                    <Cog6ToothIcon className='w-5 h-5 text-white' />
                  </div>
                </div>
              </>
            )}
          </div>
        </Box>
        {type === "start" && (
          <div className='flex flex-row flex-nowrap items-center justify-center'>
            <div className='bg-[#FFFFFF15] w-1 h-6'></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className='flex flex-col nowrap w-full h-auto'>
        <Box className='p-4 pt-0 '>
          <SceneryItem label='20:00' color={colors[0]} />
          <SceneryItem label='21:00' color={colors[3]} />
          <SceneryItem label='22:00' color={colors[5]} />
          <SceneryItem label='23:00' color={colors[1]} />
          <SceneryItem label='00:00' color={colors[7]} />
        </Box>
        <SceneryItem label='00:30' type='end' />
      </div>
    </>
  );
}
