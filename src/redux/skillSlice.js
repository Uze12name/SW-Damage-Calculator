import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSkillInfo = createAsyncThunk('getSkillInfo', async({id, index}) => {
  const url = `/api/v2/skills/${id}`
  const res = await axios.get(url)
  return [res.data, index]
})

const initialState = {
  selectedSkill: 99,
  skills: [],
  // skills: [
    // {
    //   name: 'Spear of Protector',
    //   description: "Attacks the enemy to decrease the Attack Speed for 2 turns with a 30% chance. The faster your Attack Speed compared to the enemy's, the greater damage you can inflict.",
    //   level_progress_description: [
    //     "Damage +5%",
    //     "Damage +5%",
    //     "Effect Rate +10%",
    //     "Damage +10%",
    //     "Effect Rate +10%"
    //   ],
    //   icon: 'skill_icon_0019_9_8.png',

    //   max_level: 6,
    //   multiplier_formula: "2.0*{ATK}*({Relative SPD} + 1)",
    //   multiplier_formula_raw: "[[\"RIDER_SPEED\", \"*\", 2.0], [\"*\"], [\"ATK\", \"*\", 1.0], [\"+\"], [\"ATK\", \"*\", 2.0]]",
    //   upgrades: null,
    //   scales_with: [
    //     "ATK",
    //     "Relative SPD"
    //   ],
    //   multiplier: {
    //     atk: 2,
    //     hp: '',
    //     def: '',
    //     spd1: '',
    //     spd2: '',
    //     skUpDmg: 20,
    //     hits: 1,
    //     speDmg: '',
    //   },
    // },
    // {
    //   name: 'Fast Link',
    //   description: "The faster your Attack Speed, the greater the damage becomes. Attacks the enemy with the beast 2 times. The beast's attack weakens the enemy's Defense for 1 turn, and the rider's attack absorbs the enemy's Attack Bar by 25% for each harmful effect granted on the target, up to 100%.",
    //   level_progress_description: [
    //     "Damage +5%",
    //     "Damage +5%",
    //     "Cooltime Turn -1",
    //     "Damage +10%",
    //     "Cooltime Turn -1"
    //   ],
    //   icon: "skill_icon_0019_4_9.png",

    //   max_level: 6,
    //   multiplier_formula: "{ATK}*({SPD} + 150)/100",
    //   multiplier_formula_raw: "[[\"ATK\", \"*\", 1.0], [\"*\"], [\"ATTACK_SPEED\", \"+\", 150], [\"/\"], [100]]",
    //   upgrades: null,
    //   scales_with: [
    //     "ATK",
    //     "SPD"
    //   ],
    //   multiplier: {
    //     atk: 1,
    //     hp: '',
    //     def: '',
    //     spd1: 150,
    //     spd2: 100,
    //     skUpDmg: 20,
    //     hits: 2,
    //     speDmg: '',
    //   },
    // },
    // {
    //   name: "Start of Attacking",
    //   description: "Attacks the enemy with the beast 2 times. The beast's attack removes all beneficial effects granted on the enemy, and the rider's attack ignores the enemy's Defense by 25% for each beneficial effect the beast removed. Afterwards, the Attack Bar of other allies will be increased, up to 50%, in proportion to the enemy's lost HP from this attack.",
    //   level_progress_description: [
    //     "Damage +5%",
    //     "Damage +10%",
    //     "Cooltime Turn -1"
    //   ],
    //   icon: "skill_icon_0019_9_9.png",

    //   max_level: 4,
    //   multiplier_formula: "3.8*{ATK}",
    //   multiplier_formula_raw: "[[\"ATK\", \"*\", 3.8]]",
    //   upgrades: null,
    //   scales_with: [
    //     "ATK"
    //   ],
    //   multiplier: {
    //     atk: 3.8,
    //     hp: '',
    //     def: '',
    //     spd1: '',
    //     spd2: '',
    //     skUpDmg: 15,
    //     hits: 1,
    //     speDmg: '',
    //   },
    // },
    // {
    //   name: "Rider (Passive)",
    //   description: "Dismounts the beast to battle when you're inflicted with damage that may cause you to die. [Automatic Effect]",
    //   level_progress_description: [],
    //   icon: 'skill_icon_0020_4_0.png',

    //   max_level: 1,
    //   max_level_damage: 15,
    //   hits: 1,
    //   multiplier_formula: "",
    //   multiplier_formula_raw: "[]",
    //   upgrades: null,
    //   scales_with: [],
    // },
  // ]
}

