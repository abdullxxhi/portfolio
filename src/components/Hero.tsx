import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  MessageSquare,
  Github,
  Linkedin,
  Mail,
  Phone,
  Database,
  BarChart3,
  Workflow,
  CheckCircle2,
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
            (previous) => (previous + 1) % roles.length
          );
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();

    const target = document.querySelector(href);

    if (target) {
      const navOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;

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

  const dataPoints = [
    { x: 10, y: 70 },
    { x: 32, y: 35 },
    { x: 54, y: 58 },
    { x: 76, y: 24 },
    { x: 91, y: 42 },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-[88vh] items-center overflow-hidden pb-16 pt-28"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">

          {/* --------------------------------------------------
              LEFT — INTRODUCTION
          -------------------------------------------------- */}

          <div className="space-y-7">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center gap-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#4E8D66]" />

              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#6B7280]">
                Data Analysis & AI Automation
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h1
                className="
                  max-w-3xl
                  font-display
                  text-[2.75rem]
                  font-bold
                  leading-[1.02]
                  tracking-[-0.045em]
                  text-[#1D2A26]
                  sm:text-5xl
                  lg:text-[4.5rem]
                "
              >
                Hello, I'm
                <br />
                <span className="text-[#2F5D50]">
                  {personalInfo.name}
                </span>
              </h1>
            </motion.div>

            {/* Dynamic Role */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex h-8 items-center gap-2"
            >
              <span className="font-mono text-sm font-semibold text-[#D97745]">
                &gt;
              </span>

              <span className="font-mono text-base font-medium text-[#1D2A26] sm:text-lg">
                {displayedText}
              </span>

              <span
                className="h-5 w-px bg-[#D97745]"
                aria-hidden="true"
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                max-w-xl
                text-base
                leading-7
                text-[#4B5563]
                sm:text-lg
              "
            >
              {personalInfo.aboutHeadline}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.32,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <a
                href="#projects"
                onClick={(event) =>
                  scrollToSection(event, '#projects')
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-[#2F5D50]
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-colors
                  duration-200
                  hover:bg-[#244A40]
                "
              >
                <span>View Projects</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#contact"
                onClick={(event) =>
                  scrollToSection(event, '#contact')
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-[#DDD6C8]
                  bg-[#FCFAF6]
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-[#1D2A26]
                  transition-colors
                  duration-200
                  hover:border-[#2F5D50]
                  hover:text-[#2F5D50]
                "
              >
                <MessageSquare className="h-4 w-4 text-[#D97745]" />
                <span>Let's Talk</span>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.42,
              }}
              className="flex items-center gap-4 pt-1"
            >
              <span className="text-xs text-[#9A9388]">
                Connect
              </span>

              <span className="h-px w-6 bg-[#DDD6C8]" />

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="
                  text-[#6B7280]
                  transition-colors
                  duration-200
                  hover:text-[#2F5D50]
                "
              >
                <Github className="h-4 w-4" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="
                  text-[#6B7280]
                  transition-colors
                  duration-200
                  hover:text-[#2F5D50]
                "
              >
                <Linkedin className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={onCopyEmail}
                aria-label="Copy email"
                title="Copy email"
                className="
                  text-[#6B7280]
                  transition-colors
                  duration-200
                  hover:text-[#2F5D50]
                "
              >
                <Mail className="h-4 w-4" />
              </button>

              <a
                href={`tel:${personalInfo.phone}`}
                aria-label="Call phone"
                title={personalInfo.phone}
                className="
                  text-[#6B7280]
                  transition-colors
                  duration-200
                  hover:text-[#2F5D50]
                "
              >
                <Phone className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          {/* --------------------------------------------------
              RIGHT — DATA PATH + WORKFLOW
          -------------------------------------------------- */}

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative"
          >
            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-[#DDD6C8]
                bg-[#FCFAF6]
              "
            >
              {/* Data Path Visual */}
              <div className="relative border-b border-[#DDD6C8] px-5 pb-5 pt-6 sm:px-6 sm:pb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#6B7280]">
                      Data in motion
                    </p>

                    <p className="mt-2 max-w-[220px] font-display text-xl font-bold tracking-tight text-[#1D2A26] sm:text-2xl">
                      From information
                      <br />
                      <span className="text-[#2F5D50]">
                        to insight.
                      </span>
                    </p>
                  </div>

                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.8,
                      ease: 'easeOut',
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DDD6C8] bg-[#F5F1E8]"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#4E8D66]" />
                  </motion.div>
                </div>

                {/* Visualization */}
                <div className="relative mt-5 h-32 w-full">
                  {/* Baseline */}
                  <div className="absolute bottom-2 left-0 right-0 h-px bg-[#DDD6C8]" />

                  {/* Subtle reference lines */}
                  <div className="absolute left-0 right-0 top-1/4 border-t border-dashed border-[#DDD6C8]/60" />

                  <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-[#DDD6C8]/60" />

                  <div className="absolute left-0 right-0 top-3/4 border-t border-dashed border-[#DDD6C8]/60" />

                  {/* Data path */}
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full overflow-visible"
                    aria-hidden="true"
                  >
                    {/* Main rising path */}
                    <motion.path
                      d="M 10 70 C 18 60, 24 43, 32 35 C 39 29, 47 51, 54 58 C 61 64, 69 36, 76 24 C 82 17, 87 36, 91 42"
                      fill="none"
                      stroke="#2F5D50"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      initial={{
                        pathLength: 0,
                      }}
                      animate={{
                        pathLength: 1,
                      }}
                      transition={{
                        duration: 2.2,
                        delay: 0.45,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* Secondary analytical path */}
                    <motion.path
                      d="M 10 70 C 25 63, 39 53, 54 58 C 68 61, 80 42, 91 42"
                      fill="none"
                      stroke="#D97745"
                      strokeWidth="0.8"
                      strokeLinecap="round"
                      strokeDasharray="2 3"
                      initial={{
                        pathLength: 0,
                        opacity: 0,
                      }}
                      animate={{
                        pathLength: 1,
                        opacity: 0.65,
                      }}
                      transition={{
                        duration: 1.8,
                        delay: 1.1,
                        ease: 'easeOut',
                      }}
                    />
                  </svg>

                  {/* Data points */}
                  {dataPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        scale: 0,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.35,
                        delay: 0.65 + index * 0.3,
                        ease: 'easeOut',
                      }}
                      className={`absolute h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-[#FCFAF6] ${
                        index === dataPoints.length - 1
                          ? 'bg-[#D97745]'
                          : 'bg-[#2F5D50]'
                      }`}
                      style={{
                        left: `${point.x}%`,
                        bottom: `${point.y}%`,
                      }}
                    />
                  ))}

                  {/* Small insight label */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 2.1,
                      ease: 'easeOut',
                    }}
                    className="absolute right-0 top-0 rounded-md border border-[#DDD6C8] bg-[#F5F1E8] px-2 py-1"
                  >
                    <span className="font-mono text-[8px] font-semibold text-[#2F5D50]">
                      INSIGHT
                    </span>
                  </motion.div>
                </div>

                {/* Visualization footer */}
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#9A9388]">
                    Raw data
                  </span>

                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#D97745]">
                    Useful outcome
                  </span>
                </div>
              </div>

              {/* Workflow Header */}
              <div className="border-b border-[#DDD6C8] px-5 py-4 sm:px-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#6B7280]">
                  How I work
                </p>

                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#1D2A26] sm:text-3xl">
                  From raw data
                  <br />
                  <span className="text-[#2F5D50]">
                    to useful outcomes.
                  </span>
                </h2>
              </div>

              {/* Workflow Steps */}
              <div className="p-5 sm:p-6">
                <div className="space-y-1">
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
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.5 + index * 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <div className="flex items-center gap-3 rounded-lg px-2 py-3 transition-colors duration-200 hover:bg-[#F5F1E8] sm:gap-4">
                          {/* Number */}
                          <span className="w-6 shrink-0 font-mono text-[10px] text-[#A8A095]">
                            {number}
                          </span>

                          {/* Icon */}
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#DDD6C8] bg-[#F5F1E8] text-[#2F5D50]">
                            <Icon className="h-4 w-4" />
                          </div>

                          {/* Text */}
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#1D2A26]">
                              {label}
                            </p>

                            <p className="mt-0.5 text-xs text-[#6B7280]">
                              {description}
                            </p>
                          </div>
                        </div>

                        {index < workflowSteps.length - 1 && (
                          <div className="ml-[21px] h-1 border-l border-dashed border-[#DDD6C8]" />
                        )}
                      </motion.div>
                    )
                  )}
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between border-t border-[#DDD6C8] pt-4">
                  <span className="text-[10px] uppercase tracking-[0.14em] text-[#9A9388]">
                    Data Analysis + Automation
                  </span>

                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2F5D50]">
                    Ready
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
