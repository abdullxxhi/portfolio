import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FolderGit2, Filter } from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types';
import ProjectCard from './ProjectCard';

interface ProjectsProps {
  onOpenLightbox: (project: Project) => void;
}

export default function Projects({ onOpenLightbox }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = [
    'All',
    ...Array.from(new Set(projectsData.map((project) => project.category))),
  ];

  const filteredProjects =
    activeFilter === 'All'
      ? projectsData
      : projectsData.filter(
          (project) => project.category === activeFilter
        );

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FCFAF6] border border-[#DDD6C8] shadow-sm">
            <FolderGit2 className="w-3.5 h-3.5 text-[#2F5D50]" />

            <span className="text-xs font-mono uppercase tracking-widest text-[#2F5D50] font-semibold">
              FEATURED WORK
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1D2A26]">
            Projects & Case Studies
          </h2>

          <p className="text-base text-[#4B5563]">
            Automations, interactive business intelligence dashboards, and statistical research models.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          <div className="flex items-center space-x-1 p-1.5 rounded-2xl bg-[#FCFAF6] border border-[#DDD6C8] shadow-sm">
            <Filter className="w-4 h-4 text-[#6B7280] ml-2 mr-1 hidden sm:block" />

            {categories.map((category) => {
              const isActive = activeFilter === category;

              return (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'text-white'
                      : 'text-[#6B7280] hover:text-[#1D2A26]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectFilter"
                      className="absolute inset-0 bg-[#2F5D50] rounded-xl -z-10 shadow-sm"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-8
            items-stretch
            lg:[&>*]:col-span-1
          "
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenLightbox={onOpenLightbox}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 glass-card rounded-3xl p-8 max-w-md mx-auto">
            <p className="text-base text-[#94A3B8]">
              No projects found for this category.
            </p>

            <button
              onClick={() => setActiveFilter('All')}
              className="mt-4 px-4 py-2 rounded-xl bg-[#3B82F6] text-white text-xs font-semibold"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
