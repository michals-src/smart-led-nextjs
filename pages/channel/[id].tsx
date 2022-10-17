import React, { useContext, useEffect, useRef, useState } from "react";
import db from "@firebase";
import { get, child, ref } from "firebase/database";

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

const ChannelShadow = (props: any) => {
  const { channelID } = props;

  const channelCtx = useContext(channelContext);
  const ShadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chID = parseInt(channelID, 10);

    get(child(ref(db), `/channels/${chID}`)).then(snapshot => {
      if (snapshot.exists()) {
        channelCtx.events.color.update(snapshot.val().value);
        channelCtx.events.power.update(snapshot.val().power);
        channelCtx.events.brightness.update(snapshot.val().brightness);
      }
    });
    channelCtx.events.channelID.update(chID);

    ShadowRef.current?.style.setProperty(
      "--app-canal-shadow",
      `${channelCtx.color}60`
    );
  }, [channelCtx.color, channelID]);

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
        <ChannelShadow channelID={channelID} />
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
