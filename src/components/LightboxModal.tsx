import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Workflow,
  BarChart3,
  Database,
  Maximize2,
} from 'lucide-react';
import { Project, Certification } from '../types';

interface LightboxModalProps {
  item: Project | Certification | null;
  type: 'project' | 'certification' | null;
  onClose: () => void;
}

export default function LightboxModal({
  item,
  type,
  onClose,
}: LightboxModalProps) {
  const [activeZoomImage, setActiveZoomImage] = useState<{
    src: string;
    title: string;
  } | null>(null);

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

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, activeZoomImage]);

  if (!item) return null;

  const isProject = type === 'project';
  const projectItem = item as Project;
  const certItem = item as Certification;

  const isAutomationProject =
    projectItem.category === 'AI Automation';

  const isDataAnalysisProject =
    projectItem.category === 'Excel' ||
    projectItem.category === 'Data Analysis' ||
    projectItem.category === 'Statistics';

  const isDataQualityProject =
    projectItem.category === 'Data Automation';

  let galleryTitle = 'Project in Action';
  let galleryDescription =
    'Supporting project screenshots and implementation details.';
  let GalleryIcon = Workflow;

  if (isAutomationProject) {
    galleryTitle = 'Automation in Action';
    galleryDescription =
      'Demonstrating the completed end-to-end automation workflow and real-time execution.';
    GalleryIcon = Workflow;
  } else if (isDataAnalysisProject) {
    galleryTitle = 'Analysis in Action';
    galleryDescription =
      'Demonstrating the analytical process, data exploration, and key findings from the project.';
    GalleryIcon = BarChart3;
  } else if (isDataQualityProject) {
    galleryTitle = 'Data Quality in Action';
    galleryDescription =
      'Demonstrating the data validation, cleaning, standardization, and quality-control process.';
    GalleryIcon = Database;
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] overflow-y-auto bg-[#1D2A26]/75 p-3 sm:p-6">

        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="fixed right-4 top-4 z-[10020] flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-[#1D2A26] text-white transition-colors hover:bg-[#2F5D50] sm:right-6 sm:top-6"
          aria-label="Close modal"
          title="Close (Esc)"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 mx-auto my-3 w-full max-w-5xl overflow-hidden rounded-[16px] border border-[#DDD6C8] bg-[#FCFAF6] sm:my-8"
        >
          {isProject ? (
            <div>

              {/* Project Media */}
              <div
                className="group/header relative aspect-[16/9] max-h-[460px] cursor-pointer overflow-hidden bg-[#EDE7DA]"
                onClick={() => {
                  if (!projectItem.isVideo) {
                    setActiveZoomImage({
                      src: projectItem.mediaUrl,
                      title: projectItem.title,
                    });
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
                    className="h-full w-full object-cover"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <>
                    <img
                      src={projectItem.mediaUrl}
                      alt={projectItem.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover/header:scale-[1.02]"
                    />

                    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-lg bg-[#1D2A26]/75 px-3 py-2 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover/header:opacity-100 sm:left-6 sm:top-6">
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span>Expand image</span>
                    </div>
                  </>
                )}
              </div>

              {/* Project Body */}
              <div className="space-y-8 p-6 sm:p-8 lg:p-10">

                {/* Title */}
                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#2F5D50]">
                      {projectItem.category}
                    </span>

                    <span className="h-1 w-1 rounded-full bg-[#D97745]" />
                  </div>

                  <h2 className="font-display text-2xl font-bold leading-tight text-[#1D2A26] sm:text-3xl">
                    {projectItem.title}
                  </h2>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-[#4B5563] sm:text-base">
                    {projectItem.description}
                  </p>
                </div>

                {/* Highlights */}
                {projectItem.keyHighlights &&
                  projectItem.keyHighlights.length > 0 && (
                    <div className="border-y border-[#DDD6C8] py-6">
                      <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                        Key capabilities & outcomes
                      </p>

                      <div className="space-y-3">
                        {projectItem.keyHighlights.map((highlight, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 text-sm leading-6 text-[#4B5563]"
                          >
                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#4E8D66]" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Technologies */}
                <div>
                  <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                    Technologies used
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {projectItem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-[#2F5D50]"
                      >
                        #{tag.replace(/^#/, '')}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Screenshots */}
                {projectItem.automationScreenshots &&
                  projectItem.automationScreenshots.length > 0 && (
                    <div className="border-t border-[#DDD6C8] pt-8">

                      <div className="mb-6 flex items-start gap-3">
                        <GalleryIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#2F5D50]" />

                        <div>
                          <h3 className="font-display text-lg font-bold text-[#1D2A26]">
                            {galleryTitle}
                          </h3>

                          <p className="mt-1 text-xs leading-5 text-[#6B7280]">
                            {galleryDescription}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {projectItem.automationScreenshots.map(
                          (shot, index) => (
                            <button
                              type="button"
                              key={index}
                              onClick={() =>
                                setActiveZoomImage({
                                  src: shot.image,
                                  title: shot.title,
                                })
                              }
                              className="group/screenshot overflow-hidden rounded-xl border border-[#DDD6C8] bg-[#F5F1E8] text-left transition-colors hover:border-[#2F5D50]"
                            >
                              <div className="relative aspect-[16/9] overflow-hidden bg-[#1D2A26]">
                                <img
                                  src={shot.image}
                                  alt={shot.title}
                                  referrerPolicy="no-referrer"
                                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover/screenshot:scale-[1.02]"
                                />

                                <div className="absolute inset-0 flex items-center justify-center bg-[#1D2A26]/25 opacity-0 transition-opacity duration-200 group-hover/screenshot:opacity-100">
                                  <span className="inline-flex items-center gap-2 rounded-lg bg-[#FCFAF6] px-3 py-2 text-xs font-semibold text-[#1D2A26]">
                                    <Maximize2 className="h-3.5 w-3.5" />
                                    Expand image
                                  </span>
                                </div>
                              </div>

                              <div className="p-4 sm:p-5">
                                <h4 className="font-display text-sm font-bold text-[#1D2A26]">
                                  {shot.title}
                                </h4>

                                <p className="mt-2 text-xs leading-5 text-[#4B5563]">
                                  {shot.caption}
                                </p>
                              </div>
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Project Links */}
                <div className="flex flex-wrap items-center justify-end gap-4 border-t border-[#DDD6C8] pt-6">
                  {projectItem.githubUrl && (
                    <a
                      href={projectItem.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#1D2A26] transition-colors hover:text-[#2F5D50]"
                    >
                      <Github className="h-4 w-4" />
                      Repository
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}

                  {projectItem.demoUrl && (
                    <a
                      href={projectItem.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#2F5D50] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#244A40]"
                    >
                      Launch Demo
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Certification Modal */
            <div className="flex flex-col">

              {/* Certificate Image */}
              {certItem.image && (
                <button
                  type="button"
                  className="group/cert relative aspect-[16/10] max-h-[520px] w-full overflow-hidden border-b border-[#DDD6C8] bg-[#111827] p-3"
                  onClick={() =>
                    setActiveZoomImage({
                      src: certItem.image!,
                      title: certItem.title,
                    })
                  }
                >
                  <img
                    src={certItem.image}
                    alt={certItem.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-contain transition-transform duration-500 group-hover/cert:scale-[1.01]"
                  />

                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-lg bg-[#1D2A26]/75 px-3 py-2 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover/cert:opacity-100">
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span>View full certificate</span>
                  </div>
                </button>
              )}

              {/* Certificate Details */}
              <div className="p-6 sm:p-8 lg:p-10">

                <div className="border-b border-[#DDD6C8] pb-6">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2F5D50]">
                    Official accreditation
                  </p>

                  <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-[#1D2A26] sm:text-3xl">
                    {certItem.title}
                  </h2>

                  <p className="mt-2 text-sm font-semibold text-[#D97745]">
                    {certItem.issuer}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-sm text-[#6B7280]">
                    <span>{certItem.date}</span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2 py-6 text-sm font-medium text-[#4E8D66]">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>
                    Verified status: {certItem.status}
                  </span>
                </div>

                {/* Skills */}
                {certItem.skillsLearned &&
                  certItem.skillsLearned.length > 0 && (
                    <div className="border-t border-[#DDD6C8] pt-6">
                      <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                        Competencies covered
                      </p>

                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {certItem.skillsLearned.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs text-[#4B5563]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Actions */}
                <div className="mt-8 flex flex-wrap items-center justify-end gap-4 border-t border-[#DDD6C8] pt-6">
                  {certItem.credentialUrl && (
                    <a
                      href={certItem.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#2F5D50] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#244A40]"
                    >
                      Verify Credential
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#1D2A26] transition-colors hover:text-[#2F5D50]"
                  >
                    Close
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Fullscreen Image Viewer */}
        <AnimatePresence>
          {activeZoomImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[20000] flex flex-col items-center justify-center bg-[#111827]/95 p-4 sm:p-8"
              onClick={() => setActiveZoomImage(null)}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveZoomImage(null);
                }}
                className="fixed right-4 top-4 z-[20020] flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
                aria-label="Close image preview"
                title="Close image view (Esc)"
              >
                <X className="h-5 w-5" />
              </button>

              <div
                className="flex h-full w-full max-w-6xl items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={activeZoomImage.src}
                  alt={activeZoomImage.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[85vh] max-w-full object-contain"
                />
              </div>

              <div className="pointer-events-none mt-4 text-center">
                <h3 className="text-sm font-semibold text-white/90 sm:text-base">
                  {activeZoomImage.title}
                </h3>

                <p className="mt-1 text-xs text-white/50">
                  Click the background or press Esc to close
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
}
