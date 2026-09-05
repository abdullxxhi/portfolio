import React, { useEffect, useRef, useState } from 'react';
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
  TrendingUp,
  Sparkles,
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

  const [activeStep, setActiveStep] = useState(0);
  const workflowRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const updateActiveStep = () => {
      const element = workflowRef.current;

      if (!element) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const activationStart = viewportHeight * 0.82;
      const activationEnd = viewportHeight * 0.18;

      const distance = activationStart - activationEnd;
      const progress =
        distance > 0
          ? (activationStart - rect.top) / distance
          : 0;

      const clampedProgress = Math.min(
        1,
        Math.max(0, progress)
      );

      const nextStep = Math.min(
        3,
        Math.floor(clampedProgress * 4)
      );

      setActiveStep(nextStep);
    };

    updateActiveStep();

    window.addEventListener('scroll', updateActiveStep, {
      passive: true,
    });

    window.addEventListener('resize', updateActiveStep);

    return () => {
      window.removeEventListener('scroll', updateActiveStep);
      window.removeEventListener('resize', updateActiveStep);
    };
  }, []);

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
    { x: 7, y: 72 },
    { x: 22, y: 59 },
    { x: 36, y: 38 },
    { x: 51, y: 51 },
    { x: 66, y: 30 },
    { x: 80, y: 17 },
    { x: 93, y: 27 },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-[88vh] items-center overflow-hidden pb-16 pt-28"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">

          {/* LEFT — INTRODUCTION */}

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
              <motion.span
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.65, 1, 0.65],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="h-1.5 w-1.5 rounded-full bg-[#4E8D66]"
              />

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

              <motion.span
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  ease: 'linear',
                }}
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
                ease: [0.16, 1, 1, 1],
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
                  group
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
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#244A40]
                "
              >
                <span>View Projects</span>

                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                onClick={(event) =>
                  scrollToSection(event, '#contact')
                }
                className="
                  group
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
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
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

          {/* RIGHT — HERO VISUAL */}

          <motion.div
            ref={workflowRef}
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
                shadow-[0_24px_70px_-45px_rgba(29,42,38,0.45)]
              "
            >
              {/* DATA VISUAL */}

              <div className="relative border-b border-[#DDD6C8] px-5 pb-6 pt-6 sm:px-6 sm:pb-7">

                {/* Visual header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#6B7280]">
                        Data in motion
                      </p>

                      <span className="h-px w-5 bg-[#DDD6C8]" />

                      <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#4E8D66]">
                        Live
                      </span>
                    </div>

                    <p className="mt-2 max-w-[250px] font-display text-xl font-bold tracking-tight text-[#1D2A26] sm:text-2xl">
                      From information
                      <br />
                      <span className="text-[#2F5D50]">
                        to insight.
                      </span>
                    </p>
                  </div>

                  {/* Live indicator */}
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#DDD6C8] bg-[#F5F1E8]">
                    <motion.span
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.45, 0, 0.45],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                      className="absolute h-2 w-2 rounded-full bg-[#4E8D66]"
                    />

                    <span className="relative h-2 w-2 rounded-full bg-[#4E8D66]" />
                  </div>
                </div>

                {/* Main visualization */}
                <div className="relative mt-7 h-44 w-full">

                  {/* Background field */}
                  <div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: `
                        radial-gradient(
                          circle at 75% 25%,
                          rgba(47,93,80,0.07),
                          transparent 34%
                        ),
                        radial-gradient(
                          circle at 20% 80%,
                          rgba(217,119,69,0.055),
                          transparent 32%
                        )
                      `,
                    }}
                  />

                  {/* Reference lines */}
                  <div className="absolute left-0 right-0 top-1/4 border-t border-dashed border-[#DDD6C8]/70" />
                  <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-[#DDD6C8]/70" />
                  <div className="absolute left-0 right-0 top-3/4 border-t border-dashed border-[#DDD6C8]/70" />

                  {/* Baseline */}
                  <div className="absolute bottom-1 left-0 right-0 h-px bg-[#DDD6C8]" />

                  {/* Y-axis labels */}
                  <div className="absolute right-0 top-0 flex flex-col items-end gap-[31px]">
                    <span className="font-mono text-[7px] text-[#B0A99F]">
                      HIGH
                    </span>
                    <span className="font-mono text-[7px] text-[#B0A99F]">
                      MID
                    </span>
                    <span className="font-mono text-[7px] text-[#B0A99F]">
                      LOW
                    </span>
                  </div>

                  {/* Chart */}
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full overflow-visible"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="heroChartLine"
                        x1="0"
                        y1="1"
                        x2="1"
                        y2="0"
                      >
                        <stop
                          offset="0%"
                          stopColor="#2F5D50"
                        />
                        <stop
                          offset="72%"
                          stopColor="#2F5D50"
                        />
                        <stop
                          offset="100%"
                          stopColor="#D97745"
                        />
                      </linearGradient>

                      <linearGradient
                        id="heroChartArea"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#2F5D50"
                          stopOpacity="0.12"
                        />
                        <stop
                          offset="100%"
                          stopColor="#2F5D50"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    {/* Filled area */}
                    <motion.path
                      d="
                        M 7 72
                        C 14 68, 18 61, 22 59
                        C 28 55, 31 43, 36 38
                        C 41 34, 46 50, 51 51
                        C 57 52, 61 35, 66 30
                        C 72 25, 76 20, 80 17
                        C 85 15, 89 26, 93 27
                        L 93 100
                        L 7 100
                        Z
                      "
                      fill="url(#heroChartArea)"
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        duration: 1.4,
                        delay: 0.7,
                      }}
                    />

                    {/* Main line */}
                    <motion.path
                      d="
                        M 7 72
                        C 14 68, 18 61, 22 59
                        C 28 55, 31 43, 36 38
                        C 41 34, 46 50, 51 51
                        C 57 52, 61 35, 66 30
                        C 72 25, 76 20, 80 17
                        C 85 15, 89 26, 93 27
                      "
                      fill="none"
                      stroke="url(#heroChartLine)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      initial={{
                        pathLength: 0,
                      }}
                      animate={{
                        pathLength: 1,
                      }}
                      transition={{
                        duration: 2.4,
                        delay: 0.35,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />

                    {/* Secondary analytical line */}
                    <motion.path
                      d="
                        M 7 72
                        C 20 69, 29 61, 38 58
                        C 48 55, 57 58, 66 50
                        C 76 42, 84 34, 93 27
                      "
                      fill="none"
                      stroke="#D97745"
                      strokeWidth="0.8"
                      strokeDasharray="2 3"
                      strokeLinecap="round"
                      initial={{
                        pathLength: 0,
                        opacity: 0,
                      }}
                      animate={{
                        pathLength: 1,
                        opacity: 0.6,
                      }}
                      transition={{
                        duration: 1.8,
                        delay: 1.2,
                        ease: 'easeOut',
                      }}
                    />

                    {/* Moving signal */}
                    <circle
                      r="1.8"
                      fill="#D97745"
                    >
                      <animateMotion
                        dur="5s"
                        begin="0s"
                        repeatCount="indefinite"
                        path="
                          M 7 72
                          C 14 68, 18 61, 22 59
                          C 28 55, 31 43, 36 38
                          C 41 34, 46 50, 51 51
                          C 57 52, 61 35, 66 30
                          C 72 25, 76 20, 80 17
                          C 85 15, 89 26, 93 27
                        "
                      />
                    </circle>
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
                        duration: 0.4,
                        delay: 0.65 + index * 0.16,
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

                  {/* Peak annotation */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 2,
                    }}
                    className="absolute left-[70%] top-[3%]"
                  >
                    <div className="flex items-center gap-1.5 rounded-md border border-[#DDD6C8] bg-[#FCFAF6] px-2 py-1 shadow-sm">
                      <TrendingUp className="h-3 w-3 text-[#4E8D66]" />

                      <span className="font-mono text-[8px] font-semibold text-[#2F5D50]">
                        +24.8%
                      </span>
                    </div>
                  </motion.div>

                  {/* Insight marker */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 2.3,
                    }}
                    className="absolute right-[4%] top-[31%] flex items-center gap-1.5"
                  >
                    <Sparkles className="h-3 w-3 text-[#D97745]" />

                    <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-[#2F5D50]">
                      Insight
                    </span>
                  </motion.div>
                </div>

                {/* Visualization footer */}
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#9A9388]">
                      Raw data
                    </span>

                    <span className="mx-2 text-[#DDD6C8]">
                      →
                    </span>

                    <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#2F5D50]">
                      Pattern
                    </span>
                  </div>

                  <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#D97745]">
                    Useful outcome
                  </span>
                </div>
              </div>

              {/* Workflow Header */}
              <div className="border-b border-[#DDD6C8] px-5 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#6B7280]">
                    How I work
                  </p>

                  <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#A8A095]">
                    4 stages
                  </span>
                </div>

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
                    ) => {
                      const isActive = index === activeStep;
                      const isCompleted = index < activeStep;

                      return (
                        <motion.div
                          key={label}
                          initial={{
                            opacity: 0,
                            y: 8,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.4,
                            delay: 0.5 + index * 0.08,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <motion.div
                            animate={{
                              backgroundColor: isActive
                                ? '#F5F1E8'
                                : 'rgba(0,0,0,0)',
                            }}
                            transition={{
                              duration: 0.3,
                              ease: 'easeOut',
                            }}
                            className="relative flex items-center gap-3 rounded-lg px-2 py-3 sm:gap-4"
                          >
                            {/* Active indicator */}
                            <motion.span
                              animate={{
                                opacity: isActive ? 1 : 0,
                                scaleY: isActive ? 1 : 0.5,
                              }}
                              transition={{
                                duration: 0.25,
                              }}
                              className="absolute bottom-2 left-0 top-2 w-0.5 origin-center rounded-full bg-[#D97745]"
                            />

                            {/* Number */}
                            <motion.span
                              animate={{
                                color: isActive
                                  ? '#D97745'
                                  : isCompleted
                                    ? '#2F5D50'
                                    : '#A8A095',
                              }}
                              transition={{
                                duration: 0.25,
                              }}
                              className="w-6 shrink-0 font-mono text-[10px] font-medium"
                            >
                              {number}
                            </motion.span>

                            {/* Icon */}
                            <motion.div
                              animate={{
                                backgroundColor: isActive
                                  ? '#2F5D50'
                                  : '#F5F1E8',
                                color: isActive
                                  ? '#FFFFFF'
                                  : '#2F5D50',
                                borderColor: isActive
                                  ? '#2F5D50'
                                  : '#DDD6C8',
                                scale: isActive ? 1.04 : 1,
                              }}
                              transition={{
                                duration: 0.3,
                                ease: 'easeOut',
                              }}
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
                            >
                              <Icon className="h-4 w-4" />
                            </motion.div>

                            {/* Text */}
                            <div className="min-w-0">
                              <motion.p
                                animate={{
                                  color: isActive
                                    ? '#1D2A26'
                                    : '#4B5563',
                                }}
                                transition={{
                                  duration: 0.25,
                                }}
                                className="text-sm font-semibold"
                              >
                                {label}
                              </motion.p>

                              <motion.p
                                animate={{
                                  color: isActive
                                    ? '#4B5563'
                                    : '#6B7280',
                                }}
                                transition={{
                                  duration: 0.25,
                                }}
                                className="mt-0.5 text-xs"
                              >
                                {description}
                              </motion.p>
                            </div>

                            {/* Active status */}
                            <motion.span
                              initial={false}
                              animate={{
                                opacity: isActive ? 1 : 0,
                                x: isActive ? 0 : 4,
                              }}
                              transition={{
                                duration: 0.25,
                              }}
                              className="ml-auto hidden shrink-0 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-[#D97745] sm:block"
                            >
                              Active
                            </motion.span>
                          </motion.div>

                          {/* Connector */}
                          {index < workflowSteps.length - 1 && (
                            <div className="relative ml-[21px] h-1 border-l border-dashed border-[#DDD6C8]">
                              <motion.div
                                animate={{
                                  opacity:
                                    index < activeStep ? 1 : 0,
                                }}
                                transition={{
                                  duration: 0.25,
                                }}
                                className="absolute inset-y-0 left-[-1px] border-l border-solid border-[#2F5D50]"
                              />
                            </div>
                          )}
                        </motion.div>
                      );
                    }
                  )}
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between border-t border-[#DDD6C8] pt-4">
                  <span className="text-[10px] uppercase tracking-[0.14em] text-[#9A9388]">
                    Data Analysis + Automation
                  </span>

                  <motion.span
                    key={activeStep}
                    initial={{
                      opacity: 0,
                      y: 3,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2F5D50]"
                  >
                    {activeStep === 0 && 'Collecting'}
                    {activeStep === 1 && 'Analyzing'}
                    {activeStep === 2 && 'Automating'}
                    {activeStep === 3 && 'Ready'}
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
