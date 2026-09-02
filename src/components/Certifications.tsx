import { useMemo } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  CalendarDays,
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
      className="relative z-10 bg-[#F5F1E8] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
          className="mb-14 max-w-3xl"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#2F5D50]">
              07 / Certifications
            </span>
            <span className="h-px w-10 bg-[#DDD6C8]" />
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight text-[#1D2A26] sm:text-4xl">
            Certifications & training.
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-[#4B5563]">
            Professional training and certifications supporting my work across
            data analytics, statistics, automation, and technology.
          </p>
        </motion.div>

        {/* Credential Overview */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4 }}
          className="mb-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-[#DDD6C8] py-5"
        >
          <div className="flex items-center gap-3">
            <Award className="h-4 w-4 text-[#2F5D50]" />

            <div>
              <span className="font-display text-xl font-bold text-[#1D2A26]">
                {certificationsData.length}
              </span>

              <span className="ml-2 text-sm text-[#6B7280]">
                Credentials
              </span>
            </div>
          </div>

          <span className="hidden h-5 w-px bg-[#DDD6C8] sm:block" />

          <div className="flex items-center gap-3">
            <BadgeCheck className="h-4 w-4 text-[#4E8D66]" />

            <span className="text-sm text-[#4B5563]">
              Professional training
            </span>
          </div>

          <span className="hidden h-5 w-px bg-[#DDD6C8] sm:block" />

          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#D97745]" />

            <span className="text-sm text-[#4B5563]">
              Continuous skill development
            </span>
          </div>
        </motion.div>

        {/* Featured Certification */}
        {featuredCertification && (
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#2F5D50]">
                  Featured credential
                </span>

                <span className="h-1 w-1 rounded-full bg-[#D97745]" />

                <span className="text-xs text-[#6B7280]">
                  {featuredCertification.issuer}
                </span>
              </div>

              <span className="font-mono text-xs text-[#6B7280]">
                01
              </span>
            </div>

            <div className="grid overflow-hidden rounded-[16px] border border-[#DDD6C8] bg-[#FCFAF6] lg:grid-cols-[0.95fr_1.05fr]">

              {/* Certificate Image */}
              <button
                type="button"
                onClick={() =>
                  onOpenCertModal(featuredCertification)
                }
                className="group relative min-h-[260px] overflow-hidden bg-[#EDE7DA] text-left sm:min-h-[360px] lg:min-h-[430px]"
              >
                {featuredCertification.image ? (
                  <>
                    <img
                      src={featuredCertification.image}
                      alt={`${featuredCertification.title} certificate`}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#1D2A26]/55 via-transparent to-transparent" />

                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                      <div>
                        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                          Issued by
                        </p>

                        <p className="text-sm font-semibold text-white">
                          {featuredCertification.issuer}
                        </p>
                      </div>

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-[#2F5D50]">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full min-h-[260px] items-center justify-center">
                    <div className="text-center">
                      <Award className="mx-auto mb-4 h-10 w-10 text-[#2F5D50]" />

                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#6B7280]">
                        Certificate
                      </p>
                    </div>
                  </div>
                )}
              </button>

              {/* Details */}
              <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                <div>
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 rounded-lg border border-[#DDD6C8] bg-[#F5F1E8] px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#2F5D50]">
                      <BadgeCheck className="h-3 w-3" />
                      {featuredCertification.status}
                    </span>
                  </div>

                  <h3 className="max-w-xl font-display text-2xl font-bold leading-tight text-[#1D2A26] sm:text-3xl lg:text-4xl">
                    {featuredCertification.title}
                  </h3>

                  <p className="mt-3 text-sm font-semibold text-[#D97745]">
                    {featuredCertification.issuer}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm text-[#6B7280]">
                    <CalendarDays className="h-4 w-4 text-[#2F5D50]" />
                    <span>{featuredCertification.date}</span>
                  </div>

                  {/* Skills */}
                  {featuredCertification.skillsLearned &&
                    featuredCertification.skillsLearned.length > 0 && (
                      <div className="mt-8 border-t border-[#DDD6C8] pt-6">
                        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7280]">
                          Skills covered
                        </p>

                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                          {featuredCertification.skillsLearned
                            .slice(0, 8)
                            .map((skill) => (
                              <span
                                key={skill}
                                className="text-xs font-medium text-[#4B5563]"
                              >
                                {skill}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-[#DDD6C8] pt-6">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenCertModal(featuredCertification)
                    }
                    className="inline-flex items-center gap-2 rounded-lg bg-[#2F5D50] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#24493F]"
                  >
                    View Certificate
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>

                  {featuredCertification.credentialUrl && (
                    <a
                      href={featuredCertification.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#1D2A26] transition-colors hover:text-[#2F5D50]"
                    >
                      Verify Credential
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        )}

        {/* Remaining Certifications */}
        {remainingCertifications.length > 0 && (
          <div>
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#6B7280]">
                  Professional development
                </p>

                <h3 className="mt-1 font-display text-xl font-bold text-[#1D2A26] sm:text-2xl">
                  More credentials
                </h3>
              </div>

              <span className="font-mono text-xs text-[#6B7280]">
                {String(remainingCertifications.length).padStart(2, '0')}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {remainingCertifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(index * 0.06, 0.18),
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
