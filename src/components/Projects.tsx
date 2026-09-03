import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ExternalLink,
  Filter,
  FolderGit2,
  Github,
  Maximize2,
  X,
} from 'lucide-react';

import { projectsData } from '../data/portfolioData';
import { Project } from '../types';

interface ProjectsProps {
  onOpenLightbox: (project: Project) => void;
}

const PROJECTS_PER_LOAD = 4;
const SWIPE_THRESHOLD = 60;

export default function Projects({ onOpenLightbox }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_LOAD);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isProjectInView, setIsProjectInView] = useState(false);

  const projectRefs = useRef<Map<string, HTMLElement>>(new Map());
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

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
    if (activeFilter === 'All') {
      return orderedProjects;
    }

    return orderedProjects.filter(
      (project) => project.category === activeFilter
    );
  }, [activeFilter, orderedProjects]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const hasMoreProjects = visibleCount < filteredProjects.length;

  const remainingProjects =
    filteredProjects.length - visibleCount;

  const selectedProjectIndex = selectedProject
    ? filteredProjects.findIndex(
        (project) => project.id === selectedProject.id
      )
    : -1;

  const selectedProjectNumber =
    selectedProjectIndex >= 0
      ? selectedProjectIndex + 1
      : 0;

  const totalProjectCount = filteredProjects.length;

  const handleLoadMore = () => {
    setVisibleCount((current) =>
      Math.min(
        current + PROJECTS_PER_LOAD,
        filteredProjects.length
      )
    );
  };

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    setVisibleCount(PROJECTS_PER_LOAD);
    setSelectedProject(null);
    setActiveProjectIndex(0);
  };

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  const navigateProject = (direction: 'next' | 'previous') => {
    if (!selectedProject || filteredProjects.length === 0) {
      return;
    }

    const currentIndex = filteredProjects.findIndex(
      (project) => project.id === selectedProject.id
    );

    if (currentIndex === -1) {
      return;
    }

    const nextIndex =
      direction === 'next'
        ? (currentIndex + 1) % filteredProjects.length
        : (currentIndex - 1 + filteredProjects.length) %
          filteredProjects.length;

    setSelectedProject(filteredProjects[nextIndex]);
  };

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    const touch = event.touches[0];

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    if (
      touchStartX.current === null ||
      touchStartY.current === null ||
      !selectedProject
    ) {
      return;
    }

    const touch = event.changedTouches[0];

    const deltaX =
      touch.clientX - touchStartX.current;

    const deltaY =
      touch.clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    /*
     * Ignore vertical gestures.
     * This prevents normal mobile scrolling from
     * accidentally changing projects.
     */
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
      return;
    }

    if (deltaX < 0) {
      navigateProject('next');
    } else {
      navigateProject('previous');
    }
  };

  /*
   * Keep the document behind the project modal locked.
   */
  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeProjectDetails();
      }

      if (event.key === 'ArrowRight') {
        navigateProject('next');
      }

      if (event.key === 'ArrowLeft') {
        navigateProject('previous');
      }
    };

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        originalOverflow;

      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [selectedProject, filteredProjects]);

  /*
   * Observe project rows as they enter the viewport.
   *
   * The active project is whichever row is closest to
   * the center of the viewport.
   */
  useEffect(() => {
    if (visibleProjects.length === 0) {
      return;
    }

    const elements = Array.from(
      projectRefs.current.values()
    );

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio -
              a.intersectionRatio
          );

        if (visibleEntries.length === 0) {
          return;
        }

        const activeElement =
          visibleEntries[0].target as HTMLElement;

        const projectIndex = Number(
          activeElement.dataset.projectIndex
        );

        if (!Number.isNaN(projectIndex)) {
          setActiveProjectIndex(projectIndex);
          setIsProjectInView(true);
        }
      },
      {
        threshold: [0.2, 0.4, 0.6, 0.8],
        rootMargin: '-25% 0px -25% 0px',
      }
    );

    elements.forEach((element) =>
      observer.observe(element)
    );

    return () => {
      observer.disconnect();
    };
  }, [visibleProjects, activeFilter]);

  /*
   * Reset the active project when filtering changes.
   */
  useEffect(() => {
    setActiveProjectIndex(0);
    setIsProjectInView(false);
  }, [activeFilter]);

  /*
   * Register a project element.
   */
  const registerProjectRef = (
    projectId: string,
    element: HTMLElement | null
  ) => {
    if (element) {
      projectRefs.current.set(
        projectId,
        element
      );
    } else {
      projectRefs.current.delete(projectId);
    }
  };

  return (
    <section
      id="projects"
      className="relative z-10 bg-[#F5F1E8] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: '-60px',
          }}
          transition={{
            duration: 0.45,
          }}
          className="mb-9 max-w-3xl sm:mb-10"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2F5D50] sm:text-xs">
              03 / Projects
            </span>

            <span className="h-px w-10 bg-[#DDD6C8]" />
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight text-[#1D2A26] sm:text-4xl">
            Selected work.
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#4B5563] sm:text-base sm:leading-7">
            A selection of data analysis, business intelligence,
            forecasting, and automation projects built to solve
            practical problems.
          </p>
        </motion.div>

        {/* Mobile / Desktop Project Signal */}
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.4,
          }}
          className="mb-7 border-y border-[#DDD6C8] py-3 sm:mb-8"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                Current project
              </span>

              <span className="h-px w-5 bg-[#DDD6C8]" />

              <span className="font-mono text-xs font-semibold text-[#2F5D50]">
                {String(
                  Math.min(
                    activeProjectIndex + 1,
                    Math.max(filteredProjects.length, 1)
                  )
                ).padStart(2, '0')}
                <span className="mx-1 text-[#B8B0A2]">
                  /
                </span>
                {String(
                  filteredProjects.length
                ).padStart(2, '0')}
              </span>
            </div>

            <div
              className={`flex items-end gap-[2px] transition-opacity duration-300 ${
                isProjectInView
                  ? 'opacity-100'
                  : 'opacity-40'
              }`}
              aria-label="Live project data signal"
            >
              {[5, 10, 7, 14, 8, 12, 6, 11].map(
                (height, index) => (
                  <span
                    key={index}
                    className={`project-index-wave h-[${height}px] w-[2px] rounded-full ${
                      index === 3
                        ? 'bg-[#D97745]'
                        : 'bg-[#2F5D50]'
                    }`}
                    style={{
                      height: `${height}px`,
                      animationDelay: `${index * 90}ms`,
                    }}
                  />
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: '-60px',
          }}
          transition={{
            duration: 0.4,
          }}
          className="mb-10 overflow-x-auto pb-1 sm:mb-12"
        >
          <div className="flex min-w-max items-center gap-5 border-y border-[#DDD6C8] py-3">
            <div className="flex items-center gap-2 pr-2 text-xs font-medium text-[#6B7280]">
              <Filter className="h-3.5 w-3.5" />

              <span className="hidden sm:inline">
                Filter
              </span>
            </div>

            {categories.map((category) => {
              const isActive =
                activeFilter === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    handleFilterChange(category)
                  }
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

        {/* Archive Header */}
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
              Project archive
            </p>

            <h3 className="mt-1 font-display text-xl font-bold text-[#1D2A26] sm:text-2xl">
              Recent work
            </h3>
          </div>

          <span className="font-mono text-[10px] text-[#6B7280] sm:text-xs">
            {filteredProjects.length}{' '}
            {filteredProjects.length === 1
              ? 'project'
              : 'projects'}
          </span>
        </div>

        {/* Project List */}
        {visibleProjects.length > 0 ? (
          <div className="border-y border-[#DDD6C8]">
            <AnimatePresence
              initial={false}
              mode="popLayout"
            >
              {visibleProjects.map(
                (project, index) => {
                  const actualProjectIndex =
                    filteredProjects.findIndex(
                      (item) =>
                        item.id === project.id
                    );

                  const isActive =
                    activeProjectIndex ===
                    actualProjectIndex;

                  const shortDescription =
                    project.description.length >
                    190
                      ? `${project.description
                          .slice(0, 187)
                          .trimEnd()}…`
                      : project.description;

                  return (
                    <motion.article
                      key={project.id}
                      ref={(element) =>
                        registerProjectRef(
                          project.id,
                          element
                        )
                      }
                      data-project-index={
                        actualProjectIndex
                      }
                      layout
                      initial={{
                        opacity: 0,
                        y: 18,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -12,
                      }}
                      transition={{
                        duration: 0.4,
                        delay:
                          (index %
                            PROJECTS_PER_LOAD) *
                          0.05,
                        ease: [
                          0.16,
                          1,
                          0.3,
                          1,
                        ],
                      }}
                      className={`group border-b border-[#DDD6C8] last:border-b-0 ${
                        isActive
                          ? 'bg-[#FCFAF6]/35'
                          : ''
                      }`}
                    >
                      <div className="py-8 sm:py-10">
                        {/* Project Top Row */}
                        <div className="mb-5 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <span
                              className={`font-mono text-xs font-semibold transition-colors duration-300 ${
                                isActive
                                  ? 'text-[#2F5D50]'
                                  : 'text-[#6B7280]'
                              }`}
                            >
                              {String(
                                actualProjectIndex +
                                  1
                              ).padStart(2, '0')}
                            </span>

                            <span
                              className={`h-px transition-all duration-300 ${
                                isActive
                                  ? 'w-8 bg-[#2F5D50]'
                                  : 'w-4 bg-[#DDD6C8]'
                              }`}
                            />
                          </div>

                          {/* Reactive waveform */}
                          <div
                            className={`flex h-5 items-end gap-[2px] transition-opacity duration-300 ${
                              isActive
                                ? 'opacity-100'
                                : 'opacity-30'
                            }`}
                            aria-hidden="true"
                          >
                            {[
                              5, 9, 6, 13, 8, 11,
                              7,
                            ].map(
                              (
                                height,
                                waveIndex
                              ) => (
                                <span
                                  key={waveIndex}
                                  className={`project-wave-bar w-[2px] rounded-full ${
                                    waveIndex === 3
                                      ? 'bg-[#D97745]'
                                      : 'bg-[#2F5D50]'
                                  }`}
                                  style={{
                                    height: `${height}px`,
                                    animationDelay: `${
                                      waveIndex *
                                      100
                                    }ms`,
                                    animationPlayState:
                                      isActive
                                        ? 'running'
                                        : 'paused',
                                  }}
                                />
                              )
                            )}
                          </div>
                        </div>

                        {/* Mobile-first project image */}
                        {project.mediaUrl && (
                          <button
                            type="button"
                            onClick={() =>
                              openProjectDetails(
                                project
                              )
                            }
                            className="group/media mb-6 block w-full overflow-hidden rounded-xl border border-[#DDD6C8] bg-[#EDE7DA] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F5D50] focus-visible:ring-offset-2 sm:hidden"
                            aria-label={`Open ${project.title}`}
                          >
                            <div className="relative aspect-[16/10] overflow-hidden">
                              {project.isVideo &&
                              project.videoUrl ? (
                                <video
                                  src={
                                    project.videoUrl
                                  }
                                  poster={
                                    project.mediaUrl
                                  }
                                  muted
                                  playsInline
                                  preload="metadata"
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <img
                                  src={
                                    project.mediaUrl
                                  }
                                  alt={
                                    project.title
                                  }
                                  loading={
                                    index === 0
                                      ? 'eager'
                                      : 'lazy'
                                  }
                                  decoding="async"
                                  referrerPolicy="no-referrer"
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover/media:scale-[1.02]"
                                />
                              )}

                              <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#FCFAF6]/90 text-[#2F5D50] shadow-sm backdrop-blur-sm">
                                <Maximize2 className="h-3.5 w-3.5" />
                              </span>
                            </div>
                          </button>
                        )}

                        {/* Main Project Grid */}
                        <div className="grid gap-6 sm:grid-cols-[64px_minmax(0,1fr)_220px_auto] sm:items-center sm:gap-7">
                          {/* Desktop index */}
                          <div className="hidden sm:block">
                            <span
                              className={`font-mono text-xs font-semibold transition-colors duration-300 ${
                                isActive
                                  ? 'text-[#2F5D50]'
                                  : 'text-[#6B7280]'
                              }`}
                            >
                              {String(
                                actualProjectIndex +
                                  1
                              ).padStart(2, '0')}
                            </span>
                          </div>

                          {/* Project Content */}
                          <div className="min-w-0">
                            <div className="mb-2.5 flex flex-wrap items-center gap-x-3 gap-y-2">
                              <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-[#D97745]">
                                {project.category}
                              </span>

                              {project.featured && (
                                <>
                                  <span className="h-1 w-1 rounded-full bg-[#2F5D50]/40" />

                                  <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-[#6B7280]">
                                    Featured
                                  </span>
                                </>
                              )}
                            </div>

                            <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-[#1D2A26] transition-colors duration-200 group-hover:text-[#2F5D50] sm:text-2xl">
                              {project.title}
                            </h3>

                            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#6B7280]">
                              {shortDescription}
                            </p>

                            {/* Tags */}
                            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5">
                              {project.tags
                                .slice(0, 4)
                                .map(
                                  (
                                    tag,
                                    tagIndex
                                  ) => (
                                    <span
                                      key={tag}
                                      className="flex items-center gap-2 text-[11px] font-medium text-[#6B7280]"
                                    >
                                      {tagIndex >
                                        0 && (
                                        <span className="text-[#C8C1B5]">
                                          ·
                                        </span>
                                      )}

                                      {tag}
                                    </span>
                                  )
                                )}

                              {project.tags.length >
                                4 && (
                                <>
                                  <span className="text-[#C8C1B5]">
                                    ·
                                  </span>

                                  <span className="text-[11px] font-medium text-[#9A9388]">
                                    +
                                    {project.tags
                                      .length -
                                      4}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Desktop Project Image */}
                          {project.mediaUrl && (
                            <button
                              type="button"
                              onClick={() =>
                                openProjectDetails(
                                  project
                                )
                              }
                              className="group/desktop-media relative hidden aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#DDD6C8] bg-[#EDE7DA] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F5D50] focus-visible:ring-offset-2 sm:block"
                              aria-label={`Open ${project.title}`}
                            >
                              {project.isVideo &&
                              project.videoUrl ? (
                                <video
                                  src={
                                    project.videoUrl
                                  }
                                  poster={
                                    project.mediaUrl
                                  }
                                  muted
                                  playsInline
                                  preload="metadata"
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover/desktop-media:scale-[1.02]"
                                />
                              ) : (
                                <img
                                  src={
                                    project.mediaUrl
                                  }
                                  alt={
                                    project.title
                                  }
                                  loading="lazy"
                                  decoding="async"
                                  referrerPolicy="no-referrer"
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover/desktop-media:scale-[1.02]"
                                />
                              )}

                              <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#FCFAF6]/90 text-[#2F5D50] opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-200 group-hover/desktop-media:opacity-100">
                                <Maximize2 className="h-3.5 w-3.5" />
                              </span>
                            </button>
                          )}

                          {/* Action */}
                          <button
                            type="button"
                            onClick={() =>
                              openProjectDetails(
                                project
                              )
                            }
                            className="group/action inline-flex items-center justify-between gap-4 text-left sm:justify-end"
                            aria-label={`View details for ${project.title}`}
                          >
                            <span className="text-xs font-semibold text-[#2F5D50] transition-colors group-hover/action:text-[#1D2A26]">
                              View case study
                            </span>

                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#DDD6C8] bg-[#FCFAF6] text-[#2F5D50] transition-all duration-200 group-hover/action:border-[#2F5D50] group-hover/action:bg-[#2F5D50] group-hover/action:text-white">
                              <ArrowUpRight className="h-4 w-4" />
                            </span>
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  );
                }
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
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
              onClick={() =>
                handleFilterChange('All')
              }
              className="mt-5 rounded-lg bg-[#2F5D50] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#244A40]"
            >
              Reset Filter
            </button>
          </motion.div>
        )}

        {/* Load More */}
        {hasMoreProjects && (
          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.45,
              delay: 0.05,
            }}
            className="mt-12 flex flex-col items-center sm:mt-14"
          >
            <motion.button
              type="button"
              onClick={handleLoadMore}
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="inline-flex items-center gap-3 rounded-lg border border-[#2F5D50] bg-[#FCFAF6] px-6 py-3 text-sm font-semibold text-[#2F5D50] transition-colors duration-200 hover:bg-[#2F5D50] hover:text-white"
            >
              <span>
                Load More Projects
              </span>

              <ChevronDown className="h-4 w-4" />
            </motion.button>

            <p className="mt-3 font-mono text-[11px] text-[#6B7280]">
              {remainingProjects}{' '}
              {remainingProjects === 1
                ? 'more project'
                : 'more projects'}{' '}
              to explore
            </p>
          </motion.div>
        )}

        {/* All Projects Viewed */}
        {!hasMoreProjects &&
          filteredProjects.length > 4 && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.45,
              }}
              className="mt-12 flex items-center justify-center gap-3 sm:mt-14"
            >
              <span className="h-px w-10 bg-[#DDD6C8] sm:w-12" />

              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7280] sm:text-xs">
                All projects explored
              </span>

              <span className="h-px w-10 bg-[#DDD6C8] sm:w-12" />
            </motion.div>
          )}
      </div>

      {/* Swipeable Project Case Study */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1D2A26]/60 p-0 sm:p-6"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                onMouseDown={(event) => {
                  if (
                    event.target ===
                    event.currentTarget
                  ) {
                    closeProjectDetails();
                  }
                }}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="project-modal-title"
                  initial={{
                    opacity: 0,
                    y: 20,
                    scale: 0.985,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 16,
                    scale: 0.985,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                  className="relative flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden bg-[#FCFAF6] sm:h-[94vh] sm:max-h-[94vh] sm:max-w-6xl sm:rounded-[16px] sm:border sm:border-[#DDD6C8]"
                  onTouchStart={
                    handleTouchStart
                  }
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Modal Header */}
                  <div className="relative z-30 flex shrink-0 items-center justify-between border-b border-[#DDD6C8] bg-[#FCFAF6] px-4 py-3 sm:px-7 sm:py-4">
                    <div className="min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#2F5D50]">
                          {String(
                            selectedProjectNumber
                          ).padStart(2, '0')}{' '}
                          /{' '}
                          {String(
                            totalProjectCount
                          ).padStart(2, '0')}
                        </span>

                        <span className="h-1 w-1 rounded-full bg-[#D97745]" />

                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#6B7280]">
                          Case study
                        </span>
                      </div>

                      <h2
                        id="project-modal-title"
                        className="mt-1 truncate font-display text-base font-bold text-[#1D2A26] sm:text-xl"
                      >
                        {selectedProject.title}
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={
                        closeProjectDetails
                      }
                      aria-label="Close project details"
                      className="group flex h-10 shrink-0 items-center justify-center rounded-lg border border-[#DDD6C8] bg-[#FCFAF6] px-3 text-[#1D2A26] transition-colors hover:border-[#2F5D50] hover:text-[#2F5D50] sm:w-10 sm:px-0"
                    >
                      <X className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90" />

                      <span className="ml-2 text-xs font-semibold sm:hidden">
                        Close
                      </span>
                    </button>
                  </div>

                  {/* Mobile Swipe Hint */}
                  <div className="flex shrink-0 items-center justify-between border-b border-[#DDD6C8] px-4 py-2.5 sm:hidden">
                    <button
                      type="button"
                      onClick={() =>
                        navigateProject(
                          'previous'
                        )
                      }
                      className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6B7280]"
                      aria-label="Previous project"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Prev
                    </button>

                    <span className="font-mono text-[9px] text-[#9A9388]">
                      Swipe to explore
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        navigateProject('next')
                      }
                      className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6B7280]"
                      aria-label="Next project"
                    >
                      Next
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                    <div className="p-5 sm:p-7 lg:p-9">
                      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">

                        {/* Main Content */}
                        <div className="min-w-0">

                          {/* Main Project Image */}
                          {selectedProject.mediaUrl && (
                            <button
                              type="button"
                              onClick={() =>
                                onOpenLightbox(
                                  selectedProject
                                )
                              }
                              className="group mb-7 block w-full overflow-hidden rounded-xl border border-[#DDD6C8] bg-[#F5F1E8] text-left sm:mb-8"
                              aria-label={`Open ${selectedProject.title} images`}
                            >
                              <div className="relative overflow-hidden">
                                {selectedProject.isVideo &&
                                selectedProject.videoUrl ? (
                                  <video
                                    src={
                                      selectedProject.videoUrl
                                    }
                                    poster={
                                      selectedProject.mediaUrl
                                    }
                                    controls
                                    playsInline
                                    className="block max-h-[520px] w-full object-cover"
                                    onClick={(event) =>
                                      event.stopPropagation()
                                    }
                                  />
                                ) : (
                                  <img
                                    src={
                                      selectedProject.mediaUrl
                                    }
                                    alt={`${selectedProject.title} project preview`}
                                    referrerPolicy="no-referrer"
                                    className="block max-h-[520px] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
                                  />
                                )}

                                <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#FCFAF6]/90 text-[#2F5D50] shadow-sm backdrop-blur-sm sm:bottom-4 sm:right-4">
                                  <Maximize2 className="h-3.5 w-3.5" />
                                </span>
                              </div>
                            </button>
                          )}

                          {/* About */}
                          <div className="mb-9 sm:mb-10">
                            <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                              About the project
                            </p>

                            <p className="max-w-3xl text-sm leading-7 text-[#4B5563] sm:text-base">
                              {selectedProject.description}
                            </p>
                          </div>

                          {/* Key Highlights */}
                          {selectedProject.keyHighlights?.length >
                            0 && (
                            <div className="mb-9 sm:mb-10">
                              <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                                What I did
                              </p>

                              <div className="divide-y divide-[#DDD6C8] border-y border-[#DDD6C8]">
                                {selectedProject.keyHighlights.map(
                                  (
                                    highlight,
                                    highlightIndex
                                  ) => (
                                    <div
                                      key={
                                        highlightIndex
                                      }
                                      className="flex items-start gap-4 py-4"
                                    >
                                      <span className="mt-1 font-mono text-[10px] font-semibold text-[#2F5D50]">
                                        {String(
                                          highlightIndex +
                                            1
                                        ).padStart(
                                          2,
                                          '0'
                                        )}
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
                          {selectedProject.automationScreenshots?.length >
                            0 && (
                            <div className="mb-9 sm:mb-10">
                              <div className="mb-4">
                                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                                  Project visuals
                                </p>

                                <p className="mt-1 text-sm text-[#4B5563]">
                                  A closer look at the work behind
                                  this project.
                                </p>
                              </div>

                              <div className="grid gap-5 sm:grid-cols-2">
                                {selectedProject.automationScreenshots.map(
                                  (
                                    screenshot,
                                    screenshotIndex
                                  ) => (
                                    <button
                                      key={`${screenshot.title}-${screenshotIndex}`}
                                      type="button"
                                      onClick={() =>
                                        onOpenLightbox(
                                          selectedProject
                                        )
                                      }
                                      className="group overflow-hidden rounded-xl border border-[#DDD6C8] bg-[#FCFAF6] text-left"
                                    >
                                      <div className="overflow-hidden bg-[#F5F1E8]">
                                        <img
                                          src={
                                            screenshot.image
                                          }
                                          alt={
                                            screenshot.title
                                          }
                                          loading="lazy"
                                          decoding="async"
                                          className="block h-48 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                                        />
                                      </div>

                                      <div className="border-t border-[#DDD6C8] p-4">
                                        <p className="text-sm font-semibold text-[#1D2A26]">
                                          {
                                            screenshot.title
                                          }
                                        </p>

                                        {screenshot.caption && (
                                          <p className="mt-1.5 text-xs leading-5 text-[#6B7280]">
                                            {
                                              screenshot.caption
                                            }
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
                                  src={
                                    selectedProject.videoUrl
                                  }
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

                            {/* Category */}
                            <div className="mb-7">
                              <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                                Category
                              </p>

                              <span className="inline-flex rounded-full border border-[#DDD6C8] bg-[#F5F1E8] px-3 py-1.5 text-xs font-medium text-[#4B5563]">
                                {
                                  selectedProject.category
                                }
                              </span>
                            </div>

                            {/* Tools */}
                            <div className="mb-7">
                              <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                                Tools & skills
                              </p>

                              <div className="flex flex-wrap gap-2">
                                {selectedProject.tags.map(
                                  (tag) => (
                                    <span
                                      key={tag}
                                      className="rounded-full border border-[#DDD6C8] bg-[#F5F1E8] px-2.5 py-1.5 text-[11px] font-medium text-[#4B5563]"
                                    >
                                      {tag}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>

                            {/* Links */}
                            <div className="border-y border-[#DDD6C8]">
                              {selectedProject.githubUrl && (
                                <a
                                  href={
                                    selectedProject.githubUrl
                                  }
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
                                  href={
                                    selectedProject.demoUrl
                                  }
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

                            {/* Desktop Previous / Next */}
                            <div className="mt-6 hidden grid-cols-2 gap-2 sm:grid">
                              <button
                                type="button"
                                onClick={() =>
                                  navigateProject(
                                    'previous'
                                  )
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#DDD6C8] bg-[#FCFAF6] px-3 py-3 text-xs font-semibold text-[#4B5563] transition-colors hover:border-[#2F5D50] hover:text-[#2F5D50]"
                              >
                                <ArrowLeft className="h-3.5 w-3.5" />
                                Previous
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  navigateProject(
                                    'next'
                                  )
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#2F5D50] bg-[#2F5D50] px-3 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#244A40]"
                              >
                                Next
                                <ArrowRight className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            {/* Hide Details */}
                            <button
                              type="button"
                              onClick={
                                closeProjectDetails
                              }
                              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[#DDD6C8] bg-[#FCFAF6] px-4 py-3 text-sm font-semibold text-[#4B5563] transition-colors hover:border-[#2F5D50] hover:text-[#2F5D50]"
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
        )}

      <style>
        {`
          @keyframes projectWave {
            0%, 100% {
              transform: scaleY(0.45);
              opacity: 0.45;
            }

            50% {
              transform: scaleY(1);
              opacity: 1;
            }
          }

          .project-wave-bar {
            transform-origin: bottom;
            animation: projectWave 1.1s ease-in-out infinite;
          }

          .project-index-wave {
            transform-origin: bottom;
            animation: projectWave 1.2s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .project-wave-bar,
            .project-index-wave {
              animation: none !important;
            }
          }
        `}
      </style>
    </section>
  );
}
