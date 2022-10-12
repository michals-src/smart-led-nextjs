import { createContext, ReactNode } from "react";

const context = {
  component: (): JSX.Element => {
    return <></>;
  },
  viewModal: (node?: ReactNode | undefined) => {},
  visible: false,
};

export default createContext(context);
