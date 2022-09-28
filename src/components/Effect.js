import { useSelector, useDispatch } from "react-redux";
import { updateEffect, updateDmgType } from "../redux/effectSlice";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
// import { styled } from '@mui/material/styles';

// const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
//   '& .MuiToggleButtonGroup-grouped': {
//     margin: theme.spacing(0.5),
//     border: 0,
//     '&.Mui-disabled': {
//       border: 0,
//     },
//     '&:not(:first-of-type)': {
//       borderRadius: theme.shape.borderRadius,
//     },
//     '&:first-of-type': {
//       borderRadius: theme.shape.borderRadius,
//     },
//   },
// }));

export default function Effect () {
  const dispatch = useDispatch()
  const effect = useSelector(state => state.effect.effect)
  const dmgType = useSelector(state => state.effect.dmgType)
  // const [effect, setEffect] = useState(() => ['defBreak', 'atkUp']);

  const handleEffect = (event, newEffect) => {
    // console.log(newEffect);
    dispatch(updateEffect(newEffect))
  }
  const handleDmgtype = (event, newDmgType) => {
    dispatch(updateDmgType(newDmgType))
  }

  return (
    <Box align='center'>
    {/* <Box sx={{mb:1, textAlign:{sm:'center', xs:'left'}}}> */}

      <ToggleButtonGroup
      // <StyledToggleButtonGroup
        color="primary"
        value={effect}
        onChange={handleEffect}
        size='small'
      >
        <ToggleButton value="atkUp" sx={{}}>
          ATK-UP
        </ToggleButton>
        <ToggleButton value="defUp">
          DEF-UP
        </ToggleButton>
        <ToggleButton value="spdUp">
          SPD-UP
        </ToggleButton>
        <ToggleButton value="brand">
          Brand
        </ToggleButton>
      {/* </StyledToggleButtonGroup> */}
      </ToggleButtonGroup>
      <br/>
      <ToggleButtonGroup
        color="primary"
        value={dmgType}
        exclusive
        onChange={handleDmgtype}
        size='small'
      >
        <ToggleButton value="defBreak">
          DEF-Break
        </ToggleButton>
        <ToggleButton value="ignoreDef">
          Ignore-DEF
        </ToggleButton>
        <ToggleButton value="bomb">
          Bomb
        </ToggleButton>
        <ToggleButton value="fixed">
          Fixed
        </ToggleButton>
      </ToggleButtonGroup>
      <hr/>
    </Box>
  )
}