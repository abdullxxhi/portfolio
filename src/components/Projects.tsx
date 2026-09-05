import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type TouchEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ExternalLink,
  Filter,
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

const PROJECT_ORDER = [
  'Customer Churn Analysis',
  'Sales Forecasting & Predictive Analysis',
  'Weekly Sales Forecasting Analysis',
  'Apple Financial Performance Dashboard',
  'Clinic Appointment Automation',
  'Seleem Bakery Website',
  'Smart Event Registration & Capacity Management Automation',
  'AI Customer Support Bot',
  'AI Natural Language Order Management Automation',
  'AI Email Triage & Response System',
  'Product Quality Control Data Cleaning & Validation',
  'A.M. BIBIRE NIG LIMITED Website',
];

function ComplexityIndicator({
  value,
}: {
  value: number;
}) {
  const level = Math.min(5, Math.max(1, value));

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
        Complexity
      </span>

      <div
        className="flex items-center gap-1"
        aria-label={`Project complexity ${level} out of 5`}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={`h-1.5 w-3 rounded-full ${
              index < level
                ? 'bg-[#2F5D50]'
                : 'bg-[#DDD6C8]'
            }`}
          />
        ))}
      </div>

      <span className="font-mono text-[10px] font-semibold text-[#4B5563]">
        {level}/5
      </span>
    </div>
  );
}

