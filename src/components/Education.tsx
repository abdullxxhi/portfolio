import { motion } from 'motion/react';
import { GraduationCap, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { educationData } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FCFAF6] border border-[#DDD6C8] shadow-sm">
            <GraduationCap className="w-3.5 h-3.5 text-[#2F5D50]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#2F5D50] font-semibold">
              ACADEMIC BACKGROUND
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1D2A26]">
            Education
          </h2>
          <p className="text-base text-[#4B5563]">
            Rigorous university foundation in statistical inference, mathematical modeling, and quantitative analysis.
          </p>
        </div>

        {/* Education Timeline Card */}
        <div className="max-w-4xl mx-auto">
          {educationData.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#FCFAF6] p-8 sm:p-10 rounded-[20px] border border-[#DDD6C8] shadow-sm relative overflow-hidden group hover:border-[#2F5D50]/50 transition-all"
            >
              {/* Top Accent Gradient */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2F5D50] via-[#3d7263] to-[#D97745]" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="p-4 rounded-2xl bg-[#2F5D50]/10 border border-[#2F5D50]/20 text-[#2F5D50] shrink-0">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    {item.status && (
                      <span className="text-xs font-mono text-[#D97745] uppercase font-semibold tracking-wider">
                        {item.status}
                      </span>
                    )}
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#1D2A26] mt-0.5">
                      {item.school}
                    </h3>
                    <p className="text-base sm:text-lg font-medium text-[#2F5D50] mt-1">
                      {item.degree}
                    </p>
                  </div>
                </div>
              </div>

              {/* Highlights List */}
              <div className="space-y-3 pt-4 border-t border-[#DDD6C8]">
                <div className="text-xs font-mono uppercase tracking-wider text-[#6B7280] font-semibold flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#2F5D50]" />
                  <span>Academic Focus & Highlights:</span>
                </div>
                {item.highlights.map((hl, i) => (
                  <div key={i} className="flex items-start space-x-3 text-sm text-[#4B5563] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#4E8D66] shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
