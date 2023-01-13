import { useContext, useState, useRef, useEffect, forwardRef } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";

import { ArrowLongLeftIcon, BookmarkIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { ArrowLongRightIcon, BackwardIcon, CheckIcon, ClockIcon, ForwardIcon, MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Box, Switch } from "@components";
import Coolors from "src/components/Colors/coolors";
import popupContext from "../../../../context/popup/popupContext";
import { colors, timeAstimestamp, timestampAstime, timeAsText } from "@utils";

const formCheckClassname = "w-[20px] h-[20px] mx-auto border-2 border-white rounded-full";

const CheckIsChecked = (props) => {
  return (
    <div
      className={`${formCheckClassname} bg-white`}
      {...props}>
      <div className=' w-full h-full flex flex-col items-center justify-center'>
        <CheckIcon className='w-5 h-5 text-zinc-900' />
      </div>
    </div>
  );
};

const Check = (props) => {
  return (
    <div
      className={formCheckClassname}
      {...props}>
      <div className=' w-full h-full flex flex-col items-center justify-center'></div>
    </div>
  );
};

const CanalItemExpand = (props) => {
  const { canalID, isActive, isFirst, isLast, canalColor } = props;

  const [active, setActive] = useState(isActive);
  const [color, setColor] = useState(canalColor);
  const cnWrapper = classNames("cursor-pointer py-6 px-6  bg-[#00000040]", {
    "rounded-b-3xl": isLast,
    "rounded-t-3xl": isFirst,
  });

  return (
    <div className={cnWrapper}>
      <div className='w-full flex flex-row flex-nowrap items-center'>
        <div className='w-1/12 self-start pt-2'>
          {active && <CheckIsChecked onClick={() => setActive(false)} />}
          {!active && <Check onClick={() => setActive(true)} />}
        </div>
        <div className='w-9/12'>
          <div className='px-6'>
            {/* <div className='text-sm'>Kanał {canalID}</div> */}
            <div className='mt-2'>
              <Coolors
                value={color}
                onClick={(e) => setColor(e.target?.value)}
                align='start'
              />
            </div>
          </div>
        </div>
        <div className='w-2/12'>
          <button
            className='table ml-auto p-2 bg-[#00000070] rounded-full'
            onClick={props.onClick}>
            <XMarkIcon className='w-3 h-3 text-white mx-auto' />
          </button>
        </div>
      </div>
    </div>
  );
};

const CanalItem = (props) => {
  const { canalID, isActive, canalColor } = props;

  return (
    <div
      className='cursor-pointer py-6 px-6 rounded-3xl'
      {...props}>
      <div className='w-full flex flex-row flex-nowrap items-center'>
        <div className='w-1/12 self-start pt-2'>
          <div className='p-2 rounded-lg bg-zinc-900 flex flex-col justify-center items-center'>
            <div
              className='w-3 h-3 inline-block rounded-full'
              style={{ backgroundColor: canalColor }}></div>
          </div>
        </div>
        <div className='w-10/12'>
          <div className='px-6'>
            <div className='text-sm'>Kanał {canalID}</div>
          </div>
        </div>
        <div className='w-1/12'>
          <div>
            {isActive && <CheckIsChecked />}
            {!isActive && <Check />}
          </div>
        </div>
      </div>
    </div>
  );
};

const canals = [
  {
    isActive: false,
    canalColor: colors[0],
  },
  {
    isActive: false,
    canalColor: colors[1],
  },
  {
    isActive: false,
    canalColor: colors[2],
  },
  {
    isActive: false,
    canalColor: colors[3],
  },
];

const SceneChildView = forwardRef((props, ref) => {
  const { childIndex, sceneChildren } = props;
  const children = useSelector((state) => state.scenes.children);
  const popupCtx = useContext(popupContext);

  const [channelExpanded, setChannelExpanded] = useState(-1);

  const [sliderValue, setSliderValue] = useState(100);
  const [openChangeTitle, setOpenChangeTitle] = useState(false);

  const [timeline, setTimeline] = useState([-1, -1, -1]);

  const sliderIndicatorRef = useRef(null);

  const duration = (pt, ct, nt) => {
    return ((ct - pt) / (nt - pt)) * 100;
  };

  const previousTime = childIndex > 0 ? sceneChildren[childIndex - 1].timestamp : 0;
  const currentTime = sceneChildren[childIndex].timestamp;
  const nextTime = childIndex < sceneChildren.length - 1 ? sceneChildren[childIndex + 1].timestamp : timeAstimestamp("24:00");
  // const previousTime = timeAstimestamp("19:00");
  // const currentTime = timeAstimestamp("20:00");
  // const nextTime = timeAstimestamp("21:00");

  const dur = duration(previousTime, currentTime, nextTime);

  useEffect(() => {
    setTimeline([previousTime, currentTime, nextTime]);
    setSliderValue(dur);

    // return () => {
    //   cleanup;
    // };
  }, []);

  const handleChange_Slider = (e) => {
    const newTime = Math.floor(timeline[0] + (Math.floor(e.target.value) / 100) * (timeline[2] - timeline[0]));
    setSliderValue(e.target.value);
    setTimeline((state) => {
      state[1] = newTime;
      return state;
    });
    sliderIndicatorRef.current.style.width = `${e.target.value}%`;
  };

  const handleClick_Item = () => {
    popupCtx.onUpdatePopupScreenData([
      {
        costam: "okno edycji przejścia",
      },
    ]);
    popupCtx.onUpdatePopupScreenIndex(1);
  };

  return (
    <>
      <div ref={ref}>
        <div className='mb-3 px-4'>
          <p className='text-sm text-zinc-500'>Ustawienia czasu</p>
        </div>
        <div className='mb-8 bg-zinc-800 rounded-3xl'>
          <div className='flex flex-row flex-nowrap items-center px-6 py-4'>
            <div className='w-1/12'>
              <div className='p-2 rounded-lg bg-zinc-700'>
                <BackwardIcon
                  size={32}
                  className='w-4 h-4 text-zinc-400'
                />
              </div>
            </div>
            <div className='w-3/12'>
              <div className='px-6'>
                <p className='text-sm text-zinc-400 select-none'>Poprzedni</p>
              </div>
            </div>
            <div className='w-8/12'>
              <div className='px-3 text-right'>
                <p className='text-sm text-zinc-400 select-none'>{timeAsText(timestampAstime(previousTime))}</p>
              </div>
            </div>
          </div>
          {!openChangeTitle && (
            <div className='px-6'>
              <div
                className='flex flex-row flex-nowrap items-center cursor-pointer border-y py-4 border-[#FFFFFF15]'
                onClick={() => setOpenChangeTitle(true)}>
                <div className='w-1/12'>
                  <div className='p-2 rounded-lg bg-zinc-700'>
                    <ClockIcon
                      size={32}
                      className='w-4 h-4 text-white'
                    />
                  </div>
                </div>
                <div className='w-3/12'>
                  <div className='px-6'>
                    <p className='text-sm select-none'>Obecny</p>
                  </div>
                </div>
                <div className='w-8/12'>
                  <div className='px-3 text-right'>
                    <p className='text-sm select-none'>{timeAsText(timestampAstime(currentTime))}</p>
                  </div>
                </div>
              </div>
              {/* <div className='mt-3 w-full'>
                <div className='flex flex-row flex-nowrap items-center w-full'>
                  <div className='w-11/12 pr-3'>
                    <div className='table mr-auto'>
                      <p className='text-sm text-orange-600'>Edytuj</p>
                    </div>
                  </div>
                  <div className='w-1/12'>
                    <div className='mr-auto table'>
                      <ArrowLongRightIcon className='w-4 h-4 text-zinc-500' />
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          )}

          {openChangeTitle && (
            <Box className='my-3 '>
              <>
                <div className='pt-4 px-4 flex flex-row flex-nowrap items-center'>
                  <div className='w-2/12'>
                    <ClockIcon
                      size={32}
                      className='w-6 h-6 text-white'
                    />
                  </div>
                  <div className='w-10/12 '>
                    <p className='text-sm'>Zmiana godziny</p>
                    <p className='mt-1 text-xs text-zinc-400'>Czas określający rozpoczęcie działania przejścia</p>
                  </div>
                  <div className='w-2/12'>
                    <button
                      className='table ml-auto p-2 bg-zinc-900 rounded-full'
                      onClick={() => setOpenChangeTitle(false)}>
                      <XMarkIcon className='w-3 h-3 text-white mx-auto' />
                    </button>
                  </div>
                </div>
                <div className='p-3'>
                  <div className='flex flex-row flex-nowrap mt-6'>
                    <div>
                      <div className='p-1 bg-zinc-900 rounded-lg'>
                        <MinusIcon className='w-4 h-4' />
                      </div>
                    </div>
                    <div className='w-full px-3'>
                      <div className='relative'>
                        <div className='w-full h-6 bg-zinc-900 rounded-lg relative'>
                          <div
                            ref={sliderIndicatorRef}
                            className={`min-w-3 h-full relative pl-3`}
                            style={{ width: `${sliderValue}%` }}>
                            <div className='absolute w-3 h-full bg-white rounded-sm top-0 right-0'>
                              <div className='relative -m-1'>
                                <div
                                  className='absolute top-0 left-[50%] py-1 px-3 rounded-lg bg-black'
                                  style={{ transform: "translate(-50%, -100%)" }}>
                                  <p className='text-xs select-none'>{timeAsText(timestampAstime(timeline[1]))}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <input
                          type='range'
                          className='absolute top-[50%] left-0 w-full h-[200%] opacity-0 cursor-pointer'
                          value={sliderValue}
                          onChange={(e) => handleChange_Slider(e)}
                          style={{ transform: "translateY(-50%)" }}
                          onClick={(e) => e.target.focus()}
                        />
                      </div>
                    </div>
                    <div>
                      <div className='p-1 bg-zinc-900 rounded-lg'>
                        <PlusIcon className='w-4 h-4' />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </Box>
          )}

          <div className='flex flex-row flex-nowrap items-center  px-6 py-4'>
            <div className='w-1/12'>
              <div className='p-2 rounded-lg bg-zinc-700'>
                <ForwardIcon
                  size={32}
                  className='w-4 h-4 text-zinc-400'
                />
              </div>
            </div>
            <div className='w-3/12'>
              <div className='px-6'>
                <p className='text-sm text-zinc-400 select-none'>Następny</p>
              </div>
            </div>
            <div className='w-8/12'>
              <div className='px-3 text-right'>
                <p className='text-sm text-zinc-400 select-none'>{timeAsText(timestampAstime(nextTime))}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 pb-16'>
          <div className='mb-3 px-4'>
            <p className='text-sm text-zinc-500'>Zarządzenie kanałami świateł</p>
          </div>
          <div className='flex flex-col w-full bg-[#FFFFFF10] rounded-3xl'>
            {canals.map((canal, key) => {
              return (
                <>
                  {(key !== 0 || channelExpanded !== key) && (
                    <div className='px-6'>
                      <div className='w-full h-[1px] bg-zinc-900'></div>
                    </div>
                  )}
                  {channelExpanded !== key && (
                    <CanalItem
                      key={key}
                      canalID={key}
                      isActive={canal.isActive}
                      canalColor={canal.canalColor}
                      onClick={() => setChannelExpanded(key)}
                    />
                  )}
                  {channelExpanded === key && (
                    <CanalItemExpand
                      key={key}
                      isFirst={key === 0}
                      isLast={key === canals.length - 1}
                      canalID={key}
                      isActive={canal.isActive}
                      canalColor={canal.canalColor}
                      onClick={() => setChannelExpanded(-1)}
                    />
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
});

SceneChildView.displayName = "SceneChildView";

export default SceneChildView;
