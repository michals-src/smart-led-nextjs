import { createContext, ReactElement, ReactNode } from "react";

type TContext = {
  component: any;
  viewModal: any;
  visible: Boolean;
};

const context: TContext = {
  component: () => {
    return <></>;
  },
  viewModal: (node?: JSX.Element | undefined) => {},
  visible: false,
};

export default createContext(context);
