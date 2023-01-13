import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
  children: {},
  abcd: [],
  related: "xde"
}

/**
 * 
 * {
 * 's-@timestamp': {
 *  'name': @string
 *  'childrenID': s-c-@timestamp
 *  'children': [
            *  {
            *    timestamp: @timeInMinutes
            *    channels: {
            *      'ch-1': {
            *        'color': @hex
            *        'is-active': @boolean 
            *      }
            *  *      'ch-2': {
            *        'color': @hex
            *        'is-active': @boolean 
            *      }
            *  *      'ch-3': {
            *        'color': @hex
            *        'is-active': @boolean 
            *      }
            *    }
            * }
 *    ]
 *  }
 * }
 * 
 */

export const scenesSlice = createSlice({
  name: "scenes",
  initialState,
  reducers: {
    SCENE_APPEND: (state, action) => {
      return {...state, items: {...state.items, ...action.payload}};
    },
    SCENE_RELATE: (state, action) => {
      const relation = `${action.payload}`.length <= 0 || typeof action.payload !== "string" || action.payload.charAt(0) !== "S" ? "" : action.payload;
      return {...state, related: relation}
    },
    SCENE_UPDATE: (state, action) => {
      const ID = action.payload.ID;
      const key = action.payload.key;
      const value = action.payload.value;

      if(Object.keys(state.items).indexOf(ID) < 0) return state;
      if(Object.keys(state.items[ID]).indexOf(key) < 0) return state;

      return {...state, [items[ID][key]]: value};
    },
    SCENE_REMOVE: (state, action) => {
      const { ID = '0' } = { ...action.payload };

      if(Object.keys(state.items).indexOf(ID) < 0) return;
      const { [`${ID}`]: removedProperty, ...remainingObject  } = state.items;
      const { [`${state.items[ID].childrenID}`]: removeProperty, ...remainingChildren  } = state.children;

      return {...state, items: remainingObject, children: remainingChildren};
    },
    SCENE_CHILDREN_APPEND: (state, action) => {
      return {...state, children: {...state.children, ...action.payload}};
    },
    SCENE_CHILDREN_UPDATE: (state, action) => {

      // const { childrenID, timestamp } = action.payload;
      // const child = {
      //   [childrenID]: [...state.children[childrenID], {
      //     timestamp,
      //     channels: ''
      //   }]
      // };

      // const ID = action.payload.ID;
      // const key = action.payload.key;
      // const value = action.payload.value;

      // if(Object.keys(state.children).indexOf(ID) < 0) return state;
      // if(Object.keys(state.children[ID]).indexOf(key) < 0) return state;

      // return {...state, [children[ID][key]]: value};      


      const { childrenID, timestamp } = action.payload;
      const child = [...state.children[childrenID], {
          timestamp,
          channels: ''
        }]

      // const ID = action.payload.ID;
      // const key = action.payload.key;
      // const value = action.payload.value;

      // if(Object.keys(state.children).indexOf(ID) < 0) return state;
      // if(Object.keys(state.children[ID]).indexOf(key) < 0) return state;

      return {...state, children: {...state.children, [childrenID]: child}};      

    },
    SCENE_CHILDREN_REMOVE: (state, action) => {

    }
  },
});

export const { SCENE_APPEND, SCENE_RELATE, SCENE_UPDATE, SCENE_REMOVE, SCENE_CHILDREN_APPEND, SCENE_CHILDREN_UPDATE, SCENE_CHILDREN_REMOVE } = scenesSlice.actions;
export default scenesSlice.reducer;
