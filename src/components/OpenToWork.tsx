import { motion } from 'motion/react';
import { BriefcaseBusiness } from 'lucide-react';

export default function OpenToWork() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 1.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="fixed bottom-5 left-4 z-[90] sm:bottom-6 sm:left-6"
    >
      <div className="flex items-center gap-2 rounded-full border border-[#DDD6C8] bg-[#FCFAF6]/95 px-3 py-2 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#4E8D66] opacity-40" />
          <span className="relative h-2 w-2 rounded-full bg-[#4E8D66]" />
        </span>

        <BriefcaseBusiness className="h-3.5 w-3.5 text-[#2F5D50]" />

        <span className="font-display text-[11px] font-semibold text-[#1D2A26] sm:text-xs">
          Open to Work
        </span>
      </div>
    </motion.div>
  );
}
