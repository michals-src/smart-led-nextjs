import React, { FC, ReactElement, useState, useContext } from "react";
import { LightBulbIcon } from "@heroicons/react/24/solid";
import { default as ChannelCtx } from "@context/channel/channelContext";
import { Box, Slider, Switch } from "@components";
import { colors } from "@utils";

type Props = {};

const channelPanel: FC = (props: Props): ReactElement => {
  const channelCtx = useContext(ChannelCtx);
  const { color } = channelCtx;

  const [powerValue, setPowerValue] = useState<boolean>(false);
  const [brightnessValue, setBrightnessValue] = useState<number>(0);

  const power_hadnelClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setPowerValue(!powerValue);
  };

  const brightness_handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrightnessValue(e.target.value);
  };

  return (
    <Box bgGradient={color}>
      <>
        <div className='p-4 flex flex-row nowrap items-center'>
          <div className='w-2/12'>
            <LightBulbIcon className='w-6 h-6 text-white mx-auto' />
          </div>
          <div className='w-8/12 pl-4 pr-8'>
            <p className='text-sm'>Kanał 1</p>
            <p className='text-xs'>{brightnessValue} %</p>
          </div>
          <div className='w-2/12'>
            <Switch value={powerValue} onClick={power_hadnelClick} size='lg' />
          </div>
        </div>
        <div className='w-full'>
          <Slider
            onChange={brightness_handleChange}
            value={brightnessValue}
            size='lg'
            thumb={false}
          />
          {/* <PanelRange
            ref={progressRef}
            rangeValue={rangeValue}
            handleChange={handleRangeChange}
          /> */}
        </div>
      </>
    </Box>
  );
};

export default channelPanel;
