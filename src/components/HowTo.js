import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';

const style = {
  position: 'absolute',
  top: '10%',
  left: '50%',
  transform: 'translate(-50%, -10%)',
  // width: 300,
  bgcolor: 'grey.900',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function HowTo () {
  const [open, setOpen] = useState(false)

  return (
    <Box>
      <Button onClick={()=>setOpen(true)} sx={{color:'white', ':hover':{color:'primary.main'}}}>
          <HelpCenterOutlinedIcon fontSize='large' />
      </Button>
      <Modal open={open} onClose={()=>setOpen(false)}>
        <Box sx={style}>
          <Typography variant="h6" sx={{mb:2, color:'grey.200'}}>
            Explaination...
          </Typography>
          <Typography sx={{color:'grey.200'}}>
            - Top left field is monster stat, Arena column is combat stat in arena contents and Guild column is combat stat in guild contents<br/>
            - Crit damage input 1 is base+rune (as shown in game), input 2 is sum of artifact crit damage subs (S1-4 CD, Own-turn 1-target CD and CD+ as more/less enemy HP)<br/>
            - SPD 'Passive' input is value of SPD gain from passive, e.g., Masha, Narsha, Miles, Chilling...(see the value below)
            - Bottom left field, at ATK, DEF, SPD buffs part it shows combat stat when monster get the buffs<br/>
            - You can use HP/DEF below the target DEF input to estimate your target DEF and HP<br/>
            - You don't need to enter every rune stat if that skill multiplier, add'l dmg, or buff isn't related to that stat<br/>
            - If you expect Leo in the field, you can put minus value in SPD input to get 115 combat SPD (Leo base SPD + totem)
          </Typography>

          <Typography sx={{mt:3, color:'grey.200'}}>
            For some uniuqe multiplier you have to enter multiplier value by yourself, for example,<br/>
            - Laika, Chow, Jager S2 multiplier, [living allies(multiplier)] {`=>`} Arena: 4(8), 3(9.357), 2(10.75), 1(12.125) | Guild: 3(8), 2(9.834), 1(11.667)<br/>
            - Beast Riders S1 {`[ 2.0*{ATK}*({Relative SPD} + 1) ]`}, if Masha has 321 combat spd (123+150 with 24% spd lead) target has 255 combat spd (100+140 without spd lead), 321/255 = 1.2588 
            so multiplier is [ 2 * ATK * (1.2588 + 1) ] = ATK * 4.5176
          </Typography>

          <Typography sx={{mt:3, color:'grey.200'}}>
            Passive SPD gain (% of base SPD)<br/>
            - Chilling gain [ 20.2 ] (20%) per stack<br/>
            - Masha gain [ 18.45 ] (15%) per stack {`=>`} 18.45, 36.9, 55.35, 73.8 and [ 92.25 ] (max 5 stacks)<br/>
            - Narsha gain [ 21.6 ] (20%) per stack {`=>`} 21.6, 43.2, 64.8, 86.4 and [ 108 ] (max 5 stacks)<br/>
            - Miles gain [ 5.25 ] (5%) per stack {`=>`} 21 at 4 stacks, 36.75 at 7 stacks<br/>
            - Mei Hou Wang gain [ 11.6 ] (10%) per stack, [58] at 5 stacks, [ 116 ] at 10 stacks (max)<br/>
          </Typography>

        </Box>
      </Modal>
    </Box>
  )
}


// - Beast Riders S1 {`[ 2.0*{ATK}*({Relative SPD} + 1) ]`}, If Masha has 321 combat spd (+150 with 24% spd lead) target has 255 combat spd (100+140 without spd lead), so Masha is 25.88% faster than target
// so multiplier is [ 2 * (.2588 + 1) ] which is 2.5176