export const skillSlice = createSlice({
  name: 'skillInfo',
  initialState,
  reducers: {
    clearSkillInfo: (state) => {
      state.selectedSkill = 99
      state.skills = []
    },
    select_Skill: (state, action) => {
      state.selectedSkill = action.payload
    }
  },
  extraReducers: {
    [getSkillInfo.fulfilled]: (state, action) => {
      const data = action.payload[0]
      let skillUpDmg = 0
      data.level_progress_description.forEach(value => {
        if(value[0] === 'D') skillUpDmg += (value[8] !== '5' ? Number(value.substring(8, 10)) : 5)
      })

      const multiplier = {
        atk: '',
        hp: '',
        def: '',
        spd1: '',
        spd2: '',
        skUpDmg: skillUpDmg,
        speDmg: '',
        hits: data.hits,
      }
      if (data.scales_with) {
        // 1st member of 'scales_with' always be 'ATK', 'DEF' or 'Max HP'
        const scales_with_raw = new Array(data.scales_with[0]==='MAX HP' ? 'ATTACK_TOT_HP' : data.scales_with[0])
        // If there is ATK scaling, it always be the 1st member of 'scales_with' ** WRONG **
        if (data.scales_with.length > 1) {
          switch (data.scales_with[1]) {
            case 'DEF':
              scales_with_raw[1] = 'DEF'
              break
            case 'SPD':
              scales_with_raw[1] = 'ATTACK_SPEED'
              break
            case 'MAX HP':
              scales_with_raw[1] = 'ATTACK_TOT_HP'
              break
            case 'Target Current HP %':
              scales_with_raw[1] = 'TARGET_CUR_HP_RATE'
              break
            case 'ATK':
              scales_with_raw[1] = 'ATK'
              break
            
            default:
          }
        }
        //eslint-disable-next-line
        const formula = eval(data.multiplier_formula_raw)
        // console.log('Scale with: ', scales_with_raw);
        // console.log('Formula: ', formula);
        // Switch scales_with_raw member position for case e.g. Kai'en S2
        // scales_with = ["ATK", "MAX HP"] but formula[0] is 'ATTACK_TOT_HP' instead of 'ATK'
        if (scales_with_raw.length > 1) {
          if (scales_with_raw[1] === formula[0][0]) {
            const tmp = scales_with_raw[0]
            scales_with_raw[0] = scales_with_raw[1]
            scales_with_raw[1] = tmp
          }
        }

        switch(scales_with_raw[0]) {
          case 'ATK':
            multiplier.atk = formula[0][2]
            break
          case 'DEF':
            multiplier.def = formula[0][2]
            break
          case 'ATTACK_TOT_HP':
            multiplier.hp = formula[0][2]
            break
          case 'ATTACK_SPEED':
            multiplier.spd1 = formula[0][2]
            multiplier.spd2 = formula[2][0]
            break

          default:
        }
        if (scales_with_raw.length > 1) {
          switch(scales_with_raw[1]) {
            case 'ATTACK_TOT_HP':
              multiplier.hp = formula[2][2]
              break
            case 'ATTACK_SPEED':
              multiplier.spd1 = formula[2][2]
              multiplier.spd2 = formula[4][0]
              break
            case 'DEF':
              multiplier.def = formula[2][2]
              break
            case 'TARGET_CUR_HP_RATE':  // [\"TARGET_CUR_HP_RATE\", \"*\", -0.3, \"+\", 0.7]] => Sum it up for enemy with 100% HP case
              const targetHPrate = (formula[2][2] + formula[2][4]).toFixed(2)
              if (scales_with_raw[0] === 'ATK') multiplier.atk = targetHPrate
              else if (scales_with_raw[0] === 'ATTACK_TOT_HP') multiplier.hp = targetHPrate
              else if (scales_with_raw[0] === 'DEF') multiplier.def = targetHPrate
              // scales_with_raw[0] === 'ATK' ? multiplier.atk = targetHPrate : multiplier.def = targetHPrate
              break
            case 'ATK':
              multiplier.atk = formula[2][2]
              break

            default:
          }
        }
      }
      
      const skill = {
        name: data.name,
        description: data.description,
        level_progress_description: data.level_progress_description,
        icon: `https://swarfarm.com/static/herders/images/skills/${data.icon_filename}`,
        
        max_level: data.max_level,
        max_level_damage: skillUpDmg,
        multiplier_formula: data.multiplier_formula,
        multiplier: multiplier,
        // multiplier_formula_raw: data.multiplier_formula_raw,
        // upgrades: data.upgrades,
        // scales_with: data.scales_with,
      }

      state.skills[action.payload[1]] = skill
      // console.log('[skillSlice]-extraReducers: ', skill);
    },
  }
})

export const { clearSkillInfo, select_Skill } = skillSlice.actions
export default skillSlice.reducer