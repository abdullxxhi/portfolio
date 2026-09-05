import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    toggleVisibility();

    window.addEventListener('scroll', toggleVisibility, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{
            opacity: 0,
            y: 8,
            scale: 0.94,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 8,
            scale: 0.94,
          }}
          transition={{
            duration: 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="group fixed bottom-4 right-4 z-[90] flex h-11 w-11 items-center justify-center rounded-full border border-[#DDD6C8] bg-[#FCFAF6] text-[#4B5563] shadow-[0_8px_24px_-16px_rgba(29,42,38,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2F5D50]/50 hover:text-[#2F5D50] hover:shadow-[0_12px_28px_-16px_rgba(29,42,38,0.4)] sm:bottom-6 sm:right-6"
        >
          <ChevronUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
