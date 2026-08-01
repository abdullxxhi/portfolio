import { motion } from 'motion/react';
import { Bot, BarChart3, FileSpreadsheet, Code, Layers, Sparkles, Check } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

export default function Skills() {
  const iconMap: Record<string, any> = {
    Bot,
    BarChart3,
    FileSpreadsheet,
    Code,
    Layers,
    Sparkles
  };

  return (
    <section id="skills" className="py-24 relative z-10 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FCFAF6] border border-[#DDD6C8] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D97745]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#2F5D50] font-semibold">
              TECHNICAL EXPERTISE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1D2A26]">
            Skills & Specializations
          </h2>
          <p className="text-base text-[#4B5563]">
            Combining statistical rigor with cutting-edge AI automation tools to construct seamless, intelligent end-to-end workflows.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, idx) => {
            const IconComp = iconMap[cat.icon] || Bot;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#FCFAF6] border border-[#DDD6C8] glass-card-hover p-7 rounded-[20px] relative overflow-hidden flex flex-col justify-between group shadow-sm"
              >
                {/* Border Accent on Hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[#2F5D50]/50 rounded-[20px] transition-colors pointer-events-none" />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3.5 rounded-2xl bg-[#2F5D50]/10 border border-[#2F5D50]/20 text-[#2F5D50] group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-display text-[#1D2A26] group-hover:text-[#2F5D50] transition-colors">
                        {cat.title}
                      </h3>
                      <span className="text-[10px] font-mono text-[#6B7280]">
                        {cat.skills.length} Competencies
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#4B5563] leading-relaxed mb-6">
                    {cat.description}
                  </p>

                  {/* Skill Chips */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#F5F1E8] border border-[#DDD6C8] text-xs font-medium text-[#1D2A26] group-hover:border-[#2F5D50]/30 transition-all"
                      >
                        <Check className="w-3 h-3 text-[#4E8D66]" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Indicator */}
                <div className="pt-6 mt-6 border-t border-[#DDD6C8] flex items-center justify-between text-[11px] font-mono text-[#6B7280]">
                  <span>Verified Skillset</span>
                  <span className="text-[#2F5D50] font-semibold">100% Practical</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
