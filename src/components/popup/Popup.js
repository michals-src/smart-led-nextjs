import { useRef, useEffect, useState, useCallback, useContext } from "react";
import classNames from "classnames";

import { default as popupContext } from "../../context/popup/popupContext";

import PopupHeader from "./popupHeader";
import PopupHeaderAction from "./popupHeaderAction";

// popupIcon: any;
// popupTitle: any;
// popupIsVisible: Boolean;
// popupScreenList: any[];
// popupScreenIndex: number;

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

  const handle_transitionEnd = useCallback(() => {
    setWindowIn((state) => !state);
    ref.current.style.overflow = "auto";
  }, []);

  useEffect(() => {
    if (ref.current === null || ref.current === null) return;

    windowRef.current.addEventListener("transitionend", handle_transitionEnd);
    ref.current.addEventListener("scroll", contentScrollHandle);

    return () => {
      ref?.current?.removeEventListener("scroll", contentScrollHandle);
      windowRef?.current?.removeEventListener("transitionend", handle_transitionEnd);
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

    ref.current.style.overflow = "hidden";

    if (popupCtx.get.refNode === null) {
      const elRect = refContent.current.getBoundingClientRect();
      refContentWrapper.current.style.height = elRect.height + "px";

      return;
    }

    const elRect = popupCtx.get.refNode.current.getBoundingClientRect();
    refContentWrapper.current.style.height = elRect.height + "px";
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
                <PopupHeaderAction
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
