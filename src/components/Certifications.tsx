import { Award } from 'lucide-react';
import { certificationsData } from '../data/portfolioData';
import { Certification } from '../types';
import CertificateCard from './CertificateCard';

interface CertificationsProps {
  onOpenCertModal: (cert: Certification) => void;
}

export default function Certifications({ onOpenCertModal }: CertificationsProps) {
  return (
    <section id="certifications" className="py-24 relative z-10 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FCFAF6] border border-[#DDD6C8] shadow-sm">
            <Award className="w-3.5 h-3.5 text-[#2F5D50]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#2F5D50] font-semibold">
              ACCREDITATIONS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1D2A26]">
            Certifications & Training
          </h2>
          <p className="text-base text-[#4B5563]">
            Formal certifications validating expertise in data analysis, statistical modeling, and AI workflow automation.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificationsData.map((cert) => (
            <CertificateCard
              key={cert.id}
              cert={cert}
              onOpenCertModal={onOpenCertModal}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
