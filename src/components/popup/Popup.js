import { useRef, useEffect, useState, useCallback, useContext } from "react";

import classNames from "classnames";
import { ArrowLeftIcon, ChevronLeftIcon, LightBulbIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { default as popupContext } from "../../context/popup/popupContext";

// popupIcon: any;
// popupTitle: any;
// popupIsVisible: Boolean;
// popupScreenList: any[];
// popupScreenIndex: number;

const PopupHeader = (props) => {
  const { Icon, title, caption, separate, onBack, onSave, onClose } = props;

  const cn_header = classNames("p-4 md:px-8 pb-6 border-b", {
    "bg-zinc-800": separate,
    "border-[#FFFFFF11]": separate,
    "border-b-transparent": !separate,
  });

  return (
    <div
      className={`popup-header ` + cn_header}
      style={{ borderRadius: "15px 15px 0 0" }}>
      <div className='flex flex-row flex-nowrap items-center'>
        <div className='w-1/12'>
          <Icon className='w-8 h-8 text-zinc-600' />
        </div>
        <div className='w-9/12'>
          <div className='px-5'>
            {/* {title}
             */}

            <h3 className='text-xl'>{title}</h3>
            <p className='text-sm text-zinc-500'>{caption}</p>
          </div>
        </div>
        <div className='w-2/12'>
          <button
            className='w-full p-0 m-0'
            onClick={() => onClose()}>
            <div className='w-auto ml-auto table p-1 bg-zinc-700 rounded-full'>
              <XMarkIcon className='w-5 h-5 text-zinc-400' />
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`popup-header ` + cn_header}
      style={{ borderRadius: "15px 15px 0 0" }}>
      <div className='flex flex-row flex-nowrap items-center'>
        <div className='w-2/12'>
          <div className='px-3'>
            <button className='text-zinc-400 table mx-auto'>
              <div className='flex flex-row flex-nowrap items-center justify-center'>
                <div className='w-3/12'>
                  <ChevronLeftIcon className='w-3 h-3 text-inherit' />
                </div>
                <div className='w-9/12'>
                  <div className='px-1'>
                    <p className='text-xs text-inherit'>Powrót</p>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className='w-8/12'>
          <div className='px-8 text-center'>
            <p className='text-xs font-bold'>Przegląd sceny</p>
          </div>
        </div>
        <div className='w-2/12'>
          <button className='text-zinc-400 table mx-auto'>
            <div className='flex flex-row flex-nowrap items-center justify-center'>
              <div className='w-full'>
                <div className='px-1'>
                  <p className='text-xs text-inherit'>Zapisz</p>
                </div>
              </div>
              {/* <div className='w-3/12'>
                  <ChevronLeftIcon className='w-3 h-3 text-inherit' />
                </div> */}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const PopupHeaderActions = (props) => {
  const { Icon, title, caption, separate, save, onBack, onSave, onClose } = props;

  const cn_header = classNames("p-4 md:px-8 pb-6 border-b", {
    "bg-zinc-800": separate,
    "border-[#FFFFFF11]": separate,
    "border-b-transparent": !separate,
  });

  return (
    <div
      className={`popup-header ` + cn_header}
      style={{ borderRadius: "15px 15px 0 0" }}>
      <div className='flex flex-row flex-nowrap items-center'>
        <div className='w-2/12'>
          <div className='px-3'>
            <button
              className='text-zinc-400 table mx-auto'
              onClick={onBack}>
              <div className='flex flex-row flex-nowrap items-center justify-center'>
                <div className='w-3/12'>
                  <ChevronLeftIcon className='w-3 h-3 text-inherit' />
                </div>
                <div className='w-9/12'>
                  <div className='px-1'>
                    <p className='text-xs text-inherit'>Powrót</p>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className='w-8/12'>
          <div className='px-8 text-center'>
            <p className='text-xs font-bold'>{title}</p>
          </div>
        </div>
        <div className='w-2/12'>
          {!save && (
            <button
              className='w-full p-0 m-0'
              onClick={() => onClose()}>
              <div className='w-auto ml-auto table p-1 bg-zinc-700 rounded-full'>
                <XMarkIcon className='w-5 h-5 text-zinc-400' />
              </div>
            </button>
          )}

          {save && (
            <button
              className='text-zinc-400 table mx-auto'
              onClick={() => onSave()}>
              <div className='flex flex-row flex-nowrap items-center justify-center'>
                <div className='w-full'>
                  <div className='px-1'>
                    <p className='text-xs text-inherit'>Zapisz</p>
                  </div>
                </div>
                {/* <div className='w-3/12'>
                    <ChevronLeftIcon className='w-3 h-3 text-inherit' />
                  </div> */}
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

function Popup(props) {
  const { children, title } = props;
  //const { popupScreenList, popupScreenIndex, popupIcon, popupTitle, popupIsVisible, onUpdatePopupVisible } = useContext(popupCtx);
  const popupCtx = useContext(popupContext);

  const Component = popupCtx.get.Component;

  const windowRef = useRef(null);
  const ref = useRef(null);
  const refContent = useRef(null);
  const refContentWrapper = useRef(null);

  let changed1 = useRef(false);
  let changed2 = useRef(false);

  const [windowIn, setWindowIn] = useState(false);
  const [windowOut, setWindowOut] = useState(false);
  const [separateHeader, setSeparateHeader] = useState(false);
  const [cn, setCn] = useState({
    wrapper: {},
  });

  const contentScrollHandle = useCallback((e) => {
    const limit = 15;

    if (e.target.scrollTop >= limit && changed1.current == false) {
      setSeparateHeader(true);
      changed1.current = true;
      changed2.current = false;
    }
    if (e.target.scrollTop < limit && changed2.current == false) {
      setSeparateHeader(false);
      changed1.current = false;
      changed2.current = true;
    }

    const elRect = refContent.current.getBoundingClientRect();
    refContentWrapper.current.style.height = elRect.height + "px";
  }, []);

  useEffect(() => {
    if (ref.current === null || ref.current === null) return;

    windowRef.current.addEventListener("transitionend", () => setWindowIn((state) => !state));
    ref.current.addEventListener("scroll", contentScrollHandle);

    return () => {
      ref?.current?.removeEventListener("scroll", contentScrollHandle);
      windowRef?.current?.removeEventListener("transitionend", () => setWindowIn((state) => !state));
    };
  }, [ref.current, windowRef.current]);

  useEffect(() => {
    const cn_wrapper = classNames("fixed top-0 left-0 right-0 w-full h-full z-[100]", {
      "is-visible": popupCtx.popupIsVisible,
      "is-hidden": windowIn && !popupCtx.popupIsVisible,
    });

    //console.log(windowIn, cn_wrapper);

    setCn((state) => {
      return { ...state, wrapper: cn_wrapper };
    });
  }, [popupCtx.popupIsVisible, windowIn]);

  useEffect(() => {
    if (refContent.current === null) return;

    const elRect = refContent.current.getBoundingClientRect();
    refContentWrapper.current.style.height = elRect.height + "px";

    //console.log();
  }, [Component]);

  if (!popupCtx.popupIsVisible && !windowIn) return <></>;

  return (
    <div className={`popup ` + cn.wrapper}>
      <div className='popup-parent relative w-full h-screen'>
        <div className='popup-blacken w-[100vw] h-[100vh] absolute top-0 left-0 '></div>
        <div
          ref={windowRef}
          className={`popup-window w-full h-auto absolute bottom-0 left-0`}>
          <div
            className='max-w-lg mx-auto bg-zinc-900 relative overflow-hidden'
            style={{ borderRadius: "15px 15px 0 0", boxShadow: "-8px 0 30px #00000010" }}>
            <div className='w-full h-auto z-30'>
              {popupCtx.get.isMain && (
                <PopupHeader
                  Icon={popupCtx.get.Icon}
                  title={popupCtx.get.header}
                  caption={popupCtx.get.caption}
                  separate={separateHeader}
                  onBack={popupCtx.actions.back}
                  onSave={popupCtx.actions.save}
                  onClose={popupCtx.actions.close}
                />
              )}
              {!popupCtx.get.isMain && (
                <PopupHeaderActions
                  Icon={popupCtx.get.Icon}
                  title={popupCtx.get.header}
                  caption={popupCtx.get.caption}
                  separate={separateHeader}
                  save={popupCtx.get.isSave}
                  onBack={popupCtx.actions.back}
                  onSave={popupCtx.actions.save}
                  onClose={popupCtx.actions.close}
                />
              )}
            </div>
            <div className='relative z-10'>
              <div>
                <div
                  ref={ref}
                  className='overflow-auto max-h-[calc(70vh)] p-4 md:px-8'>
                  <div
                    ref={refContentWrapper}
                    style={{ height: "auto", transition: "height .6s cubic-bezier(0.16, 0.27, 0, 1.04)" }}>
                    <div
                      ref={refContent}
                      style={{ maxHeight: "1000000px" }}>
                      {Component}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
