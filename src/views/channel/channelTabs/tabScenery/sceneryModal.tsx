import { Box, Palette, Slider } from "@components";
import { CheckCircleIcon, ClockIcon, MinusIcon, PlusIcon, SunIcon } from "@heroicons/react/24/solid";
import { colors } from "@utils";
import React, { FC, useCallback, useEffect, useState } from "react";

interface ISceneryModal {
  index: number;
  time: {
    previous: string;
    current: string;
    next: string;
  };
  brightness: number;
  value: string;
  onSave: (value: string, time: string, brightness: number) => void;
}

const SceneryModal: FC<ISceneryModal> = (props) => {
  const { index, time, brightness, value, onSave } = props;

  const [paletteValue, setPaletteValue] = useState<string>("" === value ? "#FFFFFF" : value);
  const [brightnessValue, setBrightnessValue] = useState<number>(brightness);
  const [sliderValue, setSliderValue] = useState<number>(50);
  const [newTime, setNewTime] = useState<any>({ hour: 0, min: 0 });

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

  const previousTime = null === time.previous ? "00:00" : time.previous;
  const currentTime = null === time.current ? "24:00" : time.current;
  const nextTime = null === time.next ? "24:00" : time.next;

  const startTime = hhmm2time(previousTime);
  let endTime = hhmm2time(currentTime);

  if (null !== time.next) {
    endTime = hhmm2time(nextTime);
  }
  const diff = endTime - startTime;

  useEffect(() => {
    const newTime = Math.floor(startTime + diff * 0.5);
    setNewTime(time2hhmm(newTime));
  }, []);

  const sliderHandleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Math.floor(startTime + diff * (e.target.value / 100));

    setNewTime(time2hhmm(newTime));
    setSliderValue(e.target.value);
  }, []);

  const clockHandleClick = (action: string) => {
    let minTime = hhmm2time("00:00");
    let maxTime = hhmm2time("24:00");
    let currTime = hhmm2time(`${newTime.hour}:${newTime.min}`);

    setNewTime((state: typeof newTime) => {
      if ("plus" === action) {
        return hhmm2time(`${state.hour}:${state.min}`) < maxTime ? time2hhmm(currTime++) : state;
      }

      return hhmm2time(`${state.hour}:${state.min}`) > minTime ? time2hhmm(currTime--) : state;
    });
  };

  const brightnessHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrightnessValue(e.target.value);
  };

  const handlelColorClick = (e: React.MouseEvent) => {
    setPaletteValue(e.target.value);
  };

  useEffect(() => {
    const accTime = time.current.split(":");
    setNewTime({
      hour: accTime[0],
      min: accTime[1],
    });
    setSliderValue(((hhmm2time(currentTime) - startTime) * 100) / diff);
  }, []);

  return (
    <>
      <div className='p-4 mb-4'>
        <p className='text-xs text-zinc-300'>Edycja scenerii</p>
        <p className='text-sm'>Dodawanie nowego punktu</p>
      </div>
      <div className='relative mb-8'>
        <div>
          <Box className='text-center mb-4'>
            <div className='py-6 px-4'>
              <div className='flex flex-row flex-nowrap w-full justify-between items-center'>
                <button
                  className='p-1 rounded-lg bg-[#FFFFFF40] shadow-lg cursor-pointer'
                  onClick={(e) => clockHandleClick("minus")}>
                  <MinusIcon className='w-6 h-6 text-gray-900' />
                </button>
                <div className='w-full flex flex-row flex-nowrap items-center justify-center'>
                  <div className='mr-4'>
                    <ClockIcon className='w-6 h-6' />
                  </div>
                  <p className='text-zinc-100'>
                    {newTime.hour}
                    <span className='mx-3'>:</span>
                    {`${newTime.min}`.length < 2 ? "0" + newTime.min : newTime.min}
                  </p>
                </div>
                <button
                  className='p-1 rounded-lg bg-[#FFFFFF40] shadow-lg cursor-pointer'
                  onClick={(e) => clockHandleClick("plus")}>
                  <PlusIcon className='w-6 h-6 text-gray-900' />
                </button>
              </div>
            </div>
            <Slider
              onChange={sliderHandleChange}
              value={sliderValue}
              thumb={false}
              size='lg'
              step={0.1}
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
              <p className='text-xs text-zinc-100'>{previousTime}</p>
            </Box>
          </div>
          <div className='w-8/12 relative z-[9]'>
            <div className='relative'>
              <div className='p-4'>
                <Slider
                  size='sm'
                  track={false}
                  value={sliderValue}
                />
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
              <p className='text-xs text-zinc-100'>{time.next === null ? currentTime : nextTime}</p>
            </Box>
          </div>
        </div>
      </div>

      <div className='py-4'>
        <Box
          bgGradient={`${paletteValue}40`}
          className='p-4'>
          <Palette
            value={paletteValue}
            onClick={handlelColorClick}
          />

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
        <button
          className='py-3 px-4 bg-zinc-400 text-black rounded-lg mx-auto table shadow-lg'
          onClick={() =>
            onSave(index, paletteValue, `${newTime.hour}:${`${newTime.min}`.length < 2 ? "0" + newTime.min : newTime.min}`, parseInt(brightnessValue, 10))
          }>
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

export default SceneryModal;
