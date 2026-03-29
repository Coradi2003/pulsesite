import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlackBootLoader({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      // Intentionally hard delays to build absolute suspense
      await new Promise(r => setTimeout(r, 600));
      setStage(1); // "AUTENTICANDO"
      await new Promise(r => setTimeout(r, 1200));
      setStage(2); // "ACESSO LIBERADO"
      await new Promise(r => setTimeout(r, 700));
      setStage(3); // Trigger exit animation
      await new Promise(r => setTimeout(r, 100));
      onComplete(); // Tell root component to render
    };
    sequence();
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div
          key="bootloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
          transition={{ duration: 1.2, ease: "easeIn" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black overflow-hidden pointer-events-none"
        >
          {/* Subtle vignette/noise overlay just for the loader */}
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] mix-blend-screen" />
          
          <div className="relative z-10 font-mono text-center flex flex-col gap-4 tracking-[0.3em] text-xs md:text-sm">
            
            {/* Step 0 - Complete Darkness (Silently brooding) */}
            
            {/* Step 1 - System Boot */}
            {stage === 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
                className="text-[var(--be-text-darker)] mix-blend-difference"
              >
                [ ENCRYPTING CONNECTION ... ]<br/><br/>
                <span className="text-white">AUTENTICANDO CREDENCIAIS PULSE BLACK</span>
              </motion.div>
            )}

            {/* Step 2 - Access Granted */}
            {stage === 2 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }} 
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} 
                className="text-white font-bold tracking-[0.5em] text-lg md:text-xl drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]"
              >
                [ ACESSO LIBERADO ]
              </motion.div>
            )}
            
          </div>

          {/* Glitch Line Scanning Down */}
          {stage > 0 && (
             <motion.div 
               initial={{ top: '-10%' }}
               animate={{ top: '110%' }}
               transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
               className="absolute left-0 right-0 h-[1px] bg-[rgba(255,255,255,0.2)] shadow-[0_0_15px_rgba(255,255,255,0.5)] z-0"
             />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
