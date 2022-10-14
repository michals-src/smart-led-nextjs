import React, { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

import { Box, Switch } from "@components";
import { colors } from "src/components/customizer/colors/palette";
import Link from "next/link";

type Props = {};
type TChannel = {
  id: string;
  value: number;
  status: boolean;
  color: string;
  type: string;
  order: number;
};

const channels = [
  { id: uuidv4(), status: false, color: colors[1], type: "rgb", order: 0 },
  { id: uuidv4(), status: false, color: colors[2], type: "rgb", order: 1 },
  { id: uuidv4(), status: true, color: colors[3], type: "rgb", order: 2 },
  { id: uuidv4(), status: false, color: colors[4], type: "rgb", order: 3 },
  { id: uuidv4(), status: true, color: colors[5], type: "rgb", order: 4 },
  { id: uuidv4(), status: false, color: colors[6], type: "rgb", order: 5 },
  { id: uuidv4(), status: false, color: "#ffdf60A0", type: "mono", order: 6 },
  { id: uuidv4(), status: true, color: "#ffdf60A0", type: "mono", order: 7 },
];

const Channel = (props: TChannel): ReactElement => {
  const { id, value, status, color, type, order } = props;

  const [boxProps, setBoxProps] = useState<object>({
    bgGradient: "#FFFFFF20",
  });
  const [powerValue, setPowerValue] = useState<boolean>(status);

  useEffect(() => {
    if (powerValue) {
      setBoxProps({ ...boxProps, bgGradient: `${color}` });
      return;
    }
    setBoxProps({ ...boxProps, bgGradient: `#FFFFFF20` });
  }, [powerValue]);

  const power_handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPowerValue(!powerValue);
  };

  return (
    <Box className='relative py-3 px-4 h-full' {...boxProps}>
      <div className='flex flex-col flex-nowrap w-full h-full relative z-20'>
        <div className='my-1'>
          <div className='flex flex-row flex-nowrap justify-between items-center'>
            <div className='w-8/12'>
              <p className='text-xs' style={{ color: "#FFFFFF80" }}>
                {type.toUpperCase()}
              </p>
              <p className='text-sm pointer-events-none'>Kanał {value + 1}</p>
            </div>
            <div className='w-4/12'>
              <div className='flex flex-row flex-nowrap items-center'>
                <div className='w-6/12'>
                  <Link href={`/channel/${id}`}>
                    <div className='table p-1 bg-[#FFFFFF60] rounded-full ml-auto shadow-lg cursor-pointer'>
                      <Cog6ToothIcon className='w-4 h-4 text-white' />
                    </div>
                  </Link>
                </div>
                <div className='w-6/12'>
                  <div className='table ml-auto'>
                    <Switch value={powerValue} onChange={power_handleChange} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='absolute z-10 left-0 bottom-0'>
        <p
          className='text-6xl font-bold'
          style={{
            color: "#FFFFFF15",
            transform: "translate(-18%, 15%)",
            textShadow: "3px 3px 8px #00000010",
          }}>
          {value + 1}
        </p>
      </div>
    </Box>
  );
};

const HomeChannels = (props: Props) => {
  return (
    <div>
      <div className='mt-8 mb-1 px-3'>
        <p>Zarządzaj kanałami</p>
      </div>
      <div className='flex flex-row flex-wrap -mx-1'>
        {channels.map((channel, idx) => {
          return (
            <div key={uuidv4()} className='w-full p-1'>
              <Channel key={uuidv4()} value={idx} {...channel} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeChannels;
