import { motion } from 'motion/react';
import {
  Bot,
  BarChart3,
  FileSpreadsheet,
  Code,
  Layers,
  Sparkles,
  Check,
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

export default function Skills() {
  const iconMap: Record<string, any> = {
    Bot,
    BarChart3,
    FileSpreadsheet,
    Code,
    Layers,
    Sparkles,
  };

  return (
    <section
      id="skills"
      className="relative z-10 bg-[#F5F1E8] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Editorial Header */}
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
            Tools I use to build
            <span className="block text-[#2F5D50]">
              modern digital solutions.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#4B5563]">
            My workflow combines statistics, data analytics, AI automation and
            software development to create practical business solutions.
          </p>
        </motion.div>

        {/* Skills */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Bot;

            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.08,
                }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-[#DDD6C8] bg-[#FCFAF6] p-6 transition-all duration-300 hover:border-[#2F5D50]/35 hover:shadow-[0_18px_45px_-22px_rgba(47,93,80,0.18)]"
              >
                {/* Icon */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2F5D50]/8 text-[#2F5D50] transition-colors group-hover:bg-[#2F5D50] group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-[#1D2A26]">
                  {cat.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-[#6B7280]">
                  {cat.description}
                </p>

                {/* Divider */}
                <div className="my-5 h-px bg-[#ECE6DA]" />

                {/* Skills */}
                <div className="space-y-3">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-3 text-sm text-[#1D2A26]"
                    >
                      <Check className="h-3.5 w-3.5 shrink-0 text-[#4E8D66]" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
