import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  ExternalLink,
  Filter,
  FolderGit2,
  Github,
  X,
} from 'lucide-react';

import { projectsData } from '../data/portfolioData';
import { Project } from '../types';

interface ProjectsProps {
  onOpenLightbox: (project: Project) => void;
}

const PROJECTS_PER_LOAD = 4;

export default function Projects({ onOpenLightbox }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_LOAD);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const orderedProjects = useMemo(
    () =>
      [...projectsData].sort((a, b) => {
        const aIsData = a.category === 'Data Analysis';
        const bIsData = b.category === 'Data Analysis';

        if (aIsData === bIsData) return 0;
        return aIsData ? -1 : 1;
      }),
    []
  );

  const categories = useMemo(
    () => [
      'All',
      ...Array.from(
        new Set(orderedProjects.map((project) => project.category))
      ),
    ],
    [orderedProjects]
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return orderedProjects;

    return orderedProjects.filter(
      (project) => project.category === activeFilter
    );
  }, [activeFilter, orderedProjects]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < filteredProjects.length;
  const remainingProjects = filteredProjects.length - visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((current) =>
      Math.min(current + PROJECTS_PER_LOAD, filteredProjects.length)
    );
  };

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    setVisibleCount(PROJECTS_PER_LOAD);
    setSelectedProject(null);
  };

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeProjectDetails();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="relative z-10 bg-[#F5F1E8] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
          className="mb-10 max-w-3xl"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#2F5D50]">
              03 / Projects
            </span>
            <span className="h-px w-10 bg-[#DDD6C8]" />
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight text-[#1D2A26] sm:text-4xl">
            Selected work.
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-[#4B5563]">
            A selection of data analysis, business intelligence, forecasting,
            and automation projects built to solve practical problems.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4 }}
          className="mb-12 overflow-x-auto pb-1"
        >
          <div className="flex min-w-max items-center gap-5 border-y border-[#DDD6C8] py-3">
            <div className="flex items-center gap-2 pr-2 text-xs font-medium text-[#6B7280]">
              <Filter className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Filter</span>
            </div>

            {categories.map((category) => {
              const isActive = activeFilter === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleFilterChange(category)}
                  className={`relative whitespace-nowrap py-1 text-xs font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-[#2F5D50]'
                      : 'text-[#6B7280] hover:text-[#1D2A26]'
                  }`}
                >
                  {category}

                  {isActive && (
                    <motion.span
                      layoutId="projectFilterIndicator"
                      className="absolute -bottom-3 left-0 right-0 h-px bg-[#2F5D50]"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Project Count */}
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
              Project archive
            </p>

            <h3 className="mt-1 font-display text-xl font-bold text-[#1D2A26] sm:text-2xl">
              Recent work
            </h3>
          </div>

          <span className="font-mono text-xs text-[#6B7280]">
            {filteredProjects.length}{' '}
            {filteredProjects.length === 1 ? 'project' : 'projects'}
          </span>
        </div>

        {/* Editorial Project List */}
        {visibleProjects.length > 0 ? (
          <div className="border-y border-[#DDD6C8]">
            <AnimatePresence initial={false} mode="popLayout">
              {visibleProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{
                    duration: 0.4,
                    delay: (index % PROJECTS_PER_LOAD) * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="border-b border-[#DDD6C8] last:border-b-0"
                >
                  <div className="grid gap-5 py-8 sm:grid-cols-[64px_1fr_auto] sm:items-center sm:gap-7 sm:py-10">
                    <span className="font-mono text-xs font-semibold text-[#6B7280]">
                      {String(
                        orderedProjects.findIndex(
                          (item) => item.id === project.id
                        ) + 1
                      ).padStart(2, '0')}
                    </span>

                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-2">
                        <h3 className="font-display text-xl font-bold tracking-tight text-[#1D2A26] sm:text-2xl">
                          {project.title}
                        </h3>

                        <span className="rounded-full border border-[#DDD6C8] bg-[#FCFAF6] px-2.5 py-1 text-[10px] font-mono font-medium uppercase tracking-wide text-[#6B7280]">
                          {project.category}
                        </span>
                      </div>

                      <p className="max-w-3xl text-sm leading-6 text-[#4B5563]">
                        {project.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => openProjectDetails(project)}
                      className="group inline-flex items-center justify-between gap-4 text-left sm:justify-end"
                      aria-label={`View details for ${project.title}`}
                    >
                      <span className="text-xs font-semibold text-[#2F5D50] transition-colors group-hover:text-[#1D2A26]">
                        View project
                      </span>

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#DDD6C8] bg-[#FCFAF6] text-[#2F5D50] transition-all duration-200 group-hover:border-[#2F5D50] group-hover:bg-[#2F5D50] group-hover:text-white">
                        <ChevronDown className="-rotate-90 h-4 w-4" />
                      </span>
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="border-y border-[#DDD6C8] py-16 text-center sm:py-20"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-[#DDD6C8] bg-[#FCFAF6]">
              <FolderGit2 className="h-5 w-5 text-[#2F5D50]" />
            </div>

            <p className="text-base text-[#6B7280]">
              No projects found for this category.
            </p>

            <button
              type="button"
              onClick={() => handleFilterChange('All')}
              className="mt-5 rounded-lg bg-[#2F5D50] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#244A40]"
            >
              Reset Filter
            </button>
          </motion.div>
        )}

        {/* Load More */}
        {hasMoreProjects && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mt-14 flex flex-col items-center"
          >
            <motion.button
              type="button"
              onClick={handleLoadMore}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 rounded-lg border border-[#2F5D50] bg-[#FCFAF6] px-6 py-3 text-sm font-semibold text-[#2F5D50] transition-colors duration-200 hover:bg-[#2F5D50] hover:text-white"
            >
              <span>Load More Projects</span>
              <ChevronDown className="h-4 w-4" />
            </motion.button>

            <p className="mt-3 font-mono text-[11px] text-[#6B7280]">
              {remainingProjects}{' '}
              {remainingProjects === 1 ? 'more project' : 'more projects'} to
              explore
            </p>
          </motion.div>
        )}

        {/* All Projects Viewed */}
        {!hasMoreProjects && filteredProjects.length > 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
            className="mt-14 flex items-center justify-center gap-3"
          >
            <span className="h-px w-10 bg-[#DDD6C8] sm:w-12" />

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7280] sm:text-xs">
              All projects explored
            </span>

            <span className="h-px w-10 bg-[#DDD6C8] sm:w-12" />
          </motion.div>
        )}
      </div>

      {/* Project Details Modal */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1D2A26]/55 p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeProjectDetails();
              }
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex h-[94vh] max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-[16px] border border-[#DDD6C8] bg-[#FCFAF6]"
            >
              {/* Modal Header / Close */}
              <div className="relative z-30 flex shrink-0 items-center justify-between border-b border-[#DDD6C8] bg-[#FCFAF6] px-4 py-3 sm:px-7 sm:py-4">
                <div className="min-w-0 pr-3 sm:pr-4">
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#6B7280] sm:text-[10px]">
                    Project details
                  </p>
                  <h2
                    id="project-modal-title"
                    className="mt-1 truncate font-display text-base font-bold text-[#1D2A26] sm:text-xl"
                  >
                    {selectedProject.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={closeProjectDetails}
                  aria-label="Hide project details"
                  className="group flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg border-2 border-[#2F5D50] bg-[#FCFAF6] px-3 text-xs font-semibold text-[#2F5D50] shadow-sm transition-colors hover:bg-[#2F5D50] hover:text-white sm:h-10 sm:w-10 sm:px-0"
                >
                  <X className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90" />
                  <span className="sm:hidden">Hide details</span>
                </button>
              </div>

              {/* Modal Content */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                <div className="p-5 sm:p-7 lg:p-9">
                  <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
                    {/* Main Content */}
                    <div className="min-w-0">
                      {selectedProject.mediaUrl && (
                        <button
                          type="button"
                          onClick={() => onOpenLightbox(selectedProject)}
                          className="group mb-8 block w-full overflow-hidden rounded-xl border border-[#DDD6C8] bg-[#F5F1E8] text-left"
                          aria-label={`Open ${selectedProject.title} images`}
                        >
                          <div className="overflow-hidden">
                            <img
                              src={selectedProject.mediaUrl}
                              alt={`${selectedProject.title} project preview`}
                              className="block h-auto max-h-[520px] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
                            />
                          </div>

                          <div className="flex items-center justify-between border-t border-[#DDD6C8] bg-[#FCFAF6] px-4 py-3">
                            <span className="text-xs font-medium text-[#6B7280]">
                              Open project gallery
                            </span>
                            <ExternalLink className="h-3.5 w-3.5 text-[#2F5D50]" />
                          </div>
                        </button>
                      )}

                      {/* About */}
                      <div className="mb-10">
                        <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                          About the project
                        </p>
                        <p className="max-w-3xl text-sm leading-7 text-[#4B5563] sm:text-base">
                          {selectedProject.description}
                        </p>
                      </div>

                      {/* Key Highlights */}
                      {selectedProject.keyHighlights?.length > 0 && (
                        <div className="mb-10">
                          <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                            What I did
                          </p>

                          <div className="divide-y divide-[#DDD6C8] border-y border-[#DDD6C8]">
                            {selectedProject.keyHighlights.map(
                              (highlight, highlightIndex) => (
                                <div
                                  key={highlightIndex}
                                  className="flex items-start gap-4 py-4"
                                >
                                  <span className="mt-1 font-mono text-[10px] font-semibold text-[#2F5D50]">
                                    {String(highlightIndex + 1).padStart(2, '0')}
                                  </span>

                                  <p className="text-sm leading-6 text-[#4B5563]">
                                    {highlight}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {/* Screenshots */}
                      {selectedProject.automationScreenshots?.length > 0 && (
                        <div className="mb-10">
                          <div className="mb-4">
                            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                              Project visuals
                            </p>
                            <p className="mt-1 text-sm text-[#4B5563]">
                              A closer look at the work behind this project.
                            </p>
                          </div>

                          <div className="grid gap-5 sm:grid-cols-2">
                            {selectedProject.automationScreenshots.map(
                              (screenshot, screenshotIndex) => (
                                <button
                                  key={`${screenshot.title}-${screenshotIndex}`}
                                  type="button"
                                  onClick={() =>
                                    onOpenLightbox(selectedProject)
                                  }
                                  className="group overflow-hidden rounded-xl border border-[#DDD6C8] bg-[#FCFAF6] text-left"
                                >
                                  <div className="overflow-hidden bg-[#F5F1E8]">
                                    <img
                                      src={screenshot.image}
                                      alt={screenshot.title}
                                      className="block h-48 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                                    />
                                  </div>

                                  <div className="border-t border-[#DDD6C8] p-4">
                                    <p className="text-sm font-semibold text-[#1D2A26]">
                                      {screenshot.title}
                                    </p>

                                    {screenshot.caption && (
                                      <p className="mt-1.5 text-xs leading-5 text-[#6B7280]">
                                        {screenshot.caption}
                                      </p>
                                    )}
                                  </div>
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {/* Video */}
                      {selectedProject.videoUrl && (
                        <div>
                          <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                            Project walkthrough
                          </p>

                          <div className="overflow-hidden rounded-xl border border-[#DDD6C8] bg-[#F5F1E8]">
                            <video
                              src={selectedProject.videoUrl}
                              controls
                              playsInline
                              className="block w-full"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Project Meta */}
                    <aside>
                      <div className="lg:sticky lg:top-0">
                        <div className="mb-8">
                          <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                            Category
                          </p>

                          <span className="inline-flex rounded-full border border-[#DDD6C8] bg-[#F5F1E8] px-3 py-1.5 text-xs font-medium text-[#4B5563]">
                            {selectedProject.category}
                          </span>
                        </div>

                        <div className="mb-8">
                          <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                            Tools & skills
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {selectedProject.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-[#DDD6C8] bg-[#F5F1E8] px-2.5 py-1.5 text-[11px] font-medium text-[#4B5563]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="border-y border-[#DDD6C8]">
                          {selectedProject.githubUrl && (
                            <a
                              href={selectedProject.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-between gap-4 py-4 text-sm font-semibold text-[#2F5D50] transition-colors hover:text-[#1D2A26]"
                            >
                              <span className="flex items-center gap-2">
                                <Github className="h-4 w-4" />
                                GitHub
                              </span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}

                          {selectedProject.demoUrl && (
                            <a
                              href={selectedProject.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-between gap-4 border-t border-[#DDD6C8] py-4 text-sm font-semibold text-[#2F5D50] transition-colors hover:text-[#1D2A26]"
                            >
                              <span className="flex items-center gap-2">
                                <ExternalLink className="h-4 w-4" />
                                Live / Demo
                              </span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>

                        {/* Hide Details */}
                        <button
                          type="button"
                          onClick={closeProjectDetails}
                          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-[#2F5D50] bg-[#2F5D50] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#244A40]"
                        >
                          <X className="h-4 w-4" />
                          Hide details
                        </button>
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
          </AnimatePresence>,
          document.body
        )
    </section>
  );
}
