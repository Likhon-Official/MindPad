import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Logo size={48} className="mb-8" />
      </motion.div>
      
      <motion.div 
        className="w-48 h-1 bg-white/10 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="h-full bg-cyan-500"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: 'easeInOut'
          }}
        />
      </motion.div>
    </div>
  );
}