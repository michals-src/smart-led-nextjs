import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ClockIcon,
  PaintBrushIcon,
  PlusIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import {
  Box,
  ColorsPalette,
  Intensity,
  Layout,
  Palette,
  Panel,
  Scenery,
  Slider,
  Modal,
} from "@components";

import { LightenColor } from "@utils";
import { colors } from "@utils";

import { GetServerSideProps } from "next";
import type { NextPage } from "next";

import LampImage from "../images/pietro-piovesan-9UR3Zafm328-unsplash.png";
import {
  ChannelHeader,
  ChannelLayout,
  ChannelNav,
  ChannelPanel,
} from "@views/channel";

type TChannelRGBPage = {
  channelID: string;
};

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    params: { id },
  } = context;

  return {
    props: {
      channelID: id,
    },
  };
};

const channelRGBPage = (props: TChannelRGBPage) => {
  const { channelID } = props;
  const [canalShadow, setCanalShadow] = useState<string>("#9D0208");
  const ShadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ShadowRef.current?.style.setProperty(
      "--app-canal-shadow",
      `${canalShadow}60`
    );
  }, [canalShadow]);

  return (
    <Layout>
      <ChannelLayout>
        <ChannelHeader />
        <ChannelPanel />
        <ChannelNav />
      </ChannelLayout>
      {/* <div className='relative min-h-screen h-screen overflow-hidden'> */}
      <div id='screen' className='relative h-full'>
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
      <Modal />
    </Layout>
  );
};

export default channelRGBPage;
