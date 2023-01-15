import { useContext, useState, useEffect, useCallback, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get, child, ref } from "firebase/database";
import classNames from "classnames";

import { ArrowLongRightIcon, ClockIcon, MegaphoneIcon, PaintBrushIcon } from "@heroicons/react/24/outline";
import { PlusIcon, CheckCircleIcon, PlayIcon, XMarkIcon, PencilIcon } from "@heroicons/react/24/solid";

import { SCENE_RELATE, SCENE_REMOVE, SCENE_CHILDREN_APPEND } from "@store/slices/scenesSlice";
import db from "@firebase";
import { Picker, PickerSelect, PickerOption } from "@components";
import popupContext from "../../context/popup/popupContext";
import { toUpperFirst } from "../../utilities";
import { popupSceneView, popupSceneCreate, popupSceneChildView, popupSceneChildCreate } from "./popup";
import { useRef } from "react";

const PopupSchedule_Development = forwardRef((props, ref) => {
  // false => down
  // true => up
  const [dirY, setDirY] = useState(false);

  const [move, setMove] = useState([0, 0]);
  const [moving, setMoving] = useState([0, 0]);
  const [translate, setTranslate] = useState(0);

  const numbersBackground = useRef(null);
  const numbersMain = useRef(null);

  const handle_mouseEnter = (e) => {
    numbersMain.current.focus();

    setMove(true);

    if (numbersBackground.current !== null) {
      numbersBackground.current.style.transitionDuration = "0s";
    }
  };

  const handle_mouseMove = (e) => {
    if (e.type !== "touchmove" && e.buttons !== 1) {
      setMove(false);
      setMoving([0, 0]);
      if (translate >= 6) setTranslate(6);
      return;
    }

    const consumer = e.type === "touchmove" ? e.touches[0] : e;

    setMoving((state) => {
      const currScreenY = consumer.screenY;
      if (state[1] === 0) return [0, currScreenY];

      let calculateMove = state[1] - currScreenY;
      let currMovingY = state[0] + calculateMove;

      if (currMovingY < 0) setDirY(true);
      if (currMovingY >= 0) setDirY(false);

      return [currMovingY, currScreenY];
    });
  };

  const handle_mouseLeave = (e) => {
    if (moving[0] >= 10 || moving[0] <= -10) {
      //let multiplicatorY = Math.abs(Math.floor(moving[0] / 32));
      let multiplicatorY = Math.floor(moving[0] / 32);

      //if (moving[0] < 6 && moving[0] > 0)
      setTranslate((state) => {
        let value = state + multiplicatorY;

        // if (!dirY) value = state + multiplicatorY;
        // if (dirY) value = state - multiplicatorY;

        console.log(value);

        if (value <= 0) value = 0;
        if (value >= 6) value = 6;

        return value;
      });
    } //

    setMove(false);
    setMoving([0, 0]);

    if (numbersBackground.current !== null) {
      numbersBackground.current.style.transitionDuration = "1.5s";
    }
  };

  useEffect(() => {
    //console.log(move, moving);
    //numbersBackground.current.style.transform = `translateY(-${moving[0]}px)`;

    if (move) {
      numbersBackground.current.style.transform = `translateY(-${32 * translate + moving[0]}px)`;

      return;
    }

    // console.log(translate);
    numbersBackground.current.style.transform = `translateY(-${32 * translate}px)`;
  }, [moving[0], translate]);

  const Item = ({ children, ...props }) => {
    return <div className='text-sm text-zinc-600 height-[32px] leading-[32px]'>{children}</div>;
  };

  return (
    <div ref={ref}>
      <div className='my-12'>
        <p className='text-3xl'>absfdgbvsed</p>
      </div>
      <div className='pb-32'>
        <div
          ref={numbersMain}
          className='relative py-12 mb-32'>
          <div className='relative z-10 h-full'>
            <div className='w-full h-auto absolute left-0 top-[50%]'>
              <div
                className='w-full py-4 px-3 rounded-lg bg-zinc-800 h-[32px]'
                style={{
                  transform: "translateY(-50%)",
                }}></div>
            </div>
            <div className={`overflow-hidden h-[160px] px-3`}>
              <div
                className='pt-[64px]'
                ref={numbersBackground}
                style={{
                  transitionProperty: "transform 0.3s ease",
                  transitionDuration: "0.3s",
                  transitionTimingFunction: "ease",
                }}>
                <Item>0</Item>
                <Item>1</Item>
                <Item>2</Item>
                <Item>3</Item>
                <Item>4</Item>
                <Item>5</Item>
                <Item>6</Item>
                {/* <Item>7</Item>
                <Item>8</Item>
                <Item>9</Item>
                <Item>10</Item> */}
              </div>
            </div>
            <div
              className='w-full h-full absolute left-0 top-0 touch-pan-x'
              ///
              onMouseDown={(e) => handle_mouseEnter(e)}
              onMouseMove={(e) => handle_mouseMove(e)}
              onMouseUp={(e) => handle_mouseLeave(e)}
              onMouseLeave={(e) => handle_mouseLeave(e)}
              ////
              onTouchStartCapture={(e) => handle_mouseEnter(e)}
              onTouchStart={(e) => handle_mouseEnter(e)}
              onTouchMove={(e) => handle_mouseMove(e)}
              onTouchCancel={(e) => handle_mouseLeave(e)}
              onTouchEnd={(e) => handle_mouseLeave(e)}></div>
          </div>
        </div>
      </div>
    </div>
  );
});

