import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMonsInfo = createAsyncThunk('getMonsInfo', async({name, index}) => {
  const rootUrl = process.env.NODE_ENV === "production" ? "https://swarfarm.com" : ""
  const url = `${rootUrl}/api/v2/monsters/?name=${name}`
  const res = await axios.get(url)
  return [res.data, index]
})

const initialState = {
  info: {
    name: 'NAME',
    image: null,
    element: 'None',
    type: 'None',
    skills: null,
    leader_skill: null,
    leaderImageLoc: null,
    // leader_skill: {
    //   id: 143,
    //   url: "https://swarfarm.com/api/v2/leader-skills/143/",
    //   attribute: "HP",
    //   amount: 33,
    //   area: "General",
    //   element: null
    // },
    // leaderImageLoc: '/images/leader_skills/leader_skill_Attack_Power.png',

  },
  base: {
    hp: 10000,
    atk: 1000,
    def: 1000,
    spd: 100,
  },
  pending: false,
  error: false,
}

export const monsInfoSlice = createSlice({
  name: 'monsInfo',
  initialState,
  reducers: {},
  extraReducers: {
    [getMonsInfo.pending]: (state) => {
      state.pending = true
      state.error = false;
    },
    [getMonsInfo.rejected]: (state) => {
      state.pending = false
      state.error = true
    },
    [getMonsInfo.fulfilled]: (state, action) => {
      state.pending = false
      let data = null
      // if (action.payload[0].results[0].awaken_bonus === 'Secondary Awakening' || action.payload[1])
      if (action.payload[1] !== undefined)
        data = action.payload[0].results[action.payload[1]]
      else
        data = action.payload[0].results[0]

      // const area = data.leader_skill.element ? ('_' + data.leader_skill.element) : (data.leader_skill.area === 'General' ? '' : ('_' + data.leader_skill.area))
      // const attribute = data.leader_skill.attribute.replace(' ', '_')
      let leaderImageLoc = null
      if (data.leader_skill) {
        const area = data.leader_skill.element ?? data.leader_skill.area
        const area_file = area === 'General' ? '' : '_' + area
        const attribute = data.leader_skill.attribute.replace(' ', '_')
        leaderImageLoc = `/images/leader_skills/leader_skill_${attribute}${area_file}.png`
      }

      state.info.leader_skill = data.leader_skill
      state.info.leaderImageLoc = leaderImageLoc
      state.info.name = data.name
      state.info.image = `https://swarfarm.com/static/herders/images/monsters/${data.image_filename}`
      state.info.element = data.element
      state.info.type = data.archetype
      state.info.skills = data.skills
      // state.info.leader_skill = data.leader_skill ?? 'None'
      state.base.hp = data.max_lvl_hp
      state.base.atk = data.max_lvl_attack
      state.base.def = data.max_lvl_defense
      state.base.spd = data.speed
  },
  // extraReducers: builder => {
  // builder
    //   .addCase (getMonsInfo.pending, (state) => {
    //     state.pending = true
    //     state.error = false;
    //   })
    //   .addCase (getMonsInfo.rejected, (state) => {
    //     state.pending = false
    //     state.error = true
    //   })
    //   .addCase (getMonsInfo.fulfilled, (state, action) => {
    //     state.pending = false
    //   })
  }
})

export default monsInfoSlice.reducer