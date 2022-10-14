import { Box, Switch } from "@components";
import { BoltIcon, BoltSlashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useState } from "react";

import Lamp from "../../../images/pietro-piovesan-9UR3Zafm328-unsplash.png";

type Props = {};

const HomeGeneral = (props: Props) => {
  const [powerValue, setPowerValue] = useState<boolean>(false);

  const powerHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPowerValue(!powerValue);
  };

  return (
    <Box
      bgGradient={`${powerValue ? "#10F0FF4A" : "#10F0FF30"}`}
      className='mb-4 overflow-visible text-white'>
      <div>
        <div className='flex flex-row flex-nowrap justify-between'>
          <div className='w-8/12'>
            <div className='py-4 pl-6 h-full'>
              <div className='flex flex-col flex-nowrap h-full w-full justify-between'>
                <div>
                  <div className='mb-3'>
                    {!powerValue && (
                      <BoltSlashIcon
                        className={`w-6 h-6 ${
                          powerValue ? "text-yellow-100" : "text-white"
                        }`}
                      />
                    )}

                    {powerValue && (
                      <BoltIcon className={`w-6 h-6 text-white`} />
                    )}
                  </div>
                  <div className='mb-6'>
                    <p className='text-lg'>Zasilanie</p>
                    <p className='text-xs'>8 kanałów</p>
                  </div>
                </div>
                <div>
                  <Switch value={powerValue} onChange={powerHandleChange} />
                </div>
              </div>
            </div>
          </div>
          <div className='w-4/12 relative'>
            <Image alt='Obraz ozdobnej lampy' src={Lamp} className='w-full' />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default HomeGeneral;
