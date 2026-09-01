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

        {/* Section Header */}
        <ScrollReveal y={20} duration={0.6}>
          <div className="flex items-center space-x-3 mb-4">
            <span className="p-1.5 rounded-lg bg-[#2F5D50]/10 border border-[#2F5D50]/20 text-[#2F5D50]">
              <Sparkles className="w-4 h-4 text-[#D97745]" />
            </span>

            <span className="text-xs font-mono uppercase tracking-widest text-[#2F5D50] font-semibold">
              ABOUT ME
            </span>
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
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1D2A26] leading-tight">
                {personalInfo.aboutHeadline}
              </h2>

              <div className="p-5 rounded-2xl bg-[#FCFAF6] border border-[#DDD6C8] shadow-sm space-y-3.5">
                <div className="flex items-center space-x-3 text-sm text-[#1D2A26]">
                  <MapPin className="w-4 h-4 text-[#2F5D50]" />
                  <span className="font-semibold">Location:</span>
                  <span className="text-[#4B5563]">
                    {personalInfo.location}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-sm text-[#1D2A26]">
                  <GraduationCap className="w-4 h-4 text-[#D97745]" />
                  <span className="font-semibold">Education:</span>
                  <span className="text-[#4B5563]">
                    BSc Statistics, University of Ilorin
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-sm text-[#1D2A26]">
                  <Cpu className="w-4 h-4 text-[#4E8D66]" />
                  <span className="font-semibold">Core Focus:</span>
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

        {/* Below: 4 Stat Cards */}
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
                  className="bg-[#FCFAF6] border border-[#DDD6C8] glass-card-hover p-6 rounded-[20px] relative overflow-hidden group shadow-sm"
                  whileHover={{
                    y: -4,
                    transition: {
                      duration: 0.2
                    }
                  }}
                >
                  {/* Glow accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2F5D50] to-[#D97745] opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-[#2F5D50]/10 border border-[#2F5D50]/20 text-[#2F5D50] group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280]">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="text-3xl sm:text-4xl font-bold font-display text-[#1D2A26] tracking-tight mb-1">
                    {stat.numericValue ? (
                      <AnimatedCounter
                        endValue={stat.numericValue}
                        suffix={stat.suffix}
                      />
                    ) : (
                      stat.value
                    )}
                  </div>

                  <div className="text-sm font-semibold text-[#1D2A26]">
                    {stat.label}
                  </div>

                  <div className="text-xs text-[#6B7280] mt-1">
                    {stat.subtext}
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
