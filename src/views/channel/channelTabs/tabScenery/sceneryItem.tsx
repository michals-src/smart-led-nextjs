import React, { useContext } from "react";

import { ClockIcon, Cog6ToothIcon, FlagIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

import modalContext from "@context/modal/modalContext";

import { colors } from "@utils";
import { Box, Slider } from "@components";

import SceneryModal from "./sceneryModal";
import classNames from "classnames";

type TSceneryItem = {
  index: number;
  variety?: "normal" | "end";
  time: {
    previous: string;
    current: string;
    next: string;
  };
  brightness?: number;
  value?: string;
  onCreate?: (index: number, value: string, time: string, brightness: number) => void;
  onUpdate?: (index: number, value: string, time: string, brightness: number) => void;
  onRemove?: (index: number) => void;
};

const SceneryItem = (props: TSceneryItem) => {
  const { index, time = {}, brightness = 100, value = "", variety = "normal", onCreate, onUpdate, onRemove } = props;
  const { viewModal } = useContext(modalContext);

  const SceneryCreate = () => {
    const gradient = `linear-gradient(to bottom, rgba(0,0,0,0) 0%, ${"" === value ? "#FFFFFF40" : value} 150%)`;
    const styleShadow = {
      filter: "blur(40px)",
      background: gradient,
    };
    const styleTail = {
      background: gradient,
      transform: "translateX(-50%)",
      filter: "blur(1px)",
    };
    const styleIconWrapper = {
      transform: "translate(-50%, -50%)",
    };

    const handleClick = (): void => {
      viewModal(
        <SceneryModal
          index={index}
          onSave={onCreate}
          brightness={brightness}
          value={"" === value ? colors[0] : value}
          time={{
            previous: "end" === variety ? "00:00" : time.previous,
            next: null,
            current: time.current,
          }}
        />
      );
    };

    return (
      <div className='w-1/2 mx-auto px-2 relative'>
        <div
          className='w-full h-12 relative'
          style={styleShadow}></div>
        <div
          className='w-1 h-12 absolute top-0 bg-white opacity-[0.4] bottom-0 left-[50%]'
          style={styleTail}></div>
        <div
          className='absolute top-[50%] left-[50%] opacity-[0.85]'
          style={styleIconWrapper}>
          <div
            className='w-auto table p-1 bg-white rounded-full cursor-pointer'
            onClick={handleClick}>
            <PlusIcon className='w-3 h-3 text-black shadow-xl' />
          </div>
        </div>
      </div>
    );
  };

  const ItemIcon = () => {
    if ("end" === variety) {
      return (
        <div className='mr-1'>
          <FlagIcon className='w-5 h-5 text-white' />
        </div>
      );
    }
    return (
      <div className='mr-1'>
        <ClockIcon className='w-5 h-5 text-white' />
      </div>
    );
  };

  const ItemTime = () => {
    return <p className={`text-xs text-white ${"end" == variety ? "w-full text-center" : "ml-4"}`}>{time.current}</p>;
  };

  const ItemActions = () => {
    const editCn = classNames("w-1/12", {
      "ml-6": variety !== "end",
    });

    const handleEdit = () => {
      viewModal(
        <SceneryModal
          index={index}
          onSave={onUpdate}
          brightness={brightness}
          value={"" === value ? colors[0] : value}
          time={{
            previous: "end" === variety ? "00:00" : time.previous,
            next: "end" === variety ? "24:00" : time.next,
            current: time.current,
          }}
        />
      );
    };

    return (
      <>
        {"normal" === variety && (
          <div className='w-1/12 ml-auto'>
            <div
              className='bg-[#00000040] p-1 rounded-full cursor-pointer table'
              onClick={() => {
                onRemove(index);
              }}>
              <TrashIcon className='w-5 h-5 text-white' />
            </div>
          </div>
        )}
        <div className={editCn}>
          <div
            className='bg-[#00000040] p-1 rounded-full cursor-pointer table'
            onClick={handleEdit}>
            <Cog6ToothIcon className='w-5 h-5 text-white' />
          </div>
        </div>
      </>
    );
  };

  /**
   * Component
   */
  return (
    <div>
      <SceneryCreate />
      <Box
        className={`px-4 pt-3 ${"end" === variety ? "pb-3 " : "pb-1 "} relative z-10`}
        bgGradient={"" === value ? "#FFFFFF15" : value}>
        <div className='flex flex-row flex-nowrap items-center justify-center'>
          <ItemIcon />
          <ItemTime />
          <ItemActions />
        </div>

        {variety == "normal" && (
          <div className='pb-1 pt-3'>
            <Slider
              size='sm'
              thumb={false}
              value={brightness}
            />
          </div>
        )}
      </Box>
    </div>
  );
};

export default SceneryItem;
