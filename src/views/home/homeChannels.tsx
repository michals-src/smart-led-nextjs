import React, { ReactElement, useContext, useEffect, useState } from "react";
import Link from "next/link";
import db from "@firebase";
import { ref, child, get, update } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ArrowRightIcon,
  BoltIcon,
  ClockIcon,
  Cog6ToothIcon,
  HandRaisedIcon,
  LightBulbIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import { default as popupContext } from "../../context/popup/popupContext";
import { Box, Palette, Slider, LoaderCircle, Switch } from "@components";
import Coolors from "src/components/Colors/coolors";
import { colors } from "@utils";

type Props = {};
type TChannel = {
  id: string;
  value: string;
  power: boolean;
  color?: string;
  type: string;
  order?: number;
};

// const channels = [
//   { id: uuidv4(), status: false, color: colors[1], type: "rgb", order: 0 },
//   { id: uuidv4(), status: false, color: colors[2], type: "rgb", order: 1 },
//   { id: uuidv4(), status: true, color: colors[3], type: "rgb", order: 2 },
//   { id: uuidv4(), status: false, color: colors[4], type: "rgb", order: 3 },
//   { id: uuidv4(), status: true, color: colors[5], type: "rgb", order: 4 },
//   { id: uuidv4(), status: false, color: colors[6], type: "rgb", order: 5 },
//   { id: uuidv4(), status: false, color: "#ffdf60A0", type: "mono", order: 6 },
//   { id: uuidv4(), status: true, color: "#ffdf60A0", type: "mono", order: 7 },
// ];

