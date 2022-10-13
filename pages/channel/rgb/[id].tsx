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
        {/* <div className='relative min-h-screen h-screen overflow-hidden'> */}
        <div id='screen' className='relative h-full'>
          <div
            ref={ShadowRef}
            className='absolute top-0 left-0 z-10 w-full h-1/2 canal-shadow'></div>

          <div className='relative z-30 pt-8'>
            <div className='px-8'>
              <ChannelHeader />
              <ChannelPanel />
              <ChannelNav />
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
          </div>
        </div>
      </ChannelLayout>
      <Modal />
    </Layout>
  );
};

export default channelRGBPage;
