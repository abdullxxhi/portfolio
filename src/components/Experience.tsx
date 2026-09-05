import { motion } from 'motion/react';
import { Briefcase, Calendar, CheckCircle2, Building2 } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative z-10 bg-[#F5F1E8] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-16 max-w-3xl"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D97745]">
              05
            </span>

            <span className="h-px w-8 bg-[#DDD6C8]" />

            <span className="text-[10px] uppercase tracking-[0.16em] text-[#6B7280]">
              Experience
            </span>
          </div>

          <h2 className="font-display text-3xl font-bold leading-tight tracking-[-0.025em] text-[#1D2A26] sm:text-4xl lg:text-5xl">
            Practical experience.
            <span className="block text-[#2F5D50]">
              Built through real work.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#4B5563]">
            Hands-on technical work building real-world automation systems
            and data analytics solutions.
          </p>
        </motion.div>

        {/* Editorial Timeline */}
        <div className="relative mx-auto max-w-6xl">
          {/* Timeline line */}
          <div
            className="absolute bottom-0 left-[15px] top-0 hidden w-px bg-[#DDD6C8] lg:block"
            aria-hidden="true"
          />

          <div className="space-y-0">
            {experienceData.map((exp, idx) => (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative border-t border-[#DDD6C8] py-9 sm:py-11 lg:border-t-0 lg:pl-14"
              >
                {/* Timeline marker */}
                <div
                  className="absolute left-0 top-10 hidden h-[31px] w-[31px] items-center justify-center rounded-full border border-[#DDD6C8] bg-[#F5F1E8] lg:flex"
                  aria-hidden="true"
                >
                  <span className="h-2 w-2 rounded-full bg-[#2F5D50] transition-all duration-300 group-hover:h-2.5 group-hover:w-2.5 group-hover:bg-[#D97745]" />
                </div>

                {/* Experience row */}
                <div className="grid gap-7 lg:grid-cols-[220px_1fr] lg:gap-12">
                  {/* Metadata */}
                  <div className="flex flex-wrap items-start gap-x-5 gap-y-3 lg:block">
                    <div className="flex items-center gap-2 text-sm font-medium text-[#4E8D66]">
                      <Calendar className="h-4 w-4 shrink-0" />
                      <span>{exp.period}</span>
                    </div>

                    <span className="inline-flex w-fit rounded-full border border-[#DDD6C8] bg-[#FCFAF6] px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-[#6B7280] lg:mt-4">
                      {exp.type}
                    </span>
                  </div>

                  {/* Main Content */}
                  <div className="min-w-0">
                    {/* Role */}
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#DDD6C8] bg-[#FCFAF6] text-[#2F5D50] lg:hidden">
                        <Briefcase className="h-4 w-4" />
                      </div>

                      <div>
                        <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-[#1D2A26] transition-colors duration-200 group-hover:text-[#2F5D50] sm:text-3xl">
                          {exp.role}
                        </h3>

                        <div className="mt-2 flex items-center gap-2 text-sm font-medium text-[#2F5D50]">
                          <Building2 className="h-4 w-4 shrink-0" />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mt-7 max-w-3xl border-l border-[#DDD6C8] pl-5 sm:pl-6">
                      <div className="space-y-4">
                        {exp.achievements.map((achievement, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 text-sm leading-6 text-[#4B5563]"
                          >
                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#4E8D66]" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Closing timeline line */}
          <div className="hidden border-t border-[#DDD6C8] lg:block" />
        </div>
      </div>
    </section>
  );
}
