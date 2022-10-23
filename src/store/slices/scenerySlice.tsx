import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IChannelsSlice {
    items: Object
}
const initialState: IChannelsSlice = {
    items: []
}

export const scenerySlice = createSlice({
    name: 'chanels',
    initialState,
    reducers: {
        create: (state, action: PayloadAction<Object>){
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
        append: (state, action: PayloadAction<Object>) => {
            const start = [...state.items].slice(0, index);
            const end = [...state.items].slice(index, state.items.length);
            const newState = [...start, { action.payload.value, action.payload.time, action.payload.brightness }, ...end];
        },
        update: (state, action: PayloadAction<Object>) => {
            const newState = [...state];
            newState[index] = { value, time, brightness };
        },
        remove: (state, action: PayloadAction<number>) => {
            const newState = [...state].filter((params, key) => {
                if (key !== index) return params;
            });
        }
    }
});

export const { create, append, update, remove } = scenerySlice.actions;
export default scenerySlice.reducer;