PopupSchedule_Development.displayName = "PopupSchedule_Development";

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
    //popupInit();
    // popupCtx.setWindow(
    //   "schedule development",
    //   {
    //     Icon: PlayIcon,
    //   },
    //   PopupSchedule_Development,
    //   {},
    //   true
    // );

    get(child(ref(db), "/sceneRelated")).then((snapshot) => {
      if (snapshot.exists()) dispatch(SCENE_RELATE(snapshot.val()));
    });

    get(child(ref(db), "/scenesChildren")).then((snapshot) => {
      if (snapshot.exists()) dispatch(SCENE_CHILDREN_APPEND(snapshot.val()));
    });

    return () => {
      //popupCleanup();
    };
  }, []);

  const handleClick_SceneItem = (sceneID, childrenID, sceneName) => {
    // const screenData = [];
    // screenData[0] = {
    //   ID: sceneID,
    //   name: sceneName,
    //   related: sceneRelated === sceneID,
    // };
    // popupCtx.onUpdatePopupScreenData(screenData);
    // popupCtx.onUpdatePopupIcon(PlayIcon);
    // popupCtx.onUpdatePopupScreenIndex(0);
    // popupCtx.onUpdatePopupTitle(`${toUpperFirst(sceneName)}`, `Scena`);
    // popupCtx.onUpdatePopupVisible(true);

    popupCtx.setWindow(
      "Scena",
      {
        Icon: PlayIcon,
        caption: toUpperFirst(sceneName),
      },
      popupSceneView,
      {
        ID: sceneID,
        childrenID: childrenID,
        name: sceneName,
        related: sceneRelated === sceneID,
      },
      true
    );

    // dispatch(SCENE_REMOVE({ ID: sceneID }));
  };

  const handleClick_SceneCreate = (sceneID, sceneName) => {
    popupCtx.setWindow(
      "Nowa scena",
      {
        Icon: PencilIcon,
        caption: toUpperFirst("konfigurator"),
      },
      popupSceneCreate,
      {},
      true
    );

    // popupCtx.onUpdatePopupIcon(PencilIcon);
    // popupCtx.onUpdatePopupScreenIndex(1);
    // popupCtx.onUpdatePopupTitle(`Nowa scena`, `Konfigurator`);
    // popupCtx.onUpdatePopupVisible(true);
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

      {/* <div className='my-16'>

      </div> */}

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
                onClick={() => handleClick_SceneItem(sceneID, data[sceneID].childrenID, data[sceneID].name)}
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
