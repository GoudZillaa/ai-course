import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useAuth } from '../../Context/authContext';
import { useLoading } from '../../Context/loadingContext';

const Home = () => {
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setLoading } = useLoading();

  const handleTopicSubmit = (selectedTopic = topic) => {
    const finalTopic = selectedTopic.trim();
    if (!finalTopic) return;

    setLoading(true);
    navigate(`/generating?topic=${encodeURIComponent(finalTopic)}`);
  };

  const suggestions = [
    "Digital Marketing & Business",
    "Technology & Programming",
    "Health, Wellness & Self-Development",
    "Finance & Personal Development"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="Home relative min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-20 overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[100px] -z-10 animate-blob"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[100px] -z-10 animate-blob animation-delay-2000"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl space-y-12"
      >
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Hi, <span className="text-gradient capitalize">{user?.username || 'Learner'}</span>.
          </h2>
          <h3 className="text-xl md:text-2xl font-medium opacity-70">
            What skill do you want to master today?
          </h3>
        </motion.div>

        <motion.div variants={itemVariants} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative glass rounded-3xl flex items-center p-2 shadow-2xl">
            <span className="hidden md:block pl-6 text-xl font-bold opacity-30 select-none">"I want to learn</span>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="React, Piano, Chess..."
              className="flex-grow bg-transparent border-none outline-none px-4 py-4 md:py-6 text-xl md:text-2xl font-medium focus:ring-0 placeholder:opacity-30"
              onKeyPress={(e) => e.key === 'Enter' && handleTopicSubmit()}
            />
            <span className="hidden md:block pr-4 text-xl font-bold opacity-30 select-none">from scratch"</span>
            <button
              onClick={() => handleTopicSubmit()}
              className="p-4 md:p-6 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-2xl shadow-lg transition-all active:scale-95 group"
            >
              <ArrowForwardRoundedIcon className="group-hover:translate-x-1 transition-transform" sx={{ fontSize: 32 }} />
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 tracking-widest text-center uppercase">Popular Searches</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleTopicSubmit(s)}
                className="text-left p-6 glass rounded-2xl border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                <p className="text-xs font-bold text-[#6366f1] mb-2 uppercase tracking-wide">Learn</p>
                <p className="font-semibold text-gray-700 dark:text-gray-200 leading-tight line-clamp-2">{s}</p>
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
