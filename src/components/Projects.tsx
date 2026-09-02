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
  Sparkles,
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types';
import ProjectCard from './ProjectCard';

interface ProjectsProps {
  onOpenLightbox: (project: Project) => void;
}

export default function Projects({ onOpenLightbox }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [featuredIndex, setFeaturedIndex] = useState(0);

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

  /*
   * Featured projects are taken from the currently filtered projects.
   * If a category has no explicitly featured project, the first project
   * in that category becomes the spotlight.
   */
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

  const spotlightPosition =
    featuredProject && featuredProjects.length > 1
      ? featuredProjects.indexOf(featuredProject) + 1
      : 1;

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
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-12"
        >
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
            Automations, interactive business intelligence dashboards, and
            statistical research models.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center flex-wrap gap-2 mb-14"
        >
          <div className="flex items-center space-x-1 p-1.5 rounded-2xl bg-[#FCFAF6] border border-[#DDD6C8] shadow-sm">
            <Filter className="w-4 h-4 text-[#6B7280] ml-2 mr-1 hidden sm:block" />

            {categories.map((category) => {
              const isActive = activeFilter === category;

              return (
                <button
                  key={category}
                  onClick={() => handleFilterChange(category)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
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
        </motion.div>

        {/* Featured Project Spotlight */}
        <AnimatePresence mode="wait">
          {featuredProject && (
            <motion.div
              key={featuredProject.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#2F5D50] font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    Featured Project
                  </div>

                  <span className="hidden sm:block w-1 h-1 rounded-full bg-[#D97745]" />

                  <span className="text-xs text-[#6B7280] font-medium">
                    {featuredProject.category}
                  </span>
                </div>

                {featuredProjects.length > 1 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#6B7280] mr-1">
                      {String(spotlightPosition).padStart(2, '0')} /{' '}
                      {String(featuredProjects.length).padStart(2, '0')}
                    </span>

                    <button
                      onClick={goToPrevious}
                      aria-label="Previous featured project"
                      className="w-9 h-9 rounded-xl border border-[#DDD6C8] bg-[#FCFAF6] flex items-center justify-center text-[#2F5D50] hover:bg-[#2F5D50] hover:text-white transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={goToNext}
                      aria-label="Next featured project"
                      className="w-9 h-9 rounded-xl border border-[#DDD6C8] bg-[#FCFAF6] flex items-center justify-center text-[#2F5D50] hover:bg-[#2F5D50] hover:text-white transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="relative overflow-hidden rounded-[28px] border border-[#DDD6C8] bg-[#FCFAF6] shadow-[0_24px_70px_-30px_rgba(47,93,80,0.25)]">
                
                {/* Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2F5D50] via-[#D97745] to-[#2F5D50]" />

                <div className="grid lg:grid-cols-[1.15fr_0.85fr]">

                  {/* Project Image */}
                  <button
                    type="button"
                    onClick={() => onOpenLightbox(featuredProject)}
                    className="group relative min-h-[280px] sm:min-h-[380px] lg:min-h-[470px] overflow-hidden text-left"
                  >
                    <motion.img
                      src={featuredProject.mediaUrl}
                      alt={featuredProject.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1D2A26]/75 via-[#1D2A26]/10 to-transparent opacity-80" />

                    {/* Preview Label */}
                    <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FCFAF6]/90 backdrop-blur-sm border border-white/30 text-xs font-semibold text-[#1D2A26]">
                      <ExternalLink className="w-3.5 h-3.5 text-[#2F5D50]" />
                      View Project
                    </div>

                    {/* Bottom Image Label */}
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/70 mb-1">
                          Case Study
                        </p>

                        <p className="text-sm sm:text-base font-semibold text-white">
                          {featuredProject.title}
                        </p>
                      </div>

                      <div className="shrink-0 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#2F5D50] transition-colors">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </button>

                  {/* Project Information */}
                  <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between">

                    <div>
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <span className="text-xs font-mono font-semibold tracking-widest text-[#D97745] uppercase">
                          {featuredProject.category}
                        </span>

                        <span className="text-4xl sm:text-5xl font-display font-bold text-[#DDD6C8]">
                          {String(
                            projectsData.findIndex(
                              (project) => project.id === featuredProject.id
                            ) + 1
                          ).padStart(2, '0')}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#1D2A26] leading-tight mb-5">
                        {featuredProject.title}
                      </h3>

                      <p className="text-sm sm:text-base leading-7 text-[#4B5563] mb-7">
                        {featuredProject.description}
                      </p>

                      {/* Key Highlights */}
                      {featuredProject.keyHighlights &&
                        featuredProject.keyHighlights.length > 0 && (
                          <div className="space-y-3 mb-7">
                            {featuredProject.keyHighlights
                              .slice(0, 3)
                              .map((highlight, index) => (
                                <div
                                  key={`${featuredProject.id}-highlight-${index}`}
                                  className="flex items-start gap-3"
                                >
                                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#D97745] shrink-0" />

                                  <span className="text-sm leading-6 text-[#4B5563]">
                                    {highlight}
                                  </span>
                                </div>
                              ))}
                          </div>
                        )}

                      {/* Technology Tags */}
                      <div className="flex flex-wrap gap-2">
                        {featuredProject.tags.slice(0, 6).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1.5 rounded-lg bg-[#F5F1E8] border border-[#DDD6C8] text-[11px] font-semibold text-[#4B5563]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-[#DDD6C8]">
                      <button
                        type="button"
                        onClick={() => onOpenLightbox(featuredProject)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2F5D50] text-white text-xs font-semibold hover:bg-[#24493F] transition-colors shadow-sm"
                      >
                        Explore Case Study
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      {featuredProject.githubUrl && (
                        <a
                          href={featuredProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#DDD6C8] bg-[#F5F1E8] text-[#1D2A26] text-xs font-semibold hover:border-[#2F5D50] hover:text-[#2F5D50] transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          GitHub
                        </a>
                      )}

                      {featuredProject.demoUrl && (
                        <a
                          href={featuredProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#DDD6C8] bg-[#F5F1E8] text-[#1D2A26] text-xs font-semibold hover:border-[#D97745] hover:text-[#D97745] transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Project Indicators */}
              {featuredProjects.length > 1 && (
                <div className="flex justify-center gap-2 mt-5">
                  {featuredProjects.map((project, index) => (
                    <button
                      key={project.id}
                      onClick={() => setFeaturedIndex(index)}
                      aria-label={`Show featured project ${index + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        index === featuredIndex
                          ? 'w-8 bg-[#2F5D50]'
                          : 'w-2 bg-[#DDD6C8] hover:bg-[#B8B0A2]'
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Remaining Projects */}
        {filteredProjects.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-7">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-[#6B7280]">
                  More Work
                </p>

                <h3 className="mt-1 text-xl sm:text-2xl font-display font-bold text-[#1D2A26]">
                  More Projects
                </h3>
              </div>

              <span className="text-xs font-mono text-[#6B7280]">
                {filteredProjects.length} PROJECT
                {filteredProjects.length === 1 ? '' : 'S'}
              </span>
            </div>

            <motion.div
              layout
              className="
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-8
                items-stretch
                [&>*]:col-span-1
              "
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects
                  .filter(
                    (project) =>
                      !featuredProject ||
                      project.id !== featuredProject.id
                  )
                  .map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35 }}
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

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 glass-card rounded-3xl p-8 max-w-md mx-auto"
          >
            <p className="text-base text-[#6B7280]">
              No projects found for this category.
            </p>

            <button
              onClick={() => handleFilterChange('All')}
              className="mt-4 px-4 py-2 rounded-xl bg-[#2F5D50] text-white text-xs font-semibold hover:bg-[#24493F] transition-colors"
            >
              Reset Filter
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
