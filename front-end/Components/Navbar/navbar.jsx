import React,{useState,useEffect} from 'react'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import {useAuth} from '../../Context/authContext'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import ThemeToggle from '../ThemeToggle/themeToggle'

const navbar = () => {
  const [open,setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const {logout} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      try{
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/courses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res)
        setCourses(res.data.courses.reverse()); 
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    setOpen(false);
    navigate(`/saved/${courseId}`);
  };

  return (
    <div className={`Navbar fixed inset-0 z-30 flex flex-col max-md:bg-transparent dark:bg-gray-800 justify-between ${open?'w-70 h-screen max-md:h-dvh bg-white dark:bg-gray-800':"w-10 max-md:h-fit"}  transition duration-200 ease-linear  h-full pt-2 max-md:border-none border-r border-gray-300 dark:border-gray-600`}>
      
      <div className={`hamburger flex justify-between px-2 items-center`}>
        {open ? (
          <MenuOpenRoundedIcon 
            className='mt-[-4px] text-gray-700 dark:text-gray-300 cursor-pointer' 
            onClick={() => setOpen(false)}
          />
        ) : (
          <MenuRoundedIcon 
            className='text-gray-700 dark:text-gray-300 cursor-pointer' 
            onClick={() => setOpen(true)}
          />
        )}
        
        {open && <ThemeToggle variant="navbar" />}
      </div>

      {
        open && 
        <div className="nav_options bg-transparent h-70 flex flex-col overflow-y-auto scrollbar-hide py-6 px-2">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">History</h2>
          {courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course._id}
                className="cursor-pointer font-medium mb-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={() => handleCourseClick(course._id)}
              >
                {course.topic}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No saved courses yet</p>
          )}
        </div>
      }
      
      {
        open &&
        <div className="bottom_div w-full h-20 px-2">
          <button 
            onClick={()=>logout()} 
            className="px-4 font-bold text-[1.2rem] py-2 w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 rounded-lg border-2 hover:-translate-y-1 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 active:translate-y-1"
          >
            Logout
          </button>
        </div>
      }
    </div>
  )
}

export default navbar