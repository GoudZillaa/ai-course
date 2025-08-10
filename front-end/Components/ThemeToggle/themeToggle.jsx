// components/ThemeToggle.jsx
import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { useTheme } from '../../Context/themeContext';

const GreySwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: grey[300],
    '&:hover': {
      backgroundColor: alpha(grey[300], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: grey[300],
  },
}));

const ThemeToggle = ({ variant = 'default' }) => {
  const { isDark, toggleDarkMode } = useTheme();

  // Different variants for different use cases
  const variants = {
    default: "flex items-center gap-2",
    welcome: "flex items-center justify-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700",
    navbar: "w-fit mt-[-10px] flex items-center"
  };

  return (
    <div className={variants[variant]}>
      {isDark ? (
        <DarkModeIcon sx={{ color: '#6b7280' }} />
      ) : (
        <LightModeIcon sx={{ color: '#6b7280' }} />
      )}
      <GreySwitch
        checked={isDark}
        onChange={toggleDarkMode}
      />
      {variant === 'welcome' && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </div>
  );
};

export default ThemeToggle;