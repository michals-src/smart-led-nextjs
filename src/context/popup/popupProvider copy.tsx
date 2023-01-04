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
  // set: {
  //   Window: (header: String, winProps: IWinProps, node: ReactNode, nodeProps: any[]) => {},
  // },
  // get: {
  //   Component: () => {},
  //   Icon: InformationCircleIcon,
  //   header: "Popup window",
  //   caption: "",
  // },
  // back: () => {},
  // save: () => {},

  const [Icon, setIcon] = useState<any>(InformationCircleIcon);
  const [header, setHeader] = useState<any>("Popup window");
  const [caption, setCaption] = useState<any>("");

  const [Component, setComponent] = useState<any>(() => {});
  const [history, setHistory] = useState<any[]>([]);
  const [save, setSave] = useState<any>(() => {});

  const setWindow = (header: String, winProps: IWinProps, Node: any, nodeProps: any = {}, main: boolean = false) => {
    const Component = <Node {...nodeProps} />;

    if (winProps.Icon !== "undefined") setIcon(Icon);
    if (winProps.caption !== "undefined") setCaption(caption);
    setHeader(header);
    setHistory((state) => {
      if (main) state = [];

      state.push({ header, winProps, Node, nodeProps, main });
      return state;
    });
    setComponent(Component);
  };

  const onSave = (func: any) => setSave(func);

  const [popupIcon, setPopupIcon] = useState<JSX.Element>(() => <InformationCircleIcon className='w-8 h-8 text-zinc-600' />);
  const [popupTitle, setPopupTitle] = useState<JSX.Element>(() => {
    return (
      <>
        <h3 className='text-xl'>Popup</h3>
        <p className='text-sm text-zinc-500'>Subtitle</p>
      </>
    );
  });
  const [popupIsVisible, setPopupIsVisible] = useState<boolean>(false);
  const [popupScreenList, setPopupScreenList] = useState<any[]>([]);
  const [popupScreenIndex, setPopupScreenIndex] = useState<number>(0);
  const [popupScreenData, setPopupScreenData] = useState<any[]>([]);

  const onUpdatePopupVisible = (visible: boolean) => setPopupIsVisible(visible);

  const onUpdatePopupIcon = (node: any) => {
    const Icon = node;

    setPopupIcon(<Icon className='w-8 h-8 text-zinc-600' />);
  };
  const onUpdatePopupTitle = (title: any, subtitle: any) => {
    setPopupTitle(() => {
      return (
        <>
          <h3 className='text-xl font-bold'>{title}</h3>
          <p className='text-sm text-zinc-500'>{subtitle}</p>
        </>
      );
    });
  };
  const onUpdatePopupScreenIndex = (index: number) => setPopupScreenIndex(index);
  const onUpdatePopupScreenList = (list: any[]) => setPopupScreenList(list);
  const onUpdatePopupScreenData = (list: any[]) => setPopupScreenData(list);

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
        popupIcon,
        popupTitle,
        popupIsVisible,
        popupScreenList,
        popupScreenIndex,
        popupScreenData,
        onUpdatePopupVisible,
        onUpdatePopupIcon,
        onUpdatePopupTitle,
        onUpdatePopupScreenIndex,
        onUpdatePopupScreenList,
        onUpdatePopupScreenData,
      }}>
      {children}
    </popupCtx.Provider>
  );
};

export default PopupProvider;
