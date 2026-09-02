import { motion } from 'motion/react';
import { Briefcase, Calendar, CheckCircle2, Sparkles, Building2 } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative z-10 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FCFAF6] border border-[#DDD6C8] shadow-sm">
            <Briefcase className="w-3.5 h-3.5 text-[#2F5D50]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#2F5D50] font-semibold">
              CAREER TRACK
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1D2A26]">
            Practical Experience
          </h2>
          <p className="text-base text-[#4B5563]">
            Hands-on technical work building real-world automation systems and data analytics solutions.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Animated Timeline Line in Center/Left */}
          <div className="absolute top-0 bottom-0 left-6 sm:left-8 w-0.5 bg-gradient-to-b from-[#2F5D50] via-[#D97745] to-transparent" />

          <div className="space-y-12">
            {experienceData.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative pl-16 sm:pl-20 group"
              >
                {/* Timeline Icon Node */}
                <div className="absolute left-3 sm:left-5 top-1 -translate-x-1/2 p-2.5 rounded-full bg-[#FCFAF6] border-2 border-[#2F5D50] text-[#2F5D50] group-hover:scale-125 group-hover:bg-[#2F5D50] group-hover:text-white transition-all duration-300 shadow-md z-10">
                  <Briefcase className="w-4 h-4" />
                </div>

                {/* Experience Content Card */}
                <div className="bg-[#FCFAF6] p-6 sm:p-8 rounded-[20px] border border-[#DDD6C8] shadow-sm group-hover:border-[#2F5D50]/50 transition-all">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#2F5D50]/10 border border-[#2F5D50]/20 text-[#2F5D50] text-xs font-mono font-semibold mb-2">
                        <Sparkles className="w-3 h-3 text-[#D97745]" />
                        <span>{exp.type}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-[#1D2A26]">
                        {exp.role}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-[#2F5D50] font-medium mt-1">
                        <Building2 className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-[#F5F1E8] border border-[#DDD6C8] text-xs font-mono text-[#4E8D66] font-semibold shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Achievements List */}
                  <div className="space-y-2.5 pt-4 border-t border-[#DDD6C8]">
                    {exp.achievements.map((ach, i) => (
                      <div key={i} className="flex items-start space-x-3 text-sm text-[#4B5563] leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#4E8D66] shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
