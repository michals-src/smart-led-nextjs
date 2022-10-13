import { colors } from "@utils";
import { createContext } from "react";

const context = {
  color: colors[0],
  events: {
    color: {
      update: (e: String) => {},
    },
  },
};

export default createContext(context);
