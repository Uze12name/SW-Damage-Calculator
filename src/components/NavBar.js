import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Buildings from './Buildings'
import Flags from './Flags'
import HowTo from './HowTo'

export default function NavBar () {

  const [anchorElNav, setAnchorElNav] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position="static" sx={{backgroundColor:'grey.900'}}>
      {/* <Container maxWidth='lg' sx={{}}> */}
      <Container maxWidth='100%' sx={{}}>
        <Toolbar disableGutters sx={{'@media (min-width: 600px)':{minHeight:50}, }}>
          <Box component='img' src='/logo.png' sx={{ width:40, height:40, mr:2}} />
          <Typography sx={{fontSize:20, fontWeight:600, display:'inline-block', }}>SW Damage Calculator</Typography>

          {/* <Box sx={{flexGrow: 1, display:'flex', justifyContent:'center', gap:1, }}> */}
          <Box sx={{display:{xs:'none', md:'flex'}, flexGrow:1, gap:1}}>
            <Box sx={{marginLeft:'auto'}}>
              <Buildings/>
            </Box>
            <Box>
              <Flags/>
            </Box>
            <Box sx={{marginLeft:'auto'}}>
              <HowTo />
            </Box>
          </Box>

          <Box sx={{display:{xs:'flex', md:'none', justifyContent:'right'}, flexGrow:1, gap:1}}>
            <IconButton onClick={handleOpenNavMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{vertical:'bottom', horizontal:'right'}}
              keepMounted
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{display: {xs:'block', md:'none'}}}
            >
               <MenuItem>
                <Buildings/>
               </MenuItem>
               <MenuItem>
                <Flags/>
               </MenuItem>
               <MenuItem>
                <HowTo/>
               </MenuItem>
            </Menu>
          </Box>

            {/* <Button sx={{color:'white', ':hover':{color:'primary.main'}}}>
              <HelpCenterOutlinedIcon fontSize='large' />
            </Button> */}

        </Toolbar>
      </Container>
    </AppBar>
  )
}
  