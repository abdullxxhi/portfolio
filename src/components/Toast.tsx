import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({
  message,
  type = 'success',
  onClose,
}: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{
            duration: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          role="status"
          aria-live="polite"
          className="fixed bottom-5 left-4 right-4 z-[1000] flex items-center gap-3 rounded-lg border border-[#DDD6C8] bg-[#FCFAF6] px-4 py-3 text-[#1D2A26] sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-md"
        >
          {type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#4E8D66]" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 text-[#B4533C]" />
          )}

          <span className="min-w-0 flex-1 text-sm leading-5 text-[#4B5563]">
            {message}
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close notification"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-[#F5F1E8] hover:text-[#1D2A26]"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
