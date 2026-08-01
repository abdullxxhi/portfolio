import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Cpu, Sparkles } from 'lucide-react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#F5F1E8] text-[#1D2A26]"
        >
          {/* Animated Glow Backdrop */}
          <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-[#2F5D50]/20 to-[#D97745]/20 blur-3xl animate-pulse" />

          {/* Loader Icon & Badge */}
          <div className="relative z-10 flex flex-col items-center space-y-6">
            <motion.div
              initial={{ scale: 0.8, rotate: 0 }}
              animate={{ scale: [0.8, 1.1, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 1, ease: 'easeInOut', repeat: Infinity }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2F5D50] to-[#D97745] p-0.5 shadow-[0_8px_25px_rgba(47,93,80,0.25)]"
            >
              <div className="w-full h-full bg-[#FCFAF6] rounded-[14px] flex items-center justify-center">
                <Bot className="w-8 h-8 text-[#2F5D50]" />
              </div>
            </motion.div>

            <div className="text-center">
              <h2 className="text-2xl font-bold font-display text-[#1D2A26] tracking-tight">
                ABDULLAHI DAMILOLA
              </h2>
              <div className="flex items-center space-x-2 mt-2 text-xs font-mono text-[#6B7280]">
                <Cpu className="w-3.5 h-3.5 text-[#2F5D50] animate-spin" />
                <span>Initializing Portfolio...</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-48 h-1.5 bg-[#DDD6C8] rounded-full overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-[#2F5D50] to-[#D97745] rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
