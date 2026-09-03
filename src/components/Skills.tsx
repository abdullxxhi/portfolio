import { motion } from 'motion/react';
import {
  BarChart3,
  FileSpreadsheet,
  Database,
  Bot,
  Layers,
  Sparkles,
  Check,
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

export default function Skills() {
  const iconMap: Record<string, any> = {
    BarChart3,
    FileSpreadsheet,
    Code: Database,
    Database,
    Bot,
    Layers,
    Sparkles,
  };

  const orderedCategories = [...skillCategories].sort((a, b) => {
    if (a.title === 'Data Analysis') return -1;
    if (b.title === 'Data Analysis') return 1;
    if (a.title === 'Advanced Excel') return -1;
    if (b.title === 'Advanced Excel') return 1;
    return 0;
  });

  return (
    <section
      id="skills"
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
              02
            </span>
            <span className="h-px w-8 bg-[#DDD6C8]" />
            <span className="text-[10px] uppercase tracking-[0.16em] text-[#6B7280]">
              Skills
            </span>
          </div>

          <h2 className="font-display text-3xl font-bold leading-tight tracking-[-0.025em] text-[#1D2A26] sm:text-4xl lg:text-5xl">
            Data analysis is at the
            <span className="block text-[#2F5D50]">core of my work.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#4B5563]">
            I use statistics, Excel, SQL, and Power BI to clean, analyze, and
            communicate data. Automation and development skills complement that
            analytical foundation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-0 lg:grid-cols-2">
          {orderedCategories.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Layers;
            const isDataAnalysis = cat.title === 'Data Analysis';

            return (
              <motion.article
                key={cat.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group border-t border-[#DDD6C8] py-8 sm:py-9 ${
                  isDataAnalysis ? 'lg:col-span-2' : ''
                }`}
              >
                <div
                  className={`grid gap-6 ${
                    isDataAnalysis
                      ? 'lg:grid-cols-[280px_1fr] lg:gap-12'
                      : 'sm:grid-cols-[180px_1fr] sm:gap-8'
                  }`}
                >
                  <div>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDD6C8] bg-[#FCFAF6] text-[#2F5D50] transition-colors duration-200 group-hover:border-[#2F5D50]/30">
                      <Icon className="h-4.5 w-4.5" />
                    </div>

                    <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-[#1D2A26]">
                      {cat.title}
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-[#6B7280]">
                      {cat.description}
                    </p>
                  </div>

                  <div
                    className={`grid content-start gap-x-6 gap-y-3 ${
                      isDataAnalysis
                        ? 'sm:grid-cols-2 lg:grid-cols-3'
                        : 'sm:grid-cols-2'
                    }`}
                  >
                    {cat.skills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-start gap-2.5 text-sm text-[#1D2A26]"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#4E8D66]" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
