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

  const whatsappNumber = '2349082250296';
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

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
            className="absolute bottom-14 right-0 w-48 overflow-hidden rounded-xl border border-[#DDD6C8] bg-[#FCFAF6] p-1.5"
          >
            {/* Email */}
            <button
              type="button"
              onClick={handleEmail}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-[#4B5563] transition-colors hover:bg-[#F5F1E8] hover:text-[#1D2A26]"
            >
              <Mail className="h-4 w-4 text-[#2F5D50]" />
              <span>Email me</span>
            </button>

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact me on WhatsApp"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium text-[#4B5563] transition-colors hover:bg-[#F5F1E8] hover:text-[#1D2A26]"
            >
              <svg
                className="h-4 w-4 text-[#4E8D66]"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.52 3.48A11.78 11.78 0 0 0 12.04.02C5.56.02.29 5.29.29 11.77c0 2.07.54 4.1 1.57 5.88L.22 23.78l6.27-1.64a11.75 11.75 0 0 0 5.55 1.41h.01c6.48 0 11.75-5.27 11.75-11.76 0-3.14-1.22-6.09-3.28-8.31ZM12.05 21.53h-.01a9.75 9.75 0 0 1-4.97-1.36l-.36-.21-3.72.97.99-3.63-.23-.37a9.75 9.75 0 1 1 8.3 4.6Zm5.35-7.3c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.65.15-.19.29-.75.95-.92 1.14-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.43-1.72-1.6-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.49.1-.19.05-.37-.02-.52-.07-.15-.65-1.57-.89-2.15-.23-.56-.47-.49-.65-.5h-.55c-.19 0-.49.07-.75.37-.26.29-1.02 1-1.02 2.43s1.05 2.82 1.19 3.01c.15.19 2.06 3.14 4.99 4.4.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34Z" />
              </svg>

              <span>WhatsApp</span>
            </a>

            {/* LinkedIn */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium text-[#4B5563] transition-colors hover:bg-[#F5F1E8] hover:text-[#1D2A26]"
            >
              <Linkedin className="h-4 w-4 text-[#2F5D50]" />
              <span>LinkedIn</span>
            </a>

            {/* GitHub */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium text-[#4B5563] transition-colors hover:bg-[#F5F1E8] hover:text-[#1D2A26]"
            >
              <Github className="h-4 w-4 text-[#2F5D50]" />
              <span>GitHub</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Toggle */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        whileTap={{ scale: 0.96 }}
        aria-label={
          isOpen
            ? 'Close contact options'
            : 'Open contact options'
        }
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
