import { useSelector, useDispatch } from "react-redux";
import { updateArtiArena, updateArtiGuild } from "../redux/artifactSlice";
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// import { styled } from '@mui/material';

// const NoSpinField = styled(TextField)({
//   "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
//     display: "none",
//   },
//   "input[type=number]": {
//     MozAppearance: "textfield",
//   },
// });

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
  // borderRight: '1px solid lightgray',
  fontWeight: '500',
  textAlign: 'center',
  fontSize: '16px',
  color: 'grey.200',
}
const tableHead = {
  fontSize: '120%',
  borderBottom: '1px solid lightgray',
  textAlign: 'center',
}
const tableCell = {
  fontSize: '16px',
  color: 'grey.200'
  // border: '1px solid lightgray'
}

export default function Artifact () {
  // console.log('[Artifact] ***Redered***')
  const dispatch = useDispatch();
  const arenaStat = useSelector(state => state.stat.arena)
  const guildStat = useSelector(state => state.stat.guild)
  const artiArena = useSelector(state => state.artifact.artiArena)
  const artiGuild = useSelector(state => state.artifact.artiGuild)
  const effect = useSelector(state => state.effect.effect)

  const [artifact, setArtifact] = useState ({
    atkUp: '', defUp: '', spdUp: '',
    hp: '', atk: '', def: '', spd: '',
  })

  const onArtifactChange = (e) => {
    const value = e.target.value > 999 ? 999 : e.target.value
    setArtifact(prev=>({...prev, [e.target.name]:value}))
  } //-- max and maxLength doesn't work on TexField with type='number' --//

  const clearInput = () => {
    setArtifact({atkUp:'', defUp:'', spdUp:'',  hp:'', atk:'', def:'', spd: ''})
  }

  useEffect(()=>{
    const atkBuff = 50 + Math.floor(artifact.atkUp*0.5)
    const arenaCal = Math.floor(atkBuff*arenaStat.atk/100 + arenaStat.atk)
    const guildCal =  Math.floor(atkBuff*guildStat.atk/100 + guildStat.atk)
    dispatch(updateArtiArena({name:'atkUp', arenaCal}))
    dispatch(updateArtiGuild({name:'atkUp', guildCal}))
  }, [artifact.atkUp, arenaStat.atk, guildStat.atk, dispatch])

  useEffect(()=>{
    const defBuff = 70 + Math.floor(artifact.defUp*0.7)
    const arenaCal = Math.floor(defBuff*arenaStat.def/100 + arenaStat.def)
    const guildCal = Math.floor(defBuff*guildStat.def/100 + guildStat.def)
    dispatch(updateArtiArena({name:'defUp', arenaCal}))
    dispatch(updateArtiGuild({name:'defUp', guildCal}))
  }, [artifact.defUp, arenaStat.def, guildStat.def, dispatch])

  useEffect(()=>{
    const spdBuff = 30 + Math.floor(artifact.spdUp*0.3)
    const arenaCal = Number((spdBuff*arenaStat.spd/100 + arenaStat.spd).toFixed(2))
    dispatch(updateArtiArena({name:'spdUp', arenaCal}))
    dispatch(updateArtiGuild({name:'spdUp', guildCal:arenaCal}))
  }, [artifact.spdUp, arenaStat.spd, dispatch])

  useEffect(()=>{
    const arenaCal = Math.floor(arenaStat.hp * artifact.hp / 100)
    const guildCal = Math.floor(guildStat.hp * artifact.hp / 100)
    dispatch(updateArtiArena({name:'hp', arenaCal}))
    dispatch(updateArtiGuild({name:'hp', guildCal}))
  }, [artifact.hp, arenaStat.hp, guildStat.hp, dispatch])

  useEffect(()=>{
    const atkUp = effect.includes('atkUp')
    const arenaATK = atkUp ? artiArena.atkUp : arenaStat.atk
    const guildATK = atkUp ? artiGuild.atkUp : guildStat.atk
    const arenaCal = Math.floor(arenaATK * artifact.atk / 100)
    const guildCal = Math.floor(guildATK * artifact.atk / 100)
    dispatch(updateArtiArena({name:'atk', arenaCal}))
    dispatch(updateArtiGuild({name:'atk', guildCal}))
  }, [artifact.atk, arenaStat.atk, guildStat.atk, artiArena.atkUp, artiGuild.atkUp, effect, dispatch])

  useEffect(()=>{
    const defUp = effect.includes('defUp')
    const arenaDEF = defUp ? artiArena.defUp : arenaStat.def
    const guildDEF = defUp ? artiGuild.defUp : guildStat.def
    const arenaCal = Math.floor(arenaDEF * artifact.def / 100)
    const guildCal = Math.floor(guildDEF * artifact.def / 100)
    dispatch(updateArtiArena({name:'def', arenaCal}))
    dispatch(updateArtiGuild({name:'def', guildCal}))
  }, [artifact.def, arenaStat.def, guildStat.def, artiArena.defUp, artiGuild.defUp, effect, dispatch])

  useEffect(()=>{
    const arenaSPD = effect.includes('spdUp') ? artiArena.spdUp : arenaStat.spd
    const arenaCal = Math.floor(arenaSPD * artifact.spd / 100)
    dispatch(updateArtiArena({name:'spd', arenaCal}))
    dispatch(updateArtiGuild({name:'spd', guildCal:arenaCal}))
  }, [artifact.spd, arenaStat.spd, artiArena.spdUp, effect, dispatch])
  
  
  return (
    <Box sx={{}}>
      <TableContainer sx={{mx:'auto', width:'430px', border:'1px solid lightgray'}}>
        {/* <Typography sx={{fontSize:20, fontWeight:500, ml:1}}>Artifact</Typography> */}
        {/* <Table sx={{bgcolor:'grey.900'}} aria-label="simple table" size='small'> */}
        <Table sx={{}} aria-label="simple table" size='small'>
          <TableHead>
            <TableRow>
              <TableCell sx={[tableHead, {width:165}]} >Artifact</TableCell>
              <TableCell sx={tableHead} >%</TableCell>
              <TableCell sx={[tableHead, {width:85}]} >Arena</TableCell>
              <TableCell sx={[tableHead, {width:85}]} >Guild</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}> */}
            <TableRow>
              <TableCell sx={firstColumn}>ATK UP effect +</TableCell>
              <TableCell sx={{margin:0, padding: 0}}>
                <TextField name='atkUp' value={artifact.atkUp} onChange={onArtifactChange} type='number' placeholder='0' variant='filled' hiddenLabel size='small' sx={{mb:'2px'}} inputProps={{min:0}}/>
              </TableCell>
              <TableCell sx={tableCell}>{artiArena.atkUp}</TableCell>
              <TableCell sx={tableCell}>{artiGuild.atkUp}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={firstColumn}>DEF UP effect +</TableCell >
              <TableCell sx={{margin:0, padding: 0}}>
                <TextField name='defUp' value={artifact.defUp} onChange={onArtifactChange} type='number' placeholder='0' variant='filled' hiddenLabel size='small' sx={{mb:'2px'}} inputProps={{min:0}}/>
              </TableCell>
              <TableCell sx={tableCell}>{artiArena.defUp}</TableCell>
              <TableCell sx={tableCell}>{artiGuild.defUp}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={firstColumn}>SPD UP effect +</TableCell >
              <TableCell sx={{margin:0, padding: 0}}>
                <TextField name='spdUp' value={artifact.spdUp} onChange={onArtifactChange} type='number' placeholder='0' variant='filled' hiddenLabel size='small' sx={{mb:'2px'}} inputProps={{min:0}}/>
              </TableCell>
              <TableCell sx={tableCell}>{artiArena.spdUp}</TableCell>
              <TableCell sx={tableCell}>{artiGuild.spdUp}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={firstColumn}>Add'l Dmg by HP</TableCell >
              <TableCell sx={{margin:0, padding: 0}}>
                <TextField name='hp' value={artifact.hp} onChange={onArtifactChange} type='number' placeholder='0' variant='filled' hiddenLabel size='small' sx={{mb:'2px'}} inputProps={{step:0.1, min:0}}/>
              </TableCell>
              <TableCell sx={tableCell}>{artiArena.hp}</TableCell>
              <TableCell sx={tableCell}>{artiGuild.hp}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={firstColumn}>Add'l Dmg by ATK</TableCell >
              <TableCell sx={{margin:0, padding: 0}}>
                {/* <TextField name='atk' value={artifact.atk.toString()} onChange={onArtifactChange} type='number' placeholder='0' variant='filled' hiddenLabel size='small' sx={{marginBottom:'2px'}}/> */}
                <TextField name='atk' value={artifact.atk} onChange={onArtifactChange} type='number' placeholder='0' variant='filled' hiddenLabel size='small' sx={{mb:'2px'}} inputProps={{min:0}}/>
              </TableCell>
              <TableCell sx={tableCell}>{artiArena.atk}</TableCell>
              <TableCell sx={tableCell}>{artiGuild.atk}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={firstColumn}>Add'l Dmg by DEF</TableCell >
              <TableCell sx={{margin:0, padding: 0}}>
                <TextField name='def' value={artifact.def} onChange={onArtifactChange} type='number' placeholder='0' variant='filled' hiddenLabel size='small' sx={{mb:'2px'}} inputProps={{min:0}}/>
              </TableCell>
              <TableCell sx={tableCell}>{artiArena.def}</TableCell>
              <TableCell sx={tableCell}>{artiGuild.def}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={firstColumn}>Add'l Dmg by SPD</TableCell >
              <TableCell sx={{margin:0, padding: 0}}>
                <TextField name='spd' value={artifact.spd} onChange={onArtifactChange} type='number' placeholder='0' variant='filled' hiddenLabel size='small' sx={{mb:'2px'}} inputProps={{step:50, min:0}}/>
              </TableCell>
              <TableCell sx={tableCell}>{artiArena.spd}</TableCell>
              <TableCell sx={tableCell}>{artiGuild.spd}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box sx={{}}>
          {/* <Button onClick={clearInput} sx={{display:'inline-block'}}> */}
          <Button onClick={clearInput} sx={{margin:'4px'}} variant='outlined'>Clear</Button>
          <Typography component='span' sx={{float:'right', fontSize:18, fontWeight:500, width:70, mt:1, display:'inline-block', textAlign:'left'}}>{artiGuild.sumAdd}</Typography>
          <Typography component='span' sx={{float:'right', fontSize:18, fontWeight:500, width:85, mt:1, display:'inline-block', textAlign:'left'}}>{artiArena.sumAdd}</Typography>
          <Typography component='span' sx={{float:'right', fontSize:18, fontWeight:500, width:155, mt:1, display:'inline-block', textAlign:'left'}}>Total Add'l Dmg :</Typography>
        </Box>
      </TableContainer>
    </Box>
  )
}
//border:'1px solid lightgray'