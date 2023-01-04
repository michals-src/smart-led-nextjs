import { createContext, ReactElement, ReactNode } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

type TContext = {
  popupIcon: any;
  popupTitle: any;
  popupIsVisible: Boolean;
  popupScreenList: any[];
  popupScreenIndex: number;
  popupScreenData: any[];
  onUpdatePopupVisible: any;
  onUpdatePopupIcon: any;
  onUpdatePopupTitle: any;
  onUpdatePopupScreenIndex: any;
  onUpdatePopupScreenList: any;
  onUpdatePopupScreenData: any;
};

/**
 *
 * get
 *
 * set
 *    window( title, node, props = { propsComponent, main = true | false, caption, Icon } )
 *
 * back
 */

interface IGet {
  Component: any;
  Icon: any;
  header: String;
  caption: String;
  isMain: Boolean;
  isSave: Boolean;
}

interface IWinProps {
  caption?: string;
  Icon?: any;
  save?: false | true;
}

interface IEvents {
  onSave: (func: any) => void;
}

interface IActions {
  back: () => void;
  close: () => void;
  save: () => void;
}

type TPopupContext = {
  popupIsVisible: true | false;
  setWindow: (header: String, winProps: IWinProps, node: ReactNode, nodeProps: any[], main?: true | false) => void;
  get: IGet;
  events: IEvents;
  actions: IActions;
};

const popupContext: TPopupContext = {
  popupIsVisible: false,
  setWindow: () => {},
  get: {
    Component: () => {},
    Icon: InformationCircleIcon,
    header: "Popup window",
    caption: "",
    isMain: false,
    isSave: false,
  },
  events: {
    onSave: () => {},
  },
  actions: {
    back: () => {},
    close: () => {},
    save: () => {},
  },
};

export default createContext(popupContext);
