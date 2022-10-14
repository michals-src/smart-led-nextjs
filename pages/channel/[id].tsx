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
import channelContext from "@context/channel/channelContext";

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

const ChannelShadow = () => {
  const channelCtx = useContext(channelContext);
  const ShadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ShadowRef.current?.style.setProperty(
      "--app-canal-shadow",
      `${channelCtx.color}60`
    );
  }, [channelCtx.color]);

  return (
    <div
      ref={ShadowRef}
      className='absolute top-0 left-0 z-10 w-full h-[600px] canal-shadow'></div>
  );
};

const channelRGBPage = (props: TChannelRGBPage) => {
  const { channelID } = props;

  return (
    <Layout>
      <ChannelLayout>
        <ChannelShadow />
        <div className='relative h-full'>
          <div className='relative z-30 p-4'>
            <ChannelHeader />
            <ChannelPanel />
            <ChannelNav />
          </div>
        </div>
      </ChannelLayout>
      <Modal />
    </Layout>
  );
};

export default channelRGBPage;
