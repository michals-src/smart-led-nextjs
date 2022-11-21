import React, { useContext, useRef, useState } from "react";
import db from "@firebase";
import { child, ref, update } from "firebase/database";
import { Box, Palette } from "@components";
import channelContext from "@context/channel/channelContext";

type Props = {};

const ChannelTabPalette = (props: Props) => {
  const channelCtx = useContext(channelContext);
  const colorRef = useRef<HTMLInputElement>(null);
  const [color, setColor] = useState<string>(channelCtx.color);

  const handleClick = (e: any) => {
    channelCtx.events.color.update(e.target.value);
    update(ref(db), {
      [`/channels/${channelCtx.channelID}/value`]: e.target.value,
    });
    setColor(channelCtx.color);
  };

  return (
    <div className='pb-16'>
      <Box className='p-4'>
        <Palette
          ref={colorRef}
          onClick={handleClick}
          value={color}
        />
      </Box>
    </div>
  );
};

export default ChannelTabPalette;
