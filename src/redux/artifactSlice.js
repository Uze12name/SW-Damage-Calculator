import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  artiArena: {
    atkUp: 0,
    defUp: 0,
    spdUp: 0,
    hp: 0,
    atk: 0,
    def: 0,
    spd: 0,
    sumAdd: 0,
  },
  artiGuild: {
    atkUp: 0,
    defUp: 0,
    spdUp: 0,
    hp: 0,
    atk: 0,
    def: 0,
    spd: 0,
    sumAdd: 0,
  }
}

export const artifactSlice = createSlice({
  name: 'artifact',
  initialState,
  reducers: {
    updateArtiArena: (state, action) => {
      state.artiArena[action.payload.name] = action.payload.arenaCal
      state.artiArena.sumAdd = state.artiArena.hp + state.artiArena.atk + state.artiArena.def + state.artiArena.spd
    },
    updateArtiGuild: (state, action) => {
      state.artiGuild[action.payload.name] = action.payload.guildCal
      state.artiGuild.sumAdd = state.artiGuild.hp + state.artiGuild.atk + state.artiGuild.def + state.artiGuild.spd
    },
  }
})

export const { updateArtiArena, updateArtiGuild } = artifactSlice.actions
export default artifactSlice.reducer