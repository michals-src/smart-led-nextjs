import React, { ReactNode, useEffect, useState } from "react";
import { colors } from "@utils";
import { default as channelCtx } from "./channelContext";
import { useCallback } from "react";

type Props = {
  children?: ReactNode;
};

const ChannelProvider = (props: Props) => {
  const { children } = props;

  const [color, setColor] = useState<string>(colors[0]);
  const [providerValue, setProviderValue] = useState<object>({});

  const color_eventUpdate = useCallback((e: string) => {
    setColor(e);
  }, []);

  const contextProps = {
    color: color,
    events: {
      color: {
        update: color_eventUpdate,
      },
    },
  };

  return (
    <channelCtx.Provider value={contextProps}>{children}</channelCtx.Provider>
  );
};

export default ChannelProvider;