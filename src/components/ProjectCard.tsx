import React from 'react';
import { motion } from 'motion/react';
import {
  Github,
  ExternalLink,
  Sparkles,
  Maximize2,
  CheckCircle,
  ArrowUpRight
} from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  key?: string;
  project: Project;
  onOpenLightbox: (project: Project) => void;
}

export default function ProjectCard({
  project,
  onOpenLightbox
}: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{
        y: -7,
        transition: {
          duration: 0.25,
          ease: 'easeOut'
        }
      }}
      whileTap={{
        scale: 0.995
      }}
      className={`relative bg-[#FCFAF6] rounded-[20px] overflow-hidden flex flex-col justify-between group border shadow-sm transition-shadow duration-300 ${
        project.featured
          ? 'border-[#2F5D50] shadow-md lg:col-span-2'
          : 'border-[#DDD6C8] hover:border-[#2F5D50]/50'
      }`}
    >

      {/* Soft Card Glow */}
      <motion.div
        className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-[#2F5D50]/5 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.35, 0.65, 0.35]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <motion.div
        className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-[#D97745]/5 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.25, 0.5, 0.25]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      />

      {/* Animated Top Border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#2F5D50] via-[#4E8D66] to-[#D97745] origin-left z-20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          ease: 'easeOut'
        }}
      />

      <div className="relative z-10">

        {/* Project Thumbnail Image or Video */}
        <div
          className="relative aspect-[16/9] bg-[#F5F1E8] overflow-hidden group/img cursor-pointer"
          onClick={() => onOpenLightbox(project)}
        >

          {project.isVideo && project.videoUrl ? (
            <video
              src={project.videoUrl}
              poster={project.mediaUrl}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-cover object-center"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <>
              <motion.img
                src={project.mediaUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
                whileHover={{
                  scale: 1.07
                }}
                transition={{
                  duration: 0.7,
                  ease: 'easeOut'
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1D2A26]/85 via-[#1D2A26]/25 to-transparent opacity-80 group-hover/img:opacity-60 transition-opacity duration-500 pointer-events-none" />

              {/* Image Shine */}
              <motion.div
                className="absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] pointer-events-none"
                whileHover={{
                  left: '150%'
                }}
                transition={{
                  duration: 0.8,
                  ease: 'easeInOut'
                }}
              />
            </>
          )}

          {/* Badges Overlay */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10 pointer-events-none">

            <span className="px-3 py-1 rounded-full bg-[#FCFAF6]/90 backdrop-blur-md border border-[#DDD6C8] text-[#2F5D50] font-mono text-[11px] font-semibold shadow-sm">
              {project.category}
            </span>

            {project.featured && (
              <span className="px-3 py-1 rounded-full bg-[#2F5D50] text-white font-mono text-[11px] font-bold flex items-center space-x-1 shadow-md">
                <Sparkles className="w-3 h-3 text-[#D97745]" />
                <span>Featured Project</span>
              </span>
            )}

          </div>

          {/* Image Interaction Hint */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-2 rounded-full bg-[#FCFAF6]/90 backdrop-blur-md border border-[#DDD6C8] text-[#1D2A26] text-xs font-semibold shadow-lg flex items-center gap-2">
              <Maximize2 className="w-3.5 h-3.5 text-[#2F5D50]" />
              <span>View Preview</span>
            </div>
          </motion.div>

          {/* Expand Overlay Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenLightbox(project);
            }}
            aria-label="View Full Preview"
            className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-[#FCFAF6]/90 backdrop-blur-md text-[#1D2A26] opacity-0 group-hover/img:opacity-100 hover:bg-[#2F5D50] hover:text-white transition-all duration-200 shadow-md z-10"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-4">

          {/* Project Title */}
          <div className="flex items-start justify-between gap-4">

            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#1D2A26] group-hover:text-[#2F5D50] transition-colors duration-300">
              {project.title}
            </h3>

            <motion.div
              className="shrink-0 mt-1 text-[#B8B0A2]"
              whileHover={{
                x: 3,
                y: -3,
                color: '#2F5D50'
              }}
              transition={{
                duration: 0.2
              }}
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.div>

          </div>

          {/* Description */}
          <p className="text-sm text-[#4B5563] leading-relaxed">
            {project.description}
          </p>

          {/* Key Highlights */}
          {project.keyHighlights &&
            project.keyHighlights.length > 0 && (
              <div className="space-y-1.5 pt-2">

                {project.keyHighlights.map((hl, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start space-x-2 text-xs text-[#1D2A26]"
                    initial={{ opacity: 0, x: -5 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.04
                    }}
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-[#4E8D66] shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </motion.div>
                ))}

              </div>
            )}

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 pt-2">

            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-[#F5F1E8] border border-[#DDD6C8] text-[11px] font-mono text-[#6B7280] transition-all duration-200 hover:border-[#2F5D50]/40 hover:text-[#2F5D50] hover:bg-[#2F5D50]/5"
              >
                #{tag.replace(/^#/, '')}
              </span>
            ))}

          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 px-6 sm:px-8 pb-6 sm:pb-8 pt-2 flex items-center justify-between border-t border-[#DDD6C8] mt-4">

        {/* Details Button */}
        <button
          onClick={() => onOpenLightbox(project)}
          className="group/details inline-flex items-center space-x-2 text-xs font-semibold text-[#2F5D50] hover:text-[#1D2A26] transition-colors"
        >
          <span>View Details & Media</span>

          <motion.span
            className="inline-flex"
            whileHover={{
              x: 3
            }}
            transition={{
              duration: 0.2
            }}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </motion.span>
        </button>

        {/* External Links */}
        <div className="flex items-center space-x-2.5">

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Repository"
              title="GitHub Repository"
              className="px-3 py-2 rounded-xl bg-[#F5F1E8] border border-[#DDD6C8] text-[#4B5563] hover:text-[#2F5D50] hover:border-[#2F5D50] hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-1.5 text-xs font-semibold"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Live Demo"
              title="Live Demo"
              className="px-3 py-2 rounded-xl bg-[#2F5D50] text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm hover:bg-[#244A40] hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

        </div>
      </div>

    </motion.div>
  );
}
