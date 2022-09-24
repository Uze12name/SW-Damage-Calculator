import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Unstable_Grid2';
import NavBar from './components/NavBar'
import Stat from './components/Stat'
import Artifact from './components/Artifact'
import Effect from './components/Effect'
import Damage from './components/Damage'
import Profile from './components/Profile'
import SkillInfo from './components/SkillInfo'
import MonsList from './components/MonsList'

const gridContainer = {
  display:'grid',
  gridTemplateColumns:'auto auto',
  gap:'8px',
  position: 'relative',
  mt:2,
  overflow: 'auto',
}
const mainContentSX = {
  bgcolor:'rgb(45 45 45)',
  p:'15px',
}
const monstList = {
  // ml:1,
  height:'50px',
  '@media (max-width: 1199px)':{gridArea:'1 / 1 / 1 / 3'},
  // '@media only screen and (max-width: 1199px)':{gridArea:'1 / 1 / 1 / 3'},
}
const stats = {
  gridArea:'1 / 1 / span 2 / 1',
  '@media (max-width: 1199px)':{gridArea:'2 / 1 / 2 / 3'},
  // '@media only screen and (max-width: 1199px)':{gridArea:'2 / 1 / 2 / 3'},
  // mr:3,
}
const result = {
  '@media (max-width: 1199px)':{gridArea:'3 / 1 / 3 / 3'},
  // '@media only screen and (max-width: 1199px)':{gridArea:'3 / 1 / 3 / 3'},
  // ml:1,
}
const bgImage = {
  opacity: 0.06,
  position: 'absolute',
  left: 0,
  top: 0,
  width: 'auto',
  height: 'auto',
  zIndex: -1,
}
const bgImage2 = {
  opacity: 0.04,
  position: 'absolute',
  left: 0,
  top: 905,
  width: 'auto',
  height: 'auto',
  zIndex: -1,
  // '@media only screen and (min-width: 1199px)': {display: 'none'}
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: ({ ownerState }) => ({
  //         '&:hover': {
  //           opacity:0.8,
  //           color:'red',
  //         },
  //       }),
  //     },
  //   },
  // },
});

function App() {

  return (
    <Box>
      <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <NavBar />
          <Box sx={{position:'relative', overflow:'hidden'}}>
            <Box component='img' src='/images/bg1.jpg' sx={bgImage}/>
            <Box component='img' src='/images/bg2.jpg' sx={bgImage2}/>

            <Box sx={gridContainer}>
              <Box sx={monstList}>
                <Box display='flex' justifyContent={{lg:'left', xs:'center'}} >
                  <Box width={{lg:'630px', xs:'480px'}} sx={mainContentSX}>
                    <MonsList/>
                  </Box>
                </Box>
              </Box>
              <Box sx={stats}>
                <Box display='flex' justifyContent={{lg:'right', xs:'center'}}>
                  <Box width='480px' sx={mainContentSX}>
                    <Stat/>
                    <Artifact/>
                  </Box>
                </Box>
              </Box>
              <Box sx={result}>
                <Box display='flex' justifyContent={{lg:'left', xs:'center'}}>
                  <Box width='630px' sx={mainContentSX}>
                    <Profile/>
                    <Effect/>
                    <Damage/>
                  </Box>
                </Box>
              </Box>
            </Box>
            <SkillInfo/>

            <Box component='footer' sx={{py:2, bgcolor:'grey.900'}}>
              <Container maxWidth='sm'>
                <Typography fontSize='12px' >
                  Monsters data and pictures come from swarfarm.com
                </Typography>
              </Container>
            </Box>
          </Box>  
      </ThemeProvider>
    </Box>
  );
}
export default App;
