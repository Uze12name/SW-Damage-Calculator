// import InfoIcon from '@mui/icons-material/Info';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SelectSkill from './SelectSkill'
import HPnDEFCal from './HPnDEFCal'

const flexContainer = {
  display: 'flex',
  flexDirection: {xs:'column', sm:'row'},
  // mb:1,
}
const sx_TextField = {
  width: {xs:1, sm:120},
  pr: 1,
}
const sx_Label = {
  alignSelf:'center',
  textAlign:'end',
  pr:1,
}
const sx_ResultText = {
  fontSize:18,
  fontWeight:400,
  mx:1,
  // color:'success.main',
}
const sx_ResultNumber = {
  fontSize:18,
  fontWeight:500,
  color:'success.main',
  // color:'success.main',
}

export default function Damage () {
  // const dispatch = useDispatch()
  const effect = useSelector(state => state.effect.effect)
  const dmgType = useSelector(state => state.effect.dmgType)
  const arenaStat = useSelector(state => state.stat.arena)
  const guildStat = useSelector(state => state.stat.guild)
  const artiArena = useSelector(state => state.artifact.artiArena)
  const artiGuild = useSelector(state => state.artifact.artiGuild)
  const skills = useSelector(state => state.skillInfo.skills)
  const selectedSkill = useSelector(state => state.skillInfo.selectedSkill)

  const [targetDEF, setTargetDEF] = useState({
    def: 1400, mltplr: 0,
  })
  const [skillMltplr, setSkillMltplr] = useState({
    atk: '', hp: '', def: '', spd1: '', spd2: '',
    skUpDmg: '', hits: 1, speDmg: '',
  })
  const [lastMltplr, setLastMltplr] = useState({
    plus: '', minus: '',
  })
  const [damage, setDamage] = useState({
    arena: 0, arenaCrit: 0,
    guild: 0, guildCrit: 0,
    arenaFluc: '', arenaCritFluc: '',
    guildFluc: '', guildCritFluc: '',
  })

  const onSetSkillMltplr = (e) => {
    setSkillMltplr(prev=>({...prev, [e.target.name]:e.target.value}))
  }

  const onLastMltplrChange = (e) => {
    setLastMltplr(prev=>({...prev, [e.target.name]:e.target.value}))
  }
  
  useEffect ( ()=> {  //-- Target defense multiplier calculation --//
    let mltplr = 0
    if (dmgType === 'defBreak') mltplr = 1000/(1140 + 1.05 * targetDEF.def)
    else if (dmgType === 'ignoreDef') mltplr = 1000/1140
    else if (dmgType === 'bomb' || dmgType === 'fixed') mltplr = 1
    else mltplr = 1000/(1140 + 3.5 * targetDEF.def)
    
    setTargetDEF(prev=>({...prev, mltplr}))
  }, [dmgType, targetDEF.def])

  useEffect ( ()=> { //-- Set skill multiplier when select a skill --//
    if(selectedSkill !== 99) setSkillMltplr(skills[selectedSkill].multiplier)
  }, [selectedSkill, skills])

  //-- Damage calculation --//
  useEffect ( ()=> {  
    let aAtk = 0, gAtk = 0
    let aDef = 0, gDef = 0
    let spd = 0
    let aHp = arenaStat.hp, gHp = guildStat.hp
    let arenaAtk = 0, guildAtk = 0, arenaAtkCrit = 0, guildAtkCrit = 0
    let arenaDef = 0, guildDef = 0, arenaDefCrit = 0, guildDefCrit = 0
    let arenaHp = 0, guildHp = 0, arenaHpCrit = 0, guildHpCrit = 0
    let arenaSpd = 0, guildSpd = 0, arenaSpdCrit = 0, guildSpdCrit = 0
    let speDmg = 0

    if (effect.includes('atkUp')) {
      aAtk = artiArena.atkUp
      gAtk = artiGuild.atkUp
    } else {
      aAtk = arenaStat.atk
      gAtk = guildStat.atk
    }
    if (effect.includes('defUp')) {
      aDef = artiArena.defUp
      gDef = artiGuild.defUp
    } else {
      aDef = arenaStat.def
      gDef = guildStat.def
    }
    spd = effect.includes('spdUp') ? artiArena.spdUp : arenaStat.spd

    const plusDmg = Number((1 + lastMltplr.plus/100).toFixed(2))
    const minusDmg = Number((1 - lastMltplr.minus/100).toFixed(2))
    const skUp = Number((skillMltplr.skUpDmg/100).toFixed(2))
    const arenaCD = Number((arenaStat.cd/100).toFixed(2))
    const guildCD = Number((guildStat.cd/100).toFixed(2))
    const skUp_NonCrit = 1 + skUp //-- 1 + Crit Damage % + Skill Level Up Damage % --//
    const skUp_ArenaCrit = 1 + arenaCD + skUp
    const skUp_GuildCrit = 1 + guildCD + skUp

    //-- Damage from ATK --//
    if(skillMltplr.atk && !(skillMltplr.spd1)) {
      arenaAtk = (skUp_NonCrit * aAtk * skillMltplr.atk * targetDEF.mltplr)
      guildAtk = (skUp_NonCrit * gAtk * skillMltplr.atk * targetDEF.mltplr)
      arenaAtk = (skUp_NonCrit * aAtk * skillMltplr.atk * targetDEF.mltplr)
      guildAtk = (skUp_NonCrit * gAtk * skillMltplr.atk * targetDEF.mltplr)
      if (dmgType !== 'fixed' && dmgType !== 'bomb') {
        arenaAtkCrit = (skUp_ArenaCrit * aAtk * skillMltplr.atk * targetDEF.mltplr)
        guildAtkCrit = (skUp_GuildCrit * gAtk * skillMltplr.atk * targetDEF.mltplr)
      }
    } //-- Damage from DEF --//
    if(skillMltplr.def) {
      arenaDef = (skUp_NonCrit * aDef * skillMltplr.def * targetDEF.mltplr)
      guildDef = (skUp_NonCrit * gDef * skillMltplr.def * targetDEF.mltplr)
      if (dmgType !== 'fixed' && dmgType !== 'bomb') {
        arenaDefCrit = (skUp_ArenaCrit * aDef * skillMltplr.def * targetDEF.mltplr)
        guildDefCrit = (skUp_GuildCrit * gDef * skillMltplr.def * targetDEF.mltplr)
      }
    } //-- Damage from Max HP --//
    if(skillMltplr.hp) {
      arenaHp = (skUp_NonCrit * aHp * skillMltplr.hp * targetDEF.mltplr)
      guildHp = (skUp_NonCrit * gHp * skillMltplr.hp * targetDEF.mltplr)
      if (dmgType !== 'fixed' && dmgType !== 'bomb') {
        arenaHpCrit = (skUp_ArenaCrit * aHp * skillMltplr.hp * targetDEF.mltplr)
        guildHpCrit = (skUp_GuildCrit * gHp * skillMltplr.hp * targetDEF.mltplr)
      }
    } //-- Damage from SPD --//
    if(skillMltplr.spd1 || skillMltplr.spd2) {
      const aSpdMltplr = ((aAtk * skillMltplr.atk) * (spd+Number(skillMltplr.spd1))) / Number(skillMltplr.spd2)
      const gSpdMltplr = ((gAtk * skillMltplr.atk) * (spd+Number(skillMltplr.spd1))) / Number(skillMltplr.spd2)
      arenaSpd = (skUp_NonCrit * aSpdMltplr * targetDEF.mltplr)
      guildSpd = (skUp_NonCrit * gSpdMltplr * targetDEF.mltplr)
      if (dmgType !== 'fixed' && dmgType !== 'bomb') {
        arenaSpdCrit = (skUp_ArenaCrit * aSpdMltplr * targetDEF.mltplr)
        guildSpdCrit = (skUp_GuildCrit * gSpdMltplr * targetDEF.mltplr)
      }
    } //-- Special damage value e.g., Demon S1, ML S3,... --//
    if (skillMltplr.speDmg) speDmg = skillMltplr.speDmg * targetDEF.mltplr

    //-- Damage before calculate with target -damage & branding --//
    const rawArena = ((arenaAtk + arenaDef + arenaHp + arenaSpd + speDmg) * plusDmg + artiArena.sumAdd)
    const rawGuild = ((guildAtk + guildDef + guildHp + guildSpd + speDmg) * plusDmg + artiGuild.sumAdd)
    let rawArenaCrit = 0, rawGuildCrit = 0
    if (dmgType !== 'fixed' && dmgType !== 'bomb') {
      rawArenaCrit = ((arenaAtkCrit + arenaDefCrit + arenaHpCrit + arenaSpdCrit + speDmg) * plusDmg + artiArena.sumAdd)
      rawGuildCrit = ((guildAtkCrit + guildDefCrit + guildHpCrit + guildSpdCrit + speDmg) * plusDmg + artiGuild.sumAdd)
    }
    // console.log('*-*-*: ', rawGuild, ' - ', rawGuildCrit);
    // -- Branding damage --//
    let arenaBrand = 0, arenaCritBrand = 0
    let guildBrand = 0, guildCritBrand = 0
    if (effect.includes('brand')) {
      arenaBrand = Math.floor(rawArena * 0.25)
      guildBrand = Math.floor(rawGuild * 0.25)
      if (dmgType !== 'fixed' && dmgType !== 'bomb') {
        arenaCritBrand = Math.floor(rawArenaCrit * 0.25)
        guildCritBrand = Math.floor(rawGuildCrit * 0.25)
      }
    }
    //-- Final calculation --//
    const arena = Math.floor((rawArena * minusDmg + arenaBrand) * skillMltplr.hits)
    const guild = Math.floor((rawGuild * minusDmg + guildBrand) * skillMltplr.hits)
    let arenaCrit = 0, guildCrit = 0
    if (dmgType !== 'fixed' && dmgType !== 'bomb') {
      arenaCrit = Math.floor((rawArenaCrit * minusDmg + arenaCritBrand) * skillMltplr.hits)
      guildCrit = Math.floor((rawGuildCrit * minusDmg + guildCritBrand) * skillMltplr.hits)
    }
    //-- +-3% fluctuation --//
    let arenaFluc = '', arenaCritFluc = ''
    let guildFluc = '', guildCritFluc = ''
    if(dmgType !== 'fixed') { //-- Fixed damage always be the same value (non fluctuate) --//
        arenaFluc = `(${Number(Math.floor(arena*0.97)).toLocaleString()} - ${Number(Math.floor(arena*1.03)).toLocaleString()})`
        guildFluc = `(${Number(Math.floor(guild*0.97)).toLocaleString()} - ${Number(Math.floor(guild*1.03)).toLocaleString()})`
        if(dmgType !== 'bomb') {  //-- Bomb & fixed damage can't crit --//
          arenaCritFluc = `(${Number(Math.floor(arenaCrit*0.97)).toLocaleString()} - ${Number(Math.floor(arenaCrit*1.03)).toLocaleString()})`
          guildCritFluc = `(${Number(Math.floor(guildCrit*0.97)).toLocaleString()} - ${Number(Math.floor(guildCrit*1.03)).toLocaleString()})`
        }
    }
    setDamage({arena, arenaCrit, guild, guildCrit, arenaFluc, arenaCritFluc, guildFluc, guildCritFluc})
  }, [skillMltplr, targetDEF.mltplr, lastMltplr, arenaStat, guildStat, artiArena, artiGuild, dmgType, effect])


  return (
    <Box>
      <Box sx={[flexContainer, {mb:1}]} >
        {/* <Box sx={{mb:1, width:{xs:0.91, sm:0.56}}}> */}
          <SelectSkill />
        {/* </Box> */}
        <Box sx={{display:'flex', width:{xs:1, sm:0.40}, mb:1}}>
          <Typography sx={[{width:130}, sx_Label]}>Target DEF:</Typography>
          <Box sx={{position:'relative', width:{xs:1, sm:120}}}>
            <TextField name='targetDEF' value={targetDEF.def} onChange={e=>setTargetDEF(prev=>({...prev, def:e.target.value}))} type='number' variant="filled"  hiddenLabel size='small' sx={sx_TextField} inputProps={{min:0, step:50}}/>
            <Box sx={{position:'absolute', top:40, right:10}}>
              <HPnDEFCal/>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{mb:1}} >
        <Typography sx={{fontSize:18, fontWeight:500, mb:1}}>Skill Multiplier</Typography>
        <Box sx={flexContainer} >
          {/* <Box sx={{mb:1, width:{xs:0.9, sm:0.32}}}> */}
          <Box sx={{display:'flex', width:{xs:1, sm:0.33}, mb:1}}>
            <Typography sx={[{width:50}, sx_Label]}>ATK:</Typography>
            <TextField name='atk' value={skillMltplr.atk} onChange={onSetSkillMltplr} type='number' placeholder='0' variant="filled"  hiddenLabel size='small' sx={sx_TextField} inputProps={{min:0}}/>
          </Box>
          <Box sx={{display:'flex', width:{xs:1, sm:0.33}, mb:1}}>
            <Typography sx={[{width:50}, sx_Label]}>&nbsp; HP:</Typography>
            <TextField name='hp' value={skillMltplr.hp} onChange={onSetSkillMltplr} type='number' placeholder='0' variant="filled" hiddenLabel size='small' sx={sx_TextField} inputProps={{step:0.1, min:0}}/>
          </Box>
          <Box sx={{display:'flex', width:{xs:1, sm:0.33}, mb:1}}>
            <Typography sx={[{width:50}, sx_Label]}>DEF:</Typography>
            <TextField name='def' value={skillMltplr.def} onChange={onSetSkillMltplr} type='number' placeholder='0' variant="filled"  hiddenLabel size='small' sx={sx_TextField} inputProps={{min:0}}/>
          </Box>
        </Box>
        
        <Box sx={flexContainer}>
          <Box sx={{display:'flex', width:{xs:1, sm:0.6}, mb:1}}>
            <Typography sx={[{width:50}, sx_Label]}>SPD:</Typography>
            <TextField name='spd1' value={skillMltplr.spd1} onChange={onSetSkillMltplr} type='number' placeholder='+' variant="filled"  hiddenLabel size='small' sx={{width:{xs:0.5, sm:120}, mr:1}} inputProps={{min:0}}/>
            <TextField name='spd2' value={skillMltplr.spd2} onChange={onSetSkillMltplr} type='number' placeholder='/' variant="filled"  hiddenLabel size='small' sx={{width:{xs:0.5, sm:120}, pr:1}} inputProps={{min:0}}/>
          </Box>
          <Box sx={{display:'flex', width:{xs:1, sm:0.4}, mb:1}}>
            <Typography sx={[{width:88}, sx_Label]}>Skillups:</Typography>
            <TextField name='skUpDmg' value={skillMltplr.skUpDmg} onChange={onSetSkillMltplr} type='number' placeholder='0' variant="filled"  hiddenLabel size='small' sx={sx_TextField} inputProps={{step:5, min:0}}/>
          </Box>
        </Box>

        <Box sx={flexContainer}>
          <Box sx={{display:'flex', width:{xs:1, sm:0.42}, mb:1}}>
            <Typography sx={[{width:50}, sx_Label]}>Hits:</Typography>
            <TextField name='hits' value={skillMltplr.hits} onChange={onSetSkillMltplr} type='number' placeholder='0' variant="filled"  hiddenLabel size='small' sx={sx_TextField} inputProps={{min:0}}/>
          </Box>
          <Box sx={{display:'flex', width:{xs:1, sm:0.58}, mb:1}}>
            <Typography sx={[{width:165}, sx_Label]}>Special Dmg:</Typography>
            <TextField name='speDmg' value={skillMltplr.speDmg} onChange={onSetSkillMltplr} type='number' placeholder='0' variant="filled"  hiddenLabel size='small' sx={sx_TextField} inputProps={{min:0}}/>
            <Tooltip  arrow placement='top-end' title={<Typography fontWeight={300} fontSize={14}>Special damage value, e.g., Mo Long S3 deal 70% max HP, if target max HP is 30000, enter 21000<br/>Demon S1 -- 10% current HP,<br/>
              Demon S2, if your other 3 allies current HP are 25K so 10%x3 = 7500, enter 7500</Typography>}>
              {/* <InfoOutlinedIcon fontSize='small' sx={{verticalAlign:'bottom', mb:'10px', mx:1}}/> */}
              <InfoOutlinedIcon sx={{alignSelf:'center', pr:1, fontSize:28}}/>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      <hr/>

      <Box sx={{mb:1}}>
        <Typography sx={{display:'inline'}}>Artifact & Passive damage increase / decrease </Typography>
        <Tooltip arrow placement='top' title={<Typography fontWeight={300} fontSize={14}>Damage increase -- Dmg dealt on X element, Bomb, Co-op, passive skills<br/>
          e.g., Momo max stack (+200%) with artifact damage dealt on wind +13% = 213%, enter 213
          <br/><br/>Damage decrease -- target equiped with decrease damage from element artifact, passive skills decrease damage<br/>
          e.g., target equiped with -16% elemental artifact with Camila passive -20%, sum up to -36%, enter 36<br/></Typography>}>
          <InfoOutlinedIcon fontSize='small' sx={{verticalAlign:'bottom', mb:'3px'}}/>
        </Tooltip>

        <Box sx={flexContainer}>  
          <Box sx={{display:'flex', width:{xs:1, sm:0.42}, mb:1}}>
            <Typography sx={[{width:80}, sx_Label]}>Dmg +</Typography>
            <TextField name='plus' value={lastMltplr.plus} onChange={onLastMltplrChange} placeholder='0' type='number' variant="filled"  hiddenLabel size='small' sx={sx_TextField}/>
            <Typography component='span' sx={[{width:20}, sx_Label]}>%</Typography>
          </Box>
          <Box sx={{display:'flex', width:{xs:1, sm:0.55}, mb:1}}>
            <Typography sx={{width:{xs:150, sm:180}, alignSelf:'center', textAlign:'center'}}>Target Dmg decrease -</Typography>
            <TextField name='minus' value={lastMltplr.minus} onChange={onLastMltplrChange} placeholder='0' type='number' variant="filled"  hiddenLabel size='small' sx={sx_TextField}/>
            <Typography component='span' sx={[{width:20}, sx_Label]}>%</Typography>
          </Box>
        </Box>
      </Box>
      <hr/>

      <Box sx={{}}>
        <Typography sx={{fontSize:21, fontWeight:500, color:'red'}}>Arena</Typography>
        <Box sx={flexContainer}>
          <Box sx={{mb:1, width:{xs:1, sm:0.52}}}>
          <Typography component='span' sx={sx_ResultText}>Normal:</Typography>
          <Typography component='span' sx={sx_ResultNumber}>{Number(damage.arena).toLocaleString()} </Typography>
          <Typography component='span' sx={[sx_ResultNumber, {fontWeight:200}]}>{damage.arenaFluc}</Typography>
          </Box>
          <Box sx={{mb:1, width:{xs:1, sm:0.48}}}>
            <Typography component='span' sx={sx_ResultText}>Crit:</Typography>
            <Typography component='span' sx={sx_ResultNumber}>{Number(damage.arenaCrit).toLocaleString()} </Typography>
            <Typography component='span' sx={[sx_ResultNumber, {fontWeight:200}]}>{damage.arenaCritFluc}</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{}}>
        <Typography sx={{fontSize:21, fontWeight:500, color:'red'}}>Guild</Typography>
        <Box sx={flexContainer}>
          <Box sx={{mb:1, width:{xs:1, sm:0.52}}}>
          <Typography component='span' sx={sx_ResultText}>Normal:</Typography>
          <Typography component='span' sx={sx_ResultNumber}>{Number(damage.guild).toLocaleString()} </Typography>
          <Typography component='span' sx={[sx_ResultNumber, {fontWeight:200}]}>{damage.guildFluc}</Typography>
          </Box>
          <Box sx={{mb:1, width:{xs:1, sm:0.48}}}>
            <Typography component='span' sx={sx_ResultText}>Crit:</Typography>
            <Typography component='span' sx={sx_ResultNumber}>{Number(damage.guildCrit).toLocaleString()} </Typography>
            <Typography component='span' sx={[sx_ResultNumber, {fontWeight:200}]}>{damage.guildCritFluc}</Typography>
          </Box>
        </Box>
      </Box>
      <hr/>
    </Box>
  )
}