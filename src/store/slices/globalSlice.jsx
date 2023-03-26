import { createSlice } from '@reduxjs/toolkit'
import db from "@firebase";
import { getDatabase, ref, get, update, set, onValue } from "firebase/database";

const initial = {
    power: undefined,
    scenes: {},
    channels: {}
}

export const globalSlice = createSlice({
    name: 'cache',
    initialState: initial,
    reducers: {
        update_power: (state, action) => {
            return { ...state, power: action.payload }
        },
        load_scenes: (state, action) => {
            return { ...state, scenes: action.payload }
        },
        load_scenery: (state, action) => {
            return { ...state, scenesChildren: { ...state.scenesChildren, [`${action.payload.id}`]: action.payload.data } }
        },
        load_channels: (state, action) => {
            return { ...state, channels: action.payload }
        },
    }
})

export const { load_scenery, update_power, load_scenes, load_channels } = globalSlice.actions;

export const updatePower = (value) => dispatch => {

    dispatch(update_power(value))
    update(ref(db), {
        "/power": value,
    });

}

export default globalSlice.reducer;