import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arena: {
    hp: 1000,
    atk: 0,
    def: 0,
    spd: 0,
    cd: 0
  },
  guild: {
    hp: 0,
    atk: 0,
    def: 0,
    spd: 0,
    cd: 0
  },
}

export const statSlice = createSlice({
  name: 'stat',
  initialState,
  reducers: {
    updateArena: (state, action) => {
      state.arena[action.payload.name] = action.payload.arenaCal
    },
    updateGuild: (state, action) => {
      state.guild[action.payload.name] = action.payload.guildCal
    },
  }
})

export const { updateArena, updateGuild } = statSlice.actions
export default statSlice.reducer