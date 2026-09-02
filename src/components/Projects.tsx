import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Filter,
  FolderGit2,
  Github,
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types';
import ProjectCard from './ProjectCard';

interface ProjectsProps {
  onOpenLightbox: (project: Project) => void;
}

export default function Projects({ onOpenLightbox }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const categories = [
    'All',
    ...Array.from(new Set(projectsData.map((project) => project.category))),
  ];

  const filteredProjects =
    activeFilter === 'All'
      ? projectsData
      : projectsData.filter((project) => project.category === activeFilter);

  const featuredProjects = useMemo(() => {
    const explicitlyFeatured = filteredProjects.filter(
      (project) => project.featured
    );

    return explicitlyFeatured.length > 0
      ? explicitlyFeatured
      : filteredProjects.slice(0, 1);
  }, [filteredProjects]);

  const featuredProject =
    featuredProjects.length > 0
      ? featuredProjects[
          Math.min(featuredIndex, featuredProjects.length - 1)
        ]
      : null;

  const goToPrevious = () => {
    if (featuredProjects.length <= 1) return;

    setFeaturedIndex((current) =>
      current === 0 ? featuredProjects.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    if (featuredProjects.length <= 1) return;

    setFeaturedIndex((current) =>
      current === featuredProjects.length - 1 ? 0 : current + 1
    );
  };

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    setFeaturedIndex(0);
  };

  return (
    <section
      id="projects"
      className="relative z-10 bg-[#F5F1E8] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            A selection of data analysis, automation, forecasting, and
            technical projects built to solve practical problems.
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

        {/* Featured Project */}
        <AnimatePresence mode="wait">
          {featuredProject && (
            <motion.article
              key={featuredProject.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mb-16"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#2F5D50]">
                    Featured project
                  </span>

                  <span className="h-1 w-1 rounded-full bg-[#D97745]" />

                  <span className="text-xs font-medium text-[#6B7280]">
                    {featuredProject.category}
                  </span>
                </div>

                {featuredProjects.length > 1 && (
                  <div className="flex items-center gap-2">
                    <span className="mr-1 font-mono text-xs text-[#6B7280]">
                      {String(featuredIndex + 1).padStart(2, '0')} /{' '}
                      {String(featuredProjects.length).padStart(2, '0')}
                    </span>

                    <button
                      type="button"
                      onClick={goToPrevious}
                      aria-label="Previous featured project"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DDD6C8] bg-[#FCFAF6] text-[#4B5563] transition-colors hover:border-[#2F5D50] hover:text-[#2F5D50]"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={goToNext}
                      aria-label="Next featured project"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DDD6C8] bg-[#FCFAF6] text-[#4B5563] transition-colors hover:border-[#2F5D50] hover:text-[#2F5D50]"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="overflow-hidden rounded-2xl border border-[#DDD6C8] bg-[#FCFAF6]">
                <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                  {/* Project Image */}
                  <button
                    type="button"
                    onClick={() => onOpenLightbox(featuredProject)}
                    className="group relative min-h-[260px] overflow-hidden bg-[#EDE7DA] text-left sm:min-h-[360px] lg:min-h-[460px]"
                  >
                    <img
                      src={featuredProject.mediaUrl}
                      alt={featuredProject.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />

                    <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 sm:inset-x-5 sm:bottom-5">
                      <div className="rounded-lg bg-[#FCFAF6]/90 px-3 py-2 backdrop-blur-sm">
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                          Case study
                        </p>

                        <p className="mt-0.5 text-xs font-semibold text-[#1D2A26] sm:text-sm">
                          View project
                        </p>
                      </div>

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FCFAF6] text-[#2F5D50] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </button>

                  {/* Project Information */}
                  <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                    <div>
                      <div className="mb-5">
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D97745]">
                          {featuredProject.category}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl font-bold leading-tight text-[#1D2A26] sm:text-3xl">
                        {featuredProject.title}
                      </h3>

                      <p className="mt-5 text-sm leading-6 text-[#4B5563] sm:text-base sm:leading-7">
                        {featuredProject.description}
                      </p>

                      {featuredProject.keyHighlights &&
                        featuredProject.keyHighlights.length > 0 && (
                          <div className="mt-7 border-t border-[#DDD6C8] pt-6">
                            <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                              Key outcomes
                            </p>

                            <div className="space-y-3">
                              {featuredProject.keyHighlights
                                .slice(0, 3)
                                .map((highlight) => (
                                  <div
                                    key={highlight}
                                    className="flex items-start gap-3 text-sm leading-6 text-[#4B5563]"
                                  >
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97745]" />
                                    <span>{highlight}</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                      <div className="mt-7 border-t border-[#DDD6C8] pt-5">
                        <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                          Tools
                        </p>

                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                          {featuredProject.tags.slice(0, 6).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-medium text-[#4B5563]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-[#DDD6C8] pt-5">
                      <button
                        type="button"
                        onClick={() => onOpenLightbox(featuredProject)}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#2F5D50] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#244A40]"
                      >
                        Explore case study
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>

                      {featuredProject.githubUrl && (
                        <a
                          href={featuredProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-semibold text-[#2F5D50] transition-colors hover:text-[#1D2A26]"
                        >
                          <Github className="h-3.5 w-3.5" />
                          GitHub
                        </a>
                      )}

                      {featuredProject.demoUrl && (
                        <a
                          href={featuredProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-semibold text-[#2F5D50] transition-colors hover:text-[#1D2A26]"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Live demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {featuredProjects.length > 1 && (
                <div className="mt-5 flex justify-center gap-2">
                  {featuredProjects.map((project, index) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setFeaturedIndex(index)}
                      aria-label={`Show featured project ${index + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        index === featuredIndex
                          ? 'w-6 bg-[#2F5D50]'
                          : 'w-1.5 bg-[#DDD6C8] hover:bg-[#B8B0A2]'
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.article>
          )}
        </AnimatePresence>

        {/* Remaining Projects */}
        {filteredProjects.length > 0 && (
          <div>
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                  More work
                </p>

                <h3 className="mt-1 font-display text-xl font-bold text-[#1D2A26] sm:text-2xl">
                  Other projects
                </h3>
              </div>

              <span className="font-mono text-xs text-[#6B7280]">
                {filteredProjects.length}{' '}
                {filteredProjects.length === 1 ? 'project' : 'projects'}
              </span>
            </div>

            <motion.div
              layout
              className="grid grid-cols-1 gap-10 lg:grid-cols-2"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects
                  .filter(
                    (project) =>
                      !featuredProject || project.id !== featuredProject.id
                  )
                  .map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProjectCard
                        project={project}
                        onOpenLightbox={onOpenLightbox}
                      />
                    </motion.div>
                  ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
