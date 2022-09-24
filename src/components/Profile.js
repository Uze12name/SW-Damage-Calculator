import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

export default function Profile () {
  const monsInfo = useSelector(state => state.monsInfo.info)
  const pending = useSelector(state => state.monsInfo.pending)
  // const error = useSelector(state => state.monsInfo.error)

  return (
    <Box sx={{mb:2}}>
      <Grid container>
        <Grid>
          <Box sx={{width:102, height:102, border:'1px dotted white', mr:1, textAlign:'center'}}>
            {/* <img src='https://swarfarm.com/static/herders/images/monsters/unit_icon_0080_1_3.png'/> */}
            {!pending && <Box component="img" sx={{}} src={monsInfo.image}/>}
            {pending && <CircularProgress sx={{mt:'30px'}} />}
          </Box>
        </Grid>

        <Grid>
          {/* <Typography sx={{verticalAlign:'bottom', fontSize:'16px', mb:'10px', mx:'8px', display:'inline-block'}}>Barbara</Typography> */}
          <Typography sx={{fontSize:'22px', fontWeight:500, mb:1}}>{monsInfo.name}</Typography>
          
          <Typography component='span' sx={{fontSize:'17px', fontWeight:500}}>Element: </Typography>
          <Typography component='span' sx={{fontSize:'16px'}}>{monsInfo.element}</Typography>
          <br/>
          <Typography component='span' sx={{fontSize:'17px', fontWeight:500}}>Type: </Typography>
          <Typography component='span' sx={{fontSize:'16px'}}>{monsInfo.type}</Typography>
        </Grid>
        
        <Grid xs={5} xsOffset='auto' sx={{pt:1}}>
          <Typography component='span' sx={{fontSize:'17px', fontWeight:500}}>Leader skill </Typography>
          <br/>
          {!monsInfo.leader_skill && <Typography sx={{fontSize:'16px'}}>None</Typography>}
          {monsInfo.leader_skill && <Box component="img" sx={{float:'left', width:55, height:55, mr:1}} src={monsInfo.leaderImageLoc}/>}
          {/* {monsInfo.leader_skill && <Box component="img" sx={{float:'left', width:55, height:55, mr:1}} src={'./images/leader_skills/leader_skill_Attack_Power_Arena.png'}/>} */}
          {monsInfo.leader_skill && <Typography sx={{fontSize:'16px'}}>{monsInfo.leader_skill.element ? monsInfo.leader_skill.element : monsInfo.leader_skill.area}</Typography>}
          {monsInfo.leader_skill && <Typography sx={{fontSize:'16px', display:'inline'}}>{monsInfo.leader_skill.attribute} </Typography>}
          {monsInfo.leader_skill && <Typography sx={{fontSize:'16px', display:'inline'}}>{monsInfo.leader_skill.amount}%</Typography>}
          <br/>
        </Grid>

      </Grid>
    </Box>
  )
}