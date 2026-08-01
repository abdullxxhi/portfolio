import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Sparkles, CheckCircle2 } from 'lucide-react';
import { Project, Certification } from '../types';

interface LightboxModalProps {
  item: Project | Certification | null;
  type: 'project' | 'certification' | null;
  onClose: () => void;
}

export default function LightboxModal({ item, type, onClose }: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const isProject = type === 'project';
  const projectItem = item as Project;
  const certItem = item as Certification;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl">
        {/* Click outside backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#FCFAF6] rounded-[24px] border border-[#DDD6C8] shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-3 rounded-full bg-[#F5F1E8]/90 text-[#1D2A26] hover:bg-[#2F5D50] hover:text-white transition-colors z-20 shadow-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {isProject ? (
            <div>
              {/* Media Preview Header */}
              <div className="relative aspect-[16/9] max-h-[420px] bg-[#F5F1E8] overflow-hidden">
                {projectItem.isVideo && projectItem.videoUrl ? (
                  <video
                    src={projectItem.videoUrl}
                    poster={projectItem.mediaUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <img
                    src={projectItem.mediaUrl}
                    alt={projectItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FCFAF6] via-transparent to-transparent opacity-90 pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6">
                  <span className="px-3.5 py-1 rounded-full bg-[#2F5D50] text-white font-mono text-xs font-semibold mb-2 inline-block shadow-sm">
                    {projectItem.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1D2A26]">
                    {projectItem.title}
                  </h2>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-8 space-y-6">
                <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                  {projectItem.description}
                </p>

                {projectItem.keyHighlights && projectItem.keyHighlights.length > 0 && (
                  <div className="space-y-2.5 p-4 rounded-2xl bg-[#F5F1E8] border border-[#DDD6C8]">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#2F5D50] font-semibold">
                      Key Capabilities & Outcomes:
                    </div>
                    {projectItem.keyHighlights.map((hl, i) => (
                      <div key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#1D2A26]">
                        <CheckCircle2 className="w-4 h-4 text-[#4E8D66] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Pills */}
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#6B7280] mb-2 font-semibold">
                    Technologies Used:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {projectItem.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-xl bg-[#F5F1E8] border border-[#DDD6C8] text-xs font-mono text-[#2F5D50] font-medium"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-[#DDD6C8] flex items-center justify-end space-x-3">
                  {projectItem.githubUrl && (
                    <a
                      href={projectItem.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-[#F5F1E8] border border-[#DDD6C8] text-[#1D2A26] text-xs font-semibold flex items-center space-x-2 hover:border-[#2F5D50] hover:text-[#2F5D50] transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Repository</span>
                    </a>
                  )}
                  {projectItem.demoUrl && (
                    <a
                      href={projectItem.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-[#2F5D50] text-white text-xs font-semibold flex items-center space-x-2 shadow-sm hover:bg-[#244A40] transition-colors"
                    >
                      <span>Launch Demo</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Certification Modal View */
            <div className="flex flex-col">
              {certItem.image && (
                <div className="relative bg-[#0F172A] aspect-[16/10] max-h-[500px] w-full flex items-center justify-center p-3 border-b border-[#DDD6C8] shadow-inner overflow-hidden">
                  <img
                    src={certItem.image}
                    alt={certItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              )}

              <div className="p-8 sm:p-10 space-y-6 text-center">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#2F5D50] font-semibold">
                    OFFICIAL ACCREDITATION
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1D2A26] mt-1">
                    {certItem.title}
                  </h2>
                  <div className="text-sm font-mono text-[#D97745] font-semibold mt-1">
                    Issued by {certItem.issuer} • {certItem.date}
                  </div>
                </div>

                <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#4E8D66]/15 text-[#245338] text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Status: {certItem.status}</span>
                </div>

                {certItem.skillsLearned && (
                  <div className="p-6 rounded-2xl bg-[#F5F1E8] border border-[#DDD6C8] max-w-lg mx-auto text-left space-y-3">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#6B7280] font-semibold">
                      Competencies Certified:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {certItem.skillsLearned.map((s) => (
                        <span
                          key={s}
                          className="px-3 py-1 rounded-xl bg-[#FCFAF6] border border-[#DDD6C8] text-xs font-medium text-[#1D2A26]"
                        >
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 flex items-center justify-center space-x-4">
                  {certItem.credentialUrl && (
                    <a
                      href={certItem.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-2.5 rounded-xl bg-[#2F5D50] text-white text-xs font-semibold flex items-center space-x-2 hover:bg-[#244A40] transition-colors shadow-sm"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl bg-[#F5F1E8] border border-[#DDD6C8] text-[#1D2A26] text-xs font-semibold hover:border-[#2F5D50] hover:text-[#2F5D50] transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
