import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../Context/authContext';
import { useTheme } from '../../Context/themeContext';
import { useLoading } from '../../Context/loadingContext';
import ThemeToggle from '../ThemeToggle/themeToggle';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDark } = useTheme();
  const { loading, setLoading } = useLoading();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, { email, password });
      login(response.data.token, response.data.user);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Login relative flex justify-center items-center w-full min-h-screen mesh-gradient overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] -z-10 animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] -z-10 animate-blob animation-delay-2000"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="login_card w-full max-w-md p-8 glass rounded-[2.5rem] shadow-2xl border-white/20 mx-4"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h2 className="text-4xl font-bold text-gradient">Login</h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium tracking-tight">to your account</p>
          </div>
          <ThemeToggle variant="navbar" />
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 px-1">Email</label>
            <input 
              name="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-5 py-4 glass border-gray-300 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 dark:text-white transition-all duration-300" 
              type="email" 
              placeholder="name@example.com" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 px-1">Password</label>
            <input 
              name="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-5 py-4 glass border-gray-300 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 dark:text-white transition-all duration-300" 
              type="password" 
              placeholder="••••••••" 
            />
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-bold text-lg bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1 active:translate-y-0 transition-all duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <button 
              type="button"
              onClick={() => navigate('/')} 
              className="w-full py-4 rounded-2xl font-bold text-lg glass border-gray-300 dark:border-white/20 hover:bg-white/10 hover:-translate-y-1 active:translate-y-0 transition-all duration-200 text-gray-600 dark:text-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <button 
            onClick={() => navigate('/signup')} 
            className="text-[#6366f1] hover:text-[#818cf8] font-bold"
          >
           Signup
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
