import React from 'react';
import { motion } from 'motion/react';
import {
  Github,
  ExternalLink,
  Maximize2,
  ArrowUpRight,
} from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  key?: string;
  project: Project;
  onOpenLightbox: (project: Project) => void;
}

export default function ProjectCard({
  project,
  onOpenLightbox,
}: ProjectCardProps) {
  const shortDescription =
    project.description.length > 155
      ? `${project.description.slice(0, 152).trimEnd()}…`
      : project.description;

  const visibleTags = project.tags.slice(0, 4);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      whileHover={{ y: -3 }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex h-full flex-col"
    >
      {/* Project Media */}
      <button
        type="button"
        onClick={() => onOpenLightbox(project)}
        className="relative block w-full overflow-hidden rounded-xl bg-[#EDE8DD] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F5D50] focus-visible:ring-offset-2"
        aria-label={`Open ${project.title} project preview`}
      >
        <div className="aspect-[16/10] overflow-hidden">
          {project.isVideo && project.videoUrl ? (
            <video
              src={project.videoUrl}
              poster={project.mediaUrl}
              muted
              playsInline
              preload="metadata"
              className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.025]"
            />
          ) : (
            <motion.img
              src={project.mediaUrl}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center"
              whileHover={{ scale: 1.025 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          )}
        </div>

        {/* Minimal image action */}
        <span
          className="
            absolute
            bottom-3
            right-3
            inline-flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            bg-[#FCFAF6]/90
            text-[#2F5D50]
            opacity-0
            shadow-sm
            backdrop-blur-sm
            transition-all
            duration-300
            group-hover:opacity-100
          "
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </span>
      </button>

      {/* Project Information */}
      <div className="flex flex-1 flex-col pt-5">
        {/* Category */}
        <div className="mb-2.5 flex items-center gap-2">
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

        {/* Title */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-[#1D2A26] transition-colors duration-200 group-hover:text-[#2F5D50] sm:text-2xl">
            {project.title}
          </h3>

          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[#B8B0A2] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#2F5D50]" />
        </div>

        {/* Short Description */}
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6B7280]">
          {shortDescription}
        </p>

        {/* Tiny Animated Data Waveform */}
        <div
          className="mt-4 flex h-5 items-center gap-[3px]"
          aria-hidden="true"
        >
          {[4, 9, 6, 13, 8, 16, 7, 11, 5, 14, 8, 12].map(
            (height, index) => (
              <span
                key={index}
                className="project-card-wave-bar w-[2px] rounded-full bg-[#2F5D50]/55"
                style={{
                  height: `${height}px`,
                  animationDelay: `${index * 90}ms`,
                }}
              />
            )
          )}

          <span className="ml-1 font-mono text-[8px] uppercase tracking-[0.12em] text-[#9A9388]">
            data signal
          </span>
        </div>

        {/* Technology */}
        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5">
          {visibleTags.map((tag, index) => (
            <React.Fragment key={tag}>
              {index > 0 && (
                <span className="text-[#C8C1B5]">·</span>
              )}

              <span className="text-[11px] font-medium text-[#6B7280]">
                {tag}
              </span>
            </React.Fragment>
          ))}

          {project.tags.length > visibleTags.length && (
            <>
              <span className="text-[#C8C1B5]">·</span>

              <span className="text-[11px] font-medium text-[#9A9388]">
                +{project.tags.length - visibleTags.length}
              </span>
            </>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="mt-auto flex items-center gap-4 pt-5">
          <button
            type="button"
            onClick={() => onOpenLightbox(project)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2F5D50] transition-colors duration-200 hover:text-[#1D2A26]"
          >
            View case study
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B7280] transition-colors duration-200 hover:text-[#2F5D50]"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B7280] transition-colors duration-200 hover:text-[#D97745]"
              aria-label={`View live demo for ${project.title}`}
            >
              Live demo
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        {/* Simple divider */}
        <div className="mt-5 h-px w-full bg-[#DDD6C8] transition-colors duration-300 group-hover:bg-[#2F5D50]/25" />
      </div>

      <style>
        {`
          @keyframes projectWave {
            0%, 100% {
              transform: scaleY(0.55);
              opacity: 0.45;
            }

            50% {
              transform: scaleY(1);
              opacity: 1;
            }
          }

          .project-card-wave-bar {
            transform-origin: bottom;
            animation: projectWave 1.5s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .project-card-wave-bar {
              animation: none;
            }
          }
        `}
      </style>
    </motion.article>
  );
}
