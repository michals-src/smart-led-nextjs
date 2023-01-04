import React, { ReactNode, useCallback, useEffect, useState } from "react";

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

  const [Icon, setIcon] = useState<any>(InformationCircleIcon);
  const [header, setHeader] = useState<any>("Popup window");
  const [caption, setCaption] = useState<any>("");
  const [isMain, setIsMain] = useState<boolean>(false);
  const [isSave, setIsSave] = useState<boolean>(false);

  const [Component, setComponent] = useState<any>(() => {});
  const [history, setHistory] = useState<any[]>([]);
  const [saveFunc, setSaveFunc] = useState<any>(() => {});

  const setWindow = (header: String, winProps: IWinProps, Node: any, nodeProps: any = {}, main: boolean = false) => {
    const Component = <Node {...nodeProps} />;

    if (typeof winProps.Icon !== undefined) setIcon(winProps.Icon);
    if (typeof winProps.caption !== undefined) setCaption(winProps.caption);

    setIsMain(main);
    setHeader(header);
    setIsSave(typeof winProps.caption !== undefined ? true : false);
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

    const Component = <previousWindow.Node {...previousWindow.nodeProps} />;

    if (typeof previousWindow.winProps.Icon !== undefined) setIcon(previousWindow.winProps.Icon);
    if (typeof previousWindow.winProps.caption !== undefined) setCaption(previousWindow.winProps.caption);

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
    saveFunc instanceof Function
      ? saveFunc()
      : () => {
          throw new Error("Brak funkcji zapisu");
        };

  useEffect(() => {
    if (popupIsVisible) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";

      return;
    }

    document.body.style.overflow = "auto";
    document.body.style.height = "auto";

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
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
