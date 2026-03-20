import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '../../Context/loadingContext';

const TopLoader = () => {
  const { loading } = useLoading();

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="fixed top-0 left-0 right-0 h-1 z-[100] bg-gradient-to-r from-transparent via-[#6366f1] to-transparent shadow-[0_0_10px_#6366f1]"
        />
      )}
    </AnimatePresence>
  );
};

export default TopLoader;
