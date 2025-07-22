import React,{useState} from 'react'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const GreySwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: grey[900],
    '&:hover': {
      backgroundColor: alpha(grey[900], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: grey[900],
  },
}));

const navbar = () => {
  const [open,setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  return (
    <div className={`Navbar ${open?'w-70 bg-[#b3b3b3]':"w-10"} transition duration-200 ease-linear h-full pt-2 border-r-1 border-gray-300`}>
      <div className={`hamburger flex justify-between px-2 items-center`} >
        { 
          open ? <MenuOpenRoundedIcon className='mt-[-4px]' onClick={()=>setOpen(open?false:true)}/> : <MenuRoundedIcon  onClick={()=>setOpen(open?false:true)}/>
        }
        {
          open&&
          <div className="toggle_btn w-fit mt-[-10px]">
            {
              isDark? <DarkModeIcon sx={{color:'grey'}}/> : <LightModeIcon sx={{color:'grey'}}/>
            }
            <GreySwitch defaultChecked={isDark} onClick={()=>setIsDark(isDark?false:true)} />
          </div>
        }
      </div>
    </div>
  )
}

export default navbar
