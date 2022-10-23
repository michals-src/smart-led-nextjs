import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IChannelsSlice {
  items: Object;
}
const initialState: IChannelsSlice = {
  items: {},
};

export const scenerySlice = createSlice({
  name: "scenery",
  initialState,
  reducers: {
    create: (state, action: PayloadAction<Object>) => {
      state.items[action.payload.channelID] = action.payload.scenery;
    },
    /**
     *
     * @param state
     * @param payload
     * @key value HEX COLOR
     * @key time STRING TIME
     * @key brigtness NUMBER 0-100
     */
    appendScenery: (state, action: PayloadAction<Object>) => {
      const { channelID, index, ...rest } = { ...action.payload };
      const arr = state.items[channelID];
      const start = [...arr].slice(0, index);
      const end = [...arr].slice(index, arr.length);
      state.items[channelID] = [...start, rest, ...end];
    },
    updateScenery: (state, action: PayloadAction<Object>) => {
      const { channelID, index, ...rest } = { ...action.payload };
      state.items[channelID][index] = rest;
    },
    removeScenery: (state, action: PayloadAction<Object>) => {
      const { channelID, index } = { ...action.payload };
      const arr = state.items[channelID];
      state.items[channelID] = [...arr].filter((params, key) => {
        if (key !== index) return params;
      });
    },
  },
});

export const { create, appendScenery, updateScenery, removeScenery } = scenerySlice.actions;
export default scenerySlice.reducer;
