import Typography from '@mui/material/Typography';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { useEffect, memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { select_Skill } from '../redux/skillSlice'


function SelectSkill () {
  // console.log('[Selectskill]-Infunc');
  const skills = useSelector(state => state.skillInfo.skills)
  const selectedSkill = useSelector(state => state.skillInfo.selectedSkill)
  const dispatch = useDispatch()
  
  const handleSelectedSkill = (e) => {
    dispatch(select_Skill(e.target.value))
  }

  useEffect ( ()=>{

  }, [skills])

  return (
    <Box>
      <Typography sx={{verticalAlign:'bottom', fontSize:'16px', mb:'9px', mx:'8px', display:'inline-block'}}>Skill:</Typography>
        <FormControl color='primary' sx={{width:0.83}} size='small' variant="filled" hiddenLabel>
          {/* <InputLabel >Select Skill</InputLabel> */}
          <Select value={selectedSkill} onChange={handleSelectedSkill} defaultValue={99}>
            <MenuItem  value={99}><Typography sx={{color:'grey.400'}}>Select Skill</Typography></MenuItem>
            {/* <MenuItem value={skills[0].name} >Skill 1: {skills[0].name}</MenuItem> */}
            {skills?.map((skill, index) => (
              skill?.multiplier_formula && <MenuItem value={index} key={index}>Skill {index+1} -- {skill.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
    </Box>
  )
}
export default memo(SelectSkill)