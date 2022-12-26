import { useContext, useState } from "react";
import { update, ref } from "firebase/database";

import dv from "@firebase";
import { CheckCircleIcon, MegaphoneIcon } from "@heroicons/react/24/outline";
import { ArrowLongRightIcon, ClockIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Type } from "react-bootstrap-icons";
import { Box, Switch } from "../../../../components";
import popupContext from "../../../../context/popup/popupContext";
import { useSelector } from "react-redux";

const SceneView = () => {
  const popupCtx = useContext(popupContext);

  const [related, setRelated] = useState(popupCtx.popupScreenData[0].related);
  const [openChangeTitle, setOpenChangeTitle] = useState(false);
  const sceneChildren = useSelector((state) => state.scenes.children[state.scenes.items[popupCtx.popupScreenData[0].ID].childrenID]);

  const handleClick_Item = () => {
    popupCtx.onUpdatePopupScreenIndex(2);
  };

  const handleClick_Switch = () => {
    setRelated(!related);
  };

  const handleClick_newItem = () => {
    popupCtx.onUpdatePopupScreenData([
      {
        time_prev: "18:00",
        time_next: "20:00",
      },
    ]);
    popupCtx.onUpdatePopupScreenIndex(3);
  };

  return (
    <>
      <div className='mb-8'>
        <div className='flex flex-row flex-nowrap items-center'>
          <div className='w-1/12'>
            <CheckCircleIcon className='w-6 h-6 text-white' />
          </div>
          <div className='w-7/12'>
            <div className='px-3'>
              <p className='text-sm'>Status</p>
              {/* <p className='text-xs text-zinc-500'>Indywidualne kanału</p> */}
            </div>
          </div>
          <div className='w-4/12'>
            <div className='ml-auto table'>
              <Switch
                value={related}
                onClick={() => handleClick_Switch()}
                size='lg'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='my-8'>
        {!openChangeTitle && (
          <div
            className='flex flex-row flex-nowrap items-center cursor-pointer'
            onClick={() => setOpenChangeTitle(true)}>
            <div className='w-1/12'>
              <Type
                size={32}
                className='w-6 h-6 text-white'
              />
            </div>
            <div className='w-7/12'>
              <div className='px-3'>
                <p className='text-sm'>Zmień nazwę</p>
              </div>
            </div>
            <div className='w-4/12'>
              <div className='ml-auto table'>
                <ArrowLongRightIcon className='w-4 h-4 text-zinc-500' />
              </div>
            </div>
          </div>
        )}

        {openChangeTitle && (
          <Box>
            <>
              <div className='pt-4 px-4 flex flex-row flex-nowrap items-center'>
                <div className='w-2/12'>
                  <Type
                    size={32}
                    className='w-6 h-6 text-white'
                  />
                </div>
                <div className='w-10/12 '>
                  <p className='text-sm'>Zmiana nazwy</p>
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
                <input
                  type='name'
                  id='sceneName'
                  className='w-full h-auto py-2 px-4 border border-orange-600 bg-zinc-900 rounded-lg text-sm shadow-lg'
                  placeholder='Nazwa sceny'
                />
              </div>
            </>
          </Box>
        )}
      </div>

      <div className='mt-12 mb-3'>
        <div className='flex flex-row flex-nowrap items-top'>
          <div className='w-8/12'>
            <div className='mb-1'>
              <p className='text-4xl font-bold'>Przejścia</p>
            </div>
          </div>
          <div className='w-4/12 pl-8'>
            <button className='w-auto table p-2 ml-auto rounded-full bg-zinc-800'>
              <div>
                <PlusIcon className='text-zinc-100 ml-auto w-3 h-3' />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className='my-8'>
        <div className='relative z-10 flex flex-row flex-nowrap items-center justify-center mb-4'>
          <button className='relativ z-30 w-auto p-1 rounded-full bg-zinc-800'>
            <div className='flex flex-row flex-nowrap items-center'>
              <div className='px-3'>
                <PlusIcon className='text-white mx-auto w-3 h-3' />
              </div>
              <div className='pr-3'>
                <p className='text-xs'>Dodaj</p>
              </div>
            </div>
          </button>
        </div>

        <div className='flex flex-col w-full space-y-3 bg-[#FFFFFF10] py-3 px-6 rounded-3xl'>
          <div
            className='cursor-pointer py-3 '
            onClick={() => handleClick_Item()}>
            <div className='w-full flex flex-row flex-nowrap items-center'>
              <div className='w-1/12'>
                <ClockIcon className='w-6 h-' />
              </div>
              <div className='w-10/12'>
                <div className='px-3'>
                  <div className='text-sm'>20:00</div>
                  <div className='text-xs text-zinc-500'>30 minut</div>
                </div>
              </div>
              <div className='w-1/12'>
                <div>
                  <ArrowLongRightIcon className='w-4 h-4 text-zinc-400' />
                </div>
              </div>
            </div>
          </div>

          <div className='relative z-10 flex flex-row flex-nowrap items-center justify-center'>
            <div
              className='absolute z-20 w-full h-auto top-[50%]'
              style={{ transform: "translateY(-50%)" }}>
              <div className='w-full h-[1px] bg-zinc-900'></div>
            </div>
            <button className='relativ z-30 w-auto p-1 rounded-full bg-zinc-900'>
              <div className='flex flex-row flex-nowrap items-center'>
                <div className='px-3'>
                  <PlusIcon className='text-white mx-auto w-3 h-3' />
                </div>
                <div className='pr-3'>
                  <p className='text-xs'>Dodaj</p>
                </div>
              </div>
            </button>
          </div>

          <div className='cursor-pointer py-3'>
            <div className='w-full flex flex-row flex-nowrap items-center'>
              <div className='w-1/12'>
                <ClockIcon className='w-6 h-' />
              </div>
              <div className='w-10/12'>
                <div className='px-3'>
                  <div className='text-sm'>20:00</div>
                  <div className='text-xs text-zinc-500'>30 minut</div>
                </div>
              </div>
              <div className='w-1/12'>
                <div>
                  <ArrowLongRightIcon className='w-4 h-4 text-zinc-400' />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='relative z-10 flex flex-row flex-nowrap items-center justify-center mt-4 px-4'>
          <button
            className='relative z-30 w-full p-3 rounded-full bg-zinc-800'
            onClick={() => handleClick_newItem()}>
            <div className='flex flex-row flex-nowrap items-center justify-center'>
              <div className='px-3'>
                <PlusIcon className='text-white mx-auto w-3 h-3' />
              </div>
              <div className='pr-3'>
                <p className='text-xs text-zinc-400'>Dodaj</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {!!(
        sceneChildren === null ||
        sceneChildren === "undefined" ||
        typeof sceneChildren === "string" ||
        (typeof sceneChildren === "object" && sceneChildren.length <= 0)
      ) && (
        <>
          <div className='my-10 text-zinc-400'>
            <MegaphoneIcon className='text-inherit mx-auto w-10 h-10' />
            <div className='mt-4 mb-2 text-center'>
              <p className='text-xs text-inherit'>Brak przejść</p>
            </div>
          </div>
          <div className='my-8'>
            <button className='w-8/12 block mx-auto py-3 px-3 rounded-full bg-zinc-800 shadow-xl'>
              <div className='flex flex-row flex-nowrap items-center'>
                <div className='w-1/12'>
                  <PlusIcon className='text-zinc-300 ml-auto w-3 h-3' />
                </div>
                <div className='w-11/12'>
                  <p className='ml-3 text-sm text-zinc-400'>Dodaj</p>
                </div>
              </div>
            </button>
          </div>
        </>
      )}

      {/* <div className='my-10 text-zinc-400'>
          <MegaphoneIcon className='text-inherit mx-auto w-10 h-10' />
          <div className='mt-4 mb-2 text-center'>
            <p className='text-xs text-inherit'>Brak przejść</p>
          </div>
        </div> */}

      {/* <div className='my-8'>
          <button className='w-8/12 block mx-auto py-3 px-3 rounded-full bg-zinc-800 shadow-xl'>
            <div className='flex flex-row flex-nowrap items-center'>
              <div className='w-1/12'>
                <PlusIcon className='text-zinc-300 ml-auto w-3 h-3' />
              </div>
              <div className='w-11/12'>
                <p className='ml-3 text-sm text-zinc-400'>Dodaj</p>
              </div>
            </div>
          </button>
        </div> */}
    </>
  );
};

export default SceneView;