const Popup_screen_0 = () => {
  const [openColor, setOpenColor] = useState(false);
  const [color, setColor] = useState(colors[0]);

  const popupCtx = useContext(popupContext);

  return (
    <>
      <div className='mb-8'>
        <div className='flex flex-row flex-nowrap items-center'>
          <div className='w-1/12'>
            <BoltIcon className='w-6 h-6 text-white' />
          </div>
          <div className='w-7/12'>
            <div className='px-3'>
              <p className='text-sm'>Zasilanie</p>
              {/* <p className='text-xs text-zinc-500'>Indywidualne kanału</p> */}
            </div>
          </div>
          <div className='w-4/12'>
            <div className='ml-auto table'>
              <Switch size='lg' />
            </div>
          </div>
        </div>
      </div>

      {/* <div className='mt-12 mb-4'>
        <div className='flex flex-row flex-nowrap items-top'>
          <div className='w-8/12'>
            <div className='mb-1'>
              <p className='text-4xl font-bold'>Konfiguracja</p>
            </div>
          </div>
          <div className='w-4/12 pl-8'>
            <div className='w-auto table ml-auto rounded-full'>
              <div>
                <Cog6ToothIcon className='text-zinc-100 ml-auto w-8 h-8' />
              </div>
            </div>
          </div>
        </div>
        <p className='text-xs text-zinc-500'>Konfigurowanie pracy ręcznej</p>
      </div> */}

      <div className='my-8'>
        {!openColor && (
          <div
            className='w-full h-auto text-left'
            onClick={() => setOpenColor(true)}>
            <div className='flex flex-row flex-nowrap items-center'>
              <div className='w-1/12'>
                <Cog6ToothIcon className='w-6 h-6 text-white' />
              </div>
              <div className='w-11/12'>
                <div className='px-3'>
                  <p className='text-sm'>Zmiana kolor</p>
                  <p className='text-xs text-zinc-500'>Konfigurowanie pracy ręcznej</p>
                </div>
              </div>
              <div className='w-2/12'>
                <div className='ml-auto table'>
                  <ArrowLongRightIcon className='w-4 h-4' />
                </div>
              </div>
            </div>
          </div>
        )}

        {openColor && (
          <Box>
            <>
              <div className='p-4 flex flex-row nowrap items-center'>
                <div className='w-2/12'>
                  <Cog6ToothIcon className='w-6 h-6 text-white mx-auto' />
                </div>
                <div className='w-8/12 pl-4 pr-8'>
                  <p className='text-sm'>Kolor</p>
                  <p className='text-xs text-zinc-500'>Działanie tylko w trybie manualnym</p>
                </div>
                <div className='w-2/12'>
                  <button
                    className='table ml-auto p-2 bg-zinc-900 rounded-full'
                    onClick={() => setOpenColor(false)}>
                    <XMarkIcon className='w-3 h-3 text-white mx-auto' />
                  </button>
                </div>
              </div>
              <div className='p-3'>
                <Coolors
                  value={color}
                  onClick={(e) => setColor(e.target.value)}
                />
              </div>
            </>
          </Box>
        )}
      </div>

      <Box>
        <>
          <div className='p-4 flex flex-row nowrap items-center'>
            <div className='w-2/12'>
              <SunIcon className='w-6 h-6 text-white mx-auto' />
            </div>
            <div className='w-8/12 pl-4 pr-8'>
              <p className='text-sm'>Jasność</p>
            </div>
            <div className='w-2/12'>
              <p className='text-xs'>100 %</p>
            </div>
          </div>
          <div className='w-full'>
            <Slider
              size='lg'
              thumb={false}
            />
          </div>
        </>
      </Box>
      <div className='mt-8'>
        <div className='flex flex-col md:flex-row flex-nowrap items-center space-y-3 md:space-x-3'>
          <div className='w-full md:w-6/12'>
            <button className='w-full h-full border border-zinc-700 bg-zinc-800 rounded-lg py-4 px-5 shadow-lg'>
              <div className='flex flex-row items-center'>
                <div className='w-2/12'>
                  <HandRaisedIcon className='w-8 h-8' />
                </div>
                <div className='w-10/12 md:pl-6'>
                  <div className='text-left'>
                    <p className='text-sm text-white'>Tryb ręczny</p>
                    <p className='text-xs text-zinc-500 mt-1'>Manualne sterowanie kolorem</p>
                  </div>
                </div>
              </div>
            </button>
          </div>
          <div className='w-full md:w-6/12'>
            <button className='w-full h-full border border-transparent rounded-lg py-4 px-5'>
              <div className='flex flex-row items-center'>
                <div className='w-2/12'>
                  <ClockIcon className='w-8 h-8 text-zinc-600' />
                </div>
                <div className='w-10/12 md:pl-6'>
                  <div className='text-left'>
                    <p className='text-sm text-zinc-400'>Scena</p>
                    <p className='text-xs text-zinc-600 mt-1'>Działanie według określonego scenariusza</p>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Popup_screen_1 = () => {
  const popupCtx = useContext(popupContext);

  return (
    <>
      <div>
        <Palette value='#000000' />
      </div>

      <div>
        <button
          className='w-full h-auto text-left border bg-[#ffffff10] border-zinc-700 rounded-lg py-3 px-6'
          onClick={() => popupCtx.onUpdatePopupScreenIndex(0)}>
          <div className='flex flex-row flex-nowrap items-center'>
            <div className='w-2/12'>
              <div className='mr-auto table'>
                <ArrowLongLeftIcon className='w-4 h-4 text-zinc-500' />
              </div>
            </div>

            <div className='w-9/12'>
              <div className='px-3'>
                <p className='text-sm text-zinc-400'>Powrót</p>
                <p className='text-xs text-zinc-600'>Ustawienia ogólne</p>
              </div>
            </div>
            <div className='w-1/12'>
              <Cog6ToothIcon className='w-6 h-6 text-zinc-400' />
            </div>
          </div>
        </button>
      </div>
    </>
  );
};

const HourGlassSplit = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      className='w-6 h-6'
      viewBox='0 0 16 16'>
      <path d='M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z' />
    </svg>
  );
};

