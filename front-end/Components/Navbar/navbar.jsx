import React,{useState} from 'react'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import {useAuth} from '../../Context/authContext'
import { useNavigate } from 'react-router-dom';

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
  const {user,logout} = useAuth();
  const navigate = useNavigate();

  return (
    <div className={`Navbar flex flex-col justify-between ${open?'w-70 bg-[#b3b3b3]':"w-10"} transition duration-200 ease-linear h-screen pt-2 border-r-1 border-gray-300`}>

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

      {
        open && 
          <div className="nav_options bg-red-00 h-70 flex flex-col  py-6">
            <button className='text-start px-4 py-2 font-bold hover:-translate-y-2 duration-100 ease-linear active:translate-y-2 hover:pl-[1.1rem]'>History</button>
            <button className='text-start px-4 py-2 font-bold hover:-translate-y-2 duration-100 ease-linear active:translate-y-2 hover:pl-[1.1rem]'>History</button>
            <button className='text-start px-4 py-2 font-bold hover:-translate-y-2 duration-100 ease-linear active:translate-y-2 hover:pl-[1.1rem]'>History</button>
          </div>
      }
      {
        open &&
        <div className="bottom_div  w-full h-20">
          <button onClick={()=>logout()} className="px-4 font-bold text-[1.2rem] py-2 bg-white border-gray-300 text-gray-500 rounded-lg border-3 hover:-translate-y-1 transition-transform duration-300 linear active:translate-y-1 ">Logout</button>
        </div>
      }
    </div>
  )
}

export default navbar
