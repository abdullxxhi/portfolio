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
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#2F5D50]">
              05 / Experience
            </span>
            <span className="h-px w-10 bg-[#DDD6C8]" />
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight text-[#1D2A26] sm:text-4xl">
            Practical experience.
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-[#4B5563]">
            Hands-on technical work building real-world automation systems
            and data analytics solutions.
          </p>
        </div>

        {/* Experience List */}
        <div className="mx-auto max-w-5xl">
          <div className="divide-y divide-[#DDD6C8] border-y border-[#DDD6C8]">
            {experienceData.map((exp, idx) => (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group py-8 sm:py-10"
              >
                <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-10">

                  {/* Period / Type */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-[#4E8D66]">
                      <Calendar className="h-4 w-4 shrink-0" />
                      <span>{exp.period}</span>
                    </div>

                    <span className="w-fit rounded-full border border-[#DDD6C8] bg-[#FCFAF6] px-3 py-1 text-xs font-mono font-medium text-[#6B7280]">
                      {exp.type}
                    </span>
                  </div>

                  {/* Main Content */}
                  <div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-[#2F5D50]" />

                          <h3 className="font-display text-xl font-bold text-[#1D2A26] sm:text-2xl">
                            {exp.role}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2 text-sm font-medium text-[#2F5D50]">
                          <Building2 className="h-4 w-4" />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mt-6 space-y-3">
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
              </motion.article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
