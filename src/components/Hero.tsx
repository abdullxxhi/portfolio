import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  MessageSquare,
  Github,
  Linkedin,
  Mail,
  Phone,
  Sparkles,
  Database,
  BarChart3,
  Workflow,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface HeroProps {
  onCopyEmail: () => void;
}

export default function Hero({ onCopyEmail }: HeroProps) {
  const roles = [
    'Data Analyst',
    'Workflow Automation',
    'Google Workspace',
    'AI Automation',
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
        behavior: 'smooth',
      });
    }
  };

  const workflowSteps = [
    {
      number: '01',
      label: 'DATA',
      description: 'Collect & structure',
      icon: Database,
    },
    {
      number: '02',
      label: 'ANALYZE',
      description: 'Find useful insights',
      icon: BarChart3,
    },
    {
      number: '03',
      label: 'AUTOMATE',
      description: 'Build intelligent workflows',
      icon: Workflow,
    },
    {
      number: '04',
      label: 'RESULT',
      description: 'Turn work into impact',
      icon: CheckCircle2,
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[88vh] flex items-center pt-28 pb-16 overflow-hidden"
    >
      {/* =========================================================
          HERO ATMOSPHERE
      ========================================================== */}

      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Main sage glow */}
        <motion.div
          className="
            absolute
            -top-48
            -right-32
            sm:-right-10
            w-[420px]
            h-[420px]
            sm:w-[600px]
            sm:h-[600px]
            rounded-full
            will-change-transform
          "
          style={{
            background:
              'radial-gradient(circle, rgba(47,93,80,0.16) 0%, rgba(47,93,80,0.06) 40%, transparent 72%)',
            filter: 'blur(55px)',
          }}
          animate={{
            x: [0, -18, 0],
            y: [0, 20, 0],
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Terracotta glow */}
        <motion.div
          className="
            absolute
            -bottom-48
            -left-40
            w-[400px]
            h-[400px]
            sm:w-[520px]
            sm:h-[520px]
            rounded-full
            will-change-transform
          "
          style={{
            background:
              'radial-gradient(circle, rgba(217,119,69,0.12) 0%, rgba(217,119,69,0.035) 45%, transparent 72%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 22, 0],
            y: [0, -16, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Fine technical grid */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(47,93,80,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(47,93,80,0.07) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />

        {/* Decorative horizontal line */}
        <div
          className="
            absolute
            top-[32%]
            right-0
            w-[38%]
            h-px
            bg-gradient-to-r
            from-transparent
            via-[#2F5D50]/15
            to-transparent
          "
        />

        <div
          className="
            absolute
            bottom-[24%]
            left-0
            w-[30%]
            h-px
            bg-gradient-to-r
            from-transparent
            via-[#D97745]/12
            to-transparent
          "
        />
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">

          {/* =====================================================
              LEFT — PERSONAL BRAND
          ====================================================== */}

          <div className="space-y-6">
            {/* Role badge */}
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="
                inline-flex
                items-center
                gap-2.5
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

              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#2F5D50] font-semibold">
                AI AUTOMATION & DATA ANALYTICS
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h1
                className="
                  text-4xl
                  sm:text-5xl
                  lg:text-[4.25rem]
                  font-bold
                  font-display
                  text-[#1D2A26]
                  tracking-tight
                  leading-[1.04]
                "
              >
                Hello, I'm
                <br />

                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F5D50] via-[#3d7263] to-[#D97745]">
                  {personalInfo.name}
                </span>
              </h1>
            </motion.div>

            {/* Dynamic role */}
            <motion.div
              initial={{
                opacity: 0,
                x: -15,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.3,
              }}
              className="h-9 flex items-center gap-2 text-lg sm:text-xl font-mono"
            >
              <span className="text-[#D97745] font-semibold">
                &gt;
              </span>

              <span className="font-semibold text-[#1D2A26]">
                {displayedText}
              </span>

              <span className="w-2 h-5 bg-[#D97745] animate-pulse" />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.4,
              }}
              className="
                text-base
                sm:text-lg
                text-[#4B5563]
                max-w-xl
                leading-relaxed
              "
            >
              {personalInfo.aboutHeadline}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.5,
              }}
              className="flex flex-wrap gap-4 items-center pt-1"
            >
              <motion.a
                href="#projects"
                onClick={(e) =>
                  scrollToSection(e, '#projects')
                }
                whileHover={{
                  scale: 1.03,
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
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
                  gap-2.5
                  shadow-[0_10px_30px_rgba(47,93,80,0.22)]
                  hover:bg-[#244A40]
                  transition-colors
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
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
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
                  gap-2
                  shadow-sm
                  transition-colors
                "
              >
                <MessageSquare className="w-4 h-4 text-[#D97745]" />
                <span>Let's Talk</span>
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.65,
              }}
              className="pt-2 flex items-center gap-3 text-[#6B7280]"
            >
              <span className="text-xs font-mono uppercase tracking-wider mr-1">
                Connect:
              </span>

              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                whileHover={{
                  y: -3,
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
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
                  transition-colors
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
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
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
                  transition-colors
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
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
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
                  transition-colors
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
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
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
                  transition-colors
                  shadow-sm
                "
              >
                <Phone className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </div>

          {/* =====================================================
              RIGHT — AI / DATA WORKFLOW VISUAL
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 35,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.9,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {/* Outer glow */}
            <div
              className="
                absolute
                -inset-6
                rounded-[34px]
                bg-[#2F5D50]/5
                blur-2xl
              "
              aria-hidden="true"
            />

            {/* Main visual card */}
            <motion.div
              whileHover={{
                y: -5,
              }}
              transition={{
                duration: 0.3,
              }}
              className="
                relative
                rounded-[28px]
                bg-[#FCFAF6]/90
                border
                border-[#DDD6C8]
                shadow-[0_25px_70px_rgba(47,93,80,0.10)]
                backdrop-blur-sm
                overflow-hidden
              "
            >
              {/* Top bar */}
              <div className="
                flex
                items-center
                justify-between
                px-5
                py-4
                border-b
                border-[#DDD6C8]/80
              ">
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D97745]/70" />
                    <span className="w-2 h-2 rounded-full bg-[#4E8D66]/70" />
                    <span className="w-2 h-2 rounded-full bg-[#2F5D50]/50" />
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#6B7280]">
                    intelligent workflow
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[#4E8D66]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#4E8D66] opacity-60 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4E8D66]" />
                  </span>

                  <span className="text-[10px] font-mono uppercase tracking-wider">
                    Active
                  </span>
                </div>
              </div>

              {/* Workflow */}
              <div className="p-5 sm:p-7">
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-[#D97745] mb-2">
                    <Zap className="w-4 h-4" />

                    <span className="text-xs font-mono uppercase tracking-widest font-semibold">
                      My workflow
                    </span>
                  </div>

                  <h2 className="
                    font-display
                    text-2xl
                    sm:text-3xl
                    font-bold
                    text-[#1D2A26]
                  ">
                    From raw data
                    <br />
                    <span className="text-[#2F5D50]">
                      to useful outcomes.
                    </span>
                  </h2>
                </div>

                <div className="space-y-3">
                  {workflowSteps.map(
                    (
                      {
                        number,
                        label,
                        description,
                        icon: Icon,
                      },
                      index
                    ) => (
                      <motion.div
                        key={label}
                        initial={{
                          opacity: 0,
                          x: 15,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          duration: 0.5,
                          delay: 0.75 + index * 0.12,
                        }}
                        className="relative"
                      >
                        <div className="
                          group
                          flex
                          items-center
                          gap-3
                          sm:gap-4
                          p-3
                          rounded-2xl
                          border
                          border-[#DDD6C8]/80
                          bg-[#F5F1E8]/45
                          hover:bg-[#F5F1E8]
                          hover:border-[#2F5D50]/25
                          transition-colors
                        ">
                          {/* Number */}
                          <span className="
                            hidden
                            sm:block
                            w-7
                            text-[10px]
                            font-mono
                            text-[#9CA3AF]
                          ">
                            {number}
                          </span>

                          {/* Icon */}
                          <div className="
                            flex
                            items-center
                            justify-center
                            w-10
                            h-10
                            rounded-xl
                            bg-[#FCFAF6]
                            border
                            border-[#DDD6C8]
                            text-[#2F5D50]
                            shadow-sm
                            shrink-0
                          ">
                            <Icon className="w-4 h-4" />
                          </div>

                          {/* Text */}
                          <div className="min-w-0">
                            <div className="
                              text-sm
                              font-bold
                              tracking-wide
                              text-[#1D2A26]
                            ">
                              {label}
                            </div>

                            <div className="
                              text-xs
                              text-[#6B7280]
                              mt-0.5
                            ">
                              {description}
                            </div>
                          </div>

                          {/* Status */}
                          <div className="ml-auto">
                            <motion.div
                              animate={{
                                opacity: [0.35, 1, 0.35],
                              }}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                delay: index * 0.4,
                              }}
                              className="w-1.5 h-1.5 rounded-full bg-[#4E8D66]"
                            />
                          </div>
                        </div>

                        {/* Connector */}
                        {index < workflowSteps.length - 1 && (
                          <div className="
                            absolute
                            left-[29px]
                            sm:left-[48px]
                            top-[58px]
                            h-3
                            border-l
                            border-dashed
                            border-[#2F5D50]/20
                          " />
                        )}
                      </motion.div>
                    )
                  )}
                </div>

                {/* Bottom status */}
                <div className="
                  mt-5
                  pt-4
                  border-t
                  border-[#DDD6C8]/80
                  flex
                  items-center
                  justify-between
                ">
                  <span className="
                    text-[10px]
                    font-mono
                    uppercase
                    tracking-wider
                    text-[#6B7280]
                  ">
                    Analysis + Automation
                  </span>

                  <span className="
                    text-[10px]
                    font-mono
                    text-[#2F5D50]
                    font-semibold
                  ">
                    READY
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Floating mini badge */}
            <motion.div
              animate={{
                y: [0, -7, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="
                absolute
                -top-4
                -right-3
                sm:-right-5
                px-3
                py-2
                rounded-xl
                bg-[#2F5D50]
                text-white
                shadow-[0_10px_30px_rgba(47,93,80,0.22)]
                flex
                items-center
                gap-2
              "
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F5F1E8]" />

              <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">
                Build • Analyze • Automate
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
