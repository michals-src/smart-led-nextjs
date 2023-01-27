import React, { createRef, ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { InformationCircleIcon } from "@heroicons/react/24/solid";

import { default as popupCtx } from "./popupContext";

type Props = {
  children: ReactNode;
};

interface IWinProps {
  caption?: string;
  Icon?: any;
  save?: false | true;
}

const PopupProvider = ({ children }: Props) => {
  const [popupIsVisible, setPopupIsVisible] = useState<boolean>(false);
  const refNode = useRef<any>();

  const [Icon, setIcon] = useState<any>(InformationCircleIcon);
  const [header, setHeader] = useState<any>("Popup window");
  const [caption, setCaption] = useState<any>("");
  const [isMain, setIsMain] = useState<boolean>(false);
  const [isSave, setIsSave] = useState<boolean>(false);

  const [Component, setComponent] = useState<any>(() => {});
  const [history, setHistory] = useState<any[]>([]);
  const [saveFunc, setSaveFunc] = useState<any>(() => {});
  const event = new Event("xdee");

  const setWindow = (header: String, winProps: IWinProps, Node: any, nodeProps: any = {}, main: boolean = false) => {
    const Component = (
      <Node
        ref={refNode}
        event
        {...nodeProps}
      />
    );

    console.log(refNode);

    if (typeof winProps.Icon !== undefined) setIcon(winProps.Icon);
    if (typeof winProps.caption !== undefined) setCaption(winProps.caption);
    setIsSave(typeof winProps.save !== undefined && winProps.save === true ? true : false);

    setIsMain(main);
    setHeader(header);
    setHistory((state) => {
      if (main) state = [];

      const headers = state.map((e) => e.header);
      if (headers.indexOf(header) < 0) state.push({ header, winProps, Node, nodeProps, main });

      console.log(state);

      return state;
    });
    setComponent(Component);
    if (!popupIsVisible) setPopupIsVisible(true);
  };

  const back = () => {
    const previousWindow = history[history.length - 2];

    const Component = (
      <previousWindow.Node
        ref={refNode}
        {...previousWindow.nodeProps}
      />
    );

    if (typeof previousWindow.winProps.Icon !== undefined) setIcon(previousWindow.winProps.Icon);
    if (typeof previousWindow.winProps.caption !== undefined) setCaption(previousWindow.winProps.caption);

    setIsSave(typeof previousWindow.winProps.save !== undefined && previousWindow.winProps.save === true ? true : false);

    setIsMain(previousWindow.main);
    setHeader(previousWindow.header);
    setHistory((state) => {
      return [...state].slice(0, state.length - 1);
    });
    setComponent(Component);
    if (!popupIsVisible) setPopupIsVisible(true);
  };
  const close = () => {
    setPopupIsVisible(false);
  };
  const onSave = (func: any) => setSaveFunc(func);
  const save = () =>
    saveFunc instanceof Function && refNode.current !== null
      ? console.log(refNode.current.dispatchEvent(event))
      : () => {
          throw new Error("Brak funkcji zapisu");
        };

  useEffect(() => {
    if (popupIsVisible) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      document.body.style.touchAction = "none";
      document.body.style.userSelect = "none";

      // document.addEventListener(
      //   "touchmove",
      //   function (e) {
      //     e.preventDefault();
      //   },
      //   { passive: false }
      // );
      // document.body.addEventListener(
      //   "touchmove",
      //   function (e) {
      //     e.preventDefault();
      //   },
      //   { passive: false }
      // );

      return;
    }

    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    document.body.style.touchAction = "auto";
    document.body.style.userSelect = "auto";

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
      document.body.style.touchAction = "auto";
      document.body.style.userSelect = "auto";
    };
  }, [popupIsVisible]);

  return (
    <popupCtx.Provider
      value={{
        popupIsVisible,
        setWindow,
        get: {
          Component,
          Icon,
          header,
          caption,
          isMain,
          isSave,
          refNode,
        },
        events: {
          onSave,
        },
        actions: {
          back,
          close,
          save,
        },
      }}>
      {children}
    </popupCtx.Provider>
  );
};

export default PopupProvider;
