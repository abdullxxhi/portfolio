import React from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  ExternalLink,
  Maximize2,
} from 'lucide-react';
import { Certification } from '../types';

interface CertificateCardProps {
  key?: string;
  cert: Certification;
  onOpenCertModal: (cert: Certification) => void;
}

export default function CertificateCard({
  cert,
  onOpenCertModal,
}: CertificateCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45 }}
      onClick={() => onOpenCertModal(cert)}
      className="group cursor-pointer border-t border-[#DDD6C8] pt-6"
    >
      {/* Certificate Preview */}
      {cert.image && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onOpenCertModal(cert);
          }}
          className="group/image relative mb-6 aspect-[16/10] overflow-hidden rounded-xl border border-[#DDD6C8] bg-[#EDE7DA]"
        >
          <img
            src={cert.image}
            alt={cert.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-contain transition-transform duration-500 group-hover/image:scale-[1.02]"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-[#1D2A26]/20 opacity-0 transition-opacity duration-200 group-hover/image:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-lg bg-[#FCFAF6] px-3 py-2 text-xs font-semibold text-[#1D2A26]">
              <Maximize2 className="h-3.5 w-3.5" />
              View certificate
            </span>
          </div>
        </div>
      )}

      {/* Meta */}
      <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
        <span className="text-[#2F5D50]">
          {cert.issuer}
        </span>

        <span className="text-[#DDD6C8]">/</span>

        <span className="text-[#6B7280]">
          {cert.date}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display text-xl font-bold leading-tight text-[#1D2A26] transition-colors duration-200 group-hover:text-[#2F5D50]">
        {cert.title}
      </h3>

      {/* Status */}
      <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#4E8D66]">
        <CheckCircle2 className="h-4 w-4" />
        <span>{cert.status}</span>
      </div>

      {/* Skills */}
      {cert.skillsLearned && cert.skillsLearned.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
            Core competencies
          </p>

          <div className="flex flex-wrap gap-x-3 gap-y-1.5">
            {cert.skillsLearned.map((skill) => (
              <span
                key={skill}
                className="text-xs text-[#4B5563]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action */}
      <div className="mt-6 flex items-center border-t border-[#DDD6C8] pt-4">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenCertModal(cert);
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#2F5D50] transition-colors hover:text-[#1D2A26]"
        >
          View Certificate
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.article>
  );
}
