import { createSlice } from "@reduxjs/toolkit";

var initialState = {
  buildings: JSON.parse(localStorage.getItem('buildings')),
  flags: JSON.parse(localStorage.getItem('flags')),
}
if (!initialState.buildings || !initialState.flags) {
  // console.log('[BuildingSlice] initialState++++')
  initialState = {
    buildings: {
      hp: 20,
      atk: 20,
      def: 20,
      spd: 15,
      cd: 25,
      wind: 21,
      water: 21,
      fire: 21,
      light: 21,
      dark: 21
    },
    flags: {
      hp: 20,
      atk: 20,
      def: 20,
      cd: 25
    }
  }
}

export const BuildingSlice = createSlice({
  name: 'building',
  initialState,
  reducers: {
    updateBuildings: (state, action) => {
      // state[action.payload.name] = action.payload.value
      // console.log('[buildingSlice]**state**', state.spd);
      state.buildings[action.payload.name] = action.payload.value
    },
    updateFlags: (state, action) => {
      state.flags[action.payload.name] = action.payload.value
    },
  },
})

export const { updateBuildings, updateFlags } = BuildingSlice.actions
export default BuildingSlice.reducer