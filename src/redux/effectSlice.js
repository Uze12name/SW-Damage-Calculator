import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // effect: ['atkUp', 'brand'],
  effect: [],
  dmgType: '',
  // dmgType: 'defBreak',
}

export const effectSlice = createSlice({
  name: 'effect',
  initialState,
  reducers: {
    updateEffect: (state, action) => {
      state.effect = action.payload
    },
    updateDmgType: (state, action) => {
      state.dmgType = action.payload
    },
  }
})

export const { updateEffect, updateDmgType } = effectSlice.actions
export default effectSlice.reducer