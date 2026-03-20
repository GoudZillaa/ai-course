import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useLoading } from "../../Context/loadingContext";

const Generating = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const topic = searchParams.get("topic");
  const { setLoading } = useLoading();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/core`, { topic });
        const courseData = response.data;
        const videoCache = {};

        const videoResults = await Promise.all(
          courseData.coreConcepts.map(async (concept) => {
            const query = concept.videoSearchQuery;
            if (videoCache[query]) return videoCache[query];
            try {
              const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/videos`, { query });
              videoCache[query] = res.data;
              return res.data;
            } catch (err) {
              console.warn(`YouTube API failed for "${query}", continuing without videos.`);
              return []; 
            }
          })
        );

        navigate("/output", {
          state: {
            topic,
            course: courseData,
            videoResults,
            mode: "core",
          },
        });
      } catch (err) {
        console.error("Error generating course:", err);
        setError("AI Architect failed to generate the outline. Please try a different topic.");
      } finally {
        setLoading(false);
      }
    };
    if (topic) fetchData();
  }, [topic, navigate, setLoading]);

  if (error) {
    return (
      <div className="Generate relative min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-20 overflow-hidden mesh-gradient">
        <div className="glass p-12 rounded-[2.5rem] text-center space-y-6 max-w-lg border-white/20 shadow-2xl">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
             <span className="text-4xl">⚠️</span>
          </div>
          <h2 className="text-3xl font-bold text-gradient">Generation Error</h2>
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            {error}
          </p>
          <button
            onClick={() => navigate('/home')}
            className="px-8 py-4 bg-[#6366f1] text-white rounded-2xl font-bold hover:bg-[#4f46e5] transition-all shadow-lg"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="Generate relative min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-20 overflow-hidden mesh-gradient">
      {/* Background blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] -z-10 animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] -z-10 animate-blob animation-delay-2000"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl text-center space-y-12 z-10"
      >
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Architecting your <span className="text-gradient">Personalized Course</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
            Analyzing concepts for <span className="font-bold text-gray-800 dark:text-gray-100">"{topic}"</span>
          </p>
        </div>

        <div className="glass p-8 rounded-[2.5rem] shadow-2xl border-white/20 relative overflow-hidden">
          <div className="space-y-6">
             <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-[#6366f1] tracking-widest uppercase">AI Engine Status</span>
                <span className="text-xs font-medium text-gray-400 animate-pulse">Processing...</span>
             </div>
             
             {/* Custom Shimmer Progress Bar */}
             <div className="relative h-4 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ x: "-100%" }}
                 animate={{ x: "0%" }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#6366f1] to-transparent opacity-50"
               />
               <motion.div 
                 initial={{ width: "0%" }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 15, ease: "easeOut" }}
                 className="absolute inset-0 h-full bg-[#6366f1] rounded-full"
               />
             </div>

             <div className="grid grid-cols-2 gap-4 text-left">
                <div className="space-y-1">
                  <p className="text-[0.6rem] font-bold text-gray-400 uppercase tracking-tighter">Phase 01</p>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">Core Extraction</p>
                </div>
                <div className="space-y-1 opacity-50">
                  <p className="text-[0.6rem] font-bold text-gray-400 uppercase tracking-tighter">Phase 02</p>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">Video Synthesis</p>
                </div>
             </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="max-w-md mx-auto"
        >
          <p className="text-gray-400 italic font-medium leading-relaxed">
            “The beautiful thing about learning is that no one can take it away from you.”
          </p>
          <p className="text-sm font-bold text-[#6366f1] mt-2 tracking-widest uppercase">— B.B. King</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Generating;
