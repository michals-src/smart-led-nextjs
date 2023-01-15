import { useContext, useState, useRef, useEffect, forwardRef } from "react";

import { ArrowLongRightIcon, BackwardIcon, CheckIcon, ClockIcon, ForwardIcon, MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Box, Switch } from "@components";
import Coolors from "src/components/Colors/coolors";
import popupContext from "@context/popup/popupContext";
import { colors, timeAstimestamp, timestampAstime, timeAsText } from "@utils";
import { useDispatch } from "react-redux";
import { SCENE_CHILDREN_UPDATE } from "@store/slices/scenesSlice";
import { Picker, PickerSelect, PickerOption } from "@components";

const SceneChildView = forwardRef((props, ref) => {
  const { time_prev, time_next, ID } = props;
  const popupCtx = useContext(popupContext);
  const dispatch = useDispatch();

  const refInput = useRef(null);

  const [channelExpanded, setChannelExpanded] = useState(-1);

  const [sliderValue, setSliderValue] = useState(100);
  const [openChangeTitle, setOpenChangeTitle] = useState(false);

  const [timeline, setTimeline] = useState([-1, -1, -1]);

  const sliderIndicatorRef = useRef(null);

  const duration = (pt, ct, nt) => {
    return ((ct - pt) / (nt - pt)) * 100;
  };

  const previousTime = Number.isInteger(time_prev) ? time_prev : timeAstimestamp(`${time_prev}`);
  const nextTime = Number.isInteger(time_next) ? time_next : timeAstimestamp(`${time_next}`);

  const currentTime = previousTime + (nextTime - previousTime) / 2;

  const dur = duration(previousTime, currentTime, nextTime);

  const abc = (time) => {
    dispatch(
      SCENE_CHILDREN_UPDATE({
        childrenID: `SC${ID.slice(1, ID.length)}`,
        timestamp: time,
      })
    );

    console.log(timeAsText(timestampAstime(time)));
    popupCtx.actions.back();
  };

  useEffect(() => {
    setTimeline([previousTime, currentTime, nextTime]);
    setSliderValue(currentTime);

    popupCtx.events.onSave(() => abc.bind(null, currentTime));

    // return () => {
    //   cleanup;
    // };
  }, []);

  // useEffect(() => {
  //   popupCtx.events.onSave(() => abc);

  //   return () => {
  //     popupCtx.events.onSave();
  //   };
  // }, [timeline[1]]);

  const handleChange_Slider = (e) => {
    //const newTime = Math.floor(timeline[0] + (Math.floor(e.target.value) / 100) * (timeline[2] - timeline[0]));

    //const newTime = timeline[0] + +e.target.value;
    const newTime = +e.target.value;

    setSliderValue(newTime);
    setTimeline((state) => {
      state[1] = newTime;
      return state;
    });

    popupCtx.events.onSave(() => abc.bind(null, newTime));
  };

  return (
    <>
      <div ref={ref}>
        <div className='py-12'>
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
                          <p className='text-xs text-zinc-400 select-none'>{`${time_next}`}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='w-full'>
                    {/* <div className='p-4'>
                      <p className='text-6xl select-none'>{timeAsText(timestampAstime(timeline[1]))}</p>
                    </div> */}
                    <Picker>
                      <PickerSelect onChange={(e) => console.log(e.target.value)}>
                        <PickerOption value='0'>00</PickerOption>
                        <PickerOption value='1'>01</PickerOption>
                        <PickerOption value='2'>02</PickerOption>
                        <PickerOption value='3'>03</PickerOption>
                        <PickerOption value='4'>04</PickerOption>
                        <PickerOption value='5'>05</PickerOption>
                        <PickerOption value='6'>06</PickerOption>
                      </PickerSelect>
                      <PickerSelect>
                        <PickerOption value='0'>00</PickerOption>
                        <PickerOption value='1'>01</PickerOption>
                        <PickerOption value='2'>02</PickerOption>
                        <PickerOption value='3'>03</PickerOption>
                        <PickerOption value='4'>04</PickerOption>
                        <PickerOption value='5'>05</PickerOption>
                        <PickerOption value='6'>06</PickerOption>
                      </PickerSelect>
                    </Picker>
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
                          <p className='text-xs text-zinc-400 select-none'>{`${time_prev}`}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full'>
              <div className='px-3 pt-20 pb-8'>
                <div
                  className='relative mx-auto touch-pan-x select-none'
                  onClick={() => refInput.current.focus()}
                  onTouchStart={() => refInput.current.focus()}
                  onTouchMove={() => refInput.current.focus()}
                  onTouchMoveCapture={() => refInput.current.focus()}
                  onSelect={() => refInput.current.focus()}>
                  <div
                    className='w-full h-10 mx-auto bg-zinc-800 rounded-lg relative z-10'
                    onClick={() => refInput.current.focus()}
                    onTouchStart={() => refInput.current.focus()}
                    onTouchMove={() => refInput.current.focus()}
                    onTouchMoveCapture={() => refInput.current.focus()}>
                    <div
                      ref={sliderIndicatorRef}
                      className={`w-auto h-full absolute top-0 bottom-0 left-0 bg-orange-700 rounded-lg`}
                      style={{ width: `${Math.floor(duration(timeline[0], timeline[1], timeline[2]))}%` }}>
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
                    className='slider absolute z-20 opacity-0 top-0 bottom-0 left-0 right-0 w-full h-[200%] cursor-pointer appearance-none'
                    value={sliderValue}
                    onChange={(e) => handleChange_Slider(e)}
                    onClick={(e) => e.target.focus()}
                    onTouchStart={(e) => e.target.focus()}
                    onTouchMove={(e) => e.target.focus()}
                    max={nextTime - previousTime}
                    step='1'
                    style={{
                      writingMode: "horizontal-tb",
                      transform: "translateY(-25%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='py-4'>
            {/* <button
            className='w-full block mx-auto py-3 px-3 rounded-xl bg-zinc-800 shadow-xl'
            onClick={() => popupCtx.onUpdatePopupScreenIndex(0)}>
            <div className='flex flex-row flex-nowrap items-center'>

              <div className='w-full'>
                <p className='ml-3 text-sm text-zinc-400'>Zapisz</p>
              </div>
            </div>
          </button> */}
          </div>
        </div>
      </div>
    </>
  );
});

SceneChildView.displayName = "SceneChildView";

export default SceneChildView;
