import type { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import {
  Box,
  ColorsPalette,
  Intensity,
  Layout,
  Palette,
  Panel,
  Scenery,
  Slider,
} from "../src/components";

import LampImage from "../images/pietro-piovesan-9UR3Zafm328-unsplash.png";
import {
  ClockIcon,
  PaintBrushIcon,
  PlusIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { LightenColor } from "../src/utilities";
import { colors } from "../src/components/customizer/colors/palette";
import Modal from "../src/components/Modal/modal";

const Home: NextPage = () => {
  const [canalShadow, setCanalShadow] = useState<string>("#9D0208");
  const ShadowRef = useRef(null);
  const PanelRef = useRef(null);

  const [brightnessValue, setBrightnessValue] = useState<number>(100);
  const [sliderValue, setSliderValue] = useState<number>(50);
  const [newTime, setNewTime] = useState<object>({ hour: 0, min: 0 });

  useEffect(() => {
    ShadowRef.current?.style.setProperty(
      "--app-canal-shadow",
      `${canalShadow}60`
    );
  }, [canalShadow]);

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

  const sliderHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Math.floor(startTime + diff * (e.target.value / 100));

    setNewTime(time2hhmm(newTime));
    setSliderValue(e.target.value);
  };


  const brightnessHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrightnessValue(e.target.value);
  };

  return (
    <Layout>
      <div className='relative min-h-screen'>
        <div
          ref={ShadowRef}
          className='absolute top-0 left-0 z-10 w-full h-1/2 canal-shadow'></div>
        {/* <div className='absolute z-20 top-0 right-0 w-6/12 h-80'>
          <Image
            src={LampImage}
            layout='fill'
            sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
          />
        </div> */}
        <div className='relative z-30 pt-8'>
          <div className='px-8'>
            <div className='mb-6'>
              <h4 className='font-bold'>Smart led</h4>
              <h6 className='text-sm text-zinc-300'>Witaj w aplikacji</h6>
            </div>
            <Panel color={canalShadow} initialRange={30} />
            <div className='mt-12 mb-6 p-4 flex flex-row nowrap space-x-12'>
              <div className='w-2/12 items-center cursor-pointer flex flex-col nowrap'>
                <div
                  className='rounded-full w-12 h-12 p-3 m-0'
                  style={{ background: "rgba(255,255,255,1)" }}>
                  <PaintBrushIcon className='m-0 w-auto text-zinc-900' />
                </div>
                <div className='mt-4 text-center'>
                  <p className='text-xs text-zinc-100 text-wrap'>
                    Paleta kolorów
                  </p>
                </div>
              </div>
              <div className='w-2/12 items-center cursor-pointer flex flex-col nowrap'>
                <div
                  className='rounded-full w-12 h-12 m-0'
                  style={{ background: "rgba(255,255,255,.1)" }}>
                  <ClockIcon className='m-0 p-3 w-auto text-zinc-100' />
                </div>
                <div className='mt-4 text-center'>
                  <p className='text-xs text-zinc-400 text-wrap'>Sceneria</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className='my-12'>
            <Intensity />
          </div> */}

          <div className='my-12 px-8'>
            <div className='mb-32'>
              <Palette state={setCanalShadow} />
            </div>
            <Scenery />
          </div>

          <div className='px-8'>
            {/* <ColorsPalette onCanalShadowChange={onCanalShadowChange} /> */}
          </div>
        </div>
      </div>
      <Modal>


        <Box>
          <div>
            <div className="p-3">
              <Box className='text-center mb-4'>
                <div className="py-2 px-4">
                  <p className='text-zinc-100 mx-auto'>
                    {newTime.hour} <span className='mx-3'>:</span>
                    {`${newTime.min}`.length < 2
                      ? "0" + newTime.min
                      : newTime.min}
                  </p>
                </div>
                <Slider
                  onChange={sliderHandleChange}
                  value={sliderValue}
                  thumb={false}
                />
              </Box>
            </div>
            <div className='flex flex-row flex-nowrap w-full justify-center items-center relative py-3 px-4'>
              <div
                className='w-full h-1/2 absolute left-0'
                style={{
                  background: `linear-gradient(to right, ${LightenColor(
                    colors[0]
                  )} 0%,${LightenColor(colors[3])}  150%)`,
                  top: "50%",
                  transform: "translateY(-50%)",
                  filter: "blur(30px)",
                }}></div>
              <div className='w-3/12 relative z-10'>
                <Box bgGradient={colors[0]} className='py-2 px-4'>
                  <p className='text-xs text-zinc-100'> 20:30</p>
                </Box>
              </div>
              <div className='w-8/12 relative z-[9]'>
                <div className='relative'>
                  <div className='p-4'>
                    <Slider
                      value={sliderValue}
                    />
                  </div>
                </div>
              </div>
              <div className='w-3/12 relative z-10'>
                <Box bgGradient={colors[3]} className='py-2 px-4'>
                  <p className='text-xs text-zinc-100'> 23:00</p>
                </Box>
              </div>
            </div>

          </div>

        </Box>
        <div className='py-10'>
          <Palette state={setCanalShadow} />
        </div>
        <Box className="p-4 mt-6">
          <div className="w-full">
            <div className="flex flex-row flex-nowrap w-full mb-1 justify-between px-3">
              <div className="w-8/12 pr-4 flex flex-row flex-nowrap items-center">
                <div className="table p-3">
                  <SunIcon className="w-4 h-4 text-white " />
                </div>
                <p className="text-sm">Jasność</p>
              </div>
              <div className="w-4/12 flex items-end self-center">
                <div className="table ml-auto">
                  <p className="text-lg">{brightnessValue} %</p>
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
      </Modal>

    </Layout>
  );
};

export default Home;
