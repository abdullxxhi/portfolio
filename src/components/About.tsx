import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  FolderGit2,
  Award,
  Cpu,
  CheckCircle2,
  Sparkles,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { personalInfo, statsData } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';

// Helper for animated counters
function AnimatedCounter({
  endValue,
  suffix = ''
}: {
  endValue?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && endValue) {
      let start = 0;
      const duration = 1500;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = endValue / steps;

      const timer = setInterval(() => {
        start += increment;

        if (start >= endValue) {
          setCount(endValue);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, endValue]);

  if (!endValue) return null;

  return (
    <span ref={ref} className="font-display font-bold">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const iconsMap: Record<string, any> = {
    FolderGit2,
    Award,
    Cpu,
    CheckCircle2
  };

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Enhanced Section Header */}
        <ScrollReveal y={20} duration={0.6}>
          <div className="mb-10 sm:mb-12">

            {/* Section Label + Number */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#D97745]">
                  01
                </span>

                <span className="text-[#B8B0A2] text-xs">
                  /
                </span>

                <span className="p-1.5 rounded-lg bg-[#2F5D50]/10 border border-[#2F5D50]/20">
                  <Sparkles className="w-3.5 h-3.5 text-[#D97745]" />
                </span>
              </div>

              <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-[#2F5D50]/40 to-transparent" />

              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#2F5D50] font-semibold">
                ABOUT ME
              </span>
            </div>

            {/* Heading Accent */}
            <div className="relative">
              <div className="absolute -left-3 sm:-left-4 top-1 bottom-1 w-1 rounded-full bg-gradient-to-b from-[#2F5D50] via-[#4E8D66] to-[#D97745]" />

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#1D2A26] leading-tight max-w-4xl">
                A little about{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F5D50] to-[#D97745]">
                  what I do.
                </span>
              </h2>
            </div>

            {/* Small Supporting Line */}
            <div className="mt-5 flex items-center gap-3">
              <div className="w-8 h-px bg-[#D97745]" />

              <p className="text-xs sm:text-sm text-[#6B7280] font-mono tracking-wide">
                BUILD • AUTOMATE • ANALYZE
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Two-Column Top Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Headline */}
          <ScrollReveal
            y={30}
            duration={0.65}
            delay={0.05}
            className="lg:col-span-6"
          >
            <div className="space-y-6">

              <h3 className="text-3xl sm:text-4xl font-bold font-display text-[#1D2A26] leading-tight">
                {personalInfo.aboutHeadline}
              </h3>

              <div className="p-5 rounded-2xl bg-[#FCFAF6] border border-[#DDD6C8] shadow-sm space-y-3.5">

                <div className="flex items-center space-x-3 text-sm text-[#1D2A26]">
                  <MapPin className="w-4 h-4 text-[#2F5D50]" />

                  <span className="font-semibold">
                    Location:
                  </span>

                  <span className="text-[#4B5563]">
                    {personalInfo.location}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-sm text-[#1D2A26]">
                  <GraduationCap className="w-4 h-4 text-[#D97745]" />

                  <span className="font-semibold">
                    Education:
                  </span>

                  <span className="text-[#4B5563]">
                    BSc Statistics, University of Ilorin
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-sm text-[#1D2A26]">
                  <Cpu className="w-4 h-4 text-[#4E8D66]" />

                  <span className="font-semibold">
                    Core Focus:
                  </span>

                  <span className="text-[#4E8D66] font-mono text-xs font-semibold">
                    {personalInfo.focusArea}
                  </span>
                </div>

              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Bio Details */}
          <ScrollReveal
            y={30}
            duration={0.65}
            delay={0.15}
            className="lg:col-span-6"
          >
            <div className="space-y-4 text-[#4B5563] text-base leading-relaxed">

              <p>
                I am an{' '}
                <strong className="text-[#1D2A26]">
                  AI Automation Developer & Data Analyst
                </strong>{' '}
                with a strong background in Statistics and a passion for
                constructing intelligent solutions that simplify complex
                operational workflows.
              </p>

              <p>
                I specialize in designing{' '}
                <strong className="text-[#1D2A26]">
                  Google Workspace automations
                </strong>
                , Google Apps Script serverless routines, custom PDF
                generators, and data-driven analytical models that help
                businesses save hundreds of manual hours.
              </p>

              <p>
                My analytical experience spans Microsoft Excel, SQL, Power BI,
                Google Apps Script, and AI-powered workflow automation. I enjoy
                turning raw data into interactive dashboards and combining
                statistical precision with modern automation.
              </p>

            </div>
          </ScrollReveal>
        </div>

        {/* Enhanced Stat Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {statsData.map((stat, idx) => {
            const IconComponent =
              iconsMap[stat.iconName] || FolderGit2;

            return (
              <ScrollReveal
                key={stat.id}
                y={35}
                duration={0.55}
                delay={idx * 0.1}
              >
                <motion.div
                  className="relative overflow-hidden bg-[#FCFAF6] border border-[#DDD6C8] p-6 rounded-[20px] shadow-sm group cursor-default"
                  whileHover={{
                    y: -6,
                    scale: 1.015,
                    transition: {
                      duration: 0.22,
                      ease: 'easeOut'
                    }
                  }}
                  whileTap={{
                    scale: 0.985
                  }}
                >

                  {/* Soft animated background glow */}
                  <motion.div
                    className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-[#2F5D50]/5 blur-2xl pointer-events-none"
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.4, 0.7, 0.4]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: 'mirror',
                      delay: idx * 0.5,
                      ease: 'easeInOut'
                    }}
                  />

                  {/* Bottom decorative glow */}
                  <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-[#D97745]/5 blur-2xl pointer-events-none" />

                  {/* Animated top accent */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2F5D50] via-[#4E8D66] to-[#D97745] origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      delay: idx * 0.1 + 0.2,
                      ease: 'easeOut'
                    }}
                  />

                  {/* Card Content */}
                  <div className="relative z-10">

                    {/* Icon + Number */}
                    <div className="flex items-center justify-between mb-5">

                      <motion.div
                        className="relative p-3 rounded-2xl bg-[#2F5D50]/10 border border-[#2F5D50]/20 text-[#2F5D50]"
                        whileHover={{
                          scale: 1.1,
                          rotate: 3
                        }}
                        whileTap={{
                          scale: 0.95
                        }}
                        transition={{
                          duration: 0.2
                        }}
                      >
                        {/* Icon glow */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-[#2F5D50]/10 blur-md"
                          animate={{
                            opacity: [0.2, 0.5, 0.2]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: idx * 0.4,
                            ease: 'easeInOut'
                          }}
                        />

                        <IconComponent className="relative z-10 w-6 h-6" />
                      </motion.div>

                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280]">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Number */}
                    <motion.div
                      className="text-3xl sm:text-4xl font-bold font-display text-[#1D2A26] tracking-tight mb-1"
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: idx * 0.1 + 0.25
                      }}
                    >
                      {stat.numericValue ? (
                        <AnimatedCounter
                          endValue={stat.numericValue}
                          suffix={stat.suffix}
                        />
                      ) : (
                        stat.value
                      )}
                    </motion.div>

                    {/* Label */}
                    <div className="text-sm font-semibold text-[#1D2A26]">
                      {stat.label}
                    </div>

                    {/* Supporting Text */}
                    <div className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                      {stat.subtext}
                    </div>

                    {/* Bottom micro detail */}
                    <div className="mt-5 flex items-center gap-2">
                      <motion.div
                        className="h-1.5 w-1.5 rounded-full bg-[#4E8D66]"
                        animate={{
                          scale: [1, 1.35, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: idx * 0.3,
                          ease: 'easeInOut'
                        }}
                      />

                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#9A9388]">
                        ACTIVE
                      </span>
                    </div>

                  </div>

                  {/* Hover border */}
                  <motion.div
                    className="absolute inset-0 rounded-[20px] border border-[#2F5D50]/0 pointer-events-none"
                    whileHover={{
                      borderColor: 'rgba(47, 93, 80, 0.25)'
                    }}
                    transition={{
                      duration: 0.2
                    }}
                  />

                </motion.div>
              </ScrollReveal>
            );
          })}

        </div>

      </div>
    </section>
  );
}
