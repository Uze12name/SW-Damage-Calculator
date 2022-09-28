import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateArena, updateGuild } from "../redux/statSlice";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import LeaderSkill from './LeaderSkill'

const NoSpinField = styled(TextField)({
  "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
    display: "none",
  },
  "input[type=number]": {
    MozAppearance: "textfield",
  },
});

// const FirstColumn = styled(TableCell)(
//   {
//     borderRight: '1px solid lightgray',
//     fontWeight: '500',
//     textAlign: 'center',
//     fontSize: '16px',
//   },
//   ({ theme }) => `color: ${theme.palette.grey[200]}`,
// )
const firstColumn = {
  borderRight: '1px solid lightgray',
  fontWeight: '500',
  textAlign: 'center',
  fontSize: '16px',
  color: 'grey.200',
}
const tableHead = {
  fontSize: '120%',
  borderBottom: '1px solid lightgray',
  textAlign: 'center',
  // color: 'grey.100',
}
const tableCell = {
  fontSize: '16px',
  color: 'grey.200'
  // border: '1px solid lightgray'
}

export default function Stat () { 
  // console.log('[Stats] ***Rendered***')
  const dispatch = useDispatch();
  const arena = useSelector(state => state.stat.arena)
  const guild = useSelector(state => state.stat.guild)
  const buildings = useSelector(state => state.building.buildings)
  const flags = useSelector(state => state.building.flags)
  const base = useSelector(state => state.monsInfo.base)
  const element = useSelector(state => state.monsInfo.info.element).toLowerCase()
  // console.log('ELEMENT>> ', element);

  const [leader, setLeader] = useState({type:'None', value:''})
  const [rtaScaling, setRTAScaling] = useState('0')
  const leadMltplr = useRef({   // Leader skill to multiplier for onRuneChange calculation
    hp: 0, atk: 0, def: 0, spd: 0,
  })
  const buildingMltplr = useRef({   // Building to multiplier for onRuneChange calculation
    hp: 0, atk: 0, def: 0, spd: 0,
  })
  const flagMltplr = useRef({   // Flag to multiplier for onRuneChange calculation
    hp: 0, atk: 0, def: 0,
  })

  const rune = useRef({
    hp: 0, atk: 0, def: 0, cd: 0, acd: 0, // Artifact CD
    spd: 0, pspd: 0, // Passive SPD gain
  })
  
  const onSetLeader = useCallback(e => {
     setLeader(prev=>({...prev, [e.target.name]:e.target.value}))
  }, [])

  const statCal = useCallback((name) => {
    const value = Number(rune.current[name])
    let arenaCal = 0, guildCal = 0
    // console.log('[statCal]-value: ', value);

    if (name === 'acd') {
      name = 'cd' // Change name to 'cd' for dispatch to state.arena.cd, state.guild.cd
      arenaCal = value + Number(rune.current.cd) + buildings.cd
      guildCal = value + Number(rune.current.cd) + buildings.cd + flags.cd
    } else if (name === 'cd') {
      arenaCal = value + Number(rune.current.acd) + buildings.cd
      guildCal = value + Number(rune.current.acd) + buildings.cd + flags.cd
    } else if (name === 'pspd') {
      name = 'spd'
      arenaCal = Number((Math.ceil(base[name] * (1 + buildingMltplr.current[name] + leadMltplr.current[name]) + rune.current.spd) + value).toFixed(2))
      guildCal = arenaCal
    } else if (name === 'spd') {
      arenaCal = Number((Math.ceil(base[name] * (1 + buildingMltplr.current[name] + leadMltplr.current[name]) + value) + rune.current.pspd).toFixed(2))
      guildCal = arenaCal
    } else {
      let rtaMltplr = 1
      if (rtaScaling) {
        if (name === 'atk') rtaMltplr = 1 + Number(rtaScaling)
        else if (name === 'hp') rtaMltplr = 1 - Number(rtaScaling)
      }
      arenaCal = Math.ceil((base[name] * (1 + buildingMltplr.current[name] + leadMltplr.current[name]) + value) * rtaMltplr)
      guildCal = Math.ceil(base[name] * (1 + buildingMltplr.current[name] + flagMltplr.current[name] + leadMltplr.current[name]) + value)
    }

    dispatch(updateArena({ name, arenaCal }));
    dispatch(updateGuild({ name, guildCal }));
  }, [base, buildings.cd, flags.cd, rtaScaling, dispatch])

  const onRuneChange = (e) => {
    const name = e.target.name  //-- max and maxLength doesn't work on TexField with type='number' --//
    const value = e.target.value > 99999 ? 99999 : Number(e.target.value)
    rune.current[name] = value
    // console.log('rune.current: ', rune.current);
    statCal(name)
  }

  const onRTAScalingChange = (e) => {
    setRTAScaling(e.target.value)
  }
  
  const clearInput = () => {
    rune.current = {
      hp: 0,
      atk: 0,
      def: 0,
      spd: 0,
      pspd: 0,  // Passive SPD gain
      cd: 0,
      acd: 0 // Artifact CD
    }
    statCal('hp')
    statCal('atk')
    statCal('def')
    statCal('spd')
    statCal('cd')
  }


  useEffect( () => {
    leadMltplr.current = {  // Set all Leader skill multiplier to 0 and set the selected one to 0.xx for onRuneChange calculation
      hp: 0,
      atk: 0,
      def: 0,
      spd: 0,
      [leader.type]: Number((leader.value/100).toFixed(2))
    }
    statCal('hp')
    statCal('atk')
    statCal('def')
    statCal('spd')
  }, [leader, base, statCal])

  useEffect( ()=> {   // Re calculate building multiplier
    const eleBuilding = (element !== 'none' ? Number(buildings[element]/100) : 0.21)
    buildingMltplr.current = {
      hp: Number((buildings.hp/100).toFixed(2)),
      atk: Number((Number(buildings.atk/100) + eleBuilding).toFixed(2)),
      def: Number((buildings.def/100).toFixed(2)),
      spd: Number((buildings.spd/100).toFixed(2)),
    }
    statCal('hp')
    statCal('atk')
    statCal('def')
    statCal('spd')
    statCal('cd')
  }, [buildings, element, statCal])
  
  useEffect( ()=> {   // Re calculate flag multiplier
    flagMltplr.current = {
      hp: Number((flags.hp/100).toFixed(2)),
      atk: Number((flags.atk/100).toFixed(2)),
      def: Number((flags.def/100).toFixed(2)),
    }
    statCal('hp')
    statCal('atk')
    statCal('def')
    statCal('cd')
  }, [flags, statCal])

  useEffect ( ()=> {
    statCal('hp')
    statCal('atk')
  }, [rtaScaling, statCal])

  return (
    <Box sx={{mb:2}}>
      {/* <TableContainer sx={{mx:'auto', width:'430px', border:'1px solid lightgray'}}> */}
      <TableContainer sx={{width:430, border:'1px solid lightgray'}}>
        <LeaderSkill onSetLeader={onSetLeader} type={leader.type} />
        <form>
          {/* <Table sx={{bgcolor:'grey.900'}} aria-label="simple table" size='small'> */}
          <Table sx={{}} aria-label="simple table" size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={[tableHead, {width:80}]}>Stat</TableCell>
                <TableCell sx={[tableHead, {width:80}]}>Base</TableCell>
                <TableCell sx={[tableHead]}>Rune</TableCell>
                <TableCell sx={[tableHead, {width:80}]}>Arena</TableCell>
                <TableCell sx={[tableHead, {width:80}]}>Guild</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}> */}
              <TableRow>
                <TableCell sx={firstColumn}>HP</TableCell>
                <TableCell sx={tableCell}>{base.hp}</TableCell>
                <TableCell sx={{margin:0, padding: 0}}>
                  <TextField name='hp' onChange={onRuneChange} type='number' placeholder='0' variant="filled"  hiddenLabel size='small' sx={{mb:'2px'}} inputProps={{step:1000, min:0}}/>
                </TableCell>
                <TableCell sx={tableCell}>{arena.hp}</TableCell>
                <TableCell sx={tableCell}>{guild.hp}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={firstColumn}>ATK</TableCell>
                <TableCell sx={tableCell}>{base.atk}</TableCell>
                <TableCell sx={{margin:0, padding: 0}}>
                  <TextField name='atk' onChange={onRuneChange} type='number' placeholder='0' variant="filled" hiddenLabel size='small' sx={{mb:'2px'}} inputProps={{step:100, min:0}}/>
                </TableCell>
                <TableCell sx={tableCell}>{arena.atk}</TableCell>
                <TableCell sx={tableCell}>{guild.atk}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={firstColumn}>DEF</TableCell>
                <TableCell sx={tableCell}>{base.def}</TableCell>
                <TableCell sx={{margin:0, padding: 0}}>
                  <TextField name='def' onChange={onRuneChange} type='number' placeholder='0' variant="filled" hiddenLabel size='small' sx={{mb:'2px'}} inputProps={{step:50, min:0}}/>
                </TableCell>
                <TableCell sx={tableCell}>{arena.def}</TableCell>
                <TableCell sx={tableCell}>{guild.def}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={firstColumn}>SPD</TableCell>
                <TableCell sx={tableCell}>{base.spd}</TableCell>
                <TableCell sx={{margin:0, padding: 0}}>
                  <TextField name='spd' onChange={onRuneChange} type='number' placeholder='0' variant="filled" hiddenLabel size='small' sx={{mb:'2px'}} inputProps={{step:1, max:999}}/>
                </TableCell>
                <TableCell sx={tableCell}>{arena.spd}</TableCell>
                <TableCell sx={{margin:0, padding: 0}}>
                  <NoSpinField name='pspd' onChange={onRuneChange} type='number' placeholder='Passive' variant="filled" hiddenLabel size='small' sx={{mb:'2px'}}/>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={firstColumn}>C.Dmg</TableCell>
                <TableCell sx={{margin:0, padding: 0}}>
                  <TextField name='cd' onChange={onRuneChange} type='number' placeholder='0' variant="filled" hiddenLabel size='small' sx={{mb:'2px'}} inputProps={{step:1, min:0}}/>
                </TableCell>
                <TableCell sx={{margin:0, padding: 0}}>
                  <TextField name='acd' onChange={onRuneChange} placeholder='Artifact' type='number' variant="filled" hiddenLabel size='small' sx={{mb:'2px'}} inputProps={{step:1, min:0}}/>
                </TableCell>
                <TableCell sx={tableCell}>{arena.cd}</TableCell>
                <TableCell sx={tableCell}>{guild.cd}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          <Box>
            <FormControl color='primary' sx={{mr:1, mt:'4px', width:180, float:'right'}} size='small' variant="filled" hiddenLabel>
              <Select value={rtaScaling} defaultValue={0} onChange={onRTAScalingChange} >
                <MenuItem value={0}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'0.1'}>ATK+10%, HP-10%</MenuItem>
                <MenuItem value={'0.2'}>ATK+20%, HP-20%</MenuItem>
                <MenuItem value={'0.3'}>ATK+30%, HP-30%</MenuItem>
                <MenuItem value={'0.4'}>ATK+40%, HP-40%</MenuItem>
                <MenuItem value={'0.5'}>ATK+50%, HP-50%</MenuItem>
              </Select>
            </FormControl>
            <Typography sx={{verticalAlign:'bottom', fontSize:16, fontWeight:500, color:'grey.200', mt:'11px', mx:1, display:'inline-block', float:'right'}}>RTA Scaling: </Typography>
            {/* <Button onClick={clearInput} sx={{margin:'4px'}} variant='outlined'>Clear</Button> */}
            <Button type='reset' defaultValue='Reset' onClick={clearInput} sx={{margin:'4px'}} variant='outlined'>Clear</Button>
          </Box>
        </form>
      </TableContainer>
    </Box>
  )
}
//eslint-disable-next-line