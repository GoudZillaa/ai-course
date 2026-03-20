import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { useLoading } from "../../Context/loadingContext";

const Output = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { topic, course, videoResults, mode } = location.state || {};
  
  const [extendedCourse, setExtendedCourse] = useState(null);
  const [isExtended, setIsExtended] = useState(mode === "extended");
  const [extendedVideoResults, setExtendedVideoResults] = useState(null);
  const [loadingExtended, setLoadingExtended] = useState(false);
  const [error, setError] = useState(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!course) return;

    const fetchExtended = async () => {
      setLoadingExtended(true);
      setLoading(true);
      setError(null);
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/extended`, { topic });
        const extendedData = res.data;
        setExtendedCourse(extendedData);

        const videoCache = {};
        const extVideoResults = await Promise.all(
          extendedData.extendedConcepts.map(async (concept) => {
            const query = concept.videoSearchQuery;
            if (videoCache[query]) return videoCache[query];
            try {
              const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/videos`, { query });
              videoCache[query] = res.data;
              return res.data;
            } catch (err) {
              return [];
            }
          })
        );

        setExtendedVideoResults(extVideoResults);
        uploadCourse(extendedData, extVideoResults);
      } catch (err) {
        console.error("Error fetching extended course:", err);
        setError("Failed to fetch mastery concepts. You can still learn the core curriculum below.");
      } finally {
        setLoadingExtended(false);
        setLoading(false);
      }
    };

    const uploadCourse = async (extendedData, extendedVideos) => {
      const token = localStorage.getItem('token');
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/save-course`,
          {
            topic,
            coreConcepts: course.coreConcepts,
            extendedConcepts: extendedData.extendedConcepts,
            videoResults,
            extendedVideoResults: extendedVideos
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Error saving course", err);
      }
    };

    fetchExtended();
  }, [topic, course, videoResults]);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <p className="text-xl font-bold text-red-500">No course data found.</p>
        <button onClick={() => navigate('/home')} className="glass px-6 py-2 rounded-xl">Go Back</button>
      </div>
    );
  }

  const currentConcepts = isExtended ? extendedCourse?.extendedConcepts : course.coreConcepts;
  const currentVideos = isExtended ? extendedVideoResults : videoResults;

  return (
    <div className="Output relative min-h-screen w-full flex flex-col items-center pb-32">
       {/* Background blobs */}
       <div className="fixed top-0 right-0 w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[100px] -z-10 animate-blob"></div>
       <div className="fixed bottom-0 left-0 w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[100px] -z-10 animate-blob animation-delay-2000"></div>

      <div className="container max-w-4xl px-6 py-12 space-y-12">
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 text-center md:text-left"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-2">
              <p className="text-sm font-bold text-[#6366f1] tracking-widest uppercase">Course Curriculum</p>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight capitalize">
                {topic}
              </h1>
            </div>
            <div className="glass px-4 py-2 rounded-2xl flex items-center gap-2 self-start md:self-auto">
               <div className={`w-2 h-2 rounded-full ${isExtended ? 'bg-purple-500' : 'bg-[#6366f1]'} animate-pulse`} />
               <span className="text-xs font-bold uppercase tracking-tight opacity-70">
                 {isExtended ? 'Extended Mastery' : 'Core Foundations'}
               </span>
            </div>
          </div>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-2xl">
            {isExtended 
              ? "Deep dive into advanced concepts to reach top-tier expert level proficiency."
              : "Master the essential 20% that will give you 80% of the practical results."}
          </p>
        </motion.header>

        {/* Content Section */}
        <div className="space-y-8">
          <AnimatePresence mode="wait">
             <motion.div 
               key={isExtended ? 'extended' : 'core'}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.4 }}
               className="space-y-8"
             >
                {currentConcepts ? currentConcepts.map((concept, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={index} 
                    className="glass p-6 md:p-8 rounded-[2rem] border-white/10 shadow-xl hover:shadow-2xl transition-shadow group"
                  >
                    <div className="flex gap-6">
                      <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-2xl bg-[#6366f1]/10 text-[#6366f1] items-center justify-center font-bold text-xl">
                        {index + 1}
                      </div>
                      <div className="flex-grow space-y-6">
                        <div className="space-y-2">
                          <h2 className="text-2xl font-bold group-hover:text-[#6366f1] transition-colors">
                            {concept.title}
                          </h2>
                          <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-white/5 italic text-gray-600 dark:text-gray-300">
                             {concept.explanation}
                          </div>
                        </div>

                        {/* Videos Grid */}
                        <div className="space-y-3">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Curated Resources</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {currentVideos?.[index]?.map((video, vIdx) => (
                              <motion.a 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                key={vIdx} 
                                href={`https://www.youtube.com/watch?v=${video.videoId}`} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="relative aspect-video rounded-xl overflow-hidden group/vid shadow-lg"
                              >
                                <img 
                                  className="w-full h-full object-cover group-hover/vid:scale-110 transition-transform duration-500" 
                                  src={video.thumbnail} 
                                  alt={video.title} 
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/vid:opacity-100 transition-opacity flex items-center justify-center">
                                   <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                      <ArrowForwardRoundedIcon />
                                   </div>
                                </div>
                              </motion.a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )) : (
                  <div className="p-20 text-center space-y-4">
                    <AutoAwesomeRoundedIcon className="text-[#6366f1] animate-spin-slow" sx={{ fontSize: 48 }} />
                    <p className="text-xl font-bold animate-pulse">Deepening Knowledge...</p>
                  </div>
                )}
             </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Control Bar */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-3rem)] max-w-md"
      >
        <div className="glass p-2 rounded-[2rem] shadow-2xl border-white/20 flex items-center gap-2 overflow-hidden">
           <button 
             onClick={() => setIsExtended(false)}
             className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[1.5rem] font-bold transition-all ${!isExtended ? 'bg-[#6366f1] text-white shadow-lg' : 'hover:bg-white/10 dark:text-gray-400'}`}
           >
             <ArrowBackRoundedIcon sx={{ fontSize: 20 }} />
             Core
           </button>
           <button 
             disabled={loadingExtended && !extendedCourse}
             onClick={() => setIsExtended(true)}
             className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[1.5rem] font-bold transition-all ${isExtended ? 'bg-purple-600 text-white shadow-lg' : 'hover:bg-white/10 dark:text-gray-400'} ${(loadingExtended && !extendedCourse) ? 'opacity-50 cursor-not-allowed' : ''}`}
           >
             {isExtended ? 'Extended' : 'Dive Deep'}
             <ArrowForwardRoundedIcon sx={{ fontSize: 20 }} />
           </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Output;