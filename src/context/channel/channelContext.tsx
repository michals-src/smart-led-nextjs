import { colors } from "@utils";
import { createContext } from "react";

const context = {
  channelID: -1,
  color: colors[0],
  power: false,
  brightness: 0,
  events: {
    color: {
      update: (e: String) => {},
    },
    channelID: {
      update: (e: number) => {},
    },
    power: {
      update: (e: boolean) => {},
    },
    brightness: {
      update: (e: number) => {},
    },
  },
};

export default createContext(context);
