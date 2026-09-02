import { motion } from 'motion/react';
import {
  GraduationCap,
  CheckCircle2,
} from 'lucide-react';
import { educationData } from '../data/portfolioData';

export default function Education() {
  return (
    <section
      id="education"
      className="relative z-10 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* --------------------------------------------------
            Section Header
        -------------------------------------------------- */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-12 max-w-3xl sm:mb-14"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-[#D97745]">
              06
            </span>

            <span className="h-px w-8 bg-[#DDD6C8]" />

            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#6B7280]">
              Education
            </span>
          </div>

          <h2 className="font-display text-3xl font-bold leading-tight tracking-[-0.025em] text-[#1D2A26] sm:text-4xl lg:text-5xl">
            Academic foundation.
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#4B5563]">
            A university foundation in statistics, quantitative analysis,
            and mathematical reasoning.
          </p>
        </motion.div>

        {/* --------------------------------------------------
            Education Records
        -------------------------------------------------- */}

        <div className="mx-auto max-w-5xl">
          {educationData.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border-y border-[#DDD6C8]"
            >
              {/* Main Education Information */}
              <div className="grid gap-8 py-8 md:grid-cols-[1fr_auto] md:items-start md:gap-12">
                
                <div className="flex items-start gap-4 sm:gap-5">
                  {/* Icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#DDD6C8] bg-[#FCFAF6] text-[#2F5D50]">
                    <GraduationCap className="h-5 w-5" />
                  </div>

                  <div>
                    {item.status && (
                      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D97745]">
                        {item.status}
                      </p>
                    )}

                    <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-[#1D2A26] sm:text-3xl">
                      {item.school}
                    </h3>

                    <p className="mt-2 text-base font-medium text-[#2F5D50] sm:text-lg">
                      {item.degree}
                    </p>
                  </div>
                </div>

                {/* Academic Focus */}
                <div className="md:min-w-[280px]">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
                    Academic focus
                  </p>

                  <div className="space-y-2.5">
                    {item.highlights.map((highlight, highlightIndex) => (
                      <div
                        key={highlightIndex}
                        className="flex items-start gap-2.5 text-sm leading-6 text-[#4B5563]"
                      >
                        <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-[#4E8D66]" />

                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
