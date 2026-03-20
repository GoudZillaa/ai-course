import React, { useState, useEffect } from 'react';
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';
import ThemeToggle from '../ThemeToggle/themeToggle';

// Icons
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/courses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
    <>
      {/* Mobile Toggle Button */}
      {!open && (
        <button 
          onClick={() => setOpen(true)}
          className="fixed top-6 left-6 z-50 p-3 glass rounded-2xl md:hidden shadow-lg border-white/20"
        >
          <MenuRoundedIcon />
        </button>
      )}

      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main Sidebar */}
      <motion.nav
        initial={false}
        animate={{ 
          width: open ? 280 : 80,
          x: 0
        }}
        className={`fixed left-0 top-0 bottom-0 z-50 glass border-r border-white/10 flex flex-col transition-colors duration-300 ${!open ? 'max-md:-translate-x-full' : ''}`}
      >
        {/* Top Header */}
        <div className="p-4 flex flex-col gap-4">
          <div className={`flex items-center ${open ? 'justify-between' : 'justify-center'}`}>
            {open && <h2 className="text-xl font-bold text-gradient">Menu</h2>}
            <button 
              onClick={() => setOpen(!open)}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              {open ? <ChevronLeftRoundedIcon /> : <MenuRoundedIcon />}
            </button>
          </div>

          <button 
            onClick={() => { navigate('/home'); setOpen(false); }}
            className={`flex items-center gap-3 p-3 rounded-2xl bg-[#6366f1] text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-200 ${!open ? 'justify-center' : ''}`}
          >
            <AddRoundedIcon />
            {open && <span className="font-bold">New Course</span>}
          </button>
        </div>

        {/* History Section */}
        <div className="flex-1 overflow-y-auto px-3 py-4 scrollbar-hide">
          <div className={`flex items-center gap-2 mb-4 px-2 ${!open ? 'justify-center' : ''}`}>
             <HistoryRoundedIcon className="text-gray-400" sx={{ fontSize: 20 }} />
             {open && <span className="text-sm font-bold text-gray-400 tracking-wider">HISTORY</span>}
          </div>

          <div className="space-y-2">
            {courses.length > 0 ? (
              courses.map((course) => (
                <button
                  key={course._id}
                  onClick={() => handleCourseClick(course._id)}
                  className={`w-full text-left p-3 rounded-xl hover:bg-white/10 transition-all group flex items-center gap-3 ${!open ? 'justify-center' : ''}`}
                >
                  <div className="w-2 h-2 rounded-full bg-indigo-400 group-hover:scale-125 transition-transform" />
                  {open && (
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                      {course.topic}
                    </span>
                  )}
                </button>
              ))
            ) : (
              open && <p className="text-xs text-gray-500 px-3 italic">No history yet</p>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/5 space-y-2">
          {open && (
            <div className="px-2 pb-4">
              <ThemeToggle variant="navbar" />
            </div>
          )}
          
          <button 
            onClick={() => logout()}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-red-500/10 text-gray-500 hover:text-red-500 transition-all ${!open ? 'justify-center' : ''}`}
          >
            <LogoutRoundedIcon />
            {open && <span className="font-bold">Logout</span>}
          </button>
        </div>
      </motion.nav>
      
      {/* Spacer for desktop to avoid content overlap when navbar is open/closed */}
      <div className="hidden md:block w-20 flex-shrink-0" />
    </>
  );
};

export default Navbar;