const Channel = (props: TChannel): ReactElement => {
  const { id, value, power, color, type, order } = props;
  const popupCtx = useContext(popupContext);

  const [boxProps, setBoxProps] = useState<object>({
    bgGradient: "#FFFFFF20",
  });
  const [powerValue, setPowerValue] = useState<boolean>(power);

  useEffect(() => {
    // if (powerValue) {
    //   setBoxProps({ ...boxProps, bgGradient: `${value}` });
    //   return;
    // }
    setBoxProps({ ...boxProps, bgGradient: `${value.substring(0, 7)}35` });
  }, [powerValue]);

  const power_handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPowerValue((state) => {
      update(ref(db), {
        [`/channels/${id}/power`]: !state,
      });

      return !state;
    });
  };

  const channelPopup = () => {
    popupCtx.onUpdatePopupIcon(LightBulbIcon);
    popupCtx.onUpdatePopupScreenList([() => <Popup_screen_0 />, Popup_screen_1]);
    popupCtx.onUpdatePopupScreenIndex(0);
    popupCtx.onUpdatePopupTitle("Ustawienia", `Kanał ${id + 1}`);
    popupCtx.onUpdatePopupVisible(true);
  };

  return (
    <Box
      className='relative h-full rounded-2xl'
      onClick={() => channelPopup()}
      // style={{ boxShadow: `0 0 15px ${value}15` }}
      // style={{ border: `1px solid #ffffff00` }}
      {...boxProps}>
      <div className='flex flex-col flex-nowrap w-full h-full relative z-20'>
        <div className='py-3 px-4 my-1'>
          <div className='flex flex-col flex-nowrap'>
            {/* <div className='w-1/12'>
              <div className='flex flex-col items-center'>
                <div
                  className='w-3 h-3 p-1 rounded-full'
                  style={{ background: `${value}` }}></div>
              </div>
            </div> */}

            <div>
              <div className='flex flex-row flex-nowrap items-center'>
                <div className='mr-3'>
                  <p className='text-sm pointer-events-none'>Kanał {id + 1}</p>
                </div>
                <div
                  className='w-2 h-2 p-1 rounded-full ml-auto'
                  style={{ background: `${powerValue ? "#0ee10e" : "#ffffff30"}`, boxShadow: `0 0 6px ${powerValue ? "#02ff02" : "transparent"}` }}></div>
              </div>
            </div>

            <div className='mb-4'>
              <div className='table'>
                <div className='flex flex-row flex-nowrap items-center'>
                  {/* <div
                    className='w-2 h-2 p-1 rounded-sm mr-4'
                    style={{ background: `${value}` }}></div> */}
                  <p className='text-xs text-[#ffffff35]'>{type.toLowerCase()}</p>
                </div>
              </div>
            </div>

            <div>
              <div className='flex flex-row flex-nowrap items-center justify-between'>
                <div>
                  <Link href={`/channel/${id}`}>
                    <div className='table p-1 bg-zinc-700 rounded-full ml-auto shadow-lg cursor-pointer'>
                      <Cog6ToothIcon className='w-4 h-4 text-white' />
                    </div>
                  </Link>
                </div>
                <div>
                  <div className='table rounded-full ml-auto shadow-lg cursor-pointer'>
                    {/* <ClockIcon className='w-4 h-4 text-[#ffffff30]' /> */}
                    <HandRaisedIcon className='w-4 h-4 text-[#ffffff30]' />
                  </div>
                </div>
                {/* <div className='w-6/12'>
                  <div className='table ml-auto'>
                    <Switch
                      value={powerValue}
                      onChange={power_handleChange}
                    />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div>
          <Slider
            value={50}
            size='sm'
            thumb={false}
          />
        </div>
      </div>
      {/* <div className='absolute z-10 left-0 bottom-0'>
        <p
          className='text-6xl font-bold'
          style={{
            color: "#FFFFFF15",
            transform: "translate(-18%, 15%)",
            textShadow: "3px 3px 8px #00000010",
          }}>
          {id + 1}
        </p>
      </div> */}
    </Box>
  );
};

const HomeChannels = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [channels, setChannels] = useState<any>([]);

  useEffect(() => {
    get(child(ref(db), "channels"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setChannels(Object.values(snapshot.val()));
          setLoading(false);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <div className='mt-12 mb-3 px-3'>
        <p className='text-4xl font-bold leading-tight'>Zarządzaj kanałami</p>
        <p className='text-xs text-zinc-500'>Lista dostępnych kanałów</p>
      </div>
      {loading && (
        <Box className='p-4'>
          <div className='flex flex-row items-center justify-center'>
            {/* <div className="mr-4">
              <HourGlassSplit />
            </div>
            <p>Ładowanie</p> */}
            <LoaderCircle size='lg' />
          </div>
        </Box>
      )}
      {!loading && (
        <div className='flex flex-row flex-wrap -mx-1'>
          {channels.map((channel: any, idx: number) => {
            return (
              <div
                key={idx}
                className='w-6/12 p-1'>
                <Channel
                  key={idx}
                  id={idx}
                  {...channel}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomeChannels;
