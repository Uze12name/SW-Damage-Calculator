import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CalculateSharpIcon from '@mui/icons-material/CalculateSharp';
import { useEffect, useState } from 'react';

const statSX = {
  width: 120,
  mr:1,
}
const leadSX = {
  width: 90,

}
const textSX = {
  verticalAlign:'bottom',
  mb:'8px',
  mx:'8px',
  display:'inline-block',
}
const headerSX = {
  display:'inline-block',
  fontSize:18,
  fontWeight:400,
  mb:1,
}
const resultSX = {
  fontSize:18,
  fontWeight:400,
}
const resultNumberSX = {
  fontSize:20,
  fontWeight:400,
  color:'success.main',
}


export default function HPnDEFCal() {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const [input, setInput] = useState({
    baseHP: '',
    baseDEF: '',
    runeHP: '',
    runeDEF: '',
    leadHP: '',
    leadDEF: '',
  })
  const [result, setResult] = useState({
    arenaHP: 0,
    arenaDEF: 0,
    guildHP: 0,
    guildDEF: 0,
  })

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleInput = (e) => {
    setInput(prev=>({...prev, [e.target.name]:e.target.value}))
  }

  useEffect( ()=>{
    const baseHP = Number(input.baseHP)
    const runeHP = Number(input.runeHP)
    const leadHP = Number((input.leadHP/100).toFixed(2))

    const arenaHP = Math.ceil(baseHP * (1.2 + leadHP) + runeHP)
    const guildHP = Math.ceil(baseHP * (1.4 + leadHP) + runeHP)
    setResult(prev=>({...prev, arenaHP, guildHP}))
  }, [input.baseHP, input.runeHP, input.leadHP])
  useEffect( ()=>{
    const baseDEF = Number(input.baseDEF)
    const runeDEF = Number(input.runeDEF)
    const leadDEF = Number((input.leadDEF/100).toFixed(2))

    const arenaDEF = Math.ceil(baseDEF * (1.2 + leadDEF) + runeDEF)
    const guildDEF = Math.ceil(baseDEF * (1.4 + leadDEF) + runeDEF)
    setResult(prev=>({...prev, arenaDEF, guildDEF}))
  }, [input.baseDEF, input.runeDEF, input.leadDEF])

  return (
    <Box sx={{}}>
      <Button onClick={handleClick}>
        <CalculateSharpIcon />HP/DEF
      </Button>
      <Popover
        // id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}

        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{bgcolor:'grey.800', p:4}}>
          <Typography variant='h6' sx={{}}>Combat HP / DEF calculation</Typography>
          <Typography sx={{fontSize:12, mb:3, ml:2}}>(Assuming max bulidings and flags)</Typography>
          <Box>
          <Typography sx={[headerSX, {ml:12}]}>Base</Typography>
          <Typography sx={[headerSX, {ml:11}]}>Rune</Typography>
          <Typography sx={[headerSX, {ml:6}]}>Leader skill</Typography>
          </Box>
          <Box sx={{mb:1}}>
              <Typography component='span' sx={[textSX, {ml:2}]}>HP : </Typography>
              <TextField name='baseHP' value={input.baseHP} onChange={handleInput} type='number' placeholder='0' variant="filled" hiddenLabel size='small' sx={statSX}/>
              <TextField name='runeHP' value={input.runeHP} onChange={handleInput} type='number' placeholder='0' variant="filled" hiddenLabel size='small' sx={statSX}/>
              <TextField name='leadHP' value={input.leadHP} onChange={handleInput} type='number' placeholder='0' variant="filled" hiddenLabel size='small' sx={leadSX}/>
              <Typography component='span' sx={textSX}>%</Typography>
          </Box>
          <Box sx={{mb:2}}>
              <Typography component='span' sx={textSX}>DEF : </Typography>
              <TextField name='baseDEF' value={input.baseDEF} onChange={handleInput} type='number' placeholder='0' variant="filled" hiddenLabel size='small' sx={statSX}/>
              <TextField name='runeDEF' value={input.runeDEF} onChange={handleInput} type='number' placeholder='0' variant="filled" hiddenLabel size='small' sx={statSX}/>
              <TextField name='leadDEF' value={input.leadDEF} onChange={handleInput} type='number' placeholder='0' variant="filled" hiddenLabel size='small' sx={leadSX}/>
              <Typography component='span' sx={textSX}>%</Typography>
          </Box>
          <hr/>
          {/* <Box sx={{mt:1, mb:1, float:'right', width:200}}> */}
          {/* </Box> */}
          <Grid container spacing={1} sx={{mt:1}}>
            <Grid xs={6} sx={{borderRight:1}}>
              <Typography textAlign='center' sx={{fontSize:20, fontWeight:500, mb:1}}>Arena</Typography>
              <Box >
                <Typography component='span' sx={resultSX}>Combat HP : </Typography>
                <Typography component='span' sx={resultNumberSX}>{result.arenaHP.toLocaleString()}</Typography>
              </Box>
              <Box>
                <Typography component='span' sx={resultSX}>Combat DEF : </Typography>
                <Typography component='span' sx={resultNumberSX}>{result.arenaDEF.toLocaleString()}</Typography>
              </Box>
            </Grid>
            <Grid xs={6}>
              <Typography textAlign='center' sx={{fontSize:20, fontWeight:500, mb:1}}>Guild</Typography>
              <Box textAlign='center'>
                <Typography component='span' sx={resultSX}>Combat HP : </Typography>
                <Typography component='span' sx={resultNumberSX}>{result.guildHP.toLocaleString()}</Typography>
              </Box>
              <Box textAlign='center'>
                <Typography component='span' sx={resultSX}>Combat DEF : </Typography>
                <Typography component='span' sx={resultNumberSX}>{result.guildDEF.toLocaleString()}</Typography>
              </Box>
            </Grid>
          </Grid>
          
        </Box>
      </Popover>
    </Box>
  );
}
