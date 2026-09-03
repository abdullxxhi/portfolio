import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
}

const navLinks = [
  { name: 'About', path: '/about', id: 'about' },
  { name: 'Skills', path: '/skills', id: 'skills' },
  { name: 'Projects', path: '/projects', id: 'projects' },
  { name: 'Certifications', path: '/certifications', id: 'certifications' },
  { name: 'Education', path: '/education', id: 'education' },
  { name: 'Experience', path: '/experience', id: 'experience' },
  { name: 'Contact', path: '/contact', id: 'contact' },
];

const NAVBAR_OFFSET = 76;

const ROTATION_DURATION = 2600;

function WelcomeVisual() {
  return (
    <div className="flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-[#D97745]" />
      <span className="font-display text-[11px] font-medium tracking-tight text-[#1D2A26]">
        Welcome.
      </span>
    </div>
  );
}

function TimeVisual({ time }: { time: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-[#4E8D66] animate-pulse" />
      <span className="font-mono text-[10px] font-medium tracking-[0.08em] text-[#1D2A26]">
        {time} WAT
      </span>
    </div>
  );
}

function CoordinatesVisual() {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-4 w-4 items-center justify-center">
        <span className="absolute h-3.5 w-3.5 rounded-full border border-[#DDD6C8]" />
        <span className="absolute h-px w-4 bg-[#DDD6C8]" />
        <span className="absolute h-4 w-px bg-[#DDD6C8]" />
        <span className="h-1 w-1 rounded-full bg-[#2F5D50]" />
      </span>

      <span className="font-mono text-[9px] font-medium tracking-[0.04em] text-[#6B7280]">
        06°31′N 03°23′E
      </span>
    </div>
  );
}

function DataVisual() {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#6B7280]">
        DATA
      </span>

      <span className="flex h-4 items-end gap-[2px]">
        <span className="navbar-data-bar h-[5px] w-[2px] rounded-full bg-[#2F5D50]" />
        <span
          className="navbar-data-bar h-[10px] w-[2px] rounded-full bg-[#2F5D50]"
          style={{ animationDelay: '120ms' }}
        />
        <span
          className="navbar-data-bar h-[7px] w-[2px] rounded-full bg-[#2F5D50]"
          style={{ animationDelay: '240ms' }}
        />
        <span
          className="navbar-data-bar h-[14px] w-[2px] rounded-full bg-[#D97745]"
          style={{ animationDelay: '360ms' }}
        />
        <span
          className="navbar-data-bar h-[8px] w-[2px] rounded-full bg-[#2F5D50]"
          style={{ animationDelay: '480ms' }}
        />
        <span
          className="navbar-data-bar h-[11px] w-[2px] rounded-full bg-[#2F5D50]"
          style={{ animationDelay: '600ms' }}
        />
      </span>
    </div>
  );
}

function AIVisual() {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="26"
        height="18"
        viewBox="0 0 26 18"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 5L13 2L22 5M4 13L13 16L22 13M4 5V13M22 5V13M13 2V16"
          stroke="#DDD6C8"
          strokeWidth="0.8"
        />

        <circle
          className="navbar-ai-node"
          cx="4"
          cy="5"
          r="2"
          fill="#2F5D50"
        />
        <circle
          className="navbar-ai-node"
          cx="13"
          cy="2"
          r="2"
          fill="#D97745"
          style={{ animationDelay: '180ms' }}
        />
        <circle
          className="navbar-ai-node"
          cx="22"
          cy="5"
          r="2"
          fill="#2F5D50"
          style={{ animationDelay: '360ms' }}
        />
        <circle
          className="navbar-ai-node"
          cx="4"
          cy="13"
          r="2"
          fill="#2F5D50"
          style={{ animationDelay: '540ms' }}
        />
        <circle
          className="navbar-ai-node"
          cx="13"
          cy="16"
          r="2"
          fill="#2F5D50"
          style={{ animationDelay: '720ms' }}
        />
        <circle
          className="navbar-ai-node"
          cx="22"
          cy="13"
          r="2"
          fill="#2F5D50"
          style={{ animationDelay: '900ms' }}
        />
      </svg>

      <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#6B7280]">
        AI
      </span>
    </div>
  );
}

