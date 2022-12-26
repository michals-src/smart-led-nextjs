import { useContext, useState } from "react";

import { CheckCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { ArrowLongRightIcon, ClockIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Type } from "react-bootstrap-icons";
import { Box, LoaderCircle, Switch } from "../../../../components";
import popupContext from "../../../../context/popup/popupContext";
import { child, ref, update } from "firebase/database";
import db from "@firebase";
import { useDispatch } from "react-redux";
import { SCENE_APPEND } from "../../../../store/slices/scenesSlice";

const SceneCreate = () => {
  const popupCtx = useContext(popupContext);
  const disptach = useDispatch();

  const [name, setName] = useState("");
  const [proceding, setProceding] = useState(false);

  const handleClick_Submit = () => {
    if (name === "" || name === "undefined" || name === null) throw "sceneCreate - nazwa bug";

    setProceding(true);

    const timestamp = Date.now();
    const sceneID = `S${timestamp}`;
    const sceneChildrenID = `SC${timestamp}`;

    const sceneData = {
      name: name,
      childrenID: sceneChildrenID,
    };

    const update_done = () => {
      popupCtx.onUpdatePopupVisible(false);
      setProceding(false);
    };

    disptach(SCENE_APPEND({ [`${sceneID}`]: sceneData }));
    update(ref(db), {
      [`/scenes/${sceneID}`]: sceneData,
      [`/scenesChildren/${sceneChildrenID}`]: "", // Godziny wyzolenia
    }).then(() => {
      setTimeout(update_done, 1500);
    });

    // popupCtx.onUpdatePopupScreenData([
    //   {
    //     costam: "okno edycji przejścia",
    //   },
    // ]);
    // popupCtx.onUpdatePopupScreenIndex(1);

    return () => {
      clearInterval(update_done);
    };
  };

  return (
    <>
      <div className='mb-8'>
        <div className='flex flex-row flex-nowrap items-center cursor-pointer'>
          <div className='w-1/12'>
            <Type
              size={32}
              className='w-6 h-6 text-white'
            />
          </div>
          <div className='w-11/12'>
            <div className='px-3'>
              <p className='text-sm'>Nadaj scenie nazwę</p>
            </div>
          </div>
        </div>

        <div className='mt-3'>
          <input
            type='name'
            id='sceneName'
            className='w-full h-auto py-2 px-4 bg-zinc-900 border border-orange-600 rounded-lg text-xs text-orange-600 shadow-lg'
            placeholder='Nazwa sceny'
            autocomplete='off'
            autofill='off'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='my-8'>
          <div className='flex flex-row flex-nowrap w-full'>
            <div className='w-1/12'>
              <InformationCircleIcon className='w-6 h-6' />
            </div>
            <div className='w-11/12'>
              <p className='text-xs text-zinc-400'>Dodanie przejść będzie możliwe w trybie edycji sceny po jej utworzeniu</p>
            </div>
          </div>
        </div>

        <div className='mt-3 w-full'>
          <button
            className='w-full h-auto block py-3 rounded-lg bg-zinc-800 text-xs shadow-xl'
            onClick={(e) => handleClick_Submit(e)}>
            <div className='relative'>
              <div className='flex flex-row flex-nowrap px-25 items-center justify-center'>
                <p className='text-sm'>Zapisz</p>
              </div>
              {!!proceding && (
                <div className='w-12 h-full absolute top-0 right-0'>
                  <div className='flex flex-col items-center justify-center'>
                    <LoaderCircle size='sm' />
                  </div>
                </div>
              )}
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default SceneCreate;
