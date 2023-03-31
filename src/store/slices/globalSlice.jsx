import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';
import db from "@firebase";
import { getDatabase, ref, get, update, set, onValue } from "firebase/database";

const initial = {
    power: undefined,
    scenes: {},
    nodes: {}
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
            return { ...state, nodes: action.payload }
        },
        update_node: (state, action) => {
            const node = state.nodes[action.payload.id];
            const nodes = {...state.nodes, [`${action.payload.id}`]: {...node, ...action.payload.props}};
           

            return {...state, nodes};
        }
    }
})

export const { load_scenery, update_power, load_scenes, load_channels, update_node } = globalSlice.actions;

export const updatePower = (value) => dispatch => {

    dispatch(update_power(value))
    update(ref(db), {
        "/power": value,
    });

}

export const channel = {
    update_status: (id, value) => dispatch => {
        let data = {};
        data[`nodes/${id}/status`] = value

        dispatch(update_node({id, 'props': {
            'status': value
        }}))

        update(ref(db), data);
    },
    update_value: (id, value) => dispatch => {
        let data = {};


        update(ref(db), data);
    },
    update_operation_mode: (id, value) => dispatch => {
        let data = {};


        update(ref(db), data);
    },
    update_brightness: (id, value) => dispatch => {
        let data = {};


        update(ref(db), data);
    }
}

export default globalSlice.reducer;