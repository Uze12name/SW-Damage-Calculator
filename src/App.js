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
  display: 'grid',
  // gridTemplateColumns: 'auto auto',
  gridTemplateColumns: {xs: 'auto', md: 'auto', lg: 'auto auto'},
  gap: {lg:'15px', xs:'10px'},
  position: 'relative',
  mt:2,
}
const mainContentSX = {
  bgcolor: 'rgb(45 45 45)',
  // bgcolor:'rgb(80 80 80)',
  px: {xs:'1px', sm:'15px'},
}
const monstList = {
  '@media (max-width: 1199px)':{gridArea:'1 / 1 / 1 / 1'},
  // '@media only screen and (max-width: 1199px)':{gridArea:'1 / 1 / 1 / 3'},
  // border: '1px dashed green',
}
const stats = {
  gridArea: '1 / 1 / span 2 / 1',
  '@media (max-width: 1199px)':{gridArea:'2 / 1 / 2 / 2'},
  // '@media only screen and (max-width: 1199px)':{gridArea:'2 / 1 / 2 / 3'},
  overflow: 'auto',
  // zoom: '85%',
  // border: '1px dashed green',
}
const result = {
  '@media (max-width: 1199px)':{gridArea:'3 / 1 / 3 / 1'},
  // '@media only screen and (max-width: 1199px)':{gridArea:'3 / 1 / 3 / 3'},
  // border: '1px dashed green',
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
})

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
              <Box display='flex' justifyContent={{lg:'left', sm:'center', xs:'left'}} gap='1' sx={monstList}>
                <Box width={{lg:630, sm:460, xs:1}} maxWidth={{lg:630, sm:460, xs:432}} sx={mainContentSX}>
                  <MonsList/>
                  <Profile/>
                </Box>
              </Box>

              <Box display='flex' justifyContent={{lg:'right', sm:'center', xs:'left'}} sx={stats} >
                <Box sx={mainContentSX}>
                    <Stat/>
                    <Artifact/>
                </Box>
              </Box>

              <Box display='flex' justifyContent={{lg:'left', sm:'center', xs:'left'}}  sx={result}>
                <Box width={{sm:630}} sx={mainContentSX}>
                  <Effect />
                  <Damage/>
                </Box>
              </Box>
            </Box>

            <SkillInfo/>

            <Box component='footer' sx={{py:2, bgcolor:'grey.900'}}>
              <Container maxWidth='sm'>
                <Typography fontSize='12px' >
                  Monster resouces come from swarfarm.com
                </Typography>
              </Container>
            </Box>
          </Box>  
      </ThemeProvider>
    </Box>
  );
}
export default App;
