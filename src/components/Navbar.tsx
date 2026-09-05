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
  {
    name: 'Certifications',
    path: '/certifications',
    id: 'certifications',
  },
  { name: 'Education', path: '/education', id: 'education' },
  { name: 'Experience', path: '/experience', id: 'experience' },
  { name: 'Contact', path: '/contact', id: 'contact' },
];

const NAVBAR_OFFSET = 76;
const ROTATION_DURATION = 2600;

function getLagosTime() {
  return new Intl.DateTimeFormat('en-NG', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Africa/Lagos',
  }).format(new Date());
}

function getLagosHour() {
  const hour = Number(
    new Intl.DateTimeFormat('en-NG', {
      hour: '2-digit',
      hour12: false,
      timeZone: 'Africa/Lagos',
    }).format(new Date())
  );

  return hour;
}

function getTimeGreeting() {
  const hour = getLagosHour();

  if (hour >= 5 && hour < 12) {
    return 'Good morning.';
  }

  if (hour >= 12 && hour < 17) {
    return 'Good afternoon.';
  }

  if (hour >= 17 && hour < 21) {
    return 'Good evening.';
  }

  return 'Good night.';
}

/*
 * Permanent portfolio identity mark.
 *
 * The path represents the user's visual language:
 * DATA → ANALYZE → AUTOMATE → RESULT
 */
function DataPathLogo() {
  return (
    <div
      className="relative flex h-9 w-9 shrink-0 items-center justify-center sm:h-10 sm:w-10"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 40 40"
        width="40"
        height="40"
        fill="none"
        className="h-full w-full"
      >
        {/* Main path */}
        <path
          d="M7 28C11 28 12 21 17 21C21 21 22 13 27 13C30 13 32 10 34 7"
          stroke="#2F5D50"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Secondary path */}
        <path
          d="M7 13C10 13 12 18 16 18C20 18 21 27 26 27C30 27 32 24 34 22"
          stroke="#DDD6C8"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data nodes */}
        <circle
          cx="7"
          cy="28"
          r="2.5"
          fill="#2F5D50"
        />

        <circle
          cx="17"
          cy="21"
          r="2.5"
          fill="#2F5D50"
        />

        <circle
          cx="27"
          cy="13"
          r="2.5"
          fill="#D97745"
        />

        <circle
          cx="34"
          cy="7"
          r="2.5"
          fill="#2F5D50"
        />

        {/* Supporting nodes */}
        <circle
          cx="7"
          cy="13"
          r="1.5"
          fill="#DDD6C8"
        />

        <circle
          cx="16"
          cy="18"
          r="1.5"
          fill="#DDD6C8"
        />

        <circle
          cx="26"
          cy="27"
          r="1.5"
          fill="#DDD6C8"
        />

        <circle
          cx="34"
          cy="22"
          r="1.5"
          fill="#DDD6C8"
        />
      </svg>
    </div>
  );
}

function WelcomeVisual() {
  return (
    <div className="flex items-center gap-2">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97745]" />

      <span className="font-display text-[11px] font-medium tracking-tight text-[#1D2A26] sm:text-xs">
        Welcome.
      </span>
    </div>
  );
}

function GreetingVisual({ greeting }: { greeting: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97745]" />

      <span className="font-display text-[10px] font-medium tracking-tight text-[#1D2A26] sm:text-[11px]">
        {greeting}
      </span>
    </div>
  );
}

function TimeVisual({ time }: { time: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#4E8D66] opacity-40" />

        <span className="relative h-1.5 w-1.5 rounded-full bg-[#4E8D66]" />
      </span>

      <span className="font-mono text-[9px] font-medium tracking-[0.08em] text-[#1D2A26] sm:text-[10px]">
        {time} WAT
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

      <span
        className="flex h-4 items-end gap-[2px]"
        aria-label="Animated data signal"
      >
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

        <span
          className="navbar-data-bar h-[6px] w-[2px] rounded-full bg-[#2F5D50]"
          style={{ animationDelay: '720ms' }}
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
    getLagosTime()
  );

  const [greeting, setGreeting] = useState(() =>
    getTimeGreeting()
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
    const updateTimeState = () => {
      setCurrentTime(getLagosTime());
      setGreeting(getTimeGreeting());
    };

    updateTimeState();

    const timeTimer = window.setInterval(
      updateTimeState,
      1000
    );

    return () => {
      window.clearInterval(timeTimer);
    };
  }, []);

  const visuals = [
    <WelcomeVisual key="welcome" />,
    <GreetingVisual
      key="greeting"
      greeting={greeting}
    />,
    <TimeVisual
      key="time"
      time={currentTime}
    />,
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

      <div className="w-[86px] shrink-0 sm:w-[126px] lg:w-[140px]">
        <AnimatePresence
          mode="wait"
          initial={false}
        >
          <motion.div
            key={visualIndex}
            initial={{
              opacity: 0,
              y: 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -5,
            }}
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

export default function Navbar({
  activeSection,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

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

    const target =
      document.getElementById(sectionId);

    if (!target) {
      return;
    }

    setMobileMenuOpen(false);

    window.history.pushState({}, '', path);

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

  const goHome = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
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

        {/* Brand */}
        <a
          href="/"
          onClick={goHome}
          aria-label={`${personalInfo.name} — Go to homepage`}
          className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
        >
          {/* Permanent data-path identity */}
          <div className="relative flex shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-[1.04]">
            <DataPathLogo />
          </div>

          {/* Name + rotating visual */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="hidden h-5 w-px bg-[#DDD6C8] sm:block" />

            <div className="hidden sm:block">
              <span className="font-display text-[11px] font-bold tracking-[-0.01em] text-[#1D2A26] lg:text-xs">
                Abdullahi
              </span>
            </div>

            <RotatingNavbarVisual />
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const isActive =
              activeSection === link.id;

            return (
              <a
                key={link.name}
                href={link.path}
                onClick={(event) =>
                  scrollToSection(
                    event,
                    link.path,
                    link.id
                  )
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
              scrollToSection(
                event,
                '/contact',
                'contact'
              )
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
              scrollToSection(
                event,
                '/contact',
                'contact'
              )
            }
            className="inline-flex items-center gap-1 rounded-lg bg-[#2F5D50] px-3 py-2 text-[11px] font-semibold text-white transition-colors duration-200 hover:bg-[#244A40] sm:px-3.5 sm:text-xs"
          >
            <span>Hire Me</span>

            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen((open) => !open)
            }
            aria-label={
              mobileMenuOpen
                ? 'Close menu'
                : 'Open menu'
            }
            aria-expanded={mobileMenuOpen}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#DDD6C8] bg-[#FCFAF6] text-[#1D2A26] transition-colors duration-200 hover:border-[#2F5D50] hover:text-[#2F5D50]"
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
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: 'auto',
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="overflow-hidden border-t border-[#DDD6C8] bg-[#F5F1E8]/98 backdrop-blur-md lg:hidden"
          >
            <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
              <div className="divide-y divide-[#DDD6C8] border-y border-[#DDD6C8]">
                {navLinks.map((link) => {
                  const isActive =
                    activeSection === link.id;

                  return (
                    <a
                      key={link.name}
                      href={link.path}
                      onClick={(event) =>
                        scrollToSection(
                          event,
                          link.path,
                          link.id
                        )
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
