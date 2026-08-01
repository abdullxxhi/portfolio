import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ExternalLink, Maximize2 } from 'lucide-react';
import { Certification } from '../types';

interface CertificateCardProps {
  key?: string;
  cert: Certification;
  onOpenCertModal: (cert: Certification) => void;
}

export default function CertificateCard({ cert, onOpenCertModal }: CertificateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      onClick={() => onOpenCertModal(cert)}
      className="bg-[#FCFAF6] text-[#1D2A26] p-8 rounded-[20px] shadow-sm border border-[#DDD6C8] flex flex-col justify-between group relative overflow-hidden cursor-pointer"
    >
      <div>
        {/* Certificate Image Thumbnail Preview */}
        {cert.image && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onOpenCertModal(cert);
            }}
            className="relative aspect-[16/10] bg-[#111827] rounded-xl overflow-hidden mb-5 border border-[#DDD6C8] cursor-pointer group/img flex items-center justify-center p-1.5 shadow-inner"
          >
            <img
              src={cert.image}
              alt={cert.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain group-hover/img:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-[#1D2A26]/10 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-3 py-1.5 rounded-lg bg-[#FCFAF6]/90 text-[#1D2A26] text-xs font-semibold shadow-md flex items-center space-x-1.5">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Expand Certificate</span>
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-[#2F5D50] mb-2">
          <span>{cert.issuer}</span>
          <span>•</span>
          <span className="text-[#D97745]">{cert.date}</span>
        </div>

        <h3 className="text-xl font-bold font-display text-[#1D2A26] mb-3 group-hover:text-[#2F5D50] transition-colors">
          {cert.title}
        </h3>

        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#4E8D66]/15 text-[#245338] text-xs font-semibold mb-6">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{cert.status}</span>
        </div>

        {/* Skills Learned Pills */}
        {cert.skillsLearned && cert.skillsLearned.length > 0 && (
          <div className="space-y-2 mb-6">
            <span className="text-[11px] font-mono text-[#6B7280] font-semibold uppercase tracking-wider">
              Core Competencies:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {cert.skillsLearned.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg bg-[#F5F1E8] border border-[#DDD6C8] text-[#1D2A26] text-[11px] font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-[#DDD6C8] flex items-center justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenCertModal(cert);
          }}
          className="text-xs font-bold text-[#2F5D50] hover:text-[#1D2A26] flex items-center space-x-1.5 transition-colors"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>View Certificate</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenCertModal(cert);
          }}
          className="p-2.5 rounded-xl bg-[#2F5D50] text-white hover:bg-[#244A40] transition-colors"
          aria-label="View Certificate"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
