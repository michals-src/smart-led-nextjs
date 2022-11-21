import React, { useContext, useEffect, useRef, useState } from "react";
import channelContext from "@context/channel/channelContext";

type Props = {};

const ChannelHeader = (props: Props) => {
  return (
    <div className='relative'>
      <div className='mb-6'>
        <h4 className='text-xs text-zinc-300'>Konfiguracja</h4>
        <h6>Zarządzanie kanałem</h6>
      </div>
    </div>
  );
};

export default ChannelHeader;
