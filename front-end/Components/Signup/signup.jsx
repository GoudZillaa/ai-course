import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useAuth } from '../../Context/authContext';
import { useTheme } from '../../Context/themeContext'; // Added based on the provided snippet
import { useLoading } from '../../Context/loadingContext'; // Added based on the provided snippet
import ThemeToggle from "../ThemeToggle/themeToggle";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(''); // Changed from form state
  const [email, setEmail] = useState(''); // Changed from form state
  const [password, setPassword] = useState(''); // Changed from form state
  const [error, setError] = useState(''); // Added based on the provided snippet
  const { login } = useAuth();
  const { isDark } = useTheme(); // Added based on the provided snippet
  const { setLoading } = useLoading(); // Added based on the provided snippet

  // handleChange is no longer needed with individual state variables

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Added based on the provided snippet
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, { username, email, password }); // Updated endpoint and data structure
      login(res.data.token, res.data.user);
      navigate('/welcome'); // Updated navigation path
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed'); // Updated error handling
      console.error(err);
    } finally {
      setLoading(false); // Added based on the provided snippet
    }
  };

  return (
    <div className="Signup relative flex justify-center items-center w-full min-h-screen mesh-gradient overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] -z-10 animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] -z-10 animate-blob animation-delay-2000"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="Signup_card w-full max-w-md p-8 glass rounded-[2.5rem] shadow-2xl border-white/20 mx-4"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h2 className="text-4xl font-bold text-gradient">SignUp</h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium tracking-tight">to create account</p>
          </div>
          <ThemeToggle variant="navbar" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 px-1">Username</label>
            <input 
              name='username' 
              required 
              onChange={handleChange} 
              className="w-full px-5 py-3 glass border-gray-300 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 dark:text-white transition-all duration-300" 
              type="text" 
              placeholder="alex_dev" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 px-1">Email</label>
            <input 
              name='email' 
              required 
              onChange={handleChange} 
              className="w-full px-5 py-3 glass border-gray-300 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 dark:text-white transition-all duration-300" 
              type="email" 
              placeholder="alex@example.com" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 px-1">Password</label>
            <input 
              name='password' 
              required 
              onChange={handleChange} 
              className="w-full px-5 py-3 glass border-gray-300 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 dark:text-white transition-all duration-300" 
              type="password" 
              placeholder="••••••••" 
            />
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <button 
              type="submit"
              className="w-full py-4 rounded-2xl font-bold text-lg bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1 active:translate-y-0 transition-all duration-200"
            >
              Create Account
            </button>
            <button 
              type='button' 
              onClick={() => navigate('/')} 
              className="w-full py-4 rounded-2xl font-bold text-lg glass border-gray-300 dark:border-white/20 hover:bg-white/10 hover:-translate-y-1 active:translate-y-0 transition-all duration-200 text-gray-600 dark:text-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <button 
            onClick={() => navigate('/login')} 
            className="text-[#6366f1] hover:text-[#818cf8] font-bold"
          >
           Login
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
