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

const context: TContext = {
  popupIcon: InformationCircleIcon,
  popupTitle: "",
  popupIsVisible: false,
  popupScreenList: [],
  popupScreenIndex: 0,
  popupScreenData: [],
  onUpdatePopupVisible: (visible: Boolean) => {},
  onUpdatePopupIcon: (node: JSX.Element) => {},
  onUpdatePopupTitle: (title: any, subtitle: any) => {},
  onUpdatePopupScreenIndex: (index: number) => {},
  onUpdatePopupScreenList: (list: any[]) => {},
  onUpdatePopupScreenData: (list: any[]) => {},
};

export default createContext(context);
