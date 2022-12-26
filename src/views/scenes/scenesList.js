import { useContext, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get, child, ref } from "firebase/database";
import classNames from "classnames";

import { ArrowLongRightIcon, ClockIcon, MegaphoneIcon, PaintBrushIcon } from "@heroicons/react/24/outline";
import { PlusIcon, CheckCircleIcon, PlayIcon, XMarkIcon, PencilIcon } from "@heroicons/react/24/solid";

import { SCENE_RELATE, SCENE_REMOVE, SCENE_CHILDREN_APPEND } from "../../store/slices/scenesSlice";
import db from "@firebase";
import { Layout } from "../../components";
import popupContext from "../../context/popup/popupContext";
import { toUpperFirst } from "../../utilities";
import { popupSceneView, popupSceneCreate, popupSceneChildView, popupSceneChildCreate } from "./popup";

const ScenesListItemWrapper = (props) => {
  const { id, name, active, count } = props;

  const cnWrapper = classNames("py-5 px-8 rounded-2xl cursor-pointer", {
    "bg-[#FFFFFF10] shadow-xl": active,
  });

  const cnContent = classNames("flex flex-row", {
    "flex-nowrap items-center": !active,
    "flex-wrap": active,
  });

  const cnTitle = classNames({
    "w-9/12": active,
    "w-full": !active,
  });
  const cnBadge = classNames({
    "w-3/12": active,
    hidden: !active,
  });

  const cnNotActive = classNames("pl-4", {
    hidden: active,
  });

  const cnActive = classNames("w-full", {
    hidden: !active,
  });

  const name_prop = name.length <= 0 ? "Brak nazwy" : toUpperFirst(name);

  return (
    <>
      <div
        className={cnWrapper}
        {...props}>
        <div className={cnContent}>
          <div className='flex flex-col w-full'>
            <div>
              <div className='flex flex-row flex-nowrap'>
                <div className={cnTitle}>
                  <p className='text-lg text-zinc-300'>{name_prop}</p>
                </div>
                <div className={cnBadge}>
                  <CheckCircleIcon className='text-zinc-400 ml-auto w-8 h-8' />
                </div>
              </div>
            </div>
            <div className='mt-1'>
              <div className='flex flex-row flex-nowrap items-left'>
                <div>
                  <PlayIcon className='w-4 h-4 text-orange-800' />
                </div>
                <div className='ml-4'>
                  <p className='text-xs text-orange-800'>{count} przejść</p>
                </div>
              </div>
            </div>
          </div>
          <div className={cnNotActive}>
            <ArrowLongRightIcon className='w-6 h-6 text-zinc-600' />
          </div>
          <div className={cnActive}>
            <div className='flex flex-row flex-nowrap items-left'>
              {/* <Cog6ToothIcon className='w-4 h-4 text-zinc-600' /> */}
              <div className='mr-4'>
                <p className='text-xs text-zinc-500'>Ustawienia</p>
              </div>
              <div>
                <ArrowLongRightIcon className='w-4 h-4 text-zinc-500' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const itemsDB = [
  { name: "moood", active: false, count: 4, relationID: 1 },
  { name: "niedziela wieczór", active: false, count: 3, relationID: 2 },
  { name: "zachód słonca", active: false, count: 6, relationID: 3 },
  { name: "summer vibe", active: true, count: 9, relationID: 4 },
];

const ScenesList = (props) => {
  const popupCtx = useContext(popupContext);
  const data = useSelector((state) => state.scenes.items);
  const dispatch = useDispatch();
  const sceneRelated = useSelector((state) => state.scenes.related);

  const popupInit = useCallback(() => {
    popupCtx.onUpdatePopupScreenList([popupSceneView, popupSceneCreate, popupSceneChildView, popupSceneChildCreate]);
    popupCtx.onUpdatePopupVisible(false);
  }, []);

  const popupCleanup = useCallback(() => {
    popupCtx.onUpdatePopupScreenList([]);
    popupCtx.onUpdatePopupVisible(false);
  }, []);

  useEffect(() => {
    popupInit();

    get(child(ref(db), "/sceneRelated")).then((snapshot) => {
      if (snapshot.exists()) dispatch(SCENE_RELATE(snapshot.val()));
    });

    get(child(ref(db), "/scenesChildren")).then((snapshot) => {
      if (snapshot.exists()) dispatch(SCENE_CHILDREN_APPEND(snapshot.val()));
    });

    return () => {
      popupCleanup();
    };
  }, []);

  const handleClick_SceneItem = (sceneID, sceneName) => {
    const screenData = [];
    screenData[0] = {
      ID: sceneID,
      name: sceneName,
      related: sceneRelated === sceneID,
    };
    popupCtx.onUpdatePopupScreenData(screenData);
    popupCtx.onUpdatePopupIcon(PlayIcon);
    popupCtx.onUpdatePopupScreenIndex(0);
    popupCtx.onUpdatePopupTitle(`${toUpperFirst(sceneName)}`, `Scena`);
    popupCtx.onUpdatePopupVisible(true);
    // dispatch(SCENE_REMOVE({ ID: sceneID }));
  };

  const handleClick_SceneCreate = (sceneID, sceneName) => {
    popupCtx.onUpdatePopupIcon(PencilIcon);
    popupCtx.onUpdatePopupScreenIndex(1);
    popupCtx.onUpdatePopupTitle(`Nowa scena`, `Konfigurator`);
    popupCtx.onUpdatePopupVisible(true);
  };

  return (
    <div className='w-full pt-10 px-3'>
      <div className='flex flex-row flex-nowrap items-top'>
        <div className='w-8/12'>
          <div className='mb-1 px-3'>
            <p className='text-4xl font-bold'>Sceny</p>
          </div>
        </div>
        <div className='w-4/12 pl-8'>
          <button
            className='w-full py-1 px-3 rounded-full bg-zinc-800'
            onClick={() => handleClick_SceneCreate()}>
            <div className='flex flex-row flex-nowrap items-center'>
              <div className='w-3/12'>
                <PlusIcon className='text-zinc-300 ml-auto w-3 h-3' />
              </div>
              <div className='w-9/12'>
                <p className='ml-3 text-xs text-zinc-400'>Dodaj</p>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className='px-3 mb-4'>
        <p className='text-xs text-zinc-500'>Lista utworzonych scenariuszy pracy oświetlenia</p>
      </div>

      <div className='p-3 bg-zinc-800 rounded-3xl'>
        {Object.keys(data).map((sceneID, itemKey) => {
          return (
            <>
              {itemKey !== 0 && (
                <div className='px-3'>
                  <div className='w-full h-[1px] bg-[#FFFFFF10]'></div>
                </div>
              )}
              <ScenesListItemWrapper
                ID={sceneID}
                onClick={() => handleClick_SceneItem(sceneID, data[sceneID].name)}
                key={itemKey}
                name={data[sceneID].name}
                active={sceneRelated === sceneID}
                count={0}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ScenesList;
