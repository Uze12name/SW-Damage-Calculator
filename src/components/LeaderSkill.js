// import * as React from 'react';
import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { memo } from 'react';

function LeaderSkill({type, onSetLeader}) {
  // console.log('[LeaderSkill] In-Func')

  return (
    <Box sx={{p:'4px', borderBottom:'1px solid white', textAlign:'center'}}>
      <Typography sx={{verticalAlign:'bottom', fontSize:16, fontWeight:500 , mb:'7px', mx:1, display:'inline-block'}}>Leader Skill: </Typography>
      <FormControl color='primary' sx={{mr:1, minWidth:100}} size='small' variant="filled" hiddenLabel>
        {/* <InputLabel >LS</InputLabel> */}
        <Select value={type} label="Leader" name='type' onChange={onSetLeader} defaultValue={'None'} sx={{textAlign:'left'}} >
          <MenuItem value={'None'}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={'hp'}>HP</MenuItem>
          <MenuItem value={'atk'}>ATK</MenuItem>
          <MenuItem value={'def'}>DEF</MenuItem>
          <MenuItem value={'spd'}>SPD</MenuItem>
        </Select>
      </FormControl>
      {/* <TextField color="primary" name='value' onChange={onSetLeader} sx={{width:100}} size='small' focused/> */}
      <TextField color="primary" name='value' onChange={onSetLeader} type='number' placeholder='0' sx={{width:100}} size='small' variant="filled" hiddenLabel/>
      <Typography component='span' sx={{verticalAlign:'bottom', fontSize:'20px', mb:'5px', ml:'5px', display:'inline-block'}}> %</Typography>
    </Box>
  );
}
export default memo(LeaderSkill)
// export default LeaderSkill