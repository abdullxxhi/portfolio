import { motion } from 'motion/react';
import { GraduationCap, CheckCircle2, BarChart3 } from 'lucide-react';
import { educationData } from '../data/portfolioData';

export default function Education() {
  return (
    <section
      id="education"
      className="relative z-10 bg-[#F5F1E8] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14 max-w-3xl"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-[#D97745]">
              06
            </span>
            <span className="h-px w-8 bg-[#DDD6C8]" />
            <span className="text-[10px] uppercase tracking-[0.16em] text-[#6B7280]">
              Education
            </span>
          </div>

          <h2 className="font-display text-3xl font-bold leading-tight tracking-[-0.025em] text-[#1D2A26] sm:text-4xl lg:text-5xl">
            The statistical foundation
            <span className="block text-[#2F5D50]">behind my analysis.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#4B5563]">
            My academic background in Statistics shapes how I approach data,
            from understanding uncertainty to selecting appropriate analytical
            methods for real-world problems.
          </p>
        </motion.div>

        <div className="border-y border-[#DDD6C8]">
          {educationData.map((education, idx) => (
            <motion.article
              key={education.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="py-8 sm:py-10"
            >
              <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
                <div>
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDD6C8] bg-[#FCFAF6] text-[#2F5D50]">
                    <GraduationCap className="h-5 w-5" />
                  </div>

                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                    Academic background
                  </p>

                  <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.02em] text-[#1D2A26]">
                    {education.degree}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-[#2F5D50]">
                    {education.school}
                  </p>

                  {education.duration && (
                    <p className="mt-1 text-xs text-[#6B7280]">
                      {education.duration}
                    </p>
                  )}
                </div>

                <div>
                  <div className="mb-5 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-[#D97745]" />
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                      Areas of study
                    </p>
                  </div>

                  <div className="space-y-4">
                    {education.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-start gap-3 text-sm leading-6 text-[#4B5563]"
                      >
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#4E8D66]" />
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
