import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '../../Context/loadingContext';

const TopLoader = () => {
  const { loading } = useLoading();

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut" 
          }}
          className="fixed top-0 left-0 right-0 h-1 z-[100] bg-gradient-to-r from-[#6366f1] to-purple-500 shadow-[0_0_10px_#6366f1]"
        />
      )}
    </AnimatePresence>
  );
};

export default TopLoader;
