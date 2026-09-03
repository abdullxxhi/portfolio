import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  X,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmail = () => {
    window.location.href = `mailto:${personalInfo.email}`;
  };

  return (
    <div className="fixed bottom-5 right-4 z-[90] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.96,
            }}
            transition={{
              duration: 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute bottom-14 right-0 w-44 overflow-hidden rounded-xl border border-[#DDD6C8] bg-[#FCFAF6] p-1.5"
          >
            <button
              type="button"
              onClick={handleEmail}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-[#4B5563] transition-colors hover:bg-[#F5F1E8] hover:text-[#1D2A26]"
            >
              <Mail className="h-4 w-4 text-[#2F5D50]" />
              Email me
            </button>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium text-[#4B5563] transition-colors hover:bg-[#F5F1E8] hover:text-[#1D2A26]"
            >
              <Linkedin className="h-4 w-4 text-[#2F5D50]" />
              LinkedIn
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium text-[#4B5563] transition-colors hover:bg-[#F5F1E8] hover:text-[#1D2A26]"
            >
              <Github className="h-4 w-4 text-[#2F5D50]" />
              GitHub
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        whileTap={{ scale: 0.96 }}
        aria-label={isOpen ? 'Close contact options' : 'Open contact options'}
        aria-expanded={isOpen}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#DDD6C8] bg-[#2F5D50] text-white transition-colors duration-200 hover:bg-[#244A40]"
      >
        {isOpen ? (
          <X className="h-4 w-4" />
        ) : (
          <MessageCircle className="h-4 w-4" />
        )}
      </motion.button>
    </div>
  );
}
