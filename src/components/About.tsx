import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  FolderGit2,
  Award,
  Cpu,
  CheckCircle2,
  MapPin,
  GraduationCap,
} from 'lucide-react';
import { personalInfo, statsData } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';

/* --------------------------------------------------
   Animated Counter
-------------------------------------------------- */

function AnimatedCounter({
  endValue,
  suffix = '',
}: {
  endValue?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || !endValue) return;

    let start = 0;
    const duration = 1200;
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
  }, [isInView, endValue]);

  if (!endValue) return null;

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* --------------------------------------------------
   About Section
-------------------------------------------------- */

export default function About() {
  const iconsMap: Record<string, any> = {
    FolderGit2,
    Award,
    Cpu,
    CheckCircle2,
  };

  return (
    <section
      id="about"
      className="relative z-10 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* --------------------------------------------------
            Section Header
        -------------------------------------------------- */}

        <ScrollReveal y={18} duration={0.55}>
          <div className="mb-12 max-w-3xl sm:mb-14">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-[#D97745]">
                01
              </span>

              <span className="h-px w-8 bg-[#DDD6C8]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#6B7280]">
                About me
              </span>
            </div>

            <h2 className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-[-0.025em] text-[#1D2A26] sm:text-4xl lg:text-5xl">
              A little about{' '}
              <span className="text-[#2F5D50]">
                what I do.
              </span>
            </h2>
          </div>
        </ScrollReveal>

        {/* --------------------------------------------------
            Introduction
        -------------------------------------------------- */}

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Left */}
          <ScrollReveal
            y={24}
            duration={0.6}
            delay={0.05}
            className="lg:col-span-6"
          >
            <div>
              <h3 className="max-w-xl font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-[#1D2A26] sm:text-3xl">
                {personalInfo.aboutHeadline}
              </h3>

              {/* Personal Details */}
              <div className="mt-8 border-t border-[#DDD6C8]">
                <div className="flex items-start gap-4 border-b border-[#DDD6C8] py-4">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#2F5D50]" />

                  <div>
                    <p className="text-xs font-semibold text-[#1D2A26]">
                      Location
                    </p>

                    <p className="mt-1 text-sm text-[#6B7280]">
                      {personalInfo.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-b border-[#DDD6C8] py-4">
                  <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-[#D97745]" />

                  <div>
                    <p className="text-xs font-semibold text-[#1D2A26]">
                      Education
                    </p>

                    <p className="mt-1 text-sm text-[#6B7280]">
                      BSc Statistics, University of Ilorin
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-4">
                  <Cpu className="mt-0.5 h-4 w-4 shrink-0 text-[#4E8D66]" />

                  <div>
                    <p className="text-xs font-semibold text-[#1D2A26]">
                      Core focus
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#2F5D50]">
                      {personalInfo.focusArea}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right */}
          <ScrollReveal
            y={24}
            duration={0.6}
            delay={0.12}
            className="lg:col-span-6"
          >
            <div className="max-w-2xl space-y-5 text-base leading-7 text-[#4B5563]">
              <p>
                I am a{' '}
                <strong className="font-semibold text-[#1D2A26]">
                  Data Analyst & AI Automation Developer
                </strong>{' '}
                with a strong background in Statistics and a passion for
                constructing intelligent solutions that simplify complex
                operational workflows.
              </p>

              <p>
                I specialize in designing{' '}
                <strong className="font-semibold text-[#1D2A26]">
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

        {/* --------------------------------------------------
            Statistics
        -------------------------------------------------- */}

        <ScrollReveal
          y={20}
          duration={0.55}
          delay={0.1}
        >
          <div className="mt-16 grid grid-cols-2 border-y border-[#DDD6C8] lg:grid-cols-4">
            {statsData.map((stat, index) => {
              const IconComponent =
                iconsMap[stat.iconName] || FolderGit2;

              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`
                    group
                    relative
                    px-5
                    py-7
                    sm:px-6
                    sm:py-8
                    ${
                      index < statsData.length - 1
                        ? 'border-r border-[#DDD6C8]'
                        : ''
                    }
                    ${
                      index >= 2
                        ? 'border-t border-[#DDD6C8] lg:border-t-0'
                        : ''
                    }
                  `}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <IconComponent className="h-4 w-4 text-[#2F5D50] transition-transform duration-200 group-hover:-translate-y-0.5" />

                    <span className="font-mono text-[10px] text-[#A8A095]">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="font-display text-3xl font-bold tracking-[-0.025em] text-[#1D2A26] sm:text-4xl">
                    {stat.numericValue ? (
                      <AnimatedCounter
                        endValue={stat.numericValue}
                        suffix={stat.suffix}
                      />
                    ) : (
                      stat.value
                    )}
                  </div>

                  <p className="mt-1.5 text-sm font-semibold text-[#1D2A26]">
                    {stat.label}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#6B7280]">
                    {stat.subtext}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
