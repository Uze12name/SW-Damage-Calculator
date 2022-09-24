import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateBuildings } from "../redux/buildingSlice";
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
}
const dropdownStyle = {
  m:1, minWidth: 120, display: 'block'
}
const selectSX = {
  mb:1
}

// localStorage.setItem('name', 'Bob')
// sessionStorage.setItem('name', 'John')
// document.cookie = 'name=cookie; expire=' + new Date(2022, 11, 1).toUTCString()

// console.log('[Building] Out-Func')
export default function Buildings() {
  const dispatch = useDispatch()
  const buildings = useSelector(state => state.building.buildings)
  const [open, setOpen] = useState(false);
  const cdLV = [1, 2, 3, 5, 6, 7, 8, 9, 10, 12, 13, 15, 16, 17, 18, 20, 21, 22, 23, 25]
  const spdLV = [1, 2, 2.5, 3, 4, 5, 5.5, 6, 7, 8, 8.5, 9, 10, 11, 11.5, 12, 13, 14, 14.5, 15]

  const onBuildingsChange = (e) => {
    // setBuildings(prev=>({...prev, [e.target.name]:e.target.value}))
    const name = e.target.name
    const value = e.target.value
    dispatch(updateBuildings({ name, value}))
  }

  if (!open) {
    localStorage.setItem('buildings', JSON.stringify(buildings))
    // console.log('[Building] Close')
  }

  return (
    <Box>
      <Button onClick={()=>setOpen(true)} sx={{color:'white', ':hover':{color:'primary.main'}}} size='large'>Buildings</Button>
      <Modal open={open} onClose={()=>setOpen(false)}>
        <Box sx={style}>
          <Typography variant="h6" sx={{mb:2}}>
            Buildings Level
          </Typography>
          <FormControl sx={dropdownStyle} size="small">
            <InputLabel>HP</InputLabel>
            <Select value={buildings.hp} label='HP' name='hp' onChange={onBuildingsChange} sx={selectSX}>
              {[...Array(20)].map((e, i)=>(
                <MenuItem key={i} value={i+1}>Lv.{i+1} &gt; HP + {i+1}%</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={dropdownStyle} size="small">
            <InputLabel>ATK</InputLabel>
            <Select value={buildings.atk} label='ATK' name='atk' onChange={onBuildingsChange} sx={selectSX}>
              {[...Array(20)].map((e, i)=>(
                <MenuItem key={i} value={i+1}>Lv.{i+1} &gt; ATK + {i+1}%</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={dropdownStyle} size="small">
            <InputLabel>DEF</InputLabel>
            <Select value={buildings.def} label='DEF' name='def' onChange={onBuildingsChange} sx={selectSX}>
              {[...Array(20)].map((e, i)=>(
                <MenuItem key={i} value={i+1}>Lv.{i+1} &gt; DEF + {i+1}%</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={dropdownStyle} size="small">
            <InputLabel> SPD</InputLabel>
            <Select value={buildings.spd} label='SPD' name='spd' onChange={onBuildingsChange} sx={selectSX} >
              {spdLV.map((lv, i)=>(
                <MenuItem key={lv} value={lv}>Lv.{i+1} &gt; CD + {lv}%</MenuItem>
              ))}
            </Select> 
          </FormControl>
          <FormControl sx={dropdownStyle} size="small">
            <InputLabel> CD</InputLabel>
            <Select value={buildings.cd} label='C.dmg' name='cd' onChange={onBuildingsChange} sx={selectSX} >
              {cdLV.map((lv, i)=>(
                <MenuItem key={lv} value={lv}>Lv.{i+1} &gt; CD + {lv}%</MenuItem>
              ))}
            </Select> 
          </FormControl>
          <FormControl sx={dropdownStyle} size="small">
            <InputLabel>Wind ATK</InputLabel>
            <Select value={buildings.wind} label='Wind ATK' name='wind' onChange={onBuildingsChange} sx={selectSX} >
              {[...Array(20)].map((e, i)=>(
                <MenuItem key={i} value={i+2}>Lv.{i+1} &gt; Wind ATK + {i+2}%</MenuItem>
              ))}
            </Select> 
          </FormControl>
          <FormControl sx={dropdownStyle} size="small">
            <InputLabel>Water ATK</InputLabel>
            <Select value={buildings.water} label='Water ATK' name='water' onChange={onBuildingsChange} sx={selectSX} >
              {[...Array(20)].map((e, i)=>(
                <MenuItem key={i} value={i+2}>Lv.{i+1} &gt; Water ATK + {i+2}%</MenuItem>
              ))}
            </Select> 
          </FormControl>
          <FormControl sx={dropdownStyle} size="small">
            <InputLabel>Fire ATK</InputLabel>
            <Select value={buildings.fire} label='Fire ATK' name='fire' onChange={onBuildingsChange} sx={selectSX} >
              {[...Array(20)].map((e, i)=>(
                <MenuItem key={i} value={i+2}>Lv.{i+1} &gt; Fire ATK + {i+2}%</MenuItem>
              ))}
            </Select> 
          </FormControl>
          <FormControl sx={dropdownStyle} size="small">
            <InputLabel>Light ATK</InputLabel>
            <Select value={buildings.light} label='Light ATK' name='light' onChange={onBuildingsChange} sx={selectSX} >
              {[...Array(20)].map((e, i)=>(
                <MenuItem key={i} value={i+2}>Lv.{i+1} &gt; Light ATK + {i+2}%</MenuItem>
              ))}
            </Select> 
          </FormControl>
          <FormControl sx={dropdownStyle} size="small">
            <InputLabel>Dark ATK</InputLabel>
            <Select value={buildings.dark} label='Dark ATK' name='dark' onChange={onBuildingsChange} sx={selectSX} >
              {[...Array(20)].map((e, i)=>(
                <MenuItem key={i} value={i+2}>Lv.{i+1} &gt; Dark ATK + {i+2}%</MenuItem>
              ))}
            </Select> 
          </FormControl>


        </Box>
      </Modal>
    </Box>
  )
}
