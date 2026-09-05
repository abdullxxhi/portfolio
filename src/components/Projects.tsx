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

/*
 * EXACT PORTFOLIO PROJECT ORDER
 *
 * Only these 12 projects are allowed to appear
 * in the Projects section.
 */
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

/*
 * Project complexity indicator.
 *
 * Displays a subtle 1–5 visual scale without making
 * the project list feel like a dashboard.
 */
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

export default function Projects({
  onOpenLightbox,
}: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(
    PROJECTS_PER_LOAD
  );
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);
  const [isProjectInView, setIsProjectInView] =
    useState(false);

  const projectRefs = useRef<Map<string, HTMLElement>>(
    new Map()
  );
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const orderedProjects = useMemo(() => {
    return PROJECT_ORDER.map((title) =>
      projectsData.find(
        (project) => project.title === title
      )
    ).filter(
      (project): project is Project => Boolean(project)
    );
  }, []);

  const categories = useMemo(
    () => [
      'All',
      ...Array.from(
        new Set(
          orderedProjects.map(
            (project) => project.category
          )
        )
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

  const visibleProjects = filteredProjects.slice(
    0,
    visibleCount
  );

  const hasMoreProjects =
    visibleCount < filteredProjects.length;

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
  };

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  const navigateProject = (
    direction: 'next' | 'previous'
  ) => {
    if (
      !selectedProject ||
      filteredProjects.length === 0
    ) {
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
        ? (currentIndex + 1) %
          filteredProjects.length
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
            (selectedProjectIndex + 1) /
              PROJECTS_PER_LOAD
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

  /*
   * Keyboard navigation for the project popup.
   */
  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
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

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [selectedProject, filteredProjects]);

  /*
   * Observe project rows as they enter the viewport.
   */
  useEffect(() => {
    const elements = Array.from(
      projectRefs.current.values()
    );

    if (!elements.length) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          const visibleEntries =
            entries.filter(
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
          rootMargin:
            '-40px 0px -40px 0px',
        }
      );

    elements.forEach((element) =>
      observer.observe(element)
    );

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

    projectRefs.current.set(
      projectId,
      element
    );
  };

  /*
   * Mobile swipe navigation.
   */
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

    const deltaX =
      endX - touchStartX.current;

    const deltaY =
      endY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    if (
      Math.abs(deltaX) <
      SWIPE_THRESHOLD
    ) {
      return;
    }

    if (
      Math.abs(deltaX) <
      Math.abs(deltaY)
    ) {
      return;
    }

    navigateProject(
      deltaX < 0
        ? 'next'
        : 'previous'
    );
  };

  return (
    <>
      <section
        id="projects"
        className="relative z-10 bg-[#F5F1E8] py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="mb-10 max-w-3xl sm:mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2F5D50] sm:text-xs">
                03 / Projects
              </span>

              <span className="h-px w-8 bg-[#DDD6C8] sm:w-10" />
            </div>

            <h2 className="font-display text-3xl font-bold tracking-tight text-[#1D2A26] sm:text-4xl">
              Selected work.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#4B5563] sm:text-base">
              A selection of data analysis, business intelligence,
              automation, and web development projects built to solve
              practical problems.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 sm:mb-10">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#6B7280]">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </div>

            <div className="-mx-4 flex overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
              <div className="flex min-w-max items-center gap-2">
                {categories.map((category) => {
                  const isActive =
                    activeFilter === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() =>
                        handleFilterChange(
                          category
                        )
                      }
                      className={`min-h-10 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors active:scale-[0.98] ${
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
            </div>
          </div>

          {/* Project list */}
          <div className="border-y border-[#DDD6C8]">
            {visibleProjects.map(
              (project, index) => {
                const actualIndex =
                  filteredProjects.findIndex(
                    (item) =>
                      item.id === project.id
                  );

                const projectNumber =
                  String(
                    actualIndex + 1
                  ).padStart(2, '0');

                const description =
                  project.description.length >
                  220
                    ? `${project.description
                        .slice(0, 220)
                        .trim()}…`
                    : project.description;

                const visibleTags =
                  project.tags.slice(0, 4);

                const remainingTags =
                  project.tags.length -
                  visibleTags.length;

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
                    className="group border-b border-[#DDD6C8] last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        openProjectDetails(
                          project
                        )
                      }
                      className="block w-full text-left"
                    >
                      <div className="grid gap-5 py-7 sm:gap-7 sm:py-9 lg:grid-cols-[80px_minmax(0,1fr)_280px] lg:gap-10 lg:py-11">

                        {/* Project number */}
                        <div className="flex items-start">
                          <span className="font-mono text-xs font-semibold tracking-wide text-[#6B7280] transition-colors group-hover:text-[#2F5D50] sm:text-sm">
                            {projectNumber}
                          </span>
                        </div>

                        {/* Main project information */}
                        <div>
                          <div className="mb-3 flex flex-wrap items-center gap-2.5">
                            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2F5D50] sm:text-[11px]">
                              {
                                project.category
                              }
                            </span>

                            {project.featured && (
                              <span className="rounded-full border border-[#D97745]/30 bg-[#D97745]/5 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#D97745] sm:text-[10px]">
                                Featured
                              </span>
                            )}
                          </div>

                          <div className="flex items-start gap-2.5 sm:gap-3">
                            <h3 className="min-w-0 font-display text-[21px] font-bold leading-tight tracking-tight text-[#1D2A26] transition-colors group-hover:text-[#2F5D50] sm:text-2xl lg:text-3xl">
                              {
                                project.title
                              }
                            </h3>

                            <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[#6B7280] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#2F5D50] sm:mt-1 sm:h-5 sm:w-5" />
                          </div>

                          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#4B5563] sm:mt-4 sm:text-base sm:leading-7">
                            {description}
                          </p>

                          <div className="mt-4 flex flex-wrap items-center gap-1.5 sm:mt-5 sm:gap-2">
                            {visibleTags.map(
                              (tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full border border-[#DDD6C8] bg-[#FCFAF6] px-2.5 py-1 text-[11px] font-medium text-[#6B7280] sm:text-xs"
                                >
                                  {tag}
                                </span>
                              )
                            )}

                            {remainingTags >
                              0 && (
                              <span className="px-1 text-[11px] font-medium text-[#6B7280] sm:text-xs">
                                +
                                {
                                  remainingTags
                                }
                              </span>
                            )}
                          </div>

                          <div className="mt-4 sm:mt-5">
                            <ComplexityIndicator
                              value={
                                project.complexity
                              }
                            />
                          </div>

                          <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2F5D50] sm:mt-6">
                            <span>
                              View case study
                            </span>

                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                          </div>
                        </div>

                        {/* Project media */}
                        <div className="hidden lg:block">
                          <div className="overflow-hidden rounded-xl border border-[#DDD6C8] bg-[#FCFAF6]">
                            <div className="relative aspect-[16/10] overflow-hidden">
                              {project.isVideo ? (
                                <video
                                  src={
                                    project.videoUrl
                                  }
                                  muted
                                  playsInline
                                  preload="metadata"
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                />
                              ) : (
                                <img
                                  src={
                                    project.mediaUrl
                                  }
                                  alt={
                                    project.title
                                  }
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                />
                              )}

                              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1D2A26]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </motion.article>
                );
              }
            )}
          </div>

          {/* Empty state */}
          {visibleProjects.length === 0 && (
            <div className="border-b border-[#DDD6C8] py-14 text-center sm:py-16">
              <p className="text-sm text-[#6B7280]">
                No projects found in this category.
              </p>
            </div>
          )}

          {/* Load more */}
          {hasMoreProjects && (
            <div className="flex justify-center pt-8 sm:pt-10">
              <button
                type="button"
                onClick={handleLoadMore}
                className="group inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#DDD6C8] bg-[#FCFAF6] px-5 py-3 text-sm font-semibold text-[#1D2A26] transition-all duration-200 hover:border-[#2F5D50]/40 hover:text-[#2F5D50] active:scale-[0.98]"
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
          <div className="mt-10 flex items-center justify-between border-t border-[#DDD6C8] pt-5 sm:mt-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6B7280] sm:text-[11px]">
              {filteredProjects.length}{' '}
              projects
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
                className="fixed inset-0 z-[100] overflow-y-auto bg-[#1D2A26]/55 p-0 sm:p-5 lg:p-8"
                onMouseDown={(event) => {
                  if (
                    event.target ===
                    event.currentTarget
                  ) {
                    closeProjectDetails();
                  }
                }}
                onTouchStart={
                  handleTouchStart
                }
                onTouchEnd={
                  handleTouchEnd
                }
              >
                <div className="mx-auto flex min-h-full max-w-6xl items-center justify-center">
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 24,
                      scale: 0.985,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 24,
                      scale: 0.985,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [
                        0.16,
                        1,
                        0.3,
                        1,
                      ],
                    }}
                    className="w-full overflow-hidden rounded-none border border-[#DDD6C8] bg-[#FCFAF6] shadow-[0_30px_80px_rgba(29,42,38,0.18)] sm:rounded-2xl"
                  >
                    {/* Modal header */}
                    <div className="sticky top-0 z-20 flex min-h-[60px] items-center justify-between gap-3 border-b border-[#DDD6C8] bg-[#FCFAF6]/95 px-4 py-3 backdrop-blur-md sm:px-7 sm:py-4">
                      <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                        <span className="shrink-0 font-mono text-[11px] font-semibold text-[#2F5D50] sm:text-xs">
                          {String(
                            selectedProjectNumber
                          ).padStart(2, '0')}{' '}
                          /{' '}
                          {String(
                            totalProjectCount
                          ).padStart(2, '0')}
                        </span>

                        <span className="h-4 w-px bg-[#DDD6C8]" />

                        <span className="truncate font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-[#6B7280] sm:text-[10px] sm:tracking-[0.15em]">
                          {
                            selectedProject.category
                          }
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={
                          closeProjectDetails
                        }
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#DDD6C8] text-[#4B5563] transition-colors hover:border-[#2F5D50]/40 hover:text-[#2F5D50]"
                        aria-label="Close project details"
                      >
                        <X className="h-4 w-4" />

                        <span className="sr-only">
                          Close
                        </span>
                      </button>
                    </div>

                    {/* Case study content */}
                    <div className="max-h-[calc(100vh-60px)] overflow-y-auto overscroll-contain sm:max-h-[calc(100vh-80px)]">

                      {/* Case study hero */}
                      <div className="border-b border-[#DDD6C8]">
                        <div className="grid lg:grid-cols-[1.25fr_0.75fr]">

                          {/* Large media */}
                          <div className="relative bg-[#F5F1E8] p-3.5 sm:p-6 lg:p-8">
                            <div className="relative overflow-hidden rounded-xl border border-[#DDD6C8] bg-[#FCFAF6]">
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
                                  className="absolute bottom-2.5 right-2.5 inline-flex min-h-9 items-center gap-2 rounded-lg border border-white/60 bg-[#FCFAF6]/90 px-3 py-2 text-[11px] font-semibold text-[#1D2A26] shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-md sm:bottom-4 sm:right-4 sm:text-xs"
                                >
                                  <Maximize2 className="h-3.5 w-3.5" />

                                  <span>
                                    View media
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Project introduction */}
                          <div className="flex flex-col justify-center border-t border-[#DDD6C8] p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                            <div className="mb-5">
                              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#2F5D50] sm:text-[10px] sm:tracking-[0.18em]">
                                  Case Study
                                </span>

                                {selectedProject.featured && (
                                  <span className="rounded-full border border-[#D97745]/30 bg-[#D97745]/5 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#D97745]">
                                    Featured
                                  </span>
                                )}
                              </div>

                              <h2 className="mt-3 break-words font-display text-[27px] font-bold leading-tight tracking-tight text-[#1D2A26] sm:text-4xl">
                                {
                                  selectedProject.title
                                }
                              </h2>
                            </div>

                            <p className="text-sm leading-7 text-[#4B5563] sm:text-base">
                              {
                                selectedProject.description
                              }
                            </p>

                            <div className="mt-6 border-t border-[#DDD6C8] pt-5 sm:mt-7 sm:pt-6">
                              <ComplexityIndicator
                                value={
                                  selectedProject.complexity
                                }
                              />
                            </div>

                            {(selectedProject.githubUrl ||
                              selectedProject.demoUrl) && (
                              <div className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-7 sm:flex sm:flex-wrap sm:gap-3">
                                {selectedProject.githubUrl && (
                                  <a
                                    href={
                                      selectedProject.githubUrl
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#DDD6C8] px-4 py-2.5 text-sm font-semibold text-[#1D2A26] transition-colors hover:border-[#2F5D50]/40 hover:text-[#2F5D50]"
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
                                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#2F5D50] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#24493f]"
                                  >
                                    Live Demo

                                    <ArrowUpRight className="h-4 w-4" />
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Existing project information */}
                      <div className="grid lg:grid-cols-[1fr_0.8fr]">

                        {/* Highlights */}
                        {selectedProject.keyHighlights
                          ?.length ? (
                          <div className="border-b border-[#DDD6C8] px-5 py-8 sm:px-8 sm:py-10 lg:border-b-0 lg:border-r">
                            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2F5D50]">
                              Key highlights
                            </span>

                            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#1D2A26]">
                              What stands out.
                            </h3>

                            <div className="mt-6 space-y-4">
                              {selectedProject.keyHighlights.map(
                                (
                                  highlight,
                                  index
                                ) => (
                                  <motion.div
                                    key={index}
                                    initial={{
                                      opacity: 0,
                                      x: -8,
                                    }}
                                    animate={{
                                      opacity: 1,
                                      x: 0,
                                    }}
                                    transition={{
                                      duration: 0.35,
                                      delay:
                                        index *
                                        0.05,
                                    }}
                                    className="flex items-start gap-4"
                                  >
                                    <span className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2F5D50]/8 font-mono text-[9px] font-bold text-[#2F5D50]">
                                      {String(
                                        index +
                                          1
                                      ).padStart(
                                        2,
                                        '0'
                                      )}
                                    </span>

                                    <p className="text-sm leading-7 text-[#4B5563]">
                                      {
                                        highlight
                                      }
                                    </p>
                                  </motion.div>
                                )
                              )}
                            </div>
                          </div>
                        ) : null}

                        {/* Technologies */}
                        <div
                          className={`px-5 py-8 sm:px-8 sm:py-10 ${
                            selectedProject
                              .keyHighlights
                              ?.length
                              ? ''
                              : 'lg:col-span-2'
                          }`}
                        >
                          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2F5D50]">
                            Technologies
                          </span>

                          <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#1D2A26]">
                            Tools used.
                          </h3>

                          <div className="mt-6 flex flex-wrap gap-2">
                            {selectedProject.tags.map(
                              (tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full border border-[#DDD6C8] bg-[#F5F1E8] px-3 py-1.5 text-xs font-medium text-[#6B7280] transition-colors hover:border-[#2F5D50]/30 hover:text-[#2F5D50]"
                                >
                                  {tag}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Screenshots */}
                      {selectedProject
                        .automationScreenshots
                        ?.length ? (
                        <div className="border-t border-[#DDD6C8] px-4 py-8 sm:px-8 sm:py-10">
                          <div className="mb-6 flex flex-col gap-2 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2F5D50]">
                                Project media
                              </span>

                              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#1D2A26]">
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

                          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
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
                                  className="group overflow-hidden rounded-xl border border-[#DDD6C8] bg-[#F5F1E8] text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2F5D50]/35 hover:shadow-sm active:scale-[0.995]"
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
                    <div className="sticky bottom-0 z-20 flex flex-col-reverse gap-2.5 border-t border-[#DDD6C8] bg-[#FCFAF6]/95 px-4 py-3 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-4">
                      <button
                        type="button"
                        onClick={
                          closeProjectDetails
                        }
                        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#DDD6C8] px-4 py-2.5 text-sm font-semibold text-[#4B5563] transition-colors hover:border-[#2F5D50]/40 hover:text-[#2F5D50] sm:w-auto"
                      >
                        <X className="h-4 w-4" />
                        Close
                      </button>

                      <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-center sm:gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            navigateProject(
                              'previous'
                            )
                          }
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#DDD6C8] px-3 py-2.5 text-sm font-semibold text-[#1D2A26] transition-colors hover:border-[#2F5D50]/40 hover:text-[#2F5D50] sm:px-4"
                        >
                          <ArrowLeft className="h-4 w-4" />

                          <span>
                            Previous
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            navigateProject(
                              'next'
                            )
                          }
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#2F5D50] px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#24493f] sm:px-4"
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

.scrollbar-none {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scrollbar-none::-webkit-scrollbar {
  display: none;
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
