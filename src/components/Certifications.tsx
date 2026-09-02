import { useMemo } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  CalendarDays,
  ShieldCheck,
} from 'lucide-react';
import { certificationsData } from '../data/portfolioData';
import { Certification } from '../types';
import CertificateCard from './CertificateCard';

interface CertificationsProps {
  onOpenCertModal: (cert: Certification) => void;
}

export default function Certifications({
  onOpenCertModal,
}: CertificationsProps) {
  const featuredCertification = useMemo(() => {
    return (
      certificationsData.find((cert) => cert.image) ??
      certificationsData[0]
    );
  }, []);

  const remainingCertifications = certificationsData.filter(
    (cert) => cert.id !== featuredCertification?.id
  );

  return (
    <section
      id="certifications"
      className="py-24 relative z-10 bg-[#F5F1E8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-12"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FCFAF6] border border-[#DDD6C8] shadow-sm">
            <Award className="w-3.5 h-3.5 text-[#2F5D50]" />

            <span className="text-xs font-mono uppercase tracking-widest text-[#2F5D50] font-semibold">
              ACCREDITATIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1D2A26]">
            Certifications & Training
          </h2>

          <p className="text-base text-[#4B5563]">
            Formal certifications validating expertise in data analysis,
            statistical modeling, and AI workflow automation.
          </p>
        </motion.div>

        {/* Credential Summary */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mb-14"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-[#DDD6C8] bg-[#FCFAF6] px-4 py-3">
            <div className="w-9 h-9 rounded-xl bg-[#F5F1E8] flex items-center justify-center">
              <Award className="w-4 h-4 text-[#2F5D50]" />
            </div>

            <div>
              <p className="text-lg font-display font-bold text-[#1D2A26]">
                {certificationsData.length}
              </p>

              <p className="text-[10px] uppercase tracking-widest font-mono text-[#6B7280]">
                Credentials
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#DDD6C8] bg-[#FCFAF6] px-4 py-3">
            <div className="w-9 h-9 rounded-xl bg-[#F5F1E8] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-[#2F5D50]" />
            </div>

            <div>
              <p className="text-lg font-display font-bold text-[#1D2A26]">
                Verified
              </p>

              <p className="text-[10px] uppercase tracking-widest font-mono text-[#6B7280]">
                Professional Training
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#DDD6C8] bg-[#FCFAF6] px-4 py-3">
            <div className="w-9 h-9 rounded-xl bg-[#F5F1E8] flex items-center justify-center">
              <BadgeCheck className="w-4 h-4 text-[#D97745]" />
            </div>

            <div>
              <p className="text-lg font-display font-bold text-[#1D2A26]">
                Active
              </p>

              <p className="text-[10px] uppercase tracking-widest font-mono text-[#6B7280]">
                Skill Development
              </p>
            </div>
          </div>
        </motion.div>

        {/* Featured Credential */}
        {featuredCertification && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-semibold text-[#2F5D50]">
                <BadgeCheck className="w-3.5 h-3.5" />
                Featured Credential
              </span>

              <span className="w-1 h-1 rounded-full bg-[#D97745]" />

              <span className="text-xs text-[#6B7280]">
                {featuredCertification.issuer}
              </span>
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-[#DDD6C8] bg-[#FCFAF6] shadow-[0_24px_70px_-30px_rgba(47,93,80,0.22)]">

              {/* Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2F5D50] via-[#D97745] to-[#2F5D50]" />

              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">

                {/* Certificate Preview */}
                <button
                  type="button"
                  onClick={() =>
                    onOpenCertModal(featuredCertification)
                  }
                  className="group relative min-h-[270px] sm:min-h-[360px] lg:min-h-[410px] overflow-hidden bg-[#F5F1E8] text-left"
                >
                  {featuredCertification.image ? (
                    <>
                      <motion.img
                        src={featuredCertification.image}
                        alt={`${featuredCertification.title} certificate`}
                        className="absolute inset-0 w-full h-full object-cover"
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.6 }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#1D2A26]/65 via-transparent to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-3xl bg-[#FCFAF6] border border-[#DDD6C8] shadow-sm flex items-center justify-center mx-auto mb-4">
                          <Award className="w-9 h-9 text-[#2F5D50]" />
                        </div>

                        <p className="text-xs font-mono uppercase tracking-widest text-[#6B7280]">
                          Certificate
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Preview Label */}
                  <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FCFAF6]/90 backdrop-blur-sm border border-white/30 text-xs font-semibold text-[#1D2A26]">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#2F5D50]" />
                    View Credential
                  </div>

                  {/* Bottom Label */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/70 mb-1">
                        Credential
                      </p>

                      <p className="text-sm font-semibold text-white">
                        {featuredCertification.issuer}
                      </p>
                    </div>

                    <div className="shrink-0 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#2F5D50] transition-colors">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </button>

                {/* Credential Details */}
                <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between">

                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <span className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#F5F1E8] border border-[#DDD6C8] text-[10px] uppercase tracking-widest font-mono font-semibold text-[#2F5D50]">
                        <BadgeCheck className="w-3 h-3" />
                        {featuredCertification.status}
                      </span>

                      <span className="text-4xl sm:text-5xl font-display font-bold text-[#DDD6C8]">
                        01
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#1D2A26] leading-tight mb-4">
                      {featuredCertification.title}
                    </h3>

                    <p className="text-sm font-semibold text-[#D97745] mb-6">
                      {featuredCertification.issuer}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-7">
                      <CalendarDays className="w-4 h-4 text-[#2F5D50]" />
                      <span>{featuredCertification.date}</span>
                    </div>

                    {/* Skills */}
                    {featuredCertification.skillsLearned &&
                      featuredCertification.skillsLearned.length > 0 && (
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7280] mb-3">
                            Skills Covered
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {featuredCertification.skillsLearned
                              .slice(0, 8)
                              .map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2.5 py-1.5 rounded-lg bg-[#F5F1E8] border border-[#DDD6C8] text-[11px] font-semibold text-[#4B5563]"
                                >
                                  {skill}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                  </div>

                  {/* Action */}
                  <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-[#DDD6C8]">
                    <button
                      type="button"
                      onClick={() =>
                        onOpenCertModal(featuredCertification)
                      }
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2F5D50] text-white text-xs font-semibold hover:bg-[#24493F] transition-colors shadow-sm"
                    >
                      View Certificate
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    {featuredCertification.credentialUrl && (
                      <a
                        href={featuredCertification.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#DDD6C8] bg-[#F5F1E8] text-[#1D2A26] text-xs font-semibold hover:border-[#2F5D50] hover:text-[#2F5D50] transition-colors"
                      >
                        Verify Credential
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Remaining Certifications */}
        {remainingCertifications.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-7">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-[#6B7280]">
                  Professional Development
                </p>

                <h3 className="mt-1 text-xl sm:text-2xl font-display font-bold text-[#1D2A26]">
                  More Credentials
                </h3>
              </div>

              <span className="text-xs font-mono text-[#6B7280]">
                {String(remainingCertifications.length).padStart(2, '0')}{' '}
                {remainingCertifications.length === 1
                  ? 'CREDENTIAL'
                  : 'CREDENTIALS'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {remainingCertifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(index * 0.08, 0.2),
                  }}
                >
                  <CertificateCard
                    cert={cert}
                    onOpenCertModal={onOpenCertModal}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


