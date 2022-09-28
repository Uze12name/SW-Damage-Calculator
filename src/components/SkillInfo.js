import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// import List from '@mui/material/List'
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSkillInfo } from '../redux/skillSlice'
import { clearSkillInfo } from '../redux/skillSlice'
// import skill_icon_0019_9_8 from '../images/skill_icon_0019_9_8.png'

export default function SkillInfo () {
  const skills = useSelector(state => state.monsInfo.info.skills)
  const skillInfo = useSelector(state => state.skillInfo.skills)
  const dispatch = useDispatch()
  const [lg, setLg] = useState(3)

  useEffect( ()=>{
    // console.log('[SkillInfo]-useEffect');
    if (skills) {
      dispatch(clearSkillInfo())
      setLg(12/skills.length)
      skills.forEach((id, index) => dispatch(getSkillInfo({id, index})))
    }
    //eslint-disable-next-line
  },[skills])

  return (
    <>
    {/* { skillInfo && */}
      <Box sx={{mx:2, my:3}}>
        <Typography sx={{fontWeight:600, fontSize:22, textDecoration:'underline'}}>Skills</Typography>
        <br/>
        <Grid container spacing={2}>
          {skillInfo.map((info, index) => (
            // <Grid xs={skillAmount} key={index}>
            <Grid key={index} sm={12} md={6} lg={lg} sx={{mb:3}}>
              {/* <Box component="img" sx={{width:50, height:50, mr:1, float:'left', }} src={skill_icon_0019_9_8}/> */}
              <Box component="img" sx={{width:50, height:50, mr:1, float:'left', }} src={info.icon}/>
              <Typography sx={{fontWeight:600, display:'inline'}}>{info.name}</Typography>
              <Typography sx={{mt:1}}>{info.description}</Typography>
              <br/>
              {info.level_progress_description.length!==0 && <Typography sx={{fontWeight:600}}>Level-up Progress</Typography>}
              <Typography sx={{}}>{info.level_progress_description.map((v, i) => (
                <Typography component='span' sx={{display: 'block'}} key={i}>Lv.{i+2} {v}</Typography>
                ))}
              </Typography>
              {/* <ul>
              {info.level_progress_description.map((v, i) => (
                <li key={i}>{v}</li>
                ))}
              </ul> */}
              {/* <List>
                {info.level_progress_description.map((v, i) => (
                  <ListItem key={i}>{v}</ListItem>
                ))}
              </List> */}
              <br/>
              {info?.multiplier_formula && <Typography sx={{fontWeight:600}}>Multiplier Formula</Typography>}
              <Typography sx={{}}>{info.multiplier_formula} {info.multiplier.hits > 1 ? `x${info.multiplier.hits}` : null}</Typography>
            </Grid>
          ))}

        </Grid>
      </Box>
    {/* } */}
    </>
  )
}