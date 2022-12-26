import { useContext, useState, useRef, useEffect } from "react";

import { ArrowLongLeftIcon, BookmarkIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { ArrowLongRightIcon, BackwardIcon, CheckIcon, ClockIcon, ForwardIcon, MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Type } from "react-bootstrap-icons";
import { Box, Switch } from "@components";
import Coolors from "src/components/Colors/coolors";
import popupContext from "../../../../context/popup/popupContext";
import { colors, timeAstimestamp, timestampAstime, timeAsText } from "@utils";
import classNames from "classnames";

const SceneChildView = () => {
  const popupCtx = useContext(popupContext);

  const refInput = useRef(null);

  const [channelExpanded, setChannelExpanded] = useState(-1);

  const [sliderValue, setSliderValue] = useState(100);
  const [openChangeTitle, setOpenChangeTitle] = useState(false);

  const [timeline, setTimeline] = useState([-1, -1, -1]);

  const sliderIndicatorRef = useRef(null);

  const duration = (pt, ct, nt) => {
    return ((ct - pt) / (nt - pt)) * 100;
  };

  const previousTime = timeAstimestamp("19:00");
  const currentTime = timeAstimestamp("20:00");
  const nextTime = timeAstimestamp("21:00");

  const dur = duration(previousTime, currentTime, nextTime);

  useEffect(() => {
    setTimeline([previousTime, currentTime, nextTime]);
    setSliderValue(dur);

    console.log(popupCtx.popupScreenData);

    // return () => {
    //   cleanup;
    // };
  }, []);

  const handleChange_Slider = (e) => {
    //const newTime = Math.floor(timeline[0] + (Math.floor(e.target.value) / 100) * (timeline[2] - timeline[0]));
    const newTime = timeline[0] + +e.target.value;
    const sliderValuePercent = Math.floor((+e.target.value * 100) / (timeline[2] - timeline[0]));
    setSliderValue(sliderValuePercent);
    setTimeline((state) => {
      state[1] = newTime;
      return state;
    });
  };

  const handleClick_Item = () => {
    // popupCtx.onUpdatePopupScreenData([
    //   {
    //     costam: "okno edycji przejścia",
    //   },
    // ]);
    popupCtx.onUpdatePopupScreenIndex(1);
  };

  return (
    <>
      <div className='pb-12'>
        <div className='flex flex-col flex-nowrap items-center'>
          <div className='w-full'>
            <div className='px-8'>
              <div className='flex flex-col flex-nowrap items-center justify-center'>
                <div>
                  <div className='flex flex-row flex-nowrap items-center'>
                    <div className='w-1/12'>
                      <ForwardIcon
                        size={32}
                        className='w-4 h-4 text-zinc-400'
                      />
                    </div>
                    <div className='w-11/12'>
                      <div className='px-8'>
                        <p className='text-xs text-zinc-400 select-none'>21:00</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='p-4'>
                    <p className='text-6xl select-none'>{timeAsText(timestampAstime(timeline[1]))}</p>
                  </div>
                </div>
                <div>
                  <div className='flex flex-row flex-nowrap items-center'>
                    <div className='w-1/12'>
                      <BackwardIcon
                        size={32}
                        className='w-4 h-4 text-zinc-400'
                      />
                    </div>
                    <div className='w-11/12'>
                      <div className='px-8'>
                        <p className='text-xs text-zinc-400 select-none'>19:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full'>
            <div className='px-3 py-8'>
              <div
                className='relative mx-auto'
                onClick={() => refInput.current.focus()}
                onTouchStart={() => refInput.current.focus()}
                onTouchMove={() => refInput.current.focus()}>
                <div className='w-full h-10 mx-auto bg-zinc-800 rounded-lg relative'>
                  <div
                    ref={sliderIndicatorRef}
                    className={`w-auto h-full absolute top-0 bottom-0 left-0 bg-orange-700 rounded-lg`}
                    style={{ width: `${sliderValue}%` }}>
                    {/* <div className='absolute w-3 h-full bg-white rounded-sm top-0 right-0'>
                      <div className='relative -m-1'>
                        <div
                          className='absolute top-0 left-[50%] py-1 px-3 rounded-lg bg-black'
                          style={{ transform: "translate(-50%, -100%)" }}>
                          <p className='text-xs select-none'>{timeAsText(timestampAstime(timeline[1]))}</p>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
                <input
                  ref={refInput}
                  type='range'
                  className='absolute opacity-0 top-0 bottom-0 left-0 right-0 w-full h-full cursor-pointer'
                  value={sliderValue}
                  onChange={(e) => handleChange_Slider(e)}
                  onClick={(e) => e.target.focus()}
                  onTouchStart={(e) => e.target.focus()}
                  max={nextTime - previousTime}
                  step='1'
                  style={{
                    writingMode: "horizontal-tb",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='py-4'>
          <button
            className='w-full block mx-auto py-3 px-3 rounded-xl bg-zinc-800 shadow-xl'
            onClick={() => popupCtx.onUpdatePopupScreenIndex(0)}>
            <div className='flex flex-row flex-nowrap items-center'>
              {/* <div className='w-1/12'>
              <ArrowLongLeftIcon className='text-zinc-300 ml-auto w-3 h-3' />
            </div> */}
              <div className='w-full'>
                <p className='ml-3 text-sm text-zinc-400'>Zapisz</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default SceneChildView;
