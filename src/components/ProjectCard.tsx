import React from 'react';
import { motion } from 'motion/react';
import { Github, ExternalLink, Sparkles, Maximize2, CheckCircle } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  key?: string;
  project: Project;
  onOpenLightbox: (project: Project) => void;
}

export default function ProjectCard({ project, onOpenLightbox }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className={`bg-[#FCFAF6] rounded-[20px] overflow-hidden flex flex-col justify-between group border shadow-sm transition-all duration-300 ${
        project.featured
          ? 'border-[#2F5D50] shadow-md lg:col-span-2'
          : 'border-[#DDD6C8] hover:border-[#2F5D50]/50'
      }`}
    >
      <div>
        {/* Project Thumbnail Image or Video with Lightbox Trigger */}
        <div className="relative aspect-[16/9] bg-[#F5F1E8] overflow-hidden group/img cursor-pointer" onClick={() => onOpenLightbox(project)}>
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
              <img
                src={project.mediaUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D2A26]/80 via-[#1D2A26]/30 to-transparent opacity-80 group-hover/img:opacity-60 transition-opacity pointer-events-none" />
            </>
          )}

          {/* Badges Overlay */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-[#FCFAF6]/90 backdrop-blur-md border border-[#DDD6C8] text-[#2F5D50] font-mono text-[11px] font-semibold">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-3 py-1 rounded-full bg-[#2F5D50] text-white font-mono text-[11px] font-bold flex items-center space-x-1 shadow-md">
                <Sparkles className="w-3 h-3 text-[#D97745]" />
                <span>Featured Project</span>
              </span>
            )}
          </div>

          {/* Expand Overlay Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenLightbox(project);
            }}
            aria-label="View Full Preview"
            className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-[#FCFAF6]/90 backdrop-blur-md text-[#1D2A26] opacity-0 group-hover/img:opacity-100 hover:bg-[#2F5D50] hover:text-white transition-all shadow-md z-10"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold font-display text-[#1D2A26] group-hover:text-[#2F5D50] transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-[#4B5563] leading-relaxed">
            {project.description}
          </p>

          {/* Key Highlights */}
          {project.keyHighlights && project.keyHighlights.length > 0 && (
            <div className="space-y-1.5 pt-2">
              {project.keyHighlights.map((hl, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-[#1D2A26]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#4E8D66] shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-[#F5F1E8] border border-[#DDD6C8] text-[11px] font-mono text-[#6B7280]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 flex items-center justify-between border-t border-[#DDD6C8] mt-4">
        <button
          onClick={() => onOpenLightbox(project)}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-[#2F5D50] hover:text-[#1D2A26] transition-colors"
        >
          <span>View Details & Media</span>
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center space-x-2.5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Repository"
              title="GitHub Repository"
              className="px-3 py-2 rounded-xl bg-[#F5F1E8] border border-[#DDD6C8] text-[#4B5563] hover:text-[#2F5D50] hover:border-[#2F5D50] transition-all flex items-center space-x-1.5 text-xs font-semibold"
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
              className="px-3 py-2 rounded-xl bg-[#2F5D50] text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm hover:bg-[#244A40] transition-colors"
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
