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

        {/* --------------------------------------------------
            EDITORIAL HEADER
        -------------------------------------------------- */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-16 max-w-3xl"
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

        {/* --------------------------------------------------
            SKILLS INDEX
        -------------------------------------------------- */}

        <div className="border-t border-[#DDD6C8]">
          {skillCategories.map((category, index) => {
            const Icon = iconMap[category.icon] || Bot;

            return (
              <motion.article
                key={category.title}
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: '-50px',
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group border-b border-[#DDD6C8]"
              >
                <div className="grid gap-8 py-9 md:grid-cols-[80px_minmax(220px,0.8fr)_minmax(0,1.5fr)] md:items-start md:gap-10 lg:gap-16">

                  {/* Number */}
                  <div className="flex items-center gap-3 md:block">
                    <span className="font-mono text-xs font-medium text-[#A8A095]">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="h-px w-8 bg-[#DDD6C8] md:mt-4 md:w-6" />
                  </div>

                  {/* Category */}
                  <div>
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDD6C8] bg-[#FCFAF6] text-[#2F5D50] transition-colors duration-200 group-hover:border-[#2F5D50]/30 group-hover:bg-[#2F5D50] group-hover:text-white">
                        <Icon className="h-4 w-4" />
                      </div>

                      <span className="text-[10px] uppercase tracking-[0.14em] text-[#9A9388]">
                        {String(index + 1).padStart(2, '0')} / Expertise
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-[#1D2A26] sm:text-2xl">
                      {category.title}
                    </h3>

                    <p className="mt-3 max-w-md text-sm leading-6 text-[#6B7280]">
                      {category.description}
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{
                          opacity: 0,
                          x: -6,
                        }}
                        whileInView={{
                          opacity: 1,
                          x: 0,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.35,
                          delay: 0.08 + skillIndex * 0.025,
                          ease: 'easeOut',
                        }}
                        className="group/skill flex min-h-9 items-center gap-3 border-b border-[#ECE6DA] py-2 text-sm text-[#1D2A26] transition-colors duration-200 hover:text-[#2F5D50]"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2F5D50]/[0.07] transition-colors duration-200 group-hover/skill:bg-[#2F5D50]">
                          <Check className="h-3 w-3 text-[#2F5D50] transition-colors duration-200 group-hover/skill:text-white" />
                        </span>

                        <span className="leading-5">
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* --------------------------------------------------
            FOOTER NOTE
        -------------------------------------------------- */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="text-[10px] uppercase tracking-[0.14em] text-[#9A9388]">
            Technical toolkit
          </span>

          <span className="text-xs text-[#6B7280]">
            Data analysis at the core, automation where it adds value.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
