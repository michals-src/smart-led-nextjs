import React, {
  Children,
  FC,
  forwardRef,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import db from "@firebase";
import { update, ref } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

import {
  ClockIcon,
  Cog6ToothIcon,
  FlagIcon,
  PlayIcon,
  PlusIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

import modalContext from "@context/modal/modalContext";
import channelContext from "@context/channel/channelContext";
import useGet from "src/hooks/firebase/useGet";

import { colors } from "@utils";
import { Box, LoaderCircle, Slider } from "@components";

import SceneryModal from "./tabScenery/sceneryModal";
import SceneryEditor from "./tabScenery/sceneryEditor";
import useScenery from "src/hooks/scenery/useScenery";

type IScenery = {};

export default function ChannelTabScenery({ }: IScenery) {
  const { viewModal } = useContext(modalContext);
  const { channelID } = useContext(channelContext);
  //const { data, loading, error } = useGet(`scenery/${channelID}`);
  const { data, loading, error } = useScenery(channelID);
  const [scenerios, setScenerions] = useState<typeof data>(
    null === data ? [] : data
  );

  const handleCreate = (
    index: number,
    value: string,
    time: string,
    brightness: number
  ): void => {
    setScenerions((state: any) => {
      const start = [...state].slice(0, index);
      const end = [...state].slice(index, state.length);
      const newState = [...start, { value, time, brightness }, ...end];

      update(ref(db), {
        [`/scenery/${channelID}`]: newState,
      });

      return newState;
    });
  };

  const handleUpdate = (
    index: number,
    value: string,
    time: string,
    brightness: number
  ) => {
    setScenerions((state: any) => {
      const newState = [...state];
      newState[index] = { value, time, brightness };

      update(ref(db), {
        [`/scenery/${channelID}`]: newState,
      });

      return newState;
    });
  };

  const handleRemove = (index: number) => {
    setScenerions((state: any) => {
      const newState = [...state].filter((params, key) => {
        if (key !== index) return params;
      });
      update(ref(db), {
        [`/scenery/${channelID}`]: newState,
      });
      return newState;
    });
  };

  const SceneryCreate = ({
    index,
    previous,
    current,
    brightness,
    color = "",
  }) => {
    return (
      <div className='w-1/2 mx-auto px-2 relative'>
        <div
          className='w-full h-12 relative'
          style={{
            filter: "blur(40px)",
            background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, ${"" === color ? "#FFFFFF40" : color
              } 150%)`,
          }}></div>
        <div
          className='w-1 h-12 absolute top-0 bg-white opacity-[0.4] bottom-0 left-[50%]'
          style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, ${"" === color ? "#FFFFFF40" : color
              } 100%)`,
            transform: "translateX(-50%)",
            filter: "blur(1px)",
          }}></div>
        <div
          className='absolute top-[50%] left-[50%] opacity-[0.85]'
          style={{
            transform: "translate(-50%, -50%)",
          }}>
          <div
            className='w-auto table p-1 bg-white rounded-full cursor-pointer'
            onClick={() => {
              viewModal(
                <SceneryModal
                  index={index}
                  onSave={handleCreate}
                  previous={previous}
                  current={current}
                  brightness={brightness}
                  color={"" === color ? colors[0] : color}
                />
              );
            }}>
            <PlusIcon className='w-3 h-3 text-black shadow-xl' />
          </div>
        </div>
      </div>
    );
  };

  const SceneryItem = ({
    index = 0,
    type = "normal",
    label = "",
    color = "",
    previous = null,
    next = null,
    brightness = 100,
  }) => {
    return (
      <div>
        {(type === "normal" || type === "end") && (
          <SceneryCreate
            index={index}
            previous={previous}
            current={label}
            brightness={brightness}
            color={color}
          />
        )}
        <Box
          className={`px-4 pt-3 ${"end" === type ? "pb-3 " : "pb-1 "
            } relative z-10`}
          bgGradient={"" === color ? "#FFFFFF15" : color}>
          <div className='flex flex-row flex-nowrap items-center justify-center'>
            <div className='mr-1'>
              {type === "start" && <PlayIcon className='w-5 h-5 text-white' />}
              {type === "normal" && (
                <ClockIcon className='w-5 h-5 text-white' />
              )}
              {type === "end" && <FlagIcon className='w-5 h-5 text-white' />}
            </div>
            <p
              className={`text-xs text-white ${"end" == type ? "w-full text-center" : "ml-4"
                }`}>
              {label}
            </p>
            {type === "normal" && (
              <div className='w-1/12 ml-auto'>
                <div
                  className='bg-[#00000040] p-1 rounded-full cursor-pointer table'
                  onClick={() => {
                    handleRemove(index);
                  }}>
                  <TrashIcon className='w-5 h-5 text-white' />
                </div>
              </div>
            )}
            {["normal", "end"].indexOf(type) !== -1 && (
              <div className={`w-1/12 ${"end" === type ? "" : "ml-6"}`}>
                <div
                  className='bg-[#00000040] p-1 rounded-full cursor-pointer table'
                  onClick={() =>
                    viewModal(
                      <SceneryEditor
                        index={index}
                        onSave={handleUpdate}
                        previous={"end" === type ? "00:00" : previous}
                        next={"end" === type ? "24:00" : next}
                        current={label}
                        brightness={brightness}
                        color={"" === color ? colors[0] : color}
                      />
                    )
                  }>
                  <Cog6ToothIcon className='w-5 h-5 text-white' />
                </div>
              </div>
            )}
          </div>
          {"normal" === type && (
            <>
              <div className='pb-1 pt-3'>
                <Slider size='sm' thumb={false} value={brightness} />
              </div>
            </>
          )}
        </Box>
        {type === "start" && (
          <div className='flex flex-row flex-nowrap items-center justify-center'>
            <div className='bg-[#FFFFFF15] w-1 h-6'></div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (data.length <= 0) {
      setScenerions((state: any) => {
        return [
          {
            value: "#FFFFFF40",
            time: "24:00",
            brightness: null,
          },
        ];
      });

      return;
    }

    setScenerions(data);
  }, [data]);

  /**
   * data.length <= 1 === ERROR
   *    data[0] => end point
   */

  return (
    <>
      <div className='flex flex-col nowrap w-full h-auto'>
        {(loading || null !== error) && (
          <Box className='p-4'>
            <div className='flex flex-row flex-wrap items-center justify-center'>
              {loading && <LoaderCircle />}
              {null !== error && !loading && (
                <>
                  <div className='w-full mb-4'>
                    <div className='table mx-auto'>
                      <XCircleIcon className='w-8 h-8 text-gray-400' />
                    </div>
                  </div>
                  <div className='w-full text-center'>
                    <p className='text-sm'>{error}</p>
                  </div>
                </>
              )}
            </div>
          </Box>
        )}
        {!loading && null === error && scenerios.length <= 1 && (
          <Box className='p-4'>
            <div className='flex flex-row flex-wrap items-center justify-center'>
              <>
                <div className='w-full mb-4'>
                  <div className='table mx-auto'>
                    <XCircleIcon className='w-8 h-8 text-gray-400' />
                  </div>
                </div>
                <div className='w-full text-center'>
                  <p className='text-sm'>Brak</p>
                </div>
              </>
            </div>
          </Box>
        )}
        {scenerios.length - 1 > 0 && (
          <>
            <Box className='p-4 pt-0 '>
              {scenerios
                .slice(0, scenerios.length - 1)
                .map((sceneryChild: any, idx: number) => {
                  return (
                    <>
                      <SceneryItem
                        key={uuidv4()}
                        index={idx}
                        previous={idx === 0 ? "00:00" : scenerios[idx - 1].time}
                        next={
                          idx === scenerios.length - 1
                            ? "24:00"
                            : scenerios[idx + 1].time
                        }
                        brightness={sceneryChild.brightness}
                        label={sceneryChild.time}
                        color={sceneryChild.value}
                      />
                    </>
                  );
                })}
            </Box>
          </>
        )}
        {!loading && (
          <SceneryItem
            key={`9999-${uuidv4()}`}
            index={scenerios.length - 1}
            previous={
              scenerios?.length >= 2
                ? scenerios[scenerios.length - 2].time
                : "00:00"
            }
            label={
              scenerios?.length >= 1
                ? scenerios[scenerios.length - 1].time
                : "24:00"
            }
            type='end'
          />
        )}
      </div>
    </>
  );
}

/**
 * ChannelTabScenery -> Gradient
 */

//  const Gradient = ({ color1, color2 }: any) => {
//   return (
//     <div className='w-1/2 mx-auto px-2 relative'>
//       <div
//         className='w-full h-12 relative'
//         style={{
//           filter: "blur(40px)",
//           background: `linear-gradient(to bottom, ${color1} 0%, ${color2} 150%)`,
//         }}></div>
//       <div
//         className='w-1 h-12 absolute top-0 bg-white'
//         style={{
//           background: `linear-gradient(to bottom, ${color1} 0%, ${color2} 100%)`,
//           bottom: 0,
//           left: "50%",
//           transform: "translateX(-50%)",

//           opacity: ".4",
//           filter: "blur(1px)",
//         }}></div>
//       <div
//         className='absolute'
//         style={{
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           opacity: ".85",
//         }}>
//         <div
//           className='w-auto table p-1 bg-white rounded-full cursor-pointer'
//           onClick={() => {
//             viewModal(<SceneryModal />);
//           }}>
//           <PlusIcon className='w-3 h-3 text-black shadow-xl' />
//         </div>
//       </div>
//     </div>
//   );
// };
