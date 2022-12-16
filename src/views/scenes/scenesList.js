import { useContext, useState } from "react";

import { ArrowLongRightIcon, ClockIcon, MegaphoneIcon, PaintBrushIcon } from "@heroicons/react/24/outline";
import { PlusIcon, CheckCircleIcon, PlayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { Box, Layout, Switch } from "../../components";
import popupContext from "../../context/popup/popupContext";
import { toUpperFirst } from "../../utilities";
import { Type } from "react-bootstrap-icons";

const ScenesListItemWrapper = (props) => {
  const { name, active, count } = props;

  const cnWrapper = classNames("py-5 px-8  rounded-2xl mb-4 cursor-pointer", {
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

const Popup_screen_scene_settings = () => {
  const popupCtx = useContext(popupContext);

  const [openChangeTitle, setOpenChangeTitle] = useState(false);

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
              <Switch size='lg' />
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
                  className='w-full h-auto py-2 px-4 bg-zinc-900 rounded-lg text-sm shadow-lg'
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
        <div className='flex flex-col w-full space-y-3 bg-[#FFFFFF10] py-3 px-6 rounded-3xl'>
          <div
            className='cursor-pointer py-3 border-b border-zinc-700'
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
      </div>

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

const Popup_screen_sceneItem_setting = () => {
  const popupCtx = useContext(popupContext);

  const handleClick_SceneItem = (sceneID, sceneName) => {
    popupCtx.onUpdatePopupScreenIndex(0);
  };

  return (
    <div className='pb-20'>
      {popupCtx.popupScreenData[0]["costam"]}

      <div>
        <button onClick={() => handleClick_SceneItem()}>Wróc</button>
      </div>
    </div>
  );
};

const Popup_screen_sceneItem_new = () => {
  const popupCtx = useContext(popupContext);

  const handleClick_SceneItem = (sceneID, sceneName) => {
    popupCtx.onUpdatePopupScreenIndex(2);
  };

  return (
    <div className='pb-20'>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <p>Skreeeeee</p>
      <button onClick={() => handleClick_SceneItem()}>dalej</button>
    </div>
  );
};

const itemsDB = [
  { name: "moood", active: false, count: 4, relationID: 1 },
  { name: "niedziela wieczór", active: false, count: 3, relationID: 2 },
  { name: "zachód słonca", active: false, count: 6, relationID: 3 },
  { name: "summer vibe", active: true, count: 9, relationID: 4 },
];

const ScenesList = () => {
  const popupCtx = useContext(popupContext);

  const handleClick_SceneItem = (sceneID, sceneName) => {
    popupCtx.onUpdatePopupIcon(PlayIcon);
    popupCtx.onUpdatePopupScreenList([() => <Popup_screen_scene_settings />, Popup_screen_sceneItem_setting, Popup_screen_sceneItem_new]);
    popupCtx.onUpdatePopupScreenIndex(0);
    popupCtx.onUpdatePopupTitle(`${toUpperFirst(sceneName)}`, `Scena`);
    popupCtx.onUpdatePopupVisible(true);
  };

  return (
    <Layout>
      <div className='w-full pt-10 px-3'>
        <div className='flex flex-row flex-nowrap items-top'>
          <div className='w-8/12'>
            <div className='mb-1 px-3'>
              <p className='text-4xl font-bold'>Sceny</p>
            </div>
          </div>
          <div className='w-4/12 pl-8'>
            <button className='w-full py-1 px-3 rounded-full bg-zinc-800'>
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
          {itemsDB.map((item, itemKey) => {
            return (
              <ScenesListItemWrapper
                onClick={() => handleClick_SceneItem(itemKey, item.name)}
                key={itemKey}
                name={item.name}
                active={item.active}
                count={item.count}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ScenesList;
