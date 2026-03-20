import React, { useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../../src/assets/logo.png";
import logoDark from "../../src/assets/logoDark.png";
import pareto from "../../src/assets/pareto.png";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../../Components/ThemeToggle/themeToggle";
import { useTheme } from "../../Context/themeContext";

const Welcome = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedToken && storedUser) {
      navigate("/home");
    }
  }, [navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="Welcome relative flex flex-col w-full min-h-screen overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full h-20 px-8 flex justify-between items-center z-50 glass">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center"
        >
          <img src={isDark ? logoDark : logo} className="h-16 w-auto" alt="Logo" />
        </motion.div>
        
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <ThemeToggle variant="navbar" />
        </motion.div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-6 md:px-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8 text-center md:text-left"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                Build Skills <span className="text-gradient">Faster</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium opacity-80 leading-snug">
                Master the critical <span className="font-bold">20%</span> that <br className="hidden md:block" />
                delivers <span className="font-bold text-[#6366f1] dark:text-[#818cf8]">80%</span> of the results.
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="max-w-xl mx-auto md:mx-0 p-6 glass rounded-3xl shadow-xl border-white/20">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Our AI-powered curriculum builder identifies the most impactful concepts for any skill using the Pareto Principle. Don't just learn—learn smart.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <button
                  onClick={() => navigate("/login")}
                  className="px-8 py-4 rounded-2xl font-bold text-lg bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1 active:translate-y-0 transition-all duration-200"
                >
                  Login to Account
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-8 py-4 rounded-2xl font-bold text-lg glass border-gray-300 dark:border-white/20 hover:bg-white/10 hover:-translate-y-1 active:translate-y-0 transition-all duration-200"
                >
                  Get Started Free
                </button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            className="hidden md:flex justify-center items-center relative"
          >
            <div className="absolute inset-0 bg-[#6366f1]/20 blur-[100px] rounded-full animate-pulse"></div>
            <img 
              src={pareto} 
              className="relative z-10 w-full max-w-lg drop-shadow-[0_20px_50px_rgba(99,102,241,0.3)] dark:drop-shadow-[0_20px_50px_rgba(99,102,241,0.15)]" 
              alt="Pareto Principle Representation" 
            />
          </motion.div>
        </div>
      </main>

      {/* Decorative background elements blur blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] -z-10 animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] -z-10 animate-blob animation-delay-2000"></div>
    </div>
  );
};

export default Welcome;
