// components/ThemeToggle.jsx
import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { motion } from 'framer-motion';
import { useTheme } from '../../Context/themeContext';

const ThemeToggle = ({ variant = 'default' }) => {
  const { isDark, toggleDarkMode } = useTheme();

  // Different variants for different use cases
  const variants = {
    default: "flex items-center gap-2",
    welcome: "glass p-4 rounded-2xl flex items-center gap-4 shadow-lg",
    navbar: "flex items-center"
  };

  return (
    <div className={variants[variant]}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleDarkMode}
        className={`relative w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-500 ${
          isDark ? 'bg-indigo-600' : 'bg-amber-100'
        }`}
      >
        <motion.div
          className={`w-6 h-6 rounded-full flex items-center justify-center shadow-md bg-white`}
          animate={{ x: isDark ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {isDark ? (
            <DarkModeIcon className="text-indigo-600 !text-sm" />
          ) : (
            <LightModeIcon className="text-amber-500 !text-sm" />
          )}
        </motion.div>
      </motion.button>
      
      {variant === 'welcome' && (
        <span className="text-sm font-semibold tracking-wide uppercase opacity-70">
          {isDark ? 'Dark Universe' : 'Light Realm'}
        </span>
      )}
    </div>
  );
};

export default ThemeToggle;