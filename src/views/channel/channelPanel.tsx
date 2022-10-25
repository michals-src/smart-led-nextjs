import React, { FC, ReactElement, useState, useContext, useEffect } from "react";
import db from "@firebase";
import { update, ref } from "firebase/database";
import { LightBulbIcon } from "@heroicons/react/24/solid";

import { Box, Slider, Switch } from "@components";
import { colors } from "@utils";
import channelContext from "@context/channel/channelContext";

type Props = {};

const channelPanel: FC = (props: Props): ReactElement => {
  const channelCtx = useContext(channelContext);

  const [powerValue, setPowerValue] = useState<boolean>(false);
  const [brightnessValue, setBrightnessValue] = useState<number>(0);

  const power_hadnelClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setPowerValue((state) => {
      const power = !state;
      update(ref(db), {
        [`/channels/${channelCtx.channelID}/power`]: power,
      });
      channelCtx.events.power.update(power);

      return power;
    });
  };

  const brightness_handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrightnessValue(e.target.value);
  };

  const brightness_handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    update(ref(db), {
      [`/channels/${channelCtx.channelID}/brightness`]: brightnessValue,
    });
    channelCtx.events.brightness.update(brightnessValue);
  };

  useEffect(() => {
    setPowerValue(channelCtx.power);
    setBrightnessValue(channelCtx.brightness);
  }, [channelCtx]);

  return (
    <Box bgGradient={powerValue ? channelCtx.color : `${channelCtx.color.substring(0, 7)}60`}>
      <>
        <div className='p-4 flex flex-row nowrap items-center'>
          <div className='w-2/12'>
            <LightBulbIcon className='w-6 h-6 text-white mx-auto' />
          </div>
          <div className='w-8/12 pl-4 pr-8'>
            <p className='text-sm'>Kanał {channelCtx.channelID + 1}</p>
            <p className='text-xs'>{brightnessValue} %</p>
          </div>
          <div className='w-2/12'>
            <Switch
              value={powerValue}
              onClick={power_hadnelClick}
              size='lg'
            />
          </div>
        </div>
        <div className='w-full'>
          <Slider
            onClick={brightness_handleClick}
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
