import React, { useContext, useRef, useState } from "react";
import { Box, Palette } from "@components";
import channelContext from "@context/channel/channelContext";

type Props = {};

const ChannelTabPalette = (props: Props) => {
  const colorRef = useRef<HTMLInputElement>(null);
  const channelCtx = useContext(channelContext);
  const [color, setColor] = useState<string>(channelCtx.color);

  const handleClick = (e: React.MouseEvent) => {
    channelCtx.events.color.update(e?.target.value);
    setColor(channelCtx.color);
  };

  return (
    <div className='pb-16'>
      <Box className='p-4'>
        <Palette ref={colorRef} onClick={handleClick} value={color} />
      </Box>
    </div>
  );
};

export default ChannelTabPalette;
