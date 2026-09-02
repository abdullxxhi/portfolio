import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  Filter,
  FolderGit2,
  Layers3,
  Sparkles,
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types';
import ProjectCard from './ProjectCard';

interface ProjectsProps {
  onOpenLightbox: (project: Project) => void;
}

const PROJECTS_PER_LOAD = 4;

export default function Projects({ onOpenLightbox }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_LOAD);

  const categories = useMemo(
    () => [
      'All',
      ...Array.from(new Set(projectsData.map((project) => project.category))),
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

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const hasMoreProjects = visibleCount < filteredProjects.length;

  const remainingProjects = Math.max(
    filteredProjects.length - visibleCount,
    0
  );

  useEffect(() => {
    setVisibleCount(PROJECTS_PER_LOAD);
  }, [activeFilter]);

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
  };

  const handleLoadMore = () => {
    setVisibleCount((current) =>
      Math.min(
        current + PROJECTS_PER_LOAD,
        filteredProjects.length
      )
    );
  };

  return (
    <section
      id="projects"
      className="relative z-10 py-24 sm:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCFAF6]/90 border border-[#DDD6C8] shadow-sm mb-5">
            <FolderGit2 className="w-3.5 h-3.5 text-[#2F5D50]" />

            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] text-[#2F5D50] font-semibold">
              FEATURED WORK
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#1D2A26] tracking-tight">
            Projects & Case Studies
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-7 text-[#4B5563] max-w-2xl mx-auto">
            Automations, interactive business intelligence dashboards,
            forecasting models, and statistical research projects.
          </p>
        </motion.div>

        {/* Project Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.55,
            delay: 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2F5D50]/10 border border-[#2F5D50]/10 flex items-center justify-center">
              <Layers3 className="w-4.5 h-4.5 text-[#2F5D50]" />
            </div>

            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-[#6B7280]">
                Portfolio
              </p>

              <p className="text-sm font-semibold text-[#1D2A26]">
                {filteredProjects.length} project
                {filteredProjects.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FCFAF6]/80 border border-[#DDD6C8]">
            <Sparkles className="w-3.5 h-3.5 text-[#D97745]" />

            <span className="text-[11px] sm:text-xs font-medium text-[#6B7280]">
              Showing {Math.min(visibleCount, filteredProjects.length)} of{' '}
              {filteredProjects.length}
            </span>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.55,
            delay: 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex justify-center mb-12 sm:mb-14"
        >
          <div className="w-full sm:w-auto flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#FCFAF6]/90 border border-[#DDD6C8] shadow-sm overflow-x-auto scrollbar-hide">
            <div className="shrink-0 flex items-center justify-center w-8 h-8">
              <Filter className="w-3.5 h-3.5 text-[#6B7280]" />
            </div>

            {categories.map((category) => {
              const isActive = activeFilter === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleFilterChange(category)}
                  className={`relative shrink-0 px-3.5 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-[#6B7280] hover:text-[#1D2A26]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectFilter"
                      className="absolute inset-0 rounded-xl bg-[#2F5D50] shadow-sm"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className="relative z-10">
                    {category}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Project Grid */}
        {visibleProjects.length > 0 ? (
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-8 items-stretch"
            >
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{
                    opacity: 0,
                    y: 28,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -18,
                    scale: 0.97,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: (index % PROJECTS_PER_LOAD) * 0.07,
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-center py-16 sm:py-20 rounded-3xl bg-[#FCFAF6]/80 border border-[#DDD6C8]"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-[#2F5D50]/10 flex items-center justify-center">
              <FolderGit2 className="w-5 h-5 text-[#2F5D50]" />
            </div>

            <p className="text-base text-[#6B7280]">
              No projects found for this category.
            </p>

            <button
              type="button"
              onClick={() => handleFilterChange('All')}
              className="mt-5 px-4 py-2.5 rounded-xl bg-[#2F5D50] text-white text-xs font-semibold hover:bg-[#24493F] transition-colors"
            >
              Reset Filter
            </button>
          </motion.div>
        )}

        {/* Load More */}
        {hasMoreProjects && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col items-center mt-12 sm:mt-14"
          >
            <motion.button
              type="button"
              onClick={handleLoadMore}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#FCFAF6] border border-[#DDD6C8] text-[#1D2A26] text-sm font-semibold shadow-sm hover:border-[#2F5D50]/40 hover:shadow-[0_14px_35px_-15px_rgba(47,93,80,0.25)] transition-all duration-300"
            >
              <span>Load More Projects</span>

              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#2F5D50]/10 group-hover:bg-[#2F5D50] group-hover:text-white transition-colors duration-300">
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
              </span>
            </motion.button>

            <p className="mt-3 text-[11px] font-mono text-[#6B7280]">
              {remainingProjects} more project
              {remainingProjects === 1 ? '' : 's'} to explore
            </p>
          </motion.div>
        )}

        {/* All Projects Viewed */}
        {!hasMoreProjects && filteredProjects.length > 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mt-12 sm:mt-14"
          >
            <span className="w-12 h-px bg-[#DDD6C8]" />

            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] text-[#6B7280]">
              All projects explored
            </span>

            <span className="w-12 h-px bg-[#DDD6C8]" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
