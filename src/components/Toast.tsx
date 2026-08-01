import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-8 right-8 z-[1000] flex items-center space-x-3 px-5 py-3.5 rounded-2xl bg-[#FCFAF6] border border-[#DDD6C8] text-[#1D2A26] shadow-xl"
        >
          {type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-[#4E8D66]" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
          <span className="text-sm font-medium text-[#1D2A26]">{message}</span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#F5F1E8] text-[#6B7280] hover:text-[#1D2A26] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