export default function Projects({ onOpenLightbox }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_LOAD);
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    null
  );
  const [isProjectInView, setIsProjectInView] = useState(false);

  const projectRefs = useRef<Map<string, HTMLElement>>(new Map());
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const orderedProjects = useMemo(() => {
    return PROJECT_ORDER.map((title) =>
      projectsData.find((project) => project.title === title)
    ).filter((project): project is Project => Boolean(project));
  }, []);

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
    selectedProjectIndex >= 0 ? selectedProjectIndex + 1 : 0;

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

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    if (selectedProjectIndex >= visibleCount) {
      setVisibleCount(
        Math.min(
          Math.ceil(
            (selectedProjectIndex + 1) / PROJECTS_PER_LOAD
          ) * PROJECTS_PER_LOAD,
          filteredProjects.length
        )
      );
    }
  }, [
    selectedProject,
    selectedProjectIndex,
    visibleCount,
    filteredProjects.length,
  ]);

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

    window.addEventListener('keydown', handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject, filteredProjects]);

  useEffect(() => {
    const elements = Array.from(projectRefs.current.values());

    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(
          (entry) => entry.isIntersecting
        );

        if (visibleEntries.length === 0) {
          setIsProjectInView(false);
          return;
        }

        setIsProjectInView(true);
      },
      {
        threshold: 0.2,
        rootMargin: '-40px 0px -40px 0px',
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [visibleProjects]);

  const setProjectRef = (
    projectId: string,
    element: HTMLElement | null
  ) => {
    if (!element) {
      projectRefs.current.delete(projectId);
      return;
    }

    projectRefs.current.set(projectId, element);
  };

  const handleTouchStart = (
    event: TouchEvent<HTMLDivElement>
  ) => {
    touchStartX.current =
      event.touches[0]?.clientX ?? null;

    touchStartY.current =
      event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (
    event: TouchEvent<HTMLDivElement>
  ) => {
    if (
      touchStartX.current === null ||
      touchStartY.current === null
    ) {
      return;
    }

    const endX =
      event.changedTouches[0]?.clientX ??
      touchStartX.current;

    const endY =
      event.changedTouches[0]?.clientY ??
      touchStartY.current;

    const deltaX = endX - touchStartX.current;
    const deltaY = endY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
      return;
    }

    if (Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    navigateProject(
      deltaX < 0 ? 'next' : 'previous'
    );
  };

  return (
    <>
      <section
        id="projects"
        className="relative z-10 bg-[#F5F1E8] py-24 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mb-12 max-w-3xl"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#2F5D50]">
                03 / Projects
              </span>

              <span className="h-px w-10 bg-[#DDD6C8]" />
            </div>

            <h2 className="font-display text-3xl font-bold tracking-[-0.025em] text-[#1D2A26] sm:text-4xl lg:text-5xl">
              Selected work.
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#4B5563]">
              A selection of data analysis, business intelligence,
              automation, and web development projects built to solve
              practical problems.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="mb-10 flex flex-wrap items-center gap-2">
            <div className="mr-2 flex items-center gap-2 text-sm font-medium text-[#6B7280]">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </div>

            {categories.map((category) => {
              const isActive = activeFilter === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    handleFilterChange(category)
                  }
                  className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'border-[#2F5D50] bg-[#2F5D50] text-white'
                      : 'border-[#DDD6C8] bg-[#FCFAF6] text-[#4B5563] hover:border-[#2F5D50]/40 hover:text-[#2F5D50]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Project list */}
          <div className="border-y border-[#DDD6C8]">
            {visibleProjects.map((project, index) => {
              const actualIndex =
                filteredProjects.findIndex(
                  (item) => item.id === project.id
                );

              const projectNumber = String(
                actualIndex + 1
              ).padStart(2, '0');

              const description =
                project.description.length > 220
                  ? `${project.description
                      .slice(0, 220)
                      .trim()}…`
                  : project.description;

              const visibleTags =
                project.tags.slice(0, 4);

              const remainingTags =
                project.tags.length -
                visibleTags.length;

              const isFeatured = project.featured;

              return (
                <motion.article
                  key={project.id}
                  ref={(element) =>
                    setProjectRef(
                      project.id,
                      element
                    )
                  }
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: '-70px',
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                  className={`group relative border-b border-[#DDD6C8] last:border-b-0 ${
                    isFeatured
                      ? 'bg-[#FCFAF6]/60'
                      : ''
                  }`}
                >
                  {/* Selected work marker */}
                  {isFeatured && (
                    <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#D97745]" />
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      openProjectDetails(project)
                    }
                    className="block w-full text-left"
                  >
                    <div
                      className={`grid gap-7 lg:grid-cols-[80px_minmax(0,1fr)_280px] lg:gap-10 ${
                        isFeatured
                          ? 'py-10 sm:py-12'
                          : 'py-9 sm:py-11'
                      }`}
                    >

                      {/* Project number */}
                      <div className="flex items-start">
                        <span
                          className={`font-mono font-semibold tracking-wide transition-colors ${
                            isFeatured
                              ? 'text-base text-[#D97745]'
                              : 'text-sm text-[#6B7280] group-hover:text-[#2F5D50]'
                          }`}
                        >
                          {projectNumber}
                        </span>
                      </div>

                      {/* Main project information */}
                      <div>
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                          <span
                            className={`font-mono font-semibold uppercase tracking-[0.16em] ${
                              isFeatured
                                ? 'text-[11px] text-[#D97745]'
                                : 'text-[11px] text-[#2F5D50]'
                            }`}
                          >
                            {project.category}
                          </span>

                          {isFeatured && (
                            <>
                              <span className="h-1 w-1 rounded-full bg-[#D97745]" />

                              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
                                Selected work
                              </span>
                            </>
                          )}
                        </div>

                        <div className="flex items-start gap-3">
                          <h3
                            className={`font-display font-bold leading-tight tracking-[-0.025em] text-[#1D2A26] transition-colors duration-200 group-hover:text-[#2F5D50] ${
                              isFeatured
                                ? 'text-3xl sm:text-4xl'
                                : 'text-2xl sm:text-3xl'
                            }`}
                          >
                            {project.title}
                          </h3>

                          <ArrowUpRight
                            className={`shrink-0 text-[#A8A095] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#D97745] ${
                              isFeatured
                                ? 'mt-1.5 h-5 w-5'
                                : 'mt-1 h-5 w-5'
                            }`}
                          />
                        </div>

                        <p
                          className={`max-w-3xl text-[#4B5563] ${
                            isFeatured
                              ? 'mt-5 text-base leading-7'
                              : 'mt-4 text-sm leading-7 sm:text-base'
                          }`}
                        >
                          {description}
                        </p>

                        <div className="mt-5 flex flex-wrap items-center gap-2">
                          {visibleTags.map((tag) => (
                            <span
                              key={tag}
                              className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                                isFeatured
                                  ? 'border-[#2F5D50]/20 bg-[#FCFAF6] text-[#4B5563]'
                                  : 'border-[#DDD6C8] bg-[#FCFAF6] text-[#6B7280]'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}

                          {remainingTags > 0 && (
                            <span className="px-1 text-xs font-medium text-[#6B7280]">
                              +{remainingTags}
                            </span>
                          )}
                        </div>

                        <div className="mt-5">
                          <ComplexityIndicator
                            value={project.complexity}
                          />
                        </div>

                        <div
                          className={`flex items-center gap-2 font-semibold text-[#2F5D50] ${
                            isFeatured
                              ? 'mt-7 text-sm'
                              : 'mt-6 text-sm'
                          }`}
                        >
                          <span>
                            View case study
                          </span>

                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </div>
                      </div>

                      {/* Project media */}
                      <div className="hidden lg:block">
                        <div
                          className={`overflow-hidden rounded-xl border bg-[#FCFAF6] transition-all duration-300 ${
                            isFeatured
                              ? 'border-[#D97745]/30 shadow-[0_14px_35px_-25px_rgba(217,119,69,0.3)] group-hover:-translate-y-1 group-hover:border-[#D97745]/50 group-hover:shadow-[0_20px_40px_-24px_rgba(29,42,38,0.3)]'
                              : 'border-[#DDD6C8] group-hover:-translate-y-1 group-hover:border-[#2F5D50]/30 group-hover:shadow-[0_16px_35px_-24px_rgba(29,42,38,0.25)]'
                          }`}
                        >
                          <div
                            className={`relative overflow-hidden ${
                              isFeatured
                                ? 'aspect-[16/10]'
                                : 'aspect-[16/10]'
                            }`}
                          >
                            {project.isVideo ? (
                              <video
                                src={project.videoUrl}
                                muted
                                playsInline
                                preload="metadata"
                                className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
                                  isFeatured
                                    ? 'group-hover:scale-[1.04]'
                                    : 'group-hover:scale-[1.025]'
                                }`}
                              />
                            ) : (
                              <img
                                src={project.mediaUrl}
                                alt={project.title}
                                className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
                                  isFeatured
                                    ? 'group-hover:scale-[1.04]'
                                    : 'group-hover:scale-[1.025]'
                                }`}
                              />
                            )}

                            <div
                              className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                                isFeatured
                                  ? 'bg-gradient-to-t from-[#1D2A26]/20 via-transparent to-transparent opacity-20 group-hover:opacity-100'
                                  : 'bg-gradient-to-t from-[#1D2A26]/10 to-transparent opacity-0 group-hover:opacity-100'
                              }`}
                            />

                            {isFeatured && (
                              <div className="pointer-events-none absolute left-3 top-3 rounded-md border border-white/60 bg-[#FCFAF6]/90 px-2 py-1 backdrop-blur-sm">
                                <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-[#D97745]">
                                  Selected
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.article>
              );
            })}
          </div>

          {/* Empty state */}
          {visibleProjects.length === 0 && (
            <div className="border-b border-[#DDD6C8] py-16 text-center">
              <p className="text-sm text-[#6B7280]">
                No projects found in this category.
              </p>
            </div>
          )}

          {/* Load more */}
          {hasMoreProjects && (
            <div className="flex justify-center pt-10">
              <button
                type="button"
                onClick={handleLoadMore}
                className="group inline-flex items-center gap-2 rounded-lg border border-[#DDD6C8] bg-[#FCFAF6] px-5 py-3 text-sm font-semibold text-[#1D2A26] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2F5D50]/40 hover:text-[#2F5D50]"
              >
                <span>
                  Load more
                  {remainingProjects > 0
                    ? ` (${remainingProjects})`
                    : ''}
                </span>

                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              </button>
            </div>
          )}

          {/* Project count + waveform */}
          <div className="mt-12 flex items-center justify-between border-t border-[#DDD6C8] pt-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#6B7280]">
              {filteredProjects.length} projects
            </span>

            <div
              className={`data-waveform ${
                isProjectInView
                  ? 'is-active'
                  : ''
              }`}
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </section>

      {/* Project case-study modal */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] overflow-y-auto bg-[#1D2A26]/45 p-4 sm:p-6 lg:p-10"
                onMouseDown={(event) => {
                  if (
                    event.target ===
                    event.currentTarget
                  ) {
                    closeProjectDetails();
                  }
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div className="mx-auto flex min-h-full max-w-5xl items-center justify-center">
                  <motion.div
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
                      y: 20,
                      scale: 0.985,
                    }}
                    transition={{
                      duration: 0.35,
                      ease: [
                        0.16,
                        1,
                        0.3,
                        1,
                      ],
                    }}
                    className="w-full overflow-hidden rounded-2xl border border-[#DDD6C8] bg-[#FCFAF6]"
                  >
                    {/* Modal header */}
                    <div className="flex items-center justify-between gap-4 border-b border-[#DDD6C8] px-5 py-4 sm:px-7">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="shrink-0 font-mono text-xs font-semibold text-[#2F5D50]">
                          {String(
                            selectedProjectNumber
                          ).padStart(2, '0')}{' '}
                          /{' '}
                          {String(
                            totalProjectCount
                          ).padStart(2, '0')}
                        </span>

                        <span className="h-4 w-px bg-[#DDD6C8]" />

                        <span className="truncate font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B7280]">
                          {selectedProject.category}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={
                          closeProjectDetails
                        }
                        className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[#DDD6C8] px-3 py-2 text-sm font-semibold text-[#4B5563] transition-colors hover:border-[#2F5D50]/40 hover:text-[#2F5D50]"
                        aria-label="Close project details"
                      >
                        <X className="h-4 w-4" />

                        <span className="hidden sm:inline">
                          Close
                        </span>
                      </button>
                    </div>

                    {/* Modal content */}
                    <div className="max-h-[calc(100vh-140px)] overflow-y-auto">
                      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">

                        {/* Media */}
                        <div className="border-b border-[#DDD6C8] bg-[#F5F1E8] p-4 sm:p-6 lg:border-b-0 lg:border-r">
                          <div className="overflow-hidden rounded-xl border border-[#DDD6C8] bg-[#FCFAF6]">
                            <div className="relative aspect-[16/10]">
                              {selectedProject.isVideo ? (
                                <video
                                  src={
                                    selectedProject.videoUrl
                                  }
                                  controls
                                  playsInline
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <img
                                  src={
                                    selectedProject.mediaUrl
                                  }
                                  alt={
                                    selectedProject.title
                                  }
                                  className="h-full w-full object-cover"
                                />
                              )}

                              <button
                                type="button"
                                onClick={() =>
                                  onOpenLightbox(
                                    selectedProject
                                  )
                                }
                                className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-lg border border-white/60 bg-[#FCFAF6]/90 px-3 py-2 text-xs font-semibold text-[#1D2A26] backdrop-blur-sm transition-colors hover:bg-white"
                              >
                                <Maximize2 className="h-3.5 w-3.5" />

                                <span>
                                  View media
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="p-5 sm:p-7 lg:p-8">
                          <div className="mb-5">
                            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2F5D50]">
                              Case Study
                            </span>

                            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#1D2A26] sm:text-3xl">
                              {
                                selectedProject.title
                              }
                            </h2>
                          </div>

                          <p className="text-sm leading-7 text-[#4B5563]">
                            {
                              selectedProject.description
                            }
                          </p>

                          {/* Complexity */}
                          <div className="mt-6 border-t border-[#DDD6C8] pt-5">
                            <ComplexityIndicator
                              value={
                                selectedProject.complexity
                              }
                            />
                          </div>

                          {/* Highlights */}
                          {selectedProject.keyHighlights
                            ?.length ? (
                            <div className="mt-7 border-t border-[#DDD6C8] pt-6">
                              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-[#1D2A26]">
                                Key highlights
                              </h3>

                              <div className="mt-4 space-y-3">
                                {selectedProject.keyHighlights.map(
                                  (
                                    highlight,
                                    index
                                  ) => (
                                    <div
                                      key={index}
                                      className="flex items-start gap-3"
                                    >
                                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4E8D66]" />

                                      <p className="text-sm leading-6 text-[#4B5563]">
                                        {
                                          highlight
                                        }
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          ) : null}

                          {/* Technologies */}
                          <div className="mt-7 border-t border-[#DDD6C8] pt-6">
                            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-[#1D2A26]">
                              Technologies
                            </h3>

                            <div className="mt-4 flex flex-wrap gap-2">
                              {selectedProject.tags.map(
                                (tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-full border border-[#DDD6C8] bg-[#F5F1E8] px-2.5 py-1 text-xs font-medium text-[#6B7280]"
                                  >
                                    {tag}
                                  </span>
                                )
                              )}
                            </div>
                          </div>

                          {/* Links */}
                          {(selectedProject.githubUrl ||
                            selectedProject.demoUrl) && (
                            <div className="mt-7 flex flex-wrap gap-3 border-t border-[#DDD6C8] pt-6">
                              {selectedProject.githubUrl && (
                                <a
                                  href={
                                    selectedProject.githubUrl
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 rounded-lg border border-[#DDD6C8] px-4 py-2.5 text-sm font-semibold text-[#1D2A26] transition-colors hover:border-[#2F5D50]/40 hover:text-[#2F5D50]"
                                >
                                  <Github className="h-4 w-4" />

                                  GitHub

                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              )}

                              {selectedProject.demoUrl && (
                                <a
                                  href={
                                    selectedProject.demoUrl
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 rounded-lg bg-[#2F5D50] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#24493f]"
                                >
                                  Live Demo

                                  <ArrowUpRight className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Screenshots */}
                      {selectedProject
                        .automationScreenshots
                        ?.length ? (
                        <div className="border-t border-[#DDD6C8] px-5 py-7 sm:px-7 sm:py-8">
                          <div className="mb-6 flex items-end justify-between gap-4">
                            <div>
                              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2F5D50]">
                                Project media
                              </span>

                              <h3 className="mt-1 font-display text-xl font-bold text-[#1D2A26]">
                                Screenshots & details
                              </h3>
                            </div>

                            <span className="font-mono text-xs text-[#6B7280]">
                              {
                                selectedProject
                                  .automationScreenshots
                                  .length
                              }{' '}
                              views
                            </span>
                          </div>

                          <div className="grid gap-5 sm:grid-cols-2">
                            {selectedProject.automationScreenshots.map(
                              (
                                screenshot,
                                index
                              ) => (
                                <button
                                  key={`${screenshot.title}-${index}`}
                                  type="button"
                                  onClick={() =>
                                    onOpenLightbox(
                                      selectedProject
                                    )
                                  }
                                  className="group overflow-hidden rounded-xl border border-[#DDD6C8] bg-[#F5F1E8] text-left transition-colors hover:border-[#2F5D50]/35"
                                >
                                  <div className="aspect-video overflow-hidden bg-[#FCFAF6]">
                                    <img
                                      src={
                                        screenshot.image
                                      }
                                      alt={
                                        screenshot.title
                                      }
                                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                    />
                                  </div>

                                  <div className="border-t border-[#DDD6C8] p-4">
                                    <div className="flex items-start justify-between gap-3">
                                      <div>
                                        <h4 className="font-display text-sm font-bold text-[#1D2A26]">
                                          {
                                            screenshot.title
                                          }
                                        </h4>

                                        <p className="mt-1 text-xs leading-5 text-[#6B7280]">
                                          {
                                            screenshot.caption
                                          }
                                        </p>
                                      </div>

                                      <Maximize2 className="mt-0.5 h-4 w-4 shrink-0 text-[#6B7280] transition-colors group-hover:text-[#2F5D50]" />
                                    </div>
                                  </div>
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    {/* Previous / Next / Close */}
                    <div className="flex flex-col-reverse gap-3 border-t border-[#DDD6C8] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                      <button
                        type="button"
                        onClick={
                          closeProjectDetails
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#DDD6C8] px-4 py-2.5 text-sm font-semibold text-[#4B5563] transition-colors hover:border-[#2F5D50]/40 hover:text-[#2F5D50]"
                      >
                        <X className="h-4 w-4" />
                        Close
                      </button>

                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            navigateProject(
                              'previous'
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-[#DDD6C8] px-4 py-2.5 text-sm font-semibold text-[#1D2A26] transition-colors hover:border-[#2F5D50]/40 hover:text-[#2F5D50]"
                        >
                          <ArrowLeft className="h-4 w-4" />

                          <span>
                            Previous
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            navigateProject('next')
                          }
                          className="inline-flex items-center gap-2 rounded-lg bg-[#2F5D50] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#24493f]"
                        >
                          <span>Next</span>

                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

/*
 * Tiny editorial data waveform.
 */
const waveformStyles = `
.data-waveform {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2px;
  width: 58px;
  height: 18px;
  opacity: 0.45;
}

.data-waveform span {
  display: block;
  width: 2px;
  height: 5px;
  border-radius: 999px;
  background: #2F5D50;
  transform-origin: center;
}

.data-waveform.is-active span:nth-child(1) {
  animation: dataWave 1.2s ease-in-out infinite;
  animation-delay: 0s;
}

.data-waveform.is-active span:nth-child(2) {
  animation: dataWave 1.2s ease-in-out infinite;
  animation-delay: 0.08s;
}

.data-waveform.is-active span:nth-child(3) {
  animation: dataWave 1.2s ease-in-out infinite;
  animation-delay: 0.16s;
}

.data-waveform.is-active span:nth-child(4) {
  animation: dataWave 1.2s ease-in-out infinite;
  animation-delay: 0.24s;
}

.data-waveform.is-active span:nth-child(5) {
  animation: dataWave 1.2s ease-in-out infinite;
  animation-delay: 0.32s;
}

.data-waveform.is-active span:nth-child(6) {
  animation: dataWave 1.2s ease-in-out infinite;
  animation-delay: 0.4s;
}

.data-waveform.is-active span:nth-child(7) {
  animation: dataWave 1.2s ease-in-out infinite;
  animation-delay: 0.48s;
}

.data-waveform.is-active span:nth-child(8) {
  animation: dataWave 1.2s ease-in-out infinite;
  animation-delay: 0.56s;
}

.data-waveform.is-active span:nth-child(9) {
  animation: dataWave 1.2s ease-in-out infinite;
  animation-delay: 0.64s;
}

.data-waveform.is-active span:nth-child(10) {
  animation: dataWave 1.2s ease-in-out infinite;
  animation-delay: 0.72s;
}

.data-waveform.is-active span:nth-child(11) {
  animation: dataWave 1.2s ease-in-out infinite;
  animation-delay: 0.8s;
}

.data-waveform.is-active span:nth-child(12) {
  animation: dataWave 1.2s ease-in-out infinite;
  animation-delay: 0.88s;
}

@keyframes dataWave {
  0%,
  100% {
    height: 4px;
  }

  50% {
    height: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .data-waveform.is-active span {
    animation: none !important;
  }
}
`;

if (
  typeof document !== 'undefined' &&
  !document.getElementById(
    'projects-waveform-styles'
  )
) {
  const style = document.createElement('style');

  style.id = 'projects-waveform-styles';
  style.textContent = waveformStyles;

  document.head.appendChild(style);
}
