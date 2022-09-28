import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateFlags } from "../redux/buildingSlice";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const style = {
  position: 'absolute',
  top: '10%',
  left: '50%',
  transform: 'translate(-50%, -10%)',
  width: 300,
  bgcolor: 'grey.900',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const dropdownStyle = {
  m:1, minWidth: 120, display: 'block'
}
const selectSX = {
  mb:1
}

export default function Flags() {
  const dispatch = useDispatch()
  const flags = useSelector(state => state.building.flags)
  const [open, setOpen] = useState(false);
  const cdLV = [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 12, 13, 15, 16, 17, 18, 20, 21, 22, 23, 25]

  const onFlagsChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(updateFlags({ name, value}))
  }

  if (!open) {
    localStorage.setItem('flags', JSON.stringify(flags))
    // console.log('[Flags] Close')
  }

  return (
    <Box>
      <Button onClick={()=>setOpen(true)} sx={{color:'white', ':hover':{color:'primary.main'}}} size='large'>Flags</Button>
      <Modal open={open} onClose={()=>setOpen(false)} sx={{overflow:'auto'}}>
        <Box sx={style}>
          <Typography variant="h6" sx={{mb:2}}>
            Flags Level
          </Typography>
          <FormControl sx={dropdownStyle} size="small">
            <InputLabel>HP</InputLabel>
            <Select value={flags.hp} label='HP' name='hp' onChange={onFlagsChange} sx={selectSX}>
              {[...Array(21)].map((v, i)=>(
                <MenuItem key={i} value={i}>Lv.{i} &gt; HP + {i}%</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={dropdownStyle} size="small">
            <InputLabel>ATK</InputLabel>
            <Select value={flags.atk} label='ATK' name='atk' onChange={onFlagsChange} sx={selectSX}>
              {[...Array(21)].map((v, i)=>(
                <MenuItem key={i} value={i}>Lv.{i} &gt; ATK + {i}%</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={dropdownStyle} size="small">
            <InputLabel>DEF</InputLabel>
            <Select value={flags.def} label='DEF' name='def' onChange={onFlagsChange} sx={selectSX}>
              {[...Array(21)].map((v, i)=>(
                <MenuItem key={i} value={i}>Lv.{i} &gt; DEF + {i}%</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={dropdownStyle} size="small">
            <InputLabel> CD</InputLabel>
            <Select value={flags.cd} label='C.dmg' name='cd' onChange={onFlagsChange} sx={selectSX} >
              {cdLV.map((lv, i)=>(
                <MenuItem key={lv} value={lv}>Lv.{i} &gt; CD + {lv}%</MenuItem>
              ))}
            </Select> 
          </FormControl>
        </Box>
      </Modal>
    </Box>
  );
}
