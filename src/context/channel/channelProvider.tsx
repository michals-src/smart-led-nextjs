import React, { ReactNode, useEffect, useState } from "react";
import { colors } from "@utils";
import { default as ChannelCtx } from "./channelContext";
import { useCallback } from "react";

type Props = {
  children?: ReactNode;
};

const ChannelProvider = (props: Props) => {
  const { children } = props;

  const [color, setColor] = useState<string>(colors[0]);
  const [channelID, setChannelID] = useState<number>(-1);
  const [power, setPower] = useState<boolean>(false);
  const [brightness, setBrigtness] = useState<number>(0);

  const color_eventUpdate = useCallback((e: string) => {
    setColor(e);
  }, []);

  const channelID_eventUpdate = useCallback((e: number) => {
    setChannelID(e);
  }, []);

  const power_eventUpdate = useCallback((e: boolean) => {
    setPower(e);
  }, []);

  const brightness_eventUpdate = useCallback((e: number) => {
    setBrigtness(e);
  }, []);

  const contextProps = {
    channelID,
    color,
    power,
    brightness,
    events: {
      color: {
        update: color_eventUpdate,
      },
      channelID: {
        update: channelID_eventUpdate,
      },
      power: {
        update: power_eventUpdate,
      },
      brightness: {
        update: brightness_eventUpdate,
      },
    },
  };

  /**
   * @todo: move reading data from db
   * @example: <Provider><init />{children}</Provider>
   */

  return (
    <ChannelCtx.Provider value={contextProps}>{children}</ChannelCtx.Provider>
  );
};

export default ChannelProvider;
