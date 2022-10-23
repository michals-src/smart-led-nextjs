import { useMemo, useContext } from "react";
import db from "@firebase";
import { update, ref } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { appendScenery, updateScenery, removeScenery } from "@store/slices/scenerySlice";
import { XCircleIcon } from "@heroicons/react/24/solid";

import { useAppDispatch } from "@hooks";
import channelContext from "@context/channel/channelContext";

import useScenery from "src/hooks/scenery/useScenery";
import { Box, LoaderCircle } from "@components";
import SceneryItem from "./tabScenery/sceneryItem";

type IScenery = {};

export default function ChannelTabScenery({}: IScenery) {
  const dispatch = useAppDispatch();
  const { channelID } = useContext(channelContext);
  const { data: scenerios, loading, error } = useScenery(channelID);

  useMemo(() => {
    if (!loading) {
      update(ref(db), {
        [`/scenery/${channelID}`]: scenerios[channelID],
      });
    }
  }, [scenerios]);

  const handleCreate = (index: number, value: string, time: string, brightness: number): void => {
    dispatch(
      appendScenery({
        channelID,
        index,
        value,
        time,
        brightness,
      })
    );
  };

  const handleUpdate = (index: number, value: string, time: string, brightness: number) => {
    dispatch(
      updateScenery({
        channelID,
        index,
        value,
        time,
        brightness,
      })
    );
  };

  const handleRemove = (index: number) => {
    dispatch(
      removeScenery({
        channelID,
        index,
      })
    );
  };

  const Error = ({ children }) => {
    return (
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
                <p className='text-sm'>{children}</p>
              </div>
            </>
          )}
        </div>
      </Box>
    );
  };

  const Empty = () => {
    return (
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
    );
  };

  const Items = () => {
    return (
      <>
        {scenerios[channelID].length - 1 > 0 && (
          <>
            <Box className='p-4 pt-0 '>
              {scenerios[channelID].slice(0, scenerios[channelID].length - 1).map((sceneryChild: any, idx: number) => {
                return (
                  <>
                    <SceneryItem
                      key={uuidv4()}
                      index={idx}
                      time={{
                        previous: idx === 0 ? "00:00" : scenerios[channelID][idx - 1].time,
                        current: sceneryChild.time,
                        next: idx === scenerios[channelID].length - 1 ? "24:00" : scenerios[channelID][idx + 1].time,
                      }}
                      brightness={sceneryChild.brightness}
                      value={sceneryChild.value}
                      onCreate={handleCreate}
                      onUpdate={handleUpdate}
                      onRemove={handleRemove}
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
            index={scenerios[channelID].length - 1}
            time={{
              previous: scenerios[channelID]?.length >= 2 ? scenerios[channelID][scenerios[channelID].length - 2].time : "00:00",
              current: scenerios[channelID]?.length >= 1 ? scenerios[channelID][scenerios[channelID].length - 1].time : "24:00",
              next: "24:00",
            }}
            variety='end'
            onCreate={handleCreate}
            onUpdate={handleUpdate}
          />
        )}
      </>
    );
  };

  /**
   * data.length <= 1 === ERROR
   *    data[0] => end point
   */

  return (
    <>
      <div className='flex flex-col nowrap w-full h-auto'>
        {(loading || null !== error) && <Error>{error}</Error>}
        {!loading && null === error && scenerios[channelID].length <= 1 && <Empty />}
        {!loading && null === error && <Items />}
      </div>
    </>
  );
}
