import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { default as modalCtx } from "./modalContext";

type Props = {
  children: ReactNode;
};

const DefaultChild = (): ReactNode => {
  return <div></div>;
};

const ModalProvider = ({ children }: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [component, setComponent] = useState<ReactNode>(DefaultChild);

  const viewModal = useCallback((node?: ReactNode | undefined) => {
    if (typeof node == "undefined" || !node) {
      setComponent(DefaultChild);
      setVisible(false);
      return;
    }
    setComponent(node);
    setVisible(true);
  }, []);

  useEffect(() => {
    const screenElement = document.getElementById("screen");
    if (visible) {
      if (screenElement !== null) {
        screenElement.classList.add("h-screen");
        screenElement.style.overflow = "hidden";
      }
      document.body.style.overflow = "hidden";
    }
    return () => {
      if (screenElement !== null) {
        screenElement.classList.remove("h-screen");
        screenElement.style.overflow = "visible";
      }
      document.body.style.overflow = "visible";
    };
  }, [visible]);

  return (
    <modalCtx.Provider value={{ component, visible, viewModal }}>
      {children}
    </modalCtx.Provider>
  );
};

export default ModalProvider;
