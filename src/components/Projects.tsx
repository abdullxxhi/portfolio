import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  Filter,
  FolderGit2,
} from 'lucide-react';

import { projectsData } from '../data/portfolioData';
import { Project } from '../types';
import ProjectCard from './ProjectCard';

interface ProjectsProps {
  onOpenLightbox: (project: Project) => void;
}

const PROJECTS_PER_LOAD = 4;

export default function Projects({
  onOpenLightbox,
}: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(
    PROJECTS_PER_LOAD
  );

  const categories = useMemo(
    () => [
      'All',
      ...Array.from(
        new Set(projectsData.map((project) => project.category))
      ),
    ],
    []
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projectsData;
    }

    return projectsData.filter(
      (project) => project.category === activeFilter
    );
  }, [activeFilter]);

  const visibleProjects = filteredProjects.slice(
    0,
    visibleCount
  );

  const hasMoreProjects =
    visibleCount < filteredProjects.length;

  const remainingProjects =
    filteredProjects.length - visibleCount;

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
          viewport={{
            once: true,
            margin: '-60px',
          }}
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
            A selection of data analysis, automation, forecasting,
            and technical projects built to solve practical problems.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            margin: '-60px',
          }}
          transition={{ duration: 0.4 }}
          className="mb-12 overflow-x-auto pb-1"
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
            {filteredProjects.length === 1
              ? 'project'
              : 'projects'}
          </span>
        </div>

        {/* Project Grid */}
        {visibleProjects.length > 0 ? (
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 gap-10 lg:grid-cols-2"
            >
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.id}
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
                      (index % PROJECTS_PER_LOAD) *
                      0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <ProjectCard
                    project={project}
                    onOpenLightbox={onOpenLightbox}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          /* Empty State */
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
            className="mt-14 flex flex-col items-center"
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
              className="group relative inline-flex items-center gap-4 overflow-hidden rounded-xl border border-[#2F5D50] bg-[#FCFAF6] px-7 py-3.5 text-sm font-semibold text-[#2F5D50] shadow-[0_4px_16px_rgba(47,93,80,0.06)] transition-all duration-300 hover:bg-[#2F5D50] hover:text-white hover:shadow-[0_10px_28px_rgba(47,93,80,0.12)]"
            >
              <span>
                Load More Projects
              </span>

              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2F5D50]/10 transition-all duration-300 group-hover:bg-white/15">
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </span>
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
    </section>
  );
}
