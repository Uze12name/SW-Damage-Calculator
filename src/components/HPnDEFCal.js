import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CalculateSharpIcon from '@mui/icons-material/CalculateSharp';
import { useEffect, useState } from 'react';

const firstColumn = {
  // display: 'block',
  height: 50,
  pt: 1,
  textAlign: 'right',
}
const headerSX = {
  display:'block',
  height: 30,
  width: 120,
  fontSize:18,
  fontWeight:400,
}
const inputSX = {
  display: 'block',
  height: 50,
  width: 120,
  mx: 1,
}
const resultTextSX = {
  display: 'block',
  height: 45,
  mt: 1,
  textAlign: 'right',
  fontSize: 18,
  fontWeight: 400,
  textDecoration: 'underline', 
}
const resultNumberSX = {
  display: 'block',
  height: 45,
  width: 120,
  mt: 1,
  fontSize: 20,
  fontWeight: 400,
  color:'success.main',
}

export default function HPnDEFCal() {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl)
  // const id = open ? 'simple-popover' : undefined
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
        <Box sx={{bgcolor:'grey.800', p:1, width:345}}>
          <Typography variant='h6' sx={{}}>Combat HP / DEF calculation</Typography>
          <Typography sx={{fontSize:12, mb:3, ml:2}}>(Assuming max bulidings and flags)</Typography>

          <Grid container>
            <Grid sx={{}} xs={2}>
              <Typography sx={headerSX}></Typography>
              <Typography sx={firstColumn}>Base : </Typography>
              <Typography sx={firstColumn}>Rune : </Typography>
              <Typography sx={firstColumn}>Lead : </Typography>
              <Typography sx={resultTextSX}>Arena</Typography>
              <Typography sx={resultTextSX}>Guild</Typography>
            </Grid>
            <Grid sx={{textAlign:'center', borderRight:1}} xs={5}>
                <Typography component='span' sx={headerSX}>HP</Typography>
                <TextField name='baseHP' value={input.baseHP} onChange={handleInput} type='number' placeholder='0' variant="filled" hiddenLabel size='small' sx={inputSX}/>
                <TextField name='runeHP' value={input.runeHP} onChange={handleInput} type='number' placeholder='0' variant="filled" hiddenLabel size='small' sx={inputSX}/>
                <TextField name='leadHP' value={input.leadHP} onChange={handleInput} type='number' placeholder='0' variant="filled" hiddenLabel size='small' sx={inputSX}/>
                <Typography component='span' sx={resultNumberSX}>{result.arenaHP.toLocaleString()}</Typography>
                <Typography component='span' sx={resultNumberSX}>{result.guildHP.toLocaleString()}</Typography>
            </Grid>

            <Grid sx={{textAlign:'center'}} xs={5}>
                <Typography component='span' sx={headerSX}>DEF</Typography>
                <TextField name='baseDEF' value={input.baseDEF} onChange={handleInput} type='number' placeholder='0' variant="filled" hiddenLabel size='small' sx={inputSX}/>
                <TextField name='runeDEF' value={input.runeDEF} onChange={handleInput} type='number' placeholder='0' variant="filled" hiddenLabel size='small' sx={inputSX}/>
                <TextField name='leadDEF' value={input.leadDEF} onChange={handleInput} type='number' placeholder='0' variant="filled" hiddenLabel size='small' sx={inputSX}/>
                <Typography component='span' sx={resultNumberSX}>{result.arenaDEF.toLocaleString()}</Typography>
                <Typography component='span' sx={resultNumberSX}>{result.guildDEF.toLocaleString()}</Typography>
            </Grid>
          </Grid>  

        </Box>
      </Popover>
    </Box>
  )
}
