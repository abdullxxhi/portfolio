import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  MessageSquare,
  Github,
  Linkedin,
  Mail,
  Phone,
  Sparkles
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface HeroProps {
  onCopyEmail: () => void;
}

export default function Hero({ onCopyEmail }: HeroProps) {
  // Role typing effect
  const roles = [
    'Data Analyst',
    'Workflow Automation',
    'Google Workspace',
    'AI Automation'
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(
          currentRole.substring(0, displayedText.length + 1)
        );

        if (displayedText === currentRole) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedText(
          currentRole.substring(0, displayedText.length - 1)
        );

        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex(
            (prev) => (prev + 1) % roles.length
          );
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    const target = document.querySelector(href);

    if (target) {
      const navOffset = 80;
      const elementPosition =
        target.getBoundingClientRect().top;

      const offsetPosition =
        elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  /*
   * Lightweight AI / data network.
   * The network is visible on both desktop and mobile.
   * On mobile it is smaller, softer, and placed behind the content.
   */
  const networkNodes = [
    { x: 12, y: 24, r: 2.2, delay: 0 },
    { x: 28, y: 12, r: 1.8, delay: 1 },
    { x: 42, y: 30, r: 2.4, delay: 1.8 },
    { x: 58, y: 14, r: 1.8, delay: 0.6 },
    { x: 72, y: 27, r: 2.3, delay: 2.2 },
    { x: 88, y: 16, r: 1.8, delay: 1.2 },

    { x: 18, y: 52, r: 1.7, delay: 2.5 },
    { x: 36, y: 66, r: 2.2, delay: 0.8 },
    { x: 54, y: 48, r: 1.9, delay: 1.7 },
    { x: 69, y: 62, r: 2.4, delay: 0.4 },
    { x: 84, y: 49, r: 1.8, delay: 2.8 },
    { x: 94, y: 72, r: 2.1, delay: 1.4 },

    { x: 25, y: 84, r: 1.8, delay: 2 },
    { x: 48, y: 78, r: 2.3, delay: 0.3 },
    { x: 67, y: 88, r: 1.8, delay: 1.6 },
    { x: 83, y: 80, r: 2.2, delay: 2.4 }
  ];

  const networkLines = [
    [12, 24, 28, 12],
    [28, 12, 42, 30],
    [42, 30, 58, 14],
    [58, 14, 72, 27],
    [72, 27, 88, 16],

    [18, 52, 36, 66],
    [36, 66, 54, 48],
    [54, 48, 69, 62],
    [69, 62, 84, 49],
    [84, 49, 94, 72],

    [25, 84, 48, 78],
    [48, 78, 67, 88],
    [67, 88, 83, 80],

    [42, 30, 54, 48],
    [36, 66, 48, 78],
    [69, 62, 67, 88],
    [72, 27, 84, 49]
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex items-center pt-28 pb-16 overflow-hidden"
    >

      {/* ========================================================= */}
      {/* HERO DECORATIVE VISUAL */}
      {/* ========================================================= */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Main ambient glow */}
        <motion.div
          className="
            absolute
            -top-32
            right-[-25%]
            sm:right-[-12%]
            w-[360px]
            h-[360px]
            sm:w-[520px]
            sm:h-[520px]
            rounded-full
            bg-gradient-to-br
            from-[#2F5D50]/10
            via-[#4E8D66]/6
            to-[#D97745]/7
            blur-[90px]
            sm:blur-[110px]
          "
          animate={{
            x: [0, -20, 0],
            y: [0, 18, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Secondary glow */}
        <motion.div
          className="
            absolute
            bottom-[-120px]
            left-[-25%]
            sm:left-[-10%]
            w-[320px]
            h-[320px]
            sm:w-[460px]
            sm:h-[460px]
            rounded-full
            bg-[#D97745]/6
            blur-[100px]
            sm:blur-[120px]
          "
          animate={{
            x: [0, 25, 0],
            y: [0, -15, 0]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* ======================================================= */}
        {/* AI / DATA NETWORK */}
        {/* ======================================================= */}

        <motion.div
          className="
            absolute
            top-[16%]
            right-[-25%]
            sm:right-[-4%]
            w-[75%]
            sm:w-[58%]
            max-w-[760px]
            h-[62%]
            sm:h-[70%]
            opacity-40
            sm:opacity-70
          "
          animate={{
            y: [0, -8, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            preserveAspectRatio="none"
          >

            {/* Network connections */}
            {networkLines.map(
              ([x1, y1, x2, y2], index) => (
                <motion.line
                  key={`line-${index}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#2F5D50"
                  strokeWidth="0.18"
                  strokeOpacity="0.16"
                  initial={{
                    pathLength: 0,
                    opacity: 0
                  }}
                  animate={{
                    pathLength: 1,
                    opacity: [0.05, 0.2, 0.05]
                  }}
                  transition={{
                    pathLength: {
                      duration: 1.5,
                      delay: index * 0.08
                    },
                    opacity: {
                      duration: 5,
                      delay: index * 0.1,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }
                  }}
                />
              )
            )}

            {/* Data nodes */}
            {networkNodes.map(
              ({ x, y, r, delay }, index) => (
                <g key={`node-${index}`}>

                  {/* Node glow */}
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={r * 2.2}
                    fill="#2F5D50"
                    opacity="0.035"
                    animate={{
                      scale: [0.8, 1.8, 0.8],
                      opacity: [0.02, 0.08, 0.02]
                    }}
                    transition={{
                      duration: 4,
                      delay,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    style={{
                      transformOrigin: `${x}px ${y}px`
                    }}
                  />

                  {/* Main node */}
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={r}
                    fill="#2F5D50"
                    animate={{
                      opacity: [0.2, 0.65, 0.2]
                    }}
                    transition={{
                      duration: 3.5,
                      delay,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />

                </g>
              )
            )}

            {/* Central highlighted node */}
            <motion.circle
              cx="54"
              cy="48"
              r="4"
              fill="#D97745"
              opacity="0.08"
              animate={{
                scale: [0.8, 1.8, 0.8],
                opacity: [0.04, 0.14, 0.04]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{
                transformOrigin: '54px 48px'
              }}
            />

            <motion.circle
              cx="54"
              cy="48"
              r="1.7"
              fill="#D97745"
              animate={{
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

          </svg>
        </motion.div>

        {/* Subtle horizontal data lines */}
        <div className="
          absolute
          right-0
          top-[30%]
          w-[45%]
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#2F5D50]/10
          to-transparent
        " />

        <div className="
          absolute
          right-[5%]
          top-[65%]
          w-[35%]
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#D97745]/10
          to-transparent
        " />

        {/* Floating data marker */}
        <motion.div
          className="
            absolute
            right-[14%]
            top-[22%]
            w-2
            h-2
            rounded-full
            bg-[#D97745]/50
          "
          animate={{
            y: [0, -12, 0],
            opacity: [0.25, 0.7, 0.25]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Second floating marker */}
        <motion.div
          className="
            absolute
            right-[30%]
            top-[72%]
            w-1.5
            h-1.5
            rounded-full
            bg-[#2F5D50]/50
          "
          animate={{
            y: [0, 10, 0],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

      </div>

      {/* ========================================================= */}
      {/* MAIN HERO CONTENT */}
      {/* ========================================================= */}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div>

          {/* Main Hero Copy */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}
            className="space-y-6 text-left"
          >

            {/* Role Badge */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              transition={{
                duration: 0.6,
                delay: 0.15
              }}
              className="
                inline-flex
                items-center
                space-x-2
                px-3.5
                py-1.5
                rounded-full
                bg-[#FCFAF6]/90
                border
                border-[#DDD6C8]
                shadow-sm
                backdrop-blur-sm
              "
            >
              <span className="relative flex items-center justify-center">
                <span className="absolute w-3 h-3 rounded-full bg-[#4E8D66]/30 animate-ping" />
                <span className="relative w-2 h-2 rounded-full bg-[#4E8D66]" />
              </span>

              <Sparkles className="w-3.5 h-3.5 text-[#D97745]" />

              <span className="text-xs font-mono uppercase tracking-widest text-[#2F5D50] font-semibold">
                AI AUTOMATION & DATA ANALYTICS
              </span>
            </motion.div>

            {/* Title & Name */}
            <div className="space-y-2">

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 15
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.25
                }}
                className="
                  text-4xl
                  sm:text-5xl
                  lg:text-6xl
                  font-bold
                  font-display
                  text-[#1D2A26]
                  tracking-tight
                  leading-[1.1]
                "
              >
                Hello, I'm <br />

                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F5D50] via-[#3d7263] to-[#D97745]">
                  {personalInfo.name}
                </span>
              </motion.h1>

              {/* Typing Animation Role Subtitle */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -10
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.45
                }}
                className="h-8 flex items-center space-x-2 text-lg sm:text-xl font-mono text-[#2F5D50]"
              >
                <span className="text-[#D97745]">
                  &gt;
                </span>

                <span className="font-semibold text-[#1D2A26]">
                  {displayedText}
                </span>

                <span className="w-2 h-5 bg-[#D97745] animate-pulse" />
              </motion.div>

            </div>

            {/* One-line bio */}
            <motion.p
              initial={{
                opacity: 0,
                y: 12
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.6,
                delay: 0.55
              }}
              className="text-base sm:text-lg text-[#4B5563] max-w-2xl leading-relaxed"
            >
              {personalInfo.aboutHeadline}
            </motion.p>

            {/* Buttons & CTA */}
            <motion.div
              initial={{
                opacity: 0,
                y: 12
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.6,
                delay: 0.65
              }}
              className="pt-2 flex flex-wrap gap-4 items-center"
            >

              <motion.a
                href="#projects"
                onClick={(e) =>
                  scrollToSection(e, '#projects')
                }
                whileHover={{
                  scale: 1.03,
                  y: -2
                }}
                whileTap={{
                  scale: 0.97
                }}
                className="
                  px-6
                  py-3.5
                  rounded-2xl
                  bg-[#2F5D50]
                  text-white
                  font-semibold
                  text-sm
                  flex
                  items-center
                  space-x-2.5
                  shadow-[0_8px_25px_rgba(47,93,80,0.25)]
                  hover:bg-[#244A40]
                  transition-all
                "
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                href="#contact"
                onClick={(e) =>
                  scrollToSection(e, '#contact')
                }
                whileHover={{
                  scale: 1.03,
                  y: -2
                }}
                whileTap={{
                  scale: 0.97
                }}
                className="
                  px-6
                  py-3.5
                  rounded-2xl
                  bg-[#FCFAF6]
                  border
                  border-[#DDD6C8]
                  text-[#1D2A26]
                  hover:text-[#2F5D50]
                  hover:border-[#2F5D50]
                  font-semibold
                  text-sm
                  flex
                  items-center
                  space-x-2
                  shadow-sm
                  transition-all
                "
              >
                <MessageSquare className="w-4 h-4 text-[#D97745]" />
                <span>Let's Talk</span>
              </motion.a>

            </motion.div>

            {/* Small Social Icons & Quick Contact */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.6,
                delay: 0.75
              }}
              className="pt-4 flex items-center space-x-4 text-[#6B7280]"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-[#6B7280]">
                Connect:
              </span>

              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                whileHover={{
                  y: -3,
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                className="
                  p-2.5
                  rounded-xl
                  bg-[#FCFAF6]
                  border
                  border-[#DDD6C8]
                  text-[#4B5563]
                  hover:text-[#2F5D50]
                  hover:border-[#2F5D50]
                  transition-all
                  shadow-sm
                "
              >
                <Github className="w-4 h-4" />
              </motion.a>

              <motion.a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                whileHover={{
                  y: -3,
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                className="
                  p-2.5
                  rounded-xl
                  bg-[#FCFAF6]
                  border
                  border-[#DDD6C8]
                  text-[#4B5563]
                  hover:text-[#2F5D50]
                  hover:border-[#2F5D50]
                  transition-all
                  shadow-sm
                "
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>

              <motion.button
                onClick={onCopyEmail}
                aria-label="Copy Email"
                title="Copy Email"
                whileHover={{
                  y: -3,
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                className="
                  p-2.5
                  rounded-xl
                  bg-[#FCFAF6]
                  border
                  border-[#DDD6C8]
                  text-[#4B5563]
                  hover:text-[#2F5D50]
                  hover:border-[#2F5D50]
                  transition-all
                  shadow-sm
                "
              >
                <Mail className="w-4 h-4" />
              </motion.button>

              <motion.a
                href={`tel:${personalInfo.phone}`}
                aria-label="Call Phone"
                title={personalInfo.phone}
                whileHover={{
                  y: -3,
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                className="
                  p-2.5
                  rounded-xl
                  bg-[#FCFAF6]
                  border
                  border-[#DDD6C8]
                  text-[#4B5563]
                  hover:text-[#2F5D50]
                  hover:border-[#2F5D50]
                  transition-all
                  shadow-sm
                "
              >
                <Phone className="w-4 h-4" />
              </motion.a>

            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