function RotatingNavbarVisual() {
  const [visualIndex, setVisualIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(() =>
    new Intl.DateTimeFormat('en-NG', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Africa/Lagos',
    }).format(new Date())
  );

  useEffect(() => {
    const rotationTimer = window.setInterval(() => {
      setVisualIndex((current) => (current + 1) % 5);
    }, ROTATION_DURATION);

    return () => {
      window.clearInterval(rotationTimer);
    };
  }, []);

  useEffect(() => {
    if (visualIndex !== 1) {
      return;
    }

    const updateTime = () => {
      setCurrentTime(
        new Intl.DateTimeFormat('en-NG', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Africa/Lagos',
        }).format(new Date())
      );
    };

    updateTime();

    const timeTimer = window.setInterval(updateTime, 1000);

    return () => {
      window.clearInterval(timeTimer);
    };
  }, [visualIndex]);

  const visuals = [
    <WelcomeVisual key="welcome" />,
    <TimeVisual key="time" time={currentTime} />,
    <CoordinatesVisual key="coordinates" />,
    <DataVisual key="data" />,
    <AIVisual key="ai" />,
  ];

  return (
    <>
      <style>
        {`
          @keyframes navbarDataPulse {
            0%, 100% {
              transform: scaleY(0.55);
              opacity: 0.55;
            }
            50% {
              transform: scaleY(1);
              opacity: 1;
            }
          }

          @keyframes navbarAiPulse {
            0%, 100% {
              transform: scale(0.8);
              opacity: 0.55;
            }
            50% {
              transform: scale(1.15);
              opacity: 1;
            }
          }

          .navbar-data-bar {
            transform-origin: bottom;
            animation: navbarDataPulse 1.4s ease-in-out infinite;
          }

          .navbar-ai-node {
            transform-box: fill-box;
            transform-origin: center;
            animation: navbarAiPulse 1.8s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .navbar-data-bar,
            .navbar-ai-node {
              animation: none !important;
            }
          }
        `}
      </style>

      <div className="w-[112px] shrink-0 sm:w-[140px] lg:w-[150px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={visualIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{
              duration: 0.28,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex h-6 items-center"
          >
            {visuals[visualIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string,
    sectionId: string
  ) => {
    event.preventDefault();

    const target = document.getElementById(sectionId);

    if (!target) {
      return;
    }

    setMobileMenuOpen(false);

    /*
     * Change the URL without reloading the SPA.
     * pushState does NOT move the page, so we control the scroll ourselves.
     */
    window.history.pushState({}, '', path);

    /*
     * Wait for the mobile menu to close before measuring the target.
     * Two animation frames ensure React has committed the state update.
     */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          NAVBAR_OFFSET;

        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth',
        });
      });
    });
  };

  const goHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    setMobileMenuOpen(false);
    window.history.pushState({}, '', '/');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[100] border-b transition-all duration-300 ${
        isScrolled
          ? 'border-[#DDD6C8] bg-[#F5F1E8]/95 py-3 backdrop-blur-md'
          : 'border-transparent bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Rotating Visual */}
        <a
          href="/"
          onClick={goHome}
          aria-label="Go to homepage"
          className="group flex items-center"
        >
          <RotatingNavbarVisual />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.name}
                href={link.path}
                onClick={(event) =>
                  scrollToSection(event, link.path, link.id)
                }
                className={`relative py-2 text-xs font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-[#2F5D50]'
                    : 'text-[#6B7280] hover:text-[#1D2A26]'
                }`}
              >
                {link.name}

                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#2F5D50]"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex">
          <a
            href="/contact"
            onClick={(event) =>
              scrollToSection(event, '/contact', 'contact')
            }
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#2F5D50] px-4 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:bg-[#244A40]"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="/contact"
            onClick={(event) =>
              scrollToSection(event, '/contact', 'contact')
            }
            className="inline-flex items-center gap-1 rounded-lg bg-[#2F5D50] px-3.5 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:bg-[#244A40]"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDD6C8] bg-[#FCFAF6] text-[#1D2A26] transition-colors duration-200 hover:border-[#2F5D50] hover:text-[#2F5D50]"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="overflow-hidden border-t border-[#DDD6C8] bg-[#F5F1E8]/98 backdrop-blur-md lg:hidden"
          >
            <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
              <div className="divide-y divide-[#DDD6C8] border-y border-[#DDD6C8]">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;

                  return (
                    <a
                      key={link.name}
                      href={link.path}
                      onClick={(event) =>
                        scrollToSection(event, link.path, link.id)
                      }
                      className={`flex items-center justify-between py-3.5 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-[#2F5D50]'
                          : 'text-[#4B5563] hover:text-[#1D2A26]'
                      }`}
                    >
                      <span>{link.name}</span>

                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#2F5D50]" />
                      )}
                    </a>
                  );
                })}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
