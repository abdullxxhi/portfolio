import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, CheckCircle2, Workflow, Maximize2 } from 'lucide-react';
import { Project, Certification } from '../types';

interface LightboxModalProps {
  item: Project | Certification | null;
  type: 'project' | 'certification' | null;
  onClose: () => void;
}

export default function LightboxModal({ item, type, onClose }: LightboxModalProps) {
  const [activeZoomImage, setActiveZoomImage] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeZoomImage) {
          setActiveZoomImage(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, activeZoomImage]);

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

        {/* Floating Fixed Close Button - ALWAYS visible top-right above all images and content */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 p-3 sm:p-3.5 rounded-full bg-[#1D2A26]/90 text-white hover:bg-[#2F5D50] hover:scale-105 active:scale-95 transition-all z-[10020] shadow-2xl backdrop-blur-md border border-white/20 cursor-pointer flex items-center justify-center"
          aria-label="Close modal"
          title="Close (Esc)"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#FCFAF6] rounded-[24px] border border-[#DDD6C8] shadow-2xl overflow-hidden z-10 my-8"
        >
          {isProject ? (
            <div>
              {/* Media Preview Header */}
              <div
                className="relative aspect-[16/9] max-h-[420px] bg-[#F5F1E8] overflow-hidden group/header cursor-pointer"
                onClick={() => {
                  if (!projectItem.isVideo) {
                    setActiveZoomImage({ src: projectItem.mediaUrl, title: projectItem.title });
                  }
                }}
              >
                {projectItem.isVideo && projectItem.videoUrl ? (
                  <video
                    src={projectItem.videoUrl}
                    poster={projectItem.mediaUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover object-center"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <>
                    <img
                      src={projectItem.mediaUrl}
                      alt={projectItem.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/header:scale-105"
                    />
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-3 py-1.5 rounded-xl bg-black/60 text-white text-xs font-semibold backdrop-blur-md opacity-0 group-hover/header:opacity-100 transition-opacity flex items-center space-x-1.5 z-10">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Click to expand image</span>
                    </div>
                  </>
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

                {/* Automation in Action Section */}
                {projectItem.automationScreenshots && projectItem.automationScreenshots.length > 0 && (
                  <div className="pt-6 border-t border-[#DDD6C8] space-y-6">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-2.5 rounded-xl bg-[#2F5D50]/10 text-[#2F5D50]">
                        <Workflow className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-display text-[#1D2A26]">
                          Automation in Action
                        </h3>
                        <p className="text-xs text-[#6B7280]">
                          Demonstrating the completed end-to-end automation workflow and real-time execution
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {projectItem.automationScreenshots.map((shot, index) => (
                        <div
                          key={index}
                          onClick={() => setActiveZoomImage({ src: shot.image, title: shot.title })}
                          className="group flex flex-col bg-[#F5F1E8] border border-[#DDD6C8] rounded-2xl overflow-hidden shadow-sm hover:border-[#2F5D50] cursor-pointer transition-all duration-300"
                        >
                          <div className="relative aspect-[16/9] w-full bg-[#1D2A26] overflow-hidden">
                            <img
                              src={shot.image}
                              alt={shot.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="px-3 py-1.5 rounded-xl bg-black/70 text-white text-xs font-semibold backdrop-blur-md flex items-center space-x-1.5">
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>Expand Image</span>
                              </span>
                            </div>
                          </div>
                          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                            <h4 className="text-sm font-bold font-display text-[#1D2A26] flex items-center space-x-2">
                              <span className="w-2 h-2 rounded-full bg-[#2F5D50]" />
                              <span>{shot.title}</span>
                            </h4>
                            <p className="text-xs text-[#4B5563] leading-relaxed">
                              {shot.caption}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
                <div
                  className="relative bg-[#0F172A] aspect-[16/10] max-h-[500px] w-full flex items-center justify-center p-3 border-b border-[#DDD6C8] shadow-inner overflow-hidden group/cert cursor-pointer"
                  onClick={() => setActiveZoomImage({ src: certItem.image!, title: certItem.title })}
                >
                  <img
                    src={certItem.image}
                    alt={certItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover/cert:scale-102"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-black/60 text-white text-xs font-semibold backdrop-blur-md opacity-0 group-hover/cert:opacity-100 transition-opacity flex items-center space-x-1.5 z-10">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to view full certificate</span>
                  </div>
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

        {/* Dedicated Fullscreen Image Zoom Overlay */}
        <AnimatePresence>
          {activeZoomImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[20000] flex flex-col items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl cursor-zoom-out"
              onClick={() => setActiveZoomImage(null)}
            >
              {/* Fullscreen Close Button - ALWAYS visible top-right above zoomed image */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveZoomImage(null);
                }}
                className="fixed top-4 right-4 sm:top-6 sm:right-6 p-3 sm:p-3.5 rounded-full bg-white/15 hover:bg-white/30 text-white transition-all z-[20020] border border-white/30 shadow-2xl backdrop-blur-md cursor-pointer flex items-center justify-center"
                aria-label="Close image preview"
                title="Close Image View (Esc)"
              >
                <X className="w-6 h-6" />
              </button>

              <div
                className="relative max-w-6xl max-h-[85vh] w-full h-full flex items-center justify-center p-2 cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={activeZoomImage.src}
                  alt={activeZoomImage.title}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/10"
                />
              </div>

              <div className="mt-4 text-center z-[20010] pointer-events-none">
                <h3 className="text-sm sm:text-base font-semibold text-white/90">
                  {activeZoomImage.title}
                </h3>
                <p className="text-xs text-white/50 mt-1">
                  Click background or press Esc to close image view
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